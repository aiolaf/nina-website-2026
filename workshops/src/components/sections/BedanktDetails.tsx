"use client";

import { useMemo, useSyncExternalStore } from "react";
import { volledigeDatum } from "@/lib/datum";
import { locatie, site } from "@/lib/site";
import { workshopBySlug, type Sessie, type Workshop } from "@/content/workshops";

/**
 * De bevestiging na een geslaagde betaling.
 *
 * Stripe kent onze workshops niet, dus geeft de success_url mee wélke datum
 * er gekocht is: /bedankt/?w=<slug>&d=<jjjj-mm-dd>. Zie STRIPE.md; dat staat
 * per Payment Link ingesteld.
 *
 * Ontbreken die parameters (iemand komt hier via een oude link of typt de
 * URL), dan valt de pagina terug op een algemene bevestiging. Nooit een
 * foutmelding: dit is de eerste pagina die iemand ziet na het betalen.
 *
 * De querystring wordt uit window.location gelezen en niet met
 * useSearchParams. Bij een statische export dwingt useSearchParams een
 * Suspense-grens af rond de hele pagina, en dat is veel omhaal voor twee
 * strings die alleen de tekst hieronder invullen. De URL is een bron buiten
 * React, dus useSyncExternalStore; de statische HTML wordt gebouwd zonder
 * querystring en toont daarom de algemene bevestiging tot hydratie.
 */
function abonneerOpUrl(herbereken: () => void) {
  window.addEventListener("popstate", herbereken);
  return () => window.removeEventListener("popstate", herbereken);
}

export default function BedanktDetails() {
  const query = useSyncExternalStore(
    abonneerOpUrl,
    () => window.location.search,
    () => ""
  );

  const gevonden = useMemo<{ workshop: Workshop; sessie: Sessie } | null>(() => {
    const params = new URLSearchParams(query);
    const slug = params.get("w");
    const datum = params.get("d");
    if (!slug || !datum) return null;
    const workshop = workshopBySlug(slug);
    const sessie = workshop?.sessies.find((s) => s.datum === datum);
    return workshop && sessie ? { workshop, sessie } : null;
  }, [query]);

  if (!gevonden) {
    return (
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-text-muted">
        Je plek staat op je naam. De bevestiging en de factuur zijn onderweg
        naar je mailbox. Check ook je spamfilter als je ze over vijf minuten
        nog niet ziet.
      </p>
    );
  }

  const { workshop, sessie } = gevonden;

  return (
    <>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-text-muted">
        Je plek bij <span className="text-ink">{workshop.naam}</span> staat op
        je naam. De bevestiging en de factuur zijn onderweg naar je mailbox.
      </p>

      <div className="kaart mt-8 max-w-xl border border-border bg-bg-card p-6">
        <p className="label-mono text-[10.5px] text-text-muted">Jouw sessie</p>
        <p className="font-display mt-2 text-xl font-bold">{workshop.naam}</p>
        <dl className="mt-4 space-y-2 text-[15px]">
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-text-muted">Wanneer</dt>
            <dd>
              {volledigeDatum(sessie.datum)}, {sessie.start}–{sessie.eind} uur
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-text-muted">Waar</dt>
            <dd>
              {locatie.naam}
              <br />
              {locatie.adres}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-text-muted">Trainer</dt>
            <dd>{workshop.trainer.naam}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-5">
          <AgendaKnop workshop={workshop} sessie={sessie} />
          <a
            href={locatie.routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm transition-colors hover:border-ink/35"
          >
            Plan je route
          </a>
        </div>
      </div>

      <div className="mt-8 max-w-xl">
        <p className="label-mono text-[10.5px] text-text-muted">
          Neem dit mee
        </p>
        <ul className="mt-3 space-y-2">
          {workshop.meenemen.map((m) => (
            <li
              key={m}
              className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
            >
              <span aria-hidden="true" className="shrink-0 font-mono">
                ·
              </span>
              {m}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * Zet de sessie in de agenda van de deelnemer. Het .ics-bestand wordt in de
 * browser zelf gemaakt, want er is geen server die het kan genereren.
 */
function AgendaKnop({
  workshop,
  sessie,
}: {
  workshop: Workshop;
  sessie: Sessie;
}) {
  function download() {
    const stempel = (tijd: string) =>
      `${sessie.datum.replace(/-/g, "")}T${tijd.replace(":", "")}00`;

    const regels = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//NinA AI//Workshops//NL",
      "BEGIN:VEVENT",
      `UID:${workshop.slug}-${sessie.datum}@workshops.nina-ai.nl`,
      /* Lokale tijd met TZID: zonder tijdzone zou een agenda in het
         buitenland de workshop op een ander uur zetten. */
      `DTSTART;TZID=Europe/Amsterdam:${stempel(sessie.start)}`,
      `DTEND;TZID=Europe/Amsterdam:${stempel(sessie.eind)}`,
      `SUMMARY:${workshop.naam} (NinA AI)`,
      `LOCATION:${locatie.naam}\\, ${locatie.adres}`,
      `DESCRIPTION:${workshop.ondertitel}. Vragen? ${site.url}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([regels.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workshop.slug}-${sessie.datum}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
    >
      Zet in mijn agenda
    </button>
  );
}
