import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  IconPrompt,
  IconSpark,
  IconFlow,
  IconBot,
} from "@/components/ui/icons";
import { site, type Lang } from "@/lib/site";

/**
 * De APO methode (AI Process Optimisation) als vier kaarten, naar het ontwerp
 * van Olaf: lichte glaskaarten met een stapbadge, zachte pastelaccenten en
 * per stap een visual die het echte sessiemateriaal laat zien in plaats van
 * een alinea uitleg.
 *
 * Alle cijfers komen uit het APO-brondocument en Olafs eigen ontwerp: het
 * offerteproces (100 min, 2 tot 3 personen, 35x per maand), de classificatie
 * met de 40%-rem bij te weinig data, en het rekenvoorbeeld met het
 * Standaard-pakket (EUR 79.500 eerste jaar). Niets hiervan is hier verzonnen;
 * wijzigen hoort via dat brondocument te lopen.
 */

type T = { nl: string; en: string };
const t = (x: T, lang: Lang) => (lang === "en" ? x.en : x.nl);

/* Accentkleuren uit het ontwerp. Bewust hex en geen themakleuren: dit blok
   heeft zijn eigen visuele taal, net als in de aangeleverde schermen. */
const KLEUR = {
  groen: { tekst: "#15803d", vlak: "#e7f3ea", dot: "#22c55e" },
  blauw: { tekst: "#1d4ed8", vlak: "#e8effc", dot: "#3b82f6" },
  paars: { tekst: "#6d28d9", vlak: "#f0eafc", dot: "#8b5cf6" },
  oranje: { tekst: "#c2410c", vlak: "#fdeee3", dot: "#f97316" },
  amber: { tekst: "#a16207", vlak: "#f8f0d8", dot: "#eab308" },
  roze: { tekst: "#be123c", vlak: "#fdeaef", dot: "#f43f5e" },
} as const;

const DIMENSIES: T[] = [
  { nl: "Strategie", en: "Strategy" },
  { nl: "Data", en: "Data" },
  { nl: "Technologie", en: "Technology" },
  { nl: "Mensen", en: "People" },
  { nl: "Processen", en: "Processes" },
  { nl: "Governance", en: "Governance" },
  { nl: "Cultuur", en: "Culture" },
];

const KADERS: T[] = [
  { nl: "Financieel kader", en: "Financial framing" },
  { nl: "Ambitie", en: "Ambition" },
  { nl: "AI-beleid", en: "AI policy" },
  { nl: "Governance", en: "Governance" },
];

const TOPKANSEN: {
  kop: T;
  kleur: keyof typeof KLEUR;
  items: { tekst: T; stemmen: number }[];
}[] = [
  {
    kop: { nl: "Tijdvreters", en: "Time sinks" },
    kleur: "amber",
    items: [
      { tekst: { nl: "Offertes kosten te veel tijd", en: "Quotes take too long" }, stemmen: 8 },
      { tekst: { nl: "Handmatige factuurcontrole", en: "Manual invoice checks" }, stemmen: 6 },
      { tekst: { nl: "Informatie uit e-mails halen", en: "Pulling info from emails" }, stemmen: 5 },
    ],
  },
  {
    kop: { nl: "AI-kansen", en: "AI opportunities" },
    kleur: "groen",
    items: [
      { tekst: { nl: "Automatisch offertevoorstel genereren", en: "Auto-generate quote drafts" }, stemmen: 9 },
      { tekst: { nl: "Facturen automatisch controleren", en: "Check invoices automatically" }, stemmen: 7 },
      { tekst: { nl: "E-mails analyseren en classificeren", en: "Analyse and classify emails" }, stemmen: 6 },
    ],
  },
  {
    kop: { nl: "Frustraties", en: "Frustrations" },
    kleur: "roze",
    items: [
      { tekst: { nl: "Dubbele invoer tussen systemen", en: "Double entry between systems" }, stemmen: 7 },
      { tekst: { nl: "Onduidelijke verantwoordelijkheid", en: "Unclear ownership" }, stemmen: 5 },
      { tekst: { nl: "Te veel wisselen tussen tools", en: "Too much tool switching" }, stemmen: 4 },
    ],
  },
];

