/**
 * Datumopmaak in het Nederlands. Alles op één plek, want een agenda waarin
 * de ene kaart "17 sep" zegt en de andere "17 september 2026" leest als drie
 * verschillende sites.
 *
 * De datums uit het contentbestand zijn kale ISO-strings (`2026-09-17`).
 * Die parsen we met een expliciete tijd van 12:00 UTC: doe je dat niet, dan
 * leest JavaScript ze als middernacht UTC en valt de datum in een westelijke
 * tijdzone een dag terug.
 */

function alsDate(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

const MAANDEN = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const MAANDEN_KORT = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];

const DAGEN = [
  "zondag",
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
];

/** "donderdag 17 september 2026" */
export function volledigeDatum(iso: string): string {
  const d = alsDate(iso);
  return `${DAGEN[d.getUTCDay()]} ${d.getUTCDate()} ${MAANDEN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "do 17 september" — voor kaarten waar het jaar niets toevoegt. */
export function korteDatum(iso: string): string {
  const d = alsDate(iso);
  return `${DAGEN[d.getUTCDay()].slice(0, 2)} ${d.getUTCDate()} ${MAANDEN[d.getUTCMonth()]}`;
}

/** Losse onderdelen voor het datumstempel op een kaartje. */
export function stempel(iso: string): {
  dag: string;
  maand: string;
  weekdag: string;
  jaar: string;
} {
  const d = alsDate(iso);
  return {
    dag: String(d.getUTCDate()),
    maand: MAANDEN_KORT[d.getUTCMonth()],
    weekdag: DAGEN[d.getUTCDay()].slice(0, 2),
    jaar: String(d.getUTCFullYear()),
  };
}

/**
 * `datetime`-waarde voor een <time>-element en voor de JSON-LD van een
 * evenement: ISO met tijd en de Nederlandse offset. Zomertijd is hier
 * afgerond op +02:00 voor april tot en met oktober, wat voor de weken
 * rondom de overgang een uur mis kan zitten. Voor zoekmachines is dat geen
 * probleem; de tijd die de bezoeker leest komt uit `start` en `eind` zelf.
 */
export function isoMetTijd(datum: string, tijd: string): string {
  const maand = Number(datum.slice(5, 7));
  const offset = maand >= 4 && maand <= 10 ? "+02:00" : "+01:00";
  return `${datum}T${tijd}:00${offset}`;
}
