import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import LogoMarquee from "@/components/ui/LogoMarquee";
import CountUp from "@/components/ui/CountUp";
import IjkpuntLijn from "@/components/ui/IjkpuntLijn";
import PartnershipTiers from "@/components/sections/PartnershipTiers";
import TokenMenukaart from "@/components/sections/TokenMenukaart";
import SavingsChart from "@/components/sections/SavingsChart";
import MaturityScan from "@/components/sections/MaturityScan";
import MobielCTA from "@/components/layout/MobielCTA";
import { alternatesVoor, site } from "@/lib/site";

const MODEL = "AI Partnership";

export const metadata: Metadata = {
  title: MODEL,
  description:
    "We audit your business, find the processes where work piles up and shut them down. Fixed capacity in tokens per month, on a yearly basis. From EUR 3,900 per month.",
  alternates: alternatesVoor("/en/ai-partnership"),
};

const FIRES = [
  "Two people know how to write that report. Everyone else shadows them for a week.",
  "Requests come in by email and get retyped by hand.",
  "Customer service searches manuals nobody keeps current.",
  "Every Monday a day disappears into reports nobody reads.",
  "One department structurally works into the evening. That gets called being busy.",
  "For the hard questions: ask Pete. And Pete goes on holiday.",
];

const PROCESSES = [
  {
    name: "Documents from expert knowledge",
    pain: "The knowledge to write a grant application or advisory report sits in two heads.",
    build:
      "We capture that knowledge with hundreds of examples of earlier work, and generate documents in your own standard.",
    figure: "90%",
    figureLabel: "fewer data entry errors",
  },
  {
    name: "Requests into ERP or CRM",
    pain: "Something arrives by email or form and someone retypes it into another system.",
    build:
      "The incoming flow gets read, filtered and placed in your own systems. A human approves.",
    figure: "192 hours",
    figureLabel: "back per month at Van Berkel Professionals",
  },
  {
    name: "Customer service and tickets",
    pain: "High volumes, questions that keep returning, and the hard cases go to that one person.",
    build:
      "Recurring questions get handled. If the AI cannot, a human answers and that answer goes into the database. Next time it happens automatically.",
    figure: "45%",
    figureLabel: "fewer support tickets",
  },
];

const GUARANTEES = [
  {
    title: "There is always a human in it",
    text: "We do not build a single workflow that is purely AI. At minimum a human as the final check. The automation removes the looking up and retyping, not the craft.",
  },
  {
    title: "Your data stays in the Netherlands",
    text: "Own infrastructure, servers in Amsterdam, fully GDPR-compliant and compatible with ISO 27001 and NEN 7510. Optionally Azure OpenAI for extra safeguards.",
  },
  {
    title: "No lock-in, you own the IP",
    text: "Everything runs in your own environment and stays yours. If the partnership ends, you can carry on independently.",
  },
];

const IS = [
  "Fixed capacity per month, to spend wherever it pays off most",
  "A team that knows your processes, so no ramp-up time per question",
  "Quarterly review: what did it deliver, what is top of the list now",
  "Training for your own people, so the dependency shrinks",
];

const IS_NOT = [
  "Not a support subscription and not a helpdesk",
  "Not staffing by the hour",
  "Not a software licence we also sell to a hundred others",
  "Not a one-off workshop. If that is all you want, we have talks and workshops",
];

const STEPS = [
  {
    step: "01",
    name: "Kickoff",
    text: "A day on-site through your processes, plus a workshop with your core team. You get a prioritized list of what each bottleneck costs.",
  },
  {
    step: "02",
    name: "Build",
    text: "Capacity every month to work down that list, from the top.",
  },
  {
    step: "03",
    name: "Scale",
    text: "What works for one team, we roll out to the rest.",
  },
  {
    step: "04",
    name: "Embed",
    text: "Your own people take it over. The goal is an organization that can do it itself.",
  },
];

const MILESTONES = [
  { maand: "Month 1", naam: "Foundation" },
  { maand: "Month 3", naam: "Workshop" },
  { maand: "Month 6", naam: "Half-year review" },
  { maand: "Month 9", naam: "Follow-up workshop" },
  { maand: "Month 12", naam: "Next year's roadmap" },
];

const FOR_YOU = [
  "You are growing, roughly 30 employees or more, ideally heading toward 100",
  "The question is not how to shed people, but how to hit the revenue target without hiring ten more",
  "There are several systems that ought to talk to each other and do not",
];

const NOT_FOR_YOU = [
  "You want one standalone workshop. We have those, without a partnership",
  "Off-the-shelf software solves your problem. Buy that, it is faster and cheaper",
  "You want to keep it at a pilot and look again next year",
];

