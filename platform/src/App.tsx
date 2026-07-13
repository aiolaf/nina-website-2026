import { useEffect, useState } from 'react'
import { api, type SettingsResponse } from './lib/api'
import type {
  ClientConfig,
  DemoDef,
  FeasibilityReport,
  ProfileResult,
} from './lib/types'
import { ClientPicker } from './components/ClientPicker'
import { ProfilerPanel } from './components/ProfilerPanel'
import { FeasibilityPanel } from './components/FeasibilityPanel'
import { DemoRunner } from './components/DemoRunner'
import { SettingsDialog } from './components/SettingsDialog'
import { Card, ErrorNote, Spinner } from './components/ui'

type Step = 1 | 2 | 3

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: 'Klant & data' },
  { n: 2, label: 'Haalbaarheid' },
  { n: 3, label: 'Live demo' },
]

const ctxKey = (client: string) => `nina-context:${client}`

export default function App() {
  const [clients, setClients] = useState<string[]>([])
  const [settings, setSettings] = useState<SettingsResponse>({
    hasApiKey: false,
    source: 'none',
  })
  const [model, setModel] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [bootError, setBootError] = useState<string | null>(null)

  const [selected, setSelected] = useState<string | null>(null)
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [demos, setDemos] = useState<DemoDef[]>([])
  const [step, setStep] = useState<Step>(1)

  const [profile, setProfile] = useState<ProfileResult | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [context, setContext] = useState('')
  const [report, setReport] = useState<FeasibilityReport | null>(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [reportError, setReportError] = useState<string | null>(null)

  const hasApiKey = settings.hasApiKey

  useEffect(() => {
    Promise.all([api.clients(), api.settings()])
      .then(([c, s]) => {
        setClients(c.clients)
        setModel(c.model)
        setSettings(s)
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
    setDemos([])
    setProfile(null)
    setReport(null)
    setProfileError(null)
    setReportError(null)
    setContext(localStorage.getItem(ctxKey(name)) ?? '')

    setProfileLoading(true)
    try {
      const [detail, prof] = await Promise.all([
        api.client(name),
        api.profile(name),
      ])
      setConfig(detail.config)
      setDemos(detail.demos)
      setProfile(prof)
    } catch (e) {
      setProfileError(e instanceof Error ? e.message : String(e))
    } finally {
      setProfileLoading(false)
    }
  }

  function updateContext(v: string) {
    setContext(v)
    if (selected) localStorage.setItem(ctxKey(selected), v)
  }

  async function runFeasibility() {
    if (!selected) return
    setReportError(null)
    setReportLoading(true)
    try {
      setReport(await api.feasibility(selected, context))
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
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
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
        <div className="flex items-center gap-4">
          <div className="text-right text-xs text-[var(--color-ink-soft)]">
            <div>model · {model || '…'}</div>
            <div className={hasApiKey ? 'text-emerald-600' : 'text-rose-600'}>
              API key {hasApiKey ? 'actief' : 'ontbreekt'}
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm transition hover:border-[var(--color-ink-soft)]"
          >
            ⚙ Instellingen
          </button>
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
                onClick={() => setStep(s.n)}
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
                onClick={() => setStep(2)}
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
          {profile && <DataValueBanner profile={profile} client={selected} />}

          <Card className="p-5">
            <label className="mb-2 block text-sm font-medium">
              Extra context / briefing{' '}
              <span className="font-normal text-[var(--color-ink-soft)]">
                (optioneel — kan naast of los van data)
              </span>
            </label>
            <textarea
              value={context}
              onChange={(e) => updateContext(e.target.value)}
              rows={7}
              placeholder="Plak hier een groot stuk context: doel van de klant, proces, voorbeelden, mails, documentatie, randvoorwaarden… Handig als er nog geen data is."
              className="w-full resize-y rounded-xl border border-[var(--color-line)] p-3 text-sm leading-relaxed outline-none focus:border-[var(--color-ink-soft)]"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xl text-xs text-[var(--color-ink-soft)]">
                Zonder data draait de check op deze briefing. Met echte of dummy
                data wordt de demo concreter — het rapport laat zien waar data
                precies meerwaarde heeft.
              </p>
              <button
                onClick={runFeasibility}
                disabled={!hasApiKey || reportLoading}
                title={
                  hasApiKey ? '' : 'Stel eerst je API key in via Instellingen'
                }
                className="shrink-0 rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
              >
                {report ? '↻ Opnieuw genereren' : 'Genereer haalbaarheidsrapport'}
              </button>
            </div>
            {!hasApiKey && (
              <p className="mt-2 text-xs text-rose-600">
                Geen API key ingesteld — open{' '}
                <button
                  onClick={() => setShowSettings(true)}
                  className="underline"
                >
                  Instellingen
                </button>{' '}
                om je Anthropic key toe te voegen.
              </p>
            )}
          </Card>

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
            <h2 className="text-lg font-medium">Live demo · {config.klant}</h2>
            <p className="text-sm text-[var(--color-ink-soft)]">
              Echte records door de workflow. AI-stappen doen echte Claude-calls;
              overige stappen zijn gemockt met de echte data.
            </p>
          </div>
          <DemoRunner klant={selected} demos={demos} hasApiKey={hasApiKey} />
        </section>
      )}

      <footer className="mt-16 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-soft)]">
        NinA AI Agency · lokaal demo-platform · draait volledig op localhost
      </footer>

      {showSettings && (
        <SettingsDialog
          settings={settings}
          onClose={() => setShowSettings(false)}
          onChange={setSettings}
        />
      )}
    </div>
  )
}

function DataValueBanner({
  profile,
  client,
}: {
  profile: ProfileResult
  client: string | null
}) {
  const hasData = profile.totalRecords > 0

  if (!hasData) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <div className="mb-1 font-medium">
          Nog geen (voorbeeld)data — de check draait op je briefing
        </div>
        <p className="leading-relaxed">
          Je kunt nu al een haalbaarheidscheck doen op basis van de context
          hieronder. Maar de demo wordt <strong>veel overtuigender met data</strong>:
          dan zie je echte records door de workflow stromen en de AI-output op
          jouw eigen gevallen, in plaats van een beschrijving. Zet data (CSV,
          JSON of Excel) in{' '}
          <code>clients/{client ?? '[klant]'}/data</code> zodra je die hebt.
        </p>
      </div>
    )
  }

  if (profile.verdict === 'twijfel') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Beperkte data ({profile.totalRecords} records). De check gebruikt deze
        data plus je context; méér of vollediger data maakt de live demo
        overtuigender.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-[var(--color-accent-soft)] p-4 text-sm text-emerald-800">
      De check gebruikt je echte data ({profile.totalRecords} records) plus de
      context hieronder.
    </div>
  )
}
