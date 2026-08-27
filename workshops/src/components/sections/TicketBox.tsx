import Link from "next/link";
import KoopKnop from "@/components/ui/KoopKnop";
import { plekkenRegel } from "@/components/ui/StatusChip";
import { korteDatum } from "@/lib/datum";
import { euro, metBtw, site } from "@/lib/site";
import {
  heeftMeerderePrijzen,
  komendeSessies,
  koopbareTickets,
  sessieStatus,
  type Workshop,
} from "@/content/workshops";

/**
 * De ticketbox naast de tekst op een workshoppagina, op groot scherm
 * meescrollend.
 *
 * Waarom meescrollend: de detailpagina is lang, en iemand die halverwege het
 * programma besluit dat dit het is, moet niet eerst terug naar boven of door
 * naar beneden hoeven scrollen om te kunnen kopen. De box laat maximaal drie
 * datums zien; staan er meer, dan verwijst hij naar de volledige lijst
 * onderaan de pagina.
 */
export default function TicketBox({ workshop }: { workshop: Workshop }) {
  const sessies = komendeSessies(workshop);
  const getoond = sessies.slice(0, 3);
  const rest = sessies.length - getoond.length;

  const wachtlijst =
    `mailto:${site.email}?subject=` +
    encodeURIComponent(`Nieuwe data ${workshop.naam}`) +
    "&body=" +
    encodeURIComponent(
      `Hoi NinA,\n\nLaat het me weten zodra er nieuwe data voor ${workshop.naam} zijn.\n\nNaam:\nBedrijf:\n`
    );

  return (
    <div className="kaart border border-border bg-bg-card p-6 shadow-[0_18px_50px_rgba(12,14,24,0.07)]">
      <p className="label-mono text-[10.5px] text-text-muted">
        {sessies.length > 0 ? "Kies je datum" : "Nieuwe data"}
      </p>

      {getoond.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {getoond.map((sessie) => {
            const status = sessieStatus(sessie);
            const teKoop = koopbareTickets(sessie);
            /* Zelfde regel als in TicketRij: de prijs komt uit alle tickets,
               de knop alleen uit wat te koop staat. */
            const hoofd =
              sessie.tickets.find((t) => t.uitgelicht) ?? sessie.tickets[0];
            const vol = status === "uitverkocht";
            const koopbaar = hoofd && teKoop.includes(hoofd) && !vol;

            return (
              <li
                key={sessie.datum}
                className={`kaart border p-4 ${
                  vol ? "border-border bg-bg-alt" : "border-border"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="stempel text-[15px]">
                    {korteDatum(sessie.datum)}
                  </p>
                  <p className="text-xs text-text-muted">
                    {sessie.start}–{sessie.eind}
                  </p>
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  {/* De inlooptijd hoort hier en niet alleen in het
                      programma: wie leest dat het om 13:00 begint, komt om
                      13:00 en mist de koffie en het klaarzetten. */}
                  {sessie.inloop ? `Inloop vanaf ${sessie.inloop} · ` : ""}
                  {plekkenRegel(sessie)}
                </p>

                {hoofd && (
                  <p className="stempel mt-3 text-lg leading-none">
                    {euro(Math.round(hoofd.prijs / hoofd.personen))}
                    <span className="ml-1.5 font-sans text-xs font-normal text-text-muted">
                      p.p. excl. btw
                    </span>
                  </p>
                )}

                {koopbaar ? (
                  <>
                    <KoopKnop
                      workshop={workshop}
                      sessie={sessie}
                      ticket={hoofd}
                      plek="ticketbox"
                      vol
                      className="mt-3"
                    >
                      Koop je ticket
                    </KoopKnop>
                    {teKoop
                      .filter((t) => t !== hoofd)
                      .map((t) => (
                        <KoopKnop
                          key={t.naam}
                          workshop={workshop}
                          sessie={sessie}
                          ticket={t}
                          plek="ticketbox-extra"
                          variant="ghost"
                          vol
                          className="mt-2 !py-2 !pl-2 !pr-4 !text-[13px]"
                        >
                          {t.naam} · {euro(t.prijs)}
                        </KoopKnop>
                      ))}
                  </>
                ) : (
                  <a
                    href={wachtlijst}
                    className="mt-3 flex w-full items-center justify-center rounded-full border border-ink/15 py-2.5 text-[13px] transition-colors hover:border-ink/35"
                  >
                    {vol ? "Zet me op de wachtlijst" : "Hou me op de hoogte"}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-4">
          <p className="text-sm leading-relaxed text-text-muted">
            Er staat op dit moment geen datum gepland voor deze workshop. Laat
            je mailadres achter, dan hoor je het als eerste.
          </p>
          {/* Geen datum betekent geen specifieke sessie om op te wachten, dus
              hier naar het algemene aanmeldformulier in plaats van naar een
              mailtje over een datum die niet bestaat. */}
          <Link
            href="/#updates"
            className="mt-4 flex w-full items-center justify-center rounded-full bg-ink py-3 text-sm font-medium text-white"
          >
            Hou me op de hoogte
          </Link>
        </div>
      )}

      {rest > 0 && (
        <a
          href="#data"
          className="mt-4 block text-center text-xs text-text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Nog {rest} {rest === 1 ? "andere datum" : "andere data"} bekijken
        </a>
      )}

      <p className="mt-5 border-t border-border pt-4 text-[11.5px] leading-relaxed text-text-muted">
        Beveiligd betalen via Stripe met iDEAL, creditcard of Bancontact.
        Factuur direct in je mailbox. Tot 14 dagen vooraf kosteloos annuleren.
      </p>
      {metBtwRegel(workshop)}
    </div>
  );
}

/**
 * Eén regel met de prijs inclusief btw. Staat los, want de box toont per
 * datum de prijs exclusief en een particuliere koper moet ergens kunnen zien
 * wat er straks werkelijk wordt afgeschreven.
 */
function metBtwRegel(workshop: Workshop) {
  const prijzen = komendeSessies(workshop)
    .flatMap((s) => s.tickets)
    .map((t) => Math.round(t.prijs / t.personen));
  if (prijzen.length === 0) return null;
  const laagste = Math.min(...prijzen);
  return (
    <p className="mt-2 text-[11.5px] text-text-muted">
      {heeftMeerderePrijzen(workshop) ? "Vanaf " : ""}
      {euro(metBtw(laagste))} inclusief btw per persoon.
    </p>
  );
}
