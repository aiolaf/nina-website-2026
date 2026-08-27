"use client";

import Link from "next/link";
import { stempel } from "@/lib/datum";
import type { Live } from "@/content/live";
import { workshopBySlug } from "@/content/workshops";

/**
 * Een gratis online sessie in de agenda, in dezelfde kaartvorm als een
 * betaalde datum maar duidelijk een ander ding.
 *
 * Het verschil zit in de kleur: violet is op deze site het merkmoment en
 * wordt hier ingezet voor het enige item dat niets kost. Zo ziet iemand in
 * één blik welke regel in de lijst de gratis instap is, zonder dat we het
 * woord GRATIS drie keer hoeven te herhalen.
 *
 * Client-component om dezelfde reden als KoopKnop: de aanmeldklik gaat mee
 * in de meting. Aanmelden bij een gratis sessie is de goedkoopste lead die
 * deze site oplevert, dus die wil je kunnen tellen.
 */
export default function LiveRij({
  live,
  plek,
  opAlt = false,
}: {
  live: Live;
  plek: string;
  opAlt?: boolean;
}) {
  const dag = stempel(live.datum);
  const vervolg = live.leidtNaar ? workshopBySlug(live.leidtNaar) : undefined;

  function meet() {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      live: live.naam,
      sessie_datum: live.datum,
      plek,
    });
  }

  return (
    <div
      className={`ticket ${opAlt ? "ticket-op-alt" : ""} flex flex-col border-violet/35 md:flex-row md:items-stretch`}
    >
      <div className="flex shrink-0 items-center gap-4 px-6 pt-6 pb-4 md:w-[132px] md:flex-col md:items-start md:justify-center md:gap-0 md:py-7">
        <p className="stempel text-[11px] uppercase tracking-[0.14em] text-violet">
          {dag.weekdag}
        </p>
        <p className="stempel text-[2.6rem] font-light leading-none text-violet md:mt-1">
          {dag.dag}
        </p>
        <p className="stempel text-[13px] uppercase tracking-[0.1em] text-text-muted md:mt-1.5">
          {dag.maand} {dag.jaar}
        </p>
      </div>

      <div className="ticket-perforatie-h mx-6 md:hidden" />
      <div className="ticket-perforatie my-5 hidden md:block" />

      <div className="min-w-0 flex-1 px-6 pt-5 pb-2 md:py-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip bg-violet/12 text-violet">Gratis</span>
          <span className="chip chip-neutraal">Online</span>
          <span className="chip chip-neutraal">{live.platform}</span>
        </div>
        <h3 className="font-display mt-3 text-xl font-bold leading-tight">
          {live.naam}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          {live.start}–{live.eind} uur · {live.kort}
        </p>
        {vervolg && (
          <p className="mt-2 text-sm text-text-muted">
            Wil je er daarna zelf mee aan de slag?{" "}
            <Link
              href={`/workshop/${vervolg.slug}/`}
              className="text-ink underline-offset-4 hover:text-violet hover:underline"
            >
              {vervolg.naam}
            </Link>{" "}
            bouwt hierop voort.
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col justify-center gap-3 px-6 pt-3 pb-6 md:w-[248px] md:items-end md:py-7 md:text-right">
        <div>
          <p className="stempel text-2xl leading-none text-violet">Gratis</p>
          <p className="mt-1 text-xs text-text-muted">geen ticket nodig</p>
        </div>
        <a
          href={live.aanmeldUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={meet}
          className="group inline-flex items-center gap-3 rounded-full bg-violet py-3 pl-3 pr-7 text-[15px] font-medium leading-none text-white shadow-[0_10px_30px_rgba(153,82,224,0.28)] transition-transform duration-300 hover:scale-[1.02]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 font-mono text-sm transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
          Meld je aan
        </a>
      </div>
    </div>
  );
}
