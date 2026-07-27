"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  formId: string;
  title: string;
  height?: number;
  className?: string;
  deferMs?: number;
};

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
 */
export default function FilloutEmbed({
  formId,
  title,
  height = 560,
  className = "",
  deferMs = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-border ${className}`}
      style={{ minHeight: height }}
    >
      {visible ? (
        <iframe
          src={`https://form.fillout.com/t/${formId}?v=2`}
          title={title}
          allowFullScreen
          style={{ width: "100%", height, border: "none", display: "block" }}
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
