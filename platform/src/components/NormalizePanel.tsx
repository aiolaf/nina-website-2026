import { useEffect, useRef, useState } from 'react'
import type { DemoDef, OfferCompareResult } from '../lib/types'
import { api } from '../lib/api'
import { Badge, ErrorNote, Spinner } from './ui'
import { PdfPreview } from './PdfPreview'

type Mode = 'sharepoint' | 'outlook' | 'upload'
type Preview = { url: string; name: string } | null

function fmtPrijs(n: number | null): string {
  if (n == null) return '—'
  return n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

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

export function NormalizePanel({
  klant,
  demo,
  hasApiKey,
}: {
  klant: string
  demo: DemoDef
  hasApiKey: boolean
}) {
  const spec = demo.normalize!
  const sources = demo.sources
  const min = spec.min ?? 2

  const [mode, setMode] = useState<Mode>(sources?.outlook ? 'outlook' : 'sharepoint')
  const [fetched, setFetched] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<OfferCompareResult | null>(null)
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
    const pdfs = Array.from(list).filter((f) => f.name.toLowerCase().endsWith('.pdf'))
    setFiles((prev) => [...prev, ...pdfs])
    setError(null)
  }

  async function normalizeBundled() {
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      setResult(await api.offersNormalize(klant, demo.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  async function normalizeUpload() {
    if (files.length < min) return
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const payload = await Promise.all(
        files.map(async (f) => ({ name: f.name, base64: await fileToBase64(f) })),
      )
      setResult(await api.offersNormalize(klant, demo.id, payload))
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Offertes samen normaliseren</span>
          <span className="text-xs text-[var(--color-ink-soft)]">
            alle offertes in één keer → vergelijkbare €/m²
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Bundel: alle offertes in één keer */}
        <div className="mb-4 rounded-xl border border-emerald-200 bg-[var(--color-accent-soft)] px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium">
                Alle {sources?.files?.length ?? 4} offertes normaliseren
              </div>
              <div className="text-xs text-[var(--color-ink-soft)]">
                Leest de binnengekomen offertes in één keer samen uit en zet ze om
                naar vergelijkbare eenheidsprijzen. Geen API key nodig.
              </div>
            </div>
            <button
              onClick={normalizeBundled}
              disabled={busy}
              className="shrink-0 rounded-xl bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
            >
              {busy ? 'Bezig…' : '⚙ Normaliseer alle offertes'}
            </button>
          </div>
        </div>

        {/* Bron / zelf uploaden */}
        <details className="mb-2">
          <summary className="cursor-pointer text-xs text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]">
            Waar komen de offertes vandaan? (SharePoint · Outlook · zelf uploaden)
          </summary>
          <div className="mt-3">
            <div className="mb-3 flex items-center gap-1 rounded-lg bg-neutral-100 p-0.5 text-sm">
              <button
                onClick={() => setMode('sharepoint')}
                className={`rounded-md px-3 py-1 transition ${mode === 'sharepoint' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'}`}
              >
                📁 SharePoint
              </button>
              {sources?.outlook && (
                <button
                  onClick={() => setMode('outlook')}
                  className={`rounded-md px-3 py-1 transition ${mode === 'outlook' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'}`}
                >
                  📧 Outlook
                </button>
              )}
              <button
                onClick={() => setMode('upload')}
                className={`rounded-md px-3 py-1 transition ${mode === 'upload' ? 'bg-white shadow-sm' : 'text-[var(--color-ink-soft)]'}`}
              >
                ⬆ Zelf uploaden
              </button>
            </div>

            {mode === 'sharepoint' && (
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                  <code className="rounded bg-neutral-100 px-2 py-0.5 text-xs">
                    {sources?.sharepoint ?? 'SharePoint > Offertes'}
                  </code>
                  <button
                    onClick={() => setFetched(true)}
                    className="ml-auto rounded-lg bg-[var(--color-ink)] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black"
                  >
                    {fetched ? '✓ Opgehaald' : 'Ophalen'}
                  </button>
                </div>
                <ul className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                  {sources?.files?.map((f) => (
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
                        <span className="text-xs text-[var(--color-ink-soft)]">
                          {fetched ? 'opgehaald ✓' : 'gevonden'}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mode === 'outlook' && (
              <div>
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
                  <span aria-hidden>⚡</span>
                  <span>
                    Automatische n8n-connector (voorbeeld): nieuwe offerte-mails in{' '}
                    <strong>{sources?.outlook}</strong> worden herkend en de
                    PDF-bijlagen direct verwerkt.
                  </span>
                </div>
                <ul className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)]">
                  {sources?.files?.map((f) => (
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
              </div>
            )}

            {mode === 'upload' && (
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--color-line)] px-4 py-8 text-sm text-[var(--color-ink-soft)] transition hover:border-[var(--color-ink-soft)]"
                >
                  <span className="text-2xl">⬆</span>
                  <span>Sleep de offerte-PDF's hierheen of klik om te kiezen</span>
                  <span className="text-xs">(minimaal {min} om samen te normaliseren)</span>
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
                    onClick={normalizeUpload}
                    disabled={busy || files.length < min}
                    className="rounded-xl bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
                  >
                    {busy ? 'Bezig…' : `Normaliseer geüploade offertes (${files.length})`}
                  </button>
                  {files.length > 0 && files.length < min && (
                    <span className="text-xs text-amber-700">
                      minimaal {min} offertes nodig
                    </span>
                  )}
                </div>
                {!hasApiKey && (
                  <p className="mt-2 text-xs text-amber-700">
                    Let op: geüploade PDF's worden door Claude uitgelezen — voeg eerst
                    je Anthropic API key toe via Instellingen. (De bundelknop hierboven
                    werkt wél zonder key.)
                  </p>
                )}
              </div>
            )}
          </div>
        </details>

        {busy && (
          <div className="mt-4">
            <Spinner label="Offertes samen normaliseren…" />
          </div>
        )}
        {error && (
          <div className="mt-4">
            <ErrorNote message={error} />
          </div>
        )}
        {preview && (
          <PdfPreview url={preview.url} name={preview.name} onClose={() => setPreview(null)} />
        )}
      </div>

      {result && <NormalizeTable result={result} />}
    </div>
  )
}

function NormalizeTable({ result }: { result: OfferCompareResult }) {
  const { leveranciers, posten } = result
  return (
    <div className="border-t border-[var(--color-line)]">
      <div className="flex flex-wrap items-center gap-2 px-5 py-3">
        <span className="font-medium">Genormaliseerd</span>
        <Badge tone="good">{leveranciers.length} offertes samengevoegd</Badge>
        <span className="text-xs text-[var(--color-ink-soft)]">
          vergelijkbare €/m² · @@ = handmatig nakijken · klaar voor stap 2
          (Prijsvergelijk)
        </span>
      </div>
      <div className="overflow-x-auto px-5 pb-5">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left">
              <th className="py-2 pr-3 font-medium">Post</th>
              {leveranciers.map((l, i) => (
                <th key={i} className="px-3 py-2 font-medium">{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posten.map((post) => {
              if (!post.cellen.some((c) => c.aangeboden)) return null
              return (
                <tr key={post.id} className="border-b border-[var(--color-line)] align-top">
                  <td className="py-2 pr-3 text-[var(--color-ink-soft)]">{post.label}</td>
                  {post.cellen.map((c, i) => {
                    const flag = c.opmerking?.includes('@@')
                    return (
                      <td key={i} className={`px-3 py-2 ${c.best ? 'bg-[var(--color-accent-soft)]' : ''}`}>
                        {c.aangeboden ? (
                          <div>
                            <div className="font-medium tabular-nums">
                              € {fmtPrijs(c.prijs)}
                              {c.eenheid ? (
                                <span className="font-normal text-[var(--color-ink-soft)]"> / {c.eenheid}</span>
                              ) : null}
                            </div>
                            {c.opmerking && (
                              <div className={`mt-0.5 text-xs ${flag ? 'text-amber-700' : 'text-[var(--color-ink-soft)]'}`}>
                                {c.opmerking}
                              </div>
                            )}
                            {c.best && (
                              <span className="mt-0.5 inline-block text-xs font-medium text-emerald-700">
                                gunstigst ✓
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[var(--color-ink-soft)]">
                            {c.opmerking || '—'}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
          Elke offerte is herkend en omgerekend naar vergelijkbare eenheidsprijzen
          per post. Deze genormaliseerde set gaat door naar stap 2, waar hij in het
          prijsvergelijk-Excel wordt gezet.
        </p>
      </div>
    </div>
  )
}
