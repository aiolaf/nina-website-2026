import type { Sessie } from "@/content/workshops";
import { SCHAARS_VANAF, sessieStatus } from "@/content/workshops";

/**
 * Het schaarste-signaal bij een datum.
 *
 * Bewust terughoudend: alleen als er echt weinig plekken over zijn staat er
 * een chip, en dan met het werkelijke aantal erin. Een teller die op elke
 * datum "nog 2 plekken!" roept is binnen één bezoek doorzien, en dan werkt
 * ook de echte schaarste niet meer. Zit een sessie ruim in zijn jasje, dan
 * staat er niets.
 */
export default function StatusChip({ sessie }: { sessie: Sessie }) {
  const status = sessieStatus(sessie);

  if (status === "uitverkocht") {
    return <span className="chip chip-uit">Uitverkocht</span>;
  }
  if (status === "binnenkort") {
    return <span className="chip chip-neutraal">Binnenkort in de verkoop</span>;
  }
  if (status === "schaars") {
    return (
      <span className="chip chip-schaars">
        {sessie.vrij === 1 ? "Laatste plek" : `Nog ${sessie.vrij} plekken`}
      </span>
    );
  }
  /* "Open": geen aantal, want dan zou er bij 12 van de 14 plekken "nog 12
     plekken" staan en dat leest als "niemand heeft geboekt". */
  return <span className="chip chip-vrij">Plek beschikbaar</span>;
}

/** Zelfde signaal, maar als losse tekstregel onder een prijs. */
export function plekkenRegel(sessie: Sessie): string {
  const status = sessieStatus(sessie);
  if (status === "uitverkocht") return "Deze datum is vol";
  /* Bij "binnenkort" zegt de chip al dat de verkoop nog moet openen; hier
     herhalen dat zou de enige regel met feiten over de sessie opeten. */
  if (status === "binnenkort") return `Maximaal ${sessie.plaatsen} deelnemers`;
  if (sessie.vrij <= SCHAARS_VANAF) {
    return sessie.vrij === 1
      ? "Nog één plek van de " + sessie.plaatsen
      : `Nog ${sessie.vrij} van de ${sessie.plaatsen} plekken`;
  }
  return `Maximaal ${sessie.plaatsen} deelnemers`;
}
