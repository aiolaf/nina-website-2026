import type { FieldProfile, ProfileResult, Verdict } from '../lib/types'
import { Badge, Card } from './ui'

const verdictTone: Record<Verdict, 'good' | 'warn' | 'bad'> = {
  ja: 'good',
  twijfel: 'warn',
  nee: 'bad',
}

const verdictLabel: Record<Verdict, string> = {
  ja: 'Genoeg data voor demo',
  twijfel: 'Twijfel — krap',
  nee: 'Te weinig data',
}

function typeTone(t: FieldProfile['type']) {
  if (t === 'email' || t === 'phone' || t === 'iban') return 'text-rose-600'
  if (t === 'empty') return 'text-neutral-400'
  return 'text-[var(--color-ink-soft)]'
}

export function ProfilerPanel({ profile }: { profile: ProfileResult }) {
  return (
    <div className="space-y-5">
      {/* Oordeel */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge tone={verdictTone[profile.verdict]}>
              {verdictLabel[profile.verdict]}
            </Badge>
            <span className="text-sm text-[var(--color-ink-soft)]">
              {profile.totalRecords} records · {profile.totalFields} velden
            </span>
          </div>
          {profile.piiFound.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--color-ink-soft)]">PII:</span>
              {profile.piiFound.map((p) => (
                <Badge key={p} tone="bad">
                  {p}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
          {profile.verdictReason}
        </p>
      </Card>

      {/* Per bestand */}
      {profile.files.map((f) => (
        <Card key={f.file} className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">{f.file}</span>
              <Badge>{f.format}</Badge>
            </div>
            <span className="text-xs text-[var(--color-ink-soft)]">
              {f.records} records
              {f.duplicates > 0 && ` · ${f.duplicates} dubbel`}
            </span>
          </div>

          {f.error ? (
            <div className="px-5 py-4 text-sm text-rose-600">{f.error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">
                  <tr className="border-b border-[var(--color-line)]">
                    <th className="px-5 py-2 font-medium">Veld</th>
                    <th className="px-3 py-2 font-medium">Type</th>
                    <th className="px-3 py-2 font-medium">Leeg</th>
                    <th className="px-3 py-2 font-medium">Uniek</th>
                    <th className="px-3 py-2 font-medium">Min / Max</th>
                    <th className="px-5 py-2 font-medium">Voorbeeld</th>
                  </tr>
                </thead>
                <tbody>
                  {f.fields.map((fld) => (
                    <tr
                      key={fld.name}
                      className="border-b border-[var(--color-line)] last:border-0"
                    >
                      <td className="px-5 py-2 font-medium">
                        <span className="flex items-center gap-1.5">
                          {fld.name}
                          {fld.pii.map((p) => (
                            <span
                              key={p}
                              title={`PII: ${p}`}
                              className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500"
                            />
                          ))}
                        </span>
                      </td>
                      <td className={`px-3 py-2 ${typeTone(fld.type)}`}>
                        {fld.type}
                      </td>
                      <td className="px-3 py-2">
                        <EmptyBar pct={fld.emptyPct} />
                      </td>
                      <td className="px-3 py-2 text-[var(--color-ink-soft)]">
                        {fld.distinct}
                      </td>
                      <td className="px-3 py-2 text-[var(--color-ink-soft)]">
                        {fld.min !== undefined
                          ? `${fld.min} / ${fld.max}`
                          : '—'}
                      </td>
                      <td className="px-5 py-2 text-[var(--color-ink-soft)]">
                        <span className="line-clamp-1 max-w-[16rem]">
                          {fld.samples.join(', ') || '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

function EmptyBar({ pct }: { pct: number }) {
  const tone =
    pct >= 60 ? 'bg-rose-400' : pct >= 25 ? 'bg-amber-400' : 'bg-emerald-400'
  return (
    <span className="flex items-center gap-2">
      <span className="relative inline-block h-1.5 w-12 overflow-hidden rounded-full bg-neutral-100">
        <span
          className={`absolute inset-y-0 left-0 rounded-full ${tone}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="text-xs text-[var(--color-ink-soft)]">{pct}%</span>
    </span>
  )
}
