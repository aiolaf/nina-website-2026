import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workshops & Training",
  description:
    "Van intro tot deep-dive: hands-on AI-workshops die je team AI-vaardig maken. Bekijk het volledige workshop-aanbod en schrijf je direct in.",
  alternates: { canonical: "/workshops" },
};

const tracks = [
  {
    naam: "AI Intro",
    tekst: "Kennismaking met AI voor teams",
  },
  {
    naam: "AI Deep-dive",
    tekst: "Praktische training voor power users",
  },
  {
    naam: "Team Tracks",
    tekst: "AI voor marketing, sales, operations, HR",
  },
];

const kenmerken = [
  "Praktische oefeningen met AI-tools en prompt engineering skills",
  "Brainstorm over AI-kansen voor jullie organisatie",
  "Concrete takeaways, actieplan en iedereen gaat zelf aan de slag",
  "Op maat: vooraf een intake om doelen en verwachtingen te bespreken",
];

export default function WorkshopsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Workshops &amp; Training
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Van intro tot deep-dive: hands-on workshops die je team{" "}
              <Em>AI-vaardig</Em> maken.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Geen theorieles, maar zelf doen: praktische sessies met AI-tools,
              prompt engineering en concrete oefeningen. Sessies worden
              beoordeeld met een 9.3 en meer dan 100+ bedrijven gingen je voor.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={site.workshops}>
                Naar het workshop platform
              </MagneticButton>
              <MagneticButton href="/lezingen-workshops" variant="ghost">
                Liever op maat bij jullie op locatie?
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Aanbod */}
      <Section
        kicker="Het aanbod"
        title={
          <>
            Drie routes naar een <Em>AI-vaardig team</Em>.
          </>
        }
        sub="Elke workshop is hands-on: max. 15-20 deelnemers, een dagdeel, en iedereen gaat zelf met de tools aan de slag."
        variant="alt"
        className="border-t border-border"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {tracks.map((t, i) => (
            <Reveal key={t.naam} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold">
                  {t.naam}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {t.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-bg-card p-7 sm:p-8">
            <h3 className="font-display text-xl font-bold">
              Wat je van elke workshop mag verwachten
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {kenmerken.map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Platform-CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Workshop Platform
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Bekijk het volledige aanbod en{" "}
              <Em>schrijf je direct in</Em>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Alle workshops, data en inschrijvingen vind je op ons externe
              workshop platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={site.workshops}>
                Naar workshop platform
              </MagneticButton>
              <MagneticButton href="/lezingen-workshops" variant="ghost">
                Bekijk lezingen &amp; workshops op maat
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
