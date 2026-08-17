import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/ui/CountUp";
import ModellenOverzicht from "@/components/sections/ModellenOverzicht";
import PillButton from "@/components/ui/PillButton";
import Reveal from "@/components/ui/Reveal";
import {
  datumNL,
  duizendtal,
  koers,
  menselijkeMaat,
  rondAf,
  PAGINAS_PER_PDF,
  TOKENS_PER_WOORD,
  WOORDEN_PER_PAGINA,
} from "@/lib/modellen";
import { leesModellen } from "@/lib/modellen-server";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI-modellen vergeleken",
  description:
    "Live rankings van de beste AI-modellen, met prijzen per miljoen tokens in euro, snelheid en het verdict van NinA AI Agency. Dagelijks bijgewerkt.",
  alternates: alternatesVoor("/ai-modellen"),
};

export default async function AiModellenPage() {
  const data = await leesModellen();
  const bijgewerkt = datumNL(data?.laatstBijgewerkt);
  const koersDatum = datumNL(data?.wisselkoers?.datum ?? null);

  return (
    <>
      <Hero
        bijgewerkt={bijgewerkt}
        isoDatum={data?.laatstBijgewerkt ?? null}
        bronNaam={data?.bron?.naam ?? "Artificial Analysis"}
        bronUrl={data?.bron?.url ?? "https://artificialanalysis.ai"}
        koersWaarde={data?.wisselkoers?.koers ?? null}
        koersDatum={koersDatum}
      />

      <TokenUitleg />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:pb-28">
          {data && data.modellen.length > 0 ? (
            <ModellenOverzicht modellen={data.modellen} />
          ) : (
            <div className="kaart-glas p-12 text-center">
              <p className="text-text-muted">
                De modeldata is op dit moment niet beschikbaar. De lijst wordt
                dagelijks ververst en staat er bij de volgende update weer.
              </p>
            </div>
          )}
        </div>
      </section>

      <Afsluiter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({
  bijgewerkt,
  isoDatum,
  bronNaam,
  bronUrl,
  koersWaarde,
  koersDatum,
}: {
  bijgewerkt: string | null;
  isoDatum: string | null;
  bronNaam: string;
  bronUrl: string;
  koersWaarde: number | null;
  koersDatum: string | null;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Het ene langzame element dat mag doorlopen: een driftende violette
          gloed van 26 seconden achter de kop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="drift-traag absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(153,82,224,0.12),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-12 sm:pt-40">
        <div className="reveal-now max-w-4xl">
          <p className="label-mono text-text-muted">AI-modellen · live</p>
          <h1 className="kop-display mt-5">
            {/* Eén woord cursief voor nadruk: het patroon uit het
                huisstijldocument ("Legal work, without limits"). */}
            AI-modellen <em className="italic">vergeleken</em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-muted">
            Live rankings, prijzen in euro en het advies van NinA.
          </p>

          <p className="label-mono mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-text-muted">
            {bijgewerkt && isoDatum ? (
              <span>
                Bijgewerkt <time dateTime={isoDatum}>{bijgewerkt}</time>
              </span>
            ) : (
              <span>Bijgewerkt onbekend</span>
            )}
            <span aria-hidden="true">·</span>
            <a
              href={bronUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-onder"
            >
              {bronNaam}
            </a>
            {koersWaarde ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  1 USD = € {koers(koersWaarde)}
                  {koersDatum ? ` (${koersDatum})` : null}
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            {/* Klein gehouden: wie de bronregel leest is precies degene die
                wil weten hoe deze lijst is opgebouwd. */}
            <Link href="/ai-modellen/onderbouwing" className="link-onder">
              <span aria-hidden="true" className="mr-1">
                &#8627;
              </span>
              Onderbouwing
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Alle prijzen op deze pagina staan per miljoen tokens, en dat is voor
 * niemand een gevoelsmaat. Dit blok vertaalt het een keer naar tekst die je
 * kunt vasthouden, in het grote-statistiek-patroon: het cijfer enorm in de
 * serif, de eenheid eronder in mono.
 */
function TokenUitleg() {
  const maat = menselijkeMaat(1_000_000);
  const perPdf = PAGINAS_PER_PDF * WOORDEN_PER_PAGINA * TOKENS_PER_WOORD;

  // Via rondAf, dezelfde afronding op twee significante cijfers die de
  // kaarten gebruiken. Zonder dat stond er "598.802 woorden", en dat leest
  // als een meting in plaats van als de schatting die het is.
  const woorden = 1_000_000 / TOKENS_PER_WOORD;
  const cijfers: { waarde: number; eenheid: string; onder: string }[] = [
    { waarde: rondAf(woorden), eenheid: "woorden", onder: "Nederlandse tekst" },
    {
      waarde: rondAf(woorden / WOORDEN_PER_PAGINA),
      eenheid: "A4-pagina's",
      onder: `van ${WOORDEN_PER_PAGINA} woorden`,
    },
    {
      waarde: rondAf(woorden / WOORDEN_PER_PAGINA / PAGINAS_PER_PDF),
      eenheid: "pdf's",
      onder: `van ${PAGINAS_PER_PDF} pagina's`,
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <Reveal y={16}>
          <div className="kaart-glas px-7 py-9 sm:px-10 sm:py-11">
            <p className="label-mono text-text-muted">Wat je krijgt voor</p>
            <h2 className="kop-sectie mt-3">
              <span className="font-mono text-[0.55em] tracking-tight">1M</span>{" "}
              tokens
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-text-muted">
              De prijzen hieronder gelden per miljoen tokens. Een token is een
              stukje van een woord, dus dat getal zegt weinig.
            </p>

            <dl className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
              {cijfers.map((c) => (
                <div
                  key={c.eenheid}
                  className="border-t border-border pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dd className="font-serif text-[clamp(3rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.01em] text-text">
                    <CountUp to={Math.round(c.waarde)} />
                  </dd>
                  <dt className="label-mono mt-4 text-text">
                    {c.eenheid}{" "}
                    <span className="text-text-muted">{c.onder}</span>
                  </dt>
                </div>
              ))}
            </dl>

            {/* Het menselijke NinA-moment: één handgeschreven annotatie in
                violet, met een getal dat uit dezelfde constanten komt als
                de rest van de pagina. */}
            <p className="annotatie mt-9 text-xl leading-snug">
              een rapport van {PAGINAS_PER_PDF} pagina&apos;s is dus ruim{" "}
              {duizendtal(Math.round(perPdf / 1000) * 1000)} tokens
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-text-muted">
              Ruwe schatting, gerekend met ongeveer{" "}
              {TOKENS_PER_WOORD.toFixed(1).replace(".", ",")} token per
              Nederlands woord. Engelse tekst is zuiniger, dus daar komt er
              ongeveer een kwart meer in. Elk model telt bovendien net iets
              anders.{" "}
              <Link
                href="/ai-modellen/onderbouwing#tokens"
                className="link-onder text-text"
              >
                Zo komen we aan deze aannames
              </Link>
              .
            </p>
            <p className="sr-only">
              Een miljoen tokens is ongeveer {maat.woorden} woorden,{" "}
              {maat.paginas} A4-pagina&apos;s of {maat.pdfs} pdf&apos;s.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * De ene donkere merk-sectie van deze pagina, en daarmee het grote
 * violet-moment: gloed achter de kop, violette pill als afsluiter.
 */
function Afsluiter() {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="h-72 w-[36rem] -translate-y-16 rounded-full bg-[rgba(153,82,224,0.25)] blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
        <Reveal y={16}>
          <p className="label-mono text-[#a6a6a6]">AI Consult</p>
          <h2 className="kop-sectie mt-4 text-[#f2f2f2]">
            Twijfel je welk model past bij{" "}
            <em className="italic">jouw proces</em>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#a6a6a6]">
            Een benchmark vertelt je wie het snelst rekent, niet wat jouw
            organisatie nodig heeft. Wij kijken naar je proces, je data en je
            budget, en kiezen op basis daarvan.
          </p>
          <div className="mt-10 flex justify-center">
            <PillButton
              href="/contact"
              variant="merk"
              data-cta="ai_modellen_consult"
              data-cta-soort="slot"
            >
              Plan een AI Consult
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
