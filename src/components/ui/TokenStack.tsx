/**
 * Stapel tokens als gouden munten, zoals in de tokendeck. Vervangt een regel
 * uitleg door een plaatje: je ziet in één oogopslag dat Standaard het dubbele
 * van Light is. Puur decoratief, het aantal staat er als tekst naast.
 */
export default function TokenStack({
  n,
  plus = false,
  featured = false,
}: {
  n: number;
  plus?: boolean;
  featured?: boolean;
}) {
  return (
    <div aria-hidden="true" className="flex flex-wrap items-center gap-1">
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className={`h-3.5 w-3.5 rounded-full ${
            featured
              ? "bg-[linear-gradient(140deg,#c9a227,#8f6c1d)]"
              : "bg-gold/35"
          }`}
        />
      ))}
      {plus && (
        <span className="font-display ml-0.5 text-sm font-bold text-gold">
          +
        </span>
      )}
    </div>
  );
}
