import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  /** Mono-label boven de kop, bijvoorbeeld "APO METHODE · 2/4". */
  label?: string;
  title: ReactNode;
  sub?: ReactNode;
  /**
   * Korte handgeschreven annotatie in violet naast de subregel. Maximaal één
   * per sectie: dat is het menselijke NinA-moment, geen tweede subkop.
   */
  annotatie?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "alt";
  /** Nummer voor het mono-label, bijvoorbeeld "03". Zet ook de knoop op het spoor. */
  nr?: string;
  id?: string;
};

/**
 * Sectie-stramien van de huisstijl "Licht": een mono-label met streep,
 * daarna een dunne serif-kop waarin het accent cursief is, dan een muted
 * subregel en de inhoud.
 *
 * Dit is de opvolger van Section (het merkdeck-stramien met paarse kicker
 * en vette sans-kop). Beide bestaan nu naast elkaar zolang de rest van de
 * site nog niet om is.
 */
export default function SectieLicht({
  label,
  title,
  sub,
  annotatie,
  children,
  className = "",
  variant = "default",
  nr,
  id,
}: Props) {
  const bg = variant === "alt" ? "bg-bg-alt" : "";

  return (
    <section
      id={id}
      className={`relative border-t border-border ${bg} ${className}`}
    >
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          {/* Blokje op het spoor in de linkermarge: gaat aan zodra de sectie
              in beeld komt. */}
          {nr && <span aria-hidden="true" className="spoor-knoop mt-2" />}
          {label && (
            <p className="label-mono mb-6 border-b border-border pb-3 text-[11.5px] text-text-muted sm:text-xs">
              {nr && <span className="mr-3 text-text">{nr}</span>}
              {label}
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
          {/* De noot staat in de buitenmarge zodra daar ruimte is, en anders
              gewoon onder de subregel. Twee keer dezelfde tekst in de DOM zou
              een schermlezer verdubbelen, dus de marge-versie is decoratief. */}
          {annotatie && (
            <>
              <p className="annotatie mt-4 text-[19px] 2xl:hidden sm:text-[21px]">
                {annotatie}
              </p>
              <p
                aria-hidden="true"
                className="annotatie marge-noot mt-1 text-[17px]"
              >
                {annotatie}
              </p>
            </>
          )}
        </Reveal>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

/** Cursief accent in een serif-kop. Vervangt de gekleurde <Em>. */
export function Cursief({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>;
}

/**
 * Groot cijfer in serif met de eenheid klein erachter en een mono-label
 * eronder. Het statistiek-patroon uit de stijlgids.
 */
export function StatSerif({
  cijfer,
  eenheid,
  label,
  className = "",
}: {
  cijfer: ReactNode;
  eenheid?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="display-serif text-[2.6rem] leading-none sm:text-[3.4rem]">
        {cijfer}
        {eenheid && (
          <span className="ml-2 font-sans text-[0.34em] font-normal text-text-muted">
            {eenheid}
          </span>
        )}
      </p>
      <p className="label-mono mt-3 text-[11px] text-text-muted">{label}</p>
    </div>
  );
}
