/**
 * Quotes van deelnemers.
 *
 * Deze lijst is met opzet leeg. Zolang hij leeg is slaat de site het
 * reviewblok over; er staat dus liever niets dan een verzonnen quote met een
 * verzonnen naam eronder. Vul hem met echte reacties uit de evaluaties.
 *
 * Wat een bruikbare quote is: iets concreets over wat iemand die dag heeft
 * gedaan of daarna is gaan gebruiken. "Heel leuk en leerzaam!" overtuigt
 * niemand meer; "ik heb onze offerteteksten er in één middag mee omgezet"
 * wel.
 *
 * Vraag bij het overnemen altijd toestemming voor naam, functie en bedrijf.
 * Mag de bedrijfsnaam niet, laat `bedrijf` dan weg in plaats van hem te
 * vervangen door iets vaags als "een grote verzekeraar".
 */

export type Review = {
  quote: string;
  naam: string;
  functie: string;
  bedrijf?: string;
  /** Slug van de workshop waar deze quote bij hoort. */
  workshop: string;
};

export const REVIEWS: Review[] = [];
