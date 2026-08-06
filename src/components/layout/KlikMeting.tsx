"use client";

import { useEffect } from "react";
import { kort, slug, stuurEvent } from "@/lib/analytics";

/**
 * Meet elke klik op een knop of link, met één gedelegeerde listener op het
 * document. Dat is bewust generiek: zo hoeft er niet bij elke CTA een
 * onClick-regel bij, en zijn nieuwe knoppen automatisch gemeten.
 *
 * Een knop kan zichzelf bijsturen met data-attributen:
 *   data-cta="hero_partnership"   machinenaam in plaats van de tekstslug
 *   data-cta-soort="hero"         categorie in plaats van de afgeleide
 *   data-geen-meting              helemaal niet meten
 *
 * Niet gemeten: elementen met data-geen-meting, en de scoreknoppen van de
 * quick scan (die hebben hun eigen events, anders tel je dubbel).
 */
export default function KlikMeting() {
  useEffect(() => {
    function opKlik(e: MouseEvent) {
      const doel = e.target as Element | null;
      if (!doel || typeof doel.closest !== "function") return;

      const el = doel.closest<HTMLElement>("a, button");
      if (!el) return;
      if (el.closest("[data-geen-meting]")) return;
      // De 1-tot-5 knoppen van de quick scan sturen hun eigen events.
      if (el.getAttribute("role") === "radio") return;

      const tekst = kort(el.innerText || el.getAttribute("aria-label") || "");
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") : null;

      // Categorie: expliciet, anders afgeleid uit waar het element staat.
      const expliciet = el.getAttribute("data-cta-soort");
      let soort = expliciet ?? "inline";
      if (!expliciet) {
        if (el.closest("header")) soort = "nav";
        else if (el.closest("footer")) soort = "footer";
        else if (href?.startsWith("mailto:")) soort = "mail";
        else if (href?.includes("wa.me")) soort = "whatsapp";
        else if (href?.includes("tidycal.com")) soort = "booking";
        else if (href && /^https?:/.test(href)) soort = "extern";
      }

      // Locatie: het pad plus de dichtstbijzijnde sectie met een id, of
      // anders de kop erboven. Zo zie je in GA4 welk blok de klik opleverde.
      const sectie = el.closest<HTMLElement>("section[id], div[id]");
      const kop = el
        .closest("section")
        ?.querySelector("h1, h2")
        ?.textContent;
      const deel = sectie?.id || (kop ? slug(kop, 24) : "");
      const locatie = deel
        ? `${window.location.pathname}#${deel}`
        : window.location.pathname;

      stuurEvent("cta_click", {
        naam: el.getAttribute("data-cta") || slug(tekst) || "onbekend",
        tekst,
        soort,
        locatie,
        bestemming: href ? kort(href, 200) : undefined,
        taal: document.documentElement.lang || "nl",
      });
    }

    // Capture-fase: ook meten als een handler de klik verderop stopt.
    document.addEventListener("click", opKlik, { capture: true });
    return () =>
      document.removeEventListener("click", opKlik, { capture: true });
  }, []);

  return null;
}
