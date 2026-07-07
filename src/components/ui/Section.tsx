import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "card" | "alt";
  id?: string;
};

/**
 * Sectie-stramien uit het merkdeck: paarse ALL-CAPS kicker, grote titel
 * (accentwoorden via <Em>), muted subregel, daarna content.
 */
export default function Section({
  kicker,
  title,
  sub,
  children,
  className = "",
  variant = "default",
  id,
}: Props) {
  const bg = {
    default: "",
    card: "bg-bg-card",
    alt: "bg-bg-alt",
  }[variant];

  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      {/* Eigen overflow-hidden wrapper, niet op de section zelf: anders
          wordt de section een scroll-container met scrollTop 0, waardoor
          position: sticky in de children (bv. WorkflowCompare) nooit meer
          op de paginascroll reageert. */}
      {variant !== "default" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="orb -right-32 -top-24 h-96 w-96 bg-primary/10" />
        </div>
      )}
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          {kicker && (
            <p className="title-blur mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {kicker}
            </p>
          )}
          <h2 className="title-blur font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {sub && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {sub}
            </p>
          )}
        </Reveal>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

/** Shimmerend accent in een titel, zoals de paarse emfase in het merkdeck. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-shimmer">{children}</span>;
}
