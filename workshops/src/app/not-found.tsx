import Link from "next/link";
import PijlKnop from "@/components/ui/PijlKnop";

/**
 * Bij een statische export wordt hier 404.html van gemaakt. Apache serveert
 * die pas na de regel in .htaccess (zie DEPLOY-HOSTNET.md); zonder die regel
 * krijgt een bezoeker de standaardfoutpagina van de server te zien.
 *
 * Een verdwenen workshopdatum is de meest waarschijnlijke reden dat iemand
 * hier belandt, dus de knop wijst naar de agenda en niet naar de homepage.
 */
export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:pt-40">
      <p className="label-mono text-[11.5px] text-text-muted">404</p>
      <h1 className="display-serif mt-4 text-[2.4rem] leading-[1.05] sm:text-[3rem]">
        Deze pagina is er niet <em className="italic">meer</em>.
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-text-muted">
        Waarschijnlijk is de workshopdatum die je zocht geweest. De actuele
        data staan allemaal op de agenda.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <PijlKnop href="/#agenda">Bekijk alle data</PijlKnop>
        <Link
          href="/"
          className="rounded-full border border-ink/15 px-7 py-4 text-[15px] leading-none transition-colors hover:border-ink/35"
        >
          Naar de homepage
        </Link>
      </div>
    </section>
  );
}
