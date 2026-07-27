import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import Section, { Em } from "@/components/ui/Section";
import FilloutEmbed from "@/components/ui/FilloutEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lezingen & Workshops",
  description:
    "Maak je organisatie AI Ready. Een prikkelende lezing en een hands-on workshop, op maat voor jullie sector en team.",
};

const MARKT = [
  {
    cijfer: "80%",
    tekst: "van de bedrijven heeft nog geen plan rondom AI",
  },
  {
    cijfer: "70%+",
    tekst: "tijdsbesparing mogelijk door AI slim in te zetten (McKinsey)",
  },
  {
    cijfer: "300M",
    tekst: "banen wereldwijd beïnvloed door AI (Goldman Sachs)",
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
    prijs: "EUR 2.250",
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
    prijs: "EUR 3.650",
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

export default function LezingenWorkshops() {
  return (
    <>
      {/* Hero: pitch + formulier direct zichtbaar, geen scroll nodig om te converteren */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:pb-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="reveal-now">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/70 px-4 py-1.5 text-xs font-medium text-text-muted backdrop-blur">
                Sessies beoordeeld met een{" "}
                <span className="font-semibold text-gold">9,3</span>
              </p>
              <h1 className="font-display max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Maak je organisatie <Em>AI Ready</Em>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Een prikkelende lezing en een hands-on workshop, op maat voor
                jullie sector en team. Vraag hiernaast een vrijblijvend
                voorstel aan.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="#aanvraag">
                  Vraag een voorstel aan
                </MagneticButton>
                <MagneticButton href="#aanbod" variant="ghost">
                  Bekijk het aanbod
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Vrijblijvend, binnen 24 uur een reactie.
              </p>
            </div>
            <div id="aanvraag" className="reveal-now [animation-delay:0.15s]">
              <FilloutEmbed
                formId="sxmVnPbAUcus"
                title="Vraag een voorstel aan voor een lezing of workshop"
                height={520}
                deferMs={250}
              />
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
                <span className="font-semibold text-text">EUR 2.250</span>{" "}
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
                Tijdens zijn lezingen merkte Olaf dat organisaties graag
                willen innoveren met AI, maar de handvatten missen. Die brug
                van kennis naar toepassing, dat is precies waar hij goed in
                is. Praktisch, prikkelend en altijd op maat.
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <p className="font-display text-2xl font-bold text-primary">
                    2.9M
                  </p>
                  <p className="text-sm text-text-muted">LinkedIn-bereik</p>
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

      {/* Vraag een voorstel aan */}
      <Section
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
                  Liever snel bellen?
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-1 block text-lg font-semibold text-primary hover:underline"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FilloutEmbed
              formId="sxmVnPbAUcus"
              title="Vraag een voorstel aan voor een lezing of workshop"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
