import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NeuralField from "@/components/canvas/NeuralField";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import LogoMarquee from "@/components/ui/LogoMarquee";
import GlowCard from "@/components/ui/GlowCard";
import Section, { Em } from "@/components/ui/Section";
import {
  IconBuilding,
  IconPresentation,
  IconGlobe,
  IconUsers,
  IconShield,
  IconPattern,
  IconHammer,
  IconMegaphone,
  IconSpark,
  IconFlow,
  IconPrompt,
  IconBot,
} from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NinA AI Agency | From idea to working AI agent",
  description:
    "NinA AI Agency helps B2B organizations automate processes with smart AI agents and workflows, without overhauling your entire IT landscape.",
  alternates: { canonical: "/en" },
};

const PRODUCTS = [
  {
    phase: "Phase 1",
    name: "AI Knowledge",
    result: "From 'what is AI' to 'what can I do with it tomorrow'.",
    href: "/en/workshops",
    Icon: IconPresentation,
    photo: "/images/foto-lezing.webp",
    photoAlt: "Olaf Lemmens on stage during a NinA AI keynote",
  },
  {
    phase: "Phase 2",
    name: "AI Consult / Design",
    result: "A prioritized AI plan, not a theory dump.",
    href: "/en/ai-partnership",
    Icon: IconSpark,
    photo: "/images/foto-workshop.webp",
    photoAlt: "Hands-on AI workshop with participants behind laptops",
  },
  {
    phase: "Phase 3 and 4",
    name: "AI Build",
    result: "Working workflows in your own environment.",
    href: "/en/ai-build",
    Icon: IconFlow,
    photo: "/images/foto-build.webp",
    photoAlt: "Live demo of an n8n workflow during a NinA session",
  },
];

const USPS = [
  {
    title: "No lock-in, you own the IP",
    text: "ISO 27001 and NEN 7510 compatible. When we're done, you can carry on without us.",
    Icon: IconShield,
    pin: "EU hosting in Amsterdam",
  },
  {
    title: "Cross-industry patterns",
    text: "The same patterns from hospitality to transport: live faster and at lower cost.",
    Icon: IconPattern,
  },
  {
    title: "We build what we preach",
    text: "NinA runs internally on the same agents we build for clients.",
    Icon: IconHammer,
  },
  {
    title: "Reach and proof",
    text: "2.9M reach, 160+ organizations, 100+ workshops, since 2024.",
    Icon: IconMegaphone,
  },
];

/** The four phases of AI adoption, as a static English overview. */
const PHASES = [
  {
    nr: "1",
    name: "Prompting",
    text: "Your team works with ChatGPT and Copilot. Useful, but the gains stay individual.",
    Icon: IconPrompt,
  },
  {
    nr: "2",
    name: "Assistants",
    text: "Custom GPTs and skills for the daily work. We design the plan and the prompt library.",
    Icon: IconSpark,
  },
  {
    nr: "3",
    name: "Workflows",
    text: "Automations that run without anyone pressing a button. This is where the hours start adding up.",
    Icon: IconFlow,
  },
  {
    nr: "4",
    name: "Agents",
    text: "Digital colleagues that plan, execute and report, with a human in the loop.",
    Icon: IconBot,
  },
];

/** Static agent log, replacing the interactive playground on the NL page. */
const AGENT_LOG = [
  { time: "09:12", text: "Order agent: 14 orders processed into the ERP" },
  { time: "09:26", text: "Invoice workflow: 28 invoices matched, 0 errors" },
  { time: "09:41", text: "Report agent: draft calculation ready for review" },
  { time: "10:05", text: "Voice agent: callback scheduled in the calendar" },
  { time: "10:18", text: "Dashboard: 6.2 hours saved since midnight" },
];

/** Static workflow trace, replacing the interactive showcase on the NL page. */
const WORKFLOW_STEPS = [
  {
    step: "Incoming email",
    text: "A request with a PDF attachment lands in the shared inbox.",
  },
  {
    step: "Agent reads and extracts",
    text: "The agent pulls out the relevant fields: client, request type, deadline.",
  },
  {
    step: "Labeled and routed",
    text: "The request is labeled by relevance and pushed into your own tools.",
  },
  {
    step: "Human checks",
    text: "Your team reviews the edge cases. Everything else is already done.",
  },
];

