import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const CHIPS = [
  "Praktische AI-inzichten",
  "Slimmere automatisering",
  "Minder hype, meer toepassing",
];

type Props = {
  kicker?: string;
  title?: string;
  tekst?: string;
};

/**
 * Personal-brand blok in de stijl van de vaste carousel-CTA-slide:
 * boodschap en chips links, Olaf-cutout rechts op een zachte gradient.
 */
export default function OlafCard({
  kicker = "Van de oprichter",
  title = "Dagelijkse AI-inzichten van Olaf Lemmens",
  tekst = "Dagelijks over AI, automatisering en agents op LinkedIn. Praktisch, helder en direct toepasbaar. Genomineerd als AI Person of the Year.",
}: Props) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-card">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(165,98,161,0.18),transparent_65%)]"
        />
        <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {kicker}
            </p>
            <h3 className="font-display mt-3 max-w-md text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
              {tekst}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
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
                Volg Olaf Lemmens op LinkedIn
              </a>
              <span className="text-sm text-text-muted">
                Olaf Lemmens · Founder NinA AI
              </span>
            </div>
          </div>
          <div className="relative -mb-8 hidden min-h-80 sm:-mb-10 lg:block">
            <Image
              src="/images/olaf-cutout.webp"
              alt="Olaf Lemmens, oprichter van NinA AI Agency"
              fill
              sizes="(min-width: 1024px) 380px, 0px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
