"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  nav,
  navEn,
  cta,
  ctaEn,
  ctaKort,
  ctaKortEn,
  switchLangPath,
  site,
  type Lang,
} from "@/lib/site";

export default function Header({ lang = "nl" }: { lang?: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = lang === "en" ? navEn : nav;
  const action = lang === "en" ? ctaEn : cta;
  // Desktopbalk gebruikt het korte label, het mobiele menu heeft de ruimte
  // voor het volledige.
  const actionKort = lang === "en" ? ctaKortEn : ctaKort;

  /**
   * Staat de bezoeker op de partnershippagina, dan boekt de headerknop op het
   * partnership-boekingstype. Zelfde gesprek, maar in de agenda is dan te zien
   * waar de aanvraag vandaan komt, net als bij de knoppen in de pagina zelf.
   */
  const opPartnership = pathname.endsWith("/ai-partnership");
  const boekHref = opPartnership ? site.bookingPartnership : action.href;
  const home = lang === "en" ? "/en" : "/";
  const otherLang: Lang = lang === "en" ? "nl" : "en";
  const switchHref = switchLangPath(pathname, otherLang);

  useEffect(() => {
    // Sentinel bovenaan de body (zie layout.tsx): uit beeld = gescrold.
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-bg/85 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Wordmerk in de display-serif van de huisstijl "Licht": de "AI"
            cursief in plaats van in een accentkleur. Violet blijft daarmee
            vrij voor het ene merk-moment per scherm. */}
        <Link
          href={home}
          className="display-serif flex h-7 items-center text-[22px] leading-none"
        >
          NinA<em className="italic">&nbsp;AI</em>
        </Link>

        <nav
          /* Op precies 1024px is de balk het krapst: logo 62px plus de nav
             moet binnen 984px blijven. Met gap-3.5 houdt hij ~30px over,
             vanaf xl is er ruimte voor de normale gap-5. */
          className="hidden items-center gap-3.5 lg:flex xl:gap-5"
          aria-label={lang === "en" ? "Main navigation" : "Hoofdnavigatie"}
        >
          {items.map((item) =>
            /* Het hoofdproduct krijgt een omlijnd accent, de rest blijft
               platte tekst. Zo valt het partnership op zonder dat de nav
               een rij knoppen wordt. */
            item.uitgelicht ? (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  pathname === item.href
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/40 text-primary hover:border-primary hover:bg-primary/10"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-sm transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-text-muted"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          {/* Externe boekingspagina, dus een gewone anchor met target en rel
              in plaats van next/link. */}
          <a
            href={boekHref}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-deep hover:text-white xl:px-5"
            data-cta="header_kennismaking"
          >
            {actionKort.label}
          </a>
          <Link
            href={switchHref}
            aria-label={
              lang === "en" ? "Bekijk in het Nederlands" : "View in English"
            }
            hrefLang={otherLang}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-primary"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {otherLang === "en" ? "🇬🇧" : "🇳🇱"}
            </span>
            {otherLang.toUpperCase()}
          </Link>
        </nav>

        {/* Taalwissel naast de hamburger. Stond eerder alleen ín het
            uitgeklapte menu, waardoor je op mobiel niet kon zien dat er een
            Engelse versie bestaat. */}
        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            aria-label={
              lang === "en"
                ? "Bekijk deze pagina in het Nederlands"
                : "View this page in English"
            }
            className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {otherLang === "en" ? "🇬🇧" : "🇳🇱"}
            </span>
            {otherLang.toUpperCase()}
          </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={
            open
              ? lang === "en"
                ? "Close menu"
                : "Menu sluiten"
              : lang === "en"
                ? "Open menu"
                : "Menu openen"
          }
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label={lang === "en" ? "Mobile navigation" : "Mobiele navigatie"}
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-t border-border bg-bg px-5 py-6 lg:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-3 text-lg font-medium ${
                item.uitgelicht
                  ? "border border-primary/40 font-semibold text-primary"
                  : pathname === item.href
                    ? "bg-bg-muted text-primary"
                    : "text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={boekHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
          >
            {action.label}
          </a>
          <Link
            href={switchHref}
            className="mt-2 rounded-lg px-3 py-3 text-sm font-medium text-text-muted"
          >
            {lang === "en" ? "🇳🇱 Nederlands" : "🇬🇧 English"}
          </Link>
        </nav>
      )}
    </header>
  );
}
