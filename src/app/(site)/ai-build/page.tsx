import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Section, { Em } from "@/components/ui/Section";
import WorkflowCompare from "@/components/sections/WorkflowCompare";
import CtaSection from "@/components/sections/CtaSection";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: alternatesVoor("/ai-build"),
  title: "AI Build",
  description:
    "Automatiseringen, agents en producten op maat. Van procesoptimalisatie tot vibe-code naar product. Werkende workflows in je eigen omgeving.",
};

export default function AiBuild() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal-now">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              AI Build
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Wij leveren werkende workflows,{" "}
              <Em>geen rapporten in een la</Em>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Automatiseringen, agents en producten op maat. Onze developers
              bouwen in jouw eigen omgeving, zonder lock-in. Projecten vanaf
              EUR 5.200, development EUR 130 per uur.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href={site.booking}>Plan een kennismaking</MagneticButton>
            </div>
          </div>
          <div className="reveal-now hidden [animation-delay:0.2s] lg:block">
            <Image
              src="/images/foto-build.webp"
              alt="Live demo van een n8n-workflow tijdens een NinA sessie"
              width={900}
              height={675}
              className="rounded-3xl border border-border object-cover shadow-[0_20px_60px_rgba(12,14,24,0.12)]"
            />
          </div>
          </div>
        </div>
      </section>

      <Section
        variant="alt"
        title={
          <>
            Procesoptimalisatie of <Em>vibe-code naar product</Em>.
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <h2 className="font-display text-xl font-bold">
                Procesoptimalisatie
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Oud
                  </p>
                  <p className="mt-1 text-sm">Handmatig, foutgevoelig</p>
                </div>
                <div className="rounded-xl border border-primary/50 bg-bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Nieuw
                  </p>
                  <p className="mt-1 text-sm">Werkende workflow of agent</p>
                </div>
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-text-muted">
                <span className="font-semibold text-gold">
                  12 uur per week
                </span>{" "}
                bespaard op factuurverwerking. Order-intake, mail- en
                voice-agents volgen hetzelfde patroon.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-card p-7">
              <h2 className="font-display text-xl font-bold">
                Vibe-code naar product
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-border bg-bg-alt p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Jouw start
                  </p>
                  <p className="mt-1 text-sm">Zelfgebouwd prototype</p>
                </div>
                <div className="rounded-xl border border-primary/50 bg-bg-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    NinA bouwt
                  </p>
                  <p className="mt-1 text-sm">Veilig, schaalbaar product</p>
                </div>
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-text-muted">
                Van prototype naar product,{" "}
                <span className="font-semibold text-gold">
                  EUR 20k tot 65k+
                </span>
                . Voorbeelden: Grand Relocation, Micoll Safety Navigator.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-5 rounded-2xl border border-border bg-bg-card p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Waar de agent zit
            </p>
            <div className="mt-5 flex flex-col items-stretch gap-3 text-center sm:flex-row sm:items-center">
              <div className="flex-1 rounded-xl border border-border bg-bg-alt p-4 text-sm">
                Jouw systemen en data
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
                Jouw team
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-text-muted">
              EU-hosting, Amsterdam. Onze developers bouwen in jouw eigen
              omgeving, geen lock-in.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        title={
          <>
            Scroll en zie wat een build <Em>met een proces doet</Em>.
          </>
        }
      >
        <WorkflowCompare />
      </Section>

      <Section
        variant="alt"
        kicker="Werkwijze"
        title={
          <>
            Test and learn: <Em>sprints van twee weken</Em>.
          </>
        }
        sub="We bouwen in korte sprints van 30 tot 50 uur per maand, met een dedicated AI-team. Elke sprint levert iets werkends op dat je team direct gebruikt. Human in the loop waar dat hoort."
      />

      <CtaSection
        title="Welk proces bouwen we als eerste om?"
        sub="Plan een kennismaking. We rekenen samen uit wat een build oplevert, in uren en euro's."
      />
    </>
  );
}
