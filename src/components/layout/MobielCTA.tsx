"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONSENT_KEY } from "@/lib/consent";

type Props = {
  label: string;
  href: string;
  /** Kleine regel links van de knop, bijvoorbeeld "Binnen 24 uur reactie". */
  sub?: string;
  /** Machinenaam voor de klikmeting; zie KlikMeting. */
  meting: string;
  /**
   * Selector van het blok waar de bezoeker toch al converteert (het
   * formulier, de pakketten). Staat dat in beeld, dan verdwijnt de balk:
   * anders dekt hij precies af waar hij naartoe wijst.
   */
  verbergBij?: string;
  /** Vanaf hoeveel pixels scroll de balk verschijnt. */
  naVanaf?: number;
};

/**
 * Vaste conversiebalk onderaan, alleen op mobiel en tablet. Op de lange
 * pagina's (de ads-landing is 13.000px) was er na de hero geen enkele knop
 * meer in beeld, dus wie voorbij het formulier scrolde kon alleen nog terug.
 *
 * De balk blijft weg zolang de cookiebanner nog openstaat, want die staat
 * op dezelfde plek met een hogere z-index. De banner rendert null zodra er
 * een keuze in localStorage staat, dus we lezen diezelfde sleutel; bij elke
 * scroll opnieuw, zodat de balk verschijnt zodra de keuze gemaakt is.
 */
export default function MobielCTA({
  label,
  href,
  sub,
  meting,
  verbergBij,
  naVanaf = 600,
}: Props) {
  const [zichtbaar, setZichtbaar] = useState(false);
  const voorbijStart = useRef(false);
  const doelInBeeld = useRef(false);

  useEffect(() => {
    function heeftConsentKeuze() {
      try {
        return Boolean(localStorage.getItem(CONSENT_KEY));
      } catch {
        // Privémodus: de banner blijft dan staan, dus geen balk erbovenop.
        return false;
      }
    }

    function meet() {
      setZichtbaar(
        voorbijStart.current && !doelInBeeld.current && heeftConsentKeuze()
      );
    }

    /**
     * Geen scroll-listener maar een onzichtbaar bakentje op naVanaf pixels.
     * Twee redenen: een IntersectionObserver kost geen enkele frame op de
     * hoofdthread waar het scrollen langsloopt, en hij vuurt ook in een
     * tab die niet in beeld staat (requestAnimationFrame doet dat niet, wat
     * dit gedrag onmeetbaar maakte).
     */
    const baken = document.createElement("div");
    baken.setAttribute("aria-hidden", "true");
    baken.style.cssText = `position:absolute;top:${naVanaf}px;left:0;width:1px;height:1px;pointer-events:none;`;
    document.body.appendChild(baken);

    const ioStart = new IntersectionObserver(([entry]) => {
      voorbijStart.current =
        !entry.isIntersecting && entry.boundingClientRect.top < 0;
      meet();
    });
    ioStart.observe(baken);

    let ioDoel: IntersectionObserver | undefined;
    if (verbergBij) {
      const doel = document.querySelector(verbergBij);
      if (doel) {
        ioDoel = new IntersectionObserver(
          ([entry]) => {
            doelInBeeld.current = entry.isIntersecting;
            meet();
          },
          // Iets ruimer dan het blok zelf: de balk hoort al weg te zijn
          // voordat hij de bovenrand van het formulier raakt.
          { rootMargin: "0px 0px -120px 0px" }
        );
        ioDoel.observe(doel);
      }
    }

    // De cookiebanner kan vanuit de footer opnieuw open: dan de balk weg.
    function opHeropen() {
      setZichtbaar(false);
    }
    // De banner meldt zijn keuze niet, dus na elke klik opnieuw kijken of
    // er inmiddels een keuze staat. Eén vergelijking, geen meetwerk.
    function opKlik() {
      meet();
    }

    window.addEventListener("nina:open-consent", opHeropen);
    document.addEventListener("click", opKlik);
    return () => {
      ioStart.disconnect();
      ioDoel?.disconnect();
      baken.remove();
      window.removeEventListener("nina:open-consent", opHeropen);
      document.removeEventListener("click", opKlik);
    };
  }, [naVanaf, verbergBij]);

  const extern = href.startsWith("http");
  const naarAnker = href.startsWith("#");

  const knopClass = `whitespace-nowrap rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white ${
    sub ? "" : "flex-1 text-center"
  }`;

  /**
   * Een gewone hash-link zou hier over duizenden pixels smooth scrollen
   * (scroll-behavior: smooth staat op html), en dat duurt seconden. Vandaar
   * een directe sprong, met het pad in de URL zodat terug nog werkt.
   */
  function naarDoel() {
    const doel = document.querySelector(href);
    if (!doel) return;
    doel.scrollIntoView({ behavior: "auto", block: "start" });
    history.replaceState(null, "", href);
  }

  return (
    <div
      // aria-hidden zolang hij niet zichtbaar is, anders leest een
      // schermlezer een knop voor die visueel weggeschoven staat.
      aria-hidden={!zichtbaar}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        zichtbaar ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {sub && (
          <p className="min-w-0 flex-1 text-xs leading-snug text-text-muted">
            {sub}
          </p>
        )}
        {extern ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={meting}
            data-cta-soort="mobiele-balk"
            tabIndex={zichtbaar ? 0 : -1}
            className={knopClass}
          >
            {label}
          </a>
        ) : naarAnker ? (
          <button
            type="button"
            onClick={naarDoel}
            data-cta={meting}
            data-cta-soort="mobiele-balk"
            tabIndex={zichtbaar ? 0 : -1}
            className={knopClass}
          >
            {label}
          </button>
        ) : (
          <Link
            href={href}
            data-cta={meting}
            data-cta-soort="mobiele-balk"
            tabIndex={zichtbaar ? 0 : -1}
            className={knopClass}
          >
            {label}
          </Link>
        )}
      </div>
    </div>
  );
}
