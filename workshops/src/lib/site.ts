/**
 * Alle vaste gegevens van de site op één plek. Wie een adres, een nummer of
 * een cijfer aanpast doet dat hier en nergens anders.
 */
export const site = {
  naam: "NinA AI Workshops",
  bedrijf: "NinA AI B.V.",
  url: "https://workshops.nina-ai.nl",
  hoofdsite: "https://nina-ai.nl",
  email: "workshops@nina-ai.nl",
  kvk: "93390688",
  /* Het btw-nummer hoort op de factuur en in de voorwaarden. Vul aan zodra
     bekend; laat leeg staan liever dan een verzonnen nummer. */
  btw: "",
  whatsapp:
    "https://wa.me/31642558526?text=" +
    encodeURIComponent(
      "Hoi NinA, ik heb een vraag over een workshop op jullie kantoor."
    ),
  linkedin: "https://www.linkedin.com/company/nina-ai-agency/",
};

/**
 * De locatie. Elke workshop is fysiek op kantoor, dus dit staat los van de
 * workshops zelf: één plek, één routebeschrijving.
 */
export const locatie = {
  naam: "Het NinA AI kantoor",
  /* Het gebouw is bekender dan ons huisnummer: wie hier voor het eerst komt
     zoekt op B.Amsterdam, niet op 763A. Vandaar dat het gebouw overal
     meegenoemd wordt. */
  gebouw: "in het B.Amsterdam-gebouw",
  straat: "Johan Huizingalaan 763A",
  postcode: "1066 VH",
  plaats: "Amsterdam",
  get adres() {
    return `${this.straat}, ${this.postcode} ${this.plaats}`;
  },
  /* Een kaart-embed zou een Google-iframe met cookies zijn op een pagina die
     verder niets zet. Een link naar de routeplanner doet hetzelfde werk
     zonder toestemming te hoeven vragen. */
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Johan Huizingalaan 763A, 1066 VH Amsterdam"),
  ov: "Station Amsterdam Lelylaan op 12 minuten lopen; tramhalte Johan Huizingalaan voor de deur.",
  auto: "Betaald parkeren in de straat, en de parkeergarage onder het gebouw heeft plek.",
};

/**
 * Bewijs. Elk cijfer heeft een herkomst, zodat er geen getal zonder bron op
 * de pagina belandt. Klopt een cijfer niet meer, pas het hier aan.
 */
export const bewijs = {
  cijfer: "9,2",
  cijferBron: "gemiddelde beoordeling door deelnemers",
  deelnemers: "200+",
  organisaties: "160+",
};

/**
 * Waar iemand terecht kan die niet weet welke workshop bij hem past. Staat
 * los van het algemene adres: dit is persoonlijk advies vooraf, en dat is
 * bij een masterclass van een paar honderd euro het verschil tussen kopen en
 * afhaken.
 *
 * TE BEVESTIGEN: dit adres komt van de huidige site. Klopt het nog?
 */
export const advies = {
  email: "daan@nina-ai.nl",
  naam: "Daan",
};

/**
 * Het btw-tarief waarmee de brutoprijzen op de site worden getoond. Prijzen
 * in het contentbestand staan exclusief btw, want dat is hoe zakelijke
 * kopers rekenen; de site toont er de prijs inclusief btw bij omdat een
 * particulier anders bij Stripe voor een verrassing staat.
 */
export const BTW = 0.21;

export function metBtw(exclusief: number): number {
  return Math.round(exclusief * (1 + BTW));
}

/** "395" en niet "395,00": hele euro's, met een punt als duizendtal. */
export function euro(bedrag: number): string {
  return "€ " + bedrag.toLocaleString("nl-NL");
}
