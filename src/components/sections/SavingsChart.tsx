"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = [
  { label: "Salesvoorstel schrijven", voor: 4, na: 1, unit: "uur per voorstel" },
  { label: "Factuurverwerking", voor: 14, na: 2, unit: "uur per week" },
  { label: "Aanvragen verwerken", voor: 48, na: 4, unit: "uur per week" },
];

// Alle rijen op dezelfde schaal, zodat 48 uur echt langer oogt dan 4 uur.
const MAX = Math.max(...ROWS.map((r) => r.voor));


/**
 * Balkgrafiek huidig vs met AI, gebaseerd op echte klantcijfers. Balken
 * groeien zodra de grafiek in beeld komt; onder reduced motion staan ze
 * direct in de eindstand. Waarden ook als tekst, dus zonder visuals leesbaar.
 */
export default function SavingsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Uren, voor en na</h3>
        <div className="flex items-center gap-4 text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#b3a68f]" />
            huidig
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            met AI
          </span>
        </div>
      </div>

      <div className="mt-6 flex-1 space-y-6">
        {ROWS.map((r, idx) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium">{r.label}</p>
              <p className="text-xs text-text-muted">
                {r.voor} →{" "}
                <span className="font-semibold text-primary">{r.na}</span>{" "}
                {r.unit}
              </p>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="h-3 overflow-hidden rounded-full bg-bg-alt">
                <div
                  className="h-full origin-left rounded-full bg-[#b3a68f] transition-transform duration-1000 ease-out"
                  style={{
                    width: `${Math.max((r.voor / MAX) * 100, 5)}%`,
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: `${idx * 140}ms`,
                  }}
                />
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-bg-alt">
                <div
                  className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#6b4227,#b0653a)] transition-transform duration-1000 ease-out"
                  style={{
                    width: `${Math.max((r.na / MAX) * 100, 3)}%`,
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: `${idx * 140 + 250}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-border pt-4 text-xs text-text-muted">
        Cijfers uit klantprojecten: Van Berkel Professionals, Wens Chalets en
        interne workflows.
      </p>
    </div>
  );
}
