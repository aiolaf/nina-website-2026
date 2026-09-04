import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import BedanktDetails from "@/components/sections/BedanktDetails";
import { site } from "@/lib/site";

/**
 * De success_url van Stripe. Deze pagina wordt alleen bereikt na een
 * geslaagde betaling, en daarmee is hij het conversiepunt van de hele site:
 * in Google Ads en GA4 stel je de conversie in op een paginaweergave van
 * /bedankt/. Zie STRIPE.md.
 *
 * Daarom staat er ook een `purchase`-event in de dataLayer. Het bedrag zit
 * er niet in: dat weten we hier niet zonder de betaling bij Stripe op te
 * halen, en dat kan niet zonder server. Wil je omzet in GA4 zien, koppel dan
 * Stripe rechtstreeks aan je meting; wil je alleen wéten dat er gekocht is,
 * dan is dit genoeg.
 */
export const metadata: Metadata = {
  title: "Je plek staat vast",
  description: "Bedankt voor je aanmelding voor een NinA AI workshop.",
  /* Nooit in de zoekresultaten: dit is geen pagina om binnen te komen. */
  robots: { index: false, follow: false },
};

export default function BedanktPagina() {
  return (
    <>
      <Script id="meet-aankoop" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'purchase',currency:'EUR'});`}
      </Script>

      <section className="mx-auto max-w-6xl px-5 pt-32 pb-20 sm:pt-36">
        <div className="reveal-now">
          <p className="label-mono text-[11.5px] text-text-muted">
            Betaling gelukt
          </p>
          <h1 className="display-serif mt-4 max-w-2xl text-[2.6rem] leading-[1.05] sm:text-[3.4rem]">
            Je plek is <em className="italic">geboekt</em>. Tot dan.
          </h1>

          <BedanktDetails />

          <div className="mt-10 max-w-xl border-t border-border pt-6">
            <h2 className="font-display text-lg font-bold">Wat er nu gebeurt</h2>
            <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-muted">
              <li className="flex gap-3">
                <span className="stempel shrink-0 text-text-muted">01</span>
                Je krijgt direct een bevestiging en de factuur per mail, van
                Stripe namens NinA AI.
              </li>
              <li className="flex gap-3">
                <span className="stempel shrink-0 text-text-muted">02</span>
                Een week vooraf mailen we je de voorbereiding: wat je installeert
                en welke taak je meeneemt.
              </li>
              <li className="flex gap-3">
                <span className="stempel shrink-0 text-text-muted">03</span>
                Twee weken na de workshop krijg je de uitnodiging voor het online
                vragenuur.
              </li>
            </ol>

            <p className="mt-6 text-sm text-text-muted">
              Klopt er iets niet, of wil je iemand anders sturen? Mail{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline-offset-4 hover:text-violet hover:underline"
              >
                {site.email}
              </a>
              .
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-sm text-text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              ← Terug naar alle workshops
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
