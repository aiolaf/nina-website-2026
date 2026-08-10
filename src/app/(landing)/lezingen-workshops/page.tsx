import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import Section, { Em } from "@/components/ui/Section";
import FilloutEmbed from "@/components/ui/FilloutEmbed";
import LogoMarquee from "@/components/ui/LogoMarquee";
import SessieFotos from "@/components/sections/SessieFotos";
import MobielCTA from "@/components/layout/MobielCTA";
import { IconWhatsApp } from "@/components/ui/icons";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  /* Zoekwoordonderzoek (Google-suggesties, NL): de kop-termen zijn "AI
     spreker", "spreker over AI" en "AI spreker inhuren"; de sterkste
     staartzoekopdrachten lopen via afdeling (AI workshop marketing, AI sales
     workshop, AI workshop HR, AI training voor medewerkers). Die staan
     hieronder en in de koppen op de pagina zelf. */
  title: "AI spreker inhuren | Olaf Lemmens, keynote en workshop",
  description:
    "Op zoek naar een AI spreker? Olaf Lemmens geeft keynotes en workshops over AI, op maat voor jouw sector. 160+ organisaties, sessies beoordeeld met een 9,3. Vraag een voorstel aan.",
  alternates: alternatesVoor("/lezingen-workshops"),
  openGraph: {
    title: "AI spreker inhuren: Olaf Lemmens",
    description:
      "Keynotes en workshops over AI, op maat voor jouw sector. 160+ organisaties, beoordeeld met een 9,3.",
    url: "/lezingen-workshops",
  },
};

/**
 * Elk cijfer heeft een bron, in een eigen veld zodat er geen getal zonder
 * herkomst tussen kan glippen. Wat hier eerder stond klopte niet:
 *
 * - "80% heeft nog geen plan rondom AI" had geen bron. Vervangen door het
 *   CBS-cijfer: "In 2024 gebruikte 22,7 procent van de bedrijven met 10 of
 *   meer werkzame personen een of meer AI-technologieën", dus 77 procent
 *   niet.
 * - "70%+ tijdsbesparing" overdreef McKinsey. Die zeggen dat 60 tot 70
 *   procent van de wérktijd uit activiteiten bestaat die technisch te
 *   automatiseren zijn, wat iets anders is dan gerealiseerde besparing.
 */
const MARKT = [
  {
    cijfer: "77%",
    tekst:
      "van de Nederlandse bedrijven met 10 of meer medewerkers gebruikte in 2024 nog geen AI",
    bron: "CBS, AI-monitor 2024",
  },
  {
    cijfer: "60-70%",
    tekst:
      "van de werktijd bestaat uit activiteiten die met de AI van nu technisch te automatiseren zijn",
    bron: "McKinsey Global Institute, 2023",
  },
  {
    cijfer: "300M",
    tekst:
      "voltijdbanen wereldwijd die generatieve AI kan raken",
    bron: "Goldman Sachs, 2023",
  },
];

const LEZING_PUNTEN = [
  "1 uur op locatie, inclusief 2 voorbereidingssessies",
  "Volledig maatwerk, afgestemd op jullie sector en doelgroep",
  "Altijd het laatste AI-nieuws en de nieuwste updates",
  "Interactief en praktisch, met exclusieve Prompt Pro Tips",
  "Use cases en voorbeelden die aansluiten op jullie werk",
];

const WORKSHOP_PUNTEN = [
  "3 uur op locatie, live begeleid door een AI Consultant",
  "Gebaseerd op Design Thinking-principes",
  "Duidelijk overzicht van taken en processen waar AI helpt",
  "Zowel online als offline groepsactiviteiten mogelijk",
  "Tot 30% tijdsbesparing zichtbaar gemaakt in de praktijk",
];

