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
 * pijl-CTA's, grote serif-statistieken, veel wit) met NinA in de inkt en het
 * violet: de marker onder het motto, de handgeschreven annotaties (hoogstens
 * één per sectie) en de gloed in de afsluitende donkere sectie.
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

      {/* ------------------------------------------------------------- Hero
          De banner is een echte foto uit een eigen sessie, behandeld met het
          beeldrecept (.foto) en een donkere scrim vanuit onder en links
          (.foto-met-tekst) zodat de witte tekst overal leest. */}
      <section className="relative px-4 pb-14 pt-20 sm:px-5 sm:pb-16 sm:pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="foto foto-met-tekst reveal-now relative min-h-[clamp(34rem,82svh,46rem)] rounded-[3px] sm:rounded-[4px]">
            <Image
              src="/images/beeld/zaal-verkenners.webp"
              alt="Volle zaal tijdens een AI-lezing van NinA AI"
              fill
              priority
              sizes="(min-width: 1152px) 1120px, 100vw"
              /* Op mobiel schuift het kader naar rechts: daar zit de zaal, en
                 links komt de tekst met de scrim erover. */
              className="object-cover object-[62%_center] sm:object-center"
            />
            {/* Het neurale veld blijft, maar nu als subtiel raster over de
                foto in plaats van over een leeg vlak. */}
            <NeuralField className="absolute inset-0 z-[2] h-full w-full opacity-25" />
            <div className="op-foto flex min-h-[clamp(34rem,82svh,46rem)] flex-col justify-end p-7 sm:p-12 lg:p-16">
              {/* Ambitie, niet een claim. "De nummer 1" konden we niet
                  onderbouwen, en een niet-onderbouwde superioriteitsclaim
                  is onder de Nederlandse Reclame Code aanvechtbaar. Zo
                  blijft de lat staan zonder dat er iets te weerleggen is. */}
              <p className="label-mono text-[10.5px] text-white/70 sm:text-[11.5px]">
                Op weg naar de nummer 1 AI agency van Nederland
              </p>
              <h1 className="display-serif mt-6 max-w-[34rem] text-[2.5rem] text-[#f2f2f2] sm:text-[3.6rem] lg:max-w-[42rem] lg:text-[4.4rem]">
                Van AI-kennis naar een{" "}
                <em className="italic text-violet-light">
                  werkende AI-organisatie
                </em>
                .
              </h1>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
                NinA helpt organisaties processen te automatiseren met
                slimme AI-agents en workflows, zonder je hele IT-landschap om
                te gooien. Jullie vaste AI-partner.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PijlKnop
                  href={site.booking}
                  variant="licht"
                  data-cta="home_hero_kennismaking"
                  data-cta-soort="hero"
                >
                  Plan een kennismaking
                </PijlKnop>
                {/* Het partnership is het hoofdproduct, dus dat is de tweede
                    knop. De lezing blijft bereikbaar als tekstlink. */}
                <PijlKnop
                  href="/ai-partnership"
                  variant="ghost-licht"
                  zonderPijl
                  data-cta="home_hero_partnership"
                  data-cta-soort="hero"
                >
                  Bekijk het AI Partnership
                </PijlKnop>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-[13px] text-white/60">
                  Vrijblijvend, 15 minuten, binnen 24 uur reactie.
                </p>
                {/* Handgeschreven violet: het menselijke NinA-moment. Op de
                    foto de lichte tint, anders leest het violet niet. */}
                <Link
                  href="/lezingen-workshops"
                  className="annotatie annotatie-licht text-[19px] decoration-violet-light/50 underline-offset-4 hover:underline"
                >
                  of vraag een AI lezing of workshop aan
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/15 pt-6 font-mono text-[11.5px] text-white/70 sm:text-[12px]">
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
          </div>

          {/* Klantlogo's direct onder de banner: dit is de sterkste social
              proof, dus zichtbaar zonder te scrollen. Witte tegels volgens
              het beeldrecept. */}
          <div className="reveal-now mt-8 [animation-delay:0.35s] sm:mt-10">
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* Direct onder de banner: het motto, de cijfers en de gezichten van
          het team. Dat is het bewijs, en dat hoort hoog op de pagina te staan
          in plaats van halverwege. */}
      <MottoMarquee />

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

      {/* AI Maturity Quick Scan: het startpunt van het partnership, hier
          interactief zodat een bezoeker zijn eigen profiel ziet en van
          daaruit doorklikt. */}
      <SectieLicht
        id="quick-scan"
        nr="01"
        label="Quick scan · gratis, twee minuten"
        title={
          <>
            Waar staat jouw organisatie <em className="italic">nu</em>?
          </>
        }
        sub="Zeven vragen, één per dimensie van AI-volwassenheid. Geef een score van 1 tot 5 en het web beweegt mee. De gestreepte lijn is waar we in een AI Partnership binnen twaalf maanden naartoe werken."
        annotatie="twee minuten, dat is alles"
      >
        <MaturityQuickScan />
      </SectieLicht>

      {/* APO methode: teaser. De quick scan hierboven is stap 1 van deze
          methode; de verdieping staat op de partnershippagina. */}
      <SectieLicht
        variant="alt"
        nr="02"
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

      {/* Vier fasen */}
      <SectieLicht
        nr="03"
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
        nr="04"
        label="Producten per fase"
        title={
          <>
            Welk product je nodig hebt, hangt af van{" "}
            <em className="italic">waar je nu staat</em>.
          </>
        }
        sub="Vier fasen, en per fase de producten die daarbij horen. Het partnership loopt door alle vier."
        annotatie="je hoeft niet bij fase 1 te beginnen"
      >
        <FasenProducten />
      </SectieLicht>

      {/* Workflow showcase */}
      <SectieLicht
        nr="05"
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
        nr="06"
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
        nr="07"
        label="Rendement"
        title={
          <>
            Een AI-partner kost minder dan 1 FTE en levert{" "}
            <em className="italic">meer dan 13x rendement</em>.
          </>
        }
        annotatie="expected scenario, niet de best case"
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
        nr="08"
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
              <div className="glas h-full rounded-[3px] p-7 sm:p-8">
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
                <div className="foto relative overflow-hidden rounded-[3px] border border-border">
                  <Image
                    src="/images/beeld/klantteam-da.webp"
                    alt="Het team van DA Drogist na de AI-workshop van NinA"
                    width={1400}
                    height={1050}
                    sizes="(min-width: 1024px) 540px, 100vw"
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
        nr="09"
        label="Blog"
        title={
          <>
            Elke week een <em className="italic">eerlijk verhaal</em> uit de
            AI-praktijk.
          </>
        }
        sub="Geen hype, wel wat werkt. Lees mee met de nieuwste inzichten."
        annotatie="elke week een nieuwe"
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
                    <div className="foto relative aspect-[16/10] overflow-hidden rounded-[3px] border border-border">
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
