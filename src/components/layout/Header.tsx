"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, navEn, cta, ctaEn, switchLangPath, type Lang } from "@/lib/site";

export default function Header({ lang = "nl" }: { lang?: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = lang === "en" ? navEn : nav;
  const action = lang === "en" ? ctaEn : cta;
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
        <Link
          href={home}
          className="font-display text-lg font-bold tracking-tight"
        >
          NinA<span className="text-primary"> AI</span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label={lang === "en" ? "Main navigation" : "Hoofdnavigatie"}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={action.href}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-deep hover:text-white"
          >
            {action.label}
          </Link>
          <Link
            href={switchHref}
            aria-label={
              lang === "en" ? "Bekijk in het Nederlands" : "View in English"
            }
            className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-primary"
          >
            {otherLang.toUpperCase()}
          </Link>
        </nav>

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
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
                pathname === item.href
                  ? "bg-bg-muted text-primary"
                  : "text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={action.href}
            className="mt-4 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
          >
            {action.label}
          </Link>
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
