/**
 * De enige bron van waarheid van deze site.
 *
 * Alles wat een bezoeker ziet komt hieruit: de agenda op de homepage, de
 * detailpagina's, de kaartjes, de prijzen en de knop naar Stripe. Wie een
 * datum toevoegt of een workshop uit de verkoop haalt, past alleen dit
 * bestand aan. Er is geen CMS en geen database: dat is bewust, want de site
 * draait als statische export op gewone webhosting (zie next.config.ts).
 *
 * Werkwijze voor een nieuwe datum:
 *   1. Maak in Stripe een Payment Link voor die specifieke datum.
 *   2. Zet de link in `stripeLink` van het bijbehorende ticket.
 *   3. Zet `plaatsen` en `vrij`.
 *   4. Commit, bouw, upload. Zie STRIPE.md en DEPLOY-HOSTNET.md.
 *
 * Een sessie zonder ingevulde `stripeLink` is niet kapot: de site toont hem
 * dan als "binnenkort in de verkoop" met een knop naar de wachtlijst. Zo kun
 * je data alvast aankondigen voordat de betaallinks klaarstaan.
 *
 * Gratis online sessies (de LinkedIn Lives) staan niet hier maar in
 * `live.ts`: die hebben geen ticket, geen zaal en geen prijs, en verwijzen
 * naar LinkedIn in plaats van naar Stripe.
 */

export type Ticket = {
  /** Wat er op de knop en op de factuur staat. */
  naam: string;
  /** Prijs per ticket in hele euro's, exclusief btw. */
  prijs: number;
  /** Aantal personen dat met dit ticket binnenkomt. Duo-ticket = 2. */
  personen: number;
  /** Eén regel onder de prijs. Kort houden: dit is geen voorwaardentekst. */
  toelichting?: string;
  /**
   * De Stripe Payment Link voor precies dit ticket op precies deze datum.
   * Leeg = nog niet in de verkoop.
   */
  stripeLink: string;
  /** Zet de nadruk op dit ticket in de lijst. Maximaal één per sessie. */
  uitgelicht?: boolean;
};

export type Sessie = {
  /** ISO-datum, `YYYY-MM-DD`. Wordt ook als sleutel gebruikt. */
  datum: string;
  /**
   * Vanaf hoe laat je binnen kunt lopen. Staat los van `start`, want een
   * deelnemer die om 13:00 leest komt om 13:00 en mist de koffie.
   */
  inloop?: string;
  /** Begintijd en eindtijd van het programma, 24-uurs, `HH:MM`. */
  start: string;
  eind: string;
  /** Hoeveel stoelen er in de ruimte staan. */
  plaatsen: number;
  /**
   * Hoeveel er nog vrij zijn. Bijwerken doe je met de hand na een
   * verkoopronde in Stripe; er is geen koppeling die dit live bijhoudt.
   * Op 0 verschijnt de sessie als uitverkocht, met de wachtlijstknop.
   */
  vrij: number;
  tickets: Ticket[];
};

export type Programmablok = {
  /** Bijvoorbeeld "13:00" of "Blok 2". */
  tijd: string;
  titel: string;
  tekst: string;
};

export type Trainer = {
  naam: string;
  rol: string;
  foto: string;
};

export type Niveau = "Instap" | "Verdieping" | "Masterclass";

export type Workshop = {
  /** Wordt het pad: /workshop/<slug>/ */
  slug: string;
  naam: string;
  /** Eén regel die het verschil met de andere workshops meteen duidelijk maakt. */
  ondertitel: string;
  niveau: Niveau;
  /** Komt op de kaart naast het niveau. */
  duur: string;
  /** Twee zinnen voor de kaart op de homepage en voor de meta-description. */
  kort: string;
  /** De belofte in de hero van de detailpagina. Mag langer. */
  intro: string;
  voorWie: string[];
  /** Wat iemand na afloop kan. Werkwoorden vooraan, geen vage beloftes. */
  leerdoelen: string[];
  programma: Programmablok[];
  /** Wat de deelnemer zelf meeneemt of vooraf regelt. */
  meenemen: string[];
  /** Wat NinA verzorgt. Dit is het "en dan krijg je ook nog"-blok. */
  inbegrepen: string[];
  trainer: Trainer;
  foto: string;
  /** Alt-tekst bij `foto`. */
  fotoAlt: string;
  sessies: Sessie[];
};

