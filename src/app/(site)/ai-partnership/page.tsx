import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import KlantLogoRij from "@/components/ui/KlantLogoRij";
import CountUp from "@/components/ui/CountUp";
import IjkpuntLijn from "@/components/ui/IjkpuntLijn";
import PartnershipTiers from "@/components/sections/PartnershipTiers";
import TokenMenukaart from "@/components/sections/TokenMenukaart";
import SavingsChart from "@/components/sections/SavingsChart";
import MaturityScan from "@/components/sections/MaturityScan";
import ApoMethode from "@/components/sections/ApoMethode";
import TeamRij from "@/components/sections/TeamRij";
import MobielCTA from "@/components/layout/MobielCTA";
import { alternatesVoor, site } from "@/lib/site";

/** Modelnaam op één plek, zodat wijzigen één regel is. */
const MODEL = "AI Partnership";

export const metadata: Metadata = {
  alternates: alternatesVoor("/ai-partnership"),
  title: MODEL,
  description:
    "Wij lopen als een audit door je bedrijf, zoeken de processen waar het opstroomt en zetten die dicht. Vaste capaciteit in tokens per maand, op jaarbasis. Vanaf EUR 3.900 per maand.",
};

/** Eén regel per brandje. Een beslisser scant deze lijst, hij leest hem niet. */
const BRANDJES = [
  "Twee mensen weten hoe zo'n rapport moet. De rest loopt een weekje mee.",
  "Aanvragen komen per mail binnen en worden met de hand overgetypt.",
  "De klantenservice zoekt in handleidingen die niemand bijhoudt.",
  "Elke maandag een dag kwijt aan rapportages die niemand leest.",
  "Een afdeling werkt structureel door tot 's avonds. Dat heet dan drukte.",
  "Bij moeilijke vragen: vraag het aan Piet. En Piet gaat op vakantie.",
];

const PROCESSEN = [
  {
    naam: "Documenten uit expertkennis",
    pijn: "De kennis om een subsidieaanvraag of adviesrapport te schrijven zit in twee hoofden.",
    bouwen:
      "We leggen die kennis vast met honderden voorbeelden van eerder werk, en genereren documenten in jullie eigen standaard.",
    cijfer: "90%",
    cijferLabel: "minder fouten in data-invoer",
  },
  {
    naam: "Aanvragen naar ERP of CRM",
    pijn: "Iets komt binnen per mail of formulier en iemand typt het over in een ander systeem.",
    bouwen:
      "De inkomende stroom wordt gelezen, gefilterd en weggezet in jullie eigen systemen. Een mens keurt goed.",
    cijfer: "192 uur",
    cijferLabel: "per maand terug bij Van Berkel Professionals",
  },
  {
    naam: "Klantenservice en tickets",
    pijn: "Hoge volumes, vragen die terugkomen, en de moeilijke gevallen gaan naar die ene persoon.",
    bouwen:
      "Terugkerende vragen worden afgehandeld. Kan de AI het niet, dan antwoordt een mens en gaat dat antwoord de database in. De volgende keer gaat het automatisch.",
    cijfer: "45%",
    cijferLabel: "minder supporttickets",
  },
];

const GARANTIES = [
  {
    kop: "Er zit altijd een mens in",
    tekst:
      "Wij bouwen geen enkele workflow die puur AI is. Minimaal een mens als laatste controle. De automatisering haalt het opzoeken en overtypen weg, niet het vakmanschap.",
  },
  {
    kop: "Je data blijft in Nederland",
    tekst:
      "Eigen infrastructuur, servers in Amsterdam, volledig GDPR-compliant en compatibel met ISO 27001 en NEN 7510. Optioneel Azure OpenAI voor extra waarborgen.",
  },
  {
    kop: "Geen lock-in, eigen IP",
    tekst:
      "Alles draait in jullie eigen omgeving en blijft van jullie. Stopt het partnership, dan kun je zelfstandig verder.",
  },
];

const IS_WEL = [
  "Vaste capaciteit per maand, in te zetten waar het het meest oplevert",
  "Een team dat jullie processen kent, dus geen inwerktijd per vraag",
  "Kwartaalreview: wat leverde het op, wat staat er nu bovenaan",
  "Training van je eigen mensen, zodat de afhankelijkheid afneemt",
];

