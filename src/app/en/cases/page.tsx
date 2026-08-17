import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Proven AI results from SME to mid-market: concrete AI solutions that directly impact efficiency, costs and quality.",
  alternates: alternatesVoor("/en/cases"),
};

type Case = {
  tag: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
};

const cases: Case[] = [
  {
    tag: "AI Build",
    company: "Wens Chalets",
    industry: "Hospitality",
    challenge:
      "Lots of manual administration, repetitive guest communication, fragmented systems for bookings and reporting.",
    solution:
      "AI workflows for administration, automated reporting and smart guest communication through connected systems.",
    results: [
      "40+ hours per month saved on administration",
      "60% faster response time to guests",
      "Better insight into data and trends",
    ],
  },
  {
    tag: "AI Agents",
    company: "MKB Consultancy",
    industry: "Professional Services",
    challenge:
      "Knowledge workers spent too much time on repetitive reporting and manual data entry across multiple systems.",
    solution:
      "Custom AI agent for document processing, reporting automation and data extraction from various sources.",
    results: [
      "55% time savings on reporting",
      "90% fewer errors in data entry",
      "More focus on strategic work",
    ],
  },
  {
    tag: "AI Agents + N8N",
    company: "E-commerce Retailer",
    industry: "Retail",
    challenge:
      "High volumes of customer questions, long response times, limited service hours, inconsistent team answers.",
    solution:
      "AI service agent connected to CRM and knowledge base via N8N for automated, intelligent customer service.",
    results: [
      "24/7 support available",
      "70% faster response time",
      "45% fewer support tickets",
      "Higher customer satisfaction",
    ],
  },
  {
    tag: "AI Build + N8N",
    company: "Marketing Agency",
    industry: "Marketing",
    challenge:
      "Lots of repetitive copywriting work, time-consuming content planning, manual client reporting.",
    solution:
      "AI content assistant, automated planning workflows and smart reporting dashboard via N8N integrations.",
    results: [
      "50% faster content production",
      "30 hours per month saved on reporting",
      "Higher content quality",
    ],
  },
  {
    tag: "AI Agents",
    company: "HR Consultancy",
    industry: "HR",
    challenge:
      "Lots of time spent screening CVs, scheduling interviews, and preparing candidate reports.",
    solution:
      "AI screening agent for CV analysis, automatic interview scheduling and generated candidate summaries.",
    results: [
      "65% faster screening process",
      "Better candidate matching",
      "More time for personal contact",
    ],
  },
  {
    tag: "AI Build",
    company: "Financial Advisory",
    industry: "Financial Services",
    challenge:
      "Complex regulations, lots of document processing, time-consuming compliance checks and reporting requirements.",
    solution:
      "AI document processing, automated compliance checking and regulatory reporting systems.",
    results: [
      "40% faster document processing",
      "95% compliance accuracy",
      "Drastically less manual work",
    ],
  },
];

export default function CasesPageEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Cases
            </p>
            <h1 className="display-serif mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              Proven <Em>AI results</Em>.
            </h1>
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              names only with permission
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              From SME to mid-market: concrete AI solutions that directly
              impact efficiency, costs and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Case grid */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.company} delay={Math.min(i % 2, 1) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                    {c.tag}
                  </p>
                  <h2 className="display-serif mt-2 text-2xl leading-snug">
                    {c.company}
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">{c.industry}</p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Challenge
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {c.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                        Solution
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {c.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                      Result
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {c.results.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-sm leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <h2 className="display-serif mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl">
              Ready for <Em>similar results</Em>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Every AI project starts with a good conversation about your
              challenges and ambitions.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={site.booking}>
                Book an intro call
              </MagneticButton>
              <MagneticButton href="/en/ai-partnership" variant="ghost">
                Explore the AI Partnership
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
