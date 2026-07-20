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
  excel?: {
    template: string
    fill: string
    filename?: string
    /** Bestand dat als "ingevuld" in de viewer wordt getoond (default: template + fill). */
    viewFilled?: string
    /** Optioneel: échte offerte-upload → AI-uitlezen → template invullen. */
    upload?: UploadSpec
  }
  /** Optioneel: brondocumenten-paneel (SharePoint / Outlook / upload) in de demo. */
  sources?: {
    sharepoint?: string
    /** Outlook-mailbox/-map (visueel: automatische n8n-connector). */
    outlook?: string
    files: {
      name: string
      bedrijf?: string
      /** Relatief pad naar een echt bestand in de klantmap voor de preview. */
      file?: string
    }[]
  }
}

/** Kolom-indeling van één leverancier-blok in het prijsvergelijk-template. */
export interface UploadBlock {
  /** Celadres (rij 2) waar de bedrijfsnaam komt, bv. "K2". */
  naam: string
  /** Kolomletters binnen dit blok. */
  hoev: string
  eenh: string
  prijs: string
  totaal: string
  opm: string
}

/** Eén begrotingspost (offertekant) met de rij in het template. */
export interface UploadPost {
  id: string
  row: number
  label: string
}

/** Config voor de échte offerte-upload van een demo. */
export interface UploadSpec {
  /** Leeg template dat gevuld wordt (relatief pad in de klantmap). */
  base: string
  sheet: string
  filename?: string
  /** Maximaal aantal leveranciers (= aantal blokken). */
  blocks: UploadBlock[]
  posten: UploadPost[]
}

/** Wat de AI per offerte-PDF teruggeeft. */
export interface ExtractedOffer {
  bedrijf: string
  regels: {
    post_id: string
    aangeboden: boolean
    hoeveelheid: number | null
    eenheid: string | null
    prijs_per_eenheid: number | null
    opmerking: string | null
  }[]
}

/** Eén cel in de vergelijk-/totaaltabel van de upload-viewer. */
export interface OfferCompareCell {
  prijs: number | null
  hoeveelheid: number | null
  eenheid: string | null
  totaal: number | null
  opmerking: string | null
  aangeboden: boolean
  /** true = gunstigste (laagste totaal) voor deze post. */
  best: boolean
}

/** Resultaat van een offerte-upload: extractie + vergelijk + download. */
export interface OfferFillResult {
  klant: string
  demoId: string
  /** Leveranciers in uploadvolgorde (naam per blok). */
  leveranciers: string[]
  posten: {
    id: string
    label: string
    cellen: OfferCompareCell[]
  }[]
  /** Totaal per leverancier (som van de posten). */
  totalen: (number | null)[]
  /** Gunstigste leverancier over het geheel (index in leveranciers), of null. */
  gunstigsteIndex: number | null
  /** Het ingevulde .xlsx als base64 (schone, geldige download). */
  xlsxBase64: string
  filename: string
}

/** Eén rij in de Excel-viewer. */
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