const IS_NIET = [
  "Geen supportabonnement en geen storingstelefoon",
  "Geen detachering per uur",
  "Geen softwarelicentie die we ook aan honderd anderen verkopen",
  "Geen losse workshop. Wil je alleen dat, dan hebben we lezingen en workshops",
];

const TREDEN = [
  {
    stap: "01",
    naam: "Kickoff",
    tekst:
      "Een dag on-site door je processen, plus een workshop met je kernteam. Je krijgt een geprioriteerde lijst met wat elk knelpunt kost.",
  },
  {
    stap: "02",
    naam: "Bouwen",
    tekst: "Elke maand capaciteit om die lijst af te werken, van boven naar beneden.",
  },
  {
    stap: "03",
    naam: "Opschalen",
    tekst: "Wat werkt bij één team, breiden we uit naar de rest.",
  },
  {
    stap: "04",
    naam: "Verankeren",
    tekst:
      "Je eigen mensen nemen het over. Het doel is een organisatie die het zelf kan.",
  },
];

const IJKPUNTEN = [
  { maand: "Maand 1", naam: "Fundament" },
  { maand: "Maand 3", naam: "Workshop" },
  { maand: "Maand 6", naam: "Halfjaarreview" },
  { maand: "Maand 9", naam: "Follow-up workshop" },
  { maand: "Maand 12", naam: "Roadmap volgend jaar" },
];

const VOOR_JOU = [
  "Je groeit, ongeveer 30 medewerkers of meer, het liefst richting de 100",
  "De vraag is niet hoe je mensen kwijtraakt, maar hoe je het omzetdoel haalt zonder tien man aan te nemen",
  "Er zijn meerdere systemen die met elkaar zouden moeten praten en dat niet doen",
];

const NIET_VOOR_JOU = [
  "Je zoekt één losse workshop. Die hebben we, zonder partnership",
  "Er bestaat standaardsoftware die je probleem oplost. Koop die, dat is sneller en goedkoper",
  "Je wil het bij een pilot houden en volgend jaar nog eens kijken",
];

const STAPPEN = [
  {
    stap: "01",
    kop: "Eén gesprek van een uur",
    tekst: "Wat speelt er, en waar zitten de knelpunten in processen.",
  },
  {
    stap: "02",
    kop: "Voorstel binnen twee werkdagen",
    tekst: "Geprioriteerde lijst en business case: wat het kost, wat het oplevert.",
  },
  {
    stap: "03",
    kop: "Eén vervolggesprek",
    tekst: "Daarin besluiten we. Ja of nee, geen traject van zes weken.",
  },
];

function Vink() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
      ✓
    </span>
  );
}

function Streep() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-px w-3 shrink-0 bg-text-muted/60"
    />
  );
}

