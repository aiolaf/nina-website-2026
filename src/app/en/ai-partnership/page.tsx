import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Partnership",
  description:
    "Everything you need in one fixed monthly collaboration: Kickoff, Build, Scale and Embed. From EUR 2,500 per month.",
  alternates: { canonical: "/en/ai-partnership" },
};

const STEPS = [
  {
    step: "01",
    name: "Kickoff",
    text: "The first, intensive month. On-site scan, workshop for the core team, n8n environment and a roadmap with prioritized business cases.",
  },
  {
    step: "02",
    name: "Build",
    text: "Fixed capacity every month to build workflows and agents that deliver value in your processes right away.",
  },
  {
    step: "03",
    name: "Scale",
    text: "What works, we roll out to more teams and processes. Quarterly reviews keep the direction sharp.",
  },
  {
    step: "04",
    name: "Embed",
    text: "Train-the-trainer, AI ambassadors and anchoring in the organization. The goal: an organization that can do it on its own.",
  },
];

/** EN pricing tiers (static variant of the Dutch PartnershipTiers component). */
const TIERS = [
  {
    label: "Entry",
    name: "AI Partner Light",
    price: "EUR 2,500",
    period: "per month",
    kickoff: "Kickoff Phase Light, one-off EUR 3,750",
    forWho: "SMEs or a single team",
    points: [
      "1 day per month of fixed capacity",
      "1 quick win per month",
      "Support and hosting",
    ],
    featured: false,
  },
  {
    label: "Most popular",
    name: "AI Partner Standard",
    price: "EUR 4,950",
    period: "per month",
    kickoff: "Kickoff Phase, one-off EUR 7,500",
    forWho: "Mid-market and scale-ups",
    points: [
      "2 days per month of fixed capacity",
      "Continuous building of workflows and agents",
      "You own the IP and hosting",
      "Quarterly review and train-the-trainer",
    ],
    featured: true,
  },
  {
    label: "Org-wide",
    name: "AI Partner Enterprise",
    price: "EUR 7,500+",
    period: "per month",
    kickoff: "Custom Kickoff Phase, from EUR 7,500",
    forWho: "Acceleration program across teams",
    points: [
      "Dedicated team of developer and strategist",
      "Organization-wide anchoring and AI ambassadors",
      "Security, compliance and SLA",
    ],
    featured: false,
  },
];

const KICKOFF_STANDARD = [
  "AI Readiness Scan: 1 full day of on-site process analysis",
  "AI Workshop for the core team (half day)",
  "n8n automation environment: setup and configuration",
  "Report with roadmap and prioritized business cases",
  "AI maturity assessment: baseline across strategy, vision and data",
];

const KICKOFF_LIGHT = [
  "AI Workshop for the core team (half day), with the AI Readiness as the end product",
  "n8n automation environment: setup and configuration",
  "Report with roadmap and prioritized business cases",
];

