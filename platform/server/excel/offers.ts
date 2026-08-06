import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { clientDir, findDemo, readConfig } from '../lib/clients.ts'
import { hasApiKey, runStructuredPdf } from '../lib/anthropic.ts'
import type {
  ExtractedOffer,
  OfferCompareCell,
  OfferCompareResult,
  OfferFillResult,
  UploadPost,
  UploadSpec,
} from '../lib/types.ts'

// jszip is CommonJS; via createRequire betrouwbaar onder ESM.
const require = createRequire(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JSZip: any = require('jszip')

/** Zorg dat een pad binnen de klantmap blijft (geen path traversal). */
function safeJoin(dir: string, rel: string): string {
  const p = path.resolve(dir, rel)
  if (p !== dir && !p.startsWith(dir + path.sep)) {
    throw new Error(`Ongeldig pad: ${rel}`)
  }
  return p
}

function xmlEsc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// --- Chirurgische cel-setters op de sheet-XML ------------------------------
// We passen alleen losse <c>-cellen aan en herverpakken de rest byte-voor-byte
// met jszip. Zo blijven formules, huisstijl en gedeelde formules intact en
// krijg je GEEN "we found a problem / recover"-melding (dat gebeurt alleen bij
// het herserialiseren van het hele werkblad via een library).

function cellRe(addr: string): RegExp {
  return new RegExp(`<c r="${addr}"([^>]*?)(?:/>|>[\\s\\S]*?</c>)`)
}

function keepAttrsWithoutType(attrs: string): string {
  return attrs.replace(/\s+t="[^"]*"/, '')
}

function setNumeric(xml: string, addr: string, val: number): string {
  const re = cellRe(addr)
  const m = xml.match(re)
  if (!m) return xml
  const attrs = keepAttrsWithoutType(m[1])
  return xml.replace(re, `<c r="${addr}"${attrs}><v>${val}</v></c>`)
}

function setInline(xml: string, addr: string, text: string): string {
  const re = cellRe(addr)
  const m = xml.match(re)
  if (!m) return xml
  const attrs = keepAttrsWithoutType(m[1])
  return xml.replace(
    re,
    `<c r="${addr}"${attrs} t="inlineStr"><is><t xml:space="preserve">${xmlEsc(
      text,
    )}</t></is></c>`,
  )
}

/**
 * Behoud de formule, vervang alleen de gecachte <v> (of verwijder hem). We
 * isoleren éérst de hele cel (lazy tot de eigen </c>, cellen nesten niet) en
 * bewerken alleen dáárbinnen — zo kan een gedeelde/zelfsluitende formule
 * (<f t="shared" si=".."/>) nooit per ongeluk over celgrenzen matchen.
 */
function setFormulaCached(xml: string, addr: string, cached: number | null): string {
  const re = new RegExp(`<c r="${addr}"[^>]*>[\\s\\S]*?</c>`)
  const m = xml.match(re)
  if (!m) return xml
  let cell = m[0]
  // Bestaande gecachte waarde verwijderen.
  cell = cell.replace(/<v>[\s\S]*?<\/v>/, '')
  if (cached !== null) {
    cell = cell.replace(/<\/c>$/, `<v>${cached}</v></c>`)
  }
  return xml.replace(re, cell)
}

function clearCell(xml: string, addr: string): string {
  const re = cellRe(addr)
  const m = xml.match(re)
  if (!m) return xml
  const attrs = keepAttrsWithoutType(m[1])
  return xml.replace(re, `<c r="${addr}"${attrs}/>`)
}

/** Heeft de cel een formule (<f ...>)? */
function hasFormula(xml: string, addr: string): boolean {
  return new RegExp(`<c r="${addr}"[^>]*><f`).test(xml)
}

/**
 * Zet de totaalwaarde. Heeft de cel een formule, dan updaten we alleen de
 * gecachte <v>; anders schrijven we een gewone numerieke waarde (of maken leeg).
 */
function setTotaal(xml: string, addr: string, val: number | null): string {
  if (hasFormula(xml, addr)) return setFormulaCached(xml, addr, val)
  if (val == null) return clearCell(xml, addr)
  return setNumeric(xml, addr, val)
}

/** Kolomletter(s) van een celadres, bv. "K3" -> "K". */
function colOf(addr: string): string {
  return addr.replace(/[0-9]+/g, '')
}


// --- AI-extractie per PDF ---------------------------------------------------

function extractionSchema(posten: UploadPost[]): Record<string, unknown> {
  const ids = posten.map((p) => p.id)
  return {
    type: 'object',
    properties: {
      bedrijf: {
        type: 'string',
        description: 'Naam van de leverancier/aanbieder uit de offerte.',
      },
      regels: {
        type: 'array',
        description: 'Eén regel per begrotingspost hieronder.',
        items: {
          type: 'object',
          properties: {
            post_id: { type: 'string', enum: ids },
            aangeboden: {
              type: 'boolean',
              description: 'Biedt deze leverancier deze post aan?',
            },
            hoeveelheid: { type: ['number', 'null'] },
            eenheid: { type: ['string', 'null'], description: 'bv. m2, st, m1' },
            prijs_per_eenheid: {
              type: ['number', 'null'],
              description:
                'Vergelijkbare eenheidsprijs (bv. €/m2). Reken een totaalprijs zo nodig om met de hoeveelheid.',
            },
            opmerking: {
              type: ['string', 'null'],
              description:
                "Korte opmerking: afwijkende dikte/Rc, 'incl.', alleen totaalprijs, etc.",
            },
          },
          required: ['post_id', 'aangeboden'],
        },
      },
    },
    required: ['bedrijf', 'regels'],
  }
}

async function extractOffer(
  pdfBase64: string,
  posten: UploadPost[],
): Promise<ExtractedOffer> {
  const postenLijst = posten
    .map((p) => `- ${p.id}: ${p.label}`)
    .join('\n')
  const system =
    'Je bent een werkvoorbereider bij een bouwbedrijf. Je leest een binnengekomen ' +
    'offerte voor kanaalplaatvloeren en zet de prijzen om naar vergelijkbare ' +
    'eenheidsprijzen zodat leveranciers eerlijk vergeleken kunnen worden. Wees ' +
    'nauwkeurig: haal getallen letterlijk uit de PDF en verzin niets.'
  const user =
    `Lees deze offerte-PDF uit. Bepaal de leverancier (bedrijf) en koppel de ` +
    `aangeboden posten aan onderstaande begrotingsposten. Geef per post of hij ` +
    `wordt aangeboden, de hoeveelheid, de eenheid en de vergelijkbare ` +
    `eenheidsprijs (reken een totaalprijs zo nodig om met de hoeveelheid). Zet ` +
    `posten die deze leverancier niet aanbiedt op aangeboden=false met null-` +
    `waarden. Begrotingsposten:\n${postenLijst}`
  return runStructuredPdf<ExtractedOffer>(
    system,
    user,
    pdfBase64,
    'offerte',
    extractionSchema(posten),
  )
}

// --- Hoofdfunctie -----------------------------------------------------------

export async function fillOffersForDemo(
  klant: string,
  demoId: string | undefined,
  files: { name: string; base64: string }[],
): Promise<OfferFillResult> {
  if (!hasApiKey()) {
    throw new Error(
      'ANTHROPIC_API_KEY ontbreekt — nodig om de PDF-offertes uit te lezen. Voeg de key toe via Instellingen.',
    )
  }
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  const spec = demo.excel?.upload
  if (!spec) throw new Error('Deze demo heeft geen offerte-upload.')
  if (!files.length) throw new Error('Geen PDF-bestanden ontvangen.')

  const dir = clientDir(klant)
  const basePath = safeJoin(dir, spec.base)
  if (!fs.existsSync(basePath)) {
    throw new Error(`Template niet gevonden: ${spec.base}`)
  }

  // Maximaal zoveel offertes als er blokken zijn.
  const used = files.slice(0, spec.blocks.length)

  // Lees elke PDF echt uit met Claude.
  const offers: ExtractedOffer[] = []
  for (const f of used) {
    offers.push(await extractOffer(f.base64, spec.posten))
  }

  return injectAndCompare(klant, demo.id, basePath, spec, offers)
}

/**
 * Bouw het vergelijk-grid (posten × leveranciers) uit genormaliseerde offertes,
 * zonder Excel. Elke offerte = één kolom.
 */
export function compareOffers(
  posten: UploadPost[],
  offers: ExtractedOffer[],
): Omit<OfferCompareResult, 'klant' | 'demoId' | 'bron'> {
  const leveranciers: string[] = []
  const perPost = new Map<string, OfferCompareCell[]>(
    posten.map((p) => [p.id, []]),
  )
  const totalen: (number | null)[] = []

  for (const offer of offers) {
    if (!offer) continue
    leveranciers.push(offer.bedrijf)
    const byId = new Map(offer.regels.map((r) => [r.post_id, r]))
    let tot = 0
    let any = false
    for (const post of posten) {
      const r = byId.get(post.id)
      const cells = perPost.get(post.id)!
      if (
        r &&
        r.aangeboden !== false &&
        (r.prijs_per_eenheid != null || r.hoeveelheid != null)
      ) {
        const hoev = r.hoeveelheid ?? null
        const prijs = r.prijs_per_eenheid ?? null
        const totaal =
          prijs != null && hoev != null ? Math.round(prijs * hoev * 100) / 100 : null
        if (totaal != null) {
          tot += totaal
          any = true
        }
        cells.push({
          prijs,
          hoeveelheid: hoev,
          eenheid: r.eenheid ?? null,
          totaal,
          opmerking: r.opmerking ?? null,
          aangeboden: true,
          best: false,
        })
      } else {
        cells.push({
          prijs: null,
          hoeveelheid: null,
          eenheid: null,
          totaal: null,
          opmerking: r?.opmerking ?? null,
          aangeboden: false,
          best: false,
        })
      }
    }
    totalen.push(any ? tot : null)
  }

  for (const post of posten) {
    const cells = perPost.get(post.id)!
    let bestIdx = -1
    let bestVal = Infinity
    cells.forEach((c, i) => {
      if (c.totaal != null && c.totaal < bestVal) {
        bestVal = c.totaal
        bestIdx = i
      }
    })
    if (bestIdx >= 0) cells[bestIdx].best = true
  }

  let gunstigsteIndex: number | null = null
  let laagste = Infinity
  totalen.forEach((t, i) => {
    if (t != null && t < laagste) {
      laagste = t
      gunstigsteIndex = i
    }
  })

  return {
    leveranciers,
    posten: posten.map((p) => ({
      id: p.id,
      label: p.label,
      cellen: perPost.get(p.id)!,
    })),
    totalen,
    gunstigsteIndex,
  }
}

/**
 * Normaliseer offertes samen (stap 1). Zonder bestanden: laad de kant-en-klaar
 * genormaliseerde set (geen key nodig). Met geüploade PDF's: lees ze samen uit
 * met Claude (min. aantal instelbaar, default 2).
 */
export async function normalizeForDemo(
  klant: string,
  demoId: string | undefined,
  files?: { name: string; base64: string }[],
): Promise<OfferCompareResult> {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  const spec = demo.normalize
  if (!spec) throw new Error('Deze demo heeft geen normaliseer-stap.')
  const dir = clientDir(klant)

  let offers: ExtractedOffer[]
  let bron: 'bundled' | 'upload'

  if (files && files.length) {
    const min = spec.min ?? 2
    if (files.length < min) {
      throw new Error(
        `Upload minimaal ${min} offertes om ze samen te kunnen normaliseren.`,
      )
    }
    if (!hasApiKey()) {
      throw new Error(
        'ANTHROPIC_API_KEY ontbreekt — nodig om de PDF-offertes uit te lezen. Voeg de key toe via Instellingen.',
      )
    }
    offers = []
    for (const f of files) {
      offers.push(await extractOffer(f.base64, spec.posten))
    }
    bron = 'upload'
  } else {
    if (!spec.normalized) {
      throw new Error('Er zijn geen genormaliseerde offertes geconfigureerd.')
    }
    const normPath = safeJoin(dir, spec.normalized)
    if (!fs.existsSync(normPath)) {
      throw new Error(`Genormaliseerde offertes niet gevonden: ${spec.normalized}`)
    }
    offers = JSON.parse(fs.readFileSync(normPath, 'utf-8')) as ExtractedOffer[]
    bron = 'bundled'
  }

  return { klant, demoId: demo.id, ...compareOffers(spec.posten, offers), bron }
}

/**
 * Laad de al genormaliseerde offertes (uit stap 1) direct in het prijsvergelijk,
 * zonder opnieuw uploaden of AI. Vereist `excel.upload.normalized` in de config.
 */
export async function loadNormalizedForDemo(
  klant: string,
  demoId: string | undefined,
): Promise<OfferFillResult> {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  const spec = demo.excel?.upload
  if (!spec) throw new Error('Deze demo heeft geen offerte-upload.')
  if (!spec.normalized) {
    throw new Error('Er zijn geen genormaliseerde offertes geconfigureerd.')
  }
  const dir = clientDir(klant)
  const basePath = safeJoin(dir, spec.base)
  if (!fs.existsSync(basePath)) {
    throw new Error(`Template niet gevonden: ${spec.base}`)
  }
  const normPath = safeJoin(dir, spec.normalized)
  if (!fs.existsSync(normPath)) {
    throw new Error(`Genormaliseerde offertes niet gevonden: ${spec.normalized}`)
  }
  const offers = JSON.parse(fs.readFileSync(normPath, 'utf-8')) as ExtractedOffer[]
  return injectAndCompare(klant, demo.id, basePath, spec, offers)
}

/**
 * Genereer het écht ingevulde prijsvergelijk-.xlsx uit de genormaliseerde
 * offertes (geen voorbeeldbestand). Gebruikt door de download en de viewer.
 */
export async function generateNormalizedBuffer(
  klant: string,
  demoId: string | undefined,
): Promise<{ buffer: Buffer; filename: string }> {
  const r = await loadNormalizedForDemo(klant, demoId)
  return { buffer: Buffer.from(r.xlsxBase64, 'base64'), filename: r.filename }
}

/**
 * Chirurgisch invullen van het template + de vergelijk-grid opbouwen. Los van
 * de AI-stap zodat dit deel (de riskante Excel-mechaniek) testbaar is.
 */
export async function injectAndCompare(
  klant: string,
  demoId: string,
  basePath: string,
  spec: UploadSpec,
  offers: ExtractedOffer[],
): Promise<OfferFillResult> {
  // Laad template en pas de sheet-XML chirurgisch aan.
  const zip = await JSZip.loadAsync(fs.readFileSync(basePath))
  const sheetFile = 'xl/worksheets/sheet1.xml'
  let xml: string = await zip.file(sheetFile).async('string')

  // --- Metadata neutraliseren -------------------------------------------
  // Het template is afgeleid van het door ML ingevulde voorbeeld en bevat nog
  // diens kopgegevens. Die horen NIET in een gegenereerde export. Opsteller en
  // datum leegmaken/vernieuwen; projectnaam/-nummer/onderdeel zijn projectdata
  // en blijven staan.
  const vandaag = new Date().toLocaleDateString('nl-NL')
  xml = clearCell(xml, 'H5') // Opsteller (was "ML")
  xml = setInline(xml, 'H6', vandaag) // Datum prijsvergelijk = gegenereerd op
  xml = clearCell(xml, 'K4') // Gewijzigd

  // Rijen waar we de leverancierskolommen volledig schoonmaken vóór het vullen,
  // zodat er nooit oude offertegegevens uit het voorbeeld blijven staan.
  const CLEAR_ROWS: number[] = []
  for (let r = 22; r <= 40; r++) CLEAR_ROWS.push(r)

  // Bouw tegelijk de vergelijk-grid voor de viewer.
  const leveranciers: string[] = []
  const perPostCells: Map<string, OfferCompareCell[]> = new Map(
    spec.posten.map((p) => [p.id, []]),
  )
  const totalen: (number | null)[] = []

  for (let bi = 0; bi < spec.blocks.length; bi++) {
    const block = spec.blocks[bi]
    const offer = offers[bi]
    const dateAddr = colOf(block.naam) + '3'

    // Maak de hele kolom altijd eerst leeg (geen stale voorbeelddata).
    for (const r of CLEAR_ROWS) {
      xml = clearCell(xml, block.hoev + r)
      xml = clearCell(xml, block.eenh + r)
      xml = clearCell(xml, block.prijs + r)
      xml = clearCell(xml, block.opm + r)
      xml = setTotaal(xml, block.totaal + r, null)
    }

    if (!offer) {
      xml = clearCell(xml, block.naam)
      xml = clearCell(xml, dateAddr)
      for (const post of spec.posten) {
        perPostCells.get(post.id)!.push({
          prijs: null,
          hoeveelheid: null,
          eenheid: null,
          totaal: null,
          opmerking: null,
          aangeboden: false,
          best: false,
        })
      }
      continue
    }

    leveranciers.push(offer.bedrijf)
    xml = setInline(xml, block.naam, offer.bedrijf)
    xml = offer.offertedatum
      ? setInline(xml, dateAddr, offer.offertedatum)
      : clearCell(xml, dateAddr)
    const regelsById = new Map(offer.regels.map((r) => [r.post_id, r]))
    let blokTotaal = 0

    for (const post of spec.posten) {
      const r = regelsById.get(post.id)
      const cellsForPost = perPostCells.get(post.id)!
      if (r && r.aangeboden !== false && (r.prijs_per_eenheid != null || r.hoeveelheid != null)) {
        const hoev = r.hoeveelheid ?? null
        const prijs = r.prijs_per_eenheid ?? null
        if (hoev != null) xml = setNumeric(xml, block.hoev + post.row, hoev)
        if (r.eenheid) xml = setInline(xml, block.eenh + post.row, r.eenheid)
        if (prijs != null) xml = setNumeric(xml, block.prijs + post.row, prijs)
        if (r.opmerking) xml = setInline(xml, block.opm + post.row, r.opmerking)
        const totaal =
          prijs != null && hoev != null ? Math.round(prijs * hoev * 100) / 100 : null
        xml = setTotaal(xml, block.totaal + post.row, totaal)
        if (totaal != null) blokTotaal += totaal
        cellsForPost.push({
          prijs,
          hoeveelheid: hoev,
          eenheid: r.eenheid ?? null,
          totaal,
          opmerking: r.opmerking ?? null,
          aangeboden: true,
          best: false,
        })
      } else {
        cellsForPost.push({
          prijs: null,
          hoeveelheid: null,
          eenheid: null,
          totaal: null,
          opmerking: r?.opmerking ?? null,
          aangeboden: false,
          best: false,
        })
      }
    }
    totalen.push(blokTotaal)
  }

  // Markeer per post de gunstigste (laagste) totaal.
  for (const post of spec.posten) {
    const cells = perPostCells.get(post.id)!
    let bestIdx = -1
    let bestVal = Infinity
    cells.forEach((c, i) => {
      if (c.totaal != null && c.totaal < bestVal) {
        bestVal = c.totaal
        bestIdx = i
      }
    })
    if (bestIdx >= 0) cells[bestIdx].best = true
  }

  // Gunstigste leverancier over het geheel (laagste totaal).
  let gunstigsteIndex: number | null = null
  let laagste = Infinity
  totalen.forEach((t, i) => {
    if (t != null && t < laagste) {
      laagste = t
      gunstigsteIndex = i
    }
  })

  // Schrijf de aangepaste sheet terug en genereer een schone, geldige .xlsx.
  zip.file(sheetFile, xml)
  const out: Buffer = await zip.generateAsync({ type: 'nodebuffer' })

  const filename = spec.filename || 'prijsvergelijk-ingevuld.xlsx'
  return {
    klant,
    demoId,
    leveranciers,
    posten: spec.posten.map((p) => ({
      id: p.id,
      label: p.label,
      cellen: perPostCells.get(p.id)!,
    })),
    totalen,
    gunstigsteIndex,
    xlsxBase64: out.toString('base64'),
    filename,
  }
}