const PROCESMAP: { naam: T; min: number; personen: string; systeem: string }[] = [
  { naam: { nl: "Aanvraag ontvangen", en: "Request received" }, min: 15, personen: "1", systeem: "E-mail" },
  { naam: { nl: "Informatie verzamelen", en: "Gather information" }, min: 20, personen: "1", systeem: "E-mail, CRM" },
  { naam: { nl: "Offerte opstellen", en: "Draft the quote" }, min: 45, personen: "1", systeem: "CRM" },
  { naam: { nl: "Controle", en: "Review" }, min: 15, personen: "2", systeem: "CRM" },
  { naam: { nl: "Versturen", en: "Send" }, min: 5, personen: "1", systeem: "E-mail" },
];

const CLASSIFICATIE: {
  stap: T;
  modus: T;
  modusKleur: keyof typeof KLEUR | "grijs";
  fit: number;
  betrouwbaarheid: number;
  waarschuwing?: T;
  rol: T;
  laag: number;
}[] = [
  {
    stap: { nl: "Offerte opstellen", en: "Draft the quote" },
    modus: { nl: "Handmatig", en: "Manual" },
    modusKleur: "grijs",
    fit: 1,
    betrouwbaarheid: 40,
    waarschuwing: { nl: "Te weinig data of voorbeelden", en: "Too little data or examples" },
    rol: { nl: "Human in the loop", en: "Human in the loop" },
    laag: 2,
  },
  {
    stap: { nl: "Factuurgegevens uitlezen", en: "Read invoice data" },
    modus: { nl: "Automatiseren", en: "Automate" },
    modusKleur: "oranje",
    fit: 4,
    betrouwbaarheid: 95,
    rol: { nl: "AI assisted human", en: "AI assisted human" },
    laag: 3,
  },
  {
    stap: { nl: "Klantvraag classificeren", en: "Classify the customer question" },
    modus: { nl: "AI met mens-check", en: "AI with human check" },
    modusKleur: "blauw",
    fit: 4,
    betrouwbaarheid: 85,
    rol: { nl: "Human in the loop", en: "Human in the loop" },
    laag: 2,
  },
  {
    stap: { nl: "Contractcontrole", en: "Contract review" },
    modus: { nl: "Automatiseren", en: "Automate" },
    modusKleur: "oranje",
    fit: 3,
    betrouwbaarheid: 70,
    rol: { nl: "AI assisted human", en: "AI assisted human" },
    laag: 4,
  },
];

const BOUWLAGEN: { naam: T; sub: T; Icon: typeof IconPrompt }[] = [
  {
    naam: { nl: "Prompts en knowledge", en: "Prompts and knowledge" },
    sub: { nl: "Basiskennis en instructies", en: "Base knowledge and instructions" },
    Icon: IconPrompt,
  },
  {
    naam: { nl: "Skills en projects", en: "Skills and projects" },
    sub: { nl: "Modulaire AI-capaciteiten", en: "Modular AI capabilities" },
    Icon: IconSpark,
  },
  {
    naam: { nl: "Workflow automation", en: "Workflow automation" },
    sub: { nl: "Koppelen en automatiseren", en: "Connect and automate" },
    Icon: IconFlow,
  },
  {
    naam: { nl: "Custom AI build", en: "Custom AI build" },
    sub: { nl: "Maatwerk en eigen modellen", en: "Bespoke work and own models" },
    Icon: IconBot,
  },
];

/* Kwadrant: posities in procenten van het vlak, uit het ontwerp. */
const KWADRANT: { naam: T; x: number; y: number; kleur: keyof typeof KLEUR }[] = [
  { naam: { nl: "Offerte-AI", en: "Quote AI" }, x: 16, y: 20, kleur: "oranje" },
  { naam: { nl: "Factuurrouting", en: "Invoice routing" }, x: 13, y: 38, kleur: "groen" },
  { naam: { nl: "Contract review", en: "Contract review" }, x: 60, y: 24, kleur: "blauw" },
  { naam: { nl: "Inbox triage", en: "Inbox triage" }, x: 16, y: 72, kleur: "paars" },
  { naam: { nl: "Rapportage-automatisering", en: "Reporting automation" }, x: 56, y: 66, kleur: "amber" },
];

