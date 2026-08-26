"use client";

import type { ReactNode } from "react";
import { meetKoopklik } from "@/lib/meting";
import type { Sessie, Ticket, Workshop } from "@/content/workshops";

type Props = {
  workshop: Workshop;
  sessie: Sessie;
  ticket: Ticket;
  /** Waar op de pagina deze knop staat; komt mee in de meting. */
  plek: string;
  children: ReactNode;
  variant?: "ink" | "ghost";
  vol?: boolean;
  className?: string;
};

/**
 * De enige knop op deze site die geld oplevert: van hier gaat de bezoeker
 * naar Stripe Checkout.
 *
 * Bewust een gewone <a> naar de Payment Link en geen tussenpagina: elke
 * extra stap tussen "ik wil dit" en het betaalscherm kost kopers. De meting
 * gaat mee in dezelfde klik, vóór de navigatie, en blokkeert niets: mislukt
 * de push, dan gaat de browser toch gewoon naar Stripe.
 *
 * Ook geen target="_blank". Bij een betaling wil je dat de bezoeker met de
 * terugknop terugkomt op de pagina waar hij vandaan kwam, en dat mobiele
 * browsers de betaalpagina niet als los venster wegmoffelen.
 */
export default function KoopKnop({
  workshop,
  sessie,
  ticket,
  plek,
  children,
  variant = "ink",
  vol = false,
  className = "",
}: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full py-3 pl-3 pr-7 text-[15px] font-medium leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.99] select-none";
  const varianten = {
    ink: "bg-ink text-white shadow-[0_10px_30px_rgba(12,14,24,0.14)]",
    ghost: "border border-ink/15 text-ink hover:border-ink/35",
  };
  const cirkel = {
    ink: "bg-white/16 text-white",
    ghost: "bg-ink/8 text-ink",
  };

  return (
    <a
      href={ticket.stripeLink}
      rel="noopener"
      onClick={() =>
        meetKoopklik({
          workshop: workshop.naam,
          datum: sessie.datum,
          ticket: ticket.naam,
          prijs: ticket.prijs,
          plek,
        })
      }
      className={`${base} ${varianten[variant]} ${vol ? "w-full justify-center" : ""} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm transition-transform duration-300 group-hover:translate-x-0.5 ${cirkel[variant]}`}
      >
        →
      </span>
      {children}
    </a>
  );
}
