import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'
import type { SheetGrid } from '../lib/types'
import { Badge, ErrorNote, Spinner } from './ui'

export function ExcelViewer({
  klant,
  demoId,
  downloadHref,
}: {
  klant: string
  demoId: string
  downloadHref: string
}) {
  const [mode, setMode] = useState<'template' | 'filled'>('template')
  const [grid, setGrid] = useState<SheetGrid | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadName, setUploadName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    api
      .excelView(klant, demoId, mode)
      .then((g) => {
        if (!cancelled) setGrid(g)
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [klant, demoId, mode])

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Prijsvergelijk-Excel</span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            (jullie template — alleen invullen, opmaak &amp; formules blijven)
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-0.5 text-sm">
          <button
            onClick={() => setMode('template')}
            className={`rounded-md px-3 py-1 transition ${
              mode === 'template'
                ? 'bg-white shadow-sm'
                : 'text-[var(--color-ink-soft)]'
            }`}
          >
            Leeg template
          </button>
          <button
            onClick={() => setMode('filled')}
            className={`rounded-md px-3 py-1 transition ${
              mode === 'filled'
                ? 'bg-white shadow-sm'
                : 'text-[var(--color-ink-soft)]'
            }`}
          >
            Ingevuld ✨
          </button>
        </div>
      </div>

      {/* Upload eigen leeg bestand (demo: het bundelde template wordt getoond) */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[var(--color-line)] bg-neutral-50 px-5 py-2.5 text-xs text-[var(--color-ink-soft)]">
        <span>Template staat standaard klaar.</span>
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-md border border-[var(--color-line)] px-2.5 py-1 transition hover:border-[var(--color-ink-soft)]"
        >
          ⬆ Upload je eigen lege prijsvergelijk
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={(e) => setUploadName(e.target.files?.[0]?.name ?? null)}
        />
        {uploadName && (
          <span className="text-emerald-700">
            geladen: {uploadName}{' '}
            <span className="text-[var(--color-ink-soft)]">
              (demo — het klaarstaande template wordt ingevuld)
            </span>
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        {loading && <Spinner label="Excel laden…" />}
        {error && <ErrorNote message={error} />}
        {grid && !loading && (
          <div className="overflow-auto rounded-lg border border-[var(--color-line)]">
            <table className="border-collapse text-[11px]">
              <tbody>
                {grid.rows.map((row) => (
                  <tr key={row.r}>
                    {row.cells.map((cell) => {
                      const isNum = typeof cell.v === 'number'
                      const highlight =
                        cell.filled && mode === 'filled'
                          ? 'bg-emerald-100 text-emerald-900'
                          : cell.filled && mode === 'template'
                            ? 'bg-amber-50 outline outline-1 outline-dashed outline-amber-300'
                            : ''
                      return (
                        <td
                          key={cell.addr}
                          colSpan={cell.cs}
                          rowSpan={cell.rs}
                          className={`whitespace-nowrap border border-[var(--color-line)] px-1.5 py-1 ${
                            isNum ? 'text-right tabular-nums' : ''
                          } ${row.r <= 8 ? 'font-medium' : ''} ${highlight}`}
                        >
                          {cell.v === '' ? ' ' : String(cell.v).slice(0, 40)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] px-5 py-3">
        <span className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
          <Badge tone="accent">groen</Badge> = automatisch ingevuld door de
          workflow
        </span>
        <a
          href={downloadHref}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-medium text-emerald-800 transition hover:border-emerald-400"
        >
          ⬇ Download ingevuld Excel
        </a>
      </div>
    </div>
  )
}
