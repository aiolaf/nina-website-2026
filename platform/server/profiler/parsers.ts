import fs from 'node:fs'
import path from 'node:path'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export type Record_ = Record<string, unknown>

export interface ParsedFile {
  format: 'csv' | 'json' | 'excel' | 'onbekend'
  records: Record_[]
}

/**
 * Lees één databestand in en geef platte records terug. Ondersteunt CSV, JSON
 * (array of object-met-array) en Excel (.xlsx/.xls, eerste sheet).
 */
export function parseFile(filePath: string): ParsedFile {
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.csv') {
    const text = fs.readFileSync(filePath, 'utf-8')
    const res = Papa.parse<Record_>(text, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: false,
    })
    return { format: 'csv', records: res.data }
  }

  if (ext === '.json') {
    const text = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(text)
    return { format: 'json', records: normalizeJson(data) }
  }

  if (ext === '.xlsx' || ext === '.xls') {
    const wb = XLSX.readFile(filePath)
    const sheetName = wb.SheetNames[0]
    const sheet = wb.Sheets[sheetName]
    const records = XLSX.utils.sheet_to_json<Record_>(sheet, { defval: '' })
    return { format: 'excel', records }
  }

  return { format: 'onbekend', records: [] }
}

/**
 * JSON kan van alles zijn. We proberen een array van records te vinden:
 * - array van objects -> direct
 * - object met een array-property (bv. { orders: [...] }) -> die array
 * - los object -> als één record
 */
function normalizeJson(data: unknown): Record_[] {
  if (Array.isArray(data)) {
    return data.map(toRecord)
  }
  if (data && typeof data === 'object') {
    const obj = data as Record_
    // Zoek de grootste array-property.
    let best: unknown[] | null = null
    for (const value of Object.values(obj)) {
      if (Array.isArray(value) && (!best || value.length > best.length)) {
        best = value
      }
    }
    if (best) return best.map(toRecord)
    return [obj]
  }
  return []
}

function toRecord(value: unknown): Record_ {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    // Nest objecten/arrays worden platgeslagen naar een leesbare string.
    const out: Record_ = {}
    for (const [k, v] of Object.entries(value as Record_)) {
      out[k] = v && typeof v === 'object' ? JSON.stringify(v) : v
    }
    return out
  }
  // Primitief in een array -> wrap als { waarde: ... }.
  return { waarde: value }
}
