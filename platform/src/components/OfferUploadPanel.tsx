import { useEffect, useRef, useState } from 'react'
import type { DemoDef, OfferFillResult } from '../lib/types'
import { api } from '../lib/api'
import { Badge, ErrorNote, Spinner } from './ui'
import { PdfPreview } from './PdfPreview'

type Mode = 'sharepoint' | 'outlook' | 'upload'
type Preview = { url: string; name: string } | null

function fmtEuro(n: number | null): string {
  if (n == null) return '—'
  return n.toLocaleString('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
}

function fmtPrijs(n: number | null): string {
  if (n == null) return '—'
  return n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** Lees een File als base64 (zonder data:-prefix). */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const res = String(reader.result)
      resolve(res.slice(res.indexOf(',') + 1))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function downloadBase64(base64: string, filename: string) {
  const bytes = atob(base64)
  const arr = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  const blob = new Blob([arr], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function OfferUploadPanel({
  klant,
  demo,
  hasApiKey,
}: {
  klant: string
  demo: DemoDef
  hasApiKey: boolean
}) {
  const spec = demo.excel!.upload!
  const sources = demo.sources
  const maxFiles = spec.blocks.length

  const [mode, setMode] = useState<Mode>('upload')
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<OfferFillResult | null>(null)
  const [preview, setPreview] = useState<Preview>(null)
  const objectUrl = useRef<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

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

  function addFiles(list: FileList | null) {
    if (!list) return
    const pdfs = Array.from(list).filter((f) =>
      f.name.toLowerCase().endsWith('.pdf'),
    )
    setFiles((prev) => [...prev, ...pdfs].slice(0, maxFiles))
    setError(null)
  }

  async function run() {
    if (!files.length) return
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const payload = await Promise.all(
        files.map(async (f) => ({ name: f.name, base64: await fileToBase64(f) })),
      )
      const res = await api.offersFill(klant, demo.id, payload)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      {/* Kop + bron-toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Offertes uitlezen & prijsvergelijk vullen</span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            upload de PDF's → Claude leest ze uit → in het template
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
          {sources?.outlook && (
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
                {sources?.sharepoint ?? 'SharePoint > Offertes'}
              </code>
            </div>
            {sources?.files?.length ? (
              <ul className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                {sources.files.map((f) => (
                  <li key={f.name} className="flex items-center gap-3 px-3 py-2 text-sm">
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
                      <span className="text-xs text-[var(--color-ink-soft)]">gevonden</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
              In productie haalt de n8n-workflow deze offertes automatisch uit de
              SharePoint-map. Wil je het nu <strong>echt</strong> draaien? Kies{' '}
              <button
                onClick={() => setMode('upload')}
                className="underline hover:text-[var(--color-ink)]"
              >
                Zelf uploaden
              </button>{' '}
              en sleep de PDF's erin — Claude leest ze live uit.
            </p>
          </div>
        )}

        {mode === 'outlook' && (
          <div>
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
              <span aria-hidden>⚡</span>
              <span>
                Automatische n8n-connector (voorbeeld): nieuwe offerte-mails in{' '}
                <strong>{sources?.outlook}</strong> worden herkend en de PDF-bijlagen
                direct verwerkt.
              </span>
            </div>
            {sources?.files?.length ? (
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
                        <span className="text-xs text-[var(--color-ink-soft)]">bijlage</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
              Wil je het nu <strong>echt</strong> draaien? Kies{' '}
              <button
                onClick={() => setMode('upload')}
                className="underline hover:text-[var(--color-ink)]"
              >
                Zelf uploaden
              </button>{' '}
              — Claude leest de PDF's live uit.
            </p>
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
                Sleep {maxFiles} offerte-PDF's hierheen of klik om te kiezen
              </span>
              <span className="text-xs">
                (1–{maxFiles} stuks — de rest van het vergelijk blijft leeg)
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />

            {files.length > 0 && (
              <ul className="mt-3 divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                {files.map((f, i) => (
                  <li key={f.name + i} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span aria-hidden>📄</span>
                    <span className="min-w-0 flex-1 truncate">{f.name}</span>
                    <span className="text-xs text-[var(--color-ink-soft)]">
                      blok {i + 1}
                    </span>
                    <button
                      onClick={() => previewUpload(f)}
                      className="shrink-0 rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
                    >
                      👁 preview
                    </button>
                    <button
                      onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                      aria-label="Verwijder bestand"
                      className="rounded-md px-2 py-0.5 text-[var(--color-ink-soft)] transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={run}
                disabled={busy || files.length === 0}
                className="rounded-xl bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
              >
                {busy ? 'Bezig…' : `Uitlezen & invullen (${files.length})`}
              </button>
              {files.length > 0 && !busy && (
                <button
                  onClick={() => {
                    setFiles([])
                    setResult(null)
                  }}
                  className="text-sm text-[var(--color-ink-soft)] underline hover:text-[var(--color-ink)]"
                >
                  wissen
                </button>
              )}
            </div>

            {!hasApiKey && (
              <p className="mt-3 text-xs text-amber-700">
                Let op: de PDF's worden door Claude uitgelezen — voeg eerst je
                Anthropic API key toe via Instellingen.
              </p>
            )}
          </div>
        )}

        {busy && (
          <div className="mt-4">
            <Spinner label="Claude leest de offerte-PDF's uit en vult het prijsvergelijk…" />
          </div>
        )}
        {error && (
          <div className="mt-4">
            <ErrorNote message={error} />
          </div>
        )}

        {preview && (
          <PdfPreview
            url={preview.url}
            name={preview.name}
            onClose={() => setPreview(null)}
          />
        )}
      </div>

      {result && <OfferResultTable result={result} spec={spec} />}
    </div>
  )
}

function OfferResultTable({
  result,
  spec,
}: {
  result: OfferFillResult
  spec: NonNullable<DemoDef['excel']>['upload']
}) {
  const { leveranciers, posten, totalen, gunstigsteIndex } = result
  return (
    <div className="border-t border-[var(--color-line)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Prijsvergelijk — uitgelezen</span>
          <Badge tone="good">{leveranciers.length} leverancier(s)</Badge>
          <span className="text-xs text-[var(--color-ink-soft)]">
            gunstigste prijs per post is groen gemarkeerd
          </span>
        </div>
        <button
          onClick={() => downloadBase64(result.xlsxBase64, result.filename)}
          className="rounded-xl border border-[var(--color-line)] px-3 py-1.5 text-sm font-medium transition hover:border-[var(--color-ink-soft)]"
        >
          ⬇ Download ingevulde Excel
        </button>
      </div>

      <div className="overflow-x-auto px-5 pb-5">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left">
              <th className="py-2 pr-3 font-medium">Post</th>
              {leveranciers.map((l, i) => (
                <th key={i} className="px-3 py-2 font-medium">
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posten.map((post) => {
              const anyOffered = post.cellen.some((c) => c.aangeboden)
              if (!anyOffered) return null
              return (
                <tr key={post.id} className="border-b border-[var(--color-line)] align-top">
                  <td className="py-2 pr-3 text-[var(--color-ink-soft)]">{post.label}</td>
                  {post.cellen.map((c, i) => (
                    <td
                      key={i}
                      className={`px-3 py-2 ${c.best ? 'bg-[var(--color-accent-soft)]' : ''}`}
                    >
                      {c.aangeboden ? (
                        <div>
                          <div className="font-medium tabular-nums">
                            € {fmtPrijs(c.prijs)}
                            {c.eenheid ? (
                              <span className="font-normal text-[var(--color-ink-soft)]">
                                {' '}
                                / {c.eenheid}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-xs text-[var(--color-ink-soft)] tabular-nums">
                            {c.hoeveelheid != null && `${c.hoeveelheid} × → `}
                            {fmtEuro(c.totaal)}
                          </div>
                          {c.opmerking && (
                            <div className="mt-0.5 text-xs text-amber-700">{c.opmerking}</div>
                          )}
                          {c.best && (
                            <span className="mt-0.5 inline-block text-xs font-medium text-emerald-700">
                              gunstigst ✓
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[var(--color-ink-soft)]">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[var(--color-ink)] font-semibold">
              <td className="py-2 pr-3">Totaal</td>
              {totalen.map((t, i) => (
                <td
                  key={i}
                  className={`px-3 py-2 tabular-nums ${
                    gunstigsteIndex === i ? 'text-emerald-700' : ''
                  }`}
                >
                  {fmtEuro(t)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>

        <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
          Elke PDF is door Claude uitgelezen en in de juiste kolom van het{' '}
          <code className="rounded bg-neutral-100 px-1">{spec?.sheet}</code>-template
          gezet. De formules (totaal = prijs × hoeveelheid) en huisstijl blijven
          behouden; niet-geüploade leveranciers blijven leeg. Download bevat het
          volledige, geldige contract-Excel.
        </p>
      </div>
    </div>
  )
}
