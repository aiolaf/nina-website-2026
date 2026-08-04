import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/site";

type MenuItem = { wat: string; uitleg: string; tokens: number };
type Maand = {
  naam: string;
  regels: { wat: string; tokens: number; kleur: string }[];
  budget: number;
  slot?: string;
};
type Regel = { kop: string; tekst: string };

const MENU_NL: MenuItem[] = [
  { wat: "Developer-dagdeel", uitleg: "4 uur bouwen", tokens: 2 },
  { wat: "Developer-dag", uitleg: "Een volle dag bouwen", tokens: 4 },
  { wat: "Consultancydag", uitleg: "Analyse, keuzes, richting", tokens: 5 },
  {
    wat: "Strategiedag met AI Expert",
    uitleg: "AI-koers, roadmap en prioriteiten",
    tokens: 9,
  },
  { wat: "Lezing", uitleg: "Je hele organisatie mee in AI", tokens: 10 },
  {
    wat: "Workshop, dagdeel",
    uitleg: "Je team leert hands-on met AI werken",
    tokens: 14,
  },
  {
    wat: "AI Design sessie",
    uitleg: "Van kans naar concreet ontwerp",
    tokens: 16,
  },
  {
    wat: "Hosting, monitoring, support en kwartaalreview",
    uitleg: "Loopt door, altijd inbegrepen",
    tokens: 0,
  },
];

/* Kleuren uit het thema, onderling genoeg contrast in de balk. */
const BOUW = "bg-primary";
const TEAM = "bg-[#c9a227]";
const DENK = "bg-primary-light";

const MAANDEN_NL: Maand[] = [
  {
    naam: "Bouwmaand",
    regels: [
      { wat: "4 × developer-dag", tokens: 16, kleur: BOUW },
      { wat: "2 × dagdeel", tokens: 4, kleur: DENK },
    ],
    budget: 20,
  },
  {
    naam: "Adoptiemaand",
    regels: [
      { wat: "Workshop", tokens: 14, kleur: TEAM },
      { wat: "Developer-dag", tokens: 4, kleur: BOUW },
      { wat: "Dagdeel", tokens: 2, kleur: DENK },
    ],
    budget: 20,
  },
  {
    naam: "Strategiemaand",
    regels: [
      { wat: "AI Design sessie", tokens: 16, kleur: DENK },
      { wat: "Dagdeel", tokens: 2, kleur: BOUW },
    ],
    budget: 20,
    slot: "2 schuiven door",
  },
];

const REGELS_NL: Regel[] = [
  {
    kop: "Elke maand kiezen we samen",
    tekst: "Wat die maand nodig is, bepaalt waar de tokens naartoe gaan.",
  },
  {
    kop: "Sparen mag, één maand",
    tekst:
      "Alleen voor iets dat al gepland staat. Zo spaart Light 10 plus 10 voor een workshop van 14.",
  },
  {
    kop: "Bijkopen kan altijd",
    tekst: "EUR 250 per token, vast tarief. Geen onderhandeling.",
  },
  {
    kop: "Je weet waar je staat",
    tekst: "Elke maand je tokenstand plus de planning voor twee maanden.",
  },
];

const MENU_EN: MenuItem[] = [
  { wat: "Developer half day", uitleg: "4 hours of building", tokens: 2 },
  { wat: "Developer day", uitleg: "A full day of building", tokens: 4 },
  {
    wat: "Consultancy day",
    uitleg: "Analysis, choices, direction",
    tokens: 5,
  },
  {
    wat: "Strategy day with an AI expert",
    uitleg: "AI direction, roadmap and priorities",
    tokens: 9,
  },
  { wat: "Talk", uitleg: "Bring your whole organization along", tokens: 10 },
  {
    wat: "Workshop, half day",
    uitleg: "Your team learns to work with AI hands-on",
    tokens: 14,
  },
  {
    wat: "AI Design session",
    uitleg: "From opportunity to concrete design",
    tokens: 16,
  },
  {
    wat: "Hosting, monitoring, support and quarterly review",
    uitleg: "Keeps running, always included",
    tokens: 0,
  },
];

const MAANDEN_EN: Maand[] = [
  {
    naam: "Build month",
    regels: [
      { wat: "4 × developer day", tokens: 16, kleur: BOUW },
      { wat: "2 × half day", tokens: 4, kleur: DENK },
    ],
    budget: 20,
  },
  {
    naam: "Adoption month",
    regels: [
      { wat: "Workshop", tokens: 14, kleur: TEAM },
      { wat: "Developer day", tokens: 4, kleur: BOUW },
      { wat: "Half day", tokens: 2, kleur: DENK },
    ],
    budget: 20,
  },
  {
    naam: "Strategy month",
    regels: [
      { wat: "AI Design session", tokens: 16, kleur: DENK },
      { wat: "Half day", tokens: 2, kleur: BOUW },
    ],
    budget: 20,
    slot: "2 roll over",
  },
];

