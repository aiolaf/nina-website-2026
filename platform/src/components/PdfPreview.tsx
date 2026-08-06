/** Kleine inline PDF-preview (gebruikt de ingebouwde PDF-viewer van de browser). */
export function PdfPreview({
  url,
  name,
  onClose,
}: {
  url: string
  name?: string
  onClose?: () => void
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-[var(--color-line)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] bg-neutral-50 px-3 py-2 text-xs">
        <span className="min-w-0 flex-1 truncate">📄 {name ?? 'Preview'}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
          >
            sluiten ✕
          </button>
        )}
      </div>
      <iframe
        src={url}
        title={name ?? 'PDF preview'}
        className="h-[26rem] w-full bg-white"
      />
    </div>
  )
}
