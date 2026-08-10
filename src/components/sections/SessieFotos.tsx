import Image from "next/image";

type Foto = {
  src: string;
  /** Beschrijft wat er te zien is, voor schermlezers en Google. */
  alt: string;
  /** Korte labeltekst op de tegel: het soort sessie. */
  label: string;
  /** Extra kolom- of rij-span in het raster vanaf lg. */
  span?: string;
  /**
   * Uitsnijpunt. Staande foto's in een liggende cel worden een horizontale
   * band, en die valt niet altijd op de goede plek.
   */
  positie?: string;
};

/**
 * Zeven foto's van echte sessies. Bewust geen klantnamen in de labels: van
 * een deel van deze foto's weet ik de opdrachtgever niet, en dan is één naam
 * noemen en de rest niet inconsistent. Het label zegt wat voor sessie het is.
 */
const FOTOS: Foto[] = [
  {
    src: "/images/sessie-keynote-zaal.webp",
    alt: "Volle zaal tijdens een AI-keynote van Olaf Lemmens, met een zelfgebouwde AI-contentmachine op het scherm",
    label: "AI Keynote",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/sessie-workshop-tafel.webp",
    alt: "Deelnemers aan een hands-on AI-workshop achter hun laptop rond een grote tafel, met Prompting op het scherm",
    label: "AI Workshop",
  },
  {
    src: "/images/sessie-keynote-publiek.webp",
    alt: "Olaf Lemmens maakt een selfie met een zwaaiende zaal na een AI-lezing",
    label: "AI Lezing",
    // Hoger uitsnijden: de zwaaiende zaal is hier het bewijs, en bij een
    // gecentreerde uitsnede werd zijn gezicht halverwege afgekapt.
    positie: "object-[50%_26%]",
  },
  {
    src: "/images/sessie-keynote-podium.webp",
    alt: "Olaf Lemmens op het podium met een headset, naast een slide over de groei van schaduw-AI",
    label: "AI Keynote",
  },
  {
    src: "/images/sessie-workshop-team.webp",
    alt: "Groepsfoto van een team na een AI-workshop bij DA Drogist",
    label: "AI Workshop",
  },
  {
    src: "/images/sessie-workshop-agents.webp",
    alt: "Olaf Lemmens legt het verschil uit tussen een zero-shot en een agentic workflow tijdens een sessie",
    label: "Hands-on sessie",
  },
  {
    src: "/images/sessie-keynote-vliegtuig.webp",
    alt: "AI-lezing voor een zittend publiek in een zaal met een Boeing 747 achter het glas",
    label: "AI Keynote",
    // Drie kolommen breed, niet twee: de grote tegel beslaat twee rijen, dus
    // de derde rij heeft nog vier cellen over. Met een span van 2 bleef er
    // één cel leeg en viel het raster aan de rechterkant uit elkaar.
    span: "lg:col-span-3",
  },
];

/**
 * Fotowand van gegeven sessies, hoog op de pagina. Op mobiel een
 * horizontaal scrollende rij: zeven tegels onder elkaar zou daar honderden
 * pixels kosten precies waar het formulier moet staan. Vanaf sm een raster
 * dat exact opvult, met twee grotere tegels voor ritme.
 */
export default function SessieFotos() {
  return (
    <div
      className="
        flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0
        lg:auto-rows-[minmax(0,11rem)] lg:grid-cols-4
      "
    >
      {FOTOS.map((f, i) => (
        <figure
          key={f.src}
          className={`relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:w-auto ${
            f.span ?? ""
          }`}
        >
          {/* Vaste verhouding op mobiel; in het raster vult de tegel zijn cel. */}
          <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-44">
            <Image
              src={f.src}
              alt={f.alt}
              fill
              /* Grofweg: mobiel bijna schermbreed, twee kolommen op sm,
                 kwart van de 1152px-container op lg. */
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 78vw"
              className={`object-cover ${f.positie ?? ""}`}
              priority={i === 0}
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2a2130]/55 via-transparent to-transparent"
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink-deep/80 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
            {f.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
