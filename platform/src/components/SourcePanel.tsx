import { useEffect, useRef, useState } from 'react'
import type { DemoDef } from '../lib/types'
import { api } from '../lib/api'
import { Badge } from './ui'
import { PdfPreview } from './PdfPreview'

type Mode = 'sharepoint' | 'outlook' | 'upload'
type Preview = { url: string; name: string } | null

export function SourcePanel({
  klant,
  sources,
  single = false,
}: {
  klant: string
  sources: NonNullable<DemoDef['sources']>
  /** true = één offerte (demo 1); false = meerdere (demo 2 fallback). */
  single?: boolean
}) {
  const [mode, setMode] = useState<Mode>(sources.outlook ? 'outlook' : 'sharepoint')
  const [fetched, setFetched] = useState(false)
  const [uploaded, setUploaded] = useState<File[]>([])
  const [preview, setPreview] = useState<Preview>(null)
  const objectUrl = useRef<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Ruim de object-URL van een geüploade preview netjes op.
  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    }
  }, [])

  function previewExample(f: { name: string; file?: string }) {
    if (!f.file) return
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current)
      objectUrl.current = null
    }
    setPreview({ url: api.sourceFileUrl(klant, f.file), name: f.name })
  }

  function previewUpload(file: File) {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    const url = URL.createObjectURL(file)
    objectUrl.current = url
    setPreview({ url, name: file.name })
  }

  function onPick(list: FileList | null) {
    if (!list) return
    const pdfs = Array.from(list).filter((f) =>
      f.name.toLowerCase().endsWith('.pdf'),
    )
    if (!pdfs.length) return
    const next = single ? pdfs.slice(0, 1) : pdfs
    setUploaded(next)
    previewUpload(next[0])
  }

  const FileRow = ({
    f,
    tone,
  }: {
    f: { name: string; bedrijf?: string; file?: string }
    tone: 'sharepoint' | 'outlook'
  }) => (
    <li className="flex items-center gap-3 px-3 py-2 text-sm">
      <span aria-hidden>📄</span>
      <span className="min-w-0 flex-1 truncate">{f.name}</span>
      {f.bedrijf && <Badge>{f.bedrijf}</Badge>}
      {f.file ? (
        <button
          onClick={() => previewExample(f)}
          className="shrink-0 rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
        >
          👁 preview
        </button>
      ) : (
        <span className="shrink-0 text-xs text-[var(--color-ink-soft)]">
          {tone === 'outlook' ? 'in mail' : fetched ? 'opgehaald ✓' : 'gevonden'}
        </span>
      )}
    </li>
  )

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            Brondocument{single ? '' : 'en'} — offerte{single ? '' : 's'}
          </span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            waar komt de PDF vandaan?
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-0.5 text-sm">
          <button
            onClick={() => setMode('sharepoint')}
            className={`rounded-md px-3 py-1 transition ${
              mode === 'sharepoint' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'
            }`}
          >
            📁 SharePoint
          </button>
          {sources.outlook && (
            <button
              onClick={() => setMode('outlook')}
              className={`rounded-md px-3 py-1 transition ${
                mode === 'outlook' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'
              }`}
            >
              📧 Outlook
            </button>
          )}
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
        {mode === 'sharepoint' && (
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
                <FileRow key={f.name} f={f} tone="sharepoint" />
              ))}
            </ul>
          </div>
        )}

        {mode === 'outlook' && (
          <div>
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
              <span aria-hidden>⚡</span>
              <span>
                Automatische n8n-connector (voorbeeld): een nieuwe offerte-mail in{' '}
                <strong>{sources.outlook}</strong> wordt herkend en de PDF-bijlage
                wordt direct verwerkt — zonder handmatig downloaden.
              </span>
            </div>
            <ul className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
              {sources.files.map((f) => (
                <li key={f.name} className="px-3 py-2 text-sm">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                    <span aria-hidden>✉️</span>
                    <span className="truncate">
                      {f.bedrijf ? `${f.bedrijf} — ` : ''}offerte kanaalplaten Segro
                    </span>
                    <Badge>nieuw</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <span aria-hidden>📎</span>
                    <span className="min-w-0 flex-1 truncate">{f.name}</span>
                    {f.file ? (
                      <button
                        onClick={() => previewExample(f)}
                        className="shrink-0 rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
                      >
                        👁 preview
                      </button>
                    ) : (
                      <span className="shrink-0 text-xs text-[var(--color-ink-soft)]">
                        bijlage
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {mode === 'upload' && (
          <div>
            <button
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--color-line)] px-4 py-8 text-sm text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)]"
            >
              <span className="text-2xl">⬆</span>
              <span>
                {single
                  ? 'Sleep één offerte-PDF hierheen of klik om te kiezen'
                  : "Sleep de offerte-PDF's hierheen of klik om te kiezen"}
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple={!single}
              className="hidden"
              onChange={(e) => onPick(e.target.files)}
            />
            {uploaded.length > 0 && (
              <ul className="mt-3 divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                {uploaded.map((f, i) => (
                  <li key={f.name + i} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span aria-hidden>📄</span>
                    <span className="min-w-0 flex-1 truncate">{f.name}</span>
                    <button
                      onClick={() => previewUpload(f)}
                      className="shrink-0 rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
                    >
                      👁 preview
                    </button>
                    <span className="shrink-0 text-xs text-emerald-600">klaar ✓</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {preview && (
          <PdfPreview
            url={preview.url}
            name={preview.name}
            onClose={() => setPreview(null)}
          />
        )}

        <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
          Demo — in productie haalt de n8n-workflow de offerte automatisch op uit
          SharePoint of rechtstreeks uit de inkoop-mailbox (Outlook), of hij
          verwerkt je upload. Daarna lezen de stappen hieronder de offerte uit,
          normaliseren en vergelijken ze.
        </p>
      </div>
    </div>
  )
}
