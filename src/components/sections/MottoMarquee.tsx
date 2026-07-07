/**
 * Het motto van Olaf als vaste display-regel: outline-tekst met een
 * gevulde brand-gradient op "spelen". Bewust statisch: de logowall
 * verderop is de enige marquee op de pagina.
 */
export default function MottoMarquee() {
  return (
    <div className="border-y border-border bg-bg-alt py-10 sm:py-14">
      <p className="font-display mx-auto max-w-6xl px-5 text-center text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
        <span className="motto-outline">Ga </span>
        <span className="motto-fill">spelen</span>
        <span className="motto-outline"> met AI.</span>
        <span className="mt-2 block text-lg font-medium tracking-normal text-text-muted sm:text-xl">
          Alleen zo groei je.
        </span>
      </p>
    </div>
  );
}
