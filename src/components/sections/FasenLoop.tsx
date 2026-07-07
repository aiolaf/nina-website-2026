"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  IconPrompt,
  IconSpark,
  IconFlow,
  IconBot,
  IconArrowLoop,
} from "@/components/ui/icons";

type Fase = {
  nr: number;
  naam: string;
  kort: string;
  product: string;
  tekst: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /* positie op de ring, in procenten van de container */
  pos: { left: string; top: string };
};

const FASEN: Fase[] = [
  {
    nr: 1,
    naam: "Prompten",
    kort: "Prompten",
    product: "AI Knowledge",
    tekst:
      "Je team leert AI aansturen. Wij brengen de kennis, met lezingen en workshops op maat.",
    Icon: IconPrompt,
    pos: { left: "50%", top: "0%" },
  },
  {
    nr: 2,
    naam: "GPT's en Copilot-agents",
    kort: "GPT's & skills",
    product: "AI Consult / Design",
    tekst:
      "Eigen GPT's en skills voor het dagelijkse werk. Wij ontwerpen het plan en de prompt-library.",
    Icon: IconSpark,
    pos: { left: "100%", top: "50%" },
  },
  {
    nr: 3,
    naam: "Automatisering",
    kort: "Automatisering",
    product: "AI Build · n8n",
    tekst:
      "Workflows die taken overnemen, gekoppeld aan je eigen systemen. Onze developers bouwen.",
    Icon: IconFlow,
    pos: { left: "50%", top: "100%" },
  },
  {
    nr: 4,
    naam: "AI-agents",
    kort: "AI-agents",
    product: "AI Agents",
    tekst:
      "Digitale collega's die zelfstandig werken. En die hebben zelf weer scherpe prompts nodig: de loop begint opnieuw.",
    Icon: IconBot,
    pos: { left: "0%", top: "50%" },
  },
];

/**
 * De vier fasen van AI-adoptie als loop in plaats van trap: van prompten
 * tot agents, en agents hebben zelf weer prompts nodig. Een pulse reist
 * continu over de ring; klik een fase of laat hem automatisch rondgaan.
 * Pijltjestoetsen werken; auto-advance pauzeert buiten beeld, na interactie
 * en onder prefers-reduced-motion.
 */
export default function FasenLoop() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastTouch = useRef(0);
  const fase = FASEN[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = rootRef.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    const t = setInterval(() => {
      if (visible && performance.now() - lastTouch.current > 7000) {
        setActive((a) => (a + 1) % FASEN.length);
      }
    }, 3800);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, []);

  function pick(idx: number) {
    lastTouch.current = performance.now();
    setActive(idx);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      pick((active + 1) % FASEN.length);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      pick((active + FASEN.length - 1) % FASEN.length);
    }
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      {/* De ring */}
      <div
        ref={rootRef}
        className="relative mx-auto aspect-square w-full max-w-105 p-14 sm:p-16"
        role="tablist"
        aria-label="De vier fasen van AI-adoptie, als doorlopende loop"
        onKeyDown={onKeyDown}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="loopgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4c2a4f" />
              <stop offset="55%" stopColor="#614479" />
              <stop offset="100%" stopColor="#c270b5" />
            </linearGradient>
          </defs>
          {/* stille basisring */}
          <circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="#ddd5c9"
            strokeWidth="2"
          />
          {/* draaiende dash-ring */}
          <g className="origin-center motion-safe:animate-[spin_30s_linear_infinite]">
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="url(#loopgrad)"
              strokeWidth="2.5"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />
          </g>
          {/* richtingspijlen */}
          {[45, 135, 225, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 200 200)`}>
              <path
                d="M 200 26 l -7 8 M 200 26 l 7 8"
                stroke="#a562a1"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}
          {/* reizende pulse */}
          <g className="motion-reduce:hidden">
            <circle r="6" fill="#c270b5" opacity="0.9">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                path="M 200,30 A 170,170 0 1,1 199.9,30"
              />
            </circle>
            <circle r="12" fill="#c270b5" opacity="0.25">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                path="M 200,30 A 170,170 0 1,1 199.9,30"
              />
            </circle>
          </g>
        </svg>

        {/* kern */}
        <div className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-center shadow-[0_16px_48px_rgba(97,68,121,0.3)]">
          <fase.Icon className="h-7 w-7 text-white/90 sm:h-8 sm:w-8" />
          <p className="font-display mt-1.5 px-3 text-xs font-bold leading-tight text-white sm:text-sm">
            {fase.kort}
          </p>
          <p className="mt-0.5 text-[10px] text-white/70">Fase {fase.nr} van 4</p>
        </div>

        {/* fase-knoppen op de ring */}
        {FASEN.map((f, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={f.nr}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => pick(idx)}
              style={{ left: f.pos.left, top: f.pos.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "scale-110 border-primary bg-primary text-white shadow-[0_8px_24px_rgba(97,68,121,0.35)]"
                  : "border-border bg-bg-card text-text hover:border-primary hover:text-primary"
              }`}
            >
              <span className="mr-1.5 opacity-60">{f.nr}</span>
              {f.kort}
            </button>
          );
        })}
      </div>

      {/* detailpaneel */}
      <div>
        <div
          key={fase.nr}
          role="tabpanel"
          className="reveal-now [animation-duration:0.35s]"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            {fase.product}
          </p>
          <h3 className="font-display mt-2 text-2xl font-bold sm:text-3xl">
            {fase.naam}
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-text-muted">
            {fase.tekst}
          </p>
        </div>
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-bg-card p-5">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconArrowLoop className="h-4.5 w-4.5" />
          </span>
          <p className="text-sm leading-relaxed text-text-muted">
            Geen trap maar een loop: wie bij fase 4 is, begint weer bij fase
            1. Daarom helpen wij in{" "}
            <span className="font-semibold text-text">alle vier de fasen</span>
            , met al onze producten en een team van 10+ specialisten.
          </p>
        </div>
      </div>
    </div>
  );
}
