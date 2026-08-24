"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Werkende workflow in n8n-stijl: bron (mail met bijlage) → NinA-agent →
 * gelabelde data → jouw tools. Verbindingen stromen zichtbaar zolang de
 * workflow draait; drie scenario-tabs maken het relevant voor meer
 * bedrijven. Start zodra de sectie in beeld komt, opnieuw afspelen kan.
 * Reduced motion: alles direct in de eindstand, geen stromende lijnen.
 */

type Scenario = {
  key: string;
  tab: string;
  bron: { titel: string; regels: string[]; bijlage?: string };
  stappen: string[];
  labels: { k: string; v: string; goud?: boolean }[];
  tools: string[];
  winst: string;
};

const SCENARIOS: Scenario[] = [
  {
    key: "aanvraag",
    tab: "Aanvraag per mail",
    bron: {
      titel: "Onderwerp: Offerte project Rijnhaven",
      regels: [
        "Goedemiddag,",
        "In de bijlage de specificaties. Graag voor",
        "vrijdag een terugkoppeling.",
      ],
      bijlage: "specificaties.pdf · 14 pag.",
    },
    stappen: ["Mail en PDF gelezen", "Gegevens geëxtraheerd", "Gelabeld en gecheckt"],
    labels: [
      { k: "Project", v: "Rijnhaven" },
      { k: "Deadline", v: "vrijdag" },
      { k: "Relevantie", v: "hoog", goud: true },
      { k: "Contact", v: "J. van Dam" },
    ],
    tools: ["CRM", "ERP", "Mail-concept", "Dashboard"],
    winst: "≈ 45 min per aanvraag",
  },
  {
    key: "factuur",
    tab: "Factuur",
    bron: {
      titel: "Onderwerp: Factuur 2026-8841",
      regels: [
        "Beste administratie,",
        "Bijgaand onze factuur voor de levering",
        "van afgelopen maand.",
      ],
      bijlage: "factuur_8841.pdf",
    },
    stappen: ["PDF uitgelezen", "PO-nummer gematcht", "BTW gevalideerd"],
    labels: [
      { k: "Leverancier", v: "Bakker BV" },
      { k: "Bedrag", v: "EUR 2.340" },
      { k: "PO-match", v: "geslaagd", goud: true },
      { k: "BTW", v: "21%" },
    ],
    tools: ["Boekhouding", "ERP", "Archief", "Dashboard"],
    winst: "≈ 12 uur per week",
  },
  {
    key: "klantvraag",
    tab: "Klantvraag",
    bron: {
      titel: "Betreff: Rücksendung Bestellung 4471",
      regels: [
        "Guten Tag,",
        "ich möchte meine Bestellung gerne",
        "zurücksenden. Wie funktioniert das?",
      ],
    },
    stappen: ["Taal herkend: Duits", "Intentie: retour", "Antwoord opgesteld"],
    labels: [
      { k: "Taal", v: "Duits" },
      { k: "Onderwerp", v: "retour" },
      { k: "Sentiment", v: "neutraal" },
      { k: "Antwoord", v: "klaar", goud: true },
    ],
    tools: ["Helpdesk", "CRM", "Mail", "Dashboard"],
    winst: "24/7, in 3 talen",
  },
];

type Fase = "idle" | "lezen" | "verwerken" | "labelen" | "leveren" | "klaar";

