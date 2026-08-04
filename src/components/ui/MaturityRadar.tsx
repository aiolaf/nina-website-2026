/* Radargeometrie. Assen gelijk verdeeld, eerste as recht naar boven. */
const CX = 190;
const CY = 140;
const R = 92;
const LABEL_R = 114;
const RINGEN = 5;
const MAX = 5;

function hoek(i: number, aantal: number) {
  return (-90 + (i * 360) / aantal) * (Math.PI / 180);
}

function punt(i: number, aantal: number, radius: number) {
  const h = hoek(i, aantal);
  return [CX + radius * Math.cos(h), CY + radius * Math.sin(h)] as const;
}

function pad(waarden: number[]) {
  return waarden
    .map((v, i) => punt(i, waarden.length, (v / MAX) * R))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

function ring(aantal: number, radius: number) {
  return Array.from({ length: aantal }, (_, i) => punt(i, aantal, radius))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

/**
 * Spinnenweb met twee vlakken: de huidige score gevuld, het doel als
 * gestreepte lijn. Geen chartlibrary, alleen SVG, dus hij rendert ook zonder
 * JavaScript en schaalt mee met de kaart waarin hij staat. Wordt gebruikt door
 * de statische plaat op /ai-partnership en door de interactieve quick scan.
 */
export default function MaturityRadar({
  labels,
  nu,
  doel,
  alt,
}: {
  labels: string[];
  nu: number[];
  doel: number[];
  alt: string;
}) {
  const n = labels.length;

  return (
    <svg
      viewBox="0 0 380 280"
      role="img"
      aria-label={alt}
      className="w-full"
    >
      {Array.from({ length: RINGEN }, (_, i) => (
        <polygon
          key={i}
          points={ring(n, (R * (i + 1)) / RINGEN)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}
      {labels.map((label, i) => {
        const [x, y] = punt(i, n, R);
        return (
          <line
            key={label}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        );
      })}

      {/* Doel: gestreepte magenta lijn */}
      <polygon
        points={pad(doel)}
        fill="none"
        stroke="var(--color-magenta)"
        strokeWidth={2}
        strokeDasharray="6 5"
        strokeLinejoin="round"
      />

      {/* Nu: gevuld vlak. De transition laat de vorm meebewegen zodra iemand
          in de quick scan een score aanpast. */}
      <polygon
        points={pad(nu)}
        fill="var(--color-primary)"
        fillOpacity={0.16}
        stroke="var(--color-ink-deep)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        className="[transition:all_.35s_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      />
      {nu.map((v, i) => {
        const [x, y] = punt(i, n, (v / MAX) * R);
        return (
          <circle
            key={labels[i]}
            cx={x}
            cy={y}
            r={3.5}
            fill="var(--color-ink-deep)"
            className="[transition:all_.35s_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
        );
      })}

      {labels.map((label, i) => {
        const h = hoek(i, n);
        const [x, y] = punt(i, n, LABEL_R);
        const cos = Math.cos(h);
        const anchor =
          Math.abs(cos) < 0.25 ? "middle" : cos > 0 ? "start" : "end";
        const dy = Math.sin(h) > 0.7 ? 10 : Math.sin(h) < -0.7 ? -2 : 4;
        return (
          <text
            key={label}
            x={x}
            y={y + dy}
            textAnchor={anchor}
            className="fill-text-muted text-[13px]"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
