import type { Metadata } from "next";
import Link from "next/link";
import PijlKnop from "@/components/ui/PijlKnop";
import { site } from "@/lib/site";

/**
 * De cancel_url van Stripe: hier komt iemand terecht die op het betaalscherm
 * op "terug" klikt.
 *
 * Dat is geen fout en dus ook geen foutpagina. Meestal is er iets praktisch
 * aan de hand — verkeerde datum, wil eerst met een collega overleggen, wil
 * op factuur betalen. Die drie routes staan hier alle drie, want dit is het
 * laatste moment waarop we die bezoeker nog kunnen helpen.
 */
export const metadata: Metadata = {
  title: "Betaling afgebroken",
  robots: { index: false, follow: false },
};

export default function AfgebrokenPagina() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-32 pb-20 sm:pt-36">
      <div className="reveal-now max-w-2xl">
        <p className="label-mono text-[11.5px] text-text-muted">
          Er is niets afgeschreven
        </p>
        <h1 className="display-serif mt-4 text-[2.4rem] leading-[1.05] sm:text-[3.1rem]">
          Je plek is nog <em className="italic">vrij</em>.
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-text-muted">
          De betaling is afgebroken, dus er is niets in rekening gebracht. Wil
          je het opnieuw proberen, of liep je ergens tegenaan?
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PijlKnop href="/#agenda" data-cta="afgebroken-agenda">
            Terug naar de data
          </PijlKnop>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/15 px-7 py-4 text-[15px] leading-none transition-colors hover:border-ink/35"
          >
            Stel je vraag via WhatsApp
          </a>
        </div>

        <div className="mt-12 space-y-5 border-t border-border pt-8">
          <div>
            <h2 className="font-display text-lg font-bold">
              Wil je liever op factuur betalen?
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">
              Dat kan. Mail{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline-offset-4 hover:text-violet hover:underline"
              >
                {site.email}
              </a>{" "}
              met de workshop, de datum en de factuurgegevens, dan sturen we je
              een factuur en houden we de plek vast.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">
              Twijfel je over welke workshop past?
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">
              Schrijf ons wat voor werk je doet en waar je nu vastloopt, dan
              zeggen we welke past, of dat er geen bij zit.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">
              Kom je met meerdere collega&apos;s?
            </h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">
              Vanaf vier personen is een besloten sessie meestal voordeliger en
              nuttiger.{" "}
              <a
                href={`${site.hoofdsite}/lezingen-workshops`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline-offset-4 hover:text-violet hover:underline"
              >
                Vraag een voorstel aan
              </a>
              .
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm text-text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← Terug naar de homepage
        </Link>
      </div>
    </section>
  );
}
