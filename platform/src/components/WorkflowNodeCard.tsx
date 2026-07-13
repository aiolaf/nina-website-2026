import type { NodeKind, RunNodeResult } from '../lib/types'
import { Badge } from './ui'

const kindMeta: Record<NodeKind, { icon: string; label: string }> = {
  trigger: { icon: '⚡', label: 'Trigger' },
  ai: { icon: '✦', label: 'AI' },
  transform: { icon: '⚙', label: 'Transform' },
  route: { icon: '⋔', label: 'Route' },
  output: { icon: '➜', label: 'Output' },
}

export type NodeStatus = 'idle' | 'running' | 'done' | 'error'

function tryParseJson(s: string): unknown {
  const trimmed = s.trim()
  // Haal een eventueel ```json ... ``` codeblok eruit.
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const candidate = fenced ? fenced[1].trim() : trimmed
  if (!/^[[{]/.test(candidate)) return null
  try {
    return JSON.parse(candidate)
  } catch {
    return null
  }
}

// AI-stappen geven vaak JSON terug (soms in een ```json blok); parse dat.
function parseMaybe(value: unknown): unknown {
  if (typeof value === 'string') {
    const p = tryParseJson(value)
    return p !== null ? p : value
  }
  return value
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function scalarText(v: unknown): string {
  if (v === null || v === undefined || v === '') return '—'
  if (typeof v === 'object') return JSON.stringify(v)
  if (typeof v === 'number') return String(v)
  return String(v)
}

/** Cel-inhoud; markeert @@ (afwijkingssignaal uit de AI) met een vlaggetje. */
function Cell({ value }: { value: unknown }) {
  const t = scalarText(value)
  if (t.includes('@@')) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800">
        ⚑ {t.replace(/@@/g, '').trim() || 'let op'}
      </span>
    )
  }
  return <>{t}</>
}

/** Array van objecten → nette vergelijkingstabel (kolommen = velden). */
function DataTable({ rows }: { rows: Record<string, unknown>[] }) {
  const cols: string[] = []
  for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k)
  return (
    <div className="overflow-x-auto rounded-lg border border-black/10 bg-white/60">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-black/10">
            {cols.map((c) => (
              <th
                key={c}
                className="whitespace-nowrap px-2 py-1.5 font-semibold opacity-70"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-black/5 align-top last:border-0"
            >
              {cols.map((c) => (
                <td
                  key={c}
                  className="whitespace-pre-wrap break-words px-2 py-1.5"
                >
                  <Cell value={r[c]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Recursieve weergave: tabellen voor lijsten, key/value voor objecten. */
function ValueView({ value }: { value: unknown }) {
  const v = parseMaybe(value)

  if (v === null || v === undefined || v === '')
    return <span className="opacity-50">—</span>

  if (Array.isArray(v)) {
    if (v.length > 0 && v.every(isPlainObject)) {
      return <DataTable rows={v as Record<string, unknown>[]} />
    }
    if (v.length === 0) return <span className="opacity-50">—</span>
    return <span>{v.map((x) => scalarText(x)).join(', ')}</span>
  }

  if (isPlainObject(v)) {
    return (
      <dl className="space-y-1">
        {Object.entries(v).map(([k, val]) => (
          <div key={k} className="flex gap-2">
            <dt className="w-32 shrink-0 font-medium opacity-60">{k}</dt>
            <dd className="min-w-0 flex-1 break-words">
              <ValueView value={val} />
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  return <span className="whitespace-pre-wrap break-words">{String(v)}</span>
}

export function Connector({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-center justify-center">
      <div className="relative h-full w-px bg-[var(--color-line)]">
        {active && (
          <span className="nina-flow-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]" />
        )}
      </div>
    </div>
  )
}

export function WorkflowNodeCard({
  node,
  status,
  result,
}: {
  node: { id: string; label: string; kind: NodeKind; prompt?: string }
  status: NodeStatus
  result?: RunNodeResult
}) {
  const meta = kindMeta[node.kind]
  const ring =
    status === 'running'
      ? 'border-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-accent-soft)]'
      : status === 'done'
        ? 'border-[var(--color-line)]'
        : status === 'error'
          ? 'border-rose-300'
          : 'border-[var(--color-line)] opacity-70'

  const isAi = node.kind === 'ai'

  return (
    <div
      className={`rounded-2xl border bg-white transition-all ${ring}`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
            isAi
              ? 'bg-[var(--color-ink)] text-white'
              : 'bg-neutral-100 text-[var(--color-ink)]'
          }`}
        >
          {meta.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{node.label}</span>
            <Badge tone={isAi ? 'accent' : 'neutral'}>{meta.label}</Badge>
          </div>
        </div>
        <div className="shrink-0">
          {status === 'running' && (
            <span className="nina-pulse text-xs font-medium text-[var(--color-accent)]">
              bezig…
            </span>
          )}
          {status === 'done' && result && (
            <span className="text-xs text-[var(--color-ink-soft)]">
              {sourceLabel(result.source)}
              {result.ms > 0 && ` · ${result.ms}ms`}
            </span>
          )}
          {status === 'error' && (
            <span className="text-xs font-medium text-rose-600">fout</span>
          )}
        </div>
      </div>

      {/* Detail: prompt (idle) of input/output (na uitvoering) */}
      {status === 'idle' && node.prompt && (
        <div className="border-t border-[var(--color-line)] px-4 py-2 text-xs text-[var(--color-ink-soft)]">
          <span className="line-clamp-2">{node.prompt}</span>
        </div>
      )}

      {(status === 'done' || status === 'error') && result && (
        <div className="border-t border-[var(--color-line)] px-4 py-3">
          {result.error ? (
            <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {result.error}
            </div>
          ) : (
            <div className="space-y-3">
              {node.kind !== 'trigger' && (
                <IoBlock label="Input" value={result.input} muted />
              )}
              <IoBlock
                label={node.kind === 'trigger' ? 'Record' : 'Output'}
                value={result.output}
                accent={isAi}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function IoBlock({
  label,
  value,
  muted,
  accent,
  full,
}: {
  label: string
  value: unknown
  muted?: boolean
  accent?: boolean
  full?: boolean
}) {
  const bg = accent
    ? 'bg-[var(--color-accent-soft)] text-emerald-900'
    : muted
      ? 'bg-neutral-50 text-[var(--color-ink-soft)]'
      : 'bg-neutral-50 text-[var(--color-ink)]'

  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
        {label}
      </div>
      <div
        className={`max-h-80 overflow-auto rounded-lg px-3 py-2 text-xs leading-relaxed ${bg}`}
      >
        <ValueView value={value} />
      </div>
    </div>
  )
}

function sourceLabel(source: RunNodeResult['source']): string {
  switch (source) {
    case 'ai':
      return 'echte AI'
    case 'mock':
      return 'mock'
    case 'n8n':
      return 'n8n'
    case 'trigger':
      return 'trigger'
  }
}
