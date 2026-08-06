"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, signalen, type ConsentKeuze } from "@/lib/consent";

/**
 * Stuurt de keuze naar Google Consent Mode en bewaart hem. Window.dataLayer
 * is al getypeerd door @next/third-parties, dus geen eigen declaratie.
 */
function pasToe(analytics: boolean, marketing: boolean) {
  const keuze: ConsentKeuze = { analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(keuze));
  } catch {
    // Privémodus of opslag vol: de keuze geldt dan alleen deze sessie.
  }
  window.dataLayer = window.dataLayer || [];
  // Consent Mode verwacht het arguments-object, geen losse array; daarom
  // pushen we net als gtag.js zelf doet.
  const push = (...args: unknown[]) =>
    window.dataLayer!.push(args as unknown as object);
  push("consent", "update", signalen(keuze));
  push("set", "ads_data_redaction", !marketing);
  window.dataLayer.push({ event: "consent_keuze", analytics, marketing });
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    let bestaat = false;
    try {
      bestaat = Boolean(localStorage.getItem(CONSENT_KEY));
    } catch {
      bestaat = false;
    }
    if (!bestaat) setOpen(true);

    // Vanuit de footer opnieuw te openen, zodat een keuze herroepbaar is.
    const heropen = () => {
      setDetails(false);
      setOpen(true);
    };
    window.addEventListener("nina:open-consent", heropen);
    return () => window.removeEventListener("nina:open-consent", heropen);
  }, []);

  if (!open) return null;

  function kies(a: boolean, m: boolean) {
    pasToe(a, m);
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookievoorkeuren"
      /* De keuze wordt al als consent_keuze gemeten, dus de generieke
         klikmeting slaat dit blok over. */
      data-geen-meting=""
      className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-bg-card p-5 shadow-[0_20px_60px_rgba(42,33,48,0.22)] sm:p-6">
        <h2 className="font-display text-lg font-bold">Cookies op deze site</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          We gebruiken cookies die nodig zijn om de site te laten werken. Met
          jouw toestemming meten we ook hoe de site gebruikt wordt en hoe onze
          advertenties presteren. Je kunt dit later altijd wijzigen. Meer
          hierover staat in de{" "}
          <Link
            href="/privacy"
            className="text-primary underline-offset-4 hover:underline"
          >
            privacyverklaring
          </Link>
          .
        </p>

        {details && (
          <fieldset className="mt-5 space-y-3 border-t border-border pt-4">
            <legend className="sr-only">Kies welke cookies je toestaat</legend>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked
                disabled
                readOnly
                id="c-nood"
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <label htmlFor="c-nood" className="text-sm">
                <span className="font-semibold">Noodzakelijk</span>
                <span className="block text-text-muted">
                  Nodig om de site te laten werken en om je keuze hier te
                  bewaren. Kan niet uit.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="c-analytics"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <label htmlFor="c-analytics" className="text-sm">
                <span className="font-semibold">Statistieken</span>
                <span className="block text-text-muted">
                  Welke pagina&apos;s bezocht worden, zodat we de site kunnen
                  verbeteren.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="c-marketing"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-primary"
              />
              <label htmlFor="c-marketing" className="text-sm">
                <span className="font-semibold">Marketing</span>
                <span className="block text-text-muted">
                  Meten of onze advertenties werken, en die relevanter maken.
                </span>
              </label>
            </div>
          </fieldset>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          {details ? (
            <button
              type="button"
              onClick={() => kies(analytics, marketing)}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
            >
              Keuze opslaan
            </button>
          ) : (
            <button
              type="button"
              onClick={() => kies(true, true)}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
            >
              Alles accepteren
            </button>
          )}
          <button
            type="button"
            onClick={() => kies(false, false)}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Alleen noodzakelijk
          </button>
          {!details && (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="text-sm text-text-muted underline-offset-4 hover:text-primary hover:underline sm:ml-auto"
            >
              Zelf instellen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
