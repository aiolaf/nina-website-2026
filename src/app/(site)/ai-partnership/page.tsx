import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import PartnershipTiers from "@/components/sections/PartnershipTiers";
import CtaSection from "@/components/sections/CtaSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Partnership",
  description:
    "Alles wat je nodig hebt in een vaste maandelijkse samenwerking: Kickoff, Bouw, Schaal en Verankeren. Vanaf EUR 2.500 per maand.",
};

const TREDEN = [
  {
    stap: "01",
    naam: "Kickoff",
    tekst:
      "De eerste, intensieve maand. On-site scan, workshop voor het kernteam, n8n-omgeving en een roadmap met geprioriteerde business cases.",
  },
  {
    stap: "02",
    naam: "Bouw",
    tekst:
      "Elke maand vaste capaciteit om workflows en agents te bouwen die direct waarde leveren in jullie processen.",
  },
  {
    stap: "03",
    naam: "Schaal",
    tekst:
      "Wat werkt breiden we uit naar meer teams en processen. Kwartaalreviews houden de richting scherp.",
  },
  {
    stap: "04",
    naam: "Verankeren",
    tekst:
      "Train-de-trainer, AI-ambassadeurs en borging in de organisatie. Het doel: een organisatie die het zelf kan.",
  },
];

const KICKOFF_STANDAARD = [
  "AI Readiness Scan: 1 volle dag on-site procesanalyse",
  "AI Workshop voor het kernteam (dagdeel)",
  "n8n automatiseringsomgeving: setup en configuratie",
  "Rapportage met roadmap en geprioriteerde business cases",
  "AI-volwassenheidsmeting: nulmeting over strategie, visie en data",
];

const KICKOFF_LIGHT = [
  "AI Workshop voor het kernteam (dagdeel), met de AI Readiness als eindproduct",
  "n8n automatiseringsomgeving: setup en configuratie",
  "Rapportage met roadmap en geprioriteerde business cases",
];

export default function AiPartnership() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal-now">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Het AI Partnership
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Een vaste AI partner die je bijstaat in{" "}
              <Em>alle fasen van AI Adoptie</Em>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Achterblijvers lopen niet vast op kennis, maar op integratie en
              adoptie: na de workshop zakt de energie weg, na de eerste build
              bouwt niemand door. Het AI Partnership dicht dat gat met vaste
              capaciteit per maand die kennis, bouw en begeleiding
              samenbrengt en draaiend houdt.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>
                Plan een kennismaking
              </MagneticButton>
              <MagneticButton href="#pakketten" variant="ghost">
                Bekijk de pakketten
              </MagneticButton>
            </div>
          </div>
          <div className="reveal-now hidden [animation-delay:0.2s] lg:block">
            <Image
              src="/images/foto-workshop.webp"
              alt="Kickoff-workshop met het kernteam van een klant"
              width={900}
              height={682}
              className="rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(42,33,48,0.12)]"
            />
          </div>
          </div>
        </div>
      </section>

      {/* Treden */}
      <Section
        variant="alt"
        title={
          <>
            Kickoff, bouwen, opschalen en <Em>verankeren</Em>.
          </>
        }
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREDEN.map((t, idx) => (
            <li key={t.naam} className="h-full">
              <Reveal
                delay={idx * 0.1}
                className="relative h-full rounded-2xl border border-border bg-bg-card p-6 pt-8 transition-colors hover:border-primary/50"
              >
                <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/50 bg-bg px-3 py-1 text-sm font-bold text-primary">
                  {t.stap}
                </span>
                <h3 className="font-display text-lg font-bold">{t.naam}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                  {t.tekst}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Pakketten */}
      <Section
        id="pakketten"
        kicker="Instapopties"
        title={
          <>
            Kies het partnership dat <Em>bij je organisatie past</Em>.
          </>
        }
        sub="Elk partnership start met een verplichte, eenmalige Kickoff Fase. Minimale looptijd 6 maanden, daarna maandelijks opzegbaar. Alle bedragen exclusief BTW, als vanaf-ankers."
      >
        <PartnershipTiers />
      </Section>

      {/* Kickoff fase */}
      <Section
        variant="alt"
        title={
          <>
            Elk partnership start met een <Em>Kickoff Fase</Em>.
          </>
        }
        sub="De Kickoff is de eerste, intensieve maand; daarna start het maandelijkse partnership. Doel: van nulmeting naar 4 van 5 volwassenheid binnen 12 maanden."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold">
                  Kickoff Fase
                </h3>
                <p className="font-display text-2xl font-bold text-gold">
                  EUR 7.500
                </p>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                Doorlooptijd 3 weken · verplicht bij Standaard en Enterprise
              </p>
              <ul className="mt-6 space-y-2.5">
                {KICKOFF_STANDAARD.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold">
                  Kickoff Fase Light
                </h3>
                <p className="font-display text-2xl font-bold">EUR 3.750</p>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                Doorlooptijd 2 weken · verplicht bij AI Partner Light
              </p>
              <ul className="mt-6 space-y-2.5">
                {KICKOFF_LIGHT.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm text-text-muted">
                De AI Readiness rolt uit de workshop zelf, geen aparte
                scan-dagen nodig.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Vergelijking */}
      <Section
        title={
          <>
            Los afnemen of partnership: het partnership is{" "}
            <Em>voordeliger en doorlopend</Em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Alles los afnemen
              </p>
              <p className="font-display mt-3 text-3xl font-bold">
                EUR 35.000 tot 40.000
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Workshop, AI Design, consult-uren en een losse build. Steeds
                opnieuw opstarten, zonder doorlopende begeleiding.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-muted p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI Partnership, 6 maanden
              </p>
              <p className="font-display mt-3 text-3xl font-bold text-gold">
                ± EUR 30.000
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Kickoff plus 6 maanden AI Partner Standaard. Doorlopend
                kennis, consult en bouwen in een, met kwartaalreviews en
                eigen IP.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-text-muted">
            Meetbaar groeidoel: de AI-volwassenheid van je organisatie van
            een nulmeting rond 2,7 naar 4,0 of hoger binnen 12 maanden,
            gemeten over strategie, visie en data.
          </p>
        </Reveal>
      </Section>

      <CtaSection
        title="Klaar om AI-partner te worden?"
        sub="Plan een vrijblijvend kennismakingsgesprek. We laten zien wat een partnership voor jullie processen betekent."
      />
    </>
  );
}
