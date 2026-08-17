"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Gesimuleerde AI-agent: een e-mailaanvraag komt binnen, de agent leest,
 * extraheert, classificeert en levert het resultaat. Geen echte API-call,
 * wel het gevoel van live werking. Start zodra de sectie in beeld komt;
 * onder prefers-reduced-motion staat direct het eindresultaat.
 */

const EMAIL_TEXT = `Onderwerp: Aanvraag offerte, project Rijnhaven

Goedemiddag,

In de bijlage vinden jullie de specificaties (PDF, 14 pagina's).
Graag voor vrijdag een terugkoppeling of jullie capaciteit hebben.

Met vriendelijke groet,
J. van Dam`;

const STEPS = [
  { label: "E-mail ontvangen", detail: "inbox: aanvragen@" },
  { label: "PDF-bijlage gelezen", detail: "14 pagina's, specificaties herkend" },
  { label: "Gegevens geëxtraheerd", detail: "project, deadline, contactpersoon" },
  { label: "Relevantie beoordeeld", detail: "match met dienstenaanbod: hoog" },
  { label: "Opgeslagen in systeem", detail: "CRM bijgewerkt, taak aangemaakt" },
];

const RESULT = [
  { k: "Project", v: "Rijnhaven" },
  { k: "Deadline", v: "vrijdag" },
  { k: "Relevantie", v: "Hoog" },
  { k: "Actie", v: "Taak aangemaakt" },
];

type Phase = "idle" | "typing" | "processing" | "done";

export default function AgentDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [stepsDone, setStepsDone] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback(() => {
    clearTimers();
    setTyped(0);
    setStepsDone(0);
    setPhase("typing");

    const typeDuration = 1800;
    const chunk = Math.ceil(EMAIL_TEXT.length / (typeDuration / 30));
    let i = 0;
    const typeTick = () => {
      i += chunk;
      setTyped(Math.min(i, EMAIL_TEXT.length));
      if (i < EMAIL_TEXT.length) {
        timers.current.push(setTimeout(typeTick, 30));
      } else {
        setPhase("processing");
        STEPS.forEach((_, idx) => {
          timers.current.push(
            setTimeout(() => {
              setStepsDone(idx + 1);
              if (idx === STEPS.length - 1) {
                timers.current.push(setTimeout(() => setPhase("done"), 350));
              }
            }, 550 * (idx + 1))
          );
        });
      }
    };
    typeTick();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(EMAIL_TEXT.length);
      setStepsDone(STEPS.length);
      setPhase("done");
      return;
    }

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [run]);

  return (
    <div
      ref={rootRef}
      className="grid gap-4 lg:grid-cols-[1.2fr_1fr]"
      aria-label="Gesimuleerd voorbeeld van een AI-agent die een e-mailaanvraag verwerkt"
    >
      {/* Inkomende e-mail */}
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-bg-muted" />
          <span className="h-3 w-3 rounded-full bg-bg-muted" />
          <span className="h-3 w-3 rounded-full bg-bg-muted" />
          <span className="ml-2 text-xs text-text-muted">
            Inkomende aanvraag
          </span>
        </div>
        <pre className="min-h-44 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-text-muted">
          {EMAIL_TEXT.slice(0, typed)}
          {phase === "typing" && (
            <span className="inline-block h-4 w-2 animate-pulse bg-primary-light align-middle" />
          )}
        </pre>
      </div>

      {/* Agent-verwerking */}
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card p-5">
        {phase === "processing" && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent, #b0653a, transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s linear infinite",
            }}
          />
        )}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            NinA Agent
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${
              phase === "done"
                ? "bg-primary/10 text-primary"
                : "bg-bg-muted text-text-muted"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                phase === "processing"
                  ? "animate-pulse bg-primary-light"
                  : phase === "done"
                    ? "bg-primary-light"
                    : "bg-text-muted"
              }`}
            />
            {phase === "done"
              ? "Afgerond"
              : phase === "processing"
                ? "Verwerken"
                : "Stand-by"}
          </span>
        </div>

        <ol className="space-y-2.5">
          {STEPS.map((s, idx) => {
            const done = idx < stepsDone;
            const active = idx === stepsDone && phase === "processing";
            return (
              <li
                key={s.label}
                className={`flex items-start gap-2.5 text-sm transition-colors duration-300 ${
                  done || active ? "text-text" : "text-text-muted"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                    done
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span>
                  {s.label}
                  <span className="block text-xs text-text-muted">
                    {s.detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        {phase === "done" && (
          <div className="mt-4 rounded-xl border border-primary/40 bg-bg-alt p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Resultaat
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {RESULT.map((r) => (
                <div key={r.k} className="contents">
                  <dt className="text-text-muted">{r.k}</dt>
                  <dd
                    className={
                      r.k === "Relevantie"
                        ? "font-semibold text-gold"
                        : "text-text"
                    }
                  >
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <button
          type="button"
          onClick={run}
          className="mt-auto pt-4 text-left text-xs text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Opnieuw afspelen
        </button>
      </div>
    </div>
  );
}
