import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "Digital colleagues that work 24/7. AI agents for document processing, orders into your ERP and customer support, securely hosted in Amsterdam.",
  alternates: { canonical: "/en/ai-agents" },
};

const USE_CASES = [
  {
    name: "Documents and reports from expert knowledge",
    text: "Calculations, advice and compliance documents that currently need seniors. The agent captures the knowledge and writes the first draft; the expert approves.",
    signal:
      "Sound familiar? Knowledge lives in people's heads, seniors are retiring, vacancies stay open for months.",
  },
  {
    name: "Requests, orders and invoices into your ERP",
    text: "Email, PDFs and portals read automatically and entered into your system without errors. Short time-to-value, immediately measurable time savings.",
    signal:
      "Sound familiar? Employees retype data from emails and attachments every day.",
  },
  {
    name: "Customer support: tickets, calls and email",
    text: "Email and voice agents that answer questions, route tickets and respond in multiple languages. The human stays in the loop for exceptions.",
    signal:
      "Sound familiar? Growing ticket volume, multilingual support vacancies, long response times.",
  },
];

const AGENTS = [
  {
    name: "Customer Support AI Agent",
    text: "Answers questions 24/7, routes what needs human attention.",
  },
  {
    name: "AI Writing Agent",
    text: "Turns expert knowledge into proposals, reports and documentation.",
  },
  {
    name: "Content AI Agent",
    text: "Produces consistent content in your tone of voice.",
  },
];

/** Static EN variant of the interactive agent demo on the NL page. */
const DEMO_STEPS = [
  {
    step: "Email arrives",
    text: "A request with a PDF attachment lands in the shared inbox.",
  },
  {
    step: "Agent extracts the data",
    text: "Client, request type, amounts and deadline are pulled from the email and the PDF.",
  },
  {
    step: "System is updated",
    text: "CRM updated, task created in MS Planner, request labeled by relevance.",
  },
  {
    step: "Human reviews",
    text: "Edge cases are flagged for your team. Everything else is already done.",
  },
];

export default function AiAgentsEn() {
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
              AI Agents
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Digital colleagues that <Em>work 24/7</Em>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Fewer manual tasks and errors, faster turnaround times. We build
              AI agents that run in your own environment, with the human in
              the loop.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>
                Book an intro call
              </MagneticButton>
              <MagneticButton href="#demo" variant="ghost">
                See an agent at work
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        title={
          <>
            Three processes where AI agents <Em>pay for themselves fastest</Em>
            .
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {USE_CASES.map((u, idx) => (
            <Reveal key={u.name} delay={idx * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:border-primary/50">
                <h3 className="font-display text-lg font-bold">{u.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {u.text}
                </p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-primary">
                  {u.signal}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Static EN variant of the interactive AgentDemo */}
      <Section
        id="demo"
        kicker="See it work"
        title={
          <>
            How an agent processes a request, <Em>from email to system</Em>.
          </>
        }
        sub="At Van Berkel Professionals this approach handles over 100 requests per day, saving 192 hours per month."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_STEPS.map((s, idx) => (
            <li key={s.step} className="h-full">
              <Reveal
                delay={idx * 0.1}
                className="relative h-full rounded-2xl border border-border bg-bg-card p-6 pt-8"
              >
                <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/50 bg-bg px-3 py-1 text-sm font-bold text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-bold">{s.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {s.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        variant="alt"
        title={
          <>
            Proven agents, adapted to <Em>your processes</Em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {AGENTS.map((a, idx) => (
            <Reveal key={a.name} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-base font-bold">{a.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {a.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title={
          <>
            Human in the loop: the agent works, <Em>the human decides</Em>.
          </>
        }
        sub="Every agent gets checkpoints where they belong. You can always approve, adjust or take over. Our servers are located in Amsterdam: your data stays in the Netherlands, fully GDPR-compliant."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Securely hosted in Amsterdam
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Own infrastructure, EU hosting, compatible with ISO 27001 and
                NEN 7510. Optionally Azure OpenAI for extra safeguards.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                No lock-in, you own the IP
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                The agents run in your own environment and remain yours. When
                we&apos;re done, you can carry on independently.
              </p>
            </div>
          </Reveal>
        </div>
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
              Which colleague will you hire first?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Book an intro call and within 15 minutes we&apos;ll show you
              which process pays for itself fastest at your organization.
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
