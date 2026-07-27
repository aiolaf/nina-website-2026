import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "NinA AI Agency hecht grote waarde aan de bescherming van jouw persoonsgegevens. Lees welke gegevens wij verzamelen, waarom, hoe lang wij ze bewaren en welke rechten jij hebt.",
  alternates: { canonical: "/privacy" },
};

const downloadHref = "/downloads/privacyverklaring-nina-ai.docx";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Privacyverklaring
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Zo gaan wij om met <Em>jouw gegevens</Em>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              NinA AI Agency hecht grote waarde aan de bescherming van jouw
              persoonsgegevens. In deze privacyverklaring leggen wij uit welke
              gegevens wij verzamelen, waarom wij dat doen, hoe lang wij ze
              bewaren en welke rechten jij hebt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={downloadHref}>
                Download privacyverklaring
              </MagneticButton>
              <p className="text-sm text-text-muted">
                Laatst bijgewerkt: maart 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volledige tekst */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <article className="article-prose">
            <p>
              NinA AI Agency (hierna: &ldquo;NinA&rdquo;, &ldquo;wij&rdquo; of
              &ldquo;ons&rdquo;) hecht grote waarde aan de bescherming van jouw
              persoonsgegevens. In deze privacyverklaring leggen wij uit welke
              gegevens wij verzamelen, waarom wij dat doen, hoe lang wij ze
              bewaren en welke rechten jij hebt. Deze verklaring is van
              toepassing op alle diensten die wij aanbieden via onze website
              www.nina-ai.nl en in het kader van onze dienstverlening.
            </p>
            <p>
              Wij verwerken persoonsgegevens in overeenstemming met de Algemene
              Verordening Gegevensbescherming (AVG/GDPR) en overige
              toepasselijke Nederlandse privacywetgeving.
            </p>

            <h2>1. Wie zijn wij?</h2>
            <p>
              NinA AI Agency is een in Amsterdam gevestigd bedrijf
              gespecialiseerd in kunstmatige intelligentie. Wij bieden drie
              kernservices aan: AI Knowledge (workshops, masterclasses en
              keynotes), AI Consult (strategisch advies) en AI Implementation
              (AI-automations, AI-agents en workflows).
            </p>
            <p>Contactgegevens verwerkingsverantwoordelijke:</p>
            <ul>
              <li>Bedrijfsnaam: NinA AI Agency</li>
              <li>Website: www.nina-ai.nl</li>
              <li>E-mail: info@nina-ai.nl</li>
              <li>Vestiging: Amsterdam, Nederland</li>
              <li>KvK-nummer: {site.kvk}</li>
            </ul>

            <h2>2. Welke persoonsgegevens verwerken wij?</h2>
            <p>
              Afhankelijk van hoe je met ons in contact komt, kunnen wij de
              volgende persoonsgegevens verwerken:
            </p>
            <h3>2.1 Gegevens die je zelf aan ons verstrekt</h3>
            <ul>
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Bedrijfsnaam en functie</li>
              <li>
                Inhoud van berichten die je via contactformulieren, e-mail of
                sociale media aan ons stuurt
              </li>
              <li>
                Gegevens die je deelt bij inschrijving voor workshops,
                masterclasses of events
              </li>
            </ul>
            <h3>2.2 Gegevens die automatisch worden verzameld</h3>
            <ul>
              <li>IP-adres</li>
              <li>Browsertype en apparaatinformatie</li>
              <li>Bezochte pagina&rsquo;s en klikgedrag op onze website</li>
              <li>Datum en tijdstip van websitebezoek</li>
              <li>Verwijzende website (referrer URL)</li>
            </ul>
            <h3>2.3 Gegevens van klanten en opdrachtgevers</h3>
            <ul>
              <li>
                Contactgegevens van contactpersonen binnen de organisatie
              </li>
              <li>Facturatiegegevens (bedrijfsnaam, adres, btw-nummer)</li>
              <li>
                Communicatie en correspondentie met betrekking tot projecten en
                opdrachten
              </li>
              <li>
                Gegevens die noodzakelijk zijn voor de uitvoering van
                AI-implementaties, consultancyopdrachten of trainingen
              </li>
            </ul>

            <h2>3. Waarom verwerken wij persoonsgegevens?</h2>
            <p>
              Wij verwerken persoonsgegevens uitsluitend voor de volgende
              doeleinden en op basis van de daarbij genoemde wettelijke
              grondslag:
            </p>
            <h3>3.1 Uitvoering van een overeenkomst</h3>
            <ul>
              <li>
                Het leveren van onze diensten (AI Knowledge, AI Consult, AI
                Implementation)
              </li>
              <li>Het afhandelen van aanvragen, offertes en bestellingen</li>
              <li>Het factureren van geleverde diensten</li>
              <li>
                Het communiceren over de voortgang van projecten en opdrachten
              </li>
            </ul>
            <h3>3.2 Gerechtvaardigd belang</h3>
            <ul>
              <li>Het verbeteren van onze website en dienstverlening</li>
              <li>Het analyseren van websitegebruik voor optimalisatie</li>
              <li>
                Het beveiligen van onze systemen en het voorkomen van fraude
              </li>
              <li>Het onderhouden van relaties met klanten en partners</li>
            </ul>
            <h3>3.3 Toestemming</h3>
            <ul>
              <li>
                Het verzenden van nieuwsbrieven en marketingcommunicatie over
                AI-gerelateerde onderwerpen
              </li>
              <li>Het plaatsen van analytische en marketingcookies</li>
            </ul>
            <p>
              Je kunt een gegeven toestemming op elk moment intrekken. Dit
              heeft geen invloed op de rechtmatigheid van de verwerking
              v&oacute;&oacute;r de intrekking.
            </p>
            <h3>3.4 Wettelijke verplichting</h3>
            <ul>
              <li>
                Het voldoen aan fiscale bewaarplichten en andere wettelijke
                verplichtingen
              </li>
            </ul>

            <h2>4. Cookies</h2>
            <p>
              Onze website maakt gebruik van cookies. Cookies zijn kleine
              tekstbestanden die op jouw apparaat worden geplaatst wanneer je
              onze website bezoekt.
            </p>
            <h3>4.1 Functionele cookies</h3>
            <p>
              Deze cookies zijn noodzakelijk voor het goed functioneren van de
              website. Hiervoor is geen toestemming vereist.
            </p>
            <h3>4.2 Analytische cookies</h3>
            <p>
              Wij gebruiken analytische cookies om inzicht te krijgen in hoe
              bezoekers onze website gebruiken, zodat wij de gebruikerservaring
              kunnen verbeteren. Waar mogelijk worden deze cookies
              geanonimiseerd. Voor het plaatsen van analytische cookies vragen
              wij vooraf jouw toestemming via onze cookiebanner.
            </p>
            <h3>4.3 Marketing- en trackingcookies</h3>
            <p>
              Met jouw toestemming kunnen wij marketingcookies plaatsen om je
              relevante content en advertenties te tonen op andere platforms,
              zoals LinkedIn. Je kunt jouw cookievoorkeuren op elk moment
              aanpassen via de cookiebanner op onze website.
            </p>

            <h2>5. Delen met derden</h2>
            <p>
              Wij delen jouw persoonsgegevens alleen met derden wanneer dit
              noodzakelijk is voor onze dienstverlening, of wanneer wij daartoe
              wettelijk verplicht zijn. Wij kunnen gegevens delen met:
            </p>
            <ul>
              <li>
                Hostingproviders en IT-dienstverleners die onze website en
                systemen beheren
              </li>
              <li>Boekhouding- en facturatiesoftware</li>
              <li>
                E-mailmarketingtools (voor het verzenden van nieuwsbrieven,
                uitsluitend met jouw toestemming)
              </li>
              <li>
                AI-toolproviders die wij inzetten bij de uitvoering van
                opdrachten (zoals API-koppelingen met AI-modellen)
              </li>
              <li>Analytische diensten voor websitestatistieken</li>
            </ul>
            <p>
              Met alle partijen die namens ons persoonsgegevens verwerken
              (verwerkers) sluiten wij een verwerkersovereenkomst af om een
              passend beschermingsniveau te garanderen.
            </p>
            <h3>5.1 Doorgifte buiten de EU/EER</h3>
            <p>
              Sommige van onze dienstverleners en toolproviders zijn gevestigd
              buiten de Europese Economische Ruimte (EER). In die gevallen
              zorgen wij ervoor dat er passende waarborgen zijn getroffen,
              zoals het gebruik van door de Europese Commissie goedgekeurde
              standaardcontractbepalingen (SCC&rsquo;s) of een
              adequaatheidsbesluit.
            </p>

            <h2>6. Bewaartermijnen</h2>
            <p>
              Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor
              het doel waarvoor ze zijn verzameld. De volgende bewaartermijnen
              hanteren wij:
            </p>
            <ul>
              <li>
                Klantgegevens en projectadministratie: gedurende de looptijd
                van de overeenkomst en maximaal 2 jaar na be&euml;indiging,
                tenzij wettelijk anders vereist
              </li>
              <li>Facturatiegegevens: 7 jaar (wettelijke fiscale bewaarplicht)</li>
              <li>Nieuwsbriefabonnees: tot het moment van uitschrijving</li>
              <li>
                Websitestatistieken en cookiegegevens: maximaal 26 maanden
              </li>
              <li>
                Sollicitatiegegevens: maximaal 4 weken na afronding van de
                procedure, tenzij je toestemming geeft voor een langere
                bewaarperiode (maximaal 1 jaar)
              </li>
            </ul>

            <h2>7. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om
              jouw persoonsgegevens te beschermen tegen ongeautoriseerde
              toegang, verlies of diefstal. Onder meer door:
            </p>
            <ul>
              <li>
                Het gebruik van versleutelde verbindingen (SSL/TLS) op onze
                website
              </li>
              <li>
                Toegangsbeperking tot persoonsgegevens op basis van
                noodzakelijkheid
              </li>
              <li>
                Regelmatige updates en beveiligingspatches van onze systemen
              </li>
              <li>
                Het gebruik van sterke wachtwoorden en tweefactorauthenticatie
              </li>
              <li>
                Bewustwording en training van medewerkers op het gebied van
                informatiebeveiliging
              </li>
            </ul>

            <h2>8. Jouw rechten</h2>
            <p>
              Op grond van de AVG heb je de volgende rechten met betrekking tot
              jouw persoonsgegevens:
            </p>
            <ul>
              <li>
                <strong>Recht op inzage</strong> &mdash; Je kunt opvragen welke
                persoonsgegevens wij van je verwerken.
              </li>
              <li>
                <strong>Recht op rectificatie</strong> &mdash; Je kunt ons
                verzoeken onjuiste of onvolledige gegevens te corrigeren.
              </li>
              <li>
                <strong>Recht op verwijdering</strong> &mdash; Je kunt ons
                verzoeken jouw persoonsgegevens te verwijderen (&ldquo;recht op
                vergetelheid&rdquo;).
              </li>
              <li>
                <strong>Recht op beperking</strong> &mdash; Je kunt ons
                verzoeken de verwerking van jouw gegevens tijdelijk te
                beperken.
              </li>
              <li>
                <strong>Recht op dataportabiliteit</strong> &mdash; Je kunt ons
                vragen jouw gegevens in een gestructureerd, gangbaar en
                machineleesbaar formaat aan jou of aan een andere partij over
                te dragen.
              </li>
              <li>
                <strong>Recht van bezwaar</strong> &mdash; Je kunt bezwaar
                maken tegen de verwerking van jouw persoonsgegevens op basis
                van ons gerechtvaardigd belang.
              </li>
              <li>
                <strong>Recht om toestemming in te trekken</strong> &mdash; Als
                wij gegevens verwerken op basis van jouw toestemming, kun je
                deze op elk moment intrekken.
              </li>
            </ul>
            <p>
              Om een van deze rechten uit te oefenen, kun je contact met ons
              opnemen via info@nina-ai.nl. Wij reageren uiterlijk binnen 4
              weken op jouw verzoek. Wij kunnen je vragen om je te
              identificeren voordat wij jouw verzoek in behandeling nemen.
            </p>

            <h2>9. Klachtrecht</h2>
            <p>
              Mocht je ontevreden zijn over hoe wij met jouw persoonsgegevens
              omgaan, dan horen wij dat graag zodat wij je kunnen helpen. Je
              hebt daarnaast altijd het recht om een klacht in te dienen bij de
              Autoriteit Persoonsgegevens (AP), de Nederlandse toezichthouder
              op het gebied van privacybescherming.
            </p>
            <p>Autoriteit Persoonsgegevens</p>
            <ul>
              <li>Website: www.autoriteitpersoonsgegevens.nl</li>
              <li>Telefoon: 088 - 1805 250</li>
            </ul>

            <h2>10. Gebruik van AI-tools</h2>
            <p>
              Als AI-bureau kunnen wij bij de uitvoering van onze diensten
              gebruikmaken van AI-tools en -modellen van externe leveranciers.
              Wij gaan hierbij zorgvuldig om met jouw gegevens:
            </p>
            <ul>
              <li>
                Wij delen alleen persoonsgegevens met AI-tools wanneer dit
                noodzakelijk is voor de uitvoering van de opdracht en alleen
                met jouw medeweten.
              </li>
              <li>
                Wij selecteren AI-tools die voldoen aan de Europese
                privacywetgeving of waarvoor passende waarborgen zijn
                getroffen.
              </li>
              <li>
                Waar mogelijk werken wij met geanonimiseerde of
                gepseudonimiseerde data.
              </li>
              <li>
                Wij nemen geen geautomatiseerde besluiten op basis van
                persoonsgegevens die rechtsgevolgen hebben voor jou, zonder
                menselijke tussenkomst.
              </li>
            </ul>
            <p>
              Als je vragen hebt over het gebruik van specifieke AI-tools in
              jouw project, lichten wij dit graag nader toe.
            </p>

            <h2>11. Social media en online aanwezigheid</h2>
            <p>
              NinA AI Agency is actief op social media platforms, waaronder
              LinkedIn en TikTok. Wanneer je interactie hebt met onze content
              op deze platforms, zijn de privacyvoorwaarden van het betreffende
              platform van toepassing. Wij hebben geen invloed op hoe deze
              platforms jouw gegevens verwerken.
            </p>
            <p>
              Als je via social media contact met ons opneemt, kunnen wij de
              door jou gedeelde gegevens (zoals je naam en bericht) gebruiken
              om jouw vraag te beantwoorden.
            </p>

            <h2>12. Wijzigingen in deze privacyverklaring</h2>
            <p>
              Wij kunnen deze privacyverklaring van tijd tot tijd aanpassen,
              bijvoorbeeld bij wijzigingen in onze dienstverlening, nieuwe
              wetgeving of technologische ontwikkelingen. De meest actuele
              versie is altijd beschikbaar op onze website. Wij raden je aan
              deze verklaring regelmatig te raadplegen. Bij wezenlijke
              wijzigingen informeren wij je hier actief over.
            </p>

            <h2>13. Contact</h2>
            <p>
              Heb je vragen over deze privacyverklaring of over de manier
              waarop wij jouw persoonsgegevens verwerken? Neem dan gerust
              contact met ons op:
            </p>
            <p>
              NinA AI Agency
              <br />
              E-mail: info@nina-ai.nl
              <br />
              Website: www.nina-ai.nl
              <br />
              Vestiging: Amsterdam, Nederland
            </p>
            <hr />
            <p>
              &copy; NinA AI Agency &ndash; Alle rechten voorbehouden
            </p>
          </article>

          <div className="mt-12">
            <MagneticButton href={downloadHref} variant="ghost">
              Download privacyverklaring (.docx)
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
