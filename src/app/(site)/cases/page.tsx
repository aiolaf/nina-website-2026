import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Bewezen AI-resultaten van MKB tot mid-market: concrete AI-oplossingen die direct impact maken op efficiëntie, kosten en kwaliteit.",
  alternates: { canonical: "/cases" },
};

type Case = {
  tag: string;
  company: string;
  industry: string;
  uitdaging: string;
  oplossing: string;
  resultaten: string[];
};

const cases: Case[] = [
  {
    tag: "AI Build",
    company: "Wens Chalets",
    industry: "Hospitality",
    uitdaging:
      "Veel handmatige administratie, repetitieve communicatie met gasten, versnipperde systemen voor boekingen en rapportages.",
    oplossing:
      "AI-workflows voor administratie, automatische rapportages en slimme gastcommunicatie via gekoppelde systemen.",
    resultaten: [
      "40+ uur per maand bespaard op administratie",
      "60% snellere responstijd naar gasten",
      "Beter inzicht in data en trends",
    ],
  },
  {
    tag: "AI Agents",
    company: "MKB Consultancy",
    industry: "Professional Services",
    uitdaging:
      "Kenniswerkers besteedden te veel tijd aan repetitieve rapportages en handmatige data-invoer in meerdere systemen.",
    oplossing:
      "Custom AI-agent voor documentverwerking, rapportage-automatisering en data-extractie uit verschillende bronnen.",
    resultaten: [
      "55% tijdbesparing op rapportages",
      "90% minder fouten in data-invoer",
      "Meer focus op strategisch werk",
    ],
  },
  {
    tag: "AI Agents + N8N",
    company: "E-commerce Retailer",
    industry: "Retail",
    uitdaging:
      "Hoge volumes klantvragen, lange responstijden, beperkte service uren, inconsistente antwoorden van team.",
    oplossing:
      "AI service agent gekoppeld aan CRM en kennisbank via N8N voor geautomatiseerde, intelligente klantenservice.",
    resultaten: [
      "24/7 support beschikbaar",
      "70% snellere responstijd",
      "45% minder support tickets",
      "Hogere klanttevredenheid",
    ],
  },
  {
    tag: "AI Build + N8N",
    company: "Marketing Agency",
    industry: "Marketing",
    uitdaging:
      "Veel repetitief copywriting werk, tijdrovende content planning, handmatige rapportages voor klanten.",
    oplossing:
      "AI content assistant, geautomatiseerde planning workflows en smart reporting dashboard via N8N koppelingen.",
    resultaten: [
      "50% snellere content productie",
      "30 uur per maand bespaard op rapportages",
      "Hogere content kwaliteit",
    ],
  },
  {
    tag: "AI Agents",
    company: "HR Consultancy",
    industry: "HR",
    uitdaging:
      "Veel tijd besteed aan screening van CV's, plannen van interviews, en opstellen van kandidaat-rapportages.",
    oplossing:
      "AI screening agent voor CV analyse, automatische interview planning en gegenereerde kandidaat samenvattingen.",
    resultaten: [
      "65% sneller screening proces",
      "Betere kandidaat matching",
      "Meer tijd voor persoonlijk contact",
    ],
  },
  {
    tag: "AI Build",
    company: "Financieel Adviesbureau",
    industry: "Financial Services",
    uitdaging:
      "Complexe regelgeving, veel documentverwerking, tijdrovende compliance checks en rapportage eisen.",
    oplossing:
      "AI document processing, geautomatiseerde compliance checking en regelgevings-rapportage systemen.",
    resultaten: [
      "40% snellere documentverwerking",
      "95% compliance nauwkeurigheid",
      "Drastisch minder handmatig werk",
    ],
  },
];

export default function CasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Cases
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Bewezen <Em>AI-resultaten</Em>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Van MKB tot mid-market: concrete AI-oplossingen die direct impact
              maken op efficiëntie, kosten en kwaliteit.
            </p>
          </div>
        </div>
      </section>

      {/* Cases-grid */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.company} delay={Math.min(i % 2, 1) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                    {c.tag}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-bold leading-snug">
                    {c.company}
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">{c.industry}</p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Uitdaging
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {c.uitdaging}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Oplossing
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {c.oplossing}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                      Resultaat
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {c.resultaten.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Klaar voor <Em>vergelijkbare resultaten</Em>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Elk AI-project begint met een goed gesprek over jouw uitdagingen
              en ambities.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={site.booking}>
                Plan een kennismaking
              </MagneticButton>
              <MagneticButton href="/ai-partnership" variant="ghost">
                Bekijk het AI Partnership
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