const FUTUREPLAN: {
  fase: T;
  periode: T;
  kleur: keyof typeof KLEUR;
  items: T[];
}[] = [
  {
    fase: { nl: "Quick wins", en: "Quick wins" },
    periode: { nl: "0 tot 3 maanden", en: "0 to 3 months" },
    kleur: "groen",
    items: [
      { nl: "Offerte-AI", en: "Quote AI" },
      { nl: "Factuurrouting", en: "Invoice routing" },
      { nl: "Inbox triage", en: "Inbox triage" },
    ],
  },
  {
    fase: { nl: "Build", en: "Build" },
    periode: { nl: "3 tot 9 maanden", en: "3 to 9 months" },
    kleur: "blauw",
    items: [
      { nl: "Contract review", en: "Contract review" },
      { nl: "Rapportage-automatisering", en: "Reporting automation" },
      { nl: "Klantcommunicatie-AI", en: "Customer comms AI" },
    ],
  },
  {
    fase: { nl: "Strategic", en: "Strategic" },
    periode: { nl: "9 maanden en verder", en: "9 months and beyond" },
    kleur: "paars",
    items: [
      { nl: "Voorspellende planning", en: "Predictive planning" },
      { nl: "Pricing intelligence", en: "Pricing intelligence" },
      { nl: "AI-gedreven besluitvorming", en: "AI-driven decision-making" },
    ],
  },
];

