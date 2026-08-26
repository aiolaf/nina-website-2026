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
  /** Begintijd en eindtijd, 24-uurs, `HH:MM`. */
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

export type Workshop = {
  /** Wordt het pad: /workshop/<slug>/ */
  slug: string;
  naam: string;
  /** Eén regel die het verschil met de andere workshops meteen duidelijk maakt. */
  ondertitel: string;
  niveau: "Beginner" | "Gevorderd" | "Bouwer";
  /** "Dagdeel" of "Hele dag" — komt op de kaart naast het niveau. */
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

const NICK: Trainer = {
  naam: "Nick Spapens",
  rol: "AI Consultant",
  foto: "/images/team-nick.webp",
};

const SERGEI: Trainer = {
  naam: "Sergei Agaronian",
  rol: "AI Developer",
  foto: "/images/team-sergei.webp",
};

/**
 * LET OP — de data en Stripe-links hieronder zijn een ingevulde opzet, geen
 * echte agenda. Vervang ze door de werkelijke data voordat de site live
 * gaat. De structuur is wat telt; de inhoud is van jullie.
 */
export const WORKSHOPS: Workshop[] = [
  {
    slug: "ai-start",
    naam: "AI Start",
    ondertitel: "Van nieuwsgierig naar dagelijks gebruik",
    niveau: "Beginner",
    duur: "Dagdeel",
    kort:
      "Een middag waarin je ChatGPT en Claude leert inzetten op je eigen werk. Je gaat naar huis met drie dingen die je morgen al gebruikt.",
    intro:
      "Je hebt ChatGPT geprobeerd, en het bleef bij een paar vragen stellen. Deze middag zetten we er echt werk mee om: we pakken taken uit jouw week en bouwen daar samen een aanpak omheen die blijft werken.",
    voorWie: [
      "Je gebruikt AI af en toe, maar niet structureel",
      "Je werkt veel met tekst, mail, documenten of onderzoek",
      "Je wilt weten wat er wél en niet kan, zonder de hype",
    ],
    leerdoelen: [
      "Schrijf prompts die de eerste keer bruikbaar zijn, in plaats van na tien pogingen",
      "Kies per taak tussen ChatGPT, Claude en zoeken, en weet waarom",
      "Zet een eigen taak om in een herbruikbare prompt die collega's ook kunnen draaien",
      "Herken waar AI eromheen praat en hoe je dat eruit haalt",
      "Weet welke informatie je er wel en niet in mag zetten",
    ],
    programma: [
      {
        tijd: "13:00",
        titel: "Binnenkomst en koffie",
        tekst: "Kennismaken met de groep en met waar iedereen vandaan komt.",
      },
      {
        tijd: "13:30",
        titel: "Wat het model wel en niet doet",
        tekst:
          "Kort en concreet: hoe een taalmodel tot een antwoord komt, en waarom dat verklaart waar het misgaat.",
      },
      {
        tijd: "14:15",
        titel: "Prompten aan de hand van je eigen werk",
        tekst:
          "Je neemt een echte taak mee. Die bouwen we samen om tot een prompt die je vaker kunt draaien.",
      },
      {
        tijd: "15:15",
        titel: "Pauze",
        tekst: "Met iets te eten.",
      },
      {
        tijd: "15:30",
        titel: "Documenten, projecten en geheugen",
        tekst:
          "Eigen bestanden erin, een project inrichten, en zorgen dat je niet elke keer opnieuw begint.",
      },
      {
        tijd: "16:30",
        titel: "Je eigen drie",
        tekst:
          "Iedereen legt vast welke drie taken vanaf morgen met AI gaan. Die nemen we door.",
      },
      {
        tijd: "17:00",
        titel: "Borrel",
        tekst: "Napraten met de groep en met de trainer.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een betaald account op ChatGPT of Claude (of laat het ons weten, dan regelen we een gastaccount)",
      "Twee taken uit je eigen week waar je nu te lang mee bezig bent",
    ],
    inbegrepen: [
      "Maximaal 14 deelnemers, dus er is tijd voor je eigen vraag",
      "Werkboek en de complete promptset die we die middag bouwen",
      "Lunch, koffie en een borrel na afloop",
      "Twee weken later een online vragenuur voor de hele groep",
    ],
    trainer: OLAF,
    foto: "/images/beeld/workshop-tafel.webp",
    fotoAlt: "Deelnemers werken aan tafel tijdens een AI-workshop",
    sessies: [
      {
        datum: "2026-09-17",
        start: "13:00",
        eind: "17:00",
        plaatsen: 14,
        vrij: 3,
        tickets: [
          {
            naam: "Ticket",
            prijs: 395,
            personen: 1,
            toelichting: "Eén plek, inclusief lunch en werkboek",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 710,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
      {
        datum: "2026-10-15",
        start: "13:00",
        eind: "17:00",
        plaatsen: 14,
        vrij: 11,
        tickets: [
          {
            naam: "Ticket",
            prijs: 395,
            personen: 1,
            toelichting: "Eén plek, inclusief lunch en werkboek",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 710,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
      {
        datum: "2026-11-19",
        start: "13:00",
        eind: "17:00",
        plaatsen: 14,
        vrij: 14,
        tickets: [
          {
            naam: "Ticket",
            prijs: 395,
            personen: 1,
            toelichting: "Eén plek, inclusief lunch en werkboek",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 710,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
  {
    slug: "prompt-pro",
    naam: "Prompt Pro",
    ondertitel: "Voor wie AI al gebruikt en meer wil",
    niveau: "Gevorderd",
    duur: "Dagdeel",
    kort:
      "Verdieping voor dagelijkse gebruikers: context bouwen, output afdwingen, en AI aan je eigen bestanden koppelen.",
    intro:
      "Je gebruikt AI al elke dag en loopt tegen dezelfde muur aan: de antwoorden zijn net niet goed genoeg om zomaar te versturen. Deze middag gaat over het verschil tussen een prompt die iets oplevert en een prompt waar je op kunt bouwen.",
    voorWie: [
      "Je werkt al wekelijks met ChatGPT of Claude",
      "Je merkt dat de kwaliteit wisselt en wilt weten waarom",
      "Je wilt AI op je eigen documenten en data laten werken",
    ],
    leerdoelen: [
      "Bouw context zo op dat het model niet meer hoeft te gokken",
      "Dwing een vast format af, zodat output direct bruikbaar is",
      "Werk met eigen bestanden, projecten en een kennisbank",
      "Zet een prompt om in een herhaalbaar sjabloon voor je team",
      "Controleer output systematisch in plaats van op gevoel",
    ],
    programma: [
      {
        tijd: "13:00",
        titel: "Binnenkomst",
        tekst: "Waar loopt iedereen op vast? Dat bepaalt de accenten.",
      },
      {
        tijd: "13:20",
        titel: "Context is het hele spel",
        tekst:
          "Rol, materiaal, voorbeelden en tegenvoorbeelden. Waarom een goede prompt vooral goed geleverd materiaal is.",
      },
      {
        tijd: "14:15",
        titel: "Structuur afdwingen",
        tekst:
          "Vaste formats, checklists en zelfcontrole in de prompt zelf. Van los antwoord naar voorspelbare output.",
      },
      {
        tijd: "15:15",
        titel: "Pauze",
        tekst: "Met iets te eten.",
      },
      {
        tijd: "15:30",
        titel: "Je eigen kennis erin",
        tekst:
          "Documenten, projecten en een kennisbank inrichten waar het model uit put.",
      },
      {
        tijd: "16:30",
        titel: "Bouwen aan je eigen sjabloon",
        tekst:
          "Je gaat naar huis met minstens één prompt die je team kan overnemen.",
      },
      {
        tijd: "17:00",
        titel: "Borrel",
        tekst: "Napraten met de groep en met de trainer.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een betaald account op ChatGPT of Claude",
      "Een taak die je vaak herhaalt en die nu net niet goed genoeg gaat",
      "Wat materiaal uit je eigen werk: een paar documenten of voorbeelden",
    ],
    inbegrepen: [
      "Maximaal 12 deelnemers",
      "De volledige promptbibliotheek van NinA AI",
      "Lunch, koffie en een borrel na afloop",
      "Twee weken later een online vragenuur voor de hele groep",
    ],
    trainer: NICK,
    foto: "/images/beeld/sessie-detail.webp",
    fotoAlt: "Deelnemer werkt geconcentreerd aan een opdracht",
    sessies: [
      {
        datum: "2026-09-24",
        start: "13:00",
        eind: "17:00",
        plaatsen: 12,
        vrij: 6,
        tickets: [
          {
            naam: "Ticket",
            prijs: 445,
            personen: 1,
            toelichting: "Eén plek, inclusief lunch en promptbibliotheek",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 800,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
      {
        datum: "2026-11-05",
        start: "13:00",
        eind: "17:00",
        plaatsen: 12,
        vrij: 12,
        tickets: [
          {
            naam: "Ticket",
            prijs: 445,
            personen: 1,
            toelichting: "Eén plek, inclusief lunch en promptbibliotheek",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 800,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-automation-n8n",
    naam: "AI Automation met n8n",
    ondertitel: "Bouw je eerste werkende automatisering",
    niveau: "Bouwer",
    duur: "Hele dag",
    kort:
      "Een hele dag bouwen in n8n. Aan het eind van de dag draait er een automatisering van jou, op je eigen account.",
    intro:
      "Geen demo waar je naar kijkt, maar bouwen met je handen op het toetsenbord. We beginnen bij een terugkerende taak uit jouw werk en werken door tot die zonder jou draait.",
    voorWie: [
      "Je wilt werk automatiseren en niet wachten op IT",
      "Je bent niet bang voor een beetje techniek, maar je bent geen developer",
      "Je hebt processen die elke week hetzelfde zijn",
    ],
    leerdoelen: [
      "Bouw een workflow in n8n van trigger tot resultaat",
      "Koppel mail, agenda, spreadsheets en een AI-model aan elkaar",
      "Laat een taalmodel een beslissing nemen midden in een workflow",
      "Vang fouten op zodat je automatisering niet stil in het weekend omvalt",
      "Schat in welke processen dit waard zijn en welke niet",
    ],
    programma: [
      {
        tijd: "10:00",
        titel: "Binnenkomst en koffie",
        tekst: "Iedereen zet n8n klaar; wij lopen rond tot het bij iedereen draait.",
      },
      {
        tijd: "10:30",
        titel: "Hoe een workflow denkt",
        tekst:
          "Trigger, stappen, data die van links naar rechts loopt. De hele dag rust hierop.",
      },
      {
        tijd: "11:15",
        titel: "Je eerste workflow",
        tekst:
          "Samen bouwen: van een binnenkomende mail naar een gestructureerde regel in een sheet.",
      },
      {
        tijd: "12:30",
        titel: "Lunch",
        tekst: "Met de groep, aan tafel.",
      },
      {
        tijd: "13:15",
        titel: "AI in de workflow",
        tekst:
          "Een model laten samenvatten, classificeren en kiezen. En hoe je zorgt dat het antwoord bruikbaar terugkomt.",
      },
      {
        tijd: "14:30",
        titel: "Bouwen aan je eigen proces",
        tekst:
          "De rest van de middag werk je aan je eigen automatisering, met een bouwer naast je.",
      },
      {
        tijd: "15:30",
        titel: "Laten draaien en fouten opvangen",
        tekst:
          "Live zetten, foutafhandeling, en wat je moet doen als er iets misgaat.",
      },
      {
        tijd: "16:00",
        titel: "Laten zien en borrel",
        tekst: "Iedereen laat zien wat er draait. Daarna een borrel.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een n8n-account (cloud-proefaccount is genoeg, wij sturen vooraf de instructie)",
      "Toegang tot de tools die je wilt koppelen, bijvoorbeeld je mail of een sheet",
      "Eén proces uit je werk dat elke week terugkomt",
    ],
    inbegrepen: [
      "Maximaal 10 deelnemers en twee bouwers in de zaal",
      "Alle voorbeeldworkflows als bestand mee naar huis",
      "Lunch, koffie en een borrel na afloop",
      "Twee weken later een online vragenuur voor de hele groep",
    ],
    trainer: SERGEI,
    foto: "/images/beeld/bouwen-development.webp",
    fotoAlt: "Scherm met een workflow in aanbouw tijdens de workshop",
    sessies: [
      {
        datum: "2026-10-08",
        start: "10:00",
        eind: "16:30",
        plaatsen: 10,
        vrij: 2,
        tickets: [
          {
            naam: "Ticket",
            prijs: 795,
            personen: 1,
            toelichting: "Hele dag, inclusief lunch en alle voorbeeldworkflows",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 1430,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
      {
        datum: "2026-12-03",
        start: "10:00",
        eind: "16:30",
        plaatsen: 10,
        vrij: 10,
        tickets: [
          {
            naam: "Ticket",
            prijs: 795,
            personen: 1,
            toelichting: "Hele dag, inclusief lunch en alle voorbeeldworkflows",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 1430,
            personen: 2,
            toelichting: "Samen met een collega, 10% voordeliger",
            stripeLink: "",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-agents-bouwen",
    naam: "AI Agents bouwen",
    ondertitel: "Een agent die zelf stappen zet",
    niveau: "Bouwer",
    duur: "Hele dag",
    kort:
      "Van workflow naar agent: een systeem dat zelf bepaalt welke stap nodig is. Je bouwt er die dag één, en die werkt.",
    intro:
      "Een workflow volgt jouw stappen. Een agent kiest ze zelf. Dat is krachtiger en tegelijk lastiger om te vertrouwen. Deze dag gaat over allebei: hoe je er een bouwt, en hoe je zorgt dat je hem durft aan te zetten.",
    voorWie: [
      "Je hebt al eens iets geautomatiseerd en wilt een stap verder",
      "Je werkt met processen waarin per geval iets anders nodig is",
      "Je wilt begrijpen waar de grens ligt van wat een agent aankan",
    ],
    leerdoelen: [
      "Leg het verschil uit tussen een workflow en een agent, en kies bewust",
      "Geef een agent gereedschap en begrens wat hij mag doen",
      "Bouw geheugen in zodat een gesprek over meerdere stappen klopt",
      "Zet een mens op de juiste plek in de lus",
      "Test een agent op de gevallen waar hij mis kan gaan",
    ],
    programma: [
      {
        tijd: "10:00",
        titel: "Binnenkomst en koffie",
        tekst: "Klaarzetten van de omgeving, samen met de bouwers.",
      },
      {
        tijd: "10:30",
        titel: "Workflow of agent",
        tekst:
          "Wanneer een vast pad beter is dan een agent, en hoe je dat vooraf ziet.",
      },
      {
        tijd: "11:15",
        titel: "Gereedschap en grenzen",
        tekst:
          "Een agent bouwen die iets kan opzoeken, iets kan versturen, en verder niets.",
      },
      {
        tijd: "12:30",
        titel: "Lunch",
        tekst: "Met de groep, aan tafel.",
      },
      {
        tijd: "13:15",
        titel: "Geheugen en meerdere stappen",
        tekst:
          "Wat de agent onthoudt tussen stappen, en waarom dat zo vaak misgaat.",
      },
      {
        tijd: "14:15",
        titel: "Bouwen aan je eigen agent",
        tekst: "De rest van de middag aan je eigen zaak, met hulp naast je.",
      },
      {
        tijd: "15:30",
        titel: "Stukmaken en dichttimmeren",
        tekst:
          "We proberen elkaars agent te laten struikelen. Dat is het leerzaamste uur van de dag.",
      },
      {
        tijd: "16:00",
        titel: "Laten zien en borrel",
        tekst: "Iedereen laat zien wat er draait. Daarna een borrel.",
      },
    ],
    meenemen: [
      "Een laptop",
      "Een n8n-account of een andere bouwomgeving die je al gebruikt",
      "Een API-sleutel voor een AI-model (wij sturen vooraf de instructie)",
      "Een geval uit je werk waarin per situatie iets anders nodig is",
    ],
    inbegrepen: [
      "Maximaal 10 deelnemers en twee bouwers in de zaal",
      "Alle voorbeeldagents als bestand mee naar huis",
      "Lunch, koffie en een borrel na afloop",
      "Twee weken later een online vragenuur voor de hele groep",
    ],
    trainer: SERGEI,
    foto: "/images/beeld/sessie-rood.webp",
    fotoAlt: "Bouwsessie met deelnemers achter hun laptop",
    sessies: [
      {
        datum: "2026-11-12",
        start: "10:00",
        eind: "16:30",
        plaatsen: 10,
        vrij: 8,
        tickets: [
          {
            naam: "Ticket",
            prijs: 895,
            personen: 1,
            toelichting: "Hele dag, inclusief lunch en alle voorbeeldagents",
            stripeLink: "",
            uitgelicht: true,
          },
          {
            naam: "Duo-ticket",
            prijs: 1610,
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
function vandaag(): string {
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
 * De drie toestanden van een sessie. De hele site leunt hierop, van de chip
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
