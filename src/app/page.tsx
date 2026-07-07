import Link from "next/link";
import NeuralField from "@/components/canvas/NeuralField";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Section, { Em } from "@/components/ui/Section";
import FasenLoop from "@/components/sections/FasenLoop";
import SavingsChart from "@/components/sections/SavingsChart";
import {
  IconBuilding,
  IconPresentation,
  IconGlobe,
  IconUsers,
  IconShield,
  IconPattern,
  IconHammer,
  IconMegaphone,
  IconSpark,
  IconFlow,
} from "@/components/ui/icons";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import PlanMode from "@/components/sections/PlanMode";
import Image from "next/image";
import AgentPlayground from "@/components/game/AgentPlayground";
import MottoMarquee from "@/components/sections/MottoMarquee";
import GlowCard from "@/components/ui/GlowCard";
import OlafCard from "@/components/sections/OlafCard";
import CtaSection from "@/components/sections/CtaSection";

const PRODUCTEN = [
  {
    fase: "Fase 1",
    naam: "AI Knowledge",
    resultaat: "Van 'wat is AI' naar 'wat kan ik er morgen mee'.",
    href: "/lezingen-workshops",
    Icon: IconPresentation,
    foto: "/images/foto-lezing.webp",
    fotoAlt: "Olaf Lemmens op het podium tijdens een NinA AI keynote",
  },
  {
    fase: "Fase 2",
    naam: "AI Consult / Design",
    resultaat: "Een geprioriteerd AI-plan, geen theorie-dump.",
    href: "/ai-partnership",
    Icon: IconSpark,
    foto: "/images/foto-workshop.webp",
    fotoAlt: "Hands-on AI workshop met deelnemers achter laptops",
  },
  {
    fase: "Fase 3 en 4",
    naam: "AI Build",
    resultaat: "Werkende workflows in je eigen omgeving.",
    href: "/ai-build",
    Icon: IconFlow,
    foto: "/images/foto-build.webp",
    fotoAlt: "Live demo van een n8n-workflow tijdens een NinA sessie",
  },
];