const NEXT_STEPS = [
  {
    step: "01",
    title: "One conversation, one hour",
    text: "What is going on, and where the bottlenecks in your processes sit.",
  },
  {
    step: "02",
    title: "Proposal within two working days",
    text: "Prioritized list and business case: what it costs, what it delivers.",
  },
  {
    step: "03",
    title: "One follow-up conversation",
    text: "In which we decide. Yes or no, not a six-week process.",
  },
];

function Check() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">
      ✓
    </span>
  );
}

function Dash() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-px w-3 shrink-0 bg-text-muted/60"
    />
  );
}

export default function AiPartnershipEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(97,68,121,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div className="reveal-now">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The {MODEL}
              </p>
              <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                Every euro you put into AI has to bring{" "}
                <Em>more than one back out</Em>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Everyone has AI on the agenda, almost nobody knows where to
                start. We audit your business, find the processes where the work
                piles up, and shut them down.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href={site.booking}>
                  Book an intro call
                </MagneticButton>
                <MagneticButton href="#packages" variant="ghost">
                  What it costs
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                One conversation of an hour. Proposal with a business case
                within two working days.
              </p>
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

          <Reveal delay={0.15}>
            <dl className="mt-14 grid gap-6 border-y border-border py-8 sm:grid-cols-3">
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={192} suffix=" hours" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  saved per month at Van Berkel Professionals
                </dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={100} suffix="+" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  requests a day processed automatically
                </dt>
              </div>
              <div>
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <CountUp to={160} suffix="+" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">
                  organizations helped, sessions rated 9.3
                </dt>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-14">
          <LogoMarquee />
        </div>
      </section>

      {/* Recognition */}
      <Section
        variant="alt"
        title={
          <>
            Every business has <Em>small fires</Em>.
          </>
        }
        sub="Places where the work piles up. Not spectacular, but back again every week."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FIRES.map((f, idx) => (
            <li key={f} className="h-full">
              <Reveal
                delay={idx * 0.05}
                className="h-full rounded-xl border border-border bg-bg-card p-4 text-sm leading-snug transition-colors hover:border-primary/50"
              >
                {f}
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg text-text-muted">
            Not IT problems. Processes that have been done by hand for too long.
            AI is the means, never the goal.
          </p>
        </Reveal>
      </Section>

      {/* Baseline and target: the start and end point of the partnership */}
      <Section
        kicker="Baseline and target"
        title={
          <>
            First know where you stand. Then <Em>where you are going</Em>.
          </>
        }
        sub="During the Kickoff we measure your AI maturity across seven dimensions. That gives you one picture with a starting point and a target: where the organisation stands now, and where it needs to be twelve months from now. We measure again every quarter, so you can see whether it works."
      >
        <MaturityScan lang="en" />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-sm text-text-muted">
            The profile above is a representative example, not a client figure.
            Your own baseline comes out of the Kickoff, together with the
            prioritized list we start the year with.
          </p>
        </Reveal>
      </Section>

      {/* Three processes */}
      <Section
        title={
          <>
            Three processes where we do this <Em>most often</Em>.
          </>
        }
        sub="Not because we cannot do anything else, but because we have built the most here and therefore get to a result fastest."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PROCESSES.map((p, idx) => (
            <Reveal key={p.name} delay={idx * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {p.pain}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed">{p.build}</p>
                <p className="mt-5 border-t border-border pt-4">
                  <span className="font-display text-2xl font-bold text-gold">
                    {p.figure}
                  </span>
                  <span className="ml-2 text-sm text-text-muted">
                    {p.figureLabel}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal delay={0.1}>
            <SavingsChart />
          </Reveal>
          <Reveal delay={0.15}>
            <Image
              src="/images/foto-build.webp"
              alt="Live demo of an n8n workflow during a NinA session"
              width={900}
              height={600}
              className="h-full w-full rounded-2xl border border-border object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* The three questions every board asks */}
      <Section
        variant="alt"
        title={
          <>
            People, data and <Em>ownership</Em>.
          </>
        }
        sub="The three questions every board asks, before the business case even comes up."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {GUARANTEES.map((g, idx) => (
            <Reveal key={g.title} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6">
                <h3 className="font-display text-lg font-bold">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {g.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What it is and is not */}
      <Section
        title={
          <>
            What you <Em>actually get</Em>.
          </>
        }
        sub="The way you have an accountant and an IT partner, that is how we have set up AI. One familiar face, fixed capacity per month, and someone who already knows your business when you call."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">What it is</h3>
              <ul className="mt-5 space-y-3">
                {IS.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Check />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-alt p-7">
              <h3 className="font-display text-lg font-bold">What it is not</h3>
              <ul className="mt-5 flex-1 space-y-3">
                {IS_NOT.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <Dash />
                    {n}
                  </li>
                ))}
              </ul>
              <Link
                href="/en/workshops"
                className="mt-5 inline-block border-t border-border pt-4 text-sm font-semibold text-primary hover:underline"
              >
                View talks and workshops
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Kickoff and the year */}
      <Section
        variant="alt"
        title={
          <>
            It starts with the <Em>Kickoff</Em>, then a year.
          </>
        }
        sub="An audit of your organization: where does the work pile up, what is solving it worth, in what order. Then we build."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((t, idx) => (
            <li key={t.name} className="h-full">
              <Reveal
                delay={idx * 0.08}
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

        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            <div className="bg-bg-card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold">
                  Kickoff Phase
                </h3>
                <p className="font-display text-xl font-bold text-gold">
                  EUR 7,500
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                3 weeks. A full day of on-site process analysis, core team
                workshop, n8n environment, roadmap with business cases and a
                baseline of your AI maturity. Mandatory with Standard and
                Enterprise.
              </p>
            </div>
            <div className="bg-bg-card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold">
                  Kickoff Phase Light
                </h3>
                <p className="font-display text-xl font-bold">EUR 3,750</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                2 weeks. Core team workshop with the AI Readiness as the end
                product, n8n environment and roadmap. No separate scan days.
                Mandatory with Light.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-lg">
            After that we work on a yearly basis. Developing an organization
            takes a year, and one workshop is not a workshop.
          </p>
          <p className="mt-3 max-w-2xl text-text-muted">
            So the rhythm is set before the year starts. Target: from the
            baseline to 4 out of 5 AI maturity within twelve months.
          </p>
        </Reveal>

        <div className="mt-8">
          <IjkpuntLijn
            items={MILESTONES}
            label="Five milestones in twelve months"
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-text-muted">
            Would you rather work per project? That is possible too. Just say so
            and we will do it that way.
          </p>
        </Reveal>
      </Section>

      {/* Packages and tokens */}
      <Section
        id="packages"
        kicker="What it costs"
        title={
          <>
            Three levels, <Em>one unit of account</Em>.
          </>
        }
        sub="You are not buying hours, you are buying tokens: a fixed number per month, to spend month after month wherever it pays off most. All amounts exclude VAT."
      >
        <PartnershipTiers lang="en" />
        <div className="mt-14">
          <TokenMenukaart lang="en" />
        </div>
      </Section>

      {/* Who this is for */}
      <Section
        variant="alt"
        title={
          <>
            Who this <Em>works for</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-primary/50 bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                This is about you if
              </h3>
              <ul className="mt-5 space-y-3">
                {FOR_YOU.map((v) => (
                  <li
                    key={v}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Check />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-bg-card p-7">
              <h3 className="font-display text-lg font-bold">
                Not for you if
              </h3>
              <ul className="mt-5 space-y-3">
                {NOT_FOR_YOU.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <Dash />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed">
                Custom is the right call when you need to connect systems that
                know nothing about each other, your knowledge is too valuable
                for a SaaS platform, or you tried a SaaS product that does not
                do what you need.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Closing */}
      <section id="afsluiter" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,68,121,0.09),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 sm:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Two questions to start with.
            </h2>
            <div className="mt-8 space-y-4">
              <p className="font-display border-l-2 border-primary pl-5 text-xl leading-snug sm:text-2xl">
                What is coming up for you over the next year?
              </p>
              <p className="font-display border-l-2 border-primary pl-5 text-xl leading-snug sm:text-2xl">
                How have you seen AI change over the past year?
              </p>
            </div>
            <p className="mt-6 text-text-muted">
              Answer that second question honestly and you know why a year is
              short.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-5 sm:grid-cols-3">
            {NEXT_STEPS.map((s, idx) => (
              <li key={s.step} className="h-full">
                <Reveal
                  delay={idx * 0.08}
                  className="relative h-full rounded-2xl border border-border bg-bg-card p-6 pt-8"
                >
                  <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/50 bg-bg px-3 py-1 text-sm font-bold text-primary">
                    {s.step}
                  </span>
                  <h3 className="font-display text-base font-bold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {s.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>
                Book an intro call
              </MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                Email {site.email}
              </MagneticButton>
            </div>
            <p className="mt-6 text-sm">
              <Link
                href="/en/cases"
                className="group inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                data-cta="partnership_naar_cases"
              >
                Rather see the results first? Read the client cases
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-sm text-text-muted">
              <li>
                <span className="font-semibold text-text">160+</span>{" "}
                organizations
              </li>
              <li>
                Rated <span className="font-semibold text-text">9.3</span>
              </li>
              <li>
                <span className="font-semibold text-text">Amsterdam</span>, EU
                hosting
              </li>
              <li>
                <span className="font-semibold text-text">Your own IP</span>, no
                lock-in
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <MobielCTA
        label="Book intro call"
        href={site.booking}
        sub="15 minutes, no strings"
        meting="partnership_balk_en"
        verbergBij="#afsluiter"
      />
    </>
  );
}
