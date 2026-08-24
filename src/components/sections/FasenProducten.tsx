"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { type Lang } from "@/lib/site";

type Chip = { label: string; href: string };

type Fase = {
  nr: number;
  /** Productcategorie, in mono boven de kop. */
  product: string;
  /** Waar de klant staat, het vette woord op de tab. */
  naam: string;
  /** Eén regel op de tab zelf. */
  kort: string;
  tekst: string;
  chips: Chip[];
  foto: string;
  /** Beschrijft wat er op de foto staat, niet wat de fase is. */
  fotoAlt: string;
  /** Label in de pil op de foto: de fase, niet de klant. */
  fotoLabel: string;
};

const FASEN_NL: Fase[] = [
  {
    nr: 1,
    product: "AI Knowledge",
    naam: "Prompten",
    kort: "Je team leert AI aansturen.",
    tekst:
      "Het begint bij kennis. Wij brengen die met lezingen en workshops op maat, in de taal van jouw branche. Na een halve dag weet iedereen wat er kan, en belangrijker: wat er morgen al kan.",
    chips: [
      { label: "AI Lezing", href: "/lezingen-workshops" },
      { label: "AI Workshop", href: "/workshops" },
      { label: "Branchespecifiek", href: "/ai-kennis" },
    ],
    foto: "/images/foto-lezing.webp",
    fotoAlt: "Olaf Lemmens op het podium tijdens een NinA AI keynote",
    fotoLabel: "AI Lezing",
  },
  {
    nr: 2,
    product: "AI Consult / Design",
    naam: "GPT's en skills",
    kort: "Van losse prompts naar herbruikbaar.",
    tekst:
      "Losse prompts blijven persoonlijke winst. Wij leggen ze vast in eigen GPT's, skills en een prompt-library, en brengen jullie processen in kaart zodat duidelijk is waar de winst zit.",
    chips: [
      { label: "AI Design sessie", href: "/ai-partnership#pakketten" },
      { label: "Process mapping", href: "/ai-partnership" },
    ],
    foto: "/images/foto-workshop.webp",
    fotoAlt: "Hands-on AI workshop met deelnemers achter laptops",
    fotoLabel: "AI Workshop",
  },
  {
    nr: 3,
    product: "AI Build",
    naam: "Automatisering",
    kort: "Werk dat vanzelf doorloopt.",
    tekst:
      "Workflows die taken overnemen en aan je eigen systemen hangen. Onze developers bouwen het in jullie omgeving, met een mens als laatste controle. Je houdt het IP.",
    chips: [
      { label: "AI Build", href: "/ai-build" },
      { label: "n8n Automations", href: "/n8n" },
    ],
    foto: "/images/foto-automatisering.webp",
    fotoAlt:
      "Olaf Lemmens laat een zelfgebouwde AI-contentmachine zien aan een volle zaal",
    fotoLabel: "AI Build",
  },
  {
    nr: 4,
    product: "AI Agents",
    naam: "AI-agents",
    kort: "Autonoom, met de mens erbij.",
    tekst:
      "Digitale collega's die plannen, uitvoeren en terugkoppelen. En die hebben zelf weer scherpe prompts nodig, dus vanaf hier begint fase 1 opnieuw.",
    chips: [
      { label: "AI Agents", href: "/ai-agents" },
      { label: "AI Build", href: "/ai-build" },
    ],
    foto: "/images/foto-agents.webp",
    fotoAlt:
      "Developer van NinA werkt in de code-editor aan een agent, met een AI-assistent ernaast",
    fotoLabel: "AI Agents",
  },
];

