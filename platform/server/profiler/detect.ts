import type { FieldType, PiiKind } from '../lib/types.ts'

// --- Regexes voor type- en PII-detectie ---
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Telefoon: NL/internationaal, tolerant voor spaties, streepjes en haakjes.
const PHONE_RE = /^\+?[0-9][0-9\s\-().]{6,}[0-9]$/
// IBAN: 2 letters land + 2 cijfers + 11-30 alfanumeriek.
const IBAN_RE = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/i
// BSN-achtig: exact 8 of 9 cijfers.
const BSN_RE = /^\d{8,9}$/
const INT_RE = /^-?\d+$/
const NUM_RE = /^-?\d+([.,]\d+)?$/
const DATE_RE =
  /^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2})?)?$|^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/

export function isEmpty(v: unknown): boolean {
  return v === null || v === undefined || String(v).trim() === ''
}

/** Detecteer het type van één losse waarde. */
export function detectValueType(raw: unknown): FieldType {
  if (isEmpty(raw)) return 'empty'
  if (typeof raw === 'boolean') return 'boolean'
  if (typeof raw === 'number') return Number.isInteger(raw) ? 'integer' : 'number'

  const s = String(raw).trim()
  if (EMAIL_RE.test(s)) return 'email'
  if (IBAN_RE.test(s.replace(/\s/g, ''))) return 'iban'
  if (/^(true|false|ja|nee|yes|no)$/i.test(s)) return 'boolean'
  if (INT_RE.test(s)) return 'integer'
  if (NUM_RE.test(s)) return 'number'
  if (DATE_RE.test(s)) return 'date'
  if (PHONE_RE.test(s) && s.replace(/\D/g, '').length >= 8) return 'phone'
  return 'string'
}

/** Detecteer PII-soort van één waarde (kan meerdere zijn). */
export function detectPii(raw: unknown): PiiKind | null {
  if (isEmpty(raw)) return null
  const s = String(raw).trim()
  if (EMAIL_RE.test(s)) return 'email'
  // Datums (bv. 2026-06-02) matchen anders per ongeluk op telefoon/BSN.
  if (DATE_RE.test(s)) return null
  if (IBAN_RE.test(s.replace(/\s/g, ''))) return 'iban'
  if (PHONE_RE.test(s) && s.replace(/\D/g, '').length >= 8) return 'phone'
  if (BSN_RE.test(s.replace(/\s/g, ''))) return 'bsn'
  return null
}

/**
 * Kies het dominante type van een kolom uit de per-waarde types.
 * Lege waarden tellen niet mee. Getallen degraderen naar 'number' als er mix is.
 */
export function dominantType(types: FieldType[]): FieldType {
  const counts = new Map<FieldType, number>()
  for (const t of types) {
    if (t === 'empty') continue
    counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  if (counts.size === 0) return 'empty'

  // integer + number samen -> number.
  if (counts.has('integer') && counts.has('number')) {
    counts.set('number', (counts.get('number') ?? 0) + (counts.get('integer') ?? 0))
    counts.delete('integer')
  }

  let best: FieldType = 'string'
  let bestCount = -1
  for (const [t, c] of counts) {
    if (c > bestCount) {
      best = t
      bestCount = c
    }
  }
  return best
}
