import Reveal from "./Reveal";

type Ijkpunt = { maand: string; naam: string };

/**
 * Twaalf maanden als lijn met vijf ijkpunten. Vervangt drie tekstkaarten over
 * "wat een jaar oplevert": het ritme is een plaatje, niet een alinea. Op
 * mobiel klapt de lijn om naar een verticale reeks.
 */
export default function IjkpuntLijn({
  items,
  label,
}: {
  items: Ijkpunt[];
  label: string;
}) {
  return (
    <Reveal>
      <div className="rounded-[3px] border border-border bg-bg-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </p>
        <ol className="mt-7 grid gap-6 sm:grid-cols-5 sm:gap-3">
          {items.map((it, idx) => (
            <li key={it.maand} className="relative sm:pt-6">
              {/* De lijn: per cel een streepje, samen één doorlopende lijn.
                  De eerste helft van de eerste cel en de tweede helft van de
                  laatste blijven leeg, zodat de lijn niet los uitsteekt. */}
              <span
                aria-hidden="true"
                className={`absolute top-1.5 hidden h-px bg-border sm:block ${
                  idx === 0
                    ? "left-1/2 right-0"
                    : idx === items.length - 1
                      ? "left-0 right-1/2"
                      : "inset-x-0"
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-primary bg-bg sm:left-1/2 sm:-translate-x-1/2"
              />
              <div className="pl-6 sm:pl-0 sm:text-center">
                <p className="font-display text-sm font-bold text-primary">
                  {it.maand}
                </p>
                <p className="mt-0.5 text-sm leading-snug">{it.naam}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
