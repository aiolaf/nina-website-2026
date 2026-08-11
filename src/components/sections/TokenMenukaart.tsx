import Reveal from "@/components/ui/Reveal";
import TokenStack from "@/components/ui/TokenStack";
import type { Lang } from "@/lib/site";

type MenuItem = { wat: string; uitleg: string; tokens: number };
type Maand = {
  naam: string;
  /** Wanneer zo'n maand voorkomt, bijvoorbeeld "maand 1: DG-assistent". */
  wanneer: string;
  regels: { wat: string; tokens: number }[];
  budget: number;
  /** Tokens die niet opgaan en doorschuiven naar de maand erna. */
  doorschuif?: number;
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

const MAANDEN_NL: Maand[] = [
  {
    naam: "Bouwmaand",
    wanneer: "bijv. maand 1: DG-assistent",
    regels: [
      { wat: "4 × developer-dag", tokens: 16 },
      { wat: "2 × dagdeel", tokens: 4 },
    ],
    budget: 20,
  },
  {
    naam: "Adoptiemaand",
    wanneer: "bijv. maand 3: estafette start",
    regels: [
      { wat: "n8n-workshop", tokens: 14 },
      { wat: "consultancydag", tokens: 5 },
    ],
    budget: 20,
    doorschuif: 1,
  },
  {
    naam: "Strategiemaand",
    wanneer: "bijv. maand 6: halfjaarreview",
    regels: [
      { wat: "strategiedag met AI Expert", tokens: 9 },
      { wat: "2 × developer-dag", tokens: 8 },
      { wat: "dagdeel", tokens: 2 },
    ],
    budget: 20,
    doorschuif: 1,
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
      "Alleen voor iets dat al gepland staat. Zo spaart Light 13 plus 13 voor een AI Design sessie van 16.",
  },
  {
    kop: "Bijkopen kan altijd",
    tekst: "EUR 300 per token, vast tarief. Geen onderhandeling.",
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
    wanneer: "e.g. month 1: MD assistant",
    regels: [
      { wat: "4 × developer day", tokens: 16 },
      { wat: "2 × half day", tokens: 4 },
    ],
    budget: 20,
  },
  {
    naam: "Adoption month",
    wanneer: "e.g. month 3: relay starts",
    regels: [
      { wat: "n8n workshop", tokens: 14 },
      { wat: "consultancy day", tokens: 5 },
    ],
    budget: 20,
    doorschuif: 1,
  },
  {
    naam: "Strategy month",
    wanneer: "e.g. month 6: half-year review",
    regels: [
      { wat: "strategy day with an AI expert", tokens: 9 },
      { wat: "2 × developer day", tokens: 8 },
      { wat: "half day", tokens: 2 },
    ],
    budget: 20,
    doorschuif: 1,
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
      "Only for something already scheduled. That way Light saves 13 plus 13 for an AI Design session that costs 16.",
  },
  {
    kop: "You can always buy extra",
    tekst: "EUR 300 per token, fixed rate. No negotiating.",
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
    maandKop: "Zo ziet 20 tokens er in de praktijk uit, elke maand anders",
    van: "van",
    tokens: "tokens",
    schuiftDoor: "schuift door",
  },
  en: {
    menuKop: "The menu",
    menuVoet:
      "Hosting, monitoring, support and the quarterly review cost 0 tokens. Your stack goes entirely to progress.",
    maandKop: "What 20 tokens look like in practice, different every month",
    van: "of",
    tokens: "tokens",
    schuiftDoor: "rolls over",
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

/**
 * Eén voorbeeldmaand als rij munten, gegroepeerd per onderdeel met het label
 * eronder. Dat is leesbaarder dan een gekleurde balk: je ziet nu welk
 * onderdeel welke munten opeet, en je kunt het natellen. De laatste groep is
 * open: dat zijn de tokens die doorschuiven naar de maand erna.
 */
function MaandRij({ maand, t }: { maand: Maand; t: typeof COPY.nl }) {
  const som = maand.regels.map((r) => r.tokens).join(" + ");
  const verbruikt = maand.regels.reduce((s, r) => s + r.tokens, 0);

  return (
    <div className="rounded-2xl border border-border bg-bg p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,15rem)_1fr] lg:items-start">
        <div>
          <p className="font-display text-base font-bold">{maand.naam}</p>
          <p className="mt-0.5 text-xs text-text-muted">{maand.wanneer}</p>
          <p className="font-display mt-2 text-sm font-bold text-gold">
            {som} = {verbruikt}
            {maand.doorschuif
              ? `, ${maand.doorschuif} ${t.schuiftDoor}`
              : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-x-7 gap-y-4">
          {maand.regels.map((r) => (
            <div key={r.wat}>
              <TokenStack n={r.tokens} featured klein />
              <p className="mt-1.5 text-xs text-text-muted">{r.wat}</p>
            </div>
          ))}
          {maand.doorschuif ? (
            <div>
              <TokenStack n={maand.doorschuif} open klein />
              <p className="mt-1.5 text-xs text-text-muted">{t.schuiftDoor}</p>
            </div>
          ) : null}
        </div>
      </div>
      <span className="sr-only">
        {maand.regels.map((r) => `${r.wat}: ${r.tokens} ${t.tokens}`).join(", ")}
        {maand.doorschuif
          ? `. ${maand.doorschuif} ${t.tokens} ${t.schuiftDoor}.`
          : "."}
      </span>
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
      {/* Menukaart. Twee kolommen vanaf sm: acht regels op volle breedte
          onder elkaar leest als een lijst, naast elkaar als een kaart. */}
      <Reveal>
        <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-7">
          <h3 className="font-display text-lg font-bold">{t.menuKop}</h3>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {menu.map((m) => (
              <li
                key={m.wat}
                className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0 sm:last:border-b"
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

      {/* Rekenvoorbeeld: drie maanden op volle breedte, zodat de munten per
          onderdeel op één regel passen en na te tellen zijn. */}
      <Reveal delay={0.1}>
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
            {t.maandKop}
          </p>
          <div className="space-y-4">
            {maanden.map((maand) => (
              <MaandRij key={maand.naam} maand={maand} t={t} />
            ))}
          </div>
        </div>
      </Reveal>

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