const COPY = {
  nl: {
    badge: "APO methode",
    stappen: [
      {
        titel: "Waar staat de organisatie nu",
        sub: "We meten de AI-volwassenheid op zeven dimensies en leggen het financiële kader en het AI-beleid vast.",
      },
      {
        titel: "Van kansen naar processen",
        sub: "We verzamelen tijdvreters en tekenen het werk uit in meetbare stappen.",
      },
      {
        titel: "Van handmatig naar AI",
        sub: "Per stap bepalen we wat AI doet, waar de mens controle houdt en wat je zelf doet of laat bouwen.",
      },
      {
        titel: "Prioriteiten en business case",
        sub: "We kiezen quick wins en vertalen kansen naar besparing, investering en roadmap.",
      },
    ],
    nulmeting: "Nulmeting op zeven dimensies",
    nulmetingSub: "Iedereen aan tafel scoort mee, van 1 tot 5. Het gemiddelde is het startpunt, de ambitie het doel.",
    kaders: "Kaders en beleid",
    kadersSub: "Zonder kader geen business case: wat kost een uur, wat mag AI wel en niet.",
    jouwScore: "start",
    doel: "doel na 12 maanden",
    topkansen: "Topkansen",
    stemmenUitleg: "het cijfer is het aantal stemmen uit het team",
    procesmap: "Procesmap",
    procesVoorbeeld: "Offerteproces",
    minuten: "min",
    personen: (n: string) => `${n} ${n === "1" ? "persoon" : "personen"}`,
    frequentie: "35x p/m",
    totaalTijd: "tijd",
    totaalPersonen: "personen",
    totaalFrequentie: "frequentie",
    totaalNoot: "Elk proces wordt meetbaar gemaakt.",
    classificatie: "Classificatie",
    kolommen: ["Stap", "Modus", "AI-fit", "Betrouwbaarheid", "Rol", "Bouwlaag"],
    laag: "Laag",
    bouwlagen: "Bouwlagen",
    route: "Kies je route",
    zelf: "Zelf met AI",
    nina: "NinA bouwt",
    remNoot:
      "Ontbreken data of voorbeelden, dan gaat de betrouwbaarheid nooit boven de 40%. Eerst het fundament, dan de bouw.",
    prioritering: "Prioritering",
    asY: "besparing per jaar",
    asX: "bouwuren",
    kwadranten: ["Quick win", "Strategic", "Fill-in", "Thankless"],
    scenarioNoot: "Het verwachte scenario is leidend, nooit de best case.",
    businessCase: "Business case",
    tegels: [
      { label: "Besparing per jaar", waarde: "EUR 148.000", kleur: "groen" as const },
      { label: "Investering eerste jaar", waarde: "EUR 79.500", kleur: "blauw" as const },
      { label: "Terugverdientijd", waarde: "6,4 maanden", kleur: "paars" as const },
    ],
    futurePlan: "AI Future Plan",
    rekenvoorbeeld:
      "Rekenvoorbeeld met het Standaard-pakket. Jouw cijfers ontstaan live in de sessie.",
    slot: "Dit is de methode achter de Kickoff Fase en de AI Design sessie.",
    ctaPrijs: "Bekijk wat het kost",
    ctaKennismaking: "Plan een kennismaking",
  },
  en: {
    badge: "APO method",
    stappen: [
      {
        titel: "Where the organisation stands",
        sub: "We measure AI maturity across seven dimensions and set the financial framing and AI policy.",
      },
      {
        titel: "From opportunities to processes",
        sub: "We collect the time sinks and map the work into measurable steps.",
      },
      {
        titel: "From manual to AI",
        sub: "Per step we decide what AI does, where a human stays in control, and what you do yourself or have built.",
      },
      {
        titel: "Priorities and business case",
        sub: "We pick quick wins and translate opportunities into savings, investment and a roadmap.",
      },
    ],
    nulmeting: "Baseline across seven dimensions",
    nulmetingSub: "Everyone at the table scores along, from 1 to 5. The average is the start, the ambition is the target.",
    kaders: "Framing and policy",
    kadersSub: "No framing, no business case: what an hour costs, and what AI may and may not do.",
    jouwScore: "start",
    doel: "target after 12 months",
    topkansen: "Top opportunities",
    stemmenUitleg: "the number is the team's votes",
    procesmap: "Process map",
    procesVoorbeeld: "Quote process",
    minuten: "min",
    personen: (n: string) => `${n} ${n === "1" ? "person" : "people"}`,
    frequentie: "35x p/m",
    totaalTijd: "time",
    totaalPersonen: "people",
    totaalFrequentie: "frequency",
    totaalNoot: "Every process is made measurable.",
    classificatie: "Classification",
    kolommen: ["Step", "Mode", "AI fit", "Confidence", "Role", "Build layer"],
    laag: "Layer",
    bouwlagen: "Build layers",
    route: "Pick your route",
    zelf: "Yourself with AI",
    nina: "NinA builds",
    remNoot:
      "If data or examples are missing, confidence never goes above 40%. Foundation first, then the build.",
    prioritering: "Prioritisation",
    asY: "savings per year",
    asX: "build hours",
    kwadranten: ["Quick win", "Strategic", "Fill-in", "Thankless"],
    scenarioNoot: "The expected scenario leads, never the best case.",
    businessCase: "Business case",
    tegels: [
      { label: "Savings per year", waarde: "EUR 148,000", kleur: "groen" as const },
      { label: "First-year investment", waarde: "EUR 79,500", kleur: "blauw" as const },
      { label: "Payback time", waarde: "6.4 months", kleur: "paars" as const },
    ],
    futurePlan: "AI Future Plan",
    rekenvoorbeeld:
      "Worked example with the Standard package. Your own numbers take shape live in the session.",
    slot: "This is the method behind the Kickoff Phase and the AI Design session.",
    ctaPrijs: "See what it costs",
    ctaKennismaking: "Book an intro call",
  },
};

function Pil({ kleur, children }: { kleur: keyof typeof KLEUR | "grijs"; children: React.ReactNode }) {
  if (kleur === "grijs") {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full bg-bg-muted px-2.5 py-1 text-xs font-medium text-text-muted">
        {children}
      </span>
    );
  }
  const k = KLEUR[kleur];
  return (
    <span
      className="inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: k.vlak, color: k.tekst }}
    >
      {children}
    </span>
  );
}