const REGELS_EN: Regel[] = [
  {
    kop: "We choose together every month",
    tekst: "Whatever that month calls for decides where the tokens go.",
  },
  {
    kop: "You can save up, for one month",
    tekst:
      "Only for something already scheduled. That way Light saves 10 plus 10 for a workshop that costs 14.",
  },
  {
    kop: "You can always buy extra",
    tekst: "EUR 250 per token, fixed rate. No negotiating.",
  },
  {
    kop: "You know where you stand",
    tekst: "Every month your token balance plus the plan for two months.",
  },
];

const COPY = {
  nl: {
    menuKop: "De menukaart",
    menuVoet:
      "Hosting, monitoring, support en de kwartaalreview kosten 0 tokens. Je stapel gaat volledig naar vooruitgang.",
    maandKop: "Zelfde stapel, elke maand andere behoeftes",
    van: "van",
    tokens: "tokens",
  },
  en: {
    menuKop: "The menu",
    menuVoet:
      "Hosting, monitoring, support and the quarterly review cost 0 tokens. Your stack goes entirely to progress.",
    maandKop: "Same stack, different needs every month",
    van: "of",
    tokens: "tokens",
  },
};

function TokenChip({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        n === 0
          ? "bg-bg-muted text-text-muted"
          : "bg-gold/15 text-gold ring-1 ring-gold/25"
      }`}
    >
      {n}
    </span>
  );
}

/** Maandbudget als balk: één segment per token, gekleurd per onderdeel. */
function MaandBalk({ maand }: { maand: Maand }) {
  const verbruikt = maand.regels.reduce((s, r) => s + r.tokens, 0);
  return (
    <div
      aria-hidden="true"
      className="flex gap-[2px] overflow-hidden rounded-full"
    >
      {maand.regels.flatMap((r) =>
        Array.from({ length: r.tokens }, (_, i) => (
          <span key={`${r.wat}-${i}`} className={`h-2.5 flex-1 ${r.kleur}`} />
        ))
      )}
      {Array.from({ length: maand.budget - verbruikt }, (_, i) => (
        <span key={`leeg-${i}`} className="h-2.5 flex-1 bg-bg-muted" />
      ))}
    </div>
  );
}

/**
 * Menukaart, drie voorbeeldmaanden als balk en de spelregels. De balken doen
 * het werk dat eerder een lijstje deed: je ziet in één blik dat een workshop
 * het grootste deel van een maand opeet.
 */
export default function TokenMenukaart({ lang = "nl" }: { lang?: Lang }) {
  const menu = lang === "en" ? MENU_EN : MENU_NL;
  const maanden = lang === "en" ? MAANDEN_EN : MAANDEN_NL;
  const regels = lang === "en" ? REGELS_EN : REGELS_NL;
  const t = lang === "en" ? COPY.en : COPY.nl;

  return (
    <div className="space-y-12">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* Menukaart */}
        <Reveal>
          <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
            <h3 className="font-display text-lg font-bold">{t.menuKop}</h3>
            <ul className="mt-5 divide-y divide-border">
              {menu.map((m) => (
                <li
                  key={m.wat}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold">{m.wat}</p>
                    <p className="text-xs text-text-muted">{m.uitleg}</p>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <TokenChip n={m.tokens} />
                    <span className="sr-only">
                      {m.tokens} {t.tokens}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-text-muted">
              {t.menuVoet}
            </p>
          </div>
        </Reveal>

        {/* Voorbeeldmaanden als balken */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
            <h3 className="font-display text-lg font-bold">{t.maandKop}</h3>
            <div className="mt-6 space-y-6">
              {maanden.map((maand) => {
                const verbruikt = maand.regels.reduce(
                  (s, r) => s + r.tokens,
                  0
                );
                return (
                  <div key={maand.naam}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold">{maand.naam}</p>
                      <p className="font-display text-xs font-bold text-text-muted">
                        {verbruikt} {t.van} {maand.budget}
                        {maand.slot ? `, ${maand.slot}` : ""}
                      </p>
                    </div>
                    <div className="mt-2">
                      <MaandBalk maand={maand} />
                    </div>
                    <p className="mt-2 text-xs text-text-muted">
                      {maand.regels.map((r) => `${r.wat} (${r.tokens})`).join(
                        " · "
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Spelregels */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {regels.map((r, idx) => (
          <li key={r.kop} className="h-full">
            <Reveal
              delay={idx * 0.06}
              className="relative h-full rounded-2xl border border-border bg-bg-card p-5 pt-7"
            >
              <span className="font-display absolute -top-3.5 left-5 rounded-full border border-primary/50 bg-bg px-2.5 py-0.5 text-xs font-bold text-primary">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-sm font-bold">{r.kop}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                {r.tekst}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
