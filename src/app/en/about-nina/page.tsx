import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About NinA AI",
  description:
    "NinA AI Agency helps organizations go from AI knowledge to working AI agents. Practical over hype, human plus machine.",
  alternates: { canonical: "/en/about-nina" },
};

const VALUES = [
  {
    title: "Practical over hype",
    text: "No AI for show. Every application has to deliver something: time, money or less grunt work, made measurable.",
  },
  {
    title: "Human + machine",
    text: "AI makes people more productive, it doesn't replace them. Human in the loop is a design principle for us, not a footnote.",
  },
  {
    title: "Accessible AI",
    text: "Working AI shouldn't just be for tech giants. We make it attainable for SMEs and the mid-market.",
  },
  {
    title: "Transparent and responsible",
    text: "Privacy and security first. EU hosting in Amsterdam, the client owns the IP, no lock-in.",
  },
];

const ROLES = ["Strategists", "Prompt engineers", "AI developers", "Consultants"];

export default function AboutNinaEn() {
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
              About NinA AI Agency
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              The bridge from AI knowledge <Em>to application</Em>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Too many Dutch companies are falling behind in the AI
              revolution. Not because they don&apos;t want to, but because AI
              seems complex, expensive and inaccessible. We&apos;re doing
              something about that, with the ambition to become the biggest
              AI agency in the Netherlands.
            </p>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        kicker="Our mission"
        title={
          <>
            From AI knowledge to <Em>working AI agents</Em>.
          </>
        }
        sub="NinA AI Agency helps organizations go from AI knowledge to working AI agents. From Amsterdam, since 2024. Founded by Olaf Lemmens, who noticed during his keynotes that organizations are eager to innovate with AI but lack the tools to get started. We build that bridge from knowledge to application every day."
      />

      <Section
        title={
          <>
            Four principles that guide <Em>every project</Em>.
          </>
        }
      >
        <div className="grid gap-x-14 sm:grid-cols-2">
          {VALUES.map((w, idx) => (
            <Reveal key={w.title} delay={idx * 0.08}>
              <div className="border-t border-border py-6">
                <h3 className="font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                  {w.text}
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
            Ten specialists who make AI <Em>actually work</Em>.
          </>
        }
        sub="In house: strategists, prompt engineers, AI developers and consultants, plus a flexible shell of partners. Together we know 100+ AI tools, and what emerges in a session is something we can actually build afterwards."
      >
        <Reveal>
          <Image
            src="/images/foto-team.webp"
            alt="The NinA team during a team outing in an arcade"
            width={1200}
            height={800}
            className="mb-10 w-full rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(42,33,48,0.12)]"
          />
        </Reveal>
        <ul className="flex flex-wrap gap-2.5">
          {ROLES.map((r) => (
            <li
              key={r}
              className="rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted"
            >
              {r}
            </li>
          ))}
          <li className="rounded-full border border-primary/50 bg-bg-muted px-4 py-1.5 text-sm text-primary">
            + flexible shell and partners
          </li>
        </ul>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-bg-card p-7 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <Image
                src="/images/olaf-profile.webp"
                alt="Olaf Lemmens"
                width={64}
                height={64}
                className="hidden shrink-0 rounded-full border border-border sm:block"
              />
              <div>
                <h3 className="font-display text-lg font-bold">
                  Daily AI insights from Olaf Lemmens
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
                  As founder of NinA AI Agency, Olaf shares practical AI
                  insights on LinkedIn every day, with a reach of 2.9
                  million. Nominated as AI Person of the Year.
                </p>
              </div>
            </div>
            <div className="mt-5 flex shrink-0 flex-col gap-3 sm:mt-0">
              <MagneticButton href={site.linkedinOlaf} variant="ghost">
                Follow on LinkedIn
              </MagneticButton>
              <MagneticButton href={site.newsletter} variant="ghost">
                AI newsletter
              </MagneticButton>
            </div>
          </div>
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
              Come have coffee in Amsterdam.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
              Or book a 15-minute video call. We&apos;re happy to think along,
              even if it&apos;s not a project yet.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/en/contact">
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
