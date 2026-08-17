import type { Metadata } from "next";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import ModellenOverzicht from "@/components/sections/ModellenOverzicht";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import {
  datumNL,
  koers,
  menselijkeMaat,
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

/**
 * Alle prijzen op deze pagina staan per miljoen tokens, en dat is voor
 * niemand een gevoelsmaat. Dit blok vertaalt het een keer naar tekst die je
 * kunt vasthouden, zodat de kaarten daarna met tokens toe kunnen.
 */
function TokenUitleg() {
  const maat = menselijkeMaat(1_000_000);
  // Apostrofs staan hier in gewone strings en niet los in de JSX, want daar
  // struikelt react/no-unescaped-entities over.
  const eenheden = [
    {
      waarde: maat.woorden,
      eenheid: "woorden",
      toelichting: "Nederlandse tekst",
    },
    {
      waarde: maat.paginas,
      eenheid: "A4-pagina's",
      toelichting: `van ${WOORDEN_PER_PAGINA} woorden`,
    },
    {
      waarde: maat.pdfs,
      eenheid: "pdf's",
      toelichting: `van ${PAGINAS_PER_PDF} pagina's`,
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-2xl border border-border bg-bg-card/60 p-6 backdrop-blur-md sm:p-7">
          <h2 className="font-display text-lg font-bold">
            Wat is een miljoen tokens?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            De prijzen hieronder gelden per miljoen tokens. Een token is een
            stukje van een woord, dus dat getal zegt weinig. Dit krijg je er
            ongeveer voor:
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            {eenheden.map((e) => (
              <div
                key={e.eenheid}
                className="rounded-xl border border-border bg-bg-muted/40 px-4 py-3"
              >
                <dd className="font-mono text-2xl font-semibold text-text">
                  {e.waarde}
                </dd>
                <dt className="mt-0.5 text-sm text-text">
                  {e.eenheid}{" "}
                  <span className="text-text-muted">{e.toelichting}</span>
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            Ruwe schatting, gerekend met ongeveer{" "}
            {TOKENS_PER_WOORD.toFixed(1).replace(".", ",")} token per
            Nederlands woord. Engelse tekst is zuiniger, dus daar komt er
            ongeveer een kwart meer in. Elk model telt bovendien net iets
            anders.{" "}
            <Link
              href="/ai-modellen/onderbouwing#tokens"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary-light"
            >
              Zo komen we aan deze aannames
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function AiModellenPage() {
  const data = await leesModellen();
  const bijgewerkt = datumNL(data?.laatstBijgewerkt);
  const koersDatum = datumNL(data?.wisselkoers?.datum ?? null);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(153,82,224,0.16),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-10 sm:pt-32">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Live overzicht
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              AI-modellen <Em>vergeleken</Em>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Live rankings, prijzen in euro en het advies van NinA.
            </p>
            <p className="mt-6 text-sm text-text-muted">
              {bijgewerkt ? (
                <>
                  Laatst bijgewerkt:{" "}
                  <time dateTime={data!.laatstBijgewerkt}>{bijgewerkt}</time>
                </>
              ) : (
                "Laatst bijgewerkt: onbekend"
              )}
              {" · "}
              Bron:{" "}
              <a
                href={data?.bron?.url ?? "https://artificialanalysis.ai"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-primary-light"
              >
                {data?.bron?.naam ?? "Artificial Analysis"}
              </a>
              {data?.wisselkoers?.koers ? (
                <>
                  {" · "}
                  <span className="font-mono">
                    1 USD = € {koers(data.wisselkoers.koers)}
                  </span>
                  {koersDatum ? ` (${koersDatum})` : null}
                </>
              ) : null}
              {" · "}
              {/* Bewust klein gehouden: wie de bronregel leest is precies
                  degene die wil weten hoe deze lijst is opgebouwd. */}
              <Link
                href="/ai-modellen/onderbouwing"
                className="underline underline-offset-4 transition-colors hover:text-primary-light"
              >
                Onderbouwing
              </Link>
            </p>
          </div>
        </div>
      </section>

      <TokenUitleg />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:pb-24">
          {data && data.modellen.length > 0 ? (
            <ModellenOverzicht modellen={data.modellen} />
          ) : (
            <div className="rounded-2xl border border-border bg-bg-card/70 p-10 text-center backdrop-blur-md">
              <p className="text-text-muted">
                De modeldata is op dit moment niet beschikbaar. De lijst wordt
                dagelijks ververst en staat er bij de volgende update weer.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,82,224,0.14),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Twijfel je welk model past bij jouw proces?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Een benchmark vertelt je wie het snelst rekent, niet wat jouw
              organisatie nodig heeft. Wij kijken naar je proces, je data en je
              budget, en kiezen op basis daarvan.
            </p>
            <div className="mt-9 flex justify-center">
              <MagneticButton
                href="/contact"
                data-cta="ai_modellen_consult"
                data-cta-soort="slot"
              >
                Plan een AI Consult
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
