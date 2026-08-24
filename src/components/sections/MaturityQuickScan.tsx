"use client";

import { useRef, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import MaturityRadar from "@/components/ui/MaturityRadar";
import { scanMail, site, type Lang } from "@/lib/site";
import { stuurEvent } from "@/lib/analytics";
import {
  DIMS_EN,
  DIMS_NL,
  DOEL_PER_DIMENSIE,
  gemiddelde,
} from "@/lib/maturity";

const COPY = {
  nl: {
    kicker: "AI Maturity Quick Scan",
    kop: "Waar staat jouw organisatie nu?",
    sub: "Zeven vragen, één per dimensie. Geef een score van 1 tot 5 en het web beweegt mee. De gestreepte lijn is waar we in een partnership binnen twaalf maanden naartoe werken.",
    schaalHint: "1 = nog niets geregeld · 5 = volledig op orde",
    jouwScore: "jouw score",
    doel: "doel",
    doelUitleg: "na 12 maanden",
    sprongLabel: "Begin hier",
    sprongUitleg: "je laagste score, dus de grootste winst",
    ctaPartnership: "Bekijk het AI Partnership",
    ctaBooking: "Plan een kennismaking",
    aanbodKicker: "Gratis, geen verplichting",
    aanbodKop: "Stuur je profiel op en krijg er een analyse op terug",
    aanbodPunten: [
      "Welke van de zeven dimensies wij als eerste zouden aanpakken, en waarom juist die",
      "Twee voorbeelden van wat dat bij een vergelijkbare organisatie opleverde",
      "Of een losse workshop hier logischer is dan een partnership, of andersom",
    ],
    ctaMail: "Mail mijn profiel",
    mailHint: (naar: string) =>
      `Je mailprogramma opent met je zeven scores erin, geadresseerd aan ${naar}. Je verstuurt hem zelf, dus wij bewaren niets tot je op verzenden drukt. Reactie binnen 24 uur van een mens.`,
    mailSubject: "Mijn AI Maturity Quick Scan",
    anderePaden: "Liever eerst zelf rondkijken?",
    reset: "Begin opnieuw",
    disclaimer:
      "Indicatief en niet opgeslagen: we bewaren je antwoorden niet. De echte nulmeting doen we on-site in de Kickoff, over alle zeven dimensies.",
    alt: (nu: string) =>
      `Radardiagram van jouw AI-volwassenheid: gemiddeld ${nu} van 5.`,
    /** Losse duiding per bandbreedte. Feitelijk, geen belofte. */
    duiding: [
      {
        max: 2,
        kop: "Er is nog geen fundament",
        tekst:
          "Op dit niveau gaat losse tooling niet werken. Eerst data en processen op orde, dan pas automatiseren.",
      },
      {
        max: 3,
        kop: "Je hebt losse stukken staan",
        tekst:
          "Genoeg om mee te beginnen, te weinig om op te bouwen. De winst zit in het aan elkaar knopen van wat er al is.",
      },
      {
        max: 4,
        kop: "Het fundament staat",
        tekst:
          "Vanaf hier gaat het over doorbouwen en verankeren, niet meer over beginnen.",
      },
      {
        max: 5,
        kop: "Je bent verder dan de meesten",
        tekst:
          "Dan is de vraag niet waar je begint, maar hoe je het over de hele organisatie uitrolt.",
      },
    ],
  },
  en: {
    kicker: "AI Maturity Quick Scan",
    kop: "Where does your organisation stand today?",
    sub: "Seven questions, one per dimension. Score from 1 to 5 and the web moves with you. The dashed line is where a partnership gets you within twelve months.",
    schaalHint: "1 = nothing in place · 5 = fully sorted",
    jouwScore: "your score",
    doel: "target",
    doelUitleg: "after 12 months",
    sprongLabel: "Start here",
    sprongUitleg: "your lowest score, so the biggest gain",
    ctaPartnership: "See the AI Partnership",
    ctaBooking: "Book an intro call",
    aanbodKicker: "Free, no strings",
    aanbodKop: "Send us your profile and get an analysis back",
    aanbodPunten: [
      "Which of the seven dimensions we would tackle first, and why that one",
      "Two examples of what that delivered at a comparable organisation",
      "Whether a single workshop makes more sense here than a partnership, or the other way round",
    ],
    ctaMail: "Email my profile",
    mailHint: (naar: string) =>
      `Your mail app opens with your seven scores in it, addressed to ${naar}. You send it yourself, so we store nothing until you hit send. Reply within 24 hours, from a human.`,
    mailSubject: "My AI Maturity Quick Scan",
    anderePaden: "Rather look around first?",
    reset: "Start over",
    disclaimer:
      "Indicative and not stored: we do not keep your answers. The real baseline we do on-site during the Kickoff, across all seven dimensions.",
    alt: (nu: string) =>
      `Radar chart of your AI maturity: ${nu} out of 5 on average.`,
    duiding: [
      {
        max: 2,
        kop: "There is no foundation yet",
        tekst:
          "At this level standalone tooling will not work. Data and processes first, then automate.",
      },
      {
        max: 3,
        kop: "You have loose pieces in place",
        tekst:
          "Enough to start with, too little to build on. The gain is in tying together what is already there.",
      },
      {
        max: 4,
        kop: "The foundation is there",
        tekst:
          "From here it is about building on and embedding, not about starting.",
      },
      {
        max: 5,
        kop: "You are further along than most",
        tekst:
          "Then the question is not where to start, but how to roll it out across the organisation.",
      },
    ],
  },
};

/** Iedereen begint in het midden, zodat het web meteen een vorm heeft. */
const START = [3, 3, 3, 3, 3, 3, 3];

export default function MaturityQuickScan({ lang = "nl" }: { lang?: Lang }) {
  const dims = lang === "en" ? DIMS_EN : DIMS_NL;
  const t = lang === "en" ? COPY.en : COPY.nl;

  const [scores, setScores] = useState<number[]>(START);
  const [aangeraakt, setAangeraakt] = useState(false);

  const doel = dims.map(() => DOEL_PER_DIMENSIE);
  const gem = gemiddelde(scores, lang);
  const doelGem = gemiddelde(doel, lang);

  // Laagste score, eerste bij gelijkspel: daar zit de grootste winst.
  const laagsteIndex = scores.reduce(
    (best, v, i) => (v < scores[best] ? i : best),
    0
  );
  const gemiddeldGetal = scores.reduce((s, v) => s + v, 0) / scores.length;
  const duiding =
    t.duiding.find((d) => gemiddeldGetal <= d.max) ??
    t.duiding[t.duiding.length - 1];

  /**
   * Meten of de scan gebruikt wordt, niet wat iemand antwoordt. Er gaan drie
   * events naar de dataLayer: de eerste klik, het moment dat alle zeven
   * dimensies zijn aangeraakt, en een klik op een van de twee CTA's. Geen
   * scores, geen dimensienamen.
   */
  const gestart = useRef(false);
  const afgerond = useRef(false);
  const aangeraakteDims = useRef(new Set<number>());

  function zet(i: number, waarde: number) {
    setAangeraakt(true);
    setScores((huidig) => huidig.map((v, idx) => (idx === i ? waarde : v)));

    if (!gestart.current) {
      gestart.current = true;
      stuurEvent("quick_scan_start", { taal: lang });
    }
    aangeraakteDims.current.add(i);
    if (!afgerond.current && aangeraakteDims.current.size === dims.length) {
      afgerond.current = true;
      stuurEvent("quick_scan_afgerond", { taal: lang });
    }
  }

  const partnershipHref =
    lang === "en" ? "/en/ai-partnership" : "/ai-partnership";

  /**
   * De scan levert iets tastbaars op zonder dat wij iets bewaren. Kopiëren is
   * de hoofdactie en mailto staat ernaast, niet omgekeerd: een mailto doet
   * niets bij iedereen zonder ingesteld mailprogramma, en dat is precies het
   * deel van de bezoekers dat webmail gebruikt. Een knop die stil faalt is
   * erger dan geen knop.
   */
  const mailBody = [
    lang === "en"
      ? "My AI Maturity Quick Scan on nina-ai.nl:"
      : "Mijn AI Maturity Quick Scan op nina-ai.nl:",
    "",
    ...dims.map((d, i) => `- ${d.naam}: ${scores[i]} / 5`),
    "",
    lang === "en"
      ? `Average: ${gem} out of 5. Lowest: ${dims[laagsteIndex].naam}.`
      : `Gemiddelde: ${gem} van 5. Laagste: ${dims[laagsteIndex].naam}.`,
    "",
    lang === "en"
      ? "I would like to talk about where to start."
      : "Ik wil graag bespreken waar we het beste beginnen.",
  ].join("\n");

  const mailHref =
    `mailto:${scanMail.naar}` +
    `?cc=${encodeURIComponent(scanMail.cc)}` +
    `&subject=${encodeURIComponent(t.mailSubject)}` +
    `&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      {/* Vragen */}
      <div className="rounded-[3px] border border-border bg-bg-card p-6 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t.kicker}
          </p>
          <p className="text-[11px] text-text-muted">{t.schaalHint}</p>
        </div>

        <ul className="mt-5 divide-y divide-border">
          {dims.map((d, i) => (
            <li key={d.naam} className="py-4 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold">{d.naam}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                {d.kort}
              </p>
              <div
                role="radiogroup"
                aria-label={`${d.naam}: ${d.kort}`}
                className="mt-2.5 flex gap-1.5"
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const gekozen = scores[i] === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={gekozen}
                      aria-label={String(n)}
                      onClick={() => zet(i, n)}
                      className={`font-display h-9 flex-1 rounded-[3px] border text-sm font-bold transition-colors ${
                        gekozen
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-bg text-text-muted hover:border-primary/60 hover:text-primary"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Uitkomst */}
      <div className="flex flex-col gap-5">
        <div className="rounded-[3px] border border-primary/50 bg-bg-card p-6 sm:p-7">
          <MaturityRadar
            labels={dims.map((d) => d.as)}
            nu={scores}
            doel={doel}
            alt={t.alt(gem)}
          />

          <div className="mt-2 flex items-center justify-center gap-6 border-t border-border pt-5 sm:gap-10">
            <div className="text-center">
              <p className="font-display text-4xl font-bold">{gem}</p>
              <p className="mt-0.5 text-xs text-text-muted">{t.jouwScore}</p>
            </div>
            <span aria-hidden="true" className="text-2xl text-magenta">
              →
            </span>
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-magenta">
                {doelGem}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                {t.doel} · {t.doelUitleg}
              </p>
            </div>
          </div>

          {/* aria-live: schermlezers horen de uitkomst veranderen. */}
          <div aria-live="polite" className="mt-5">
            <div className="rounded-[3px] bg-bg-muted px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t.sprongLabel}
              </p>
              <p className="mt-0.5 text-sm font-semibold">
                {dims[laagsteIndex].naam}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                {t.sprongUitleg}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold">{duiding.kop}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                {duiding.tekst}
              </p>
            </div>
          </div>
        </div>

        {/* Het aanbod is de hoofdactie geworden. Een knop "mail je profiel"
            zonder te zeggen wat je terugkrijgt geeft de bezoeker geen enkele
            reden om te klikken; de scan levert hem al een plaatje op en
            daarmee is hij klaar. Dus staat hier eerst wat hij ervoor krijgt,
            en pas daarna de knop. De twee andere paden blijven staan als
            tweede keuze. */}
        <div className="rounded-[3px] border border-primary/50 bg-bg-card p-6 shadow-[0_10px_36px_rgba(12,14,24,0.1)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-magenta">
            {t.aanbodKicker}
          </p>
          <p className="font-display mt-2 text-xl font-bold leading-snug">
            {t.aanbodKop}
          </p>
          <ul className="mt-4 space-y-2.5">
            {t.aanbodPunten.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <MagneticButton
              href={mailHref}
              className="w-full sm:w-auto"
              data-cta="quickscan_mail_profiel"
              data-cta-soort="quickscan"
              onClick={() =>
                stuurEvent("quick_scan_cta", {
                  keuze: "mail_profiel",
                  taal: lang,
                  ingevuld: gestart.current,
                })
              }
            >
              {t.ctaMail}
            </MagneticButton>
          </div>

          {/* Het adres staat in deze regel, dus wie geen mailprogramma heeft
              weet nog steeds waar het heen moet. Geen apart kopieerblok: dat
              was rommelig en niemand kopieert een lap tekst. */}
          <p className="mt-3 text-xs leading-relaxed text-text-muted">
            {t.mailHint(scanMail.naar)}
          </p>

          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              {t.anderePaden}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href={partnershipHref}
                variant="ghost"
                className="w-full sm:w-auto"
                data-cta="quickscan_partnership"
                data-cta-soort="quickscan"
                onClick={() =>
                  stuurEvent("quick_scan_cta", {
                    keuze: "partnership",
                    taal: lang,
                    ingevuld: gestart.current,
                  })
                }
              >
                {t.ctaPartnership}
              </MagneticButton>
              <MagneticButton
                href={site.bookingPartnership}
                variant="ghost"
                className="w-full sm:w-auto"
                data-cta="quickscan_kennismaking"
                data-cta-soort="quickscan"
                onClick={() =>
                  stuurEvent("quick_scan_cta", {
                    keuze: "kennismaking",
                    taal: lang,
                    ingevuld: gestart.current,
                  })
                }
              >
                {t.ctaBooking}
              </MagneticButton>
            </div>
          </div>
          {aangeraakt && (
            <button
              type="button"
              onClick={() => {
                setScores(START);
                setAangeraakt(false);
                gestart.current = false;
                afgerond.current = false;
                aangeraakteDims.current = new Set();
              }}
              className="mt-4 text-xs font-semibold text-primary hover:underline"
            >
              {t.reset}
            </button>
          )}
          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
