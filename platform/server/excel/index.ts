import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { clientDir, findDemo, readConfig } from '../lib/clients.ts'

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

  // Laat Excel de formules (totalen) herrekenen op basis van de nieuwe invoer.
  wb.calcProperties = wb.calcProperties || {}
  wb.calcProperties.fullCalcOnLoad = true

  const arrayBuffer = await wb.xlsx.writeBuffer()
  return {
    buffer: Buffer.from(arrayBuffer),
    filename: demo.excel.filename || 'prijsvergelijk-ingevuld.xlsx',
  }
}
