import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FilloutEmbed from "@/components/ui/FilloutEmbed";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { getVacatureEn, vacatures } from "@/content/vacatures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vacatures.map((v) => ({ slug: v.slugEn }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVacatureEn(slug);
  if (!v) return {};
  const title = v.niveauEn ? `${v.titelEn}, ${v.niveauEn}` : v.titelEn;
  return {
    title: `${title} vacancy`,
    description: `${v.taglineEn} ${v.kaartTekstEn}`,
    alternates: { canonical: `/en/careers/${v.slugEn}` },
  };
}

export default async function CareerPage({ params }: Props) {
  const { slug } = await params;
  const v = getVacatureEn(slug);
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
              <Link href="/en/careers" className="hover:underline">
                &larr; Back to careers
              </Link>
            </p>
            {v.badgeEn && (
              <span className="mt-6 inline-block rounded-full bg-magenta/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-magenta">
                {v.badgeEn}
              </span>
            )}
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {v.titelEn}
            </h1>
            {v.niveauEn && (
              <p className="font-display mt-2 text-xl font-semibold text-primary sm:text-2xl">
                {v.niveauEn}
              </p>
            )}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              {v.taglineEn}
            </p>
            <p className="mt-4 font-mono text-sm text-text-muted">
              {v.locatie} · {v.urenEn}
            </p>
            <div className="mt-8">
              <MagneticButton href="#solliciteer">Apply now</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-5 pb-4">
        <Reveal>
          <div className="space-y-5">
            {v.introEn.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0 && v.introEn.length > 1
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

      {/* What we offer */}
      <Section kicker="💰 The offer" title="What do we offer you?" variant="alt">
        <div className="grid gap-6 sm:grid-cols-3">
          {v.aanbodEn.map((a, i) => (
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

      {/* Are you a match? */}
      <Section
        kicker="🎯 Quick check"
        title="Are you a match?"
        sub="Check off and discover if you're a match for the role!"
      >
        <ul className="max-w-3xl space-y-4">
          {v.matchEn.map((m, i) => (
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
        {v.matchOutroEn && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl leading-relaxed text-text-muted">
              {v.matchOutroEn}
            </p>
          </Reveal>
        )}
      </Section>

      {/* Workday / What will you do? */}
      <Section kicker="🚀 The role" title={v.werkdagTitelEn} variant="alt">
        <ul className="max-w-3xl space-y-4">
          {v.werkdagEn.map((w, i) => (
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
        {v.werkdagOutroEn && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl font-semibold leading-relaxed">
              {v.werkdagOutroEn}
            </p>
          </Reveal>
        )}
      </Section>

      {/* Application process */}
      <Section kicker="📋 How it works" title={v.procesTitelEn}>
        <ol className="max-w-3xl space-y-6">
          {v.procesEn.map((step, i) => (
            <li key={i}>
              <Reveal delay={i * 0.08}>
                <div className="flex items-start gap-5 rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    {step.titel && (
                      <h3 className="font-display text-lg font-bold">
                        {step.titel}
                      </h3>
                    )}
                    <p
                      className={`leading-relaxed text-text-muted ${step.titel ? "mt-2" : ""}`}
                    >
                      {step.tekst}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        {v.procesOutroEn && (
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-3xl space-y-4">
              {v.procesOutroEn.map((p, i) => (
                <p key={i} className="leading-relaxed text-text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      {/* Application form */}
      <Section
        id="solliciteer"
        kicker="Apply"
        title="Apply quickly and easily!"
        variant="alt"
      >
        <div className="max-w-3xl">
          <FilloutEmbed
            meting="vacature_sollicitatie_en"
            formId={v.filloutFormId}
            title={`Application form ${v.titelEn}`}
            height={700}
          />
        </div>
      </Section>
    </>
  );
}
