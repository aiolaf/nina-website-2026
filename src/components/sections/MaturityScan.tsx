import Reveal from "@/components/ui/Reveal";
import MaturityRadar from "@/components/ui/MaturityRadar";
import type { Lang } from "@/lib/site";
import {
  DIMS_EN,
  DIMS_NL,
  VOORBEELD_DOEL,
  VOORBEELD_NU,
  gemiddelde,
} from "@/lib/maturity";

const COPY = {
  nl: {
    kaartLabel: "Profiel · nu vs. doel",
    nu: "nu",
    doel: "doel na 12 maanden",
    sprongLabel: "Grootste sprong",
    schaalLabel: "Wat we meten, op een schaal van 1 tot 5",
    legendaNu: "nu",
    legendaDoel: "doel",
    sprong: "sprong",
    naar: "naar",
    alt: (nu: string, doel: string) =>
      `Radardiagram van zeven dimensies AI-volwassenheid: gemiddeld ${nu} nu en ${doel} als doel.`,
  },
  en: {
    kaartLabel: "Profile · now vs. target",
    nu: "now",
    doel: "target after 12 months",
    sprongLabel: "Biggest jump",
    schaalLabel: "What we measure, on a scale of 1 to 5",
    legendaNu: "now",
    legendaDoel: "target",
    sprong: "jump",
    naar: "to",
    alt: (nu: string, doel: string) =>
      `Radar chart of seven AI maturity dimensions: ${nu} on average now and ${doel} as the target.`,
  },
};

/** Nu-score als gevulde stip, doel als open ring. Twee schalen in één rij. */
function MiniSchaal({
  nu,
  doel,
  labelNu,
  labelDoel,
}: {
  nu: number;
  doel: number;
  labelNu: string;
  labelDoel: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="sr-only">
        {labelNu} {nu}, {labelDoel} {doel}
      </span>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className={`font-display flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
            n === nu
              ? "bg-primary text-white"
              : n === doel
                ? "border-2 border-magenta text-magenta"
                : "bg-bg-muted text-text-muted/70"
          }`}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

/**
 * Statische plaat met het voorbeeldprofiel: het start- en eindpunt waar het
 * partnership naartoe werkt. De gemiddelden worden uit de zeven scores
 * berekend, dus ze kunnen niet uit de pas lopen met de radar.
 */
export default function MaturityScan({ lang = "nl" }: { lang?: Lang }) {
  const dims = lang === "en" ? DIMS_EN : DIMS_NL;
  const t = lang === "en" ? COPY.en : COPY.nl;

  const nuGem = gemiddelde(VOORBEELD_NU, lang);
  const doelGem = gemiddelde(VOORBEELD_DOEL, lang);

  // Grootste sprong: eerste dimensie met het grootste verschil.
  const sprongen = dims.map((d, i) => ({
    naam: d.naam,
    nu: VOORBEELD_NU[i],
    doel: VOORBEELD_DOEL[i],
    delta: VOORBEELD_DOEL[i] - VOORBEELD_NU[i],
  }));
  const grootste = sprongen.reduce((a, b) => (b.delta > a.delta ? b : a));

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
      <Reveal>
        <div className="h-full rounded-[3px] border border-border bg-bg-card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t.kaartLabel}
          </p>

          <div className="mt-4">
            <MaturityRadar
              labels={dims.map((d) => d.as)}
              nu={VOORBEELD_NU}
              doel={VOORBEELD_DOEL}
              alt={t.alt(nuGem, doelGem)}
            />
          </div>

          <div className="mt-2 flex items-center justify-center gap-5 text-[11px] text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-ink-deep" />
              {t.legendaNu}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-magenta" />
              {t.legendaDoel}
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 border-t border-border pt-6 sm:gap-10">
            <div className="text-center">
              <p className="font-display text-4xl font-bold">{nuGem}</p>
              <p className="mt-0.5 text-xs text-text-muted">{t.nu}</p>
            </div>
            <span aria-hidden="true" className="text-2xl text-magenta">
              →
            </span>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-magenta">
                {doelGem}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">{t.doel}</p>
            </div>
          </div>

          <p className="mt-5 rounded-[3px] bg-bg-muted px-4 py-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary">
              {t.sprongLabel}
            </span>
            <span className="mt-0.5 block text-sm font-semibold">
              {grootste.naam} ({grootste.nu} {t.naar} {grootste.doel})
            </span>
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="h-full rounded-[3px] border border-border bg-bg-card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t.schaalLabel}
          </p>
          <ul className="mt-4 divide-y divide-border">
            {dims.map((d, i) => (
              <li key={d.naam} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      {d.naam}
                      <span className="ml-2 whitespace-nowrap rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                        +{VOORBEELD_DOEL[i] - VOORBEELD_NU[i]} {t.sprong}
                      </span>
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      {d.vraag}
                    </p>
                  </div>
                  <MiniSchaal
                    nu={VOORBEELD_NU[i]}
                    doel={VOORBEELD_DOEL[i]}
                    labelNu={t.legendaNu}
                    labelDoel={t.legendaDoel}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