export default function WorkflowShowcase() {
  const [scenario, setScenario] = useState(0);
  const [fase, setFase] = useState<Fase>("idle");
  const [stapN, setStapN] = useState(0);
  const [labelN, setLabelN] = useState(0);
  const [toolN, setToolN] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useRef(false);
  const s = SCENARIOS[scenario];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback((idx: number) => {
    clearTimers();
    const sc = SCENARIOS[idx];
    if (reduced.current) {
      setStapN(sc.stappen.length);
      setLabelN(sc.labels.length);
      setToolN(sc.tools.length);
      setFase("klaar");
      return;
    }
    setStapN(0);
    setLabelN(0);
    setToolN(0);
    setFase("lezen");
    const at = (ms: number, fn: () => void) =>
      timers.current.push(setTimeout(fn, ms));
    let t = 500;
    at(t, () => setFase("verwerken"));
    sc.stappen.forEach((_, i) => {
      t += 500;
      at(t, () => setStapN(i + 1));
    });
    t += 300;
    at(t, () => setFase("labelen"));
    sc.labels.forEach((_, i) => {
      t += 380;
      at(t, () => setLabelN(i + 1));
    });
    t += 300;
    at(t, () => setFase("leveren"));
    sc.tools.forEach((_, i) => {
      t += 340;
      at(t, () => setToolN(i + 1));
    });
    t += 400;
    at(t, () => setFase("klaar"));
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = rootRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          run(0);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [run]);

  function pickScenario(idx: number) {
    setScenario(idx);
    run(idx);
  }

  const busy = fase !== "idle" && fase !== "klaar";

  return (
    <div ref={rootRef}>
      {/* Scenario-tabs */}
      <div
        role="tablist"
        aria-label="Kies een workflow-scenario"
        className="mb-6 flex flex-wrap gap-2"
      >
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.key}
            role="tab"
            aria-selected={idx === scenario}
            onClick={() => pickScenario(idx)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              idx === scenario
                ? "bg-primary text-white"
                : "border border-border bg-bg-card text-text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {sc.tab}
          </button>
        ))}
        <span className="ml-auto hidden items-center rounded-full bg-gold/15 px-3 py-1.5 font-mono text-xs font-semibold text-gold sm:inline-flex">
          {s.winst}
        </span>
      </div>

      {/* Node-canvas */}
      <div className="grid items-stretch gap-3 lg:grid-cols-[1.1fr_2.5rem_1fr_2.5rem_1.1fr]">
        {/* Bron-node */}
        <div className="rounded-[3px] border border-border bg-bg-card p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Binnenkomend
          </p>
          <p className="text-sm font-semibold">{s.bron.titel}</p>
          <div className="mt-2 space-y-1 font-mono text-xs leading-relaxed text-text-muted">
            {s.bron.regels.map((r) => (
              <p key={r}>{r}</p>
            ))}
          </div>
          {s.bron.bijlage && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-[3px] border border-border bg-bg px-3 py-2 text-xs font-medium">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 font-mono text-[9px] font-bold text-primary"
              >
                PDF
              </span>
              {s.bron.bijlage}
            </p>
          )}
        </div>

        {/* verbinding 1 */}
        <div className="flex items-center justify-center" aria-hidden="true">
          <div className={`flow-line-x hidden w-full lg:block ${busy ? "is-on" : ""}`} />
          <div className={`flow-line-y h-8 lg:hidden ${busy ? "is-on" : ""}`} />
        </div>

        {/* Agent-node */}
        <div
          className={`rounded-[3px] border p-5 transition-colors ${
            busy ? "border-primary/60 bg-bg-muted" : "border-border bg-bg-card"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span
                className={`relative flex h-2 w-2 rounded-full bg-primary text-primary ${
                  busy ? "ping-soft" : ""
                }`}
              />
              NinA Agent
            </p>
            <button
              type="button"
              onClick={() => run(scenario)}
              className="text-[11px] text-text-muted underline-offset-2 hover:text-primary hover:underline"
            >
              Opnieuw
            </button>
          </div>
          <ol className="space-y-2">
            {s.stappen.map((stap, i) => {
              const done = i < stapN;
              return (
                <li
                  key={stap}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    done ? "text-text" : "text-text-muted"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${
                      done
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {stap}
                </li>
              );
            })}
          </ol>
          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Gelabelde data
            </p>
            <div className="flex flex-wrap gap-1.5">
              {s.labels.map((l, i) => (
                <span
                  key={l.k}
                  className={`rounded-[3px] px-2 py-1 font-mono text-[11px] transition-all duration-300 ${
                    i < labelN
                      ? l.goud
                        ? "bg-gold/15 text-gold"
                        : "bg-primary/10 text-primary"
                      : "bg-bg-alt text-transparent"
                  }`}
                >
                  {l.k}: {l.v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* verbinding 2 */}
        <div className="flex items-center justify-center" aria-hidden="true">
          <div
            className={`flow-line-x hidden w-full lg:block ${
              fase === "leveren" || fase === "klaar" ? "is-on" : ""
            } ${fase === "klaar" ? "" : ""}`}
          />
          <div
            className={`flow-line-y h-8 lg:hidden ${
              fase === "leveren" ? "is-on" : ""
            }`}
          />
        </div>

        {/* Tools-node */}
        <div className="rounded-[3px] border border-border bg-bg-card p-5">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Jouw tools
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {s.tools.map((tool, i) => {
              const on = i < toolN;
              return (
                <li
                  key={tool}
                  className={`flex items-center gap-2 rounded-[3px] border px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                    on
                      ? "border-primary/50 bg-primary/5 text-text"
                      : "border-border bg-bg-alt text-text-muted"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      on ? "bg-primary" : "bg-border"
                    }`}
                  />
                  {tool}
                </li>
              );
            })}
          </ul>
          <p
            className={`mt-4 border-t border-border pt-3 text-xs transition-opacity duration-500 ${
              fase === "klaar" ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="font-semibold text-primary">Klaar.</span>{" "}
            <span className="text-text-muted">
              Nul overgetypt, mens keurt goed waar nodig.
            </span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-text-muted sm:hidden">
        {s.winst}
      </p>
    </div>
  );
}
