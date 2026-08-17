import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PillButton from "@/components/ui/PillButton";
import Reveal from "@/components/ui/Reveal";
import {
  datumNL,
  menselijkeMaat,
  PAGINAS_PER_PDF,
  TOKENS_PER_WOORD,
  WOORDEN_PER_PAGINA,
} from "@/lib/modellen";
import { leesModellen } from "@/lib/modellen-server";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Onderbouwing AI-modellenoverzicht",
  description:
    "Welke bronnen, aannames en keuzes achter het AI-modellenoverzicht van NinA zitten. Inclusief wat de lijst niet vertelt en waar de schattingen vandaan komen.",
  alternates: alternatesVoor("/ai-modellen/onderbouwing"),
};

/**
 * Datum waarop deze verantwoording voor het laatst is nagelopen. Met de hand
 * bijhouden: dit gaat over de tekst hieronder, niet over de data. Verander je
 * een aanname, zet dan ook deze datum bij.
 */
const HERZIEN = "2026-08-17";

/* ------------------------------------------------------------------ */
/* Bouwstenen                                                          */
/* ------------------------------------------------------------------ */

function Alinea({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-text-muted">{children}</p>;
}

function Nadruk({ children }: { children: ReactNode }) {
  return <span className="font-medium text-text">{children}</span>;
}

function Getal({ children }: { children: ReactNode }) {
  return <span className="font-mono text-text">{children}</span>;
}

function Lijst({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5 leading-relaxed text-text-muted">
          {/* Amber is de werkkleur voor datapunten en opsommingen; violet
              blijft gereserveerd voor het merk-moment. */}
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tweekolommen-tabel voor aannames en schalen. Termen in mono. */
function Tabel({ rijen }: { rijen: [ReactNode, ReactNode][] }) {
  return (
    <dl className="kaart-binnen mt-6 overflow-hidden">
      {rijen.map((rij, i) => (
        <div
          key={i}
          className={`grid gap-1.5 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-5 ${
            i > 0 ? "border-t border-border" : ""
          }`}
        >
          <dt className="font-mono text-sm text-text">{rij[0]}</dt>
          <dd className="text-sm leading-relaxed text-text-muted">{rij[1]}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Inhoud                                                             */
/* ------------------------------------------------------------------ */

type Sectie = { id: string; titel: string; inhoud: ReactNode };

function secties(data: {
  aantal: number | null;
  maximum: number | null;
  koersDatum: string | null;
}): Sectie[] {
  const perMiljoen = menselijkeMaat(1_000_000);
  const maximum = data.maximum ?? 40;

  return [
    {
      id: "bron",
      titel: "Waar de cijfers vandaan komen",
      inhoud: (
        <>
          <Alinea>
            Alle harde cijfers komen van{" "}
            <a
              href="https://artificialanalysis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="link-onder text-text"
            >
              Artificial Analysis
            </a>
            , een onafhankelijk bureau dat modellen zelf test en de uitkomsten
            via een API beschikbaar stelt. Wij meten niets na. Wij nemen over,
            rekenen om naar euro, sorteren, en zetten ons eigen oordeel ernaast.
          </Alinea>
          <Alinea>
            Wat we uit die API halen: de Intelligence Index, de coding index, de
            prijs per miljoen tokens voor input en output, de mediane snelheid
            in tokens per seconde, en het contextvenster. Hoe die index tot
            stand komt bepaalt Artificial Analysis, niet wij. Verandert hun
            methodologie, dan verandert onze lijst mee.
          </Alinea>
          <Alinea>
            De lijst wordt een keer per etmaal opgehaald, om 06:00 UTC. Zijn de
            cijfers ongewijzigd, dan schrijven we niets weg. Faalt de API, dan
            blijft de vorige versie staan en verschijnt er geen halve tabel.
            Daarom betekent{" "}
            <Nadruk>laatst bijgewerkt</Nadruk> op de overzichtspagina: de datum
            waarop de cijfers voor het laatst veranderden, niet de datum waarop
            we voor het laatst gekeken hebben.
          </Alinea>
        </>
      ),
    },
    {
      id: "koers",
      titel: "Van dollar naar euro",
      inhoud: (
        <>
          <Alinea>
            Vrijwel elke modelleverancier rekent in dollar. Wij zetten om met de
            dagkoers via{" "}
            <a
              href="https://frankfurter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="link-onder text-text"
            >
              Frankfurter
            </a>
            , dat de referentiekoersen van de Europese Centrale Bank doorgeeft.
            De gebruikte koers en de datum staan bovenaan de overzichtspagina
            {data.koersDatum ? ` (nu die van ${data.koersDatum})` : ""}, zodat je
            elke prijs kunt narekenen.
          </Alinea>
          <Alinea>
            Belangrijk voor wie een budget maakt: de koers van vandaag is niet de
            koers waarop je factuur straks staat. Een euro-dollarkoers beweegt in
            een jaar makkelijk een paar procent op en neer. Een prijsvergelijking
            tot op de cent is dus schijnprecisie. In business cases rekenen wij
            met een marge op de koers in plaats van met het getal van vandaag.
          </Alinea>
        </>
      ),
    },
    {
      id: "prijzen",
      titel: "Prijzen: twee decimalen en een ondergrens",
      inhoud: (
        <>
          <Alinea>
            Prijzen staan per miljoen tokens, gescheiden voor input en output.
            Die scheiding is geen detail: output is bij bijna elk model
            aanzienlijk duurder dan input, vaak een factor vier tot vijf. Een
            toepassing die veel leest en weinig schrijft valt daarom heel anders
            uit dan een toepassing die lange teksten produceert.
          </Alinea>
          <Alinea>
            We ronden af op twee decimalen. Kost een model minder dan een cent
            per miljoen tokens, dan zetten we <Getal>0,01</Getal> in plaats van{" "}
            <Getal>0,00</Getal>. Nul leest als gratis, en dat is het niet.
          </Alinea>
          <Alinea>
            Wat er <Nadruk>niet</Nadruk> in deze prijzen zit:
          </Alinea>
          <Lijst
            items={[
              "Korting op batchverwerking. Wie kan wachten betaalt bij veel aanbieders ongeveer de helft.",
              "Korting op caching van herhaalde prompts. Bij een agent die telkens dezelfde instructies meestuurt scheelt dat in de praktijk flink.",
              "Volumeafspraken en jaarcontracten.",
              "De opslag van een tussenpartij. Neem je hetzelfde model af via Azure, Bedrock of een andere laag, dan betaal je een andere prijs.",
            ]}
          />
          <Alinea>
            Gebruik deze lijst dus om te vergelijken, niet om te begroten. Voor
            een begroting kijken we naar jouw daadwerkelijke volumes en naar
            welke van die kortingen op jouw situatie van toepassing zijn.
          </Alinea>
        </>
      ),
    },
    {
      id: "sortering",
      titel: "Waarom sorteren op prijs een keuze is",
      inhoud: (
        <>
          <Alinea>
            Er bestaat geen enkele prijs per model, er zijn er twee. Dus moet er
            iets gekozen worden zodra je op prijs sorteert. Sorteren op alleen de
            inputprijs zet modellen bovenaan die goedkoop lezen en duur
            schrijven, en dat is misleidend.
          </Alinea>
          <Alinea>
            Wij sorteren op een mix van{" "}
            <Nadruk>drie delen input op een deel output</Nadruk>. Dat is de
            gangbare aanname voor een workload die meer leest dan schrijft: een
            document erin, een samenvatting eruit. Die mix staat ook onder de
            sorteerknoppen op de overzichtspagina, zodat de volgorde navolgbaar
            is.
          </Alinea>
          <Alinea>
            Draait jouw toepassing de andere kant op, bijvoorbeeld bij
            contentproductie of lange rapporten, dan valt de goedkoopste keuze
            anders uit. Kijk in dat geval naar de outputkolom en niet naar onze
            sortering.
          </Alinea>
          <Alinea>
            Op intelligentie en snelheid sorteren we op de kale cijfers,
            aflopend. Modellen zonder cijfer zakken naar de onderkant in plaats
            van als nul boven of onder te komen hangen.
          </Alinea>
        </>
      ),
    },
    {
      id: "tokens",
      titel: "Tokens omgerekend naar woorden en pagina's",
      inhoud: (
        <>
          <Alinea>
            Tokens zijn voor niemand een gevoelsmaat, dus rekenen we ze om. Dat
            zijn schattingen, en dit zijn de aannames erachter:
          </Alinea>
          <Tabel
            rijen={[
              [
                `${TOKENS_PER_WOORD.toFixed(2).replace(".", ",")} token`,
                "per Nederlands woord. Nederlands is duurder dan Engels omdat samenstellingen in meer stukken worden geknipt. Voor Engels ligt het rond 1,3, dus daar komt er ongeveer een kwart meer tekst in dezelfde tokens.",
              ],
              [
                `${WOORDEN_PER_PAGINA} woorden`,
                "per A4. Een goedgevulde zakelijke pagina met normale marges. Boekpagina's tellen er ongeveer 250, dus in het marketingmateriaal van modelleveranciers zie je vaak bijna dubbel zoveel pagina's voor hetzelfde aantal tokens.",
              ],
              [
                `${PAGINAS_PER_PDF} pagina's`,
                "per pdf. Gekozen als maat voor een rapport. Werken jullie met dikkere of dunnere documenten, dan is dat het getal om te verzetten.",
              ],
            ]}
          />
          <Alinea>
            Een miljoen tokens komt daarmee uit op ongeveer{" "}
            <Getal>{perMiljoen.woorden}</Getal> woorden,{" "}
            <Getal>{perMiljoen.paginas}</Getal> A4-pagina&apos;s of{" "}
            {/* De {" "} hieronder is nodig, niet cosmetisch: staat er een
                HTML-entiteit als &apos; in een tekstblok dat over meerdere
                regels loopt, dan laat de JSX-compiler de beginspatie vallen en
                plakt hij "75" aan "pdf's". */}
            <Getal>{perMiljoen.pdfs}</Getal>{" "}
            pdf&apos;s.
          </Alinea>
          <Alinea>
            Waarom {TOKENS_PER_WOORD.toFixed(2).replace(".", ",")}{" "}
            en niet 1,65,{" "}
            wat je vaker ziet: met dit getal komt een miljoen tokens op ronde
            uitkomsten uit en klopt de rekensom tussen woorden, pagina&apos;s en
            pdf&apos;s. Met 1,65 kwam er <Getal>610.000</Getal> woorden naast{" "}
            <Getal>1.500</Getal> pagina&apos;s te staan, en{" "}
            <Getal>1.500</Getal> keer <Getal>{WOORDEN_PER_PAGINA}</Getal> is{" "}
            <Getal>600.000</Getal>. Dan gaat iemand narekenen en klopt het niet.
            Het verschil tussen 1,65 en{" "}
            {TOKENS_PER_WOORD.toFixed(2).replace(".", ",")}{" "}
            valt ruim binnen de onzekerheid van zo&apos;n schatting.
          </Alinea>
          <Alinea>
            Alle omgerekende getallen ronden af op twee significante cijfers. Een
            schatting hoort er niet uit te zien als een meting. Houd verder
            rekening met een marge van grofweg twintig procent naar boven of
            beneden: vaktaal, eigennamen, cijferreeksen en tabellen kosten meer
            tokens per woord dan gewone lopende tekst.
          </Alinea>
        </>
      ),
    },
    {
      id: "selectie",
      titel: "Welke modellen wel en niet in de lijst staan",
      inhoud: (
        <>
          <Alinea>
            We bewaren de top {maximum} op Intelligence Index
            {data.aantal !== null && data.aantal < maximum ? (
              <>
                . Op dit moment staan er <Getal>{data.aantal}</Getal> in, omdat de
                bron er niet meer aanlevert
              </>
            ) : null}
            . Langer maken heeft weinig zin: onderaan zo&apos;n lijst staan
            modellen die niemand meer kiest, en een pagina met honderd kaarten
            helpt niemand kiezen.
          </Alinea>
          <Lijst
            items={[
              <>
                <Nadruk>Modellen zonder Intelligence Index vallen weg.</Nadruk>{" "}
                Zonder score is er niets te rangschikken. Dat treft vooral heel
                nieuwe modellen die nog niet doorgemeten zijn, en oudere die uit
                de meting zijn gehaald.
              </>,
              <>
                <Nadruk>Varianten van hetzelfde model blijven allebei staan.</Nadruk>{" "}
                Een model in een hoge en een lage denkstand gedraagt zich
                verschillend in prijs, snelheid en kwaliteit. Samenvoegen zou
                precies de informatie weggooien waar je een keuze op maakt.
              </>,
              <>
                <Nadruk>Ontbreekt een model dat je verwacht?</Nadruk> Dan meet de
                bron het niet, of het haalt de top {maximum} niet. Wij houden
                geen modellen bewust buiten de lijst.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "verdict",
      titel: "Het verdict van NinA",
      inhoud: (
        <>
          <Alinea>
            Dit is het enige subjectieve deel van de pagina, en dat is de
            bedoeling. De cijfers kun je op tien plekken vinden. Een oordeel van
            iemand die er dagelijks mee bouwt niet.
          </Alinea>
          <Alinea>
            De sterren zijn geen gemiddelde van benchmarks. Ze staan voor hoe wij
            een model inzetten in klantprojecten:
          </Alinea>
          <Tabel
            rijen={[
              ["5 sterren", "Onze standaardkeuze in die categorie. Zetten we zonder aarzelen in bij een klant."],
              ["4 sterren", "Goede keuze voor een specifieke taak, en in die gevallen soms beter dan onze standaard."],
              ["3 sterren", "Werkt, maar we kiezen hem zelden. Er is bijna altijd iets dat beter past."],
              ["Geen verdict", "We hebben er te weinig mee gebouwd om iets zinnigs te vinden. Dat is geen afkeuring, dat is stilte."],
            ]}
          />
          {/* Het menselijke NinA-moment van deze pagina: één handgeschreven
              annotatie in violet, zoals het huisstijldocument voorschrijft. */}
          <p className="annotatie mt-6 text-xl leading-snug">
            geen gemiddelde van benchmarks, maar wat wij ervan vinden
          </p>
          <Alinea>
            De gouden markering <Nadruk>NinA aanrader</Nadruk> zit op modellen
            die we op dit moment zelf in klantomgevingen laten draaien. Die
            markering blijft bewust op een handvol modellen staan. Zet je hem op
            de helft van de lijst, dan betekent hij niets meer.
          </Alinea>
          <Alinea>
            Waar we naar kijken en de benchmarks niet: hoe het Nederlands eruit
            komt, hoe een model zich houdt in een agent die een uur zelfstandig
            doorwerkt, hoe voorspelbaar het is als je het duizend keer per dag
            dezelfde taak geeft, en hoe vaak het instructies negeert.
          </Alinea>
          <Alinea>
            En de eerlijkheid hoort erbij:{" "}
            <Nadruk>
              wij bouwen het meeste met Claude, en dat kleurt dit oordeel
            </Nadruk>
            . Niet omdat er een commerciële afspraak onder ligt, maar omdat je
            een model beter leert kennen door het te gebruiken. Waar we een model
            weinig gebruiken laten we het verdict leeg in plaats van te gokken.
          </Alinea>
        </>
      ),
    },
    {
      id: "beperkingen",
      titel: "Wat deze lijst niet vertelt",
      inhoud: (
        <>
          <Alinea>
            Het belangrijkste deel van deze onderbouwing. Een leaderboard nodigt
            uit om de bovenste regel te kiezen, en dat is bijna nooit het goede
            antwoord. Dit staat er niet in:
          </Alinea>
          <Lijst
            items={[
              <>
                <Nadruk>Kwaliteit in het Nederlands.</Nadruk> Vrijwel alle
                benchmarks meten Engels. Een hoge index zegt niet dat een model
                goed Nederlands schrijft, en het verschil tussen modellen is op
                dat punt groter dan de cijfers suggereren.
              </>,
              <>
                <Nadruk>Geschiktheid voor jouw taak.</Nadruk> Een model dat wint
                op algemene benchmarks kan verliezen op jouw contracten, jouw
                jargon of jouw formulieren. Dat weet je pas als je het test op
                je eigen materiaal.
              </>,
              <>
                <Nadruk>Datalocatie en AVG.</Nadruk> Waar je data heen gaat en
                wat ermee gebeurt staat hier niet in. Bij Nederlandse
                organisaties is dat vaak de eerste vraag, en soms de enige die
                telt.
              </>,
              <>
                <Nadruk>Wachttijd tot het eerste woord.</Nadruk> Snelheid in
                tokens per seconde zegt niets over hoe lang een gebruiker naar
                een leeg scherm kijkt voordat het antwoord begint. Bij een
                chatinterface is dat precies wat mensen voelen.
              </>,
              <>
                <Nadruk>Limieten en beschikbaarheid.</Nadruk> Hoeveel verzoeken
                per minuut je mag doen, en hoe vaak een aanbieder eruit ligt.
              </>,
              <>
                <Nadruk>Het effectief bruikbare contextvenster.</Nadruk> Modellen
                accepteren meer tekst dan waar ze even goed in blijven
                presteren. Een miljoen tokens erin gooien betekent niet dat het
                model alles even nauwkeurig gebruikt.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "onafhankelijkheid",
      titel: "Onafhankelijkheid",
      inhoud: (
        <>
          <Lijst
            items={[
              "Geen affiliate-links en geen betaalde plaatsing. Geen enkele aanbieder heeft invloed op de volgorde, de sterren of de aanrader-markering.",
              "Wij verkopen geen modellen en zijn geen reseller. Wij bouwen ermee. Ons belang is dat de keuze werkt bij de klant, niet welke leverancier het wordt.",
              "We krijgen geen data, korting of vroege toegang in ruil voor een vermelding.",
            ]}
          />
          <Alinea>
            Wat wel meespeelt is de voorkeur die uit gewenning ontstaat. Die
            staat hierboven benoemd, bij het verdict. Dat is geen belang, maar
            wel een bias, en die verzwijgen zou de rest van deze pagina minder
            waard maken.
          </Alinea>
        </>
      ),
    },
    {
      id: "fouten",
      titel: "Fouten, vragen en wijzigingen",
      inhoud: (
        <>
          <Alinea>
            Zie je een prijs of een cijfer dat niet klopt, laat het weten via{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                "Correctie AI-modellenoverzicht"
              )}`}
              className="link-onder text-text"
            >
              {site.email}
            </a>
            . Data uit een externe API kan verschuiven zonder aankondiging, en
            een verkeerd veld valt van buiten sneller op dan van binnen.
          </Alinea>
          <Alinea>
            De omrekeningen uit deze onderbouwing staan op een plek in de code.
            Stellen we een aanname bij, dan werkt dat in een keer door op de hele
            overzichtspagina en op de getallen hierboven. Deze tekst is voor het
            laatst nagelopen op{" "}
            <Nadruk>{datumNL(`${HERZIEN}T00:00:00Z`)}</Nadruk>.
          </Alinea>
        </>
      ),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Pagina                                                             */
/* ------------------------------------------------------------------ */

export default async function OnderbouwingPage() {
  const data = await leesModellen();
  const lijst = secties({
    aantal: data?.aantal ?? null,
    maximum: data?.maximum ?? null,
    koersDatum: datumNL(data?.wisselkoers?.datum ?? null),
  });

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Het ene langzame element van deze pagina. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="drift-traag absolute -top-48 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(153,82,224,0.1),transparent_65%)] blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pt-32 pb-10 sm:pt-40">
          <div className="reveal-now">
            <Link href="/ai-modellen" className="label-mono link-onder text-text-muted">
              <span aria-hidden="true" className="mr-1.5">
                &larr;
              </span>
              Terug naar het overzicht
            </Link>
            <h1 className="kop-display mt-6">
              De keuzes <em className="italic">achter deze lijst</em>
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-text-muted">
              Elke vergelijking zit vol keuzes. Welke bron, welke koers, hoe je
              afrondt, wat je meeneemt en wat je weglaat. Hieronder staan die
              keuzes voor het modellenoverzicht, inclusief de plekken waar de
              cijfers minder zeggen dan ze lijken.
            </p>
          </div>
        </div>
      </section>

      {/* Inhoudsopgave, uit dezelfde lijst als de secties zelf, zodat de
          nummering en de ankers nooit uit elkaar lopen. */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal y={16}>
            <nav
              aria-label="Inhoud van deze pagina"
              className="kaart-glas p-6 sm:p-7"
            >
              <p className="label-mono text-text-muted">Op deze pagina</p>
              <ol className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {lijst.map((sectie, i) => (
                  <li key={sectie.id} className="flex gap-3 text-sm">
                    <span className="font-mono text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${sectie.id}`} className="link-onder text-text">
                      {sectie.titel}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
          <div className="space-y-16">
            {lijst.map((sectie, i) => (
              <article
                key={sectie.id}
                id={sectie.id}
                /* scroll-mt houdt de kop vrij van de vaste header bij een
                   sprong vanuit de inhoudsopgave. */
                className="scroll-mt-28 border-t border-border pt-10 first:border-t-0 first:pt-0"
              >
                <p className="label-mono text-text-muted">
                  Onderbouwing · {String(i + 1).padStart(2, "0")}/
                  {String(lijst.length).padStart(2, "0")}
                </p>
                <h2 className="kop-sectie mt-3">{sectie.titel}</h2>
                {sectie.inhoud}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* De ene donkere merk-sectie van deze pagina. */}
      <section className="relative overflow-hidden bg-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex justify-center"
        >
          <div className="h-64 w-[32rem] -translate-y-14 rounded-full bg-[rgba(153,82,224,0.25)] blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
          <p className="label-mono text-[#a6a6a6]">AI Consult</p>
          <h2 className="kop-sectie mt-4 text-[#f2f2f2]">
            Liever meteen het antwoord voor{" "}
            <em className="italic">jouw situatie</em>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#a6a6a6]">
            Deze pagina vertelt hoe wij naar modellen kijken. In een AI Consult
            kijken we naar jouw proces, je data en je volumes, en komen we tot
            een keuze die je kunt onderbouwen bij je eigen organisatie.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PillButton
              href="/contact"
              variant="merk"
              data-cta="onderbouwing_consult"
              data-cta-soort="slot"
            >
              Plan een AI Consult
            </PillButton>
          </div>
        </div>
      </section>
    </>
  );
}
