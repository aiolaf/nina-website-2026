/* eslint-disable @next/next/no-img-element */

const LOGOS: { src: string; alt: string; w: number; h: number }[] = [
  { src: "/images/logos/asml.svg", alt: "ASML", w: 78, h: 40 },
  { src: "/images/logos/schiphol.svg", alt: "Schiphol Group", w: 78, h: 40 },
  { src: "/images/logos/action.webp", alt: "Action", w: 169, h: 32 },
  { src: "/images/logos/boskalis.webp", alt: "Boskalis", w: 100, h: 32 },
  { src: "/images/logos/da-drogist.webp", alt: "DA Drogist", w: 40, h: 40 },
  { src: "/images/logos/de-baak.webp", alt: "De Baak", w: 70, h: 32 },
  { src: "/images/logos/lelystad.webp", alt: "Gemeente Lelystad", w: 82, h: 32 },
  { src: "/images/logos/easytoys.webp", alt: "EasyToys", w: 75, h: 32 },
  { src: "/images/logos/kernbouw.webp", alt: "KernBouw", w: 123, h: 32 },
  { src: "/images/logos/koffiejongens.webp", alt: "De Koffiejongens", w: 40, h: 40 },
];

/**
 * Doorlopende logowall met echte klantlogo's. Rustig in grijswaarden,
 * kleur op hover. CSS-animatie pauzeert op hover en staat stil onder
 * prefers-reduced-motion.
 */
export default function LogoMarquee() {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {LOGOS.map((logo) => (
        <li key={logo.alt} className="shrink-0">
          <img
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={logo.w}
            height={logo.h}
            loading="lazy"
            className="max-h-10 w-auto [filter:grayscale(1)_opacity(0.6)] transition-[filter] duration-300 hover:[filter:grayscale(0)_opacity(1)]"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      role="region"
      aria-label="Organisaties die met NinA AI werkten"
    >
      <div className="flex w-max animate-[marquee_45s_linear_infinite] py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {row(false)}
        {row(true)}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
