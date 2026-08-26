import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { REVIEWS } from "@/content/reviews";
import { bewijs } from "@/lib/site";

/**
 * Quotes van deelnemers. Staat er nog niets in content/reviews.ts, dan
 * rendert dit blok niets: een lege sectie met "binnenkort reviews" is
 * slechter voor het vertrouwen dan geen sectie.
 *
 * `workshop` filtert op één workshop, voor de detailpagina.
 */
export default function Reviews({ workshop }: { workshop?: string }) {
  const lijst = workshop
    ? REVIEWS.filter((r) => r.workshop === workshop)
    : REVIEWS;

  if (lijst.length === 0) return null;

  return (
    <Section
      kicker={`Beoordeeld met een ${bewijs.cijfer}`}
      title={
        <>
          Wat deelnemers <Em>meenamen</Em>.
        </>
      }
      variant="alt"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lijst.slice(0, 6).map((r, i) => (
          <Reveal key={r.quote} delay={i * 0.06}>
            <figure className="kaart flex h-full flex-col border border-border bg-bg-card p-7">
              <blockquote className="display-serif text-[1.35rem] leading-snug">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-6 text-sm text-text-muted">
                <span className="font-semibold text-ink">{r.naam}</span>
                <span className="block">
                  {r.functie}
                  {r.bedrijf ? ` · ${r.bedrijf}` : ""}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
