const LOGS = [
  { t: "09:41:02", msg: "Order-agent: 14 orders verwerkt naar ERP", tag: "auto" },
  { t: "09:41:37", msg: "Mail-agent: aanvraag geclassificeerd, relevantie hoog", tag: "agent" },
  { t: "09:42:11", msg: "Rapport-agent: conceptcalculatie klaar voor review", tag: "review" },
  { t: "09:43:05", msg: "Support-agent: ticket beantwoord in 3 talen", tag: "agent" },
  { t: "09:44:19", msg: "Factuur-workflow: 28 facturen gematcht, 0 fouten", tag: "auto" },
  { t: "09:45:52", msg: "Human in the loop: voorstel goedgekeurd door medewerker", tag: "mens" },
  { t: "09:46:30", msg: "Dashboard: 6,2 uur bespaard sinds middernacht", tag: "kpi" },
  { t: "09:47:14", msg: "Voice-agent: terugbelverzoek ingepland in agenda", tag: "agent" },
];

/**
 * Doorlopende agent-log als donker contrastblok (de machinekamer) binnen
 * het lichte thema. Pure CSS-loop, staat stil onder prefers-reduced-motion.
 */
export default function AgentTicker() {
  const rows = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="space-y-2.5">
      {LOGS.map((l) => (
        <li
          key={l.t}
          className="flex items-baseline gap-3 whitespace-nowrap font-mono text-xs"
        >
          <span className="text-[#8d8496]">{l.t}</span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
              l.tag === "kpi"
                ? "bg-[#c270b5]/25 text-[#e8b7df]"
                : l.tag === "mens"
                  ? "bg-[#a562a1]/25 text-[#d9a8d4]"
                  : "bg-white/10 text-[#b5adc0]"
            }`}
          >
            {l.tag}
          </span>
          <span className="text-[#cfc8d8]">{l.msg}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="img"
      aria-label="Voorbeeld van een doorlopende agent-log met verwerkte taken"
      className="relative h-44 overflow-hidden rounded-2xl bg-[#2a2130] p-5 shadow-[0_16px_48px_rgba(42,33,48,0.25)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]"
    >
      <div className="ticker-up space-y-2.5 motion-reduce:animate-none">
        {rows(false)}
        {rows(true)}
      </div>
      <span className="absolute right-4 top-3 inline-flex items-center gap-2 text-[11px] text-[#b5adc0]">
        <span className="relative flex h-2 w-2 rounded-full bg-[#c270b5] text-[#c270b5] ping-soft" />
        agents actief
      </span>
    </div>
  );
}
