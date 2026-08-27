import Image from "next/image";

/**
 * Fotowand van echte sessies.
 *
 * Uitzondering op het beeldrecept: deze foto's blijven in volle kleur en
 * krijgen dus géén `.foto`-klasse. De rest van de site gaat door de warme
 * duotone, maar hier is de energie het argument: het rode licht van die zaal,
 * het blauw van een dia, een zaal die zwaait. In cognac-duotone verdwijnt
 * precies dat, en dan is het weer een stockbeeld. Zet de duotone hier dus niet
 * terug bij een volgende veegslag.
 *
 * Waarom dit blok op een ticketsite staat: iemand die een middag van zijn week
 * vrijmaakt en er een paar honderd euro voor betaalt, wil zien waar hij komt te
 * zitten. Geen sfeer om de sfeer, maar het antwoord op "hoe ziet dit eruit".
 */

type Foto = {
  src: string;
  /** Wat er te zien is, voor schermlezers en voor Google. */
  alt: string;
  /** Het label op de tegel. Kort: het soort moment. */
  label: string;
  /** Staande foto krijgt een staande cel, anders wordt hij kaalgesneden. */
  staand?: boolean;
  /** De grote tegel: twee kolommen breed en twee rijen hoog vanaf lg. */
  groot?: boolean;
  /** Halve rij: twee kolommen breed, één rij hoog. */
  breed?: boolean;
};

const FOTOS: Foto[] = [
  {
    src: "/images/sfeer/sessie-workshop-tafel.webp",
    alt: "Deelnemers achter hun laptop rond de grote tafel op kantoor, met Prompting op het scherm",
    label: "De workshoptafel",
    groot: true,
  },
  {
    src: "/images/sfeer/sessie-workshop-agents.webp",
    alt: "Olaf Lemmens legt het verschil uit tussen een zero-shot en een agentic workflow, terwijl een deelnemer meebouwt op zijn laptop",
    label: "Zelf meebouwen",
    staand: true,
  },
  {
    src: "/images/sfeer/sessie-keynote-publiek.webp",
    alt: "Olaf Lemmens maakt een selfie met een zwaaiende zaal na afloop van een sessie",
    label: "Na afloop",
    staand: true,
  },
  {
    src: "/images/sfeer/sessie-keynote-vliegtuig.webp",
    alt: "Een sessie voor een zittend publiek in een zaal met een Boeing 747 achter het glas",
    label: "Op locatie",
    breed: true,
  },
  {
    src: "/images/beeld/bouwen-development.webp",
    alt: "Schermen met code en workflows tijdens een bouwsessie",
    label: "Bouwen",
    breed: true,
  },
];

/**
 * Elke cel heeft dezelfde vorm als de foto erin. Dat is de hele truc: een
 * staande foto in een liggende cel laat `object-cover` er een horizontale band
 * uit snijden, en daar valt een hoofd per definitie verkeerd in.
 *
 * Drie regimes. Mobiel: een rij die je opzij veegt, met vaste hoogte, zodat de
 * strook één hooglijn heeft zonder dat er iets gerekt wordt. Tablet: twee
 * kolommen, hoogte uit de verhouding. Desktop: een raster van vier kolommen
 * met een vaste rijhoogte. Die rijhoogte moet vast zijn — met `minmax(0,…)`
 * kruipen de rijen mee met hun inhoud en klapt alles dicht.
 *
 * Het raster loopt precies vol: de grote tegel (2×2) plus de twee staande
 * tegels (1×2) vullen de eerste twee rijen over vier kolommen, en de twee
 * brede tegels (2×1) vormen samen de derde rij.
 */
export default function Sfeer() {
  return (
    <div
      className="
        flex snap-x snap-mandatory items-start gap-3 overflow-x-auto pb-2
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0
        lg:auto-rows-[11rem] lg:grid-cols-4
      "
    >
      {FOTOS.map((f) => (
        <figure
          key={f.src}
          className={`kaart relative shrink-0 snap-start overflow-hidden border border-border sm:self-start lg:self-stretch ${
            f.groot ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
          } ${f.staand ? "lg:row-span-2" : ""} ${
            f.breed ? "sm:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <div
            className={`relative h-52 sm:h-auto sm:w-full lg:h-full lg:w-auto lg:aspect-auto ${
              f.staand ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes={
                f.groot || f.breed
                  ? "(min-width: 1024px) 560px, (min-width: 640px) 100vw, 280px"
                  : "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 280px"
              }
              className="object-cover"
            />
          </div>
          {/* Verloop van onderaf, zodat het label leesbaar blijft op elke foto. */}
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
