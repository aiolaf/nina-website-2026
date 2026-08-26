import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { locatie } from "@/lib/site";

/**
 * Alles wat iemand nog wil weten voordat hij durft te kopen: waar het is,
 * hoe je er komt, en wat er voor je geregeld is.
 *
 * Dit blok staat er niet voor de sfeer. Op een ticketpagina is "waar is het
 * en hoe kom ik er" een van de laatste twijfels; die hier wegnemen scheelt
 * afhakers vlak voor de knop.
 */

const GEREGELD = [
  {
    titel: "Kleine groepen",
    tekst:
      "Tien tot veertien deelnemers, nooit meer. Iedereen komt aan de beurt met zijn eigen vraag.",
  },
  {
    titel: "Eten en drinken",
    tekst:
      "Koffie de hele dag, iets te eten in de pauze, en een borrel als we klaar zijn.",
  },
  {
    titel: "Alles mee naar huis",
    tekst:
      "Werkboek, promptset en de bestanden die we die dag bouwen. Zonder abonnement erachter.",
  },
  {
    titel: "Nazorg",
    tekst:
      "Twee weken later een online vragenuur met de hele groep. Want dan lopen de vragen pas echt binnen.",
  },
];

export default function Praktisch() {
  return (
    <Section
      id="praktisch"
      kicker="Praktisch"
      variant="alt"
      title={
        <>
          Bij ons op kantoor, aan <Em>één tafel</Em>.
        </>
      }
      sub="Elke workshop is fysiek in Amsterdam. Geen webinar, geen zaal met honderd man: een ruimte, een tafel, en genoeg tijd voor je eigen werk."
      annotatie="tot ziens op de Johan Huizingalaan"
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <Reveal>
          <div className="foto kaart aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/beeld/zaal-verkenners.webp"
              alt="De zaal tijdens een workshop, deelnemers aan tafel"
              width={900}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="kaart border border-border bg-bg-card p-7">
            <h3 className="font-display text-xl font-bold">{locatie.naam}</h3>
            <address className="mt-2 text-[15px] not-italic leading-relaxed text-text-muted">
              {locatie.straat}
              <br />
              {locatie.postcode} {locatie.plaats}
            </address>

            <dl className="mt-6 space-y-4 border-t border-border pt-5">
              <div>
                <dt className="label-mono text-[10.5px] text-text-muted">
                  Met het OV
                </dt>
                <dd className="mt-1 text-sm leading-relaxed">{locatie.ov}</dd>
              </div>
              <div>
                <dt className="label-mono text-[10.5px] text-text-muted">
                  Met de auto
                </dt>
                <dd className="mt-1 text-sm leading-relaxed">{locatie.auto}</dd>
              </div>
            </dl>

            <a
              href={locatie.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm transition-colors hover:border-ink/35"
            >
              Plan je route →
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GEREGELD.map((g, i) => (
          <Reveal key={g.titel} delay={i * 0.06}>
            <div className="kaart h-full border border-border bg-bg-card p-6">
              <p className="stempel text-[11px] uppercase tracking-[0.12em] text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="font-display mt-2 text-lg font-bold">{g.titel}</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {g.tekst}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