/** Vier staafjes, zoals de AI-fit indicator in het ontwerp. */
function Fit({ n }: { n: number }) {
  return (
    <span aria-label={`${n} van 4`} className="flex items-end gap-0.5">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-1 rounded-[3px]"
          style={{
            height: 4 + i * 3,
            backgroundColor: i <= n ? (n >= 3 ? KLEUR.groen.dot : KLEUR.oranje.dot) : "#ddd5c9",
          }}
        />
      ))}
    </span>
  );
}

function StapKaart({
  nr,
  lang,
  children,
}: {
  nr: number;
  lang: Lang;
  children: React.ReactNode;
}) {
  const c = lang === "en" ? COPY.en : COPY.nl;
  const stap = c.stappen[nr - 1];
  return (
    <Reveal>
      <div className="rounded-[3px] border border-border bg-bg-card p-6 shadow-[0_18px_60px_rgba(12,14,24,0.07)] sm:p-9">
        <span className="inline-flex rounded-full border border-border bg-bg px-3.5 py-1.5 font-mono text-xs text-text-muted">
          {c.badge} · {nr}/4
        </span>
        <h3 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {stap.titel}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-text-muted">{stap.sub}</p>
        <div className="mt-7">{children}</div>
      </div>
    </Reveal>
  );
}