const USPS = [
  {
    titel: "Geen lock-in, eigen IP",
    tekst:
      "ISO 27001 en NEN 7510 compatibel. Na afloop kun je zelf verder.",
    Icon: IconShield,
    pin: "EU-hosting in Amsterdam",
  },
  {
    titel: "Cross-industry patronen",
    tekst:
      "Dezelfde patronen van hospitality tot transport: sneller en goedkoper live.",
    Icon: IconPattern,
  },
  {
    titel: "We bouwen wat we prediken",
    tekst: "NinA draait intern op dezelfde agents die we voor klanten bouwen.",
    Icon: IconHammer,
  },
  {
    titel: "Bereik en bewijs",
    tekst: "2.9M bereik, 160+ organisaties, 100+ workshops, sinds 2024.",
    Icon: IconMegaphone,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="orb -left-40 top-1/4 h-[28rem] w-[28rem] bg-primary/10"
          />
          <div
            aria-hidden="true"
            className="orb -right-32 bottom-10 h-80 w-80 bg-magenta/10 [animation-delay:-9s]"
          />
          <NeuralField className="absolute inset-0 h-full w-full opacity-80" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
              <div className="reveal-now">
                <p className="mb-6 inline-flex items-center rounded-full border border-border bg-bg-card/70 px-4 py-1.5 text-xs font-medium text-text-muted backdrop-blur">
                  De nummer 1 AI agency van Nederland
                </p>
                <h1 className="font-display max-w-3xl text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="reveal-now inline-block">Van AI-kennis</span>{" "}
                  <span className="reveal-now inline-block [animation-delay:0.12s]">
                    naar een
                  </span>{" "}
                  <span className="reveal-now inline-block [animation-delay:0.24s]">
                    <Em>werkende AI-organisatie</Em>.
                  </span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">
                  NinA helpt B2B organisaties processen te automatiseren met
                  slimme AI-agents en workflows, zonder je hele IT-landschap
                  om te gooien. Jullie vaste AI-partner.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <MagneticButton href="/contact">
                    Plan een kennismaking
                  </MagneticButton>
                  <MagneticButton href="/lezingen-workshops" variant="ghost">
                    Vraag een lezing aan
                  </MagneticButton>
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  Vrijblijvend, 15 minuten, binnen 24 uur reactie.
                </p>
              </div>
              <div className="reveal-now [animation-delay:0.25s]">
                <AgentPlayground />
              </div>
            </div>
          </div>
        </section>

        {/* Motto */}
        <MottoMarquee />

        {/* Logos + stats */}
        <section className="border-b border-border bg-bg-alt py-12">
          <div className="mx-auto max-w-6xl px-5">
            <p className="mb-6 text-center text-sm text-text-muted">
              Onder andere deze organisaties gingen je voor
            </p>
            <LogoMarquee />
            <div className="mt-12 grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                  <IconBuilding className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  #1
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  AI agency van Nederland
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                  <IconPresentation className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={100} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  workshops en sessies
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                  <IconGlobe className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  2.9M
                </p>
                <p className="mt-1 text-sm text-text-muted">LinkedIn-bereik</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                  <IconUsers className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={10} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-text-muted">specialisten</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vier fasen */}
        <Section
          title={
            <>
              De meeste organisaties blijven steken in fase 1. De waarde zit
              in <Em>fase 3 en 4</Em>.
            </>
          }
          sub="Van prompten tot agents, en weer terug. Klik een fase, of kijk hoe het signaal rondgaat."
        >
          <FasenLoop />
        </Section>

        {/* Producten */}
        <Section
          variant="alt"
          title={
            <>
              Drie producten die je organisatie <Em>trede voor trede</Em>{" "}
              omhoog brengen.
            </>
          }
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {PRODUCTEN.map((p, idx) => (
              <Reveal key={p.naam} delay={idx * 0.1}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-primary/60"
                >
                  <span className="relative block h-40 overflow-hidden">
                    <Image
                      src={p.foto}
                      alt={p.fotoAlt}
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#2a2130]/50 to-transparent"
                    />
                    <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-md backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      <p.Icon className="h-5 w-5" />
                    </span>
                  </span>
                  <span className="block flex-1 p-7 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {p.fase}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl font-bold transition-colors group-hover:text-primary">
                    {p.naam}
                  </h3>
                  <p className="mt-4 border-t border-border pt-4 text-sm text-primary">
                    {p.resultaat}
                  </p>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/ai-partnership"
              className="group mt-5 flex flex-col gap-3 rounded-2xl border border-primary/50 bg-bg-muted p-7 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Alles-in-een
                </span>
                <h3 className="font-display mt-2 text-xl font-bold">
                  Het AI Partnership
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                  Alles wat je nodig hebt in een vaste maandelijkse
                  samenwerking: Kickoff, Bouw, Schaal en Verankeren. Stap in
                  bij fase 1, 2 of 3; het partnership brengt het samen en
                  houdt het draaiend.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                Vanaf EUR 2.500 per maand
              </span>
            </Link>
          </Reveal>
        </Section>

        {/* Workflow showcase */}
        <Section
          variant="alt"
          kicker="Zie het werken"
          title={
            <>
              Wij leveren werkende workflows,{" "}
              <Em>geen rapporten in een la</Em>.
            </>
          }
          sub="Van binnenkomende mail tot gelabelde data in jouw tools. Gesimuleerd, maar zo draait het bij klanten: bij Van Berkel Professionals ruim 100 aanvragen per dag."
        >
          <WorkflowShowcase />
        </Section>

        {/* Mens + AI: Plan Mode */}
        <Section
          title={
            <>
              Mens en AI, allebei <Em>in hun kracht</Em>.
            </>
          }
          sub="Elke agent die wij bouwen werkt zo. Jij bent zo meteen de mens in de loop: keur het plan goed, of grijp in."
        >
          <PlanMode />
        </Section>

        {/* Resultaten */}
        <Section
          title={
            <>
              Een AI-partner kost minder dan 1 FTE en levert{" "}
              <Em>meer dan 13x rendement</Em>.
            </>
          }
        >
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="h-full">
              <SavingsChart />
            </Reveal>
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  cijfer: <CountUp to={192} suffix=" uur" />,
                  label: "per maand bespaard bij Van Berkel",
                },
                {
                  cijfer: <>± 4,5 mnd</>,
                  label: "terugverdientijd, EUR 77k vs EUR 28k",
                },
                {
                  cijfer: <>13x</>,
                  label: "rendement op waardecreatie",
                },
                {
                  cijfer: <>7 → 9</>,
                  label: "werknemersgeluk bij Wens Chalets",
                },
              ].map((c, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                  <GlowCard className="flex h-full flex-col justify-center rounded-2xl border border-border bg-bg-card p-5 sm:p-6">
                    <p className="font-display text-2xl font-bold text-gold sm:text-3xl">
                      {c.cijfer}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                      {c.label}
                    </p>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* Waarom NinA */}
        <Section
          variant="alt"
          title={
            <>
              Geen lock-in, eigen IP, en een team dat{" "}
              <Em>bouwt wat het predikt</Em>.
            </>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {USPS.map((u, idx) => (
              <Reveal key={u.titel} delay={idx * 0.08} className="h-full">
                <GlowCard className="h-full rounded-2xl border border-border bg-bg-card p-7 hover:border-primary/40">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <u.Icon className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">
                        {u.titel}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {u.tekst}
                      </p>
                      {"pin" in u && (
                        <span className="mt-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                          {u.pin}
                        </span>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Review */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <figure className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_20px_60px_rgba(42,33,48,0.12)]">
                <Image
                  src="/images/foto-da-drogist.webp"
                  alt="Het team van DA Drogist na de AI-workshop van NinA"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur">
                  Workshop bij DA Drogist
                </span>
              </div>
              <div>
                <blockquote className="font-display text-2xl font-medium leading-snug sm:text-3xl">
                  &ldquo;De energie was voelbaar. Ons hele team liep naar
                  buiten met concrete ideeën die we dezelfde week nog zijn
                  gaan gebruiken.&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-text-muted">
                  <span className="font-semibold text-text">
                    Judi van den Berg
                  </span>{" "}
                  · Category Manager, DA Drogist
                </figcaption>
                <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold">
                  Sessies beoordeeld met een 9,3
                </p>
              </div>
            </figure>
          </Reveal>
        </section>

        {/* Olaf, personal brand */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
          <OlafCard />
        </section>

      <CtaSection />
    </>
  );
}
