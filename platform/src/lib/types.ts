// Spiegel van server/lib/types.ts — houd in sync bij API-wijzigingen.

export type NodeKind = 'trigger' | 'ai' | 'transform' | 'route' | 'output'

export interface WorkflowNode {
  id: string
  label: string
  kind: NodeKind
  prompt?: string
  mockOutput?: string
}

export interface DemoDef {
  id: string
  label: string
  beschrijving?: string
  type?: 'automation' | 'agent'
  dataFile?: string
  workflow: WorkflowNode[]
  n8nWebhookUrl?: string
  excel?: {
    template: string
    fill: string
    filename?: string
    viewFilled?: string
    upload?: UploadSpec
  }
  sources?: {
    sharepoint?: string
    outlook?: string
    files: { name: string; bedrijf?: string; file?: string }[]
  }
}

export interface UploadBlock {
  naam: string
  hoev: string
  eenh: string
  prijs: string
  totaal: string
  opm: string
}
export interface UploadPost {
  id: string
  row: number
  label: string
}
export interface UploadSpec {
  base: string
  sheet: string
  filename?: string
  blocks: UploadBlock[]
  posten: UploadPost[]
}

export interface OfferCompareCell {
  prijs: number | null
  hoeveelheid: number | null
  eenheid: string | null
  totaal: number | null
  opmerking: string | null
  aangeboden: boolean
  best: boolean
}
export interface OfferFillResult {
  klant: string
  demoId: string
  leveranciers: string[]
  posten: { id: string; label: string; cellen: OfferCompareCell[] }[]
  totalen: (number | null)[]
  gunstigsteIndex: number | null
  xlsxBase64: string
  filename: string
}

export interface GridCell {
  c: number
  addr: string
  v: string | number
  filled: boolean
  cs: number
  rs: number
}
export interface SheetGrid {
  sheet: string
  maxCol: number
  rows: { r: number; cells: GridCell[] }[]
}

export interface ClientConfig {
  klant: string
  vraag: string
  type: 'automation' | 'agent'
  dataFiles: string[]
  demos: DemoDef[]
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
  dataMeerwaarde: string[]
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
  demoId: string
  demoLabel: string
  recordIndex: number
  usedRealN8n: boolean
  nodes: RunNodeResult[]
}

export interface HistoryEntry {
  id: string
  klant: string
  demoId: string
  demoLabel: string
  createdAt: string
  recordIndex: number
  usedRealN8n: boolean
  nodes: RunNodeResult[]
}

export interface ClientDetail {
  config: ClientConfig
  dataFiles: string[]
  demos: DemoDef[]
}

export interface RecordInfo {
  record: Record<string, unknown> | null
  file: string | null
  total: number
}
