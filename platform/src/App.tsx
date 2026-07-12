import { useEffect, useState } from 'react'
import { api } from './lib/api'
import type {
  ClientConfig,
  FeasibilityReport,
  ProfileResult,
} from './lib/types'
import { ClientPicker } from './components/ClientPicker'
import { ProfilerPanel } from './components/ProfilerPanel'
import { FeasibilityPanel } from './components/FeasibilityPanel'
import { DemoRunner } from './components/DemoRunner'
import { ErrorNote, Spinner } from './components/ui'

type Step = 1 | 2 | 3

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: 'Klant & data' },
  { n: 2, label: 'Haalbaarheid' },
  { n: 3, label: 'Live demo' },
]

export default function App() {
  const [clients, setClients] = useState<string[]>([])
  const [hasApiKey, setHasApiKey] = useState(true)
  const [model, setModel] = useState('')
  const [bootError, setBootError] = useState<string | null>(null)

  const [selected, setSelected] = useState<string | null>(null)
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [step, setStep] = useState<Step>(1)

  const [profile, setProfile] = useState<ProfileResult | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [report, setReport] = useState<FeasibilityReport | null>(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [reportError, setReportError] = useState<string | null>(null)

  // Klantenlijst laden.
  useEffect(() => {
    api
      .clients()
      .then((r) => {
        setClients(r.clients)
        setHasApiKey(r.hasApiKey)
        setModel(r.model)
      })
      .catch((e) =>
        setBootError(
          e instanceof Error ? e.message : 'Kan de backend niet bereiken.',
        ),
      )
  }, [])

  async function selectClient(name: string) {
    setSelected(name)
    setStep(1)
    setConfig(null)
    setProfile(null)
    setReport(null)
    setProfileError(null)
    setReportError(null)

    setProfileLoading(true)
    try {
      const [detail, prof] = await Promise.all([
        api.client(name),
        api.profile(name),
      ])
      setConfig(detail.config)
      setProfile(prof)
    } catch (e) {
      setProfileError(e instanceof Error ? e.message : String(e))
    } finally {
      setProfileLoading(false)
    }
  }

  async function loadFeasibility() {
    if (!selected) return
    setStep(2)
    if (report || reportLoading) return
    setReportError(null)
    setReportLoading(true)
    try {
      setReport(await api.feasibility(selected))
    } catch (e) {
      setReportError(e instanceof Error ? e.message : String(e))
    } finally {
      setReportLoading(false)
    }
  }

  const canGoStep2 = Boolean(profile)
  const canGoStep3 = Boolean(config)

  return (
    <div className="mx-auto min-h-full max-w-5xl px-6 py-10">
      {/* Header */}
      <header className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight">NinA</span>
            <span className="text-2xl font-light text-[var(--color-ink-soft)]">
              · demo-platform
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Per klant snel een overtuigende AI-automation demo op hun eigen data.
          </p>
        </div>
        <div className="text-right text-xs text-[var(--color-ink-soft)]">
          <div>model · {model || '…'}</div>
          <div className={hasApiKey ? 'text-emerald-600' : 'text-rose-600'}>
            API key {hasApiKey ? 'gevonden' : 'ontbreekt (.env)'}
          </div>
        </div>
      </header>

      {/* Stepper */}
      <nav className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const enabled =
            s.n === 1 || (s.n === 2 && canGoStep2) || (s.n === 3 && canGoStep3)
          const active = step === s.n
          return (
            <div key={s.n} className="flex items-center gap-2">
              {i > 0 && <span className="text-[var(--color-line)]">—</span>}
              <button
                disabled={!enabled}
                onClick={() => {
                  if (s.n === 2) loadFeasibility()
                  else setStep(s.n)
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? 'bg-[var(--color-ink)] text-white'
                    : enabled
                      ? 'text-[var(--color-ink)] hover:bg-neutral-100'
                      : 'cursor-not-allowed text-neutral-300'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    active
                      ? 'bg-white text-[var(--color-ink)]'
                      : 'bg-neutral-100 text-[var(--color-ink-soft)]'
                  }`}
                >
                  {s.n}
                </span>
                {s.label}
              </button>
            </div>
          )
        })}
      </nav>

      {bootError && <ErrorNote message={bootError} />}

      {/* Scherm 1 */}
      {step === 1 && (
        <section className="space-y-6">
          <ClientPicker
            clients={clients}
            selected={selected}
            config={config}
            onSelect={selectClient}
          />
          {profileLoading && <Spinner label="Data profileren…" />}
          {profileError && <ErrorNote message={profileError} />}
          {profile && <ProfilerPanel profile={profile} />}
          {profile && (
            <div className="flex justify-end">
              <button
                onClick={loadFeasibility}
                className="rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
              >
                Naar haalbaarheidscheck →
              </button>
            </div>
          )}
        </section>
      )}

      {/* Scherm 2 */}
      {step === 2 && (
        <section className="space-y-6">
          {reportLoading && (
            <Spinner label="Haalbaarheidsrapport genereren met Claude…" />
          )}
          {reportError && <ErrorNote message={reportError} />}
          {report && <FeasibilityPanel report={report} />}
          {report && (
            <div className="flex justify-end">
              <button
                onClick={() => setStep(3)}
                className="rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
              >
                Naar live demo →
              </button>
            </div>
          )}
        </section>
      )}

      {/* Scherm 3 */}
      {step === 3 && selected && config && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">
              Live demo · {config.klant}
            </h2>
            <p className="text-sm text-[var(--color-ink-soft)]">
              Echte records door de workflow. AI-stappen doen echte Claude-calls;
              overige stappen zijn gemockt met de echte data.
            </p>
          </div>
          <DemoRunner klant={selected} config={config} hasApiKey={hasApiKey} />
        </section>
      )}

      <footer className="mt-16 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-soft)]">
        NinA AI Agency · lokaal demo-platform · draait volledig op localhost
      </footer>
    </div>
  )
}
