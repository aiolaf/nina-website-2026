import type { FeasibilityReport } from '../lib/types'
import { Badge, Card } from './ui'

function SectionList({
  title,
  items,
  tone,
  icon,
}: {
  title: string
  items: string[]
  tone: 'good' | 'warn' | 'bad'
  icon: string
}) {
  const border =
    tone === 'good'
      ? 'border-l-emerald-400'
      : tone === 'warn'
        ? 'border-l-amber-400'
        : 'border-l-rose-400'
  return (
    <Card className={`border-l-4 ${border} p-5`}>
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden>{icon}</span>
        <h3 className="font-medium">{title}</h3>
        <Badge tone={tone}>{items.length}</Badge>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">—</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink)]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-ink-soft)]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function QuestionGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
        {title}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-neutral-400">Geen open vragen</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((q, i) => (
            <li key={i} className="text-sm text-[var(--color-ink)]">
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function FeasibilityPanel({ report }: { report: FeasibilityReport }) {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
            Aanname
          </span>
          <Badge tone="accent">
            {report.aannameType === 'agent'
              ? 'Agent (beslist zelf, kiest tools)'
              : 'Automation (vast pad)'}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          {report.aannameUitleg}
        </p>
        <p className="mt-4 border-t border-[var(--color-line)] pt-4 text-[15px] leading-relaxed">
          {report.samenvatting}
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <SectionList
          title="Wat kan nu al"
          items={report.watKanNu}
          tone="good"
          icon="✅"
        />
        <SectionList
          title="Kan, moet gebouwd"
          items={report.moetGebouwd}
          tone="warn"
          icon="🔧"
        />
        <SectionList
          title="Kan niet / risico"
          items={report.kanNietRisico}
          tone="bad"
          icon="⚠️"
        />
      </div>

      {report.dataMeerwaarde.length > 0 && (
        <Card className="border-l-4 border-l-[var(--color-accent)] bg-[var(--color-accent-soft)] p-5">
          <div className="mb-3 flex items-center gap-2">
            <span aria-hidden>📊</span>
            <h3 className="font-medium">Waar data de demo sterker maakt</h3>
          </div>
          <ul className="space-y-2">
            {report.dataMeerwaarde.map((it, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-emerald-900"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="mb-4 font-medium">Open vragen voor de klant</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <QuestionGroup title="Data" items={report.openVragen.data} />
          <QuestionGroup title="Taak" items={report.openVragen.taak} />
          <QuestionGroup
            title="Integratie"
            items={report.openVragen.integratie}
          />
          <QuestionGroup title="Productie" items={report.openVragen.productie} />
        </div>
      </Card>
    </div>
  )
}
