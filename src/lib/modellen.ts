/**
 * Types en opmaak-helpers voor de pagina /ai-modellen.
 *
 * De data komt uit public/data/models.json, dat dagelijks door
 * scripts/update-models.mjs wordt vernieuwd. Dit bestand blijft bewust vrij
 * van Node-imports, want de client-component importeert er ook uit.
 *
 * Alle getallen worden hier met de hand geformatteerd en niet via Intl:
 * de pagina wordt op de server geprerenderd en daarna in de browser
 * gehydrateerd, en een locale die op die twee plekken net anders uitpakt
 * levert een hydration-mismatch op.
 */

export type Categorie =
  | "coding"
  | "agents"
  | "content"
  | "nederlands"
  | "budget"
  | "snelheid"
  | "redeneren"
  | "multimodaal"
  | "open-source";

export type Verdict = {
  categorie: Categorie[];
  ninaVerdict: string;
  waarGoedVoor: string;
  sterren: number | null;
  aanrader: boolean;
};

export type Model = {
  slug: string;
  naam: string;
  provider: string;
  intelligentie: number;
  coding: number | null;
  /** Euro per miljoen tokens, twee decimalen. */
  prijsInput: number | null;
  prijsOutput: number | null;
  /** Tokens per seconde. */
  snelheid: number | null;
  contextvenster: number | null;
  verdict: Verdict | null;
};

export type ModellenData = {
  laatstBijgewerkt: string;
  bron: { naam: string; url: string };
  wisselkoers: {
    van: string;
    naar: string;
    koers: number;
    datum: string | null;
    bron: string;
  };
  /** Hoeveel modellen er nu in de lijst staan. */
  aantal: number;
  /** De bovengrens die het update-script aanhoudt (de "top N"). */
  maximum: number;
  modellen: Model[];
};

/** Volgorde van de filterchips op de pagina. */
export const CATEGORIEEN: { sleutel: Categorie; label: string }[] = [
  { sleutel: "coding", label: "Coding" },
  { sleutel: "agents", label: "Agents" },
  { sleutel: "content", label: "Content" },
  { sleutel: "nederlands", label: "Nederlands" },
  { sleutel: "budget", label: "Budget" },
  { sleutel: "snelheid", label: "Snelheid" },
  { sleutel: "redeneren", label: "Redeneren" },
  { sleutel: "multimodaal", label: "Multimodaal" },
  { sleutel: "open-source", label: "Open source" },
];

const CATEGORIE_LABEL = new Map(
  CATEGORIEEN.map(({ sleutel, label }) => [sleutel, label])
);

export function categorieLabel(sleutel: string): string {
  return CATEGORIE_LABEL.get(sleutel as Categorie) ?? sleutel;
}

export type Sortering = "intelligentie" | "prijs" | "snelheid";

export const SORTERINGEN: { sleutel: Sortering; label: string }[] = [
  { sleutel: "intelligentie", label: "Intelligentie" },
  { sleutel: "prijs", label: "Prijs" },
  { sleutel: "snelheid", label: "Snelheid" },
];

/** 13.69 wordt "13,69". Altijd twee decimalen, zoals in het databestand. */
export function euro(waarde: number): string {
  return waarde.toFixed(2).replace(".", ",");
}

/**
 * Wisselkoers met vier decimalen. Op twee decimalen valt een koers van
 * 0,9124 terug naar 0,91, en dan klopt de omrekening op de pagina niet meer
 * met de cijfers in de kaarten.
 */
export function koers(waarde: number): string {
  return waarde.toFixed(4).replace(".", ",");
}

/** 73.4 wordt "73,4"; hele getallen houden geen komma. */
export function score(waarde: number): string {
  return String(waarde).replace(".", ",");
}

/* ---------------------------------------------------------------------
   Tokens naar eenheden die iemand zonder AI-achtergrond herkent.

   Het zijn schattingen en geen exacte omrekening: hoeveel tokens een tekst
   kost verschilt per model, per taal en per onderwerp. Nederlands is
   duurder dan Engels, omdat samenstellingen in meer stukken worden geknipt.
   Wil je de aannames bijstellen, dan is dit de enige plek waar dat hoeft.
   --------------------------------------------------------------------- */

/**
 * Gemiddeld aantal tokens per Nederlands woord. Voor Engels is dit ~1,3.
 * Precies 1,67 gekozen, want daarmee komt een miljoen tokens op ronde
 * getallen uit: 600.000 woorden, 1.500 pagina's, 75 pdf's. Binnen de
 * onzekerheid van zo'n schatting is dat net zo goed als 1,65.
 */
export const TOKENS_PER_WOORD = 1.67;
/** Woorden op een goedgevulde A4 met normale marges. */
export const WOORDEN_PER_PAGINA = 400;
/** Omvang van een "pdf" als eenheid: een rapport van twintig pagina's. */
export const PAGINAS_PER_PDF = 20;

/**
 * Ronden op ongeveer twee significante cijfers. Een schatting die als
 * "76.842 woorden" op het scherm staat doet alsof hij precies is.
 */
function rondAf(n: number): number {
  if (n <= 0) return 0;
  const orde = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / orde) * orde;
}

/** 600000 wordt "600.000". Met de hand, niet via Intl (zie de kop). */
export function duizendtal(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Wat een aantal tokens ruwweg is in tekst die je kunt vasthouden. */
export function menselijkeMaat(tokens: number): {
  woorden: string;
  paginas: string;
  pdfs: string;
  /** Onder de honderd pagina's is "pdf's" geen zinnige eenheid meer. */
  pdfsZinnig: boolean;
} {
  const woorden = tokens / TOKENS_PER_WOORD;
  const paginas = woorden / WOORDEN_PER_PAGINA;
  const pdfs = paginas / PAGINAS_PER_PDF;
  return {
    woorden: duizendtal(rondAf(woorden)),
    paginas: duizendtal(rondAf(paginas)),
    pdfs: duizendtal(rondAf(pdfs)),
    pdfsZinnig: pdfs >= 2,
  };
}

/** 1048576 wordt "1 mln", 200000 wordt "200K". */
export function contextKort(tokens: number): string {
  if (tokens >= 1_000_000) {
    const miljoen = tokens / 1_000_000;
    const afgerond = miljoen >= 10 ? Math.round(miljoen) : Math.round(miljoen * 10) / 10;
    return `${String(afgerond).replace(".", ",")} mln`;
  }
  if (tokens >= 1000) return `${Math.round(tokens / 1000)}K`;
  return String(tokens);
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

/** ISO-tijdstempel naar "15 augustus 2026". Lege of stukke invoer geeft null. */
export function datumNL(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  // UTC, zodat de server en de browser dezelfde datum opschrijven.
  return `${d.getUTCDate()} ${MAANDEN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Prijs waarop gesorteerd wordt: drie delen input op een deel output, de
 * gangbare mix voor een gemiddelde workload. Sorteren op alleen de
 * inputprijs zet modellen bovenaan die goedkoop lezen en duur schrijven.
 */
export function prijsIndex(model: Model): number | null {
  if (model.prijsInput === null || model.prijsOutput === null) return null;
  return (model.prijsInput * 3 + model.prijsOutput) / 4;
}
