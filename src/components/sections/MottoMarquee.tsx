/**
 * Het motto van Olaf als vaste display-regel. In de huisstijl "Licht" is dit
 * de enige plek op de homepage waar het goud verschijnt: als marker-streep
 * achter "spelen". Bewust statisch, de logowall in de hero is de enige
 * marquee op de pagina.
 */
export default function MottoMarquee() {
  return (
    <div className="border-y border-border bg-bg py-16 sm:py-20">
      <p className="display-serif mx-auto max-w-6xl px-5 text-center text-[2.6rem] sm:text-[4rem]">
        Ga <span className="marker italic">spelen</span> met AI.
        <span className="mt-4 block font-sans text-base font-normal tracking-normal text-text-muted sm:text-lg">
          Alleen zo groei je.
        </span>
      </p>
    </div>
  );
}
