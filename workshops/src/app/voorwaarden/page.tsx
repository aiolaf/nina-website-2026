import type { Metadata } from "next";
import Link from "next/link";
import { locatie, site } from "@/lib/site";

/**
 * Deelnamevoorwaarden bij een ticket.
 *
 * LET OP voor wie hier verder bouwt: dit is een leesbare, klantvriendelijke
 * opzet die aansluit op wat er in de FAQ en op de ticketkaarten staat — geen
 * door een jurist gecontroleerde tekst. Laat hem nakijken voordat de site
 * live gaat, en let dan in elk geval op de annuleringstermijn, het
 * herroepingsrecht voor particulieren en het btw-nummer in site.ts.
 *
 * Wijzig je hier een termijn, wijzig hem dan ook in Vragen.tsx en in de
 * regel onder de agenda: nu staat op alle drie de plekken 14 dagen.
 */
export const metadata: Metadata = {
  title: "Deelnamevoorwaarden",
  description:
    "De voorwaarden bij een ticket voor een open workshop van NinA AI: betaling, annuleren, overdragen en wat er gebeurt als een workshop niet doorgaat.",
  alternates: { canonical: "/voorwaarden/" },
};

const BLOKKEN: { kop: string; tekst: string[] }[] = [
  {
    kop: "Waar deze voorwaarden over gaan",
    tekst: [
      `Deze voorwaarden gelden voor tickets voor de open workshops die ${site.bedrijf} organiseert op ${locatie.adres}. Voor besloten sessies op maat en voor andere diensten gelden de algemene voorwaarden van NinA AI Agency.`,
    ],
  },
  {
    kop: "Je ticket",
    tekst: [
      "Een ticket geeft één persoon toegang tot één workshop op één datum. Een duo-ticket geeft twee personen toegang tot dezelfde workshop op dezelfde datum.",
      "Je aanmelding is definitief zodra de betaling is voltooid. Je krijgt de bevestiging en de factuur direct per mail.",
    ],
  },
  {
    kop: "Prijzen en betaling",
    tekst: [
      "Alle prijzen op deze site staan in euro's en zijn exclusief 21% btw, tenzij er uitdrukkelijk bij staat dat het bedrag inclusief btw is.",
      "Betalen gaat via Stripe, met iDEAL, creditcard of Bancontact. NinA AI ontvangt en bewaart je betaalgegevens niet.",
      "Betalen op factuur vooraf kan ook. Mail ons voordat je bestelt; we houden de plek dan vast tot de factuur voldaan is, en uiterlijk tot een week voor de workshop.",
    ],
  },
  {
    kop: "Annuleren",
    tekst: [
      "Tot 14 dagen voor de workshopdatum kun je kosteloos annuleren. Je krijgt het volledige bedrag terug op dezelfde rekening, binnen tien werkdagen.",
      "Annuleer je binnen 14 dagen voor de datum, dan blijft het bedrag verschuldigd. Je ticket is dan wel overdraagbaar: geef uiterlijk de dag voor de workshop door wie er in jouw plaats komt.",
      "Kun je er onverwacht niet bij zijn en heb je geen vervanger? Laat het ons weten. Is er plek op een volgende datum, dan schuiven we je door.",
      "Meld je je niet af en kom je niet opdagen, dan vervalt het ticket.",
    ],
  },
  {
    kop: "Als de workshop niet doorgaat",
    tekst: [
      "We hebben een minimum van vier deelnemers nodig. Halen we dat niet, of kan de workshop door ziekte of overmacht niet doorgaan, dan hoor je dat uiterlijk vijf dagen van tevoren.",
      "Je kiest dan zelf: doorschuiven naar een volgende datum, of het volledige bedrag terug. Andere kosten die je voor die dag hebt gemaakt, zoals reis of verblijf, vergoeden we niet.",
    ],
  },
  {
    kop: "Herroepingsrecht voor particulieren",
    tekst: [
      "Koop je als particulier, dan heb je 14 dagen bedenktijd na je aankoop. Valt de workshop binnen die 14 dagen en wil je dat we alvast beginnen met de voorbereiding, dan vragen we je daar bij de bestelling mee in te stemmen; heb je de workshop op dat moment al gevolgd, dan vervalt het herroepingsrecht.",
      "In de praktijk komt dit op hetzelfde neer als de annuleringsregeling hierboven, die ook voor zakelijke kopers geldt.",
    ],
  },
  {
    kop: "Tijdens de workshop",
    tekst: [
      "Je neemt zelf een laptop mee en zorgt vooraf voor de accounts die in de voorbereidingsmail staan. Lukt dat niet, laat het ons van tevoren weten, dan regelen we iets.",
      "We maken soms foto's voor onze eigen kanalen. Wil je daar niet op staan, zeg het bij binnenkomst; dan houden we daar rekening mee.",
      "Werk van andere deelnemers dat je die dag te zien krijgt, blijft binnen de groep.",
    ],
  },
  {
    kop: "Materiaal",
    tekst: [
      "Het werkboek, de prompts en de bestanden die je meekrijgt zijn van jou: je mag ze binnen je eigen organisatie gebruiken en aanpassen. Ze doorverkopen of als eigen trainingsmateriaal aanbieden mag niet.",
    ],
  },
  {
    kop: "Aansprakelijkheid",
    tekst: [
      "We doen ons werk zorgvuldig, maar wat je met AI bouwt blijft jouw verantwoordelijkheid. Controleer output altijd voordat je hem gebruikt, en zet geen gegevens in een AI-tool die daar niet in horen.",
      "Onze aansprakelijkheid is beperkt tot het bedrag dat je voor het ticket hebt betaald.",
    ],
  },
  {
    kop: "Vragen of een klacht",
    tekst: [
      `Mail ${site.email}. Je krijgt binnen een werkdag antwoord van een mens, en bij een klacht binnen vijf werkdagen een inhoudelijke reactie.`,
      `${site.bedrijf} · ${locatie.adres} · KVK ${site.kvk}`,
    ],
  },
];

export default function VoorwaardenPagina() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:pt-36">
      <p className="label-mono text-[11.5px] text-text-muted">
        Bij je ticket
      </p>
      <h1 className="display-serif mt-4 text-[2.4rem] leading-[1.05] sm:text-[3rem]">
        Deelnamevoorwaarden
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-text-muted">
        Kort en in gewone taal, zodat je weet waar je aan toe bent voordat je
        betaalt.
      </p>

      <div className="mt-12 space-y-10">
        {BLOKKEN.map((blok) => (
          <div key={blok.kop}>
            <h2 className="font-display text-xl font-bold">{blok.kop}</h2>
            {blok.tekst.map((p) => (
              <p
                key={p}
                className="mt-3 text-[15px] leading-relaxed text-text-muted"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          href="/"
          className="text-sm text-text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← Terug naar alle workshops
        </Link>
      </div>
    </section>
  );
}