export default function AiPartnershipEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal-now">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The AI Partnership
              </p>
              <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                A dedicated AI partner for{" "}
                <Em>every stage of AI adoption</Em>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
                Organizations don&apos;t get stuck on knowledge, but on
                integration and adoption: after the workshop the energy fades,
                after the first build nobody keeps building. The AI
                Partnership closes that gap with fixed monthly capacity that
                brings knowledge, building and guidance together and keeps it
                running.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href={site.booking}>
                  Book an intro call
                </MagneticButton>
                <MagneticButton href="#packages" variant="ghost">
                  View the packages
                </MagneticButton>
              </div>
            </div>
            <div className="reveal-now hidden [animation-delay:0.2s] lg:block">
              <Image
                src="/images/foto-workshop.webp"
                alt="Kickoff workshop with a client's core team"
                width={900}
                height={682}
                className="rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(42,33,48,0.12)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <Section
        variant="alt"
        title={
          <>
            Four steps: Kickoff, Build, Scale and <Em>Embed</Em>.
          </>
        }
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((t, idx) => (
            <li key={t.name} className="h-full">
              <Reveal
                delay={idx * 0.1}
                className="relative h-full rounded-2xl border border-border bg-bg-card p-6 pt-8 transition-colors hover:border-primary/50"
              >
                <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/50 bg-bg px-3 py-1 text-sm font-bold text-primary">
                  {t.step}
                </span>
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                  {t.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Packages */}
      <Section
        id="packages"
        kicker="Ways to start"
        title={
          <>
            Choose the partnership that <Em>fits your organization</Em>.
          </>
        }
        sub="Every partnership starts with a mandatory, one-off Kickoff Phase. Minimum term 6 months, cancellable monthly after that. All amounts exclude VAT, as starting anchors."
      >
        <div className="grid gap-5 lg:grid-cols-3 lg:items-end">
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.1}>
              <div
                className={`flex flex-col rounded-2xl border p-6 transition-shadow sm:p-7 ${
                  tier.featured
                    ? "border-glow border-primary/60 bg-bg-muted shadow-[0_12px_44px_rgba(97,68,121,0.14)] lg:pb-10 lg:pt-9"
                    : "border-border bg-bg-card hover:border-primary/40"
                }`}
              >
                <span
                  className={`w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    tier.featured
                      ? "bg-gold/15 text-gold"
                      : "bg-bg-muted text-text-muted"
                  }`}
                >
                  {tier.label}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{tier.forWho}</p>
                <p className="mt-5">
                  <span className="font-display text-3xl font-bold">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-text-muted">
                    {tier.period}
                  </span>
                </p>
                <p className="mt-1 text-xs text-text-muted">{tier.kickoff}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  href="/en/contact"
                  variant={tier.featured ? "primary" : "ghost"}
                  className="mt-7 w-full"
                >
                  Book an intro call
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Kickoff phase */}
      <Section
        variant="alt"
        title={
          <>
            Every partnership starts with a <Em>Kickoff Phase</Em>.
          </>
        }
        sub="The Kickoff is the first, intensive month; after that the monthly partnership starts. The goal: from baseline to 4 out of 5 maturity within 12 months."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold">
                  Kickoff Phase
                </h3>
                <p className="font-display text-2xl font-bold text-gold">
                  EUR 7,500
                </p>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                3-week turnaround · mandatory with Standard and Enterprise
              </p>
              <ul className="mt-6 space-y-2.5">
                {KICKOFF_STANDARD.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-bold">
                  Kickoff Phase Light
                </h3>
                <p className="font-display text-2xl font-bold">EUR 3,750</p>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                2-week turnaround · mandatory with AI Partner Light
              </p>
              <ul className="mt-6 space-y-2.5">
                {KICKOFF_LIGHT.map((k) => (
                  <li key={k} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
                      ✓
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm text-text-muted">
                The AI Readiness rolls out of the workshop itself, no separate
                scan days needed.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Comparison */}
      <Section
        title={
          <>
            Buying separately or a partnership: the partnership is{" "}
            <Em>cheaper and continuous</Em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Buying everything separately
              </p>
              <p className="font-display mt-3 text-3xl font-bold">
                EUR 35,000 to 40,000
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Workshop, AI Design, consulting hours and a standalone build.
                Starting over every time, without continuous guidance.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-muted p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI Partnership, 6 months
              </p>
              <p className="font-display mt-3 text-3xl font-bold text-gold">
                ± EUR 30,000
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Kickoff plus 6 months of AI Partner Standard. Continuous
                knowledge, consulting and building in one, with quarterly
                reviews and your own IP.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-text-muted">
            A measurable growth target: your organization&apos;s AI maturity
            from a baseline around 2.7 to 4.0 or higher within 12 months,
            measured across strategy, vision and data.
          </p>
        </Reveal>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,68,121,0.09),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to become AI partners?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Book a free intro call. We&apos;ll show you what a partnership
              means for your processes.
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
