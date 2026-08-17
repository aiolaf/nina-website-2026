import Link from "next/link";
import NeuralField from "@/components/canvas/NeuralField";
import PijlKnop from "@/components/ui/PijlKnop";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import LogoMarquee from "@/components/ui/LogoMarquee";
import SectieLicht, { StatSerif } from "@/components/ui/SectieLicht";
import FasenLoop from "@/components/sections/FasenLoop";
import FasenProducten from "@/components/sections/FasenProducten";
import TeamRij from "@/components/sections/TeamRij";
import ApoTeaser from "@/components/sections/ApoTeaser";
import SavingsChart from "@/components/sections/SavingsChart";
import MaturityQuickScan from "@/components/sections/MaturityQuickScan";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import PlanMode from "@/components/sections/PlanMode";
import Image from "next/image";
import AgentPlayground from "@/components/game/AgentPlayground";
import MottoMarquee from "@/components/sections/MottoMarquee";
import OlafCard from "@/components/sections/OlafCard";
import CtaDonker from "@/components/sections/CtaDonker";
import { getAllPosts } from "@/lib/blog";
import { alternatesVoor, site } from "@/lib/site";
import { homepageSchema, jsonLd } from "@/lib/schema";
import type { Metadata } from "next";

/**
 * Homepage in de huisstijl "Licht": Legora-esthetiek als basis (dunne serif
 * display-koppen met een cursief accent, mono-labels boven elke sectie,
 * pijl-CTA's, grote serif-statistieken, veel wit) met NinA in schaarse
 * momenten: de inkt als tekstkleur, goud eenmalig als marker op het motto
 * en violet uitsluitend in de afsluitende donkere sectie.
 *
 * Titel en beschrijving komen uit de root-layout; deze pagina voegt alleen
 * de canonical en de hreflang toe.
 */
export const metadata: Metadata = {
  alternates: alternatesVoor("/"),
};

/** Mono-bewijsregel in de hero, met amber punt ervoor. */
const BEWIJS = [
  "160+ organisaties",
  "100+ workshops",
  "9,3 gemiddeld",
  "sinds 2024",
];

const CIJFERS = [
  { cijfer: <CountUp to={160} suffix="+" />, label: "organisaties geholpen" },
  { cijfer: <CountUp to={100} suffix="+" />, label: "workshops en sessies" },
  { cijfer: "9,3", label: "gemiddelde beoordeling" },
  { cijfer: <CountUp to={10} suffix="+" />, label: "specialisten in het team" },
];

const RENDEMENT = [
  {
    cijfer: <CountUp to={192} />,
    eenheid: "uur p/m",
    label: "bespaard bij Van Berkel",
  },
  {
    cijfer: "4,5",
    eenheid: "maanden",
    label: "terugverdientijd, EUR 77k vs EUR 28k",
  },
  { cijfer: "13x", label: "rendement op waardecreatie" },
  { cijfer: "7 → 9", label: "werknemersgeluk bij Wens Chalets" },
];