const PRIJZEN = [
  {
    naam: "AI Lezing",
    prijs: "EUR 2.450",
    periode: "per lezing, excl. BTW",
    punten: [
      "1 uur op locatie",
      "Inclusief voorbereidingssessies",
      "Maatwerk en het laatste AI-nieuws",
    ],
    featured: false,
  },
  {
    naam: "AI Workshop",
    prijs: "EUR 3.950",
    periode: "eenmalig, excl. BTW",
    punten: [
      "3 uur op locatie",
      "Inclusief voorbereidingssessies",
      "Volledig maatwerk",
    ],
    featured: true,
  },
  {
    naam: "Workshop-Traject",
    prijs: "EUR 6.150+",
    periode: "meerdere blokken, excl. BTW",
    punten: [
      "Voorbereiding plus dagdeel op locatie",
      "Online follow-up over enkele weken",
      "De opstap naar een AI Partnership",
    ],
    featured: false,
  },
];

const VOORSTEL_PUNTEN = [
  "Volledig afgestemd op jullie sector, doelgroep en kennisniveau",
  "Voorbeelden en oefeningen die direct relevant zijn voor jullie werk",
  "Praktisch en toepasbaar, geen standaard verhaal maar maatwerk",
];

/* De vormen waarin naar een spreker wordt gezocht: keynote, gastspreker,
   dagvoorzitter, workshop. */
const VORMEN = [
  {
    naam: "AI keynote",
    duur: "30 tot 60 minuten",
    tekst:
      "Een prikkelend openingsverhaal voor een congres, kick-off of relatie-event. Zet de zaal aan het denken en geeft richting.",
  },
  {
    naam: "Gastspreker",
    duur: "45 tot 90 minuten",
    tekst:
      "Onderdeel van een groter programma, bijvoorbeeld een directiedag of ledenbijeenkomst. Met ruimte voor vragen uit de zaal.",
  },
  {
    naam: "Dagvoorzitter",
    duur: "Halve of hele dag",
    tekst:
      "Olaf leidt je AI-programma, verbindt de sprekers en houdt de rode draad vast van opening tot afsluiting.",
  },
  {
    naam: "Hands-on workshop",
    duur: "Dagdeel",
    tekst:
      "Zelf aan de slag met AI-tools. Maximaal 15 tot 20 deelnemers, iedereen gaat naar huis met iets dat werkt.",
  },
];

/* Niveaus. In de praktijk lopen de niveaus binnen één zaal sterk uiteen, en
   er zijn aparte sessies op gevorderd niveau; dat moest van de pagina
   afleesbaar zijn in plaats van alleen uit de FAQ. */
const NIVEAUS = [
  {
    naam: "Beginners",
    kop: "Nog nooit verder gekomen dan een vraag intypen",
    tekst:
      "We beginnen bij hoe een taalmodel eigenlijk werkt en waarom het soms onzin verkoopt. Daarna direct aan de slag met het werk dat op hun eigen bureau ligt.",
    punten: [
      "Goede prompts schrijven zonder jargon",
      "Documenten, mail en verslagen versnellen",
      "Wat je wel en niet in een AI-tool zet",
    ],
  },
  {
    naam: "Gevorderd",
    kop: "Al ver, en op zoek naar de volgende stap",
    tekst:
      "Voor teams die de basis voorbij zijn geven we specifieke sessies op gevorderd niveau. Hier gaat het over bouwen en automatiseren in plaats van kennismaken.",
    punten: [
      "AI Automation: workflows die taken overnemen",
      "AI-agents die zelfstandig werk afmaken",
      "Vibecoding: bouwen zonder developer te zijn",
    ],
  },
];

/* Welke modellen aan bod komen. Bewust breed: bedrijven zitten vast aan de
   tool die ze al hebben, en dat bepaalt de inhoud van de sessie. */
const MODELLEN = [
  "Microsoft Copilot",
  "ChatGPT",
  "Claude",
  "Gemini",
];

/* Afdelingen. Zie de toelichting bij de sectie: op afdelingstermen wordt
   daadwerkelijk gezocht, op gelegenheden niet. */
