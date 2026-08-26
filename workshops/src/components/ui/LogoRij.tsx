import Image from "next/image";

/**
 * De klantlogo-rij volgens de spec in docs/klant-logo-rij.md van de
 * hoofdsite: witte tegels, grijze logo's, kleur bij hover, en altijd het
 * mono-label "Vertrouwd door" ervoor. Geen kop, geen kader: de logo's zijn
 * bewijs, geen sectie.
 *
 * Op deze site staat de rij er om één reden: iemand die een ticket van een
 * paar honderd euro koopt bij een partij waar hij nog nooit van hoorde, wil
 * zien wie er eerder zat.
 */

type Logo = {
  naam: string;
  bestand: string;
  /**
   * Merken die hun logo mét eigen kleurvlak aanleveren (witte letters op een
   * gekleurd vierkant). Zonder deze vlag vervaagt zo'n logo op 66 procent
   * dekking tot een leeg grijs blok.
   */
  vlak?: boolean;
};

const LOGOS: Logo[] = [
  { naam: "Schiphol Group", bestand: "/images/logos/schiphol-group.svg" },
  { naam: "ASML", bestand: "/images/logos/asml.svg" },
  { naam: "Politie", bestand: "/images/logos/politie.webp" },
  { naam: "Boskalis", bestand: "/images/logos/boskalis.webp" },
  { naam: "Action", bestand: "/images/logos/action.webp" },
  { naam: "DA Drogist", bestand: "/images/logos/da-drogist.webp" },
  { naam: "Gemeente Lelystad", bestand: "/images/logos/gemeente-lelystad.webp" },
  { naam: "De Baak", bestand: "/images/logos/de-baak.webp" },
  { naam: "KplusV", bestand: "/images/logos/kplusv.svg", vlak: true },
  { naam: "Nsecure", bestand: "/images/logos/nsecure.webp" },
];

export default function LogoRij({ label = "Vertrouwd door" }: { label?: string }) {
  return (
    <div>
      <p className="label-mono text-[11px] text-text-muted">{label}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
        {LOGOS.map((logo) => (
          <div
            key={logo.naam}
            className={`group flex h-14 w-28 items-center justify-center rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(12,14,24,0.08)] sm:h-16 sm:w-32 ${
              logo.vlak ? "overflow-hidden p-0" : "px-4 py-3"
            }`}
          >
            <Image
              src={logo.bestand}
              alt={logo.naam}
              width={128}
              height={64}
              className={
                logo.vlak
                  ? "h-full w-auto object-contain [filter:grayscale(1)_contrast(0.92)_brightness(1.04)] transition-[filter] duration-300 group-hover:[filter:none]"
                  : "max-h-full max-w-full object-contain opacity-[0.66] [filter:grayscale(1)_contrast(0.9)] transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:[filter:none]"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
