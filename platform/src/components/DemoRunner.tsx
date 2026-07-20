import { useEffect, useRef, useState } from 'react'
import type { DemoDef, HistoryEntry, RunResult } from '../lib/types'
import { api } from '../lib/api'
import { Badge, ErrorNote, Spinner } from './ui'
import {
  Connector,
  WorkflowNodeCard,
  type NodeStatus,
} from './WorkflowNodeCard'
import { SourcePanel } from './SourcePanel'
import { OfferUploadPanel } from './OfferUploadPanel'
import { ExcelViewer } from './ExcelViewer'

export function DemoRunner({
  klant,
  demos,
  hasApiKey,
}: {
  klant: string
  demos: DemoDef[]
  hasApiKey: boolean
}) {
  const [demoId, setDemoId] = useState(demos[0]?.id ?? 'demo')
  const demo = demos.find((d) => d.id === demoId) ?? demos[0]

  const [recordIndex, setRecordIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [realN8n, setRealN8n] = useState(false)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<RunResult | null>(null)
  const [revealed, setRevealed] = useState(-1)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [viewingId, setViewingId] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function loadHistory() {
    api
      .history(klant)
      .then((r) => setHistory(r.entries))
      .catch(() => {})
  }

  // Reset selectie als de klant wisselt.
  useEffect(() => {
    setDemoId(demos[0]?.id ?? 'demo')
    loadHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [klant])

  // Records + reset bij demo-wissel.
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    setResult(null)
    setViewingId(null)
    setRevealed(-1)
    setError(null)
    setRecordIndex(0)
    let cancelled = false
    api
      .record(klant, demoId, 0)
      .then((info) => {
        if (!cancelled) setTotal(info.total)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [klant, demoId])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const nodes = demo?.workflow?.length
    ? demo.workflow
    : [{ id: 'trigger', label: 'Nieuwe record', kind: 'trigger' as const }]

  async function run() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setError(null)
    setResult(null)
    setViewingId(null)
    setRevealed(-1)
    setRunning(true)
    try {
      const res = await api.run(klant, demoId, recordIndex, realN8n)
      setResult(res)
      res.nodes.forEach((_, i) => {
        const t = setTimeout(() => setRevealed(i), i * 500)
        timers.current.push(t)
      })
      const done = setTimeout(() => {
        setRunning(false)
        loadHistory()
      }, res.nodes.length * 500)
      timers.current.push(done)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setRunning(false)
    }
  }

  function viewEntry(entry: HistoryEntry) {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setError(null)
    setRunning(false)
    if (entry.demoId && demos.some((d) => d.id === entry.demoId)) {
      setDemoId(entry.demoId)
    }
    setResult({
      klant: entry.klant,
      demoId: entry.demoId,
      demoLabel: entry.demoLabel,
      recordIndex: entry.recordIndex,
      usedRealN8n: entry.usedRealN8n,
      nodes: entry.nodes,
    })
    setRevealed(entry.nodes.length - 1)
    setViewingId(entry.id)
  }

  async function deleteEntry(id: string) {
    try {
      await api.deleteRun(id)
      if (viewingId === id) {
        setResult(null)
        setViewingId(null)
        setRevealed(-1)
      }
      loadHistory()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  async function clearAll() {
    try {
      await api.clearHistory(klant)
      setHistory([])
      if (viewingId) {
        setResult(null)
        setViewingId(null)
        setRevealed(-1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  function statusFor(i: number): NodeStatus {
    if (!result) return 'idle'
    const node = result.nodes[i]
    if (!node) return 'idle'
    if (i > revealed) return 'idle'
    if (i === revealed && running) return 'running'
    if (node.error) return 'error'
    return 'done'
  }

  const webhookAvailable = Boolean(demo?.n8nWebhookUrl)

  return (
    <div className="space-y-5">
      {/* Demo-kiezer */}
      {demos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {demos.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setDemoId(d.id)}
              disabled={running}
              className={`rounded-xl border px-3 py-2 text-sm transition disabled:opacity-50 ${
                d.id === demoId
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
                  : 'border-[var(--color-line)] bg-white hover:border-[var(--color-ink-soft)]'
              }`}
            >
              <span className="mr-1.5 opacity-60">{i + 1}</span>
              {d.label}
            </button>
          ))}
        </div>
      )}
      {demo?.beschrijving && (
        <p className="-mt-2 text-sm text-[var(--color-ink-soft)]">
          {demo.beschrijving}
        </p>
      )}

      {demo?.excel?.upload ? (
        <OfferUploadPanel klant={klant} demo={demo} hasApiKey={hasApiKey} />
      ) : (
        demo?.sources && <SourcePanel klant={klant} sources={demo.sources} single />
      )}

      {/* Bediening */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-4">
        <button
          onClick={run}
          disabled={running}
          className="rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
        >
          {running ? 'Demo draait…' : '▶ Run demo'}
        </button>

        {total > 0 && (
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-ink-soft)]">Record</span>
            <button
              onClick={() => setRecordIndex((i) => Math.max(0, i - 1))}
              disabled={running || recordIndex === 0}
              className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)] disabled:opacity-40"
              aria-label="Vorig record"
            >
              ‹
            </button>
            <input
              type="range"
              min={0}
              max={Math.max(0, total - 1)}
              value={recordIndex}
              disabled={running}
              onChange={(e) => setRecordIndex(Number(e.target.value))}
              className="w-32 accent-[var(--color-accent)]"
            />
            <button
              onClick={() => setRecordIndex((i) => Math.min(total - 1, i + 1))}
              disabled={running || recordIndex >= total - 1}
              className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)] disabled:opacity-40"
              aria-label="Volgend record"
            >
              ›
            </button>
            <span className="w-14 tabular-nums text-[var(--color-ink-soft)]">
              {recordIndex + 1} / {total}
            </span>
          </label>
        )}

        <label
          className={`flex items-center gap-2 text-sm ${
            webhookAvailable ? '' : 'opacity-50'
          }`}
          title={
            webhookAvailable
              ? 'Stuur de payload naar de echte n8n-webhook i.p.v. te mocken'
              : 'Geen n8nWebhookUrl voor deze demo'
          }
        >
          <input
            type="checkbox"
            checked={realN8n}
            disabled={running || !webhookAvailable}
            onChange={(e) => setRealN8n(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span>Real n8n mode</span>
        </label>

        {result && (
          <Badge tone={result.usedRealN8n ? 'accent' : 'neutral'}>
            {result.usedRealN8n ? 'via n8n webhook' : 'lokaal (AI + mock)'}
          </Badge>
        )}
      </div>

      {!hasApiKey && !realN8n && (
        <ErrorNote message="Geen API key ingesteld — de AI-stappen werken pas na het toevoegen van je Anthropic key via Instellingen. (Real n8n mode werkt wel zonder key.)" />
      )}
      {error && <ErrorNote message={error} />}
      {running && revealed < 0 && <Spinner label="Workflow starten…" />}

      {/* Samenvatting na afloop */}
      {result && !running && (
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-neutral-50 px-4 py-3 text-sm">
          <span className="font-medium">Resultaat</span>
          <span className="text-[var(--color-ink-soft)]">
            {result.nodes.length} stappen
          </span>
          {!result.usedRealN8n && (
            <span className="text-[var(--color-ink-soft)]">
              {result.nodes.filter((n) => n.source === 'ai').length} echte
              AI-calls
            </span>
          )}
          <span className="text-[var(--color-ink-soft)]">
            {result.nodes.reduce((a, n) => a + n.ms, 0)}ms totaal
          </span>
          {result.nodes.some((n) => n.error) && (
            <Badge tone="bad">
              {result.nodes.filter((n) => n.error).length} fout
            </Badge>
          )}
        </div>
      )}

      {viewingId && (
        <div className="flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-neutral-50 px-4 py-2 text-sm">
          <span className="text-[var(--color-ink-soft)]">
            Je bekijkt een bewaarde demo-run.
          </span>
          <button
            onClick={() => {
              setResult(null)
              setViewingId(null)
              setRevealed(-1)
            }}
            className="text-[var(--color-ink-soft)] underline hover:text-[var(--color-ink)]"
          >
            terug naar live
          </button>
        </div>
      )}

      {/* De flow */}
      <div>
        {(result ? result.nodes : nodes).map((n, i) => (
          <div key={n.id + i}>
            {i > 0 && (
              <Connector active={running && revealed >= i - 1 && revealed < i} />
            )}
            <WorkflowNodeCard
              node={n}
              status={statusFor(i)}
              result={result?.nodes[i]}
            />
          </div>
        ))}
      </div>

      {/* Excel-viewer + download (voor demo's met een Excel-template) */}
      {demo?.excel && (
        <ExcelViewer
          klant={klant}
          demoId={demo.id}
          downloadHref={api.excelUrl(klant, demo.id)}
        />
      )}

      {/* Historie van eerdere runs (alle demo's van deze klant) */}
      <HistoryPanel
        history={history}
        viewingId={viewingId}
        onView={viewEntry}
        onDelete={deleteEntry}
        onClear={clearAll}
      />
    </div>
  )
}

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString('nl-NL', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function HistoryPanel({
  history,
  viewingId,
  onView,
  onDelete,
  onClear,
}: {
  history: HistoryEntry[]
  viewingId: string | null
  onView: (e: HistoryEntry) => void
  onDelete: (id: string) => void
  onClear: () => void
}) {
  const [confirmClear, setConfirmClear] = useState(false)
  if (history.length === 0) return null

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Eerdere demo's</span>
          <Badge>{history.length}</Badge>
        </div>
        {confirmClear ? (
          <span className="flex items-center gap-2 text-sm">
            <span className="text-[var(--color-ink-soft)]">Alles wissen?</span>
            <button
              onClick={() => {
                setConfirmClear(false)
                onClear()
              }}
              className="font-medium text-rose-600 hover:underline"
            >
              ja
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="text-[var(--color-ink-soft)] hover:underline"
            >
              nee
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirmClear(true)}
            className="text-sm text-[var(--color-ink-soft)] transition hover:text-rose-600"
          >
            Alles wissen
          </button>
        )}
      </div>
      <ul>
        {history.map((e) => {
          const aiCalls = e.nodes.filter((n) => n.source === 'ai').length
          const errors = e.nodes.filter((n) => n.error).length
          const active = e.id === viewingId
          return (
            <li
              key={e.id}
              className={`flex items-center gap-3 border-b border-[var(--color-line)] px-5 py-3 text-sm last:border-0 ${
                active ? 'bg-[var(--color-accent-soft)]' : ''
              }`}
            >
              <span className="w-28 shrink-0 tabular-nums text-[var(--color-ink-soft)]">
                {formatWhen(e.createdAt)}
              </span>
              {e.demoLabel && (
                <span className="w-40 shrink-0 truncate" title={e.demoLabel}>
                  {e.demoLabel}
                </span>
              )}
              <span className="w-20 shrink-0 text-[var(--color-ink-soft)]">
                record {e.recordIndex + 1}
              </span>
              <Badge tone={e.usedRealN8n ? 'accent' : 'neutral'}>
                {e.usedRealN8n ? 'n8n' : 'lokaal'}
              </Badge>
              <span className="flex-1 truncate text-[var(--color-ink-soft)]">
                {e.nodes.length} stappen
                {aiCalls > 0 && ` · ${aiCalls} AI`}
                {errors > 0 && ` · ${errors} fout`}
              </span>
              <button
                onClick={() => onView(e)}
                className="shrink-0 rounded-md border border-[var(--color-line)] px-2.5 py-1 text-xs transition hover:border-[var(--color-ink-soft)]"
              >
                bekijk
              </button>
              <button
                onClick={() => onDelete(e.id)}
                aria-label="Verwijder run"
                className="shrink-0 rounded-md px-2 py-1 text-[var(--color-ink-soft)] transition hover:bg-rose-50 hover:text-rose-600"
              >
                ✕
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
