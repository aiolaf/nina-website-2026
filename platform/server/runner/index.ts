import path from 'node:path'
import {
  clientDataDir,
  findDemo,
  listDataFiles,
  readConfig,
} from '../lib/clients.ts'
import { runText } from '../lib/anthropic.ts'
import { parseFile, type Record_ } from '../profiler/parsers.ts'
import type { RunNodeResult, RunResult, WorkflowNode } from '../lib/types.ts'

const AI_SYSTEM = (klant: string, demo: string) =>
  `Je bent een AI-stap binnen een n8n workflow voor de klant "${klant}" (demo: "${demo}").
Voer de instructie exact uit op de aangeleverde data. Antwoord kort en direct,
zonder inleiding of meta-uitleg. Geef alleen het resultaat van deze stap.`

/** Vervang {{veld}} placeholders in mockOutput met waarden uit de lopende data. */
function renderMock(template: string | undefined, data: unknown): unknown {
  if (!template) return data
  if (!/\{\{.*?\}\}/.test(template)) return template
  const obj = (data && typeof data === 'object' ? data : {}) as Record_
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const val = obj[key]
    return val === undefined || val === null ? '' : String(val)
  })
}

/** Haal het n'e record uit het databestand van de gekozen demo. */
export function pickRecord(
  klant: string,
  demoId: string | undefined,
  recordIndex: number,
): {
  record: Record_ | null
  file: string | null
  total: number
} {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  const only = demo.dataFile ? [demo.dataFile] : config.dataFiles
  const files = listDataFiles(klant, only)
  if (!files.length) return { record: null, file: null, total: 0 }
  const file = files[0]
  const { records } = parseFile(path.join(clientDataDir(klant), file))
  if (!records.length) return { record: null, file, total: 0 }
  const idx = ((recordIndex % records.length) + records.length) % records.length
  return { record: records[idx], file, total: records.length }
}

async function callWebhook(url: string, payload: unknown): Promise<unknown> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20_000),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`n8n webhook antwoordde met ${res.status}: ${text.slice(0, 200)}`)
  }
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Voer de workflow uit voor één record.
 * - AI-nodes: echte Anthropic-calls.
 * - Overige nodes: gemockt met de echte data.
 * - Real n8n mode: de trigger-payload gaat naar de webhook uit config.json;
 *   het antwoord van n8n vervangt de gemockte keten.
 */
export async function runWorkflow(
  klant: string,
  demoId: string | undefined,
  recordIndex: number,
  realN8n: boolean,
): Promise<RunResult> {
  const config = readConfig(klant)
  const demo = findDemo(config, demoId)
  const webhookUrl = demo.n8nWebhookUrl
  const { record } = pickRecord(klant, demo.id, recordIndex)
  const triggerInput: unknown = record ?? { info: 'geen data — voorbeeldrecord' }

  const base = {
    klant,
    demoId: demo.id,
    demoLabel: demo.label,
    recordIndex,
  }

  const nodes: RunNodeResult[] = []
  const workflow = demo.workflow.length
    ? demo.workflow
    : ([{ id: 'trigger', label: 'Nieuwe record', kind: 'trigger' }] as WorkflowNode[])

  // 1. Trigger-node toont altijd het echte inputrecord.
  const trigger =
    workflow.find((n) => n.kind === 'trigger') ?? workflow[0]
  nodes.push({
    id: trigger.id,
    label: trigger.label,
    kind: 'trigger',
    input: null,
    output: triggerInput,
    ms: 0,
    source: 'trigger',
  })

  // 2. Real n8n mode: delegeer de rest aan de echte webhook.
  if (realN8n) {
    if (!webhookUrl) {
      nodes.push({
        id: 'n8n',
        label: 'n8n webhook',
        kind: 'output',
        input: triggerInput,
        output: null,
        ms: 0,
        source: 'n8n',
        error: 'Geen n8nWebhookUrl in config.json — zet real mode uit of vul de URL in.',
      })
      return { ...base, usedRealN8n: true, nodes }
    }
    const start = Date.now()
    try {
      const output = await callWebhook(webhookUrl, triggerInput)
      nodes.push({
        id: 'n8n',
        label: 'n8n workflow',
        kind: 'output',
        input: triggerInput,
        output,
        ms: Date.now() - start,
        source: 'n8n',
      })
    } catch (err) {
      nodes.push({
        id: 'n8n',
        label: 'n8n workflow',
        kind: 'output',
        input: triggerInput,
        output: null,
        ms: Date.now() - start,
        source: 'n8n',
        error: err instanceof Error ? err.message : String(err),
      })
    }
    return { ...base, usedRealN8n: true, nodes }
  }

  // 3. Lokale uitvoering: loop door de overige nodes.
  let current: unknown = triggerInput
  for (const node of workflow) {
    if (node === trigger) continue
    const start = Date.now()
    try {
      if (node.kind === 'ai') {
        const prompt = `${node.prompt || 'Verwerk deze data.'}\n\nDATA:\n${JSON.stringify(
          current,
          null,
          2,
        )}`
        const output = await runText(
          AI_SYSTEM(config.klant || klant, demo.label),
          prompt,
        )
        nodes.push({
          id: node.id,
          label: node.label,
          kind: node.kind,
          input: current,
          output,
          ms: Date.now() - start,
          source: 'ai',
        })
        current = mergeStep(current, node.id, output)
      } else {
        const output = renderMock(node.mockOutput, current)
        nodes.push({
          id: node.id,
          label: node.label,
          kind: node.kind,
          input: current,
          output,
          ms: Date.now() - start,
          source: 'mock',
        })
        current = mergeStep(current, node.id, output)
      }
    } catch (err) {
      nodes.push({
        id: node.id,
        label: node.label,
        kind: node.kind,
        input: current,
        output: null,
        ms: Date.now() - start,
        source: node.kind === 'ai' ? 'ai' : 'mock',
        error: err instanceof Error ? err.message : String(err),
      })
      break
    }
  }

  return { ...base, usedRealN8n: false, nodes }
}

/** Voeg de output van een stap toe aan de lopende data zodat volgende stappen erbij kunnen. */
function mergeStep(current: unknown, nodeId: string, output: unknown): unknown {
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    return { ...(current as Record_), [nodeId]: output }
  }
  return { input: current, [nodeId]: output }
}