const AFDELINGEN = [
  {
    naam: "Marketing",
    tekst:
      "Content die niet als AI leest, campagnes sneller de deur uit, en beeld en video zonder bureau. Inclusief waar het misgaat als je het model zijn gang laat gaan.",
  },
  {
    naam: "Sales",
    tekst:
      "Research vóór het gesprek, voorstellen die niet elke keer opnieuw worden getypt, en opvolging die niet blijft liggen.",
  },
  {
    naam: "Operations",
    tekst:
      "De administratie rond het echte werk: orders, planningen, rapportages. Hier zit vaak de grootste tijdwinst en de minste weerstand.",
  },
  {
    naam: "Finance",
    tekst:
      "Facturen en data uitlezen, afwijkingen opsporen, rapportages en analyses die anders een dag kosten.",
  },
  {
    naam: "HR en recruitment",
    tekst:
      "Vacatures, screening en onboarding. Plus het gesprek dat er toch komt: wat spreken we intern af over AI-gebruik?",
  },
  {
    naam: "Directie en MT",
    tekst:
      "Minder tools, meer richting. Waar liggen de kansen, wat kost het, en hoe voorkom je dat er straks tien losse experimenten draaien.",
  },
];

/* FAQ; de vragen komen uit de zoeksuggesties rond "AI spreker". Ook als
   FAQPage-schema aan de pagina meegegeven. */
const FAQ = [
  {
    v: "Wat kost het inhuren van een AI spreker?",
    a: "Een AI-lezing start vanaf € 2.450 exclusief BTW en reiskosten. Een hands-on workshop vanaf € 3.950. Het definitieve bedrag hangt af van de vorm, de duur en hoeveel voorbereiding op maat je wilt. Je krijgt altijd eerst een vrijblijvend voorstel.",
  },
  {
    v: "Hoe snel kan een AI spreker geboekt worden?",
    a: "Je krijgt binnen 24 uur een reactie op je aanvraag. In de praktijk plannen we sessies meestal drie tot zes weken vooruit, maar bij een gaatje in de agenda kan het sneller.",
  },
  {
    v: "Is de lezing geschikt voor mensen zonder technische kennis?",
    a: "Ja, en ook voor mensen die al ver zijn. In bijna elke zaal zit een groot verschil in niveau, van collega's die ChatGPT nog nooit openden tot mensen die met agents werken. Olaf houdt beide groepen aangehaakt. Voor teams die de basis voorbij zijn geven we aparte sessies over AI Automation, AI-agents en vibecoding. Het niveau bepalen we in een korte intake.",
  },
  {
    v: "Werken jullie met de AI-tools die wij al gebruiken?",
    a: "Ja: Microsoft Copilot, ChatGPT, Claude of Gemini. Dat maakt het verschil tussen een interessant verhaal en iets waar je team morgen mee verder kan. Twijfel je nog over de keuze, dan vergelijken we de modellen voor jullie situatie.",
  },
  {
    v: "In welke taal geeft Olaf zijn lezingen?",
    a: "Nederlands en Engels. Voor internationale teams of een Engelstalig programma is Engels geen probleem.",
  },
  {
    v: "Werkt hij door heel Nederland en België?",
    a: "Ja, door heel Nederland en in België. Reiskosten worden apart in het voorstel opgenomen. Online of hybride sessies zijn ook mogelijk.",
  },
  {
    v: "Kan de lezing gecombineerd worden met een workshop?",
    a: "Dat is de meest geboekte combinatie. De lezing zorgt voor draagvlak bij de hele groep, de workshop daarna laat een kernteam er echt mee werken. Voor die combinatie geldt een pakketprijs.",
  },
];

