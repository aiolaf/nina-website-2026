// Spiegel van server/lib/types.ts — houd in sync bij API-wijzigingen.

export type NodeKind = 'trigger' | 'ai' | 'transform' | 'route' | 'output'

export interface WorkflowNode {
  id: string
  label: string
  kind: NodeKind
  prompt?: string
  mockOutput?: string
}

export interface ClientConfig {
  klant: string
  vraag: string
  type: 'automation' | 'agent'
  dataFiles: string[]
  workflow: WorkflowNode[]
  n8nWebhookUrl?: string
}

export type FieldType =
  | 'string'
  | 'integer'
  | 'number'
  | 'boolean'
  | 'date'
  | 'email'
  | 'phone'
  | 'iban'
  | 'empty'

export type PiiKind = 'email' | 'phone' | 'iban' | 'bsn'

export interface FieldProfile {
  name: string
  type: FieldType
  emptyPct: number
  distinct: number
  filled: number
  min?: number | string
  max?: number | string
  samples: string[]
  pii: PiiKind[]
}

export type Verdict = 'ja' | 'twijfel' | 'nee'

export interface FileProfile {
  file: string
  format: 'csv' | 'json' | 'excel' | 'onbekend'
  records: number
  fields: FieldProfile[]
  duplicates: number
  error?: string
}

export interface ProfileResult {
  klant: string
  files: FileProfile[]
  totalRecords: number
  totalFields: number
  piiFound: PiiKind[]
  verdict: Verdict
  verdictReason: string
}

export interface FeasibilityReport {
  samenvatting: string
  aannameType: 'automation' | 'agent'
  aannameUitleg: string
  watKanNu: string[]
  moetGebouwd: string[]
  kanNietRisico: string[]
  openVragen: {
    data: string[]
    taak: string[]
    integratie: string[]
    productie: string[]
  }
}

export interface RunNodeResult {
  id: string
  label: string
  kind: NodeKind
  input: unknown
  output: unknown
  ms: number
  error?: string
  source: 'ai' | 'mock' | 'trigger' | 'n8n'
}

export interface RunResult {
  klant: string
  recordIndex: number
  usedRealN8n: boolean
  nodes: RunNodeResult[]
}

export interface ClientDetail {
  config: ClientConfig
  dataFiles: string[]
}

export interface RecordInfo {
  record: Record<string, unknown> | null
  file: string | null
  total: number
}
