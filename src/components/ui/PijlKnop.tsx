import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "ghost" | "licht" | "violet";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Zet de pijl uit, bijvoorbeeld bij een secundaire tekstachtige knop. */
  zonderPijl?: boolean;
  className?: string;
  "data-cta"?: string;
  "data-cta-soort"?: string;
};

/**
 * CTA-pill uit de huisstijl "Licht": zwarte pill, witte tekst, pijl-glyph
 * links in een cirkel. Hover schaalt naar 1.02, verder geen beweging.
 *
 * Bewust geen client-component: de vorige MagneticButton had een
 * pointermove-listener per knop nodig voor het magneeteffect, en dat past
 * niet bij een stijl die op rust drijft. Alles hier is CSS.
 */
export default function PijlKnop({
  href,
  children,
  variant = "ink",
  zonderPijl = false,
  className = "",
  ...meting
}: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full text-[15px] font-medium leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.99] select-none";
  // Met pijl is de linkerpadding kleiner: de cirkel vult die ruimte.
  const spacing = zonderPijl ? "px-7 py-4" : "py-3 pl-3 pr-7";

  const varianten: Record<Variant, string> = {
    ink: "bg-ink text-white shadow-[0_10px_30px_rgba(12,14,24,0.14)]",
    ghost: "border border-ink/15 text-ink hover:border-ink/35",
    licht: "bg-[#f2f2f2] text-ink",
    violet: "bg-violet text-white shadow-[0_10px_30px_rgba(153,82,224,0.28)]",
  };

  const cirkel: Record<Variant, string> = {
    ink: "bg-white/16 text-white",
    ghost: "bg-ink/8 text-ink",
    licht: "bg-ink/10 text-ink",
    violet: "bg-white/20 text-white",
  };

  const inhoud = (
    <>
      {!zonderPijl && (
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm transition-transform duration-300 group-hover:translate-x-0.5 ${cirkel[variant]}`}
        >
          →
        </span>
      )}
      {children}
    </>
  );

  const klassen = `${base} ${spacing} ${varianten[variant]} ${className}`;
  const isIntern = href.startsWith("/") || href.startsWith("#");

  if (!isIntern) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={klassen}
        {...meting}
      >
        {inhoud}
      </a>
    );
  }

  return (
    <Link href={href} className={klassen} {...meting}>
      {inhoud}
    </Link>
  );
}
