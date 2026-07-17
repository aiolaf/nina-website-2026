import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { clientDir, findDemo, readConfig } from '../lib/clients.ts'
import type { GridCell, SheetGrid } from '../lib/types.ts'

// ExcelJS is CommonJS; via createRequire laden we hem betrouwbaar onder ESM.
const require = createRequire(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExcelJS: any = require('exceljs')

interface FillSpec {
  sheet: string
  cells: { address: string; value: string | number | boolean | null }[]
}

/** Zorg dat een pad binnen de klantmap blijft (geen path traversal). */
function safeJoin(dir: string, rel: string): string {
  const p = path.resolve(dir, rel)
  if (p !== dir && !p.startsWith(dir + path.sep)) {
    throw new Error(`Ongeldig pad: ${rel}`)
  }
  return p
}

export interface FilledExcel {
  buffer: Buffer
  filename: string
}

/**
 * Vul het prijsvergelijk-template van een demo in met de vergelijkingswaarden.
 * Het bestaande Excel-bestand wordt NIET herbouwd: we schrijven alleen waarden
 * in de lege invoercellen. Formules (bv. totaal = prijs * hoeveelheid) en de
 * huisstijl blijven staan; Excel herrekent bij het openen.
 */
export async function fillExcelForDemo(
  klant: string,
  demoId: string | undefined,
): Promise<FilledExcel> {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  if (!demo.excel) {
    throw new Error('Deze demo heeft geen Excel-invuloptie.')
  }
  const dir = clientDir(klant)
  const filename = demo.excel.filename || 'prijsvergelijk-ingevuld.xlsx'

  // Voorkeur: geef het door Excel zelf gemaakte, geldige bestand rechtstreeks
  // terug. Zo krijg je GEEN "we found a problem"-herstelmelding. ExcelJS
  // herserialiseren van een complex werkblad (met o.a. shared formulas) levert
  // net-niet-geldige XML op die Excel wil repareren.
  if (demo.excel.viewFilled) {
    const nativePath = safeJoin(dir, demo.excel.viewFilled)
    if (fs.existsSync(nativePath)) {
      return { buffer: fs.readFileSync(nativePath), filename }
    }
  }

  // Fallback (demo's zonder een geldig ingevuld voorbeeldbestand): vul het
  // template via ExcelJS. Kan een herstelmelding geven bij complexe sheets.
  const templatePath = safeJoin(dir, demo.excel.template)
  const fillPath = safeJoin(dir, demo.excel.fill)
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template niet gevonden: ${demo.excel.template}`)
  }
  const spec = JSON.parse(fs.readFileSync(fillPath, 'utf-8')) as FillSpec

  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(templatePath)
  const ws = wb.getWorksheet(spec.sheet) ?? wb.worksheets[0]
  for (const c of spec.cells) {
    ws.getCell(c.address).value = c.value
  }
  wb.calcProperties = wb.calcProperties || {}
  wb.calcProperties.fullCalcOnLoad = true

  const arrayBuffer = await wb.xlsx.writeBuffer()
  return { buffer: Buffer.from(arrayBuffer), filename }
}

function colLetter(c: number): string {
  let s = ''
  while (c > 0) {
    const m = (c - 1) % 26
    s = String.fromCharCode(65 + m) + s
    c = Math.floor((c - 1) / 26)
  }
  return s
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cellDisplay(cell: any): string | number {
  const v = cell.value
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') {
    if (Array.isArray(v.richText)) return v.richText.map((p: any) => p.text).join('')
    if ('result' in v) return v.result ?? ''
    if ('formula' in v) return ''
    if ('text' in v) return v.text
    return ''
  }
  return v as string | number
}

/**
 * Lees de sheet als grid voor de viewer. mode 'template' toont het lege template
 * (offertekolommen leeg); 'filled' toont het ingevulde voorbeeld.
 */
export async function sheetGrid(
  klant: string,
  demoId: string | undefined,
  mode: 'template' | 'filled',
): Promise<SheetGrid> {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  if (!demo.excel) throw new Error('Deze demo heeft geen Excel-viewer.')
  const dir = clientDir(klant)

  const spec = JSON.parse(
    fs.readFileSync(safeJoin(dir, demo.excel.fill), 'utf-8'),
  ) as { sheet: string; cells: { address: string }[] }
  const fillAddrs = new Set(spec.cells.map((c) => c.address))

  const rel =
    mode === 'filled' ? demo.excel.viewFilled || demo.excel.template : demo.excel.template
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(safeJoin(dir, rel))
  const ws = wb.getWorksheet(spec.sheet) ?? wb.worksheets[0]

  const MAXR = 40
  const MAXC = 29

  // Samengevoegde cellen: bepaal master + afgedekte cellen + spans.
  const covered = new Set<string>()
  const span = new Map<string, { cs: number; rs: number }>()
  const merges: string[] = ws.model?.merges ?? []
  for (const m of merges) {
    const [a, b] = m.split(':')
    const pa = a.match(/([A-Z]+)(\d+)/)
    const pb = b.match(/([A-Z]+)(\d+)/)
    if (!pa || !pb) continue
    const c1 = colNum(pa[1]),
      r1 = +pa[2],
      c2 = colNum(pb[1]),
      r2 = +pb[2]
    span.set(a, { cs: c2 - c1 + 1, rs: r2 - r1 + 1 })
    for (let r = r1; r <= r2; r++)
      for (let c = c1; c <= c2; c++) {
        const ad = colLetter(c) + r
        if (ad !== a) covered.add(ad)
      }
  }

  const rows: SheetGrid['rows'] = []
  for (let r = 1; r <= MAXR; r++) {
    const cells: GridCell[] = []
    for (let c = 1; c <= MAXC; c++) {
      const addr = colLetter(c) + r
      if (covered.has(addr)) continue
      let v = cellDisplay(ws.getCell(r, c))
      // In template-modus tonen we een écht leeg formulier: alle datarijen (r>=9)
      // leeg, alleen de koppen/structuur (rijen 1-8) blijven staan.
      if (mode === 'template' && r >= 9) v = ''
      const sp = span.get(addr) ?? { cs: 1, rs: 1 }
      cells.push({ c, addr, v, filled: fillAddrs.has(addr), cs: sp.cs, rs: sp.rs })
    }
    rows.push({ r, cells })
  }
  return { sheet: ws.name, maxCol: MAXC, rows }
}

function colNum(letters: string): number {
  let n = 0
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64)
  return n
}
