import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { clientDir, findDemo, readConfig } from '../lib/clients.ts'
import { hasApiKey, runStructuredPdf } from '../lib/anthropic.ts'
import type {
  ExtractedOffer,
  OfferCompareCell,
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

/** Behoud de formule, vervang alleen de gecachte <v> (of verwijder hem). */
function setFormulaCached(xml: string, addr: string, cached: number | null): string {
  const re = new RegExp(
    `(<c r="${addr}"[^>]*>)(<f[^>]*(?:/>|>[\\s\\S]*?</f>))(?:<v>[\\s\\S]*?</v>)?(</c>)`,
  )
  const m = xml.match(re)
  if (!m) return xml
  const v = cached === null ? '' : `<v>${cached}</v>`
  return xml.replace(re, `$1$2${v}$3`)
}

function clearCell(xml: string, addr: string): string {
  const re = cellRe(addr)
  const m = xml.match(re)
  if (!m) return xml
  const attrs = keepAttrsWithoutType(m[1])
  return xml.replace(re, `<c r="${addr}"${attrs}/>`)
}

/** Lees de (numerieke) gecachte waarde van een cel uit de sheet-XML. */
function readCachedNumber(xml: string, addr: string): number | null {
  const m = xml.match(new RegExp(`<c r="${addr}"[^>]*>([\\s\\S]*?)</c>`))
  if (!m) return null
  const vm = m[1].match(/<v>([\s\S]*?)<\/v>/)
  if (!vm) return null
  const n = Number(vm[1])
  return Number.isFinite(n) ? n : null
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
  spec: UploadSpec,
): Promise<ExtractedOffer> {
  const postenLijst = spec.posten
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
    extractionSchema(spec.posten),
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
    offers.push(await extractOffer(f.base64, spec))
  }

  return injectAndCompare(klant, demo.id, basePath, spec, offers)
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

  // Bouw tegelijk de vergelijk-grid voor de viewer.
  const leveranciers: string[] = []
  const perPostCells: Map<string, OfferCompareCell[]> = new Map(
    spec.posten.map((p) => [p.id, []]),
  )
  const totalen: (number | null)[] = []

  for (let bi = 0; bi < spec.blocks.length; bi++) {
    const block = spec.blocks[bi]
    const offer = offers[bi]

    if (!offer) {
      // Blok niet gebruikt: maak het leeg (naam + datacellen), reset totalen.
      xml = clearCell(xml, block.naam)
      for (const post of spec.posten) {
        xml = clearCell(xml, block.hoev + post.row)
        xml = clearCell(xml, block.eenh + post.row)
        xml = clearCell(xml, block.prijs + post.row)
        xml = setFormulaCached(xml, block.totaal + post.row, null)
      }
      continue
    }

    leveranciers.push(offer.bedrijf)
    xml = setInline(xml, block.naam, offer.bedrijf)
    const regelsById = new Map(offer.regels.map((r) => [r.post_id, r]))
    let blokTotaal = 0

    for (const post of spec.posten) {
      const r = regelsById.get(post.id)
      const cellsForPost = perPostCells.get(post.id)!
      if (r && r.aangeboden !== false && (r.prijs_per_eenheid != null || r.hoeveelheid != null)) {
        // Hoeveelheid: AI-waarde, anders de reeds in het template bekende hoev.
        const templHoev = readCachedNumber(xml, block.hoev + post.row)
        const hoev = r.hoeveelheid ?? templHoev
        const prijs = r.prijs_per_eenheid ?? null
        if (r.hoeveelheid != null) xml = setNumeric(xml, block.hoev + post.row, r.hoeveelheid)
        if (r.eenheid) xml = setInline(xml, block.eenh + post.row, r.eenheid)
        if (prijs != null) xml = setNumeric(xml, block.prijs + post.row, prijs)
        if (r.opmerking) xml = setInline(xml, block.opm + post.row, r.opmerking)
        const totaal =
          prijs != null && hoev != null ? Math.round(prijs * hoev * 100) / 100 : null
        xml = setFormulaCached(xml, block.totaal + post.row, totaal)
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
        // Post niet aangeboden door deze leverancier: cellen leeg.
        xml = clearCell(xml, block.prijs + post.row)
        xml = setFormulaCached(xml, block.totaal + post.row, null)
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
