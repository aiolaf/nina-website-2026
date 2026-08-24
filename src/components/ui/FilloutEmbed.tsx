"use client";

import { useEffect, useRef, useState } from "react";
import { stuurEvent } from "@/lib/analytics";

type Props = {
  formId: string;
  title: string;
  height?: number;
  className?: string;
  deferMs?: number;
  /**
   * Machinenaam voor de meting, bijvoorbeeld "lezing_aanvraag". Zonder deze
   * naam meten we op formId, wat in GA4 minder leesbaar is.
   */
  meting?: string;
};

const FILLOUT_ORIGIN = "https://form.fillout.com";

/**
 * Fillout-formulier, lazy gemount pas als de kaart in beeld komt (scheelt
 * een derde-partij iframe op de eerste paint). Het formulier voert zijn
 * eigen vaste donkere thema, onafhankelijk van deze pagina; dat stel je
 * bij in de Fillout-instellingen zelf, niet hier.
 *
 * deferMs: extra vertraging voor het iframe-request, alleen nodig als de
 * kaart al bij mount in beeld staat (hero). Zo strijdt de derde-partij
 * fetch niet met de kritieke lettertype-download om bandbreedte, wat op
 * getest mobiel (Lighthouse) zowel LCP als de font-swap CLS verlaagde.
 *
 * Verzendmeting: Fillout stuurt een postMessage naar de parent zodra iemand
 * het formulier afrondt. Het contract komt uit hun eigen embed-pakket
 * (@fillout/react): het iframe krijgt een fillout-embed-id mee, en de
 * boodschap heeft type "form_submit" met datzelfde embedId erin. We nemen
 * dat contract hier over in plaats van het pakket te installeren, zodat de
 * lazy mount en de deferMs-tuning blijven staan.
 *
 * Meegroeien: met fillout-embed-dynamic-resize=true in de URL meldt het
 * formulier zijn eigen hoogte via type "form_resized" met size in pixels.
 * Zonder dat scrolde je bínnen het iframe naar de verzendknop, en dat is op
 * een aanvraagformulier precies de knop die niet gemist mag worden. De
 * height-prop is daarmee de starthoogte, niet de eindhoogte.
 *
 * Origin en embedId checken we allebei: zonder die twee kan elke andere
 * iframe of tab een verzending faken, of de hoogte laten springen.
 */
export default function FilloutEmbed({
  formId,
  title,
  height = 560,
  className = "",
  deferMs = 0,
  meting,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /**
   * Eén id per gemonteerd formulier, zodat we onze eigen iframe herkennen.
   * Pas gezet in de observer-callback, niet tijdens render: Math.random
   * tijdens render is onzuiver en zou server en client laten verschillen.
   */
  const [embedId, setEmbedId] = useState<string>();

  /** Door het formulier zelf gemelde hoogte; undefined tot de eerste melding. */
  const [gemeldeHoogte, setGemeldeHoogte] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEmbedId(
            String(
              Math.floor(Math.random() * 8_999_999_999_999) + 1_000_000_000_000
            )
          );
          if (deferMs > 0) {
            timer = setTimeout(() => setVisible(true), deferMs);
          } else {
            setVisible(true);
          }
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [deferMs]);

  useEffect(() => {
    if (!visible || !embedId) return;
    let gemeld = false;

    function opBericht(e: MessageEvent) {
      if (e.origin !== FILLOUT_ORIGIN) return;
      const data = e.data as
        | { type?: string; embedId?: string; size?: unknown }
        | null
        | undefined;
      if (!data || typeof data !== "object") return;
      if (data.embedId !== embedId) return;

      if (data.type === "form_resized") {
        // Elke stap van het formulier meldt zijn eigen hoogte, dus dit komt
        // meerdere keren langs; steeds de laatste waarde volgen.
        if (typeof data.size === "number" && data.size > 0) {
          setGemeldeHoogte(data.size);
        }
        return;
      }

      if (data.type !== "form_submit") return;
      // Fillout kan bij een meerstapsformulier meer dan één keer melden.
      if (gemeld) return;
      gemeld = true;

      // generate_lead is een aanbevolen GA4-naam, dus je kunt hem in GA4 als
      // sleutelgebeurtenis markeren en naar Ads exporteren.
      stuurEvent("generate_lead", {
        naam: meting || formId,
        soort: "formulier",
        locatie: window.location.pathname,
        taal: document.documentElement.lang || "nl",
      });
    }

    window.addEventListener("message", opBericht);
    return () => window.removeEventListener("message", opBericht);
  }, [visible, embedId, formId, meting]);

  const src =
    `${FILLOUT_ORIGIN}/t/${formId}?v=2&fillout-embed-id=${embedId}` +
    `&fillout-embed-dynamic-resize=true`;

  const hoogte = gemeldeHoogte ?? height;

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[3px] border border-border ${className}`}
      // Voor de eerste hoogtemelding houdt de plaatshouder height vast, zodat
      // de pagina niet verschuift; daarna mag hij ook kleiner worden dan dat.
      style={{ minHeight: gemeldeHoogte ? undefined : height }}
    >
      {visible && embedId ? (
        <iframe
          src={src}
          title={title}
          allowFullScreen
          style={{
            width: "100%",
            height: hoogte,
            border: "none",
            display: "block",
            transition: "height 150ms ease",
          }}
        />
      ) : (
        <div
          className="flex items-center justify-center bg-bg-card text-sm text-text-muted"
          style={{ height }}
        >
          Formulier laden…
        </div>
      )}
    </div>
  );
}
