import type { Metadata } from "next";
import Link from "next/link";
import ConsentHeropenen from "@/components/layout/ConsentHeropenen";
import { site } from "@/lib/site";

/**
 * Privacy op subdomeinniveau.
 *
 * Bewust geen tweede volledige privacyverklaring: die staat op nina-ai.nl en
 * twee versies naast elkaar lopen gegarandeerd uit elkaar. Deze pagina zegt
 * alleen wat er op déze site anders is — de betaling via Stripe — en
 * verwijst voor de rest door.
 */
export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Wat er met je gegevens gebeurt als je een workshopticket koopt bij NinA AI.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPagina() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:pt-36">
      <p className="label-mono text-[11.5px] text-text-muted">Privacy</p>
      <h1 className="display-serif mt-4 text-[2.4rem] leading-[1.05] sm:text-[3rem]">
        Wat er met je gegevens gebeurt
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-text-muted">
        Deze pagina gaat over deze site: het kopen van een workshopticket. De
        volledige privacyverklaring van NinA AI staat op{" "}
        <a
          href={`${site.hoofdsite}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline-offset-4 hover:text-violet hover:underline"
        >
          nina-ai.nl/privacy
        </a>
        .
      </p>

      <div className="mt-12 space-y-10">
        <div>
          <h2 className="font-display text-xl font-bold">Als je een ticket koopt</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            Het afrekenen gebeurt bij Stripe, niet hier. Je naam, mailadres,
            eventuele bedrijfsgegevens en de betaling zelf gaan rechtstreeks
            naar Stripe. Wij zien je betaalgegevens nooit; wij krijgen van
            Stripe je naam, mailadres en factuurgegevens door, zodat we je de
            voorbereiding kunnen sturen en weten wie er die dag komt.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            Stripe is onze verwerker en verwerkt gegevens ook buiten de EU,
            onder de standaardcontractbepalingen van de Europese Commissie. We
            bewaren de deelnemersgegevens zolang dat nodig is voor de workshop
            en de nazorg, en de facturatiegegevens zeven jaar, omdat de
            Belastingdienst dat van ons vraagt.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Als je mailt of appt</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            Dan bewaren we wat je stuurt zolang we ermee bezig zijn, en daarna
            voor zover we het nodig hebben om je vraag later terug te kunnen
            vinden. Voor een wachtlijst bewaren we je naam en mailadres tot de
            volgende datum bekend is, of tot je zegt dat het niet meer hoeft.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Meten op deze site</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            We gebruiken Google Tag Manager om te zien welke pagina&apos;s
            bezocht worden en welke workshops aanslaan. Zonder jouw
            toestemming mag daar niets voor worden opgeslagen: alles staat bij
            binnenkomst op geweigerd tot je in de cookiemelding kiest. Je keuze
            kun je altijd wijzigen.
          </p>
          <p className="mt-4">
            <ConsentHeropenen label="Cookievoorkeuren aanpassen →" />
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold">Je rechten</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            Je mag opvragen welke gegevens we van je hebben, ze laten
            corrigeren of laten verwijderen. Mail{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline-offset-4 hover:text-violet hover:underline"
            >
              {site.email}
            </a>{" "}
            en je krijgt binnen een week antwoord. Kom je er met ons niet uit,
            dan kun je terecht bij de Autoriteit Persoonsgegevens.
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          href="/"
          className="text-sm text-text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← Terug naar alle workshops
        </Link>
      </div>
    </section>
  );
}
