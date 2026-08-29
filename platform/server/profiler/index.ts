import path from 'node:path'
import { clientDataDir, listDataFiles } from '../lib/clients.ts'
import type {
  FieldProfile,
  FieldType,
  FileProfile,
  PiiKind,
  ProfileResult,
  Verdict,
} from '../lib/types.ts'
import { parseFile, type Record_ } from './parsers.ts'
import { detectPii, detectValueType, dominantType, isEmpty } from './detect.ts'

const MAX_SAMPLES = 3
// Een kolom wordt PII-geflagd als minstens dit deel van de gevulde waarden matcht.
const PII_THRESHOLD = 0.3

function profileField(name: string, values: unknown[]): FieldProfile {
  const total = values.length
  const filledValues = values.filter((v) => !isEmpty(v))
  const filled = filledValues.length

  const types: FieldType[] = values.map(detectValueType)
  const type = dominantType(types)

  // PII: tel per soort en flag boven de drempel.
  const piiCounts = new Map<PiiKind, number>()
  for (const v of filledValues) {
    const kind = detectPii(v)
    if (kind) piiCounts.set(kind, (piiCounts.get(kind) ?? 0) + 1)
  }
  const pii: PiiKind[] = []
  for (const [kind, count] of piiCounts) {
    if (filled > 0 && count / filled >= PII_THRESHOLD) pii.push(kind)
  }

  const distinctSet = new Set(filledValues.map((v) => String(v).trim()))

  // Samples: eerste paar unieke, niet-lege waarden (afgekapt).
  const samples: string[] = []
  for (const v of distinctSet) {
    if (samples.length >= MAX_SAMPLES) break
    samples.push(v.length > 60 ? v.slice(0, 57) + '…' : v)
  }

  const profile: FieldProfile = {
    name,
    type,
    emptyPct: total === 0 ? 0 : Math.round(((total - filled) / total) * 100),
    distinct: distinctSet.size,
    filled,
    samples,
    pii,
  }

  // Min/max: numeriek voor getallen, alfabetisch/temporeel voor de rest.
  if (type === 'integer' || type === 'number') {
    const nums = filledValues
      .map((v) => Number(String(v).replace(',', '.')))
      .filter((n) => Number.isFinite(n))
    if (nums.length) {
      profile.min = Math.min(...nums)
      profile.max = Math.max(...nums)
    }
  } else if (type === 'date') {
    const sorted = [...distinctSet].sort()
    profile.min = sorted[0]
    profile.max = sorted[sorted.length - 1]
  }

  return profile
}

function countDuplicates(records: Record_[]): number {
  const seen = new Set<string>()
  let dupes = 0
  for (const r of records) {
    const key = JSON.stringify(r)
    if (seen.has(key)) dupes++
    else seen.add(key)
  }
  return dupes
}

function profileSingleFile(dir: string, file: string): FileProfile {
  try {
    const { format, records } = parseFile(path.join(dir, file))
    // Verzamel alle veldnamen over alle records (records kunnen verschillen).
    const fieldNames: string[] = []
    const seen = new Set<string>()
    for (const r of records) {
      for (const k of Object.keys(r)) {
        if (!seen.has(k)) {
          seen.add(k)
          fieldNames.push(k)
        }
      }
    }

    const fields = fieldNames.map((name) =>
      profileField(
        name,
        records.map((r) => r[name]),
      ),
    )

    return {
      file,
      format,
      records: records.length,
      fields,
      duplicates: countDuplicates(records),
    }
  } catch (err) {
    return {
      file,
      format: 'onbekend',
      records: 0,
      fields: [],
      duplicates: 0,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

/**
 * Bepaal het eindoordeel: genoeg data voor een demo? Simpele, uitlegbare heuristiek
 * op basis van recordaantal, aantal bruikbare velden en volheid.
 */
function judge(files: FileProfile[]): { verdict: Verdict; reason: string } {
  const totalRecords = files.reduce((a, f) => a + f.records, 0)
  const allFields = files.flatMap((f) => f.fields)
  const usableFields = allFields.filter((f) => f.emptyPct < 60).length
  const hasErrors = files.some((f) => f.error)

  if (totalRecords === 0 || allFields.length === 0) {
    return {
      verdict: 'nee',
      reason: hasErrors
        ? 'Bestanden konden niet gelezen worden of bevatten geen records.'
        : 'Geen bruikbare records gevonden in de aangeleverde data.',
    }
  }

  if (totalRecords >= 20 && usableFields >= 2) {
    return {
      verdict: 'ja',
      reason: `${totalRecords} records met ${usableFields} goed gevulde velden — ruim genoeg voor een overtuigende demo.`,
    }
  }

  if (totalRecords >= 5 && usableFields >= 1) {
    return {
      verdict: 'twijfel',
      reason: `${totalRecords} records met ${usableFields} bruikbare velden — genoeg om iets te laten zien, maar krap voor een representatieve demo.`,
    }
  }

  return {
    verdict: 'nee',
    reason: `Slechts ${totalRecords} records en ${usableFields} bruikbare velden — te weinig om betrouwbaar te demonstreren.`,
  }
}

/** Profileer alle (of geselecteerde) databestanden van een klant. */
export function profileClient(name: string, only?: string[]): ProfileResult {
  const dir = clientDataDir(name)
  const files = listDataFiles(name, only)
  const profiles = files.map((f) => profileSingleFile(dir, f))

  const totalRecords = profiles.reduce((a, f) => a + f.records, 0)
  const totalFields = profiles.reduce((a, f) => a + f.fields.length, 0)

  const piiSet = new Set<PiiKind>()
  for (const f of profiles) {
    for (const field of f.fields) {
      for (const p of field.pii) piiSet.add(p)
    }
  }

  const { verdict, reason } = judge(profiles)

  return {
    klant: name,
    files: profiles,
    totalRecords,
    totalFields,
    piiFound: [...piiSet],
    verdict,
    verdictReason: reason,
  }
}
