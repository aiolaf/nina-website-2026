/**
 * Het spoor: een gestippelde lijn langs de linkerrand die zich vult terwijl je
 * scrollt, met per sectie een blokje dat aangaat (zie .spoor-knoop in
 * SectieLicht). Het is de visuele verwijzing naar wat NinA bouwt: een taak die
 * door een workflow loopt.
 *
 * Puur CSS: de vulling hangt aan animation-timeline: scroll(root), dus geen
 * scroll-listener en geen JS. Browsers zonder scroll-driven animaties zien
 * alleen de stippellijn, wat prima is. Onder 1536px is er geen marge en staat
 * hij uit (media query in globals.css).
 */
export default function AgentSpoor() {
  return (
    <div className="spoor" aria-hidden="true">
      <div className="spoor-vulling" />
    </div>
  );
}
