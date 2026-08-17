import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "merk" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  /**
   * `ink` is de standaard CTA: zwarte pill met een pijl in een cirkel.
   * `merk` is de violette variant en mag maximaal een keer per pagina,
   * meestal als afsluiter. `ghost` is de stille tweede keuze.
   */
  variant?: Variant;
  className?: string;
  /** Vaste machinenaam voor de klikmeting; zie KlikMeting. */
  "data-cta"?: string;
  "data-cta-soort"?: string;
};

const BASIS =
  "group inline-flex items-center gap-3 rounded-full py-4 pl-4 pr-7 text-[0.9375rem] font-medium transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:scale-[1.02] active:scale-100";

const VARIANTEN: Record<Variant, string> = {
  ink: "bg-text text-bg shadow-[0_12px_32px_rgba(12,14,24,0.16)] hover:shadow-[0_8px_24px_rgba(12,14,24,0.12)]",
  merk: "bg-primary text-white shadow-[0_12px_32px_rgba(153,82,224,0.28)] hover:bg-primary-light hover:shadow-[0_8px_24px_rgba(153,82,224,0.22)]",
  ghost:
    "border border-[rgba(12,14,24,0.16)] text-text hover:border-[rgba(12,14,24,0.4)]",
};

const CIRKEL: Record<Variant, string> = {
  ink: "bg-bg/15 text-bg",
  merk: "bg-white/20 text-white",
  ghost: "border border-[rgba(12,14,24,0.16)] text-text",
};

/**
 * Knop uit het huisstijldocument: pill met het pijl-glyph links in een
 * cirkel. Geen magneet-effect zoals elders op de site, want de lichte stijl
 * schrijft rustige beweging voor: alleen een schaal van 1,02 bij hover.
 */
export default function PillButton({
  href,
  children,
  variant = "ink",
  className = "",
  ...meting
}: Props) {
  const inhoud = (
    <>
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 ${CIRKEL[variant]}`}
      >
        &rarr;
      </span>
      <span>{children}</span>
    </>
  );

  const klassen = `${BASIS} ${VARIANTEN[variant]} ${className}`;
  const intern = href.startsWith("/") || href.startsWith("#");

  if (!intern) {
    const web = href.startsWith("http");
    return (
      <a
        href={href}
        {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
