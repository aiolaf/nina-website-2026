"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_KEY, signalen, type ConsentKeuze } from "@/lib/consent";

/**
 * De cookiemelding. Overgenomen van nina-ai.nl, zodat een bezoeker die van
 * de hoofdsite komt dezelfde melding en dezelfde keuzes ziet.
 *
 * Of de melding getoond wordt hangt af van localStorage, en dat is een bron
 * buiten React. Daarom useSyncExternalStore en geen setState in een effect:
 * de opgeslagen keuze is de waarheid, dit component leest hem alleen uit.
 * Tijdens het bouwen (er is dan geen localStorage) doen we alsof er al een
 * keuze ligt, zodat de melding niet in de statische HTML terechtkomt en pas
 * na hydratie verschijnt bij wie nog moet kiezen.
 */

const GEWIJZIGD = "nina:consent-gewijzigd";

function abonneer(herbereken: () => void) {
  window.addEventListener(GEWIJZIGD, herbereken);
  /* Kiest iemand in een ander tabblad, dan hoeft de melding hier ook niet
     meer te staan. */
  window.addEventListener("storage", herbereken);
  return () => {
    window.removeEventListener(GEWIJZIGD, herbereken);
    window.removeEventListener("storage", herbereken);
  };
}

function heeftKeuze(): boolean {
  try {
    return Boolean(localStorage.getItem(CONSENT_KEY));
  } catch {
    /* Privémodus of opslag geblokkeerd: dan kunnen we geen keuze bewaren en
       is elke pageview er een zonder keuze. */
    return false;
  }
}

/** Stuurt de keuze naar Google Consent Mode en bewaart hem. */
function pasToe(analytics: boolean, marketing: boolean) {
  const keuze: ConsentKeuze = { analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(keuze));
  } catch {
    // Privémodus of opslag vol: de keuze geldt dan alleen deze sessie.
  }
  window.dataLayer = window.dataLayer || [];
  /* Consent Mode verwacht het arguments-object, geen losse array; daarom
     pushen we net zoals gtag.js zelf doet. */
  const push = (...args: unknown[]) => window.dataLayer!.push(args);
  push("consent", "update", signalen(keuze));
  push("set", "ads_data_redaction", !marketing);
  window.dataLayer.push({ event: "consent_keuze", analytics, marketing });
  window.dispatchEvent(new Event(GEWIJZIGD));
}

export default function CookieBanner() {
  const gekozen = useSyncExternalStore(abonneer, heeftKeuze, () => true);
  /* Los van de opgeslagen keuze: via de footer kun je de melding opnieuw
     openen. Een gemaakte keuze moet even eenvoudig terug te draaien zijn. */
  const [heropend, setHeropend] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const heropen = () => {
      setDetails(false);
      setHeropend(true);
    };
    window.addEventListener("nina:open-consent", heropen);
    return () => window.removeEventListener("nina:open-consent", heropen);
  }, []);

  const kies = useCallback((a: boolean, m: boolean) => {
    pasToe(a, m);
    setHeropend(false);
  }, []);

  const open = heropend || !gekozen;

  /*
   * Zolang de melding openstaat schuift de koopbalk onderin weg. Allebei
   * staan ze onderaan het scherm vastgezet, en op een telefoon steekt de
   * balk dan half onder de melding uit. Een data-attribuut op <html> in
   * plaats van gedeelde React-state: de twee componenten weten verder niets
   * van elkaar, en de regel die het afhandelt staat in globals.css.
   */
  useEffect(() => {
    const el = document.documentElement;
    if (open) el.dataset.consentOpen = "1";
    else delete el.dataset.consentOpen;
    return () => {
      delete el.dataset.consentOpen;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookievoorkeuren"
      className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5"
    >
      <div className="kaart mx-auto max-w-3xl border border-border bg-bg-card p-5 shadow-[0_20px_60px_rgba(12,14,24,0.22)] sm:p-6">
        <h2 className="display-serif text-lg">Cookies op deze site</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          We gebruiken cookies die nodig zijn om de site te laten werken. Met
          jouw toestemming meten we ook hoe de site gebruikt wordt en hoe onze
          advertenties presteren. Je kunt dit later altijd wijzigen. Meer
          hierover staat in de{" "}
          <Link
            href="/privacy"
            className="text-violet underline-offset-4 hover:underline"
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
                className="mt-1 h-4 w-4 shrink-0 accent-ink"
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
                className="mt-1 h-4 w-4 shrink-0 accent-ink"
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
                className="mt-1 h-4 w-4 shrink-0 accent-ink"
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
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
            >
              Keuze opslaan
            </button>
          ) : (
            <button
              type="button"
              onClick={() => kies(true, true)}
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
            >
              Alles accepteren
            </button>
          )}
          <button
            type="button"
            onClick={() => kies(false, false)}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-ink"
          >
            Alleen noodzakelijk
          </button>
          {!details && (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="text-sm text-text-muted underline-offset-4 hover:text-violet hover:underline sm:ml-auto"
            >
              Zelf instellen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
