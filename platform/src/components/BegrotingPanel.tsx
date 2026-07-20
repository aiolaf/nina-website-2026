import { useRef, useState } from 'react'
import type { DemoDef } from '../lib/types'
import { api } from '../lib/api'
import { Badge } from './ui'

/**
 * Toont de werkbegroting als startpunt van de prijsvergelijk. De begroting komt
 * uit een screenshot/afbeelding (in productie leest AI die uit); voor de demo
 * staan de gegevens al klaar. Je kunt ook zelf een begroting-afbeelding kiezen.
 */
export function BegrotingPanel({
  klant,
  begroting,
}: {
  klant: string
  begroting: NonNullable<DemoDef['begroting']>
}) {
  const [showImg, setShowImg] = useState(false)
  const [uploaded, setUploaded] = useState<string | null>(null)
  const objectUrl = useRef<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function pick(list: FileList | null) {
    const f = list?.[0]
    if (!f) return
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    objectUrl.current = URL.createObjectURL(f)
    setUploaded(objectUrl.current)
    setShowImg(true)
  }

  const imgSrc = uploaded || (begroting.afbeelding ? api.sourceFileUrl(klant, begroting.afbeelding) : null)

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Begroting — startpunt</span>
          <Badge>{begroting.titel ?? 'Werkbegroting'}</Badge>
          {begroting.totaal && (
            <span className="text-xs text-[var(--color-ink-soft)]">{begroting.totaal}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {imgSrc && (
            <button
              onClick={() => setShowImg((s) => !s)}
              className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
            >
              {showImg ? 'verberg afbeelding' : '👁 toon afbeelding'}
            </button>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-xs transition hover:border-[var(--color-ink-soft)]"
          >
            ⬆ Begroting uploaden
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,image/*"
            className="hidden"
            onChange={(e) => pick(e.target.files)}
          />
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="mb-3 text-xs text-[var(--color-ink-soft)]">
          Dit is de werkbegroting van dit onderdeel — het startpunt waartegen de
          offertes worden vergeleken en dat in het prijsvergelijk terugkomt. In
          productie leest de AI deze uit de aangeleverde afbeelding/PDF; hier staan
          de gegevens al klaar.
        </p>

        {showImg && imgSrc && (
          <div className="mb-3 overflow-hidden rounded-lg border border-[var(--color-line)]">
            <img src={imgSrc} alt="Begroting" className="w-full" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-left">
                <th className="py-2 pr-3 font-medium">Post</th>
                <th className="px-3 py-2 text-right font-medium">Hoeveelheid</th>
                <th className="px-3 py-2 font-medium">Eenheid</th>
              </tr>
            </thead>
            <tbody>
              {begroting.posten.map((p, i) => (
                <tr key={i} className="border-b border-[var(--color-line)] last:border-0">
                  <td className="py-1.5 pr-3">{p.omschrijving}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{p.hoeveelheid}</td>
                  <td className="px-3 py-1.5 text-[var(--color-ink-soft)]">{p.eenheid ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
