import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workshops & Training",
  description:
    "From intro to deep-dive: hands-on AI workshops that make your team AI-proficient. View the complete workshop offering and register directly.",
  alternates: { canonical: "/en/workshops" },
};

const tracks = [
  {
    name: "AI Intro",
    text: "Introduction to AI for teams",
  },
  {
    name: "AI Deep-dive",
    text: "Practical training for power users",
  },
  {
    name: "Team Tracks",
    text: "AI for marketing, sales, operations, HR",
  },
];

const features = [
  "Practical exercises with AI tools and prompt engineering skills",
  "Brainstorm about AI opportunities for your organization",
  "Concrete takeaways, action plan and everyone gets hands-on experience",
  "Tailored: prior intake to discuss goals and expectations",
];

export default function WorkshopsPageEn() {
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
              From intro to deep-dive: hands-on workshops that make your team{" "}
              <Em>AI-proficient</Em>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              No theory lectures, but doing it yourself: practical sessions
              with AI tools, prompt engineering and concrete exercises.
              Sessions are rated 9.3 on average and more than 100 companies
              preceded you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={site.workshops}>
                To the workshop platform
              </MagneticButton>
              <MagneticButton href="/en/contact" variant="ghost">
                Prefer a tailored session on location?
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Offering */}
      <Section
        kicker="The offering"
        title={
          <>
            Three routes to an <Em>AI-proficient team</Em>.
          </>
        }
        sub="Every workshop is hands-on: max. 15-20 participants, half a day, and everyone gets to work with the tools themselves."
        variant="alt"
        className="border-t border-border"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {tracks.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {t.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-2xl border border-border bg-bg-card p-7 sm:p-8">
            <h3 className="font-display text-xl font-bold">
              What to expect from every workshop
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Platform CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Workshop Platform
            </p>
            <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              View the complete offering and <Em>register directly</Em>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              All workshops, dates and registrations are on our external
              workshop platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={site.workshops}>
                To workshop platform
              </MagneticButton>
              <MagneticButton href={site.booking} variant="ghost">
                Book an intro call
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
