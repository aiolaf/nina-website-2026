import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Build",
  description:
    "Custom automations, agents and products. From process optimization to vibe-code to product. Working workflows in your own environment.",
  alternates: { canonical: "/en/ai-build" },
};

/** Static EN variant of the interactive before/after workflow comparison. */
const COMPARE = [
  {
    label: "Intake",
    before: "Retyping into the system, error-prone",
    after: "Read and entered automatically, zero errors",
  },
  {
    label: "Follow-up",
    before: "At the end of the week, when there's time",
    after: "Tasks and reminders created instantly",
  },
  {
    label: "Reporting",
    before: "Manually compiled once a month",
    after: "Real-time updated dashboard",
  },
];

export default function AiBuildEn() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal-now">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                AI Build
              </p>
              <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                We deliver working workflows,{" "}
                <Em>not reports in a drawer</Em>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
                Custom automations, agents and products. Our developers build
                in your own environment, without lock-in. Projects from EUR
                5,200, development at EUR 130 per hour.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href={site.booking}>
                  Book an intro call
                </MagneticButton>
              </div>
            </div>
            <div className="reveal-now hidden [animation-delay:0.2s] lg:block">
              <Image
                src="/images/foto-build.webp"
                alt="Live demo of an n8n workflow during a NinA session"
                width={900}
                height={675}
                className="rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(42,33,48,0.12)]"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        title={
          <>
            Process optimization or <Em>vibe-code to product</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <h2 className="font-display text-xl font-bold">
                Process optimization
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Old
                  </p>
                  <p className="mt-1 text-sm">Manual, error-prone</p>
                </div>
                <div className="rounded-xl border border-primary/50 bg-bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    New
                  </p>
                  <p className="mt-1 text-sm">Working workflow or agent</p>
                </div>
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-text-muted">
                <span className="font-semibold text-gold">
                  12 hours per week
                </span>{" "}
                saved on invoice processing. Order intake, email and voice
                agents follow the same pattern.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <h2 className="font-display text-xl font-bold">
                Vibe-code to product
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Your start
                  </p>
                  <p className="mt-1 text-sm">A prototype you built yourself</p>
                </div>
                <div className="rounded-xl border border-primary/50 bg-bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    NinA builds
                  </p>
                  <p className="mt-1 text-sm">A secure, scalable product</p>
                </div>
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-text-muted">
                From prototype to product,{" "}
                <span className="font-semibold text-gold">
                  EUR 20k to 65k+
                </span>
                . Examples: Grand Relocation, Micoll Safety Navigator.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-5 rounded-2xl border border-border bg-bg-card p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Where the agent sits
            </p>
            <div className="mt-5 flex flex-col items-stretch gap-3 text-center sm:flex-row sm:items-center">
              <div className="flex-1 rounded-xl border border-border bg-bg-alt p-4 text-sm">
                Your systems and data
              </div>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
              <div className="flex-1 rounded-xl border border-primary/60 bg-bg-muted p-4 text-sm font-semibold text-primary">
                NinA agent
              </div>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
              <div className="flex-1 rounded-xl border border-border bg-bg-alt p-4 text-sm">
                Your team
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-text-muted">
              EU hosting, Amsterdam. Our developers build in your own
              environment, no lock-in.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Static EN variant of the interactive WorkflowCompare */}
      <Section
        title={
          <>
            What a build <Em>does to a process</Em>.
          </>
        }
        sub="The same process, before and after. AI takes over step by step, your team keeps the final say."
      >
        <div className="space-y-5">
          {COMPARE.map((row, idx) => (
            <Reveal key={row.label} delay={idx * 0.08}>
              <div className="grid gap-3 rounded-2xl border border-border bg-bg-card p-6 sm:grid-cols-[120px_1fr_1fr] sm:items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {row.label}
                </p>
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Before
                  </p>
                  <p className="mt-1 text-sm">{row.before}</p>
                </div>
                <div className="rounded-xl border border-primary/50 bg-bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    After
                  </p>
                  <p className="mt-1 text-sm">{row.after}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        variant="alt"
        kicker="How we work"
        title={
          <>
            Test and learn: <Em>two-week sprints</Em>.
          </>
        }
        sub="We build in short sprints of 30 to 50 hours per month, with a dedicated AI team. Every sprint delivers something working that your team uses right away. Human in the loop where it belongs."
      />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,68,121,0.09),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Which process shall we rebuild first?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Book an intro call. Together we&apos;ll calculate what a build
              delivers, in hours and euros.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>
                Book an intro call
              </MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                Email {site.email}
              </MagneticButton>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              No strings attached, reply within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
