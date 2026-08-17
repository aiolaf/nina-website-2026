import Link from "next/link";
import type { Lang } from "@/lib/site";

/**
 * Compacte teaser van de APO methode voor de homepage. Eén kaart in de stijl
 * van het APO-ontwerp: links de vier stappen, rechts de uitkomst als drie
 * tegels. De verdieping staat op de partnershippagina onder #apo-methode.
 *
 * De bedragen zijn hetzelfde rekenvoorbeeld als daar: besparing uit een
 * sessie, investering gelijk aan het Standaard-pakket in het eerste jaar.
 */

const KLEUR = {
  groen: { tekst: "#15803d", vlak: "#e7f3ea" },
  blauw: { tekst: "#1d4ed8", vlak: "#e8effc" },
  paars: { tekst: "#6d28d9", vlak: "#f0eafc" },
} as const;

const COPY = {
  nl: {
    badge: "APO methode",
    stappen: [
      { titel: "Waar sta je nu", sub: "Nulmeting op zeven dimensies" },
      { titel: "Van kansen naar processen", sub: "Het werk in meetbare stappen" },
      { titel: "Van handmatig naar AI", sub: "Wat AI doet, waar de mens controle houdt" },
      { titel: "Prioriteiten en business case", sub: "Besparing, investering, terugverdientijd" },
    ],
    uitkomst: "Wat er aan het eind ligt",
    tegels: [
      { label: "Besparing per jaar", waarde: "EUR 148.000", kleur: "groen" as const },
      { label: "Investering eerste jaar", waarde: "EUR 79.500", kleur: "blauw" as const },
      { label: "Terugverdientijd", waarde: "6,4 maanden", kleur: "paars" as const },
    ],
    rekenvoorbeeld: "Rekenvoorbeeld. Jouw cijfers ontstaan live in de sessie.",
    cta: "Bekijk de hele methode",
    href: "/ai-partnership#apo-methode",
  },
  en: {
    badge: "APO method",
    stappen: [
      { titel: "Where you stand", sub: "Baseline across seven dimensions" },
      { titel: "From opportunities to processes", sub: "The work in measurable steps" },
      { titel: "From manual to AI", sub: "What AI does, where a human stays in control" },
      { titel: "Priorities and business case", sub: "Savings, investment, payback time" },
    ],
    uitkomst: "What you walk away with",
    tegels: [
      { label: "Savings per year", waarde: "EUR 148,000", kleur: "groen" as const },
      { label: "First-year investment", waarde: "EUR 79,500", kleur: "blauw" as const },
      { label: "Payback time", waarde: "6.4 months", kleur: "paars" as const },
    ],
    rekenvoorbeeld: "Worked example. Your own numbers take shape live in the session.",
    cta: "See the full method",
    href: "/en/ai-partnership#apo-methode",
  },
};

export default function ApoTeaser({ lang = "nl" }: { lang?: Lang }) {
  const c = lang === "en" ? COPY.en : COPY.nl;

  return (
    <div className="rounded-3xl border border-border bg-bg-card p-6 shadow-[0_18px_60px_rgba(12,14,24,0.07)] sm:p-9">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div>
          <span className="inline-flex rounded-full border border-border bg-bg px-3.5 py-1.5 font-mono text-xs text-text-muted">
            {c.badge}
          </span>
          <ol className="mt-6 space-y-4">
            {c.stappen.map((s, i) => (
              <li key={s.titel} className="flex items-start gap-3.5">
                <span className="font-display mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-bg text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{s.titel}</span>
                  <span className="block text-xs text-text-muted">{s.sub}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-7">
            <Link
              href={c.href}
              data-cta="apo_teaser"
              data-cta-soort="apo"
              className="inline-flex items-center gap-2 rounded-full bg-ink-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              {c.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg p-5 sm:p-6">
          <p className="text-sm font-semibold">{c.uitkomst}</p>
          <div className="mt-4 space-y-3">
            {c.tegels.map((tegel) => (
              <div
                key={tegel.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-bg-card p-4"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold"
                  style={{
                    backgroundColor: KLEUR[tegel.kleur].vlak,
                    color: KLEUR[tegel.kleur].tekst,
                  }}
                >
                  €
                </span>
                <span>
                  <span className="block text-xs text-text-muted">{tegel.label}</span>
                  <span className="font-display block text-xl font-bold">{tegel.waarde}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">{c.rekenvoorbeeld}</p>
        </div>
      </div>
    </div>
  );
}
