import Image from "next/image";
import Link from "next/link";
import { korteDatum } from "@/lib/datum";
import { euro } from "@/lib/site";
import {
  eerstvolgende,
  komendeSessies,
  vanafPrijs,
  type Workshop,
} from "@/content/workshops";

/**
 * De kaart per workshop op de homepage.
 *
 * Bovenaan het beeld, daaronder de belofte, en onderin de twee dingen waar
 * iemand op beslist: wat het kost en wanneer het is. Die twee staan bewust
 * op één regel vlak boven de knop, want dat is de laatste blik voordat er
 * geklikt wordt.
 */
export default function WorkshopKaart({ workshop }: { workshop: Workshop }) {
  const eerste = eerstvolgende(workshop);
  const aantalData = komendeSessies(workshop).length;
  const vanaf = vanafPrijs(workshop);

  return (
    <article className="kaart group flex h-full flex-col overflow-hidden border border-border bg-bg-card transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(12,14,24,0.1)]">
      <div className="foto aspect-[16/10] w-full">
        <Image
          src={workshop.foto}
          alt={workshop.fotoAlt}
          width={720}
          height={450}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-neutraal">{workshop.niveau}</span>
          <span className="chip chip-neutraal">{workshop.duur}</span>
        </div>

        <h3 className="font-display mt-4 text-2xl font-bold leading-tight">
          {workshop.naam}
        </h3>
        <p className="mt-1 text-[15px] italic text-text-muted">
          {workshop.ondertitel}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          {workshop.kort}
        </p>

        <ul className="mt-5 space-y-2">
          {workshop.leerdoelen.slice(0, 3).map((doel) => (
            <li key={doel} className="flex gap-2.5 text-sm leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
              />
              {doel}
            </li>
          ))}
        </ul>

        {/* Alles hieronder wordt naar de bodem geduwd, zodat de knoppen van
            alle kaarten in een rij op dezelfde hoogte staan. */}
        <div className="mt-auto pt-7">
          <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
            <div>
              <p className="label-mono text-[10.5px] text-text-muted">Vanaf</p>
              <p className="stempel mt-1 text-xl leading-none">
                {vanaf !== null ? `${euro(vanaf)} p.p.` : "op aanvraag"}
              </p>
            </div>
            <div className="text-right">
              <p className="label-mono text-[10.5px] text-text-muted">
                Eerstvolgend
              </p>
              <p className="stempel mt-1 text-xl leading-none">
                {eerste ? korteDatum(eerste.datum) : "nieuwe data volgen"}
              </p>
            </div>
          </div>

          <Link
            href={`/workshop/${workshop.slug}/`}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3.5 text-[15px] font-medium leading-none text-white transition-transform duration-300 hover:scale-[1.02]"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/16 font-mono text-sm"
            >
              →
            </span>
            {aantalData > 0
              ? `Bekijk ${aantalData} ${aantalData === 1 ? "datum" : "data"} en tickets`
              : "Bekijk de workshop"}
          </Link>
        </div>
      </div>
    </article>
  );
}
