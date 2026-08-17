/**
 * Kleine glyphs voor de datachips op /ai-modellen. Simpele lucide-stijl
 * lijnen, 1,6px streek, bedoeld op 14 bij 14 pixels. Puur decoratief: de
 * chip zet het label er in tekst naast, zodat de betekenis nooit alleen
 * van een pictogram afhangt.
 */

type Props = { className?: string };

const GEDEELD = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Intelligentie: een vonk. */
export function IconVonk({ className }: Props) {
  return (
    <svg {...GEDEELD} className={className}>
      <path d="M8 1.5l1.6 3.9 3.9 1.6-3.9 1.6L8 12.5 6.4 8.6 2.5 7l3.9-1.6z" />
    </svg>
  );
}

/** Coding: punthaken. */
export function IconCode({ className }: Props) {
  return (
    <svg {...GEDEELD} className={className}>
      <path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5" />
    </svg>
  );
}

/** Snelheid: bliksem. */
export function IconBliksem({ className }: Props) {
  return (
    <svg {...GEDEELD} className={className}>
      <path d="M9 1.5L3.5 9.3h3.2L7 14.5l5.5-7.8H9.3z" />
    </svg>
  );
}

/** Contextvenster: gestapelde lagen. */
export function IconLagen({ className }: Props) {
  return (
    <svg {...GEDEELD} className={className}>
      <path d="M8 1.8L14 5l-6 3.2L2 5z" />
      <path d="M2 8.6l6 3.2 6-3.2" />
      <path d="M2 11.6l6 3.2 6-3.2" />
    </svg>
  );
}
