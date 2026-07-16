import { useRef, useState } from 'react'
import type { DemoDef } from '../lib/types'
import { Badge } from './ui'

type Mode = 'sharepoint' | 'upload'

export function SourcePanel({ sources }: { sources: NonNullable<DemoDef['sources']> }) {
  const [mode, setMode] = useState<Mode>('sharepoint')
  const [fetched, setFetched] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Brondocumenten — offertes</span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            waar komen de PDF's vandaan?
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-0.5 text-sm">
          <button
            onClick={() => setMode('sharepoint')}
            className={`rounded-md px-3 py-1 transition ${
              mode === 'sharepoint' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'
            }`}
          >
            📁 SharePoint (automatisch)
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`rounded-md px-3 py-1 transition ${
              mode === 'upload' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'
            }`}
          >
            ⬆ Zelf uploaden
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        {mode === 'sharepoint' ? (
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[var(--color-ink-soft)]">Map:</span>
              <code className="rounded bg-neutral-100 px-2 py-0.5 text-xs">
                {sources.sharepoint ?? 'SharePoint > Offertes'}
              </code>
              <button
                onClick={() => setFetched(true)}
                className="ml-auto rounded-lg bg-[var(--color-ink)] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black"
              >
                {fetched ? '✓ Opgehaald' : 'Ophalen'}
              </button>
            </div>
            <ul className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
              {sources.files.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center gap-3 px-3 py-2 text-sm"
                >
                  <span aria-hidden>📄</span>
                  <span className="min-w-0 flex-1 truncate">{f.name}</span>
                  {f.bedrijf && <Badge>{f.bedrijf}</Badge>}
                  {fetched ? (
                    <span className="text-xs text-emerald-600">opgehaald ✓</span>
                  ) : (
                    <span className="text-xs text-[var(--color-ink-soft)]">
                      gevonden
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <button
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--color-line)] px-4 py-8 text-sm text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)]"
            >
              <span className="text-2xl">⬆</span>
              <span>Sleep de offerte-PDF's hierheen of klik om te kiezen</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) =>
                setUploaded(Array.from(e.target.files ?? []).map((f) => f.name))
              }
            />
            {uploaded.length > 0 && (
              <ul className="mt-3 divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                {uploaded.map((n) => (
                  <li key={n} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span aria-hidden>📄</span>
                    <span className="min-w-0 flex-1 truncate">{n}</span>
                    <span className="text-xs text-emerald-600">klaar ✓</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
          Demo — in productie haalt de n8n-workflow deze bestanden automatisch uit
          de SharePoint-map op, of verwerkt hij je uploads. Daarna lezen de stappen
          hieronder de offertes uit, normaliseren en vergelijken ze.
        </p>
      </div>
    </div>
  )
}
