import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Kennis",
  description:
    "Drie tot vijf keer per week inzichten over AI-implementaties, nieuwe ontwikkelingen en praktische AI tips. Abonneer op de Substack of lees de blog.",
  alternates: alternatesVoor("/ai-kennis"),
};

export default function AiKennisPage() {
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
              AI Kennis
            </p>
            <h1 className="display-serif mt-3 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              Drie tot vijf keer per week <Em>praktische AI-inzichten</Em>.
            </h1>
            <p className="annotatie mt-4 text-[19px] sm:text-[21px]">
              begin bij de basis
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Inzichten over AI-implementaties, nieuwe ontwikkelingen en
              praktische AI-tips ontvangen? Abonneer op de Substack van Olaf
              Lemmens, of lees de artikelen op de blog.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={site.newsletter}>
                Abonneer op Substack
              </MagneticButton>
              <MagneticButton href="/blog" variant="ghost">
                Lees de blog
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Twee kanalen */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[3px] border border-border bg-bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Nieuwsbrief · Substack
                </p>
                <h2 className="display-serif mt-2 text-2xl ">
                  Dit was de week in AI
                </h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  Drie tot vijf keer per week in je inbox: wat er deze week
                  gebeurde in AI, nieuwe tools getest in de praktijk en
                  stap-voor-stap tutorials, van je eigen Chrome-extensies
                  bouwen tot een gratis AI-stagiair die elke ochtend research
                  voor je doet.
                </p>
                <div className="mt-auto pt-6">
                  <MagneticButton href={site.newsletter}>
                    Abonneer op Substack
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[3px] border border-border bg-bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Blog
                </p>
                <h2 className="display-serif mt-2 text-2xl ">
                  Eerlijke verhalen uit de AI-praktijk
                </h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  Geen hype, wel wat werkt: langere artikelen over AI-agents,
                  automatisering en organisaties die AI echt laten renderen.
                  Geschreven vanuit de implementatiepraktijk bij Nederlandse
                  bedrijven.
                </p>
                <div className="mt-auto pt-6">
                  <MagneticButton href="/blog" variant="ghost">
                    Bekijk alle artikelen
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
            <h2 className="display-serif mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl">
              Liever AI-kennis <Em>voor je hele team</Em>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
              Bekijk de hands-on workshops of plan een kennismaking om te
              sparren over AI in jouw organisatie.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/workshops">
                Bekijk de workshops
              </MagneticButton>
              <MagneticButton href={site.booking} variant="ghost">
                Plan een kennismaking
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
