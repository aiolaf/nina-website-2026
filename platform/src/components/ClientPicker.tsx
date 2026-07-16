import type { ClientConfig } from '../lib/types'
import { Badge } from './ui'

export function ClientPicker({
  clients,
  selected,
  config,
  onSelect,
  loadError,
}: {
  clients: string[]
  selected: string | null
  config: ClientConfig | null
  onSelect: (name: string) => void
  loadError?: boolean
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
          Klant
        </label>
        {clients.length === 0 ? (
          loadError ? (
            <p className="text-sm text-rose-600">
              Kan de klantenlijst niet laden — zie de foutmelding hierboven. De
              backend draait waarschijnlijk niet.
            </p>
          ) : (
            <p className="text-sm text-[var(--color-ink-soft)]">
              Geen klanten gevonden. Maak een map <code>/clients/[naam]</code>{' '}
              met een <code>config.json</code>.
            </p>
          )
        ) : (
          <div className="flex flex-wrap gap-2">
            {clients.map((c) => (
              <button
                key={c}
                onClick={() => onSelect(c)}
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  selected === c
                    ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
                    : 'border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink-soft)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {config && (
        <div className="rounded-xl bg-neutral-50 px-4 py-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-medium">{config.klant}</span>
            <Badge tone="accent">{config.type}</Badge>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {config.vraag || 'Geen klantvraag ingevuld in config.json.'}
          </p>
        </div>
      )}
    </div>
  )
}