const USPS = [
  {
    titel: "Geen lock-in, eigen IP",
    tekst: "ISO 27001 en NEN 7510 compatibel. Na afloop kun je zelf verder.",
    pin: "EU-hosting in Amsterdam",
  },
  {
    titel: "Cross-industry patronen",
    tekst:
      "Dezelfde patronen van hospitality tot transport: sneller en goedkoper live.",
  },
  {
    titel: "We bouwen wat we prediken",
    tekst: "NinA draait intern op dezelfde agents die we voor klanten bouwen.",
  },
  {
    // Zonder het bereikcijfer: dat kwam van LinkedIn-impressies en zegt niets
    // over resultaat bij een opdrachtgever.
    titel: "Bewijs uit de praktijk",
    tekst: "160+ organisaties, 100+ workshops, sinds 2024.",
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

      {/* ------------------------------------------------------------- Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Zand-blob in plaats van de plum-orbs: warm, traag driftend. Eén
            langzaam element per pagina, zoals de stijl voorschrijft. */}
        <div
          aria-hidden="true"
          className="orb -right-32 -top-24 h-[34rem] w-[34rem] bg-sand/60"
        />
        <div
          aria-hidden="true"
          className="orb -left-40 bottom-0 h-80 w-80 bg-cognac/10 [animation-delay:-11s]"
        />
        <NeuralField className="absolute inset-0 h-full w-full opacity-50" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal-now">
              {/* Ambitie, niet een claim. "De nummer 1" konden we niet
                  onderbouwen, en een niet-onderbouwde superioriteitsclaim
                  is onder de Nederlandse Reclame Code aanvechtbaar. Zo
                  blijft de lat staan zonder dat er iets te weerleggen is. */}
              <p className="label-mono text-[11px] text-text-muted sm:text-[11.5px]">
                Op weg naar de nummer 1 AI agency van Nederland
              </p>
              <h1 className="display-serif mt-7 max-w-[38rem] text-[2.9rem] sm:text-[4.2rem] lg:text-[4.8rem]">
                <span className="reveal-now inline-block">Van AI-kennis</span>{" "}
                <span className="reveal-now inline-block [animation-delay:0.12s]">
                  naar een
                </span>{" "}
                <span className="reveal-now inline-block [animation-delay:0.24s]">
                  <em className="italic">werkende AI-organisatie</em>.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-text-muted">
                NinA helpt B2B organisaties processen te automatiseren met
                slimme AI-agents en workflows, zonder je hele IT-landschap om
                te gooien. Jullie vaste AI-partner.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PijlKnop
                  href={site.booking}
                  data-cta="home_hero_kennismaking"
                  data-cta-soort="hero"
                >
                  Plan een kennismaking
                </PijlKnop>
                {/* Het partnership is het hoofdproduct, dus dat is de tweede
                    knop. De lezing blijft bereikbaar als tekstlink. */}
                <PijlKnop
                  href="/ai-partnership"
                  variant="ghost"
                  zonderPijl
                  data-cta="home_hero_partnership"
                  data-cta-soort="hero"
                >
                  Bekijk het AI Partnership
                </PijlKnop>
              </div>
              <p className="mt-5 text-[13px] text-text-muted">
                Vrijblijvend, 15 minuten, binnen 24 uur reactie. Of{" "}
                <Link
                  href="/lezingen-workshops"
                  className="text-text underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-violet hover:decoration-violet"
                >
                  vraag een lezing aan
                </Link>
                .
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-[12px] text-text-muted">
                {BEWIJS.map((b) => (
                  <li key={b} className="inline-flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-[5px] w-[5px] rounded-full bg-amber"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-now [animation-delay:0.25s]">
              <AgentPlayground />
            </div>
          </div>

          {/* Klantlogo's in de hero: dit is de sterkste social proof, dus
              zichtbaar zonder te scrollen in plaats van in een sectie
              verderop. */}
          <div className="reveal-now mt-16 [animation-delay:0.35s]">
            <p className="label-mono mb-6 text-center text-[11px] text-text-muted">
              Vertrouwd door
            </p>
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* AI Maturity Quick Scan: het startpunt van het partnership, hier
          interactief zodat een bezoeker zijn eigen profiel ziet en van
          daaruit doorklikt. */}
      <SectieLicht
        id="quick-scan"
        variant="alt"
        label="Quick scan · gratis, twee minuten"
        title={
          <>
            Waar staat jouw organisatie <em className="italic">nu</em>?
          </>
        }
        sub="Zeven vragen, één per dimensie van AI-volwassenheid. Geef een score van 1 tot 5 en het web beweegt mee. De gestreepte lijn is waar we in een AI Partnership binnen twaalf maanden naartoe werken."
      >
        <MaturityQuickScan />
      </SectieLicht>

      {/* APO methode: teaser. De quick scan hierboven is stap 1 van deze
          methode; de verdieping staat op de partnershippagina. */}
      <SectieLicht
        label="APO methode · onze werkwijze"
        title={
          <>
            De scan hierboven is stap 1 van de{" "}
            <em className="italic">APO methode</em>.
          </>
        }
        sub="AI Process Optimisation: in één sessie in kaart welke processen AI kan overnemen, wat dat per jaar oplevert in uren en euro's, en wat het kost om het te bouwen."
      >
        <ApoTeaser />
      </SectieLicht>

      {/* Motto */}
      <MottoMarquee />

      {/* Cijfers plus het team: het bewijsblok */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <p className="label-mono mb-10 border-b border-border pb-3 text-[11.5px] text-text-muted">
              Bewijs
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
              {CIJFERS.map((c) => (
                <StatSerif key={c.label} cijfer={c.cijfer} label={c.label} />
              ))}
            </div>
          </Reveal>

          {/* Het team direct onder de cijfers: die 10+ specialisten krijgen
              hier een gezicht. Klein en zonder namen, want de uitgebreide
              versie staat op Over NinA AI. */}
          <div className="mt-14 border-t border-border pt-12">
            <p className="label-mono mb-8 text-center text-[11px] text-text-muted">
              Dit is ons team
            </p>
            <TeamRij variant="compact" />
          </div>
        </div>
      </section>

      {/* Vier fasen */}
      <SectieLicht
        label="Vier fasen"
        title={
          <>
            De meeste organisaties blijven steken in fase 1. De waarde zit in{" "}
            <em className="italic">fase 3 en 4</em>.
          </>
        }
        sub="Van prompten tot agents, en weer terug. Klik een fase, of kijk hoe het signaal rondgaat."
      >
        <FasenLoop />
      </SectieLicht>

      {/* Producten per fase */}
      <SectieLicht
        variant="alt"
        label="Producten per fase"
        title={
          <>
            Welk product je nodig hebt, hangt af van{" "}
            <em className="italic">waar je nu staat</em>.
          </>
        }
        sub="Vier fasen, en per fase de producten die daarbij horen. Het partnership loopt door alle vier."
      >
        <FasenProducten />
      </SectieLicht>

      {/* Workflow showcase */}
      <SectieLicht
        label="Zie het werken"
        title={
          <>
            Wij leveren werkende workflows,{" "}
            <em className="italic">geen rapporten in een la</em>.
          </>
        }
        sub="Van binnenkomende mail tot gelabelde data in jouw tools. Gesimuleerd, maar zo draait het bij klanten: bij Van Berkel Professionals ruim 100 aanvragen per dag."
      >
        <WorkflowShowcase />
      </SectieLicht>

      {/* Mens plus AI: Plan Mode */}
      <SectieLicht
        variant="alt"
        label="Mens in de loop"
        title={
          <>
            Mens en AI, allebei <em className="italic">in hun kracht</em>.
          </>
        }
        sub="Elke agent die wij bouwen werkt zo. Jij bent zo meteen de mens in de loop: keur het plan goed, of grijp in."
      >
        <PlanMode />
      </SectieLicht>

      {/* Resultaten */}
      <SectieLicht
        label="Rendement"
        title={
          <>
            Een AI-partner kost minder dan 1 FTE en levert{" "}
            <em className="italic">meer dan 13x rendement</em>.
          </>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="h-full">
            <SavingsChart />
          </Reveal>
          <div className="grid grid-cols-2 gap-x-8 gap-y-9 self-center sm:gap-x-10">
            {RENDEMENT.map((c, idx) => (
              <Reveal key={c.label} delay={idx * 0.08}>
                <StatSerif
                  cijfer={c.cijfer}
                  eenheid={c.eenheid}
                  label={c.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </SectieLicht>

      {/* Waarom NinA */}
      <SectieLicht
        variant="alt"
        label="Waarom NinA"
        title={
          <>
            Geen lock-in, eigen IP, en een team dat{" "}
            <em className="italic">bouwt wat het predikt</em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {USPS.map((u, idx) => (
            <Reveal key={u.titel} delay={idx * 0.08} className="h-full">
              <div className="glas h-full rounded-3xl p-7 sm:p-8">
                <p className="label-mono text-[11px] text-text-muted">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-[19px] font-semibold tracking-[-0.02em]">
                  {u.titel}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                  {u.tekst}
                </p>
                {"pin" in u && (
                  <span className="mt-5 inline-flex items-center rounded-[10px] bg-chip px-3 py-1.5 font-mono text-[12px] text-text">
                    {u.pin}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </SectieLicht>

      {/* Klantverhaal */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <p className="label-mono mb-10 border-b border-border pb-3 text-[11.5px] text-text-muted">
              Klantverhaal
            </p>
            <figure className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
              <div className="relative">
                <div className="relative overflow-hidden rounded-[24px] border border-border">
                  <Image
                    src="/images/foto-da-drogist.webp"
                    alt="Het team van DA Drogist na de AI-workshop van NinA"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                  <span className="label-mono absolute bottom-3 left-3 rounded-[10px] bg-white/85 px-3 py-1.5 text-[10.5px] text-text backdrop-blur">
                    Workshop bij DA Drogist
                  </span>
                </div>
                {/* Het handgeschreven NinA-moment: één per sectie. */}
                <span className="annotatie absolute -bottom-9 right-1 text-[19px]">
                  sessies gemiddeld een 9,3
                </span>
              </div>
              <div>
                <blockquote className="display-serif text-[1.9rem] sm:text-[2.4rem]">
                  <em className="italic">
                    &ldquo;De energie was voelbaar. Ons hele team liep naar
                    buiten met concrete ideeën die we dezelfde week nog zijn
                    gaan gebruiken.&rdquo;
                  </em>
                </blockquote>
                <figcaption className="label-mono mt-8 text-[11px] text-text-muted">
                  Judi van den Berg · Category Manager, DA Drogist
                </figcaption>
                {/* Vanuit het bewijsblok door naar de rest van het bewijs. */}
                <p className="mt-8">
                  <Link
                    href="/cases"
                    className="group inline-flex items-center gap-2 font-mono text-[13px] text-text"
                    data-cta="review_naar_cases"
                  >
                    <span aria-hidden="true">↳</span>
                    <span className="underline decoration-border decoration-1 underline-offset-4 transition-colors group-hover:decoration-text">
                      Bekijk alle klantcases
                    </span>
                  </Link>
                </p>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Olaf, personal brand */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
        <OlafCard />
      </section>

      {/* Laatste blogposts, interne linking naar de kennislaag */}
      <SectieLicht
        variant="alt"
        label="Blog"
        title={
          <>
            Elke week een <em className="italic">eerlijk verhaal</em> uit de
            AI-praktijk.
          </>
        }
        sub="Geen hype, wel wat werkt. Lees mee met de nieuwste inzichten."
      >
        <div className="grid gap-8 sm:grid-cols-3">
          {getAllPosts()
            .slice(0, 3)
            .map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col"
                >
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-border">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col pt-5">
                    {post.category && (
                      <p className="label-mono text-[10.5px] text-text-muted">
                        {post.category}
                      </p>
                    )}
                    <h3 className="font-display mt-2.5 text-[17px] font-semibold leading-snug tracking-[-0.02em]">
                      {post.title}
                    </h3>
                    <p className="label-mono mt-auto pt-5 text-[10.5px] text-text-muted">
                      {post.date}
                      {post.readTime ? ` · ${post.readTime}` : ""}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-[13px]">
            <Link href="/blog" className="group inline-flex items-center gap-2">
              <span aria-hidden="true">↳</span>
              <span className="underline decoration-border decoration-1 underline-offset-4 transition-colors group-hover:decoration-text">
                Alle artikelen
              </span>
            </Link>
            <Link
              href="/freebies"
              className="group inline-flex items-center gap-2"
            >
              <span aria-hidden="true">↳</span>
              <span className="underline decoration-border decoration-1 underline-offset-4 transition-colors group-hover:decoration-text">
                Gratis frameworks en tools
              </span>
            </Link>
          </div>
        </Reveal>
      </SectieLicht>

      <CtaDonker />
    </>
  );
}
