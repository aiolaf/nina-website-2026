import { useEffect, useRef, useState } from 'react'
import type { ClientConfig, RunResult } from '../lib/types'
import { api } from '../lib/api'
import { Badge, ErrorNote, Spinner } from './ui'
import {
  Connector,
  WorkflowNodeCard,
  type NodeStatus,
} from './WorkflowNodeCard'

export function DemoRunner({
  klant,
  config,
  hasApiKey,
}: {
  klant: string
  config: ClientConfig
  hasApiKey: boolean
}) {
  const [recordIndex, setRecordIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [realN8n, setRealN8n] = useState(false)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<RunResult | null>(null)
  // Tot welke node-index is de "stroom" onthuld (voor de flow-animatie).
  const [revealed, setRevealed] = useState(-1)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Aantal records ophalen zodat de slider klopt.
  useEffect(() => {
    let cancelled = false
    api
      .record(klant, 0)
      .then((info) => {
        if (!cancelled) setTotal(info.total)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [klant])

  // Ruim timers op bij unmount / opnieuw runnen.
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const nodes = config.workflow.length
    ? config.workflow
    : [{ id: 'trigger', label: 'Nieuwe record', kind: 'trigger' as const }]

  async function run() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setError(null)
    setResult(null)
    setRevealed(-1)
    setRunning(true)
    try {
      const res = await api.run(klant, recordIndex, realN8n)
      setResult(res)
      // Onthul de nodes één voor één zodat de data zichtbaar "stroomt".
      res.nodes.forEach((_, i) => {
        const t = setTimeout(() => setRevealed(i), i * 500)
        timers.current.push(t)
      })
      const done = setTimeout(
        () => setRunning(false),
        res.nodes.length * 500,
      )
      timers.current.push(done)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setRunning(false)
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

  return (
    <div className="space-y-5">
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
              onClick={() =>
                setRecordIndex((i) => Math.min(total - 1, i + 1))
              }
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
            config.n8nWebhookUrl ? '' : 'opacity-50'
          }`}
          title={
            config.n8nWebhookUrl
              ? 'Stuur de payload naar de echte n8n-webhook i.p.v. te mocken'
              : 'Geen n8nWebhookUrl in config.json'
          }
        >
          <input
            type="checkbox"
            checked={realN8n}
            disabled={running || !config.n8nWebhookUrl}
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
        <ErrorNote message="Geen ANTHROPIC_API_KEY gevonden — de AI-stappen werken pas na het invullen van .env. (Real n8n mode werkt wel zonder key.)" />
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
    </div>
  )
}
