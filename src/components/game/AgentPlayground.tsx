"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * "Ga spelen met AI": speelbare mini-automation in de hero. Tik of klik een
 * taak en de NinA-agent verwerkt hem: pulse in de kern, logregel, minuten
 * bespaard erbij. Snel achter elkaar spelen bouwt een streak op; na zes
 * taken volgt een level-up met confetti en een CTA. Bij stilte verwerkt de
 * agent af en toe zelf een taak, zodat het blok altijd leeft. Toetsenbord:
 * taken zijn knoppen. Reduced motion: geen bob, geen confetti, alles direct.
 */

type TaskDef = {
  label: string;
  output: string;
  tool: string;
  min: number;
  kleur: string;
};

const TASKS: TaskDef[] = [
  { label: "E-mail", output: "gelezen en beantwoord", tool: "Mail", min: 9, kleur: "#6b4227" },
  { label: "Factuur", output: "gematcht en geboekt", tool: "ERP", min: 12, kleur: "#b0653a" },
  { label: "PDF-aanvraag", output: "uitgelezen en gelabeld", tool: "CRM", min: 14, kleur: "#e8963e" },
  { label: "Klantvraag", output: "beantwoord in 3 talen", tool: "Helpdesk", min: 8, kleur: "#0c0e18" },
  { label: "Order", output: "gevalideerd en ingevoerd", tool: "ERP", min: 11, kleur: "#6b4227" },
  { label: "Rapport", output: "concept opgesteld", tool: "Docs", min: 18, kleur: "#b0653a" },
];

const LEVEL_AT = 6;

type LogLine = { id: number; text: string; auto: boolean };