const FASEN_EN: Fase[] = [
  {
    nr: 1,
    product: "AI Knowledge",
    naam: "Prompting",
    kort: "Your team learns to direct AI.",
    tekst:
      "It starts with knowledge. We bring it with keynotes and workshops tailored to your industry. After half a day everyone knows what is possible, and more importantly: what is possible tomorrow.",
    chips: [
      { label: "AI Keynote", href: "/en/workshops" },
      { label: "AI Workshop", href: "/en/workshops" },
      { label: "Industry-specific", href: "/en/ai-knowledge" },
    ],
    foto: "/images/foto-lezing.webp",
    fotoAlt: "Olaf Lemmens on stage during a NinA AI keynote",
    fotoLabel: "AI Keynote",
  },
  {
    nr: 2,
    product: "AI Consult / Design",
    naam: "GPTs and skills",
    kort: "From loose prompts to reusable.",
    tekst:
      "Loose prompts stay individual gains. We capture them in your own GPTs, skills and a prompt library, and map your processes so it is clear where the gain sits.",
    chips: [
      { label: "AI Design session", href: "/en/ai-partnership#pakketten" },
      { label: "Process mapping", href: "/en/ai-partnership" },
    ],
    foto: "/images/foto-workshop.webp",
    fotoAlt: "Hands-on AI workshop with participants behind laptops",
    fotoLabel: "AI Workshop",
  },
  {
    nr: 3,
    product: "AI Build",
    naam: "Automation",
    kort: "Work that runs by itself.",
    tekst:
      "Workflows that take over tasks and connect to your own systems. Our developers build in your environment, with a human as the final check. You keep the IP.",
    chips: [
      { label: "AI Build", href: "/en/ai-build" },
      { label: "n8n Automations", href: "/en/n8n" },
    ],
    foto: "/images/foto-automatisering.webp",
    fotoAlt:
      "Olaf Lemmens presenting a self-built AI content machine to a full room",
    fotoLabel: "AI Build",
  },
  {
    nr: 4,
    product: "AI Agents",
    naam: "AI agents",
    kort: "Autonomous, with a human in the loop.",
    tekst:
      "Digital colleagues that plan, execute and report back. And they need sharp prompts themselves, so from here phase 1 starts again.",
    chips: [
      { label: "AI Agents", href: "/en/ai-agents" },
      { label: "AI Build", href: "/en/ai-build" },
    ],
    foto: "/images/foto-agents.webp",
    fotoAlt:
      "NinA developer working in the code editor on an agent, with an AI assistant alongside",
    fotoLabel: "AI Agents",
  },
];

const COPY = {
  nl: {
    tablist: "Vier fasen, met de producten die daarbij horen",
    partnershipKop: "Het AI Partnership loopt door alle vier de fasen",
    partnershipTekst:
      "Losse producten kun je per stuk afnemen. Wil je er niet elke keer opnieuw over beslissen, dan is het partnership de vaste capaciteit die alle vier de fasen dekt, met een team van 10+ specialisten.",
    partnershipCta: "Bekijk het AI Partnership",
    faseVan: (n: number) => `Fase ${n} van 4`,
  },
  en: {
    tablist: "Four phases, with the products that belong to each",
    partnershipKop: "The AI Partnership runs through all four phases",
    partnershipTekst:
      "You can buy the individual products one at a time. If you would rather not decide again every time, the partnership is the fixed capacity that covers all four phases, with a team of 10+ specialists.",
    partnershipCta: "See the AI Partnership",
    faseVan: (n: number) => `Phase ${n} of 4`,
  },
};

/**
 * De vier fasen als tabs, en per fase de producten die erbij horen. Dit
 * verving een rij van drie losse productkaarten: die liet niet zien wanneer
 * je welk product nodig hebt, en dat is precies de vraag van een bezoeker
 * die nog niet weet waar hij staat.
 *
 * Geen auto-advance, in tegenstelling tot FasenLoop hierboven. Daar is het
 * een animatie die het rondgaan van het signaal vertelt; hier zit inhoud in
 * het paneel die je aan het lezen bent, en dan is wegspringen hinderlijk.
 */
