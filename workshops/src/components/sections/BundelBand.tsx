"use client";

import { euro, metBtw } from "@/lib/site";
import { meetKoopklik } from "@/lib/meting";
import {
  bundelVoordeel,
  bundelWorkshops,
  eerstvolgende,
  losseTicketprijs,
  type Bundel,
} from "@/content/workshops";
import { korteDatum } from "@/lib/datum";

/**
 * De bundel: twee workshops in één keer.
 *
 * Dit is de goedkoopste omzetverhoging die deze site heeft. Iemand die de
 * Claude Workshop koopt is precies de persoon voor wie de Pro Workshop drie
 * weken later bedoeld is, en dat is makkelijker verkopen op het moment dat
 * hij toch al aan het kopen is dan met een mail achteraf.
 *
 * Vandaar dat het voordeel in euro's er letterlijk staat, en niet als
 * percentage: "je bespaart 100 euro" rekent voor de lezer al uit wat een
 * kortingspercentage hem laat uitrekenen.
 */
export default function BundelBand({ bundel }: { bundel: Bundel }) {
  const workshops = bundelWorkshops(bundel);
  const voordeel = bundelVoordeel(bundel);
  const teKoop = bundel.stripeLink.trim() !== "";
  /* De opgetelde losse prijs, doorgestreept naast de bundelprijs. Zonder dat
     getal is "100 euro voordeel" een bewering; met dat getal is het een som
     die de lezer zelf kan narekenen. */
  const los = workshops.reduce((som, w) => som + (losseTicketprijs(w) ?? 0), 0);

  return (
    <div className="kaart border border-ink/15 bg-bg-card p-7 sm:p-9">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-violet/12 text-violet">Bundel</span>
            {voordeel > 0 && (
              <span className="chip chip-schaars">
                {euro(voordeel)} voordeel
              </span>
            )}
          </div>

          <h3 className="display-serif mt-4 text-[1.8rem] leading-tight sm:text-[2.2rem]">
            {bundel.naam}
          </h3>
          <p className="mt-2 text-[15px] italic text-text-muted">
            {bundel.ondertitel}
          </p>

          <ol className="mt-6 space-y-3">
            {workshops.map((w, i) => {
              const eerste = eerstvolgende(w);
              return (
                <li key={w.slug} className="flex gap-4 text-[15px]">
                  <span className="stempel shrink-0 pt-0.5 text-sm text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-semibold">{w.naam}</span>
                    <span className="block text-sm text-text-muted">
                      {w.ondertitel}
                      {eerste ? ` · ${korteDatum(eerste.datum)}` : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="shrink-0 border-t border-border pt-6 lg:w-64 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:text-right">
          <p className="stempel text-3xl leading-none">
            {euro(bundel.prijs)}
            {voordeel > 0 && (
              <span className="ml-2 align-middle text-base text-text-muted line-through">
                {euro(los)}
              </span>
            )}
          </p>
          <p className="mt-1.5 text-xs text-text-muted">
            p.p. excl. btw · {euro(metBtw(bundel.prijs))} incl.
          </p>

          {teKoop ? (
            <a
              href={bundel.stripeLink}
              rel="noopener"
              onClick={() =>
                meetKoopklik({
                  workshop: bundel.naam,
                  datum: workshops
                    .map((w) => eerstvolgende(w)?.datum ?? "")
                    .filter(Boolean)
                    .join(" + "),
                  ticket: "Bundel",
                  prijs: bundel.prijs,
                  plek: "bundel",
                })
              }
              className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3.5 text-[15px] font-medium leading-none text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/16 font-mono text-sm"
              >
                →
              </span>
              Koop de bundel
            </a>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-text-muted">
              De bundel komt tegelijk met de losse tickets in de verkoop.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
