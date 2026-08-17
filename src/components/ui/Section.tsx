import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  /**
   * Korte handgeschreven annotatie in violet onder de subregel. Maximaal één
   * per sectie: het menselijke NinA-moment, geen tweede subkop.
   */
  annotatie?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "card" | "alt";
  id?: string;
};

/**
 * Sectie-stramien van de huisstijl "Licht": een mono-label met haarlijn,
 * daarna een dunne serif-kop waarin het accent cursief is (zie Em), dan een
 * muted subregel en de inhoud.
 *
 * Dit was het merkdeck-stramien met paarse ALL-CAPS kicker en vette
 * sans-kop. De API is bewust gelijk gebleven, zodat alle 31 pagina's die dit
 * component gebruiken in één keer meegaan.
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
  const bg = {
    default: "",
    card: "bg-bg-card",
    alt: "bg-bg-alt",
  }[variant];

  return (
    <section
      id={id}
      className={`relative border-t border-border ${bg} ${className}`}
    >
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          {kicker && (
            <p className="label-mono mb-6 border-b border-border pb-3 text-[11.5px] text-text-muted">
              {kicker}
            </p>
          )}
          <h2 className="display-serif title-blur max-w-3xl text-[2.1rem] sm:text-[2.8rem] lg:text-[3.4rem]">
            {title}
          </h2>
          {sub && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-[17px]">
              {sub}
            </p>
          )}
          {annotatie && (
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              {annotatie}
            </p>
          )}
        </Reveal>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

/**
 * Accent in een kop. In de lichte huisstijl is dat cursief in plaats van een
 * kleurgradient: de serif-cursief is het accent. Binnen een sans-kop (h3 en
 * kleiner) leest het als een gewone nadruk.
 */
export function Em({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>;
}