export default function FasenProducten({ lang = "nl" }: { lang?: Lang }) {
  const fasen = lang === "en" ? FASEN_EN : FASEN_NL;
  const t = lang === "en" ? COPY.en : COPY.nl;
  const [actief, setActief] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fase = fasen[actief];

  function kies(i: number) {
    const idx = (i + fasen.length) % fasen.length;
    setActief(idx);
    tabRefs.current[idx]?.focus();
  }

  function opToets(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      kies(actief + 1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      kies(actief - 1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      kies(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      kies(fasen.length - 1);
    }
  }

  return (
    <div className="overflow-hidden rounded-[3px] border border-border bg-bg-card shadow-[0_18px_60px_rgba(12,14,24,0.08)]">
      {/* Tabrij. Op mobiel twee kolommen, vanaf md vier naast elkaar. */}
      <div
        role="tablist"
        aria-label={t.tablist}
        onKeyDown={opToets}
        className="grid grid-cols-2 md:grid-cols-4"
      >
        {fasen.map((f, i) => {
          const aan = i === actief;
          return (
            <button
              key={f.nr}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`fase-tab-${f.nr}`}
              aria-selected={aan}
              aria-controls={`fase-paneel-${f.nr}`}
              tabIndex={aan ? 0 : -1}
              onClick={() => setActief(i)}
              data-cta={`fase_tab_${f.nr}`}
              data-cta-soort="fasen"
              className={`group relative border-border p-5 text-left transition-colors sm:p-6 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t md:border-t-0" : ""} ${
                i > 0 ? "md:border-l" : ""
              } ${
                aan
                  ? "bg-ink-deep text-white"
                  : "bg-bg-card hover:bg-bg-muted/60"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] ${
                    aan
                      ? "border-white/40 text-white/80"
                      : "border-border text-text-muted"
                  }`}
                >
                  {f.nr}
                </span>
                <span
                  className={`font-mono text-xs leading-tight ${
                    aan ? "text-white/70" : "text-text-muted"
                  }`}
                >
                  {f.product}
                </span>
              </span>
              <span
                className={`font-display mt-3 block text-lg font-bold leading-tight sm:text-xl ${
                  aan ? "text-white" : "text-text"
                }`}
              >
                {f.naam}
              </span>
              <span
                className={`mt-1.5 block text-sm leading-snug ${
                  aan ? "text-white/70" : "text-text-muted"
                }`}
              >
                {f.kort}
              </span>
            </button>
          );
        })}
      </div>

      {/* Paneel: tekst links, foto rechts tot aan de rand van de kaart. */}
      <div
        role="tabpanel"
        id={`fase-paneel-${fase.nr}`}
        aria-labelledby={`fase-tab-${fase.nr}`}
        className="grid border-t border-border lg:grid-cols-2"
      >
        {/* key op de inhoud: bij wisselen speelt de fade opnieuw. */}
        <div key={fase.nr} className="reveal-now p-7 [animation-duration:0.35s] sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-magenta">
            {fase.product}
          </p>
          <h3 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {fase.naam}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            {fase.tekst}
          </p>

          {/* De producten die bij deze fase horen, als echte links. */}
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {fase.chips.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  data-cta={`fase${fase.nr}_${c.label}`}
                  data-cta-soort="fase-product"
                  className="inline-flex rounded-full bg-primary/8 px-4 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary/15"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-text-muted/70">
            {t.faseVan(fase.nr)}
          </p>
        </div>

        {/* .foto zet het beeldrecept erop: alle fasefoto's komen uit
            verschillende sessies en camera's, deze behandeling trekt ze naar
            hetzelfde warme palet. */}
        <div className="foto relative min-h-64 lg:min-h-0">
          <Image
            key={fase.foto + fase.nr}
            src={fase.foto}
            alt={fase.fotoAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0c0e18]/45 to-transparent"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-ink-deep/85 px-4 py-1.5 font-mono text-xs text-white backdrop-blur">
            {fase.fotoLabel}
          </span>
        </div>
      </div>

      {/* Partnership onder alle vier: dat is het punt van deze sectie. */}
      <div className="flex flex-col gap-4 border-t border-border bg-bg-muted p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-display text-lg font-bold">{t.partnershipKop}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            {t.partnershipTekst}
          </p>
        </div>
        <Link
          href={lang === "en" ? "/en/ai-partnership" : "/ai-partnership"}
          data-cta="fasen_partnership"
          data-cta-soort="fasen"
          className="shrink-0 whitespace-nowrap rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
        >
          {t.partnershipCta}
        </Link>
      </div>
    </div>
  );
}
