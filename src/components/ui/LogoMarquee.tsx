import { ALLE_LOGOS, LogoTegel } from "./KlantLogoRij";

/**
 * Doorlopende klantlogo-band met de volledige set van 24 merken, voor de
 * homepage. Tegelrecept en logolijst komen uit KlantLogoRij, zodat de
 * statische rij en deze band niet uit elkaar kunnen lopen. Spec:
 * docs/klant-logo-rij.md.
 *
 * De animatie pauzeert bij hover en staat stil onder prefers-reduced-motion;
 * dan wrapt de set als een gewone rij.
 */
export default function LogoMarquee({
  label = "Vertrouwd door",
}: {
  label?: string;
}) {
  const rij = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {ALLE_LOGOS.map((logo) => (
        <li key={logo.alt} className="shrink-0">
          <LogoTegel logo={logo} ariaHidden={ariaHidden} />
        </li>
      ))}
    </ul>
  );

  return (
    <div role="region" aria-label="Organisaties die met NinA AI werkten">
      {label && (
        <p className="label-mono mb-5 text-center text-[11px] text-text-muted">
          {label}
        </p>
      )}
      <div className="group relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_75s_linear_infinite] py-2 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {rij(false)}
          {rij(true)}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>
    </div>
  );
}
