import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import AgentDemo from "@/components/demo/AgentDemo";
import CtaSection from "@/components/sections/CtaSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "Digitale collega's die 24/7 werken. AI-agents voor documentverwerking, orders naar ERP en klantenservice, veilig gehost in Amsterdam.",
};

const USE_CASES = [
  {
    naam: "Document en rapport uit expertkennis",
    tekst:
      "Calculaties, adviezen en compliance-documenten waar nu seniors voor nodig zijn. De agent legt de kennis vast en maakt het eerste concept, de expert keurt goed.",
    herken:
      "Herkenbaar: kennis zit in hoofden, seniors vergrijzen, vacatures staan lang open.",
  },
  {
    naam: "Aanvragen, orders en facturen naar ERP",
    tekst:
      "Mail, PDF en portalen automatisch uitgelezen en foutloos in je systeem. Korte time-to-value, direct meetbare tijdwinst.",
    herken:
      "Herkenbaar: medewerkers typen dagelijks gegevens over uit mail en bijlagen.",
  },
  {
    naam: "Klantenservice: ticket, call en mail",
    tekst:
      "Mail- en voice-agents die vragen beantwoorden, tickets routeren en meertalig reageren. De mens blijft in de loop voor uitzonderingen.",
    herken:
      "Herkenbaar: groeiend ticketvolume, meertalige support-vacatures, lange responstijden.",
  },
];

const AGENTS = [
  {
    naam: "Customer Support AI Agent",
    tekst: "Beantwoordt vragen 24/7, routeert wat menselijke aandacht vraagt.",
  },
  {
    naam: "AI Schrijf Agent",
    tekst: "Zet expertkennis om in voorstellen, rapportages en documentatie.",
  },
  {
    naam: "Content AI Agent",
    tekst: "Produceert consistente content in jullie tone of voice.",
  },
];

export default function AiAgents() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-24">
          <div className="reveal-now">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              AI Agents
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Digitale collega&apos;s die <Em>24/7 werken</Em>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Minder handmatige taken en fouten, snellere doorlooptijden. Wij
              bouwen AI-agents die in jullie eigen omgeving draaien, met de
              mens in de loop.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>Plan een kennismaking</MagneticButton>
              <MagneticButton href="#demo" variant="ghost">
                Zie een agent werken
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        title={
          <>
            Drie processen waar AI-agents zich{" "}
            <Em>het snelst terugverdienen</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {USE_CASES.map((u, idx) => (
            <Reveal key={u.naam} delay={idx * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-primary/50">
                <h3 className="font-display text-lg font-bold">{u.naam}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {u.tekst}
                </p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-primary">
                  {u.herken}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="demo"
        kicker="Zie het werken"
        title={
          <>
            Zo verwerkt een agent een aanvraag, <Em>van mail tot systeem</Em>.
          </>
        }
        sub="Gesimuleerd voorbeeld. Bij Van Berkel Professionals verwerkt deze aanpak ruim 100 aanvragen per dag, met 192 uur tijdbesparing per maand."
      >
        <AgentDemo />
      </Section>

      <Section
        variant="alt"
        title={
          <>
            Bewezen agents, aangepast aan <Em>jullie processen</Em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {AGENTS.map((a, idx) => (
            <Reveal key={a.naam} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-base font-bold">{a.naam}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {a.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title={
          <>
            Human in the loop: de agent werkt, <Em>de mens beslist</Em>.
          </>
        }
        sub="Elke agent bouwen we met controlemomenten waar dat hoort. Goedkeuren, bijsturen of overnemen kan altijd. Onze servers staan in Amsterdam: je data blijft in Nederland, volledig GDPR-compliant."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Veilig gehost in Amsterdam
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Eigen infrastructuur, EU-hosting, compatibel met ISO 27001 en
                NEN 7510. Optioneel Azure OpenAI voor extra waarborgen.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Geen lock-in, eigen IP
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                De agents draaien in jullie eigen omgeving en blijven van
                jullie. Na afloop kun je zelfstandig verder.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaSection
        title="Welke collega neem je als eerste aan?"
        sub="Plan een kennismaking en we laten binnen 15 minuten zien welk proces zich bij jullie het snelst terugverdient."
      />
    </>
  );
}