const OLAF: Trainer = {
  naam: "Olaf Lemmens",
  rol: "Founder NinA AI",
  foto: "/images/team-olaf.webp",
};

/* ====================================================================
   TE BEVESTIGEN VOORDAT DE SITE LIVE GAAT

   De data komen van Olaf en kloppen. De rest is overgenomen van de
   huidige Lovable-site en uit zoekresultaten, en moet nagelopen worden:

   - Prijzen: Claude Workshop 199, Claude Pro 399, allebei exclusief btw.
     Klopt dat, en staan ze op de huidige site ook exclusief?
   - De Claude Complete-bundel (zie BUNDELS onderaan): wat is de prijs?
   - Second Brain is nieuw: prijs, aantal plaatsen en de programmablokken
     zijn een voorstel, geen bestaande tekst.
   - Trainer staat overal op Olaf. Geeft Daan of iemand anders er een?
   - Tijden: inloop 12:30, programma 13:00-16:00, daarna borrel. Geldt dat
     ook voor Second Brain?
   ==================================================================== */

export const WORKSHOPS: Workshop[] = [
  {
    slug: "claude-workshop",
    naam: "Claude Workshop",
    ondertitel: "Cowork, Code & Skills",
    niveau: "Instap",
    duur: "Middag",
    kort:
      "Claude als je dagelijkse collega. Je leert werken met Cowork, ziet wat Claude Code voor je kan doen, en bouwt je eerste eigen Skill.",
    intro:
      "De meeste mensen gebruiken Claude als een betere zoekmachine: een vraag stellen, een antwoord lezen, klaar. Deze middag zetten we hem op zijn plek als collega. Je werkt met Cowork, je kijkt onder de motorkap bij Claude Code, en je gaat naar huis met een Skill die je zelf hebt gebouwd.",
    voorWie: [
      "Je gebruikt Claude of ChatGPT, maar blijft hangen in losse vragen stellen",
      "Je hebt van Cowork, Claude Code of Skills gehoord en niets ermee gedaan",
      "Je wilt weten wat er echt kan, zonder eerst een programmeur te worden",
    ],
    leerdoelen: [
      "Werk met Cowork: Claude die meewerkt aan een taak in plaats van erover praat",
      "Bouw een eigen Skill die jij en je collega's opnieuw kunnen draaien",
      "Zie wat Claude Code doet en wanneer je hem inzet zonder developer te zijn",
      "Zet je eigen documenten en context erin, zodat je niet elke keer opnieuw begint",
      "Weet welke informatie je er wel en niet in mag zetten",
    ],
    programma: [
      {
        tijd: "12:30",
        titel: "Inloop en koffie",
        tekst:
          "Je omgeving klaarzetten, samen met ons, zodat om 13:00 iedereen kan beginnen.",
      },
      {
        tijd: "13:00",
        titel: "Claude als collega, niet als zoekmachine",
        tekst:
          "Kort en concreet wat er onder de motorkap gebeurt, en waarom dat verklaart waar het misgaat.",
      },
      {
        tijd: "13:30",
        titel: "Cowork: samen aan één taak",
        tekst:
          "Je pakt een echte taak uit je eigen week en werkt hem samen met Claude af.",
      },
      {
        tijd: "14:30",
        titel: "Pauze",
        tekst: "Met iets te eten en te drinken.",
      },
      {
        tijd: "14:45",
        titel: "Je eerste eigen Skill",
        tekst:
          "Van een handeling die je vaak herhaalt naar een Skill die je collega's kunnen overnemen.",
      },
      {
        tijd: "15:30",
        titel: "Claude Code, van een afstandje",
        tekst:
          "Wat het is, wat het voor je kan doen, en wanneer je er wél en niet aan moet beginnen.",
      },
      {
        tijd: "16:00",
        titel: "Borrel",
        tekst: "Napraten met de groep en met de trainer.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een Claude-account (Pro is aan te raden; laat het ons weten als dat een probleem is)",
      "Twee taken uit je eigen week waar je nu te lang mee bezig bent",
    ],
    inbegrepen: [
      "Kleine groep, dus er is tijd voor je eigen vraag",
      "Een werkende Claude-omgeving met de Skills die je die middag bouwt",
      "Cheatsheet en templates mee naar huis",
      "Certificaat van deelname",
      "Koffie, iets te eten en een borrel na afloop",
    ],
    trainer: OLAF,
    foto: "/images/beeld/workshop-tafel.webp",
    fotoAlt: "Deelnemers werken aan tafel tijdens een Claude-workshop",
    sessies: [
      {
        datum: "2026-10-01",
        inloop: "12:30",
        start: "13:00",
        eind: "16:00",
        plaatsen: 15,
        vrij: 15,
        tickets: [
          {
            naam: "Ticket",
            prijs: 199,
            personen: 1,
            toelichting: "Eén plek, inclusief certificaat en borrel",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 358,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
  {
    slug: "second-brain",
    naam: "Je Second Brain voor AI",
    ondertitel: "Alles wat je weet op één plek, klaar voor AI",
    niveau: "Verdieping",
    duur: "Middag",
    kort:
      "AI is pas nuttig als hij weet wat jij weet. Deze middag bouw je de kennisbank waar je AI uit put, en zet je hem meteen aan het werk.",
    intro:
      "Je AI geeft algemene antwoorden omdat hij algemene kennis heeft. Alles wat jou onderscheidt — je klanten, je afspraken, je manier van werken, je aantekeningen van drie jaar — zit in je hoofd, je mail en twaalf mappen. Deze middag brengen we dat samen tot één second brain, en koppelen we er AI aan vast. We gaan verder waar de gratis LinkedIn Live van 2 september ophield.",
    voorWie: [
      "Je gebruikt AI dagelijks en krijgt te algemene antwoorden terug",
      "Je aantekeningen, documenten en ideeën staan overal en nergens",
      "Je wilt dat AI met jouw kennis werkt en niet met die van het internet",
    ],
    leerdoelen: [
      "Zet één plek op waar je kennis binnenkomt, in plaats van vijf",
      "Leg je notities zo vast dat een AI-model ze kan gebruiken",
      "Koppel je second brain aan Claude, zodat hij eruit put in plaats van gokt",
      "Laat AI het bijhouden opknappen: samenvatten, opschonen, doorzetten",
      "Bepaal wat er wél en niet in mag, en hoe je dat afschermt",
    ],
    programma: [
      {
        tijd: "12:30",
        titel: "Inloop en koffie",
        tekst:
          "We kijken mee met wat je nu gebruikt, zodat we op jouw situatie kunnen aansluiten.",
      },
      {
        tijd: "13:00",
        titel: "Waarom je AI algemeen blijft",
        tekst:
          "Wat een model wel en niet over jou weet, en waarom context het hele verschil maakt.",
      },
      {
        tijd: "13:30",
        titel: "De opzet van je second brain",
        tekst:
          "Eén plek, een indeling die je volhoudt, en een manier waarop dingen binnenkomen zonder dat je eraan denkt.",
      },
      {
        tijd: "14:30",
        titel: "Pauze",
        tekst: "Met iets te eten en te drinken.",
      },
      {
        tijd: "14:45",
        titel: "AI eraan koppelen",
        tekst:
          "Je kennisbank aan Claude hangen en er antwoorden uit halen die kloppen omdat ze uit jouw materiaal komen.",
      },
      {
        tijd: "15:30",
        titel: "Het bijhouden automatiseren",
        tekst:
          "De reden dat elk systeem doodbloedt is onderhoud. Dat laten we AI doen.",
      },
      {
        tijd: "16:00",
        titel: "Borrel",
        tekst: "Napraten met de groep en met de trainer.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een Claude-account",
      "Je huidige aantekeningen, in welke vorm dan ook — ook als het een chaos is",
      "Een vraag die je vaak aan collega's stelt omdat je het antwoord nooit terugvindt",
    ],
    inbegrepen: [
      "Kleine groep, dus er is tijd voor je eigen situatie",
      "De opzet van het NinA-second-brain als startpunt mee naar huis",
      "Cheatsheet en templates",
      "Certificaat van deelname",
      "Koffie, iets te eten en een borrel na afloop",
    ],
    trainer: OLAF,
    /* Op de dia in dit beeld staat een AI-contentmachine die op eigen data
       draait. Dat is precies waar deze middag over gaat, dus dit beeld doet
       inhoudelijk werk in plaats van sfeer. */
    foto: "/images/beeld/zaal-verkenners.webp",
    fotoAlt:
      "Olaf laat zien hoe hij een AI-contentmachine op zijn eigen data heeft gebouwd",
    sessies: [
      {
        datum: "2026-10-07",
        inloop: "12:30",
        start: "13:00",
        eind: "16:00",
        plaatsen: 15,
        vrij: 15,
        tickets: [
          {
            naam: "Ticket",
            prijs: 199,
            personen: 1,
            toelichting: "Eén plek, inclusief certificaat en borrel",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 358,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
  {
    slug: "claude-pro",
    naam: "Claude Pro Workshop",
    ondertitel: "Eigen Skills, Connectors, MCP en Claude Code als agent",
    niveau: "Masterclass",
    duur: "Middag",
    kort:
      "Geen introductie maar een masterclass. Je bouwt eigen Skills, hangt Claude aan je eigen systemen via Connectors en MCP, en zet Claude Code als agent aan het werk.",
    intro:
      "Dit is de diepe versie. We gaan ervan uit dat je de basis van Claude beheerst en al eens iets met connectors hebt gedaan. De middag gaat over het bouwen: eigen Skills die echt iets doen, Claude verbinden met de systemen waar je werk in zit, en een agent die zelf stappen zet zonder dat je hem elke keer moet aansturen.",
    voorWie: [
      "Je werkt dagelijks met Claude en loopt tegen de grenzen van de standaardversie aan",
      "Je hebt al eens een connector ingesteld, of weet in elk geval wat het is",
      "Je wilt Claude aan je eigen systemen en data hangen",
    ],
    leerdoelen: [
      "Bouw Skills die verder gaan dan een prompt: met stappen, bestanden en controle",
      "Zet Connectors op naar de systemen waar jouw werk in zit",
      "Begrijp wat MCP is en wanneer je er een inzet in plaats van een integratie",
      "Laat Claude Code als agent een taak van begin tot eind afmaken",
      "Begrens wat een agent mag, en test hem op de gevallen waar hij misgaat",
    ],
    programma: [
      {
        tijd: "12:30",
        titel: "Inloop en koffie",
        tekst:
          "Omgeving klaarzetten en sleutels controleren, zodat we om 13:00 kunnen bouwen.",
      },
      {
        tijd: "13:00",
        titel: "Skills die echt iets doen",
        tekst:
          "Van een prompt met instructies naar een Skill met stappen, bestanden en zelfcontrole.",
      },
      {
        tijd: "13:45",
        titel: "Connectors en MCP",
        tekst:
          "Claude verbinden met je eigen systemen. Wat het verschil is, wat je waarvoor kiest, en waar het misgaat.",
      },
      {
        tijd: "14:30",
        titel: "Pauze",
        tekst: "Met iets te eten en te drinken.",
      },
      {
        tijd: "14:45",
        titel: "Claude Code als agent",
        tekst:
          "Een taak die zichzelf afmaakt: gereedschap geven, grenzen stellen, laten draaien.",
      },
      {
        tijd: "15:30",
        titel: "Stukmaken en dichttimmeren",
        tekst:
          "We proberen elkaars agent te laten struikelen. Het leerzaamste half uur van de middag.",
      },
      {
        tijd: "16:00",
        titel: "Borrel",
        tekst: "Napraten met de groep en met de trainer.",
      },
    ],
    meenemen: [
      "Een laptop waarop je zelf dingen mag installeren",
      "Claude Pro of Max, en Claude Code geïnstalleerd (we sturen vooraf de instructie)",
      "Toegang tot een systeem dat je wilt koppelen, bijvoorbeeld je agenda of een sheet",
      "Een taak uit je werk waarvan je denkt: dit zou vanzelf moeten gaan",
    ],
    inbegrepen: [
      "Kleine groep, met genoeg ruimte voor je eigen vraag",
      "Alle voorbeeld-Skills en agents als bestand mee naar huis",
      "Cheatsheet en templates",
      "Certificaat van deelname",
      "Koffie, iets te eten en een borrel na afloop",
    ],
    trainer: OLAF,
    foto: "/images/beeld/bouwen-development.webp",
    fotoAlt: "Scherm met een agent in aanbouw tijdens de workshop",
    sessies: [
      {
        datum: "2026-10-22",
        inloop: "12:30",
        start: "13:00",
        eind: "16:00",
        plaatsen: 15,
        vrij: 15,
        tickets: [
          {
            naam: "Ticket",
            prijs: 399,
            personen: 1,
            toelichting: "Eén plek, inclusief certificaat en borrel",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 718,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
];

/* ====================================================================
   Bundels

   Twee workshops in één keer, voordeliger. Bestaat al op de huidige site
   als "Claude Complete". Een bundel is bewust geen tickettype binnen een
   sessie: hij hoort bij twee datums tegelijk en heeft dus zijn eigen
   Payment Link.
   ==================================================================== */

export type Bundel = {
  naam: string;
  ondertitel: string;
  /** De slugs van de workshops die erin zitten, op volgorde. */
  workshops: string[];
  /** Prijs van de bundel, exclusief btw. */
  prijs: number;
  stripeLink: string;
};

export const BUNDELS: Bundel[] = [
  {
    naam: "Claude Complete",
    ondertitel: "De Claude Workshop en de Pro Workshop in één keer",
    workshops: ["claude-workshop", "claude-pro"],
    /* TE BEVESTIGEN: bundelprijs. 199 + 399 is 598; hieronder staat een
       voordeel van 100 euro. Vervang door de prijs die op de huidige site
       staat. */
    prijs: 498,
    stripeLink: "",
  },
];

/** De workshops die bij een bundel horen, in de opgegeven volgorde. */
export function bundelWorkshops(bundel: Bundel): Workshop[] {
  return bundel.workshops
    .map((slug) => workshopBySlug(slug))
    .filter((w): w is Workshop => Boolean(w));
}

/** De bundels waar deze workshop in zit. */
export function bundelsVoor(slug: string): Bundel[] {
  return BUNDELS.filter((b) => b.workshops.includes(slug));
}

/**
 * De prijs van het gewone ticket voor één persoon. Niet `vanafPrijs`: die
 * pakt de goedkoopste prijs per persoon en dat is het duo-ticket, waardoor
 * een vergelijking met de bundel te laag uitvalt.
 */
export function losseTicketprijs(workshop: Workshop): number | null {
  const sessie = eerstvolgende(workshop) ?? workshop.sessies[0];
  if (!sessie) return null;
  const enkel = sessie.tickets.filter((t) => t.personen === 1);
  if (enkel.length === 0) return null;
  return (enkel.find((t) => t.uitgelicht) ?? enkel[0]).prijs;
}

/** Wat je bespaart ten opzichte van twee losse tickets. */
export function bundelVoordeel(bundel: Bundel): number {
  const los = bundelWorkshops(bundel).reduce(
    (som, w) => som + (losseTicketprijs(w) ?? 0),
    0
  );
  return Math.max(0, los - bundel.prijs);
}

/* ====================================================================
   Afgeleide gegevens. Alles hieronder rekent op WORKSHOPS en heeft geen
   eigen inhoud, zodat er maar op één plek iets bijgewerkt hoeft te worden.
   ==================================================================== */

export type AgendaItem = {
  workshop: Workshop;
  sessie: Sessie;
};

/**
 * Waar "vandaag" begint. De site is een statische export, dus dit wordt
 * vastgelegd op het moment van bouwen, niet in de browser van de bezoeker.
 * Gevolg: een datum verdwijnt pas uit de agenda na een nieuwe build. Dat is
 * precies waarom DEPLOY-HOSTNET.md zegt dat je na elke datumwijziging
 * opnieuw bouwt en uploadt.
 */
export function vandaag(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Alle nog komende sessies van alle workshops, op datum gesorteerd. */
export function agenda(): AgendaItem[] {
  const grens = vandaag();
  return WORKSHOPS.flatMap((workshop) =>
    workshop.sessies
      .filter((sessie) => sessie.datum >= grens)
      .map((sessie) => ({ workshop, sessie }))
  ).sort((a, b) => a.sessie.datum.localeCompare(b.sessie.datum));
}

/** De komende sessies van één workshop. */
export function komendeSessies(workshop: Workshop): Sessie[] {
  const grens = vandaag();
  return workshop.sessies
    .filter((sessie) => sessie.datum >= grens)
    .sort((a, b) => a.datum.localeCompare(b.datum));
}

/** De eerstvolgende sessie van een workshop, of null als er geen datum staat. */
export function eerstvolgende(workshop: Workshop): Sessie | null {
  return komendeSessies(workshop)[0] ?? null;
}

export function workshopBySlug(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug);
}

/** De laagste ticketprijs van een workshop, voor "vanaf €" op de kaart. */
export function vanafPrijs(workshop: Workshop): number | null {
  const prijzen = workshop.sessies.flatMap((s) =>
    s.tickets.map((t) => Math.round(t.prijs / t.personen))
  );
  return prijzen.length ? Math.min(...prijzen) : null;
}

/**
 * De vier toestanden van een sessie. De hele site leunt hierop, van de chip
 * op de kaart tot welke knop er onder staat.
 *
 * - "open"       gewoon te koop
 * - "schaars"    nog een paar plekken; dit is het enige urgentiesignaal
 * - "uitverkocht" vol, of de datum is voorbij
 * - "binnenkort" datum staat vast, betaallink nog niet
 */
export type SessieStatus = "open" | "schaars" | "uitverkocht" | "binnenkort";

/** Vanaf hoeveel vrije plekken we "laatste plekken" tonen. */
export const SCHAARS_VANAF = 4;

export function sessieStatus(sessie: Sessie): SessieStatus {
  if (sessie.vrij <= 0) return "uitverkocht";
  const teKoop = sessie.tickets.some((t) => t.stripeLink.trim() !== "");
  if (!teKoop) return "binnenkort";
  return sessie.vrij <= SCHAARS_VANAF ? "schaars" : "open";
}

/** De tickets die daadwerkelijk een betaallink hebben. */
export function koopbareTickets(sessie: Sessie): Ticket[] {
  return sessie.tickets.filter((t) => t.stripeLink.trim() !== "");
}
