"use client";

import { useEffect, useState } from "react";
import { meetKoopklik } from "@/lib/meting";

type Props = {
  /** Wat er links in de balk staat, bijvoorbeeld "AI Start · do 17 sep". */
  titel: string;
  /** Prijsregel eronder. */
  onder: string;
  /** De Stripe Payment Link, of een intern anker als er niets te koop staat. */
  href: string;
  knop: string;
  /** Velden voor de meting; alleen gevuld als `href` naar Stripe gaat. */
  meting?: {
    workshop: string;
    datum: string;
    ticket: string;
    prijs: number;
  };
  /**
   * Zolang dit element in beeld is blijft de balk weg. Meestal de agenda:
   * daar staan de knoppen al, en dan zou de balk ze alleen maar afdekken.
   */
  verbergBij?: string;
};

/**
 * De vaste koopbalk onderin, alleen op mobiel.
 *
 * Op een telefoon is de knop uit de hero binnen één veeg weg, en die uit de
 * agenda pas na veel scrollen in beeld. Daartussen zit het grootste deel van
 * de pagina zonder koopmogelijkheid. Deze balk vult dat gat.
 *
 * Hij verschijnt pas na de eerste schermhoogte (anders dekt hij de hero af)
 * en verdwijnt zodra de agenda in beeld komt.
 */
export default function Koopbalk({
  titel,
  onder,
  href,
  knop,
  meting,
  verbergBij,
}: Props) {
  const [zichtbaar, setZichtbaar] = useState(false);
  const [agendaInBeeld, setAgendaInBeeld] = useState(false);

  useEffect(() => {
    const bepaal = () => setZichtbaar(window.scrollY > window.innerHeight * 0.8);
    bepaal();
    window.addEventListener("scroll", bepaal, { passive: true });
    return () => window.removeEventListener("scroll", bepaal);
  }, []);

  useEffect(() => {
    if (!verbergBij) return;
    const el = document.querySelector(verbergBij);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setAgendaInBeeld(entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, [verbergBij]);

  const tonen = zichtbaar && !agendaInBeeld;
  const naarStripe = href.startsWith("http");

  return (
    <div
      className={`koopbalk md:hidden ${tonen ? "is-zichtbaar" : ""}`}
      /* Uit de toetsenbordvolgorde zolang hij weggeschoven staat: anders
         springt de focus naar een knop die niemand ziet. */
      aria-hidden={!tonen}
      inert={!tonen}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold leading-tight">
            {titel}
          </p>
          <p className="truncate text-[12px] leading-tight text-text-muted">
            {onder}
          </p>
        </div>
        <a
          href={href}
          {...(naarStripe ? { rel: "noopener" } : {})}
          onClick={() => {
            if (meting) meetKoopklik({ ...meting, plek: "koopbalk" });
          }}
          className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-medium leading-none text-white"
        >
          {knop}
        </a>
      </div>
    </div>
  );
}
