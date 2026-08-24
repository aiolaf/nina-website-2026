import Reveal from "@/components/ui/Reveal";
import PijlKnop from "@/components/ui/PijlKnop";
import { KlantLogoRijDonker } from "@/components/ui/KlantLogoRij";
import { site } from "@/lib/site";

type Props = {
  label?: string;
  title?: React.ReactNode;
  sub?: string;
};

/**
 * De donkere merk-sectie: het NinA-moment van de pagina. Inkt-achtergrond,
 * een violette gloed achter de kop en een lichte pill-CTA.
 *
 * Harde regel uit de huisstijl: maximaal één donkere sectie per pagina, en
 * dit is hem. Staat er elders op de pagina nog een violet accent, haal dat
 * dan weg in plaats van dit blok te verplaatsen.
 */
export default function CtaDonker({
  label = "AI PARTNERSHIP",
  title = (
    <>
      Binnen een week <em className="italic text-violet-light">aan tafel</em>.
    </>
  ),
  sub = "Een kennismaking van 15 minuten. Daarna weet je of een vaste AI-partner past bij waar jullie nu staan.",
}: Props) {
  return (
    <section className="px-5 pb-16 pt-4 sm:pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[4px] bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-36 left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-violet/25 blur-[90px]"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="label-mono text-[11.5px] text-[#a6a6a6]">{label}</p>
            <h2 className="display-serif mt-5 text-[2.3rem] text-[#f2f2f2] sm:text-[3.1rem]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[#a6a6a6]">{sub}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PijlKnop
                href={site.booking}
                variant="licht"
                data-cta="slot_kennismaking"
                data-cta-soort="slot"
              >
                Plan een kennismaking
              </PijlKnop>
              <a
                href={`mailto:${site.email}`}
                data-cta="slot_mail"
                data-cta-soort="slot"
                className="font-mono text-[13px] text-[#a6a6a6] underline decoration-[#a6a6a6]/40 underline-offset-4 transition-colors hover:text-[#f2f2f2] hover:decoration-[#f2f2f2]"
              >
                {site.email}
              </a>
            </div>
            <ul className="label-mono mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-[#a6a6a6]">
              <li>160+ organisaties</li>
              <li>Sessies met een 9,3</li>
              <li>Amsterdam</li>
            </ul>
          </div>

          {/* Logo's op donker: de witvarianten, zonder tegels. Een kleurlogo
              mag hier nooit, dus merken zonder witvariant staan er niet in.
              Spec: docs/klant-logo-rij.md. */}
          <div className="relative mt-14 border-t border-white/10 pt-10">
            <KlantLogoRijDonker />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
