"use client";

import { useState } from "react";

const FASEN = [
  {
    nr: 1,
    naam: "Prompten",
    product: "AI Knowledge",
    detail: "Prompts en kennis. Je team leert wat AI vandaag al kan.",
    prijs: "EUR 0 tot 2k",
    hoogte: 0,
  },
  {
    nr: 2,
    naam: "GPT's en Copilot-agents",
    product: "AI Consult / Design",
    detail: "Skills, projects en agents. Kansen op een matrix, geprioriteerd.",
    prijs: "EUR 2 tot 8k",
    hoogte: 1,
  },
  {
    nr: 3,
    naam: "Automatisering",
    product: "AI Build",
    detail: "Workflow-automatisering in je eigen omgeving.",
    prijs: "EUR 8 tot 30k",
    hoogte: 2,
  },
  {
    nr: 4,
    naam: "AI-agents",
    product: "AI Build",
    detail: "Autonome agents en custom builds die zelfstandig werk uitvoeren.",
    prijs: "EUR 30 tot 150k+",
    hoogte: 3,
  },
];

/**
 * De vier fasen van AI-adoptie als interactieve trap. Klik of gebruik
 * pijltjestoetsen om een fase te bekijken. Op mobiel staan de treden
 * onder elkaar als aanklikbare kaarten.
 */
export default function FasenTrap() {
  const [active, setActive] = useState(1);
  const fase = FASEN[active];

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, FASEN.length - 1));
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
  }

  return (
    <div>
      {/* Trap, desktop en tablet */}
      <div
        className="hidden items-end gap-2 sm:flex"
        role="tablist"
        aria-label="Vier fasen van AI-adoptie"
        onKeyDown={onKeyDown}
      >
        {FASEN.map((f, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={f.nr}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(idx)}
              className={`group relative flex-1 rounded-t-xl border border-b-0 px-4 pb-6 pt-5 text-left transition-[border-color,box-shadow] ${
                isActive
                  ? "border-primary bg-bg-muted shadow-[0_-8px_28px_rgba(12,14,24,0.12)]"
                  : "border-border bg-bg-card hover:border-primary/50"
              }`}
              style={{
                height: `${9 + f.hoogte * 3.25}rem`,
                alignSelf: "flex-end",
              }}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isActive ? "text-primary" : "text-text-muted"
                }`}
              >
                Fase {f.nr}
              </span>
              <span className="mt-1 block font-display text-sm font-bold leading-snug sm:text-base">
                {f.naam}
              </span>
              {idx === 1 && (
                <span className="absolute -top-9 left-0 hidden text-xs text-text-muted lg:block">
                  Meeste organisaties blijven hier steken
                </span>
              )}
              {idx === 3 && (
                <span className="absolute -top-9 right-0 hidden text-right text-xs text-primary lg:block">
                  Hier zit de waarde
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="hidden h-px bg-primary/60 sm:block" />

      {/* Mobiel: verticale treden */}
      <div className="flex flex-col gap-2 sm:hidden" role="tablist" aria-label="Vier fasen van AI-adoptie">
        {FASEN.map((f, idx) => (
          <button
            key={f.nr}
            role="tab"
            aria-selected={idx === active}
            onClick={() => setActive(idx)}
            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
              idx === active
                ? "border-primary bg-bg-muted"
                : "border-border bg-bg-card"
            }`}
            style={{ marginLeft: `${idx * 0.75}rem` }}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                idx === active ? "text-primary" : "text-text-muted"
              }`}
            >
              Fase {f.nr}
            </span>
            <span className="mt-0.5 block font-display text-sm font-bold">
              {f.naam}
            </span>
          </button>
        ))}
      </div>

      {/* Detailpaneel */}
      <div
        key={fase.nr}
        role="tabpanel"
        className="reveal-now mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-bg-card p-6 [animation-duration:0.3s] sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {fase.product}
          </p>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-muted">
            {fase.detail}
          </p>
        </div>
        <p className="shrink-0 font-display text-lg font-bold text-gold">
          {fase.prijs}
        </p>
      </div>
    </div>
  );
}
