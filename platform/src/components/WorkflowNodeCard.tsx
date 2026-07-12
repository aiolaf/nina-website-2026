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

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
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
            <div className="grid gap-3 md:grid-cols-2">
              {node.kind !== 'trigger' && (
                <IoBlock label="Input" value={result.input} muted />
              )}
              <IoBlock
                label={node.kind === 'trigger' ? 'Record' : 'Output'}
                value={result.output}
                accent={isAi}
                full={node.kind === 'trigger'}
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
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
        {label}
      </div>
      <pre
        className={`max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-xs leading-relaxed ${
          accent
            ? 'bg-[var(--color-accent-soft)] text-emerald-900'
            : muted
              ? 'bg-neutral-50 text-[var(--color-ink-soft)]'
              : 'bg-neutral-50 text-[var(--color-ink)]'
        }`}
      >
        {renderValue(value)}
      </pre>
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
