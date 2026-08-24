import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { openSollicitatie, vacatures } from "@/content/vacatures";
import { alternatesVoor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We are an ambitious and innovative organization where there is room for your talent development. Check out our open positions and join our team in Amsterdam.",
  alternates: alternatesVoor("/en/careers"),
};

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                We&rsquo;re hiring!
              </p>
              <h1 className="display-serif mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
                We&rsquo;re looking for <Em>talent</Em>
              </h1>
              <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
                we read every application ourselves
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
                We are an ambitious and innovative organization where there is
                room for your talent development.
              </p>
              <div className="mt-8">
                <MagneticButton href="#vacancies">Join our team</MagneticButton>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[3px] border border-border shadow-sm lg:block">
              <Image
                src="/assets/team-office-DyvV-0z4.jpg"
                alt="The NinA AI Agency team at the office"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vacancy cards */}
      <section id="vacancies" className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vacatures.map((v, i) => (
              <Reveal key={v.slugEn} delay={Math.min(i % 3, 2) * 0.08}>
                <Link
                  href={`/en/careers/${v.slugEn}`}
                  className="group flex h-full flex-col rounded-[3px] border border-border bg-bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                      {v.categorieEn}
                    </p>
                    {v.badgeEn && (
                      <span className="rounded-full bg-magenta/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-magenta">
                        {v.badgeEn}
                      </span>
                    )}
                  </div>
                  <h2 className="display-serif mt-3 text-xl leading-snug">
                    {v.titelEn}
                    {v.niveauEn ? (
                      <span className="text-text-muted"> · {v.niveauEn}</span>
                    ) : null}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {v.kaartTekstEn}
                  </p>
                  <div className="mt-auto pt-5">
                    <p className="text-xs text-text-muted">
                      {v.locatie} · {v.urenEn}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-primary group-hover:underline">
                      More information &rarr;
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}

            {/* Open application */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col rounded-[3px] border border-dashed border-primary/40 bg-bg-card p-6 shadow-sm">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {openSollicitatie.categorieEn}
                </p>
                <h2 className="display-serif mt-3 text-xl leading-snug">
                  {openSollicitatie.titelEn}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {openSollicitatie.tekstEn}
                </p>
                <div className="mt-auto pt-5">
                  <p className="text-xs text-text-muted">
                    {openSollicitatie.locatie} · {openSollicitatie.urenEn}
                  </p>
                  <div className="mt-4">
                    <MagneticButton
                      href={openSollicitatie.filloutUrl}
                      variant="ghost"
                    >
                      Apply!
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
