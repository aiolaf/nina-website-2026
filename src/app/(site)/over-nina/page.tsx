import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import CtaSection from "@/components/sections/CtaSection";
import { alternatesVoor, site } from "@/lib/site";
import TeamRij from "@/components/sections/TeamRij";

export const metadata: Metadata = {
  alternates: alternatesVoor("/over-nina"),
  title: "Over NinA AI",
  description:
    "NinA AI Agency helpt organisaties om van AI-kennis naar werkende AI-agents te gaan. Praktisch boven hype, mens plus machine.",
};

const WAARDEN = [
  {
    titel: "Praktisch boven hype",
    tekst:
      "Geen AI voor de show. Elke toepassing moet iets opleveren: tijd, geld of minder rotwerk, meetbaar gemaakt.",
  },
  {
    titel: "Mens + machine",
    tekst:
      "AI maakt mensen productiever, het vervangt ze niet. Human in the loop is bij ons een ontwerpprincipe, geen bijzin.",
  },
  {
    titel: "Toegankelijke AI",
    tekst:
      "Werkende AI hoort niet alleen bij tech-giants. Wij maken het bereikbaar voor het Nederlandse MKB en mid-market.",
  },
  {
    titel: "Transparant en verantwoord",
    tekst:
      "Privacy en veiligheid voorop. EU-hosting in Amsterdam, eigen IP voor de klant, geen lock-in.",
  },
];

const ROLLEN = [
  "Strategen",
  "Prompt-engineers",
  "AI Developers",
  "Adviseurs",
];

export default function OverNina() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-24">
          <div className="reveal-now">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Over NinA AI Agency
            </p>
            <h1 className="display-serif max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
              Wij zorgen dat AI bij jullie <Em>echt gebruikt wordt</Em>.
            </h1>
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              tien specialisten, één team
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Te veel Nederlandse bedrijven blijven achter in de
              AI-revolutie. Niet omdat ze niet willen, maar omdat AI complex,
              duur en ontoegankelijk lijkt. Daar doen wij wat aan, met de
              ambitie om de grootste AI-agency van Nederland te worden.
            </p>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        kicker="Onze missie"
        title={
          <>
            Van AI-kennis naar <Em>werkende AI-agents</Em>.
          </>
        }
        sub="NinA AI Agency helpt organisaties om van AI-kennis naar werkende AI-agents te gaan. Vanuit Amsterdam, sinds 2024. Opgericht door Olaf Lemmens, die tijdens zijn lezingen merkte dat organisaties wel met AI willen, maar niet weten waar ze moeten beginnen. Dat is wat we elke dag doen: van plan naar iets dat een team ook echt gebruikt."
      />

      <Section
        title={
          <>
            Vier principes die <Em>elk project</Em> sturen.
          </>
        }
      >
        <div className="grid gap-x-14 sm:grid-cols-2">
          {WAARDEN.map((w, idx) => (
            <Reveal key={w.titel} delay={idx * 0.08}>
              <div className="border-t border-border py-6">
                <h3 className="font-display text-lg font-bold">{w.titel}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  {w.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        variant="alt"
        title={
          <>
            De specialisten die AI <Em>echt laten werken</Em>.
          </>
        }
        sub="In huis: strategen, prompt-engineers, AI developers en adviseurs, plus een flexibele schil van partners. Samen kennen we 100+ AI-tools, en wat in een sessie ontstaat kunnen we daarna ook echt bouwen."
      >
        <Reveal>
          <Image
            src="/images/foto-team.webp"
            alt="Het NinA-team tijdens een teamuitje in een game-hal"
            width={1200}
            height={800}
            className="w-full rounded-[3px] border border-border object-cover shadow-[0_20px_60px_rgba(12,14,24,0.12)]"
          />
        </Reveal>

        {/* Het hele team met naam en functie: dit is de pagina waar iemand
            komt kijken wie er achter NinA zit, dus hier de grootste versie. */}
        <Reveal delay={0.08}>
          <div className="mt-12">
            <TeamRij variant="uitgebreid" />
          </div>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-2.5">
          {ROLLEN.map((r) => (
            <li
              key={r}
              className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted"
            >
              {r}
            </li>
          ))}
          <li className="rounded-full border border-primary/50 bg-bg-muted px-4 py-1.5 text-sm text-primary">
            + flexibele schil en partners
          </li>
        </ul>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-[3px] border border-border bg-bg-card p-7 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <Image
                src="/images/olaf-profile.webp"
                alt="Olaf Lemmens"
                width={64}
                height={64}
                className="hidden shrink-0 rounded-full border border-border sm:block"
              />
              <div>
                <h3 className="font-display text-lg font-bold">
                  Dagelijkse AI-inzichten van Olaf Lemmens
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
                  {/* Het bereikcijfer is er eerder overal uit gehaald; hier
                      stond het nog uitgeschreven en daardoor buiten het
                      zoekbereik van die opruimronde. */}
                  Als oprichter van NinA AI Agency deelt Olaf dagelijks
                  praktische AI-inzichten op LinkedIn. Genomineerd als AI
                  Person of the Year. Hij staat regelmatig op podia:{" "}
                  <Link
                    href="/lezingen-workshops"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Olaf als AI spreker inhuren
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="mt-5 flex shrink-0 flex-col gap-3 sm:mt-0">
              <MagneticButton href={site.linkedinOlaf} variant="ghost">
                Volg op LinkedIn
              </MagneticButton>
              <MagneticButton href={site.newsletter} variant="ghost">
                AI nieuwsbrief
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaSection
        title="Kom koffie drinken in Amsterdam."
        sub="Of plan een videocall van 15 minuten. We denken graag mee, ook als het nog geen project is."
      />
    </>
  );
}
