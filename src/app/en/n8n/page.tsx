import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CountUp from "@/components/ui/CountUp";
import Section, { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "n8n Experts",
  description:
    "We are the n8n experts of the Netherlands. Securely hosted in Amsterdam, 7000+ integrations, your own n8n environment without lock-in.",
  alternates: alternatesVoor("/en/n8n"),
};

const REASONS = [
  {
    title: "Cost-effective",
    text: "As an open-source alternative to Zapier, n8n is very attractively priced. You don't pay per task or per user, so scaling up costs nothing extra.",
  },
  {
    title: "Securely hosted in Amsterdam",
    text: "Our servers are located in Amsterdam. Your data always stays in the Netherlands, fully GDPR-compliant. Optionally Azure OpenAI for extra safeguards.",
  },
  {
    title: "Your own n8n environment",
    text: "An environment that remains yours. No lock-in: when we're done, you can keep building independently.",
  },
  {
    title: "Flexible and modular",
    text: "Workflows are modular and the language model is swappable. We plug in new models or tools without rebuilding everything.",
  },
];

const TOOLS = [
  "Gmail",
  "Outlook",
  "Google Drive",
  "SharePoint",
  "Slack",
  "Teams",
  "WhatsApp",
  "HubSpot",
  "Salesforce",
  "Exact",
  "AFAS",
  "Notion",
  "Jira",
  "Stripe",
  "Mailchimp",
  "Airtable",
];

export default function N8nEn() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 sm:pb-24">
          <div className="reveal-now">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              n8n AI Automations
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              We are the <Em>n8n experts</Em> of the Netherlands.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              n8n is an open-source low-code platform for building
              automations: the safest and most complete way to automate your
              business processes. As n8n specialists we provide complete n8n
              services, from setup to management.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>
                Book an intro call
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-bg-alt py-14">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="font-display text-4xl font-bold text-primary sm:text-5xl">
            <CountUp to={7000} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-text-muted">
            direct tool integrations possible
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {TOOLS.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted transition-colors hover:border-primary/50 hover:text-text"
              >
                {t}
              </li>
            ))}
            <li className="rounded-full border border-primary/50 bg-bg-muted px-4 py-1.5 text-sm text-primary">
              and 6,900+ more
            </li>
          </ul>
        </div>
      </section>

      <Section
        kicker="Why we work with n8n"
        title={
          <>
            Connect AI to your <Em>existing stack</Em>.
          </>
        }
      >
        <div className="grid gap-x-14 sm:grid-cols-2">
          {REASONS.map((r, idx) => (
            <Reveal key={r.title} delay={idx * 0.08}>
              <div className="border-t border-border py-6">
                <h3 className="font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  {r.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        variant="alt"
        title={
          <>
            Human in the loop, <Em>in n8n too</Em>.
          </>
        }
        sub="We differentiate ourselves through the preliminary phase: first understand the process, then build. Every workflow gets checkpoints where human judgment belongs. That way you automate without losing control."
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
              Ready to connect your workflows?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Book an intro call and see which of your processes can be
              automated right away.
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
