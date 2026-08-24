"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Meescrollende inschrijfbanner onder een blogartikel.
 *
 * Afwegingen, want een sticky blok kan een artikel snel onleesbaar maken:
 *
 * 1. Hij verschijnt pas na 700px scrollen, dus als de kop en de eerste
 *    alinea's voorbij zijn. Wie net begint te lezen ziet niets; de eerste
 *    indruk blijft het artikel zelf.
 * 2. Vanaf 1536px (2xl) staat hij rechtsonder in de lege marge naast de
 *    tekstkolom (max-w-3xl) met het formulier open: daar bedekt hij geen
 *    woord. Dat is gemeten: bij 1440px begint de kaart op 1076px terwijl de
 *    tekst tot 1064px loopt, dus daaronder is er geen ruimte en blijft het een
 *    ingeklapte hoekkaart van twee regels. Op mobiel een balk over de volle
 *    breedte. Het formulier komt daar pas open na een tik: het iframe van
 *    Substack is 190px hoog en dat is te veel om ongevraagd over een
 *    telefoonscherm te leggen.
 * 3. Zodra de volledige kaart onderaan het artikel in beeld komt, verdwijnt
 *    de meescrollende versie. Twee keer hetzelfde formulier in beeld is
 *    precies het irritante effect dat we willen vermijden.
 * 4. Wegklikken kan met een klein kruisje en wordt 60 dagen bewaard, dus wie
 *    hem wegklikt is hem op alle artikelen kwijt.
 * 5. Wie al is ingeschreven klikt hem weg; wie de banner negeert, houdt een
 *    balk van 52px. Daarom hangt de mobiele balk onder de inhoud met een
 *    veilige onderrand voor de home-indicator.
 */

const SLEUTEL = "nina-nieuwsbrief-weg";
const BEWAARTERMIJN_DAGEN = 60;

function isWeggeklikt() {
  try {
    const v = localStorage.getItem(SLEUTEL);
    if (!v) return false;
    const dagen = (Date.now() - Number(v)) / 86_400_000;
    return dagen < BEWAARTERMIJN_DAGEN;
  } catch {
    return false;
  }
}

export default function NieuwsbriefSticky() {
  const [weg, setWeg] = useState(true); // start verborgen: eerst meten
  const [voorbijKop, setVoorbijKop] = useState(false);
  const [kaartInBeeld, setKaartInBeeld] = useState(false);
  const [open, setOpen] = useState(false);
  const kaartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWeg(isWeggeklikt());
  }, []);

  /**
   * Eén scroll-listener in plaats van twee IntersectionObservers. Reden: de
   * banner moet aan twee voorwaarden tegelijk toetsen (voorbij de intro én de
   * eindkaart nog niet in beeld) en met twee losse observers hing de uitkomst
   * van de volgorde van hun callbacks af. Met rAF-throttling is dit één meting
   * per frame, en die meting is meteen de bron van beide waarden.
   */
  useEffect(() => {
    let raf = 0;
    const meet = () => {
      raf = 0;
      setVoorbijKop(window.scrollY > 700);
      const kaart = kaartRef.current;
      setKaartInBeeld(
        kaart ? kaart.getBoundingClientRect().top < window.innerHeight * 0.9 : false
      );
    };
    const opScroll = () => {
      if (!raf) raf = requestAnimationFrame(meet);
    };
    meet();
    window.addEventListener("scroll", opScroll, { passive: true });
    window.addEventListener("resize", opScroll);
    return () => {
      window.removeEventListener("scroll", opScroll);
      window.removeEventListener("resize", opScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function sluit() {
    setWeg(true);
    setOpen(false);
    try {
      localStorage.setItem(SLEUTEL, String(Date.now()));
    } catch {
      /* private mode: dan komt hij bij de volgende pagina terug */
    }
  }

  const zichtbaar = !weg && voorbijKop && !kaartInBeeld;

  return (
    <>
      {/* De volledige kaart, in de tekstkolom onder het artikel. Die staat er
          altijd, ook als de meescrollende versie is weggeklikt. */}
      <div ref={kaartRef} className="glas mt-16 rounded-[3px] p-7 sm:p-8">
        <p className="label-mono text-[11px] text-text-muted">
          Nieuwsbrief · gratis
        </p>
        <h2 className="display-serif mt-3 text-[1.7rem] sm:text-[2rem]">
          Volgende week weer zo&apos;n verhaal, <em className="italic">in je inbox</em>.
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-text-muted">
          Eén mail per week over AI in de praktijk. Uitschrijven met één klik.
        </p>
        <div className="mt-6 max-w-md">
          <iframe
            src="https://olaflemmens.substack.com/embed"
            title="Inschrijven voor de nieuwsbrief van Olaf Lemmens"
            loading="lazy"
            scrolling="no"
            className="h-[235px] w-full rounded-[3px] border border-border bg-white sm:h-[190px]"
          />
        </div>
      </div>

      {/* Meescrollend. aria-hidden zolang hij niet zichtbaar is, zodat een
          schermlezer niet twee keer hetzelfde formulier aankondigt. */}
      <aside
        aria-label="Nieuwsbrief"
        aria-hidden={!zichtbaar}
        className={`fixed z-40 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          zichtbaar
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[360px] 2xl:bottom-6 2xl:right-6 2xl:w-[344px]`}
      >
        <div className="glas relative overflow-hidden rounded-[3px]">
          {/* Kruisje: klein en doorzichtig, wordt duidelijker bij hover. */}
          <button
            type="button"
            onClick={sluit}
            aria-label="Nieuwsbrief-balk sluiten"
            className="absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full text-[15px] leading-none text-text-muted/40 transition-colors hover:bg-ink/5 hover:text-text"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="px-4 py-3 pr-9 2xl:px-5 2xl:py-4">
            {/* Ingeklapt is dit één regel met de knop ernaast: zo blijft de
                balk op een telefoon 68px in plaats van 112px. Het mono-label
                past er pas bij vanaf sm. */}
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="label-mono hidden text-[10px] text-text-muted sm:block">
                  Nieuwsbrief · gratis
                </p>
                <p className="text-[13.5px] font-medium leading-snug sm:mt-1 sm:text-[14px]">
                  Elke week wat werkt in AI, in je inbox.
                </p>
              </div>
              {!open && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  data-cta="nieuwsbrief_sticky_open"
                  className="shrink-0 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition-transform duration-300 hover:scale-[1.02] 2xl:hidden"
                >
                  Inschrijven
                </button>
              )}
            </div>

            {/* Vanaf 2xl staat het formulier meteen open: daar is ruimte in de
                marge. Daaronder komt het pas na een tik, want een iframe van
                190px over een telefoonscherm is precies te veel. */}
            <div className="2xl:hidden">
              {open && (
                <iframe
                  src="https://olaflemmens.substack.com/embed"
                  title="Inschrijven voor de nieuwsbrief van Olaf Lemmens"
                  loading="lazy"
                  scrolling="no"
                  className="mt-3 h-[235px] w-full rounded-[3px] border border-border bg-white"
                />
              )}
            </div>

            <div className="hidden 2xl:block">
              {zichtbaar && (
                <iframe
                  src="https://olaflemmens.substack.com/embed"
                  title="Inschrijven voor de nieuwsbrief van Olaf Lemmens"
                  loading="lazy"
                  scrolling="no"
                  /* 215px: bij 190 sneed de kop van de Substack-embed af. */
                  className="mt-3 h-[215px] w-full rounded-[3px] border border-border bg-white"
                />
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
