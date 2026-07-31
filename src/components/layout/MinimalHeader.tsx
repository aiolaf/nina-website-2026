"use client";

import { useEffect, useState } from "react";
import { IconWhatsApp } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Chrome-arme header voor ads-landingspagina's: geen navigatie, geen link
 * weg van de pagina. Alleen het merk (niet-klikbaar) en een telefoonnummer
 * als laagdrempelig alternatief kanaal naast het formulier op de pagina.
 */
export default function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Vaste hoogte en leading-none: zonder dat verandert de doos van het
            woordmerk zodra Bricolage inlaadt, en schuift deze fixed header
            zichtbaar (CLS 0,14 op mobiel gemeten). */}
        <span className="font-display flex h-7 select-none items-center text-lg font-bold leading-none tracking-tight">
          NinA<span className="text-primary">&nbsp;AI</span>
        </span>
        {/* WhatsApp in plaats van het telefoonnummer: op deze pagina komt
            betaald verkeer binnen en stond het nummer als platte tekst in de
            HTML, wat het gratis oogst voor scrapers. Vaste maten houden de
            fixed header stabiel als het font inlaadt. */}
        <a
          href={site.whatsappNl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-[8.5rem] items-center justify-center gap-1.5 rounded-full border border-border text-sm leading-none text-text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <IconWhatsApp className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
