/* eslint-disable @next/next/no-img-element */

/**
 * De klantlogo-banner. Bron: componenten/assets/logo (index.json), de
 * logobibliotheek van Olaf. Elk logo staat volgens het beeldrecept op een
 * witte tegel: grijswaarden op 66 procent, volle kleur bij hover. Zo blijft
 * de rij rustig terwijl merken met een wit vlak in het bestand niet meer als
 * los kaartje tussen de wordmarks vallen.
 */
const LOGOS: { src: string; alt: string }[] = [
  { src: "/images/logos/asml.svg", alt: "ASML" },
  { src: "/images/logos/schiphol-group.svg", alt: "Schiphol Group" },
  { src: "/images/logos/politie.webp", alt: "Politie" },
  { src: "/images/logos/action.webp", alt: "Action" },
  { src: "/images/logos/boskalis.webp", alt: "Boskalis" },
  { src: "/images/logos/da-drogist.webp", alt: "DA Drogist" },
  { src: "/images/logos/de-baak.webp", alt: "De Baak" },
  { src: "/images/logos/gemeente-lelystad.webp", alt: "Gemeente Lelystad" },
  { src: "/images/logos/kplusv.svg", alt: "KplusV" },
  { src: "/images/logos/easytoys.webp", alt: "EasyToys" },
  { src: "/images/logos/kernbouw.webp", alt: "KernBouw" },
  { src: "/images/logos/de-koffie-jongens.webp", alt: "De Koffie Jongens" },
  { src: "/images/logos/de-nieuwe-arts.webp", alt: "de nieuwe arts" },
  { src: "/images/logos/last-mile-solutions.webp", alt: "Last Mile Solutions" },
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

export default function LogoMarquee() {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {LOGOS.map((logo) => (
        <li key={logo.alt} className="shrink-0">
          {/* Bewust geen loading="lazy". De tweede, gedupliceerde rij staat
              ver buiten het scherm en werd daardoor nooit geladen; zodra de
              animatie die rij in beeld schoof bleven de logo's leeg, het
              duidelijkst op mobiel waar bijna alles buiten beeld begint.
              fetchPriority laag houdt ze uit de weg van de LCP. */}
          <span className="flex h-14 w-28 items-center justify-center rounded-2xl border border-border bg-white px-4 py-3 transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(12,14,24,0.08)] sm:h-16 sm:w-32">
            <img
              src={logo.src}
              alt={ariaHidden ? "" : logo.alt}
              decoding="async"
              fetchPriority="low"
              className="max-h-full max-w-full object-contain [filter:grayscale(1)_contrast(0.9)] opacity-[0.66] transition-[filter,opacity] duration-300 hover:[filter:none] hover:opacity-100"
            />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="region"
      aria-label="Organisaties die met NinA AI werkten"
    >
      <div className="flex w-max animate-[marquee_70s_linear_infinite] py-2 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {row(false)}
        {row(true)}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