export default function AgentPlayground() {
  const [queue, setQueue] = useState<number[]>([0, 1, 2]);
  const [busy, setBusy] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [count, setCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const [leveled, setLeveled] = useState(false);
  const nextTask = useRef(3);
  const logId = useRef(0);
  const lastPlay = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const confetti = useCallback(() => {
    if (reduced.current) return;
    const host = rootRef.current;
    if (!host) return;
    const colors = ["#6b4227", "#b0653a", "#e8963e", "#b0653a", "#0c0e18"];
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("span");
      const size = 5 + Math.random() * 6;
      p.style.cssText = `position:absolute;left:50%;top:38%;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? "9999px" : "2px"};background:${colors[i % colors.length]};pointer-events:none;z-index:20;`;
      host.appendChild(p);
      const dx = (Math.random() - 0.5) * 320;
      const dy = -40 - Math.random() * 160;
      p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${dx * 0.7}px, ${dy}px) rotate(${Math.random() * 240}deg)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(${dx}px, ${dy + 320}px) rotate(${Math.random() * 540}deg)`,
            opacity: 0,
          },
        ],
        { duration: 1300 + Math.random() * 700, easing: "cubic-bezier(0.2,0.6,0.3,1)" }
      ).onfinish = () => p.remove();
    }
  }, []);

  const process = useCallback(
    (queueIdx: number, auto: boolean) => {
      if (busy) return;
      setBusy(true);
      const taskIdx = queue[queueIdx];
      const task = TASKS[taskIdx % TASKS.length];

      const now = performance.now();
      const fast = !auto && now - lastPlay.current < 3500;
      if (!auto) lastPlay.current = now;

      setQueue((q) => {
        const next = [...q];
        next.splice(queueIdx, 1);
        next.push(nextTask.current++);
        return next;
      });

      const delay = reduced.current ? 0 : 620;
      setTimeout(() => {
        setMinutes((m) => m + task.min);
        setStreak((s) => (auto ? 0 : fast ? s + 1 : 1));
        setCount((c) => {
          const n = c + 1;
          if (n === LEVEL_AT) {
            setLeveled(true);
            confetti();
          }
          return n;
        });
        setLog((l) =>
          [
            {
              id: logId.current++,
              text: `${task.label} → ${task.output} → ${task.tool}`,
              auto,
            },
            ...l,
          ].slice(0, 4)
        );
        setBusy(false);
      }, delay);
    },
    [busy, queue, confetti]
  );

  // Demo-stand: bij stilte verwerkt de agent zelf af en toe iets,
  // maar alleen zolang het blok in beeld is en de tab actief
  useEffect(() => {
    if (reduced.current) return;
    const el = rootRef.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    idleTimer.current = setInterval(() => {
      if (
        visible &&
        !document.hidden &&
        performance.now() - lastPlay.current > 6000
      ) {
        process(0, true);
      }
    }, 4500);
    return () => {
      io.disconnect();
      if (idleTimer.current) clearInterval(idleTimer.current);
    };
  }, [process]);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[3px] border border-border bg-bg-card p-6 shadow-[0_20px_60px_rgba(12,14,24,0.08)] sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold">
          Ga spelen met <span className="text-shimmer">AI</span>
        </p>
        <span className="rounded-full bg-gold/15 px-3 py-1 font-mono text-xs font-semibold text-gold">
          ≈ {minutes} min bespaard
        </span>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        Echte werkprocessen: tik een taak, de agent verwerkt hem naar de juiste tool.
        {streak > 1 && (
          <span className="ml-2 font-semibold text-magenta">
            Streak x{streak}
          </span>
        )}
      </p>

      {/* Taken */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        {queue.map((t, idx) => {
          const task = TASKS[t % TASKS.length];
          return (
            <button
              key={t}
              type="button"
              onClick={() => process(idx, false)}
              disabled={busy}
              aria-label={`Verwerk taak: ${task.label}`}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 hover:border-primary active:scale-95 disabled:opacity-60 motion-safe:animate-[bob_3.2s_ease-in-out_infinite]"
              style={{ animationDelay: `${idx * 0.6}s` }}
            >
              {task.label}
              <span
                aria-hidden="true"
                className="text-text-muted transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      {/* Agent-kern */}
      <div className="mt-6 flex items-center gap-4">
        <div
          aria-hidden="true"
          className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0c0e18,#6b4227_55%,#b0653a)] shadow-[0_8px_24px_rgba(12,14,24,0.35)] transition-transform ${
            busy ? "scale-110" : ""
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full ${busy ? "ping-soft text-magenta" : ""}`}
          />
          <span className="font-display text-sm font-bold text-white">
            NinA
          </span>
        </div>
        <div className="min-h-16 flex-1" aria-live="off">
          {log.length === 0 ? (
            <p className="text-sm text-text-muted">
              De agent staat klaar. Jouw beurt.
            </p>
          ) : (
            <ul className="space-y-1">
              {log.map((l, i) => (
                <li
                  key={l.id}
                  className={`flex items-baseline gap-2 font-mono text-xs ${
                    i === 0 ? "text-text" : "text-text-muted"
                  } ${i === 0 && !reduced.current ? "reveal-now [animation-duration:0.3s]" : ""}`}
                >
                  <span
                    className={`rounded px-1 py-0.5 text-[9px] uppercase tracking-wider ${
                      l.auto
                        ? "bg-bg-muted text-text-muted"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {l.auto ? "auto" : "jij"}
                  </span>
                  {l.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Level-up */}
      <div
        className={`mt-5 overflow-hidden transition-[max-height,opacity] duration-500 ${
          leveled ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start justify-between gap-3 rounded-[3px] bg-[#0c0e18] p-4 sm:flex-row sm:items-center">
          <p className="text-sm text-[#e8e2ee]">
            <span className="font-display font-bold text-[#e8963e]">
              Level up.
            </span>{" "}
            Zo voelt spelen met AI. Wij bouwen dit dagelijks, in het echt.
          </p>
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0c0e18] transition-colors hover:bg-[#e8963e] hover:text-white"
          >
            Plan een kennismaking
          </a>
        </div>
      </div>

      <p className="mt-4 border-t border-border pt-3 text-[11px] text-text-muted">
        Gesimuleerd, maar zo werkt het echt: {count} taken verwerkt, nul
        overgetypt.
      </p>
    </div>
  );
}