export default function HomeEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="orb -left-40 top-1/4 h-[28rem] w-[28rem] bg-primary/10"
        />
        <div
          aria-hidden="true"
          className="orb -right-32 bottom-10 h-80 w-80 bg-magenta/10 [animation-delay:-9s]"
        />
        <NeuralField className="absolute inset-0 h-full w-full opacity-80" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div className="reveal-now">
              <p className="mb-6 inline-flex items-center rounded-full border border-border bg-bg-card/70 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
                The #1 AI agency in the Netherlands
              </p>
              <h1 className="font-display max-w-3xl text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="reveal-now inline-block">From AI knowledge</span>{" "}
                <span className="reveal-now inline-block [animation-delay:0.12s]">
                  to a
                </span>{" "}
                <span className="reveal-now inline-block [animation-delay:0.24s]">
                  <Em>working AI organization</Em>.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">
                NinA helps B2B organizations automate processes with smart AI
                agents and workflows, without overhauling your entire IT
                landscape. Your dedicated AI partner.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href={site.booking}>
                  Book an intro call
                </MagneticButton>
                <MagneticButton href="/en/workshops" variant="ghost">
                  Request a keynote
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                No strings attached, 15 minutes, reply within 24 hours.
              </p>
            </div>
            <div className="reveal-now [animation-delay:0.25s]">
              {/* Static agent log (the NL page shows an interactive playground) */}
              <div className="rounded-2xl border border-border bg-bg-card/80 p-5 shadow-[0_20px_60px_rgba(42,33,48,0.12)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Agents at work
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    live at clients
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {AGENT_LOG.map((l) => (
                    <li key={l.time} className="flex items-start gap-3 text-sm">
                      <span className="font-mono text-xs text-text-muted">
                        {l.time}
                      </span>
                      <span className="leading-snug">{l.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-3 text-xs text-text-muted">
                  Example of a continuous agent log with completed tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto */}
      <div className="border-y border-border bg-bg-alt py-10 sm:py-14">
        <p className="font-display mx-auto max-w-6xl px-5 text-center text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          <span className="motto-outline">Go </span>
          <span className="motto-fill">play</span>
          <span className="motto-outline"> with AI.</span>
          <span className="mt-2 block text-lg font-medium tracking-normal text-text-muted sm:text-xl">
            It&apos;s the only way to grow.
          </span>
        </p>
      </div>

      {/* Logos + stats */}
      <section className="border-b border-border bg-bg-alt py-12">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-6 text-center text-sm text-text-muted">
            These organizations went before you
          </p>
          <LogoMarquee />
          <div className="mt-12 grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                <IconBuilding className="h-5.5 w-5.5" />
              </span>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                #1
              </p>
              <p className="mt-1 text-sm text-text-muted">
                AI agency in the Netherlands
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                <IconPresentation className="h-5.5 w-5.5" />
              </span>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                <CountUp to={100} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-text-muted">
                workshops and sessions
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                <IconGlobe className="h-5.5 w-5.5" />
              </span>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                2.9M
              </p>
              <p className="mt-1 text-sm text-text-muted">LinkedIn reach</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4c2a4f,#614479_55%,#a562a1)] text-white shadow-[0_6px_18px_rgba(97,68,121,0.3)]">
                <IconUsers className="h-5.5 w-5.5" />
              </span>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                <CountUp to={10} suffix="+" />
              </p>
              <p className="mt-1 text-sm text-text-muted">specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Four phases (static EN variant of the interactive loop) */}
      <Section
        title={
          <>
            Most organizations get stuck in phase 1. The value is in{" "}
            <Em>phase 3 and 4</Em>.
          </>
        }
        sub="From prompting to agents, and back again. Every phase feeds the next."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((f, idx) => (
            <li key={f.nr} className="h-full">
              <Reveal
                delay={idx * 0.1}
                className="h-full rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Phase {f.nr}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-bold">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {f.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Products */}
      <Section
        variant="alt"
        title={
          <>
            Three ways to start, depending on{" "}
            <Em>where you are now</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PRODUCTS.map((p, idx) => (
            <Reveal key={p.name} delay={idx * 0.1}>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-primary/60"
              >
                <span className="relative block h-40 overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={p.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#2a2130]/50 to-transparent"
                  />
                  <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-md backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <p.Icon className="h-5 w-5" />
                  </span>
                </span>
                <span className="block flex-1 p-7 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {p.phase}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl font-bold transition-colors group-hover:text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-4 border-t border-border pt-4 text-sm text-primary">
                    {p.result}
                  </p>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link
            href="/en/ai-partnership"
            className="group mt-5 flex flex-col gap-3 rounded-2xl border border-primary/50 bg-bg-muted p-7 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                All-in-one
              </span>
              <h3 className="font-display mt-2 text-xl font-bold">
                The AI Partnership
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                Everything you need in one fixed monthly collaboration:
                Kickoff, Build, Scale and Embed. Step in at phase 1, 2 or 3;
                the partnership brings it together and keeps it running.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              From EUR 2,500 per month
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* Workflow (static EN variant of the interactive showcase) */}
      <Section
        variant="alt"
        kicker="See it work"
        title={
          <>
            We deliver working workflows, <Em>not reports in a drawer</Em>.
          </>
        }
        sub="From incoming email to labeled data in your tools. This is how it runs at clients: at Van Berkel Professionals, over 100 requests per day."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((s, idx) => (
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

      {/* Human + AI (static EN variant of the interactive Plan Mode demo) */}
      <Section
        title={
          <>
            Human and AI, each <Em>at their best</Em>.
          </>
        }
        sub="Every agent we build works like this: the agent proposes a plan, you approve, adjust or take over. The human stays in the loop."
      >
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-bg-card p-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Plan for approval
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Read the 14 new requests from the inbox",
                "Extract client, request type and deadline",
                "Create tasks in MS Planner and update the CRM",
                "Flag 2 edge cases for human review",
              ].map((step, idx) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
              <span className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
                Approve plan
              </span>
              <span className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-muted">
                Adjust
              </span>
              <span className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-muted">
                Take over
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Results */}
      <Section
        title={
          <>
            An AI partner costs less than 1 FTE and returns{" "}
            <Em>more than 13x</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {/* Static EN variant of the savings chart */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Hours, before and after
              </p>
              <ul className="mt-6 flex-1 space-y-5">
                {[
                  { label: "Invoice processing", before: 12, after: 1 },
                  { label: "Request intake", before: 10, after: 2 },
                  { label: "Proposals and reports", before: 8, after: 2 },
                ].map((row) => (
                  <li key={row.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span>{row.label}</span>
                      <span className="text-xs text-text-muted">
                        {row.before}h → {row.after}h per week
                      </span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 rounded-full bg-bg-alt">
                        <div
                          className="h-2 rounded-full bg-border"
                          style={{ width: `${(row.before / 12) * 100}%` }}
                        />
                      </div>
                      <div className="h-2 rounded-full bg-bg-alt">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${(row.after / 12) * 100}%` }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-xs text-text-muted">
                Grey: before the build. Purple: after. Based on client
                projects.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                figure: <CountUp to={192} suffix=" hrs" />,
                label: "saved per month at Van Berkel",
              },
              {
                figure: <>± 4.5 mo</>,
                label: "payback time, EUR 77k vs EUR 28k",
              },
              {
                figure: <>13x</>,
                label: "return on value created",
              },
              {
                figure: <>7 → 9</>,
                label: "employee happiness at Wens Chalets",
              },
            ].map((c, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <GlowCard className="flex h-full flex-col justify-center rounded-2xl border border-border bg-bg-card p-5 sm:p-6">
                  <p className="font-display text-2xl font-bold text-gold sm:text-3xl">
                    {c.figure}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                    {c.label}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Why NinA */}
      <Section
        variant="alt"
        title={
          <>
            No lock-in, you own the IP, and a team that{" "}
            <Em>builds what it preaches</Em>.
          </>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {USPS.map((u, idx) => (
            <Reveal key={u.title} delay={idx * 0.08} className="h-full">
              <GlowCard className="h-full rounded-2xl border border-border bg-bg-card p-7 hover:border-primary/40">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <u.Icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {u.text}
                    </p>
                    {"pin" in u && (
                      <span className="mt-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                        {u.pin}
                      </span>
                    )}
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Review */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          <figure className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_20px_60px_rgba(42,33,48,0.12)]">
              <Image
                src="/images/foto-da-drogist.webp"
                alt="The DA Drogist team after the NinA AI workshop"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text backdrop-blur">
                Workshop at DA Drogist
              </span>
            </div>
            <div>
              <blockquote className="font-display text-2xl font-medium leading-snug sm:text-3xl">
                &ldquo;You could feel the energy. Our whole team walked out
                with concrete ideas we started using that same week.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-text-muted">
                <span className="font-semibold text-text">
                  Judi van den Berg
                </span>{" "}
                · Category Manager, DA Drogist
              </figcaption>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold">
                Sessions rated 9.3
              </p>
            </div>
          </figure>
        </Reveal>
      </section>

      {/* Olaf, personal brand (static EN variant of OlafCard) */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-card">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(165,98,161,0.18),transparent_65%)]"
            />
            <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  From the founder
                </p>
                <h3 className="font-display mt-3 max-w-md text-2xl font-bold leading-tight sm:text-3xl">
                  Daily AI insights from Olaf Lemmens
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
                  Daily posts on AI, automation and agents on LinkedIn, with a
                  reach of 2.9 million. Practical, clear and directly
                  applicable. Nominated as AI Person of the Year.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "Practical AI insights",
                    "Smarter automation",
                    "Less hype, more application",
                  ].map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-border bg-bg px-4 py-1.5 text-sm text-text"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href={site.linkedinOlaf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
                  >
                    Follow Olaf Lemmens on LinkedIn
                  </a>
                  <span className="text-sm text-text-muted">
                    Olaf Lemmens · Founder NinA AI
                  </span>
                </div>
              </div>
              <div className="relative -mb-8 hidden min-h-80 sm:-mb-10 lg:block">
                <Image
                  src="/images/olaf-cutout.webp"
                  alt="Olaf Lemmens, founder of NinA AI Agency"
                  fill
                  sizes="(min-width: 1024px) 380px, 0px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,68,121,0.09),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s take the first step together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Book a free 15-minute intro call, or request a keynote or
              workshop right away.
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
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
              <li>
                <span className="font-semibold text-text">160+</span>{" "}
                organizations
              </li>
              <li>
                Sessions rated{" "}
                <span className="font-semibold text-text">9.3</span>
              </li>
              <li>
                Based in{" "}
                <span className="font-semibold text-text">Amsterdam</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
