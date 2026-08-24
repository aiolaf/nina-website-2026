"use client";

import { useLayoutEffect, useRef, useState } from "react";

const STAPPEN = [
  {
    taak: "Aanvraag komt binnen per mail",
    oud: "Medewerker leest en sorteert handmatig",
    nieuw: "Agent leest mail en bijlagen direct",
  },
  {
    taak: "Gegevens overnemen",
    oud: "Overtypen in het systeem, foutgevoelig",
    nieuw: "Automatisch geëxtraheerd en ingevoerd",
  },
  {
    taak: "Beoordelen op relevantie",
    oud: "Ervaring nodig, wisselt per persoon",
    nieuw: "Consistente beoordeling, mens keurt goed",
  },
  {
    taak: "Terugkoppeling versturen",
    oud: "Standaardmail handmatig opstellen",
    nieuw: "Conceptantwoord staat klaar",
  },
  {
    taak: "Archiveren en rapporteren",
    oud: "Aan het eind van de week, als er tijd is",
    nieuw: "Realtime bijgewerkt dashboard",
  },
];

// Moet gelijk zijn aan de top-offset van de sticky wrapper (top-20 = 5rem).
const STICKY_OFFSET = 80;
// Extra scrollruimte per stap om het kantel-moment te spreiden, in px.
const SCROLL_PER_STEP = 110;

/**
 * Scroll-gestuurde transformatie: dezelfde workflow kantelt stap voor stap
 * van handmatig naar AI-ondersteund terwijl je door de sectie scrolt.
 * Sticky paneel binnen een track die exact zo hoog is als de content plus
 * een vaste scrollruimte per stap: de animatie is precies klaar op het
 * moment dat de pin loslaat, dus geen dode scrollruimte erna.
 * Reduced motion: alles direct in de eindstand.
 */
export default function WorkflowCompare() {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [trackHeight, setTrackHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setProgress(1);
      return;
    }
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    const dist = STAPPEN.length * SCROLL_PER_STEP;

    const measure = () => {
      setTrackHeight(content.offsetHeight + dist);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(content);

    const update = () => {
      const rect = track.getBoundingClientRect();
      const p = (STICKY_OFFSET - rect.top) / dist;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    update();
    // Geen scroll-listener: een IntersectionObserver met een fijnmazige
    // threshold-reeks vuurt terwijl de track door de viewport schuift en
    // is ruim genoeg voor vijf discrete stappen.
    const io = new IntersectionObserver(update, {
      threshold: Array.from({ length: 41 }, (_, i) => i / 40),
    });
    io.observe(track);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const doneCount = Math.floor(progress * (STAPPEN.length + 0.999));

  return (
    <div
      ref={trackRef}
      style={reduced || trackHeight === null ? undefined : { height: trackHeight }}
      className="relative"
    >
      <div ref={contentRef} className={reduced ? "" : "sticky top-20"}>
        <div className="mb-6 flex items-center justify-between rounded-[3px] border border-border bg-bg-card px-5 py-4">
          <span className="text-sm font-semibold">
            {doneCount >= STAPPEN.length
              ? "Workflow volledig AI-ondersteund"
              : doneCount === 0
                ? "Huidige workflow, volledig handmatig"
                : "AI neemt het over, stap voor stap"}
          </span>
          <div className="flex items-center gap-3">
            <div
              className="h-1.5 w-28 overflow-hidden rounded-full bg-bg-muted sm:w-44"
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Voortgang van handmatig naar AI-ondersteund"
            >
              <div
                className="h-full rounded-full bg-primary-light transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="w-14 text-right font-display text-sm font-bold text-gold">
              {doneCount}/{STAPPEN.length}
            </span>
          </div>
        </div>

        <ol className="space-y-3">
          {STAPPEN.map((s, idx) => {
            const done = idx < doneCount;
            return (
              <li
                key={s.taak}
                className={`grid gap-2 rounded-[3px] border p-4 transition-[border-color,background-color,opacity,transform] duration-300 sm:grid-cols-[1fr_1.2fr] sm:items-center sm:gap-6 sm:p-5 ${
                  done
                    ? "border-primary/50 bg-bg-muted"
                    : "scale-[0.99] border-border bg-bg-card"
                }`}
              >
                <p className="text-sm font-semibold sm:text-base">{s.taak}</p>
                <div className="relative min-h-10 text-sm">
                  <span className={done ? "hidden" : "block text-text-muted"}>
                    {s.oud}
                  </span>
                  <span
                    className={`items-start gap-2 text-primary ${
                      done ? "flex" : "hidden"
                    }`}
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px]">
                      ✓
                    </span>
                    {s.nieuw}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
