import Image from "next/image";

type Foto = {
  src: string;
  /** Beschrijft wat er te zien is, voor schermlezers en Google. */
  alt: string;
  /** Korte labeltekst op de tegel: het soort sessie. */
  label: string;
  /** Staande foto: krijgt een staande cel, anders wordt hij kaalgesneden. */
  staand?: boolean;
  /** Grote tegel: twee kolommen breed en twee rijen hoog vanaf lg. */
  groot?: boolean;
  /**
   * Uitsnijpunt, alleen nodig als het onderwerp niet in het midden zit.
   * Standaard center, want cel en foto hebben nu dezelfde vorm.
   */
  positie?: string;
};

/**
 * Zeven foto's van echte sessies. Bewust geen klantnamen in de labels: van
 * een deel van deze foto's weet ik de opdrachtgever niet, en dan is één naam
 * noemen en de rest niet inconsistent. Het label zegt wat voor sessie het is.
 *
 * De volgorde is de rasterindeling, dus verplaatsen verandert de layout.
 */
const FOTOS: Foto[] = [
  {
    src: "/images/sessie-keynote-zaal.webp",
    alt: "Olaf Lemmens op het podium met een headset, naast een slide over de verdrievoudiging van schaduw-AI",
    label: "AI Keynote",
    groot: true,
  },
  {
    src: "/images/sessie-keynote-publiek.webp",
    alt: "Olaf Lemmens maakt een selfie met een zwaaiende zaal na een AI-lezing",
    label: "AI Lezing",
    staand: true,
  },
  {
    src: "/images/sessie-workshop-agents.webp",
    alt: "Olaf Lemmens legt het verschil uit tussen een zero-shot en een agentic workflow tijdens een sessie",
    label: "Hands-on sessie",
    staand: true,
  },
  {
    src: "/images/sessie-workshop-tafel.webp",
    alt: "Deelnemers aan een hands-on AI-workshop achter hun laptop rond een grote tafel, met Prompting op het scherm",
    label: "AI Workshop",
  },
  {
    src: "/images/sessie-keynote-podium.webp",
    alt: "AI-keynote voor een zittende zaal onder een houten kapconstructie, met een slide over schaduw-AI op corporate devices",
    label: "AI Keynote",
  },
  {
    src: "/images/sessie-workshop-team.webp",
    alt: "Groepsfoto van een team na een AI-workshop bij DA Drogist",
    label: "AI Workshop",
  },
  {
    src: "/images/sessie-keynote-vliegtuig.webp",
    alt: "AI-lezing voor een zittend publiek in een zaal met een Boeing 747 achter het glas",
    label: "AI Keynote",
  },
];

/**
 * Fotowand van gegeven sessies, hoog op de pagina.
 *
 * Elke cel heeft dezelfde vorm als de foto erin. Dat is de hele truc: eerst
 * stonden staande foto's in liggende cellen, en dan snijdt object-cover er
 * een horizontale band uit waar een hoofd per definitie verkeerd in valt.
 * Nu krijgen staande foto's een staande cel, dus cover hoeft bijna niets weg
 * te halen en blijft iedereen heel.
 *
 * Vanaf lg vullen de tegels hun rastercel; daaronder bepaalt de verhouding
 * de hoogte. Het raster loopt exact vol: de grote tegel en de twee staande
 * tegels vullen samen de eerste twee rijen over vier kolommen, de vier
 * liggende tegels vormen de derde rij.
 */
export default function SessieFotos() {
  return (
    <div
      className="
        flex snap-x snap-mandatory items-start gap-3 overflow-x-auto pb-2
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0
        lg:auto-rows-[11rem] lg:grid-cols-4
      "
    >
      {FOTOS.map((f, i) => (
        <figure
          key={f.src}
          className={`foto relative shrink-0 snap-start overflow-hidden rounded-[3px] border border-border sm:self-start lg:self-stretch ${
            f.groot ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
          } ${f.staand ? "lg:row-span-2" : ""}`}
        >
          {/* Drie regimes, en in alle drie houdt de cel de vorm van de foto.
              Mobiel: vaste hoogte, breedte volgt uit de verhouding, dus de
              rij heeft één hooglijn zonder dat er iets gerekt wordt. Tablet:
              volle kolombreedte, hoogte uit de verhouding, en self-start
              zodat een lagere tegel niet meegerekt wordt met een hogere.
              Desktop: vaste rijhoogte, de tegel vult zijn cel. Die rijhoogte
              moet vast zijn: bij minmax(0,11rem) kropen de rijen mee met de
              inhoud, en omdat de hoogte van de inhoud zelf uit de rij kwam
              klapte alles dicht naar 2px. */}
          <div
            className={`relative h-52 sm:h-auto sm:w-full lg:h-full lg:w-auto lg:aspect-auto ${
              f.staand ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              /* De grote tegel is op lg ongeveer 550px breed, de rest 270px. */
              sizes={
                f.groot
                  ? "(min-width: 1024px) 560px, (min-width: 640px) 100vw, 280px"
                  : "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 280px"
              }
              className={`object-cover ${f.positie ?? ""}`}
              priority={i === 0}
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0e18]/55 via-transparent to-transparent"
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink-deep/80 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
            {f.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
