import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type Props = {
  title?: string;
  sub?: string;
};

export default function CtaSection({
  title = "Zet samen de eerste stap.",
  sub = "Plan een vrijblijvend kennismakingsgesprek van 15 minuten, of vraag direct een lezing of workshop aan.",
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(97,68,121,0.09),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted sm:text-lg">
            {sub}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href={site.booking}
              data-cta="slot_kennismaking"
              data-cta-soort="slot"
            >
              Plan een kennismaking
            </MagneticButton>
            <MagneticButton
              href={`mailto:${site.email}`}
              variant="ghost"
              data-cta="slot_mail"
              data-cta-soort="slot"
            >
              Mail {site.email}
            </MagneticButton>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Vrijblijvend, binnen 24 uur reactie.
          </p>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
            <li>
              <span className="font-semibold text-text">160+</span>{" "}
              organisaties
            </li>
            <li>
              Sessies beoordeeld met een{" "}
              <span className="font-semibold text-text">9,3</span>
            </li>
            <li>
              Gevestigd in{" "}
              <span className="font-semibold text-text">Amsterdam</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
