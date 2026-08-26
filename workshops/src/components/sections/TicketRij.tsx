import Link from "next/link";
import KoopKnop from "@/components/ui/KoopKnop";
import StatusChip, { plekkenRegel } from "@/components/ui/StatusChip";
import { korteDatum, stempel } from "@/lib/datum";
import { euro, metBtw, site } from "@/lib/site";
import {
  koopbareTickets,
  sessieStatus,
  type Sessie,
  type Workshop,
} from "@/content/workshops";

type Props = {
  workshop: Workshop;
  sessie: Sessie;
  /** Waar deze rij staat; gaat mee in de meting van de koopklik. */
  plek: string;
  /**
   * Op de detailpagina weet de bezoeker al welke workshop het is, dus dan
   * blijft de naam weg en is er meer plek voor de tijden.
   */
  toonWorkshop?: boolean;
  /** Staat de rij op de zandkleurige sectie? Dan kleuren de ponsgaten mee. */
  opAlt?: boolean;
};

/**
 * Eén datum, als kaartje.
 *
 * Dit is het belangrijkste component van de site: hier gebeurt de conversie.
 * De opbouw volgt hoe iemand een datum beoordeelt — eerst wanneer, dan wat,
 * dan wat het kost, dan de knop — en die volgorde is op elk scherm gelijk.
 *
 * Het duurste ticket staat nooit vooraan: de knop toont de prijs per persoon
 * van het gewone ticket, en het duo-ticket staat er als tweede regel onder.
 * Zo is de eerste prijs die iemand leest de laagste drempel, niet de hoogste.
 */
export default function TicketRij({
  workshop,
  sessie,
  plek,
  toonWorkshop = true,
  opAlt = false,
}: Props) {
  const status = sessieStatus(sessie);
  const dag = stempel(sessie.datum);
  const teKoop = koopbareTickets(sessie);
  /*
   * De prijs komt uit álle tickets, niet alleen uit wat er te koop staat.
   * Wat het kost is de eerste vraag bij een datum, ook bij een sessie
   * waarvan de betaallink nog moet worden aangemaakt of die uitverkocht is;
   * een lege prijskolom laat iemand afhaken voordat hij op de wachtlijst
   * kijkt. De knop hangt wél aan `teKoop`.
   */
  const hoofd = sessie.tickets.find((t) => t.uitgelicht) ?? sessie.tickets[0];
  const extraTeKoop = teKoop.filter((t) => t !== hoofd);
  const hoofdTeKoop = hoofd && teKoop.includes(hoofd) ? hoofd : null;

  const wachtlijst =
    `mailto:${site.email}?subject=` +
    encodeURIComponent(`Wachtlijst ${workshop.naam} — ${korteDatum(sessie.datum)}`) +
    "&body=" +
    encodeURIComponent(
      `Hoi NinA,\n\nZet mij op de wachtlijst voor ${workshop.naam} op ${korteDatum(
        sessie.datum
      )}.\n\nNaam:\nBedrijf:\nAantal personen:\n`
    );

  return (
    <div
      className={`ticket ${opAlt ? "ticket-op-alt" : ""} ${
        status === "uitverkocht" ? "ticket-uit" : ""
      } flex flex-col md:flex-row md:items-stretch`}
    >
      {/* Datumstempel */}
      <div className="flex shrink-0 items-center gap-4 px-6 pt-6 pb-4 md:w-[132px] md:flex-col md:items-start md:justify-center md:gap-0 md:py-7">
        <p className="stempel text-[11px] uppercase tracking-[0.14em] text-text-muted">
          {dag.weekdag}
        </p>
        <p className="stempel text-[2.6rem] font-light leading-none md:mt-1">
          {dag.dag}
        </p>
        <p className="stempel text-[13px] uppercase tracking-[0.1em] text-text-muted md:mt-1.5">
          {dag.maand} {dag.jaar}
        </p>
      </div>

      {/* De scheurlijn: verticaal op desktop, horizontaal als de kaart valt */}
      <div className="ticket-perforatie-h mx-6 md:hidden" />
      <div className="ticket-perforatie my-5 hidden md:block" />

      {/* Wat je koopt */}
      <div className="min-w-0 flex-1 px-6 pt-5 pb-2 md:py-7">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip sessie={sessie} />
          <span className="chip chip-neutraal">{workshop.niveau}</span>
          <span className="chip chip-neutraal">{workshop.duur}</span>
        </div>
        {toonWorkshop ? (
          <h3 className="font-display mt-3 text-xl font-bold leading-tight">
            <Link
              href={`/workshop/${workshop.slug}/`}
              className="underline-offset-4 hover:underline"
            >
              {workshop.naam}
            </Link>
          </h3>
        ) : (
          <h3 className="font-display mt-3 text-xl font-bold leading-tight">
            {korteDatum(sessie.datum)}
          </h3>
        )}
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          {sessie.start}–{sessie.eind} uur · {workshop.trainer.naam} ·{" "}
          {plekkenRegel(sessie)}
        </p>
      </div>

      {/* Prijs en knop */}
      <div className="flex shrink-0 flex-col justify-center gap-3 px-6 pt-3 pb-6 md:w-[248px] md:items-end md:py-7 md:text-right">
        {hoofd ? (
          <>
            <div>
              <p className="stempel text-2xl leading-none">
                {euro(Math.round(hoofd.prijs / hoofd.personen))}
              </p>
              <p className="mt-1 text-xs text-text-muted">
                p.p. excl. btw · {euro(metBtw(Math.round(hoofd.prijs / hoofd.personen)))}{" "}
                incl.
              </p>
            </div>
            {hoofdTeKoop && status !== "uitverkocht" ? (
              <>
                <KoopKnop
                  workshop={workshop}
                  sessie={sessie}
                  ticket={hoofdTeKoop}
                  plek={plek}
                >
                  Koop je ticket
                </KoopKnop>
                {extraTeKoop.map((t) => (
                  <KoopKnop
                    key={t.naam}
                    workshop={workshop}
                    sessie={sessie}
                    ticket={t}
                    plek={`${plek}-extra`}
                    variant="ghost"
                    className="!py-2 !pl-2 !pr-5 !text-[13px]"
                  >
                    {t.naam} · {euro(t.prijs)}
                  </KoopKnop>
                ))}
              </>
            ) : (
              /* Vol, of de datum staat wel vast maar de betaallink nog niet.
                 Beter een wachtlijst dan een dode knop of een datum die we
                 verzwijgen. */
              <a
                href={wachtlijst}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm transition-colors hover:border-ink/35"
              >
                {status === "uitverkocht"
                  ? "Zet me op de wachtlijst"
                  : "Hou me op de hoogte"}
              </a>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