export default function AiPartnership() {
  return (
    <>
      {/* Hero: resultaat, bewijs, en dan direct de logowall */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-36">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal-now">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Het {MODEL}
              </p>
              <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                Elke euro die je in AI stopt, moet er{" "}
                <Em>meer dan één uit halen</Em>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Iedereen heeft AI op de agenda, bijna niemand weet waar te
                beginnen. Wij lopen als een audit door je bedrijf, zoeken de
                processen waar het opstroomt, en zetten die dicht.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href={site.bookingPartnership}
                  data-cta="partnership_hero_kennismaking"
                  data-cta-soort="hero"
                >
                  Plan een kennismaking
                </MagneticButton>
                <MagneticButton
                  href="#pakketten"
                  variant="ghost"
                  data-cta="partnership_hero_prijs"
                  data-cta-soort="hero"
                >
                  Wat het kost
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Eén gesprek van een uur. Voorstel met business case binnen twee
                werkdagen.
              </p>
            </div>
            <div className="reveal-now hidden [animation-delay:0.2s] lg:block">
              <Image
                src="/images/foto-workshop.webp"
                alt="Kickoff-workshop met het kernteam van een klant"
                width={900}
                height={682}
                className="rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(12,14,24,0.12)]"
              />
            </div>
          </div>

          {/* Drie cijfers en de logowall doen het werk van een alinea proof */}
          <Reveal delay={0.15}>
            <dl className="mt-14 grid gap-6 border-y border-border py-8 sm:grid-cols-3">
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={192} suffix=" uur" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  per maand bespaard bij Van Berkel Professionals
                </dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={100} suffix="+" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  aanvragen per dag automatisch verwerkt
                </dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={160} suffix="+" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  organisaties geholpen, sessies beoordeeld met een 9,3
                </dt>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-14">
          <KlantLogoRij />
        </div>
      </section>

      {/* Herkenning: zes regels, geen alinea's */}
      <Section
        variant="alt"
        title={
          <>
            Elk bedrijf heeft <Em>brandjes</Em>.
          </>
        }
        sub="Plekken waar het opstroomt. Niet spectaculair, wel elke week weer."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDJES.map((b, idx) => (
            <li key={b} className="h-full">
              <Reveal
                delay={idx * 0.05}
                className="h-full rounded-xl border border-border bg-bg-card p-4 text-sm leading-snug transition-colors hover:border-primary/50"
              >
                {b}
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-text-muted">
            Geen IT-problemen. Processen die te lang met de hand gaan. AI is
            daarbij het middel, nooit het doel.
          </p>
        </Reveal>
      </Section>

      {/* Nulmeting en doel: het start- en eindpunt van het partnership */}
      <Section
        kicker="Nulmeting en doel"
        title={
          <>
            Eerst weten waar je staat. Dan <Em>waar je heen gaat</Em>.
          </>
        }
        sub="In de Kickoff meten we je AI-volwassenheid op zeven dimensies. Dat levert één plaat op met een startpunt en een doel: waar staat de organisatie nu, en waar moet ze over twaalf maanden staan. Elk kwartaal meten we opnieuw, zodat je ziet of het werkt."
      >
        <MaturityScan />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-sm text-text-muted">
            Het profiel hierboven is een representatief voorbeeld, geen
            klantcijfer. Jullie eigen nulmeting rolt uit de Kickoff, samen met
            de geprioriteerde lijst waar we het jaar mee beginnen.
          </p>
        </Reveal>
      </Section>

      {/* De APO methode, uitgebreid. De nulmeting hierboven is stap 1;
          hieronder de andere drie stappen zoals ze in de sessie eruitzien. */}
      <Section
        id="apo-methode"
        kicker="Onze methode"
        title={
          <>
            De APO methode: van <Em>kansen naar business case</Em>.
          </>
        }
        sub="AI Process Optimisation: in één werksessie tekenen we het werk uit in meetbare stappen, bepalen we per stap wat AI overneemt en rekenen we uit wat dat oplevert. Geen presentatie over wat AI zou kunnen, maar een rekensom over wat het bij jullie oplevert."
      >
        <ApoMethode />
      </Section>

      {/* Drie processen: kort, met de grafiek als bewijs */}
      <Section
        title={
          <>
            Drie processen waar we dit <Em>het vaakst doen</Em>.
          </>
        }
        sub="Niet omdat we niets anders kunnen, maar omdat we hier het meeste hebben gebouwd en dus het snelst resultaat halen."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PROCESSEN.map((p, idx) => (
            <Reveal key={p.naam} delay={idx * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-lg font-bold">{p.naam}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {p.pijn}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed">
                  {p.bouwen}
                </p>
                <p className="mt-5 border-t border-border pt-4">
                  <span className="font-display text-2xl font-bold text-gold">
                    {p.cijfer}
                  </span>
                  <span className="ml-2 text-sm text-text-muted">
                    {p.cijferLabel}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal delay={0.1}>
            <SavingsChart />
          </Reveal>
          <Reveal delay={0.15}>
            <Image
              src="/images/foto-build.webp"
              alt="Live demo van een n8n-workflow tijdens een NinA-sessie"
              width={900}
              height={600}
              className="h-full w-full rounded-2xl border border-border object-cover"
            />
          </Reveal>
        </div>

        {/* Menselijk bewijs. Deze pagina had nul quotes, terwijl het het
            duurste product op de site is. Het label zegt eerlijk dat dit uit
            een workshop komt en niet uit een partnership: dat is de enige
            met naam vrijgegeven quote die er nu is. */}
        <Reveal delay={0.2}>
          <figure className="mt-5 rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
              <Image
                src="/images/foto-da-drogist.webp"
                alt="Het team van DA Drogist na de AI-workshop van NinA"
                width={320}
                height={240}
                className="h-32 w-full rounded-xl object-cover sm:w-44"
              />
              <div>
                <blockquote className="font-display text-lg leading-snug sm:text-xl">
                  &ldquo;De energie was voelbaar. Ons hele team liep naar buiten
                  met concrete ideeën die we dezelfde week nog zijn gaan
                  gebruiken.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-text-muted">
                  <span className="font-semibold text-text">
                    Judi van den Berg
                  </span>{" "}
                  · Category Manager, DA Drogist
                  <span className="mt-1 block text-xs text-text-muted/80">
                    Na een AI-workshop. Zo begint een partnership vaak: eerst
                    het team mee, dan bouwen.
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </Section>

      {/* De drie vragen die een beslisser altijd stelt */}
      <Section
        variant="alt"
        title={
          <>
            Mens, data en <Em>eigendom</Em>.
          </>
        }
        sub="De drie vragen die elke directie stelt, voordat de business case erbij komt."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {GARANTIES.map((g, idx) => (
            <Reveal key={g.kop} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-lg font-bold">{g.kop}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {g.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Wat het is en niet is: vier tegen vier, één regel per punt */}
      <Section
        title={
          <>
            Wat je <Em>precies krijgt</Em>.
          </>
        }
        sub="Zoals je een accountant hebt en een IT-partner, zo hebben we AI ingericht. Een vast gezicht, vaste capaciteit per maand, en iemand die jullie bedrijf al kent als je belt."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">Dit is het wel</h3>
              <ul className="mt-5 space-y-3">
                {IS_WEL.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Vink />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-alt p-7">
              <h3 className="font-display text-lg font-bold">Dit is het niet</h3>
              <ul className="mt-5 flex-1 space-y-3">
                {IS_NIET.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <Streep />
                    {n}
                  </li>
                ))}
              </ul>
              <Link
                href="/lezingen-workshops"
                className="mt-5 inline-block border-t border-border pt-4 text-sm font-semibold text-primary hover:underline"
              >
                Bekijk lezingen en workshops
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Het team met naam en functie. Staat hier omdat de sectie hierboven
          "een vast gezicht" belooft; dan hoort er te staan wie dat zijn. */}
      <Section
        variant="alt"
        kicker="Wie het doet"
        title={
          <>
            Het team dat <Em>aan je bedrijf werkt</Em>.
          </>
        }
        sub="Geen wisselende inhuur per opdracht. Dit zijn de mensen die jullie processen leren kennen en het bouwwerk onderhouden."
      >
        <Reveal>
          <TeamRij variant="namen" />
        </Reveal>
      </Section>

      {/* Kickoff en jaarbasis in één sectie: hoe het loopt */}
      <Section
        title={
          <>
            Het begint met de <Em>Kickoff</Em>, daarna een jaar.
          </>
        }
        sub="Een audit door je organisatie: waar stroomt het op, wat is oplossen waard, in welke volgorde. Daarna bouwen we."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREDEN.map((t, idx) => (
            <li key={t.naam} className="h-full">
              <Reveal
                delay={idx * 0.08}
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

        {/* Kickoff-prijzen als strip in plaats van twee bulletlijsten */}
        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            <div className="bg-bg-card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold">Kickoff Fase</h3>
                <p className="font-display text-xl font-bold text-gold">
                  EUR 7.500
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                3 weken. Volle dag procesanalyse on-site, workshop kernteam,
                n8n-omgeving, roadmap met business cases en een nulmeting van je
                AI-volwassenheid. Verplicht bij Standaard en Enterprise.
              </p>
            </div>
            <div className="bg-bg-card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold">
                  Kickoff Fase Light
                </h3>
                <p className="font-display text-xl font-bold">EUR 3.750</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                2 weken. Workshop kernteam met de AI Readiness als eindproduct,
                n8n-omgeving en roadmap. Geen aparte scan-dagen. Verplicht bij
                Light.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-lg">
            Daarna werken we op jaarbasis. Een organisatie ontwikkelen kost een
            jaar, en één workshop is geen workshop.
          </p>
          <p className="mt-3 max-w-2xl text-text-muted">
            Dus staat het ritme vast voordat het jaar begint. Doel: van de
            nulmeting naar 4 van 5 AI-volwassenheid binnen twaalf maanden.
          </p>
        </Reveal>

        <div className="mt-8">
          <IjkpuntLijn items={IJKPUNTEN} label="Vijf ijkpunten in twaalf maanden" />
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-text-muted">
            Werk je liever per project? Dat kan ook. Zeg het gewoon, dan doen we
            het zo.
          </p>
        </Reveal>
      </Section>

      {/* Pakketten en tokens */}
      <Section
        id="pakketten"
        kicker="Wat het kost"
        title={
          <>
            Drie niveaus, <Em>één rekeneenheid</Em>.
          </>
        }
        sub="Je koopt geen uren, je koopt tokens: een vast aantal per maand, elke maand opnieuw in te zetten waar het het meest oplevert. Alle bedragen exclusief BTW."
      >
        <PartnershipTiers />
        <div className="mt-14">
          <TokenMenukaart />
        </div>
      </Section>

      {/* Voor wie */}
      <Section
        variant="alt"
        title={
          <>
            Voor wie dit <Em>werkt</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Dit gaat over jou als
              </h3>
              <ul className="mt-5 space-y-3">
                {VOOR_JOU.map((v) => (
                  <li
                    key={v}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Vink />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Niet voor jou als
              </h3>
              <ul className="mt-5 space-y-3">
                {NIET_VOOR_JOU.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <Streep />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed">
                Maatwerk is de juiste keuze als je systemen moet koppelen die
                niets van elkaar weten, je kennis te waardevol is voor een
                SaaS-platform, of je een SaaS hebt geprobeerd die niet doet wat
                je nodig hebt.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Slot: twee vragen, drie stappen */}
      <section id="afsluiter" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,14,24,0.09),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 sm:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Twee vragen om mee te beginnen.
            </h2>
            <div className="mt-8 space-y-4">
              <p className="font-display border-l-2 border-primary pl-5 text-xl leading-snug sm:text-2xl">
                Wat staat er bij jullie te gebeuren het komende jaar?
              </p>
              <p className="font-display border-l-2 border-primary pl-5 text-xl leading-snug sm:text-2xl">
                Hoe heb jij het afgelopen jaar AI zien veranderen?
              </p>
            </div>
            <p className="mt-6 text-text-muted">
              Als je die tweede vraag eerlijk beantwoordt, weet je waarom een
              jaar kort is.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-5 sm:grid-cols-3">
            {STAPPEN.map((s, idx) => (
              <li key={s.stap} className="h-full">
                <Reveal
                  delay={idx * 0.08}
                  className="relative h-full rounded-2xl border border-border bg-bg-card p-6 pt-8"
                >
                  <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/50 bg-bg px-3 py-1 text-sm font-bold text-primary">
                    {s.stap}
                  </span>
                  <h3 className="font-display text-base font-bold">{s.kop}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {s.tekst}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.bookingPartnership}>
                Plan een kennismaking
              </MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                Mail {site.email}
              </MagneticButton>
            </div>
            {/* Wie nog niet wil praten, wil bewijs. */}
            <p className="mt-6 text-sm">
              <Link
                href="/cases"
                className="group inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                data-cta="partnership_naar_cases"
              >
                Liever eerst zien wat het oplevert? Bekijk de klantcases
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-sm text-text-muted">
              <li>
                <span className="font-semibold text-text">160+</span>{" "}
                organisaties
              </li>
              <li>
                Waardering <span className="font-semibold text-text">9,3</span>
              </li>
              <li>
                <span className="font-semibold text-text">Amsterdam</span>,
                EU-hosting
              </li>
              <li>
                <span className="font-semibold text-text">Eigen IP</span>, geen
                lock-in
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Lange pagina met de beslissing pas onderaan; op mobiel blijft de
          kennismaking zo binnen bereik. */}
      <MobielCTA
        label="Plan kennismaking"
        href={site.bookingPartnership}
        sub="15 minuten, vrijblijvend"
        meting="partnership_balk"
        verbergBij="#afsluiter"
      />
    </>
  );
}
