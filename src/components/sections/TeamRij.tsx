import Image from "next/image";
import type { Lang } from "@/lib/site";

type Lid = {
  /** Voornaam, gebruikt als sleutel en in de alt-tekst. */
  voornaam: string;
  naam: string;
  rol: string;
  rolEn: string;
  foto: string;
};

/**
 * Het team, in de volgorde waarin Olaf het aanleverde: founder eerst, daarna
 * de rest. De portretten zijn lijntekeningen met een transparante
 * achtergrond, dus ze werken op elke sectiekleur zonder witte blokken.
 */
export const TEAM: Lid[] = [
  {
    voornaam: "Olaf",
    naam: "Olaf Lemmens",
    rol: "Founder",
    rolEn: "Founder",
    foto: "/images/team/team-olaf.webp",
  },
  {
    voornaam: "Janique",
    naam: "Janique Weijer-Gerrits Jans",
    rol: "Projectmanager",
    rolEn: "Project manager",
    foto: "/images/team/team-janique.webp",
  },
  {
    voornaam: "Sergei",
    naam: "Sergei Agaronian",
    rol: "AI Developer",
    rolEn: "AI developer",
    foto: "/images/team/team-sergei.webp",
  },
  {
    voornaam: "Wing",
    naam: "Wing Fung Lam",
    rol: "AI Developer",
    rolEn: "AI developer",
    foto: "/images/team/team-wing.webp",
  },
  {
    voornaam: "Wolf",
    naam: "Wolf Huiberts",
    rol: "AI Developer",
    rolEn: "AI developer",
    foto: "/images/team/team-wolf.webp",
  },
  {
    voornaam: "Marciano",
    naam: "Marciano Hardjowikromo",
    rol: "AI Developer",
    rolEn: "AI developer",
    foto: "/images/team/team-marciano.webp",
  },
  {
    voornaam: "Nick",
    naam: "Nick Spapens",
    rol: "AI Consultant",
    rolEn: "AI consultant",
    foto: "/images/team/team-nick.webp",
  },
  {
    voornaam: "Noud",
    naam: "Noud Appelman",
    rol: "Sales Manager",
    rolEn: "Sales manager",
    foto: "/images/team/team-noud.webp",
  },
  {
    voornaam: "Senna",
    naam: "Senna Oortgijsen",
    rol: "Business Development & Events",
    rolEn: "Business development & events",
    foto: "/images/team/team-senna.webp",
  },
];

type Variant = "compact" | "namen" | "uitgebreid";

const MATEN: Record<Variant, { cirkel: string; raster: string; sizes: string }> =
  {
    // Klein maar duidelijk, zonder namen: één rij die op mobiel omloopt.
    compact: {
      cirkel: "h-14 w-14 sm:h-16 sm:w-16",
      raster: "flex flex-wrap justify-center gap-3 sm:gap-4",
      sizes: "64px",
    },
    /* Negen leden, dus drie kolommen: dat vult 3x3 precies. Bij vier of vijf
       kolommen blijft er een halve rij over en dat leest als een gat. */
    namen: {
      cirkel: "h-24 w-24",
      raster: "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3",
      sizes: "96px",
    },
    uitgebreid: {
      cirkel: "h-28 w-28 sm:h-36 sm:w-36",
      raster: "grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3",
      sizes: "(min-width: 640px) 144px, 112px",
    },
  };

export default function TeamRij({
  variant = "namen",
  lang = "nl",
}: {
  variant?: Variant;
  lang?: Lang;
}) {
  const m = MATEN[variant];
  const metTekst = variant !== "compact";

  return (
    <ul className={m.raster}>
      {TEAM.map((lid) => {
        const rol = lang === "en" ? lid.rolEn : lid.rol;
        return (
          <li
            key={lid.voornaam}
            className={metTekst ? "text-center" : undefined}
          >
            {/* Witte schijf achter de tekening: die geeft de lijnen contrast
                op de warme achtergronden, en maakt er een portret van in
                plaats van een zwevende schets. */}
            <span
              className={`relative mx-auto block overflow-hidden rounded-full bg-bg-card ring-1 ring-border ${m.cirkel}`}
            >
              <Image
                src={lid.foto}
                alt={
                  lang === "en"
                    ? `Line drawing of ${lid.naam}, ${rol} at NinA AI Agency`
                    : `Lijntekening van ${lid.naam}, ${rol} bij NinA AI Agency`
                }
                fill
                sizes={m.sizes}
                className="object-cover"
              />
            </span>
            {metTekst && (
              <>
                <p
                  className={`font-display mt-3 font-bold leading-tight ${
                    variant === "uitgebreid" ? "text-base" : "text-sm"
                  }`}
                >
                  {lid.naam}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-text-muted">
                  {rol}
                </p>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
