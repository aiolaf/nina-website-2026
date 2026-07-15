// Gedeelde types voor de backend. De frontend heeft een spiegel in src/lib/types.ts.
// Houd beide in sync als je het API-contract wijzigt.

export type NodeKind = 'trigger' | 'ai' | 'transform' | 'route' | 'output'

export interface WorkflowNode {
  id: string
  label: string
  kind: NodeKind
  /** Voor ai-nodes: de prompt die op het record wordt uitgevoerd. */
  prompt?: string
  /** Voor niet-ai-nodes: vaste of template mock-output. */
  mockOutput?: string
}

/** Eén demo binnen een klant: eigen label, workflow en (optioneel) databestand. */
export interface DemoDef {
  id: string
  label: string
  beschrijving?: string
  type?: 'automation' | 'agent'
  /** Databestand dat de trigger-records levert (default: eerste dataFile). */
  dataFile?: string
  workflow: WorkflowNode[]
  n8nWebhookUrl?: string
  /** Optioneel: vul een bestaand Excel-template in en bied het als download aan. */
  excel?: { template: string; fill: string; filename?: string }
}

export interface ClientConfig {
  klant: string
  vraag: string
  type: 'automation' | 'agent'
  dataFiles: string[]
  /** Eén of meer demo's. Backwards-compat: als leeg, wordt `workflow` gebruikt. */
  demos: DemoDef[]
  workflow: WorkflowNode[]
  n8nWebhookUrl?: string
}

/** Config zoals opgeslagen op schijf mag velden missen; we vullen defaults aan. */
export type RawClientConfig = Partial<ClientConfig>

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
  /** Percentage lege waarden (0-100). */
  emptyPct: number
  /** Aantal unieke niet-lege waarden. */
  distinct: number
  /** Aantal records met een niet-lege waarde. */
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
  /** Aantal exact-dubbele records. */
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
  /** Concreet waar échte/meer data deze demo sterker maakt. */
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
  /** Bron van de output: echte AI-call, mock, of de n8n-webhook. */
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

/** Een bewaarde demo-run in de historie. */
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
