import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const TIERS = [
  {
    label: "Instap",
    naam: "AI Partner Light",
    prijs: "EUR 2.500",
    periode: "per maand",
    kickoff: "Kickoff Fase Light, eenmalig EUR 3.750",
    voorWie: "MKB of een team",
    punten: [
      "1 dag per maand vaste capaciteit",
      "1 quick win per maand",
      "Support en hosting",
    ],
    featured: false,
  },
  {
    label: "Meest gekozen",
    naam: "AI Partner Standaard",
    prijs: "EUR 4.950",
    periode: "per maand",
    kickoff: "Kickoff Fase, eenmalig EUR 7.500",
    voorWie: "Mid-market en scale-ups",
    punten: [
      "2 dagen per maand vaste capaciteit",
      "Doorlopend bouwen aan workflows en agents",
      "Eigen IP en hosting",
      "Kwartaalreview en train-de-trainer",
    ],
    featured: true,
  },
  {
    label: "Org-breed",
    naam: "AI Partner Enterprise",
    prijs: "EUR 7.500+",
    periode: "per maand",
    kickoff: "Kickoff Fase op maat, vanaf EUR 7.500",
    voorWie: "Versnellingsprogramma over teams",
    punten: [
      "Dedicated team van developer en strateeg",
      "Organisatiebrede borging en AI-ambassadeurs",
      "Security, compliance en SLA",
    ],
    featured: false,
  },
];

export default function PartnershipTiers() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-end">
      {TIERS.map((tier, idx) => (
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
            <p className="mt-5">
              <span className="font-display text-3xl font-bold">
                {tier.prijs}
              </span>
              <span className="ml-2 text-sm text-text-muted">
                {tier.periode}
              </span>
            </p>
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
              href="/contact"
              variant={tier.featured ? "primary" : "ghost"}
              className="mt-7 w-full"
            >
              Plan kennismaking
            </MagneticButton>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
