"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Robot,
  PencilSimple,
  FunnelSimple,
  XCircle,
  CheckCircle,
  StopCircle,
  User,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Mens en AI in hun kracht, als speelbare loop naar het Plan Mode-stramien:
 * 1 AI toont zijn plan, 2 de bezoeker keurt (goedkeuren, of afkeuren en de
 * agent maakt een nieuw plan), 3 uitvoering met live log en een werkende
 * uitknop, 4 het vertrouwen groeit en de auto-akkoord-meter klimt van 20
 * naar 40 procent. Start zodra de sectie in beeld komt; bij stap 2 wacht
 * hij echt op de bezoeker (met een demo-fallback na een paar seconden).
 * Reduced motion: alles direct in de eindstand.
 */

const PLAN_ITEMS = [
  "Analyse van data",
  "Opstellen rapport",
  "Validatie regels",
  "Versturen notificatie",
];

const LOG_TIJDEN = ["10:12", "10:13", "10:15", "10:16"];

type Stap = 1 | 2 | 3 | 4;

export default function PlanMode() {
  const [stap, setStap] = useState<Stap>(1);
  const [planN, setPlanN] = useState(0);
  const [logN, setLogN] = useState(0);
  const [gestopt, setGestopt] = useState(false);
  const [akkoord, setAkkoord] = useState(20);
  const [klaar, setKlaar] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useRef(false);
  const started = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const at = (ms: number, fn: () => void) =>
    timers.current.push(setTimeout(fn, ms));

  const startPlan = useCallback(() => {
    clearTimers();
    setStap(1);
    setPlanN(0);
    setLogN(0);
    setGestopt(false);
    setKlaar(false);
    setAkkoord(20);
    if (reduced.current) {
      setPlanN(PLAN_ITEMS.length);
      setLogN(LOG_TIJDEN.length);
      setStap(4);
      setAkkoord(40);
      setKlaar(true);
      return;
    }
    PLAN_ITEMS.forEach((_, i) => at(450 * (i + 1), () => setPlanN(i + 1)));
    at(450 * PLAN_ITEMS.length + 400, () => setStap(2));
    // demo-fallback: als de bezoeker niet klikt, keurt de demo zelf goed
    at(450 * PLAN_ITEMS.length + 5400, () => keurGoedRef.current());
  }, []);

  const keurGoed = useCallback(() => {
    clearTimers();
    setStap(3);
    setGestopt(false);
    setLogN(0);
    LOG_TIJDEN.forEach((_, i) => at(550 * (i + 1), () => setLogN(i + 1)));
    at(550 * LOG_TIJDEN.length + 500, () => {
      setStap(4);
      // meter klimt van 20 naar 40
      for (let v = 21; v <= 40; v++) {
        at((v - 20) * 55, () => setAkkoord(v));
      }
      at(20 * 55 + 400, () => setKlaar(true));
    });
  }, []);
  const keurGoedRef = useRef(keurGoed);
  keurGoedRef.current = keurGoed;

  function keurAf() {
    // de mens stuurt: agent maakt een nieuw plan
    startPlan();
  }

  function stop() {
    if (stap !== 3) return;
    clearTimers();
    setGestopt(true);
    // terug naar de mens: opnieuw keuren
    at(900, () => setStap(2));
  }

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          startPlan();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [startPlan]);

  const badge = (nr: number, wie: "AI" | "MENS", actief: boolean) => (
    <div className="mb-3 flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
          actief ? "bg-primary text-white" : "bg-bg-muted text-[#4a4253]"
        }`}
      >
        {nr}
      </span>
      <span
        className={`inline-flex items-center gap-1 rounded-[3px] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
          wie === "AI"
            ? actief
              ? "bg-primary/15 text-primary"
              : "bg-bg-muted text-[#4a4253]"
            : actief
              ? "bg-ink-deep/10 text-ink-deep"
              : "bg-bg-muted text-[#4a4253]"
        }`}
      >
        {wie === "AI" ? <Robot className="h-3 w-3" /> : <User className="h-3 w-3" />}
        {wie}
      </span>
    </div>
  );

  const kaart = (actief: boolean) =>
    `flex h-full flex-col rounded-[3px] border p-5 transition-all duration-300 ${
      actief
        ? "border-primary/60 bg-bg-card shadow-[0_12px_40px_rgba(12,14,24,0.14)]"
        : "border-border bg-bg-card opacity-90"
    }`;

  const verbinding = (aan: boolean) => (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className={`flow-line-x hidden w-full lg:block ${aan ? "is-on" : ""}`} />
      <div className={`flow-line-y h-8 lg:hidden ${aan ? "is-on" : ""}`} />
    </div>
  );

  // gauge-geometrie: halve cirkel r=54
  const OMTREK = Math.PI * 54;
  const vulling = OMTREK * (akkoord / 100);

  return (
    <div ref={rootRef}>
      <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_2rem_1fr_2rem_1fr_2rem_1fr]">
        {/* Stap 1: AI toont plan */}
        <div className={kaart(stap === 1)}>
          {badge(1, "AI", stap === 1)}
          <p className="font-display text-base font-bold">
            Agent toont zijn plan
          </p>
          <p className="mb-4 text-xs text-text-muted">Vooraf, in gewone taal.</p>
          <ul className="space-y-2">
            {PLAN_ITEMS.map((item, i) => {
              const done = i < planN;
              return (
                <li
                  key={item}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    done ? "text-text" : "text-text-muted"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border text-[9px] transition-colors ${
                      done
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
          <p className="mt-auto rounded-[3px] border border-primary/30 bg-primary/5 p-3 pt-3 text-xs leading-relaxed text-text-muted">
            Dit is mijn plan. Uitgelegd in gewone taal.
          </p>
        </div>

        {verbinding(stap === 1 && planN >= PLAN_ITEMS.length)}

        {/* Stap 2: de mens keurt */}
        <div className={kaart(stap === 2)}>
          {badge(2, "MENS", stap === 2)}
          <p className="font-display text-base font-bold">Jij keurt</p>
          <p className="mb-4 text-xs text-text-muted">
            Aanpassen, inperken, afkeuren. Echt, probeer maar.
          </p>
          <div className="space-y-2">
            <button
              type="button"
              disabled={stap !== 2}
              className="flex w-full items-center gap-2 rounded-[3px] border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            >
              <PencilSimple className="h-4 w-4" /> Aanpassen
            </button>
            <button
              type="button"
              disabled={stap !== 2}
              className="flex w-full items-center gap-2 rounded-[3px] border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            >
              <FunnelSimple className="h-4 w-4" /> Inperken
            </button>
            <button
              type="button"
              onClick={keurAf}
              disabled={stap !== 2}
              className="flex w-full items-center gap-2 rounded-[3px] border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            >
              <XCircle className="h-4 w-4" /> Afkeuren
            </button>
          </div>
          <button
            type="button"
            onClick={keurGoed}
            disabled={stap !== 2}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink-deep disabled:opacity-40 ${
              stap === 2 ? "shadow-[0_8px_24px_rgba(12,14,24,0.35)]" : ""
            }`}
          >
            <CheckCircle className="h-4 w-4" /> Goedkeuren
          </button>
        </div>

        {verbinding(stap === 3)}

        {/* Stap 3: uitvoering */}
        <div className={kaart(stap === 3)}>
          {badge(3, "AI", stap === 3)}
          <p className="font-display text-base font-bold">Hij voert uit</p>
          <p className="mb-4 text-xs text-text-muted">Gelogd, met uitknop.</p>
          <ol className="flex-1 space-y-1.5">
            {LOG_TIJDEN.map((t, i) => {
              const zichtbaar = i < logN;
              return (
                <li
                  key={t}
                  className={`flex items-baseline gap-2 font-mono text-xs transition-opacity duration-300 ${
                    zichtbaar ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-text-muted">{t}</span>
                  <span className="flex-1">{PLAN_ITEMS[i]}</span>
                  <span className="text-primary">✓</span>
                </li>
              );
            })}
            {gestopt && (
              <li className="flex items-baseline gap-2 font-mono text-xs text-[#9a2b2b]">
                <span>10:17</span>
                <span className="flex-1">Gestopt door de mens</span>
              </li>
            )}
          </ol>
          <button
            type="button"
            onClick={stop}
            disabled={stap !== 3}
            aria-label="Uitknop: stop de uitvoering"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#c65b5b]/50 px-4 py-2 text-sm font-semibold text-[#9a2b2b] transition-colors hover:bg-[#9a2b2b] hover:text-white disabled:opacity-40"
          >
            <StopCircle className="h-4.5 w-4.5" /> Uitknop
          </button>
        </div>

        {verbinding(stap === 4 && !klaar)}

        {/* Stap 4: vertrouwen groeit */}
        <div className={kaart(stap === 4)}>
          {badge(4, "MENS", stap === 4)}
          <p className="font-display text-base font-bold">Vertrouwen groeit</p>
          <p className="mb-2 text-xs text-text-muted">
            Auto-akkoord: van 20 naar 40 procent.
          </p>
          <div className="flex flex-1 flex-col items-center justify-center">
            <svg viewBox="0 0 120 68" className="w-full max-w-40" aria-hidden="true">
              <path
                d="M 6 62 A 54 54 0 0 1 114 62"
                fill="none"
                stroke="#e7e1d6"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 6 62 A 54 54 0 0 1 114 62"
                fill="none"
                stroke="url(#pm-grad)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${vulling} ${OMTREK}`}
                className="transition-[stroke-dasharray] duration-100"
              />
              <defs>
                <linearGradient id="pm-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6b4227" />
                  <stop offset="100%" stopColor="#e8963e" />
                </linearGradient>
              </defs>
            </svg>
            <p className="-mt-6 font-mono text-2xl font-bold text-primary">
              {akkoord}%
            </p>
            <p className="mt-1 text-center text-xs text-text-muted">
              {klaar
                ? "De mens houdt de regie, de agent verdient hem."
                : "auto-akkoord stijgt"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-text-muted">
          Zo bouwen wij elke agent: de AI stelt voor en voert uit, de mens
          keurt en stuurt.
        </p>
        <button
          type="button"
          onClick={startPlan}
          className="text-xs text-text-muted underline-offset-2 hover:text-primary hover:underline"
        >
          Opnieuw afspelen
        </button>
      </div>
    </div>
  );
}
