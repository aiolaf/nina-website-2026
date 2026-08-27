import { komendeLives, type Live } from "@/content/live";
import { agenda, vandaag, type Sessie, type Workshop } from "@/content/workshops";

/**
 * De agenda zoals een bezoeker hem leest: alles op datum, betaald en gratis
 * door elkaar.
 *
 * Twee losse lijstjes naast elkaar zetten ("workshops" en "webinars") zou de
 * chronologie breken, en juist die chronologie is het verhaal: eerst gratis
 * online kennismaken op 2 september, dan de workshops in oktober. Daarom één
 * lijst met twee soorten items, en een eigen kaart per soort.
 */
export type ProgrammaItem =
  | { soort: "workshop"; datum: string; workshop: Workshop; sessie: Sessie }
  | { soort: "live"; datum: string; live: Live };

export function programma(): ProgrammaItem[] {
  const nu = vandaag();

  const workshops: ProgrammaItem[] = agenda().map((item) => ({
    soort: "workshop",
    datum: item.sessie.datum,
    workshop: item.workshop,
    sessie: item.sessie,
  }));

  const lives: ProgrammaItem[] = komendeLives(nu).map((live) => ({
    soort: "live",
    datum: live.datum,
    live,
  }));

  return [...lives, ...workshops].sort((a, b) => a.datum.localeCompare(b.datum));
}

/** Een sleutel die uniek is over beide soorten heen. */
export function programmaSleutel(item: ProgrammaItem): string {
  return item.soort === "live"
    ? `live-${item.live.slug}`
    : `${item.workshop.slug}-${item.sessie.datum}`;
}
