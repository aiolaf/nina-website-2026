import Link from "next/link";
import NeuralField from "@/components/canvas/NeuralField";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Section, { Em } from "@/components/ui/Section";
import FasenLoop from "@/components/sections/FasenLoop";
import FasenProducten from "@/components/sections/FasenProducten";
import TeamRij from "@/components/sections/TeamRij";
import ApoTeaser from "@/components/sections/ApoTeaser";
import SavingsChart from "@/components/sections/SavingsChart";
import MaturityQuickScan from "@/components/sections/MaturityQuickScan";
import {
  IconBuilding,
  IconPresentation,
  IconUsers,
  IconShield,
  IconPattern,
  IconHammer,
  IconMegaphone,
  IconSpark,
} from "@/components/ui/icons";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import PlanMode from "@/components/sections/PlanMode";
import Image from "next/image";
import AgentPlayground from "@/components/game/AgentPlayground";
import MottoMarquee from "@/components/sections/MottoMarquee";
import GlowCard from "@/components/ui/GlowCard";
import OlafCard from "@/components/sections/OlafCard";
import CtaSection from "@/components/sections/CtaSection";
import { getAllPosts } from "@/lib/blog";
import { alternatesVoor, site } from "@/lib/site";
import { homepageSchema, jsonLd } from "@/lib/schema";
import type { Metadata } from "next";

/**
 * Titel en beschrijving komen uit de root-layout; deze pagina voegt alleen
 * de canonical en de hreflang toe. Die stonden er niet, waardoor juist de
 * belangrijkste pagina van de site geen canonieke URL opgaf.
 */
export const metadata: Metadata = {
  alternates: alternatesVoor("/"),
};

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
    // Zonder het bereikcijfer: dat kwam van LinkedIn-impressies en zegt niets
    // over resultaat bij een opdrachtgever.
    titel: "Bewijs uit de praktijk",
    tekst: "160+ organisaties, 100+ workshops, sinds 2024.",
    Icon: IconMegaphone,
  },
];

