import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import MagneticButton from "@/components/ui/MagneticButton";
import ModellenOverzicht from "@/components/sections/ModellenOverzicht";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { datumNL, koers, type ModellenData } from "@/lib/modellen";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI-modellen vergeleken",
  description:
    "Live rankings van de beste AI-modellen, met prijzen per miljoen tokens in euro, snelheid en het verdict van NinA AI Agency. Dagelijks bijgewerkt.",
  alternates: alternatesVoor("/ai-modellen"),
};

/**
 * De data wordt bij de build van schijf gelezen, niet in de browser
 * opgehaald. De GitHub Action commit een nieuwe models.json en dat zet een
 * deploy in gang, dus de pagina is na elke run weer actueel, en de cijfers
 * staan meteen in de HTML in plaats van na een fetch.
 */
async function leesModellen(): Promise<ModellenData | null> {
  try {
    const ruw = await readFile(
      path.join(process.cwd(), "public", "data", "models.json"),
      "utf8"
    );
    const data = JSON.parse(ruw) as ModellenData;
    return Array.isArray(data?.modellen) ? data : null;
  } catch {
    // Ontbreekt het bestand of is het stuk, dan valt de pagina terug op een
    // nette melding. Een kapotte build door een databestand is erger dan
    // een pagina die even geen tabel toont.
    return null;
  }
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
            </p>
          </div>
        </div>
      </section>

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