function Paneel({
  kop,
  dot,
  children,
}: {
  kop: string;
  dot?: keyof typeof KLEUR;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[3px] border border-border bg-bg p-5">
      <p className="flex items-center gap-2 text-sm font-semibold">
        {dot && (
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: KLEUR[dot].dot }}
          />
        )}
        {kop}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ApoMethode({ lang = "nl" }: { lang?: Lang }) {
  const c = lang === "en" ? COPY.en : COPY.nl;
  const pakkettenHref = lang === "en" ? "#packages" : "#pakketten";

  return (
    <div className="space-y-6">
      {/* 1/4: nulmeting en kaders */}
      <StapKaart nr={1} lang={lang}>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Paneel kop={c.nulmeting} dot="paars">
            <p className="text-xs leading-relaxed text-text-muted">{c.nulmetingSub}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {DIMENSIES.map((d) => (
                <li
                  key={d.nl}
                  className="rounded-full border border-border bg-bg-card px-3 py-1.5 text-xs text-text"
                >
                  {t(d, lang)}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-baseline gap-3 border-t border-border pt-4">
              <span className="font-display text-3xl font-bold">3,0</span>
              <span className="text-xs text-text-muted">{c.jouwScore}</span>
              <span aria-hidden="true" className="text-magenta">→</span>
              <span className="font-display text-3xl font-bold text-magenta">4,0</span>
              <span className="text-xs text-text-muted">{c.doel}</span>
            </p>
          </Paneel>
          <Paneel kop={c.kaders} dot="amber">
            <p className="text-xs leading-relaxed text-text-muted">{c.kadersSub}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {KADERS.map((k) => (
                <li key={k.nl}>
                  <Pil kleur="grijs">{t(k, lang)}</Pil>
                </li>
              ))}
            </ul>
          </Paneel>
        </div>
      </StapKaart>

      {/* 2/4: topkansen en procesmap */}
      <StapKaart nr={2} lang={lang}>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <Paneel kop={`${c.topkansen} · ${c.stemmenUitleg}`}>
            <div className="grid grid-cols-3 gap-2.5">
              {TOPKANSEN.map((kolom) => (
                <div key={kolom.kop.nl}>
                  <p
                    className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold"
                    style={{ color: KLEUR[kolom.kleur].tekst }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: KLEUR[kolom.kleur].dot }}
                    />
                    {t(kolom.kop, lang)}
                  </p>
                  <ul className="space-y-2">
                    {kolom.items.map((item) => (
                      <li
                        key={item.tekst.nl}
                        className="rounded-[3px] p-2.5 text-[11px] leading-snug"
                        style={{ backgroundColor: KLEUR[kolom.kleur].vlak, color: "#0c0e18" }}
                      >
                        {t(item.tekst, lang)}
                        <span
                          className="mt-1 block font-mono text-[10px]"
                          style={{ color: KLEUR[kolom.kleur].tekst }}
                        >
                          {item.stemmen}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Paneel>

          <Paneel kop={`${c.procesmap} · ${c.procesVoorbeeld}`} dot="oranje">
            {/* Op mobiel een scrollende rij, vanaf lg vijf naast elkaar. */}
            <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible">
              {PROCESMAP.map((s, i) => (
                <div
                  key={s.naam.nl}
                  className="w-36 shrink-0 snap-start rounded-[3px] border border-border bg-bg-card p-3 lg:w-auto"
                >
                  <p className="font-mono text-[10px] text-text-muted">{i + 1}</p>
                  <p className="mt-1 min-h-8 text-xs font-semibold leading-snug">
                    {t(s.naam, lang)}
                  </p>
                  <ul className="mt-2 space-y-1 text-[10px] text-text-muted">
                    <li>{s.min} {c.minuten}</li>
                    <li>{c.personen(s.personen)}</li>
                    <li>{c.frequentie}</li>
                    <li className="truncate">{s.systeem}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-3 text-xs text-text-muted">
              <span>
                {c.totaalTijd} <strong className="text-text">100 {c.minuten}</strong>
              </span>
              <span>
                {c.totaalPersonen} <strong className="text-text">2–3</strong>
              </span>
              <span>
                {c.totaalFrequentie} <strong className="text-text">35x p/m</strong>
              </span>
              <span className="text-text-muted/80">{c.totaalNoot}</span>
            </div>
          </Paneel>
        </div>
      </StapKaart>

      {/* 3/4: classificatie en bouwlagen */}
      <StapKaart nr={3} lang={lang}>
        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Paneel kop={c.classificatie}>
            <ul className="space-y-2.5">
              {CLASSIFICATIE.map((r) => (
                <li
                  key={r.stap.nl}
                  className="grid grid-cols-2 items-center gap-x-4 gap-y-2 rounded-[3px] border border-border bg-bg-card p-4 sm:grid-cols-[1.2fr_auto_auto_1fr_auto] sm:gap-x-5"
                >
                  <p className="text-sm font-semibold">{t(r.stap, lang)}</p>
                  <div className="justify-self-end sm:justify-self-auto">
                    <Pil kleur={r.modusKleur}>{t(r.modus, lang)}</Pil>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fit n={r.fit} />
                    <span
                      className="font-display text-sm font-bold"
                      style={{
                        color:
                          r.betrouwbaarheid >= 85
                            ? KLEUR.groen.tekst
                            : r.betrouwbaarheid >= 60
                              ? KLEUR.amber.tekst
                              : KLEUR.oranje.tekst,
                      }}
                    >
                      {r.betrouwbaarheid}%
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    {t(r.rol, lang)}
                    {r.waarschuwing && (
                      <span className="block" style={{ color: KLEUR.oranje.tekst }}>
                        {t(r.waarschuwing, lang)}
                      </span>
                    )}
                  </p>
                  <div className="justify-self-end">
                    <Pil kleur="grijs">
                      {c.laag} {r.laag}
                    </Pil>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-text-muted">{c.remNoot}</p>
          </Paneel>

          <Paneel kop={c.bouwlagen}>
            <ul className="space-y-2.5">
              {BOUWLAGEN.map((laag, i) => (
                <li
                  key={laag.naam.nl}
                  className="flex items-start gap-3 rounded-[3px] border border-border bg-bg-card p-3.5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-primary/10 text-primary">
                    <laag.Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {c.laag} {i + 1} · {t(laag.naam, lang)}
                    </span>
                    <span className="block text-xs text-text-muted">{t(laag.sub, lang)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="text-xs text-text-muted">{c.route}:</span>
              <Pil kleur="grijs">{c.zelf} · {c.laag} 1–2</Pil>
              <Pil kleur="paars">{c.nina} · {c.laag} 3–4</Pil>
            </div>
          </Paneel>
        </div>
      </StapKaart>

      {/* 4/4: prioritering, business case en future plan */}
      <StapKaart nr={4} lang={lang}>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <Paneel kop={c.prioritering}>
            <div className="relative aspect-[5/4]">
              {/* assen */}
              <div aria-hidden="true" className="absolute inset-0 border-b border-l border-border" />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-full border-l border-dashed border-border"
              />
              <div
                aria-hidden="true"
                className="absolute left-0 top-1/2 w-full border-t border-dashed border-border"
              />
              {/* kwadrantlabels */}
              <span className="absolute left-2 top-1.5 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] text-text-muted">
                {c.kwadranten[0]}
              </span>
              <span className="absolute right-2 top-1.5 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] text-text-muted">
                {c.kwadranten[1]}
              </span>
              <span className="absolute bottom-1.5 left-2 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] text-text-muted">
                {c.kwadranten[2]}
              </span>
              <span className="absolute bottom-1.5 right-2 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] text-text-muted">
                {c.kwadranten[3]}
              </span>
              {/* kansen */}
              {KWADRANT.map((k) => (
                <span
                  key={k.naam.nl}
                  className="absolute flex -translate-y-1/2 items-center gap-1.5"
                  style={{ left: `${k.x}%`, top: `${k.y}%` }}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: KLEUR[k.kleur].dot }}
                  />
                  <span className="whitespace-nowrap text-[11px] text-text">
                    {t(k.naam, lang)}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-text-muted">
              <span>↑ {c.asY}</span>
              <span>{c.asX} →</span>
            </div>
            <p className="mt-3 border-t border-border pt-3 text-xs text-text-muted">
              {c.scenarioNoot}
            </p>
          </Paneel>

          <div className="space-y-5">
            <Paneel kop={c.businessCase}>
              <div className="grid gap-3 sm:grid-cols-3">
                {c.tegels.map((tegel) => (
                  <div
                    key={tegel.label}
                    className="rounded-[3px] border border-border bg-bg-card p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold"
                      style={{
                        backgroundColor: KLEUR[tegel.kleur].vlak,
                        color: KLEUR[tegel.kleur].tekst,
                      }}
                    >
                      €
                    </span>
                    <p className="mt-3 text-xs text-text-muted">{tegel.label}</p>
                    <p className="font-display mt-1 text-xl font-bold">{tegel.waarde}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-text-muted">{c.rekenvoorbeeld}</p>
            </Paneel>

            <Paneel kop={c.futurePlan} dot="paars">
              <div className="grid gap-2.5 sm:grid-cols-3">
                {FUTUREPLAN.map((fase) => (
                  <div key={fase.fase.nl} className="rounded-[3px] border border-border bg-bg-card p-3.5">
                    <p
                      className="flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: KLEUR[fase.kleur].tekst }}
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: KLEUR[fase.kleur].dot }}
                      />
                      {t(fase.fase, lang)}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">{t(fase.periode, lang)}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {fase.items.map((item) => (
                        <li
                          key={item.nl}
                          className="rounded-[3px] px-2.5 py-1.5 text-[11px] leading-snug"
                          style={{ backgroundColor: KLEUR[fase.kleur].vlak, color: "#0c0e18" }}
                        >
                          {t(item, lang)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Paneel>
          </div>
        </div>
      </StapKaart>

      {/* Slot: waar deze methode in de producten zit */}
      <Reveal delay={0.05}>
        <div className="flex flex-col gap-4 rounded-[3px] border border-border bg-bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-xl text-sm leading-relaxed text-text-muted">{c.slot}</p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <MagneticButton
              href={site.bookingPartnership}
              className="w-full sm:w-auto"
              data-cta="apo_kennismaking"
              data-cta-soort="apo"
            >
              {c.ctaKennismaking}
            </MagneticButton>
            <Link
              href={pakkettenHref}
              data-cta="apo_naar_pakketten"
              data-cta-soort="apo"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              {c.ctaPrijs}
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