export default function Home() {
  return (
    <>
      {/* Organization en WebSite: wie NinA is, waar het bedrijf zit
          en welke diensten er zijn. Zonder dit blok staat dat nergens
          machineleesbaar op de site. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homepageSchema("nl")) }}
      />
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
                {/* Ambitie, niet een claim. "De nummer 1" konden we niet
                    onderbouwen, en een niet-onderbouwde superioriteitsclaim
                    is onder de Nederlandse Reclame Code aanvechtbaar. Zo
                    blijft de lat staan zonder dat er iets te weerleggen is. */}
                <p className="mb-6 inline-flex items-center rounded-full border border-border bg-bg-card/70 px-4 py-1.5 text-xs font-medium text-text-muted backdrop-blur">
                  Op weg naar de nummer 1 AI agency van Nederland
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
                  <MagneticButton
                    href={site.booking}
                    data-cta="home_hero_kennismaking"
                    data-cta-soort="hero"
                  >
                    Plan een kennismaking
                  </MagneticButton>
                  {/* Het partnership is het hoofdproduct, dus dat is de tweede
                      knop. De lezing blijft bereikbaar als tekstlink. */}
                  <MagneticButton
                    href="/ai-partnership"
                    variant="ghost"
                    data-cta="home_hero_partnership"
                    data-cta-soort="hero"
                  >
                    Bekijk het AI Partnership
                  </MagneticButton>
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  Vrijblijvend, 15 minuten, binnen 24 uur reactie. Of{" "}
                  <Link
                    href="/lezingen-workshops"
                    className="font-semibold text-primary hover:underline"
                  >
                    vraag een lezing aan
                  </Link>
                  .
                </p>
              </div>
              <div className="reveal-now [animation-delay:0.25s]">
                <AgentPlayground />
              </div>
            </div>

            {/* Klantlogo's in de hero: dit is de sterkste social proof, dus
                zichtbaar zonder te scrollen in plaats van in een sectie
                verderop. */}
            <div className="reveal-now mt-14 [animation-delay:0.35s]">
              <p className="mb-5 text-center text-sm text-text-muted">
                Onder andere deze organisaties gingen je voor
              </p>
              <LogoMarquee />
            </div>
          </div>
        </section>

        {/* AI Maturity Quick Scan: het startpunt van het partnership, hier
            interactief zodat een bezoeker zijn eigen profiel ziet en van
            daaruit doorklikt. */}
        <Section
          id="quick-scan"
          variant="alt"
          kicker="Gratis, in twee minuten"
          title={
            <>
              Waar staat jouw organisatie <Em>nu</Em>?
            </>
          }
          sub="Zeven vragen, één per dimensie van AI-volwassenheid. Geef een score van 1 tot 5 en het web beweegt mee. De gestreepte lijn is waar we in een AI Partnership binnen twaalf maanden naartoe werken."
        >
          <MaturityQuickScan />
        </Section>

        {/* APO methode: teaser. De quick scan hierboven is stap 1 van deze
            methode; de verdieping staat op de partnershippagina. */}
        <Section
          kicker="Onze methode"
          title={
            <>
              De scan hierboven is stap 1 van de <Em>APO methode</Em>.
            </>
          }
          sub="AI Process Optimisation: in één sessie in kaart welke processen AI kan overnemen, wat dat per jaar oplevert in uren en euro's, en wat het kost om het te bouwen."
        >
          <ApoTeaser />
        </Section>

        {/* Motto */}
        <MottoMarquee />

        {/* Cijfers */}
        <section className="border-b border-border bg-bg-alt py-12">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                  <IconBuilding className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={160} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  organisaties geholpen
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
                  <IconSpark className="h-5.5 w-5.5" />
                </span>
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  9,3
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  gemiddelde beoordeling
                </p>
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

            {/* Het team direct onder de cijfers: die 10+ specialisten krijgen
                hier een gezicht. Klein en zonder namen, want de uitgebreide
                versie staat op Over NinA AI. */}
            <div className="mt-12 border-t border-border pt-10">
              <p className="mb-6 text-center text-sm text-text-muted">
                Dit is ons team
              </p>
              <TeamRij variant="compact" />
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

        {/* Producten per fase */}
        <Section
          variant="alt"
          title={
            <>
              Welk product je nodig hebt, hangt af van{" "}
              <Em>waar je nu staat</Em>.
            </>
          }
          sub="Vier fasen, en per fase de producten die daarbij horen. Het partnership loopt door alle vier."
        >
          <FasenProducten />
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
                {/* Vanuit het bewijsblok door naar de rest van het bewijs.
                    Naar /cases liep tot nu toe geen enkele interne link. */}
                <p className="mt-6">
                  <Link
                    href="/cases"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    data-cta="review_naar_cases"
                  >
                    Bekijk alle klantcases
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </p>
              </div>
            </figure>
          </Reveal>
        </section>

        {/* Olaf, personal brand */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
          <OlafCard />
        </section>

        {/* Laatste blogposts, interne linking naar de kennislaag */}
        <Section
          variant="alt"
          kicker="Blog"
          title={
            <>
              Elke week een <Em>eerlijk verhaal</Em> uit de AI-praktijk.
            </>
          }
          sub="Geen hype, wel wat werkt. Lees mee met de nieuwste inzichten."
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {getAllPosts()
              .slice(0, 3)
              .map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card shadow-sm transition-shadow hover:shadow-md"
                  >
                    {post.image && (
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {post.category && (
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                          {post.category}
                        </p>
                      )}
                      <h3 className="font-display mt-2 text-lg font-bold leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-auto pt-5 text-xs text-text-muted">
                        {post.date}
                        {post.readTime ? ` · ${post.readTime}` : ""}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="/blog" variant="ghost">
                Alle artikelen
              </MagneticButton>
              <MagneticButton href="/freebies" variant="ghost">
                Gratis frameworks & tools
              </MagneticButton>
            </div>
          </Reveal>
        </Section>

      <CtaSection />
    </>
  );
}
