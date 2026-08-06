"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { stuurEvent } from "@/lib/analytics";

const DREMPELS = [25, 50, 75, 100] as const;

/**
 * Scrolldiepte per pagina: één event per drempel, nooit dubbel. GA4 meet zelf
 * alleen 90% via enhanced measurement, en dat zegt weinig over waar mensen
 * afhaken. Vandaar 25, 50, 75 en 100.
 *
 * Bij client-side navigatie (App Router) verandert het pad zonder herladen,
 * dus resetten we de gehaalde drempels op pathname.
 *
 * De meting hangt aan een rAF-gethrottelde scroll-listener met passive: true,
 * zodat hij niet met het scrollen concurreert.
 */
export default function ScrollDiepte() {
  const pathname = usePathname();
  const gehaald = useRef(new Set<number>());

  useEffect(() => {
    gehaald.current = new Set();
    let wachtOpFrame = false;

    function meet() {
      const doc = document.documentElement;
      const teScrollen = doc.scrollHeight - window.innerHeight;
      // Past de pagina in het scherm, dan is hij per definitie helemaal
      // gezien; anders zou 100% nooit vuren op korte pagina's.
      const procent =
        teScrollen <= 0
          ? 100
          : Math.round(((window.scrollY || doc.scrollTop) / teScrollen) * 100);

      for (const drempel of DREMPELS) {
        if (procent >= drempel && !gehaald.current.has(drempel)) {
          gehaald.current.add(drempel);
          stuurEvent("scroll_diepte", {
            waarde: drempel,
            locatie: window.location.pathname,
            soort: "scroll",
            taal: document.documentElement.lang || "nl",
          });
        }
      }
    }

    function opScroll() {
      if (wachtOpFrame) return;
      wachtOpFrame = true;
      requestAnimationFrame(() => {
        wachtOpFrame = false;
        meet();
      });
    }

    // Direct één meting: korte pagina's halen anders nooit een drempel.
    meet();
    window.addEventListener("scroll", opScroll, { passive: true });
    window.addEventListener("resize", opScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", opScroll);
      window.removeEventListener("resize", opScroll);
    };
  }, [pathname]);

  return null;
}
