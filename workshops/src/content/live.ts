/**
 * Gratis online sessies: de LinkedIn Lives.
 *
 * Bewust een eigen bestand en een eigen type, los van `workshops.ts`. Een
 * Live heeft geen ticket, geen prijs, geen zaal en geen maximum aantal
 * plaatsen, en aanmelden gaat via LinkedIn in plaats van via Stripe. Dat in
 * het workshopmodel proppen zou elk veld daar optioneel maken, en dan is er
 * geen model meer.
 *
 * Wat een Live commercieel is: de bovenkant van de trechter. Gratis, online,
 * lage drempel — en het onderwerp loopt door in een betaalde workshop.
 * `leidtNaar` legt die verwijzing vast, zodat de site hem op beide plekken
 * kan tonen zonder dat iemand het met de hand moet bijhouden.
 */

export type Live = {
  /** Alleen voor React-sleutels en ankers; er is geen detailpagina. */
  slug: string;
  naam: string;
  ondertitel: string;
  /** ISO-datum, `YYYY-MM-DD`. */
  datum: string;
  start: string;
  eind: string;
  /** Waar het draait, bijvoorbeeld "LinkedIn Live". */
  platform: string;
  /** Twee zinnen voor de kaart in de agenda. */
  kort: string;
  /** Drie tot vijf punten: wat je die drie kwartier meekrijgt. */
  wat: string[];
  /** Het LinkedIn-event waar je je aanmeldt. */
  aanmeldUrl: string;
  /** Slug van de workshop die op deze sessie voortbouwt. */
  leidtNaar?: string;
};

/* ====================================================================
   TE BEVESTIGEN: titel, tijden en de opsomming hieronder zijn ingevuld op
   basis van "LinkedIn Live, gratis en online, en de workshop van 7 oktober
   bouwt erop voort". Het LinkedIn-event zelf is niet uit te lezen zonder
   ingelogd te zijn. Loop de titel en de tijden na voordat dit live gaat.
   ==================================================================== */

export const LIVES: Live[] = [
  {
    slug: "second-brain-live",
    naam: "Je Second Brain voor AI",
    ondertitel: "Gratis LinkedIn Live",
    datum: "2026-09-02",
    start: "12:00",
    eind: "12:45",
    platform: "LinkedIn Live",
    kort:
      "Een gratis online sessie over waarom je AI algemene antwoorden geeft, en wat je eraan doet. De opmaat naar de workshop van 7 oktober.",
    wat: [
      "Waarom AI jou niet kent, en wat dat kost aan bruikbare antwoorden",
      "Hoe een second brain eruitziet als je hem echt volhoudt",
      "Wat je vandaag al kunt inrichten, zonder nieuwe software te kopen",
      "Vragen stellen in de chat, live beantwoord",
    ],
    aanmeldUrl:
      "https://www.linkedin.com/events/7496198940594450432/",
    leidtNaar: "second-brain",
  },
];

/** De nog komende lives, op datum gesorteerd. */
export function komendeLives(vandaag: string): Live[] {
  return LIVES.filter((l) => l.datum >= vandaag).sort((a, b) =>
    a.datum.localeCompare(b.datum)
  );
}

/** De eerstvolgende live die naar deze workshop leidt, als die er is. */
export function liveVoor(slug: string, vandaag: string): Live | null {
  return komendeLives(vandaag).find((l) => l.leidtNaar === slug) ?? null;
}
