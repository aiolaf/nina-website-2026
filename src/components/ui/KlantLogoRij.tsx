/* eslint-disable @next/next/no-img-element */

/**
 * Klantlogo-rij. Spec: docs/klant-logo-rij.md.
 *
 * Twee vormen delen hetzelfde tegelrecept: deze statische rij (een handvol
 * merken, voor product- en landingspagina's) en de doorlopende band in
 * LogoMarquee (de volledige set, voor de homepage). Voor een donkere
 * merk-sectie is er KlantLogoRijDonker met de witvarianten.
 *
 * De rij opent altijd met het mono-label "Vertrouwd door". Geen kop erboven,
 * geen kader eromheen: logo's zijn bewijs, geen sectie.
 */

export type Logo = {
  src: string;
  alt: string;
  /**
   * Merken die hun logo mét eigen achtergrondvlak aanleveren (De Nieuwe Arts:
   * wit op blauw, KplusV: wit op een gestreept vierkant). Zonder deze vlag
   * vervaagt de witte tekst in dat vlak bij 66 procent dekking tot een leeg
   * grijs blok.
   */
  vlak?: boolean;
};

/** De volledige set, 24 merken met een kleurvariant. Voedt de marquee. */
export const ALLE_LOGOS: Logo[] = [
  { src: "/images/logos/schiphol-group.svg", alt: "Schiphol Group" },
  { src: "/images/logos/asml.svg", alt: "ASML" },
  { src: "/images/logos/politie.webp", alt: "Politie" },
  { src: "/images/logos/action.webp", alt: "Action" },
  { src: "/images/logos/boskalis.webp", alt: "Boskalis" },
  { src: "/images/logos/gemeente-lelystad.webp", alt: "Gemeente Lelystad" },
  { src: "/images/logos/kplusv.svg", alt: "KplusV", vlak: true },
  { src: "/images/logos/de-nieuwe-arts.webp", alt: "de nieuwe arts", vlak: true },
  { src: "/images/logos/last-mile-solutions.webp", alt: "Last Mile Solutions" },
  { src: "/images/logos/nsecure.webp", alt: "Nsecure" },
  { src: "/images/logos/da-drogist.webp", alt: "DA Drogist" },
  { src: "/images/logos/de-baak.webp", alt: "De Baak" },
  { src: "/images/logos/easytoys.webp", alt: "EasyToys" },
  { src: "/images/logos/kernbouw.webp", alt: "KernBouw" },
  { src: "/images/logos/de-koffie-jongens.webp", alt: "De Koffie Jongens" },
  { src: "/images/logos/wens-chalets.webp", alt: "Wens Chalets" },
  { src: "/images/logos/cascando.webp", alt: "Cascando" },
  { src: "/images/logos/qcore.svg", alt: "Qcore" },
  { src: "/images/logos/avictus.webp", alt: "Avictus" },
  { src: "/images/logos/movebuddy.webp", alt: "MoveBuddy" },
  { src: "/images/logos/nomilk2day.webp", alt: "Nomilk2day" },
  { src: "/images/logos/red-panda-works.webp", alt: "Red Panda Works" },
  { src: "/images/logos/cakeprint.svg", alt: "Cakeprint" },
  { src: "/images/logos/tza.webp", alt: "TZA" },
];

/** Zes tot twaalf merken: wrapt netjes naar twee regels. */
export const SELECTIE: Logo[] = ALLE_LOGOS.slice(0, 12);

/**
 * Eén tegel. Geen loading="lazy": de marquee dupliceert de rij ver buiten
 * beeld en die tweede rij blijft dan leeg zodra de animatie hem inschuift.
 */
export function LogoTegel({
  logo,
  ariaHidden = false,
}: {
  logo: Logo;
  ariaHidden?: boolean;
}) {
  return (
    <span
      className={`flex h-14 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(12,14,24,0.08)] sm:h-16 sm:w-32 ${
        logo.vlak ? "p-0" : "px-4 py-3"
      }`}
    >
      <img
        src={logo.src}
        alt={ariaHidden ? "" : logo.alt}
        decoding="async"
        fetchPriority="low"
        className={
          logo.vlak
            ? // object-contain, geen cover: vierkante merkvlakken worden anders
              // bijgesneden.
              "h-full w-auto max-w-full object-contain [filter:grayscale(1)_contrast(0.92)_brightness(1.04)] transition-[filter] duration-300 hover:[filter:none]"
            : "max-h-full max-w-full object-contain [filter:grayscale(1)_contrast(0.9)] opacity-[0.66] transition-[filter,opacity] duration-300 hover:[filter:none] hover:opacity-100"
        }
      />
    </span>
  );
}

export default function KlantLogoRij({
  logos = SELECTIE,
  label = "Vertrouwd door",
  className = "",
}: {
  logos?: Logo[];
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}
      role="region"
      aria-label="Organisaties die met NinA AI werkten"
    >
      <span className="label-mono mr-2 text-[11.5px] text-text-muted">
        {label}
      </span>
      {logos.map((logo) => (
        <LogoTegel key={logo.alt} logo={logo} />
      ))}
    </div>
  );
}

/**
 * Witvarianten voor een rij op de donkere merk-sectie. Geen tegels: logo
 * maximaal 30 px hoog op 72 procent dekking, vol wit bij hover. Merken zonder
 * witvariant staan hier niet in; een kleurlogo op donker mag nooit.
 */
export const LOGOS_WIT: Logo[] = [
  { src: "/images/logos-wit/schiphol-group.webp", alt: "Schiphol Group" },
  { src: "/images/logos-wit/asml.webp", alt: "ASML" },
  { src: "/images/logos-wit/action.webp", alt: "Action" },
  {
    src: "/images/logos-wit/van-berkel-professionals.webp",
    alt: "Van Berkel Professionals",
  },
  { src: "/images/logos-wit/de-baak.webp", alt: "De Baak" },
  { src: "/images/logos-wit/gemeente-lelystad.webp", alt: "Gemeente Lelystad" },
  { src: "/images/logos-wit/kernbouw.webp", alt: "KernBouw" },
  { src: "/images/logos-wit/da-drogist.webp", alt: "DA Drogist" },
];
/* Acht merken: die passen op één regel naast het label. Een negende viel op
   een eigen regel en dat leest als een fout in plaats van als een rij. */
/* Drie witvarianten staan hier bewust niet in, gemeten op de bestanden zelf:
   kplusv (dekking 0,98) en gro-up (0,80) zijn gevulde vlakken en worden op
   donker een wit blok in plaats van een logo, en rijkswaterstaat is een
   fijnlijnig woordmerk dat op 30 px hoogte een veeg wordt. */

export function KlantLogoRijDonker({
  logos = LOGOS_WIT,
  label = "Vertrouwd door",
  className = "",
}: {
  logos?: Logo[];
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-5 ${className}`}
      role="region"
      aria-label="Organisaties die met NinA AI werkten"
    >
      <span className="label-mono text-[11px] text-[#a6a6a6]">{label}</span>
      {logos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          decoding="async"
          fetchPriority="low"
          className="max-h-[30px] w-auto max-w-[120px] object-contain opacity-[0.72] transition-opacity duration-300 hover:opacity-100"
        />
      ))}
    </div>
  );
}