/**
 * Structured data zodat Google Olaf als spreker-entiteit kan koppelen aan de
 * dienst, en de FAQ in beeld kan brengen als uitgebreid zoekresultaat.
 * Rendering volgens de Next-handleiding json-ld.md, inclusief het escapen
 * van "<" tegen injectie.
 */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nina-ai.nl/#olaf",
      name: "Olaf Lemmens",
      jobTitle: "AI-spreker en founder",
      description:
        "Spreker over kunstmatige intelligentie. Geeft keynotes, lezingen en workshops over AI voor organisaties in Nederland en België.",
      worksFor: { "@type": "Organization", name: "NinA AI Agency" },
      url: "https://nina-ai.nl/lezingen-workshops",
      sameAs: ["https://www.linkedin.com/in/olaf-lemmens/"],
      knowsAbout: [
        "Kunstmatige intelligentie",
        "AI-adoptie",
        "AI voor marketing en sales",
        "AI in bedrijfsprocessen",
        "AI Automation",
        "AI-agents",
        "Vibecoding",
        "Microsoft Copilot",
        "ChatGPT",
        "Claude",
        "Google Gemini",
      ],
    },
    {
      "@type": "Service",
      name: "AI spreker inhuren: keynote, lezing of workshop",
      serviceType: "AI keynote en workshop",
      provider: { "@id": "https://nina-ai.nl/#olaf" },
      areaServed: [
        { "@type": "Country", name: "Nederland" },
        { "@type": "Country", name: "België" },
      ],
      description:
        "Keynotes, lezingen en hands-on workshops over AI, op maat voor de sector en het kennisniveau van de groep.",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "2450",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "2450",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.v,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function LezingenWorkshops() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero: pitch + formulier direct zichtbaar, geen scroll nodig om te converteren */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        {/* Deze pagina heeft geen header, dus die 96px bovenmarge kost op
            mobiel alleen fold-ruimte voor het formulier. */}
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 sm:pb-20 sm:pt-24">
          {/* Drie blokken in plaats van twee kolommen. Op mobiel is de
              leesorde kop, formulier, knoppen: het formulier begon anders op
              685px terwijl het scherm 812px hoog is, dus de conversie van
              betaald verkeer stond onder de fold. Op lg staan kop en knoppen
              weer onder elkaar in kolom 1 en spant het formulier beide rijen
              in kolom 2, precies zoals eerst. */}
          <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_1fr]">
            <div className="reveal-now lg:col-start-1 lg:row-start-1">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/70 px-4 py-1.5 text-xs font-medium text-text-muted backdrop-blur">
                Sessies beoordeeld met een{" "}
                <span className="font-semibold text-gold">9,3</span>
              </p>
              <h1 className="font-display max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                <Em>AI spreker</Em> inhuren die je team ook echt in beweging
                krijgt.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:mt-6 sm:text-lg">
                Olaf Lemmens geeft keynotes, lezingen en hands-on workshops over
                AI, op maat voor jullie organisatie. Van directietafel tot
                marketing, sales en operations. Vraag een vrijblijvend voorstel
                aan.
              </p>
            </div>

            <div
              id="aanvraag"
              className="reveal-now [animation-delay:0.15s] lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <FilloutEmbed
                formId="sxmVnPbAUcus"
                title="Vraag een voorstel aan voor een lezing of workshop"
                /* Het formulier meldt zelf zijn hoogte; 640 is wat het op
                   mobiel nodig heeft, dus daar verschuift er niets meer
                   zodra het iframe de plaatshouder vervangt. */
                height={640}
                deferMs={250}
                meting="lezing_aanvraag_hero"
              />
            </div>

            <div className="reveal-now [animation-delay:0.1s] lg:col-start-1 lg:row-start-2">
              {/* Geen "Vraag een voorstel aan" meer: het formulier staat er
                  vlak naast, dus die knop wees naar zichzelf. */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="#aanbod" variant="ghost">
                  Bekijk het aanbod
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Vrijblijvend, binnen 24 uur een reactie.
              </p>
            </div>
          </div>

          {/* Klantlogo's direct onder het formulier: dit is de sterkste
              social proof en die hoort naast de conversie te staan, niet
              ergens verderop de pagina. */}
          <div className="reveal-now mt-12 border-t border-border pt-10 [animation-delay:0.3s]">
            <p className="mb-6 text-center text-sm text-text-muted">
              Onder andere deze organisaties boekten een lezing of workshop
            </p>
            <LogoMarquee />

            {/* Beeld van echte sessies, direct onder de logo's. Logo's tonen
                wie, foto's tonen wat het is: samen sterker dan alleen een
                rij merken. */}
            <div className="mt-10">
              <SessieFotos />
            </div>
          </div>
        </div>
      </section>

      {/* Marktcijfers */}
      <section className="border-y border-border bg-bg-alt py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            De cijfers liegen niet
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {MARKT.map((m, idx) => (
              <Reveal key={m.cijfer} delay={idx * 0.08}>
                <div>
                  <p className="font-display text-4xl font-bold text-primary">
                    {m.cijfer}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {m.tekst}
                  </p>
                  <p className="mt-2 text-xs text-text-muted/80">
                    Bron: {m.bron}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aanbod */}
      <Section
        id="aanbod"
        title={
          <>
            Twee manieren om je team <Em>in beweging</Em> te krijgen.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Kennis & enthousiasme
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold">
                AI Lezing
              </h2>
              <p className="mt-2 text-sm text-primary">
                Van &lsquo;wat is AI&rsquo; naar &lsquo;wat kan ik er morgen
                mee&rsquo;.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Een prikkelende sessie van 1 uur die je hele team meeneemt in
                wat AI vandaag al kan, met de nieuwste voorbeelden voor
                jullie branche.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {LEZING_PUNTEN.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-sm text-text-muted">
                Startpunt voor een duidelijke AI-strategie · vanaf{" "}
                <span className="font-semibold text-text">EUR 2.450</span>{" "}
                excl. BTW
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="relative flex h-full flex-col rounded-2xl border border-primary bg-bg-muted p-7 shadow-[0_12px_44px_rgba(97,68,121,0.12)]">
              <span className="absolute -top-3 right-6 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                Meest gekozen
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Handen aan het stuur
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold">
                AI Workshop
              </h2>
              <p className="mt-2 text-sm text-primary">
                Je team gaat zelf aan de slag en ziet direct resultaat.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Een interactieve sessie van 3 uur waarin je team zelf met AI
                aan de slag gaat, en met concrete kansen voor de eigen
                processen naar buiten loopt.
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {WORKSHOP_PUNTEN.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                <div className="rounded-xl bg-bg-card p-4">
                  <p className="text-sm font-semibold">Praktische oefeningen</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Zelf beter leren werken met AI via praktijkopdrachten,
                    met dummy data of eigen oefeningen.
                  </p>
                </div>
                <div className="rounded-xl bg-bg-card p-4">
                  <p className="text-sm font-semibold">Design Thinking</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Kansen-overzicht voor jullie processen als resultaat.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Vormen. Compact naast een podiumfoto: de losse kaarten hierboven
          overlapten met het aanbod en maakten de pagina een aaneenschakeling
          van kaartenrijen. */}
      <Section
        id="vormen"
        kicker="In welke vorm"
        title={
          <>
            Van korte keynote tot <Em>dagvoorzitter</Em>.
          </>
        }
        sub="Wat je nodig hebt hangt af van je programma."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <dl className="divide-y divide-border">
              {VORMEN.map((v) => (
                <div
                  key={v.naam}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-4"
                >
                  <dt className="font-display text-lg font-bold">{v.naam}</dt>
                  <span className="font-mono text-xs text-text-muted">
                    {v.duur}
                  </span>
                  <dd className="w-full text-sm leading-relaxed text-text-muted">
                    {v.tekst}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <figure>
              <Image
                src="/images/foto-lezing.webp"
                alt="Olaf Lemmens als AI-spreker op het podium voor een volle zaal"
                width={900}
                height={499}
                className="w-full rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(42,33,48,0.12)]"
              />
              <figcaption className="mt-3 text-xs text-text-muted">
                Keynote voor een volle zaal. Sessies beoordeeld met een 9,3.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Afdelingen in plaats van sectoren. Zoekonderzoek: op gelegenheid
          ("congres", "personeelsdag", "directiedag") komt geen enkele
          suggestie terug, op afdeling wel: AI workshop marketing, AI sales
          workshop, AI workshop HR, AI workshop finance, AI training voor
          medewerkers. Dat is dus de as waarop bedrijven ons vinden. */}
      <Section
        id="afdelingen"
        variant="alt"
        kicker="Per afdeling"
        title={
          <>
            Voorbeelden uit <Em>hun eigen werk</Em>.
          </>
        }
        sub="Een sessie landt pas als de voorbeelden over hun eigen werk gaan. Marketing heeft andere vragen dan finance. Olaf stemt de inhoud af op de afdelingen die in de zaal zitten."
      >
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {AFDELINGEN.map((a, i) => (
            <Reveal key={a.naam} delay={Math.min(i % 3, 2) * 0.06}>
              <div>
                <h3 className="font-display text-lg font-bold">{a.naam}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {a.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-text-muted">
            Zit er een mix van afdelingen in de zaal, dan werkt dat juist goed:
            iedereen ziet waar bij de buurafdeling tijd te winnen valt. Voor een
            AI-training voor medewerkers van één team maken we het smaller en
            gaan we de diepte in.
          </p>
        </Reveal>
      </Section>

      {/* Niveau en tools. Het niveauverschil binnen één groep is de vraag die
          het vaakst terugkomt, en de tool die een bedrijf al gebruikt bepaalt
          wat een sessie waard is. */}
      <Section
        id="niveau"
        kicker="Beginners en gevorderden"
        title={
          <>
            Van eerste prompt tot <Em>eigen AI-agents</Em>.
          </>
        }
        sub="In vrijwel elke zaal zit een groot verschil in niveau. Olaf is daaraan gewend en houdt beide groepen aangehaakt. En voor teams die de basis voorbij zijn geven we aparte sessies op gevorderd niveau."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {NIVEAUS.map((n, i) => (
            <Reveal key={n.naam} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 shadow-sm">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {n.naam}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold leading-snug">
                  {n.kop}
                </h3>
                <p className="mt-3 leading-relaxed text-text-muted">{n.tekst}</p>
                <ul className="mt-5 space-y-2">
                  {n.punten.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-8 grid items-center gap-8 rounded-2xl border border-border bg-bg-card p-7 lg:grid-cols-[1.1fr_1fr]">
            <div>
            <h3 className="font-display text-lg font-bold">
              We werken met het model dat jullie al gebruiken
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-text-muted">
              Zit je organisatie op Microsoft Copilot, dan gaat de sessie over
              Copilot. Werkt iedereen met ChatGPT, Claude of Gemini, dan doen we
              dat. Zo kan je team de volgende dag verder in de omgeving die er
              toch al staat. Twijfel je nog over de keuze, dan vergelijken we de
              modellen juist voor jullie situatie.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {MODELLEN.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-border bg-bg-alt px-4 py-1.5 text-sm text-text-muted"
                >
                  {m}
                </li>
              ))}
            </ul>
            </div>
            <figure>
              <Image
                src="/images/foto-workshop.webp"
                alt="Deelnemers werken in een hands-on AI-workshop met hun eigen laptop"
                width={900}
                height={682}
                className="w-full rounded-2xl border border-border object-cover"
              />
              <figcaption className="mt-2 text-xs text-text-muted">
                Hands-on: iedereen werkt in de tool die het bedrijf al gebruikt.
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </Section>

      {/* Olaf */}
      <Section
        variant="alt"
        kicker="Genomineerd AI Person of the Year"
        title={
          <>
            Olaf Lemmens brengt AI <Em>tot leven</Em>.
          </>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <Reveal>
            <div>
              <p className="max-w-2xl leading-relaxed text-text-muted">
                Tijdens zijn lezingen merkte Olaf dat organisaties wel met AI
                willen, maar niet weten waar ze moeten beginnen. Daar is hij
                goed in: uitleggen wat AI betekent voor jouw werk, zo concreet
                dat je team er maandag mee aan de slag kan.
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="font-display text-2xl font-bold text-primary">
                    9,3
                  </p>
                  <p className="text-sm text-text-muted">
                    gemiddelde beoordeling
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">
                    <CountUp to={100} suffix="+" />
                  </p>
                  <p className="text-sm text-text-muted">
                    lezingen en sessies
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">
                    <CountUp to={160} suffix="+" />
                  </p>
                  <p className="text-sm text-text-muted">organisaties</p>
                </div>
              </div>
              {/* Waar de 9,3 vandaan komt. Stond nergens, en dat is precies
                  wat een inkoper als eerste vraagt. */}
              <p className="mt-4 text-xs text-text-muted/80">
                Beoordeling uit de evaluaties die deelnemers na een sessie
                invullen.
              </p>
              <a
                href={site.linkedinOlaf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Volg Olaf op LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="hidden lg:block">
            <div className="relative h-full min-h-72 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(165,98,161,0.2),rgba(97,68,121,0.06))]">
              <Image
                src="/images/olaf-cutout.webp"
                alt="Olaf Lemmens, spreker en oprichter van NinA AI Agency"
                fill
                sizes="(min-width: 1024px) 280px, 0px"
                className="object-contain object-bottom"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Een heel team achter je
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                10 specialisten met kennis van 100+ AI-tools: strategen,
                prompt-engineers, developers en adviseurs. Wat in de sessie
                ontstaat, kan NinA daarna ook echt bouwen.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Review */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <figure className="text-center">
            <blockquote className="font-display text-2xl font-medium leading-snug sm:text-3xl">
              &ldquo;De energie was voelbaar. Ons hele team liep naar buiten
              met concrete ideeën die we dezelfde week nog zijn gaan
              gebruiken.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-text-muted">
              <span className="font-semibold text-text">
                Judi van den Berg
              </span>{" "}
              · Category Manager, DA Drogist
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Prijzen */}
      <Section
        variant="alt"
        title={
          <>
            Kies wat past, <Em>of combineer beide</Em>.
          </>
        }
        sub="Alle bedragen exclusief BTW en reiskosten. Prijzen als vanaf-ankers; het definitieve voorstel stemmen we af op jullie situatie."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PRIJZEN.map((p, idx) => (
            <Reveal key={p.naam} delay={idx * 0.1}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  p.featured
                    ? "border-primary bg-bg-muted"
                    : "border-border bg-bg-card"
                }`}
              >
                <h3 className="font-display text-xl font-bold">{p.naam}</h3>
                <p className="mt-4">
                  <span className="font-display text-3xl font-bold">
                    {p.prijs}
                  </span>
                </p>
                <p className="mt-1 text-xs text-text-muted">{p.periode}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.punten.map((punt) => (
                    <li key={punt} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                        ✓
                      </span>
                      {punt}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  href="#aanvraag"
                  variant={p.featured ? "primary" : "ghost"}
                  className="mt-7 w-full"
                >
                  Vraag voorstel aan
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ: beantwoordt de vragen waarop gezocht wordt en levert via het
          FAQPage-schema onderaan kans op uitgebreide zoekresultaten. */}
      <Section
        id="faq"
        kicker="Veelgestelde vragen"
        title={
          <>
            Een AI spreker inhuren: <Em>wat je wil weten</Em>.
          </>
        }
      >
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {FAQ.map((f, i) => (
            <Reveal key={f.v} delay={Math.min(i, 3) * 0.05}>
              <details className="group py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-left font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg leading-snug">{f.v}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-text-muted">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Vraag een voorstel aan */}
      <Section
        id="voorstel"
        variant="alt"
        title={
          <>
            Vraag een <Em>voorstel op maat</Em> aan.
          </>
        }
        sub="Vul het formulier in en ontvang een vrijblijvend voorstel voor een lezing of workshop op maat."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <ul className="space-y-3">
                {VOORSTEL_PUNTEN.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-border bg-bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Liever even kort schakelen?
                </p>
                {/* Geen telefoonnummer in de HTML: deze pagina trekt betaald
                    verkeer en het nummer werd zo gratis buit voor scrapers. */}
                <a
                  href={site.whatsappNl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                >
                  <IconWhatsApp className="h-5 w-5" aria-hidden="true" />
                  Stuur een WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FilloutEmbed
              formId="sxmVnPbAUcus"
              title="Vraag een voorstel aan voor een lezing of workshop"
              meting="lezing_aanvraag_slot"
            />
          </Reveal>
        </div>
      </Section>

      {/* Deze pagina heeft geen header en is 13.000px lang: zonder vaste
          balk is er na de hero geen knop meer in beeld. */}
      <MobielCTA
        label="Vraag een voorstel aan"
        href="#voorstel"
        sub="Vrijblijvend, binnen 24 uur een reactie"
        meting="landing_lezing_balk"
        verbergBij="#voorstel"
      />
    </>
  );
}
