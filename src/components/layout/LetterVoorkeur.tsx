"use client";

import { useEffect } from "react";

/**
 * Tijdelijke letterschakelaar voor de keuze tussen de twee kandidaat-display
 * letters: /?letter=zodiak of /?letter=sentient. Zet data-letter op <html>,
 * waar globals.css de juiste familie aan hangt.
 *
 * Leest de query bewust uit window.location en niet met useSearchParams: dat
 * laatste dwingt een Suspense-grens af rond de hele layout en zet alle
 * pagina's op dynamisch renderen. Dit hoort eruit zodra Olaf gekozen heeft.
 */
export default function LetterVoorkeur() {
  useEffect(() => {
    const keuze = new URLSearchParams(window.location.search).get("letter");
    if (keuze === "zodiak" || keuze === "sentient") {
      document.documentElement.dataset.letter = keuze;
    }
  }, []);

  return null;
}
