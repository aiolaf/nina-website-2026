"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Vaste header met precies één doel: de bezoeker bij de data krijgen.
 *
 * Daarom staan er maar drie links in. Dit is geen bedrijfssite met een
 * menu vol diensten; elke extra link is een afslag weg van de kassa. De
 * enige uitgaande link (naar nina-ai.nl) staat bewust pas in de footer.
 */
const LINKS = [
  { label: "Workshops", href: "/#workshops" },
  { label: "Alle data", href: "/#agenda" },
  { label: "Praktisch", href: "/#praktisch" },
];

export default function Header() {
  const [gescrold, setGescrold] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) =>
      setGescrold(!entry.isIntersecting)
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      /* Zolang de header transparant is staat hij op de homepage over een
         donkere fotohero, en dan moet het woordmerk licht zijn. Welke pagina
         dat is weet dit component niet — de header wordt vóór de inhoud
         gerenderd — dus de pagina zelf zet er een merkteken neer en de regel
         staat in globals.css. Zoek daar op #donkere-hero. */
      data-transparant={gescrold ? undefined : ""}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        gescrold
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Vaste hoogte plus leading-none: zonder dat verspringt de doos van
            het woordmerk zodra Bricolage inlaadt en schuift deze vaste
            header zichtbaar mee. */}
        <Link
          href="/"
          className="font-display flex h-7 select-none items-center text-lg font-bold leading-none tracking-tight"
        >
          NinA<span className="text-ink">&nbsp;AI</span>
          <span className="ml-2 hidden font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-text-muted sm:inline">
            Workshops
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#agenda"
            className="header-cta rounded-full bg-ink px-5 py-2.5 text-sm font-medium leading-none text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            Bekijk de data
          </Link>
        </nav>

        {/* Op mobiel geen hamburgermenu met een uitklaplaag, maar één knop
            die naar de agenda springt. Dat is waar de bezoeker heen wil. */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            className="rounded-full border border-border px-4 py-2 text-sm text-text-muted"
          >
            Menu
          </button>
          <Link
            href="/#agenda"
            className="header-cta rounded-full bg-ink px-4 py-2 text-sm font-medium leading-none text-white"
          >
            Data
          </Link>
        </div>
      </div>

      {open && (
        <nav
          id="mobiel-menu"
          className="border-t border-border bg-bg-card px-5 py-3 md:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-sm last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
