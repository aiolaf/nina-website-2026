import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import TokenStack from "@/components/ui/TokenStack";
import type { Lang } from "@/lib/site";

type Tier = {
  label: string;
  naam: string;
  tokens: string;
  /** Aantal munten in de stapel; bij Enterprise met een plus erachter. */
  stapel: number;
  plus?: boolean;
  tokenLabel: string;
  prijs: string;
  periode: string;
  jaar: string;
  kickoff: string;
  voorWie: string;
  punten: string[];
  featured: boolean;
};

/**
 * Capaciteit staat in tokens, niet in dagen. Eén token is EUR 250, dus de
 * maandfee en het tokenaantal horen bij elkaar; zie TokenMenukaart voor wat
 * een token oplevert.
 */
const TIERS_NL: Tier[] = [
  {
    label: "Instap",
    naam: "AI Partner Light",
    tokens: "10",
    stapel: 10,
    tokenLabel: "tokens per maand",
    prijs: "EUR 2.500",
    periode: "per maand",
    jaar: "EUR 30.000 per jaar",
    kickoff: "Kickoff Fase Light, eenmalig EUR 3.750",
    voorWie: "MKB of één team",
    punten: [
      "2 developerdagen plus een dagdeel",
      "Of twee maanden sparen voor een workshop",
    ],
    featured: false,
  },
  {
    label: "Meest gekozen",
    naam: "AI Partner Standaard",
    tokens: "20",
    stapel: 20,
    tokenLabel: "tokens per maand",
    prijs: "EUR 4.950",
    periode: "per maand",
    jaar: "EUR 59.400 per jaar",
    kickoff: "Kickoff Fase, eenmalig EUR 7.500",
    voorWie: "Mid-market en scale-ups",
    punten: [
      "Een workshop plus een developerdag plus een dagdeel",
      "Of 5 developerdagen: een maand volle bak bouwen",
      "Kwartaalreview en eigen IP",
    ],
    featured: true,
  },
  {
    label: "Org-breed",
    naam: "AI Partner Enterprise",
    tokens: "30+",
    stapel: 30,
    plus: true,
    tokenLabel: "tokens per maand",
    prijs: "vanaf EUR 7.500",
    periode: "per maand",
    jaar: "vanaf EUR 90.000 per jaar",
    kickoff: "Kickoff Fase op maat, vanaf EUR 7.500",
    voorWie: "Organisatiebreed programma",
    punten: [
      "Een AI Design sessie, 3 developerdagen en een dagdeel",
      "Dedicated developer en strateeg",
      "Security, compliance en SLA",
    ],
    featured: false,
  },
];

const TIERS_EN: Tier[] = [
  {
    label: "Entry",
    naam: "AI Partner Light",
    tokens: "10",
    stapel: 10,
    tokenLabel: "tokens per month",
    prijs: "EUR 2,500",
    periode: "per month",
    jaar: "EUR 30,000 per year",
    kickoff: "Kickoff Phase Light, one-off EUR 3,750",
    voorWie: "SMEs or a single team",
    punten: [
      "2 developer days plus a half day",
      "Or save up over two months for a workshop",
    ],
    featured: false,
  },
  {
    label: "Most popular",
    naam: "AI Partner Standard",
    tokens: "20",
    stapel: 20,
    tokenLabel: "tokens per month",
    prijs: "EUR 4,950",
    periode: "per month",
    jaar: "EUR 59,400 per year",
    kickoff: "Kickoff Phase, one-off EUR 7,500",
    voorWie: "Mid-market and scale-ups",
    punten: [
      "A workshop plus a developer day plus a half day",
      "Or 5 developer days: a month of nothing but building",
      "Quarterly review, and you own the IP",
    ],
    featured: true,
  },
  {
    label: "Org-wide",
    naam: "AI Partner Enterprise",
    tokens: "30+",
    stapel: 30,
    plus: true,
    tokenLabel: "tokens per month",
    prijs: "from EUR 7,500",
    periode: "per month",
    jaar: "from EUR 90,000 per year",
    kickoff: "Custom Kickoff Phase, from EUR 7,500",
    voorWie: "Organization-wide program",
    punten: [
      "An AI Design session, 3 developer days and a half day",
      "Dedicated developer and strategist",
      "Security, compliance and SLA",
    ],
    featured: false,
  },
];

export default function PartnershipTiers({ lang = "nl" }: { lang?: Lang }) {
  const tiers = lang === "en" ? TIERS_EN : TIERS_NL;
  const cta = lang === "en" ? "Book an intro call" : "Plan kennismaking";
  const href = lang === "en" ? "/en/contact" : "/contact";

  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-end">
      {tiers.map((tier, idx) => (
        <Reveal key={tier.naam} delay={idx * 0.1}>
          <div
            className={`flex flex-col rounded-2xl border p-6 transition-shadow sm:p-7 ${
              tier.featured
                ? "border-glow border-primary/60 bg-bg-muted shadow-[0_12px_44px_rgba(97,68,121,0.14)] lg:pb-10 lg:pt-9"
                : "border-border bg-bg-card hover:border-primary/40"
            }`}
          >
            <span
              className={`w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                tier.featured
                  ? "bg-gold/15 text-gold"
                  : "bg-bg-muted text-text-muted"
              }`}
            >
              {tier.label}
            </span>
            <h3 className="font-display mt-4 text-xl font-bold">{tier.naam}</h3>
            <p className="mt-1 text-sm text-text-muted">{tier.voorWie}</p>
            {/* Tokens staan boven de prijs: dat is wat je koopt, de fee is
                wat het kost. */}
            <p className="mt-5 flex items-baseline gap-2">
              <span
                className={`font-display text-4xl font-bold ${
                  tier.featured ? "text-gold" : ""
                }`}
              >
                {tier.tokens}
              </span>
              <span className="text-sm text-text-muted">{tier.tokenLabel}</span>
            </p>
            <div className="mt-3">
              <TokenStack
                n={tier.stapel}
                plus={tier.plus}
                featured={tier.featured}
              />
            </div>
            <p className="mt-3 border-t border-border pt-3">
              <span className="font-display text-2xl font-bold">
                {tier.prijs}
              </span>{" "}
              <span className="text-sm text-text-muted">{tier.periode}</span>
            </p>
            <p className="mt-1 text-xs text-text-muted">{tier.jaar}</p>
            <p className="mt-1 text-xs text-text-muted">{tier.kickoff}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.punten.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <MagneticButton
              href={href}
              variant={tier.featured ? "primary" : "ghost"}
              className="mt-7 w-full"
            >
              {cta}
            </MagneticButton>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
