import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { openSollicitatie, vacatures } from "@/content/vacatures";

export const metadata: Metadata = {
  title: "Vacatures",
  description:
    "Werken bij NinA AI Agency in Amsterdam: bouw AI-agents en automatiseringen die bij klanten in productie draaien. Bekijk de openstaande vacatures.",
  alternates: { canonical: "/vacatures" },
};

export default function VacaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                We&rsquo;re hiring!
              </p>
              <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Kom bij ons <Em>AI bouwen</Em>.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
                We zijn een jong bedrijf in Amsterdam dat hard groeit. Je krijgt
                veel ruimte en verantwoordelijkheid, en je werk staat meestal
                binnen een week bij klanten in productie.
              </p>
              <div className="mt-8">
                <MagneticButton href="#vacatures">
                  Versterk ons team
                </MagneticButton>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-sm lg:block">
              <Image
                src="/assets/team-office-DyvV-0z4.jpg"
                alt="Het team van NinA AI Agency op kantoor"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vacature-kaarten */}
      <section id="vacatures" className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vacatures.map((v, i) => (
              <Reveal key={v.slug} delay={Math.min(i % 3, 2) * 0.08}>
                <Link
                  href={`/vacatures/${v.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                      {v.categorie}
                    </p>
                    {v.badge && (
                      <span className="rounded-full bg-magenta/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-magenta">
                        {v.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display mt-3 text-xl font-bold leading-snug">
                    {v.titel}
                    {v.niveau ? (
                      <span className="text-text-muted"> · {v.niveau}</span>
                    ) : null}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {v.kaartTekst}
                  </p>
                  <div className="mt-auto pt-5">
                    <p className="text-xs text-text-muted">
                      {v.locatie} · {v.uren}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-primary group-hover:underline">
                      Meer informatie &rarr;
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}

            {/* Open sollicitatie */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-primary/40 bg-bg-card p-6 shadow-sm">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {openSollicitatie.categorie}
                </p>
                <h2 className="font-display mt-3 text-xl font-bold leading-snug">
                  {openSollicitatie.titel}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {openSollicitatie.tekst}
                </p>
                <div className="mt-auto pt-5">
                  <p className="text-xs text-text-muted">
                    {openSollicitatie.locatie} · {openSollicitatie.uren}
                  </p>
                  <div className="mt-4">
                    <MagneticButton
                      href={openSollicitatie.filloutUrl}
                      variant="ghost"
                    >
                      Solliciteer!
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
