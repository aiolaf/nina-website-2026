import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Knowledge",
  description:
    "Insights on AI implementations, new developments and practical AI tips, 3 to 5 times a week. Subscribe on Substack or read the blog.",
  alternates: alternatesVoor("/en/ai-knowledge"),
};

export default function AiKnowledgePageEn() {
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
              AI Knowledge
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Practical <Em>AI insights</Em>, 3 to 5 times a week.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Receive insights on AI implementations, new developments and
              practical AI tips? Subscribe to Olaf Lemmens&apos; Substack, or
              dive into the articles on the blog. Note: the newsletter is
              written in Dutch.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={site.newsletter}>
                Subscribe on Substack
              </MagneticButton>
              <MagneticButton href="/en/blog" variant="ghost">
                Read the blog
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Two channels */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Newsletter · Substack
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold">
                  This week in AI
                </h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  In your inbox 3 to 5 times a week: what happened in AI this
                  week, new tools tested in practice and step-by-step
                  tutorials, from building your own Chrome extensions to a
                  free AI intern that does your research every morning.
                </p>
                <div className="mt-auto pt-6">
                  <MagneticButton href={site.newsletter}>
                    Subscribe on Substack
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Blog
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold">
                  Honest stories from AI practice
                </h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  No hype, just what works: longer articles on AI agents,
                  automation and organizations that make AI actually pay off.
                  Written from real implementation practice at Dutch
                  companies.
                </p>
                <div className="mt-auto pt-6">
                  <MagneticButton href="/en/blog" variant="ghost">
                    View all articles
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-24">
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Prefer AI knowledge <Em>for your whole team</Em>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Check out the hands-on workshops or book an intro call to
              discuss AI in your organization.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/en/workshops">
                View the workshops
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
