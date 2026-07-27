import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FilloutEmbed from "@/components/ui/FilloutEmbed";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { getVacature, vacatures } from "@/content/vacatures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vacatures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVacature(slug);
  if (!v) return {};
  const titel = v.niveau ? `${v.titel} — ${v.niveau}` : v.titel;
  return {
    title: `Vacature ${titel}`,
    description: `${v.tagline} ${v.kaartTekst}`,
    alternates: { canonical: `/vacatures/${v.slug}` },
  };
}

export default async function VacaturePage({ params }: Props) {
  const { slug } = await params;
  const v = getVacature(slug);
  if (!v) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-14 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Link href="/vacatures" className="hover:underline">
                &larr; Terug naar vacatures
              </Link>
            </p>
            {v.badge && (
              <span className="mt-6 inline-block rounded-full bg-magenta/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-magenta">
                {v.badge}
              </span>
            )}
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {v.titel}
            </h1>
            {v.niveau && (
              <p className="font-display mt-2 text-xl font-semibold text-primary sm:text-2xl">
                {v.niveau}
              </p>
            )}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              {v.tagline}
            </p>
            <p className="mt-4 font-mono text-sm text-text-muted">
              {v.locatie} · {v.uren}
            </p>
            <div className="mt-8">
              <MagneticButton href="#solliciteer">Solliciteer nu</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 pb-4">
        <Reveal>
          <div className="space-y-5">
            {v.intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0 && v.intro.length > 1
                    ? "text-lg font-semibold leading-relaxed"
                    : "text-lg leading-relaxed text-text-muted"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Wat bieden we jou? */}
      <Section kicker="💰 Het aanbod" title="Wat bieden we jou?" variant="alt">
        <div className="grid gap-6 sm:grid-cols-3">
          {v.aanbod.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {a.label}
                </p>
                <p className="font-display mt-3 text-xl font-bold leading-snug">
                  {a.titel}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Ben je een match? */}
      <Section
        kicker="🎯 Even checken"
        title="Ben je een match?"
        sub="Vink aan en ontdek of je een match bent met de rol!"
      >
        <ul className="max-w-3xl space-y-4">
          {v.match.map((m, i) => (
            <li key={i}>
              <Reveal delay={Math.min(i, 4) * 0.06}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-bg-card p-5 shadow-sm">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary"
                  >
                    ✓
                  </span>
                  <span className="leading-relaxed">{m}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        {v.matchOutro && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl leading-relaxed text-text-muted">
              {v.matchOutro}
            </p>
          </Reveal>
        )}
      </Section>

      {/* Werkdag / Wat ga je doen? */}
      <Section kicker="🚀 De rol" title={v.werkdagTitel} variant="alt">
        <ul className="max-w-3xl space-y-4">
          {v.werkdag.map((w, i) => (
            <li key={i}>
              <Reveal delay={Math.min(i, 4) * 0.06}>
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span className="leading-relaxed">{w}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        {v.werkdagOutro && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl font-semibold leading-relaxed">
              {v.werkdagOutro}
            </p>
          </Reveal>
        )}
      </Section>

      {/* Sollicitatieproces */}
      <Section kicker="📋 Zo werkt het" title={v.procesTitel}>
        <ol className="max-w-3xl space-y-6">
          {v.proces.map((stap, i) => (
            <li key={i}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    {stap.titel && (
                      <h3 className="font-display text-lg font-bold">
                        {stap.titel}
                      </h3>
                    )}
                    <p
                      className={`leading-relaxed text-text-muted ${stap.titel ? "mt-2" : ""}`}
                    >
                      {stap.tekst}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        {v.procesOutro && (
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-3xl space-y-4">
              {v.procesOutro.map((p, i) => (
                <p key={i} className="leading-relaxed text-text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      {/* Sollicitatieformulier */}
      <Section
        id="solliciteer"
        kicker="Solliciteer"
        title="Solliciteer makkelijk en snel!"
        variant="alt"
      >
        <div className="max-w-3xl">
          <FilloutEmbed
            formId={v.filloutFormId}
            title={`Sollicitatieformulier ${v.titel}`}
            height={700}
          />
        </div>
      </Section>
    </>
  );
}
