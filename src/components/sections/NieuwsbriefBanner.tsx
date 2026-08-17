/**
 * Inschrijfbanner voor de Substack-nieuwsbrief van Olaf, bovenaan de blog.
 *
 * Het formulier is de officiële Substack-embed in een iframe: inschrijven kan
 * dus op de pagina zelf, zonder doorklikken. Substack rendert dat frame in
 * hun eigen opmaak; daarom staat het in een NinA-glaskaart met onze kop
 * ernaast, zodat het blok in de huisstijl blijft.
 *
 * Let op: het iframe zet cookies van substack.com (ab_testing_id, __cf_bm).
 * Daarom loading="lazy", en de tekstlink eronder is het alternatief als een
 * bezoeker of een browser het frame blokkeert.
 */
export default function NieuwsbriefBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-12 sm:pb-16">
      <div className="glas grid gap-8 rounded-[24px] p-7 sm:p-10 lg:grid-cols-[1fr_minmax(300px,400px)] lg:items-center lg:gap-12">
        <div>
          <p className="label-mono text-[11px] text-text-muted">
            Nieuwsbrief · gratis
          </p>
          <h2 className="display-serif mt-4 text-[1.9rem] sm:text-[2.4rem]">
            Elke week wat werkt, <em className="italic">in je inbox</em>.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-muted">
            De artikelen hieronder komen uit de nieuwsbrief van Olaf. Eén mail
            per week over AI in de praktijk: wat werkt, wat niet, en wat je
            morgen kunt gebruiken. Uitschrijven met één klik.
          </p>
        </div>

        <div>
          {/* Officiële Substack-embed. Vaste hoogte: de inhoud van het frame
              is cross-origin, dus de hoogte kan niet meegroeien. */}
          <iframe
            src="https://olaflemmens.substack.com/embed"
            title="Inschrijven voor de nieuwsbrief van Olaf Lemmens"
            loading="lazy"
            scrolling="no"
            /* Op mobiel is het frame smaller, dus wikkelt de kleine letter
               van Substack over meer regels: daar iets meer hoogte. */
            className="h-[235px] w-full rounded-2xl border border-border bg-white sm:h-[190px]"
          />
          <p className="mt-3 text-[12.5px] text-text-muted">
            Werkt het formulier niet?{" "}
            <a
              href="https://olaflemmens.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-violet hover:decoration-violet"
              data-cta="nieuwsbrief_substack"
            >
              schrijf je in op Substack
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
