"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * Aanmelden voor bericht bij nieuwe data, via SendFox.
 *
 * Waarom dit blok er is: het najaarsprogramma loopt tot eind oktober en de
 * rest van 2026 staat er nog niet. Iemand die in november wil komt nu één
 * keer langs en daarna nooit meer. Een mailadres achterlaten is de enige
 * manier om die bezoeker terug te krijgen, en het is de op één na
 * waardevolste actie op deze site — na een gekocht ticket.
 *
 * SendFox host het formulier zelf; wij hebben geen server, dus dit is de
 * enige manier waarop dit kan. Het script van SendFox zoekt bij het uitvoeren
 * zijn eigen <script>-element op en zet het formulier daar neer. Vandaar dat
 * we het met de hand in de doos hieronder hangen in plaats van het bovenaan
 * de pagina te laden: dan landt het formulier precies waar het hoort.
 *
 * Bewust géén cookiemuur eromheen. Dit is geen meting maar een formulier dat
 * de bezoeker zelf invult; het laadt dus ook als iemand statistieken heeft
 * geweigerd.
 */

/*
 * Het formulier-id uit de embed-snippet van SendFox. Gecontroleerd tegen het
 * account (Olaf Lemmens, olaf@nina-ai.nl): dit is formulier 292895,
 * "Newsletter signup", te vinden op sendfox.com/form/1re792/3qoqw6.
 *
 * Het vraagt alleen om een mailadres, met een verplicht toestemmingsvinkje
 * eronder. De knop heet daar al "Hou me op de hoogte" en de bevestiging
 * luidt "Dank voor je interesse, je hoort snel van ons over de volgende
 * workshop!" — die twee teksten wijzig je in SendFox, niet hier.
 */
const SENDFOX_FORM = "3qoqw6";

export default function Updates() {
  const doos = useRef<HTMLDivElement>(null);
  /* React kan een component twee keer aankoppelen (strict mode, of een
     navigatie heen en terug). Zonder deze vlag staat het formulier er dan
     twee keer. */
  const geladen = useRef(false);

  useEffect(() => {
    const el = doos.current;
    if (!el || geladen.current) return;
    geladen.current = true;

    const script = document.createElement("script");
    script.src = "https://cdn.sendfox.com/js/embed.js";
    script.async = true;
    script.setAttribute("data-form", SENDFOX_FORM);
    script.setAttribute("data-api", "https://sendfox.com");
    el.appendChild(script);
  }, []);

  return (
    <div className="kaart mx-auto max-w-2xl border border-border bg-bg-card p-7 sm:p-9">
      <p className="label-mono text-[11px] text-text-muted">
        Nieuwe data, één mail
      </p>
      <h3 className="display-serif mt-3 text-[1.7rem] leading-tight sm:text-[2rem]">
        Wil je bericht als er een datum bij komt?
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
        We plannen de data voor november en december binnenkort in. Laat je
        mailadres achter, dan hoor je het als eerste. Meer mail sturen we niet.
      </p>

      {/* Hier zet SendFox het formulier neer. Zonder JavaScript blijft de doos
          leeg en doet de mailregel eronder het werk. */}
      <div ref={doos} className="sendfox-doos mt-6" />

      <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-text-muted">
        Liever gewoon mailen? Dat mag ook:{" "}
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("Hou me op de hoogte van nieuwe workshopdata")}`}
          className="text-ink underline-offset-4 hover:text-violet hover:underline"
        >
          {site.email}
        </a>
        . Uitschrijven kan met één klik, en je adres gaat nergens anders heen.
      </p>
    </div>
  );
}
