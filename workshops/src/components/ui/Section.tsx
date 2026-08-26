import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  /** Korte handgeschreven noot in violet. Maximaal één per sectie. */
  annotatie?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "card" | "alt";
  id?: string;
};

/**
 * Het sectie-stramien van de huisstijl: mono-label met haarlijn, dan een
 * dunne serif-kop met een cursief accent (zie Em), dan een muted subregel.
 */
export default function Section({
  kicker,
  title,
  sub,
  annotatie,
  children,
  className = "",
  variant = "default",
  id,
}: Props) {
  const bg = { default: "", card: "bg-bg-card", alt: "bg-bg-alt" }[variant];

  return (
    <section id={id} className={`relative border-t border-border ${bg} ${className}`}>
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          {kicker && (
            <p className="label-mono mb-6 border-b border-border pb-3 text-[11.5px] text-text-muted">
              {kicker}
            </p>
          )}
          <h2 className="display-serif max-w-3xl text-[2.1rem] sm:text-[2.6rem] lg:text-[3.1rem]">
            {title}
          </h2>
          {sub && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-[17px]">
              {sub}
            </p>
          )}
          {annotatie && (
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">{annotatie}</p>
          )}
        </Reveal>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

/** Het accent in een kop: cursief, geen kleur. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>;
}
