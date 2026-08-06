import { useState } from 'react'
import { api, type SettingsResponse } from '../lib/api'
import { Badge, ErrorNote, Spinner } from './ui'

export function SettingsDialog({
  settings,
  onClose,
  onChange,
}: {
  settings: SettingsResponse
  onClose: () => void
  onChange: (s: SettingsResponse) => void
}) {
  const [key, setKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function save() {
    if (!key.trim()) return
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      const res = await api.setApiKey(key.trim())
      onChange(res)
      setSaved(true)
      setKey('')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  async function clear() {
    setBusy(true)
    setError(null)
    setSaved(false)
    try {
      onChange(await api.clearApiKey())
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Instellingen</h2>
          <button
            onClick={onClose}
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="text-[var(--color-ink-soft)]">Anthropic API key:</span>
          {settings.hasApiKey ? (
            <Badge tone="good">
              actief{settings.source === 'env' ? ' (uit .env)' : ''}
            </Badge>
          ) : (
            <Badge tone="bad">niet ingesteld</Badge>
          )}
        </div>

        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
          Nieuwe key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-..."
          autoComplete="off"
          className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm outline-none focus:border-[var(--color-ink-soft)]"
        />
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          De key wordt lokaal opgeslagen (in <code>.local/settings.json</code>,
          gitignored) en getest met een minimale API-call. Een key hier
          ingesteld wint van <code>.env</code>.
        </p>

        {error && (
          <div className="mt-3">
            <ErrorNote message={error} />
          </div>
        )}
        {saved && (
          <p className="mt-3 text-sm text-emerald-600">Key opgeslagen en getest ✓</p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={clear}
            disabled={busy || (!settings.hasApiKey && settings.source !== 'settings')}
            className="text-sm text-[var(--color-ink-soft)] transition hover:text-rose-600 disabled:opacity-40"
          >
            Opgeslagen key wissen
          </button>
          <div className="flex items-center gap-3">
            {busy && <Spinner label="Testen…" />}
            <button
              onClick={save}
              disabled={busy || !key.trim()}
              className="rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
            >
              Opslaan & testen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
