/**
 * Stapel tokens als gouden munten, zoals in de tokendeck. Vervangt een regel
 * uitleg door een plaatje: je ziet in één oogopslag dat Standaard het dubbele
 * van Light is. Puur decoratief, het aantal staat er als tekst naast.
 */
export default function TokenStack({
  n,
  plus = false,
  featured = false,
  open = false,
  klein = false,
}: {
  n: number;
  plus?: boolean;
  featured?: boolean;
  /** Open ring in plaats van een volle munt: een token dat doorschuift. */
  open?: boolean;
  /** Compactere munten, voor rijen die naast elkaar in één regel staan. */
  klein?: boolean;
}) {
  const maat = klein ? "h-3 w-3" : "h-3.5 w-3.5";
  const vulling = open
    ? "border border-gold/60 bg-transparent"
    : featured
      ? "bg-[linear-gradient(140deg,#c9a227,#b0653a)]"
      : "bg-gold/35";

  return (
    <div aria-hidden="true" className="flex flex-wrap items-center gap-1">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`${maat} shrink-0 rounded-full ${vulling}`} />
      ))}
      {plus && (
        <span className="font-display ml-0.5 text-sm font-bold text-gold">
          +
        </span>
      )}
    </div>
  );
}
