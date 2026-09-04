import Reveal from "@/components/ui/Reveal";
import Section, { Em } from "@/components/ui/Section";
import { site } from "@/lib/site";

/**
 * De vragen die anders per mail binnenkomen — en die, onbeantwoord, precies
 * de reden zijn dat iemand de knop niet indrukt. Vandaar dat dit blok vlak
 * boven de laatste CTA staat en niet ergens onderaan weggestopt.
 *
 * Een <details>-element in plaats van een eigen accordeon: dat werkt zonder
 * JavaScript, is toetsenbordbedienbaar en wordt door schermlezers gewoon
 * aangekondigd.
 */

export const VRAGEN: { vraag: string; antwoord: string }[] = [
  {
    vraag: "Zijn de prijzen inclusief btw?",
    antwoord:
      "De prijzen op deze site staan exclusief btw, met de prijs inclusief btw erbij. Bij het afrekenen wordt 21% btw opgeteld. Je krijgt direct een factuur van Stripe in je mailbox; heb je er een met een inkoopnummer of een ander tenaamstelling nodig, mail ons dan.",
  },
  {
    vraag: "Hoe betaal ik?",
    antwoord:
      "Met iDEAL, creditcard of Bancontact, via Stripe. Wij zien of verwerken je betaalgegevens niet zelf. Wil je liever op factuur vooraf betalen, bijvoorbeeld omdat je werkgever dat zo doet, stuur ons dan een mail; dat kan ook.",
  },
  {
    vraag: "Kan ik annuleren of iemand anders sturen?",
    antwoord:
      "Tot 14 dagen voor de workshop kun je kosteloos annuleren en krijg je het volledige bedrag terug. Daarna is je ticket overdraagbaar: geef uiterlijk de dag ervoor door wie er in jouw plaats komt en het is geregeld.",
  },
  {
    vraag: "Wat als ik er die dag niet bij kan zijn?",
    antwoord:
      "Laat het ons weten, dan schuiven we je door naar een volgende datum als daar plek is. Meld je niet af en kom je niet, dan vervalt het ticket.",
  },
  {
    vraag: "Moet ik al iets kunnen?",
    antwoord:
      "Voor de Claude Workshop niet: die begint bij het begin. Je Second Brain voor AI gaat ervan uit dat je AI al regelmatig gebruikt. De Claude Pro Workshop is een masterclass: daar nemen we aan dat je de basis van Claude beheerst en al eens een connector hebt ingesteld. Twijfel je? Mail wat voor werk je doet, dan zeggen we welke past.",
  },
  {
    vraag: "Kan ik er meerdere doen?",
    antwoord:
      "Dat scheelt geld. Eén workshop kost € 399. De Claude Workshop en de Pro Workshop samen boek je als Claude Complete voor € 750 in plaats van € 798. Alle drie de workshops van dit najaar kosten € 999 in plaats van € 1.197. Alle bedragen zijn exclusief btw, en je boekt de bundel in één keer af.",
  },
  {
    vraag: "Wat is die gratis LinkedIn Live?",
    antwoord:
      "Een online sessie van drie kwartier, gratis en zonder ticket. Je meldt je aan via LinkedIn en kijkt live mee. Het is de makkelijkste manier om te zien hoe we lesgeven voordat je iets koopt; de workshop erna gaat over hetzelfde onderwerp, maar dan met je handen op het toetsenbord.",
  },
  {
    vraag: "Wij willen met het hele team komen. Kan dat?",
    antwoord:
      "Bij vier personen of meer is een besloten sessie meestal verstandiger: dan gaat de hele sessie over jullie processen en plannen we hem op een moment dat jullie schikt, hier of op jullie eigen kantoor. Mail ons, dan rekenen we het voor.",
  },
  {
    vraag: "Krijg ik een bewijs van deelname?",
    antwoord:
      "Ja, je krijgt na afloop een certificaat. Het is geen erkend diploma, maar een bewijs dat je erbij was en waar de middag over ging. Genoeg voor de meeste opleidingsbudgetten.",
  },
  {
    vraag: "Kan ik dit betalen uit een opleidingsbudget?",
    antwoord:
      "Bijna altijd. Je ontvangt een factuur op naam van je werkgever, met btw-nummer en omschrijving. Heeft je afdeling een inkoopnummer of een eigen factuurformaat nodig, geef dat door bij het afrekenen of stuur ons een mail.",
  },
];

export default function Vragen() {
  return (
    <Section
      id="vragen"
      kicker="Voordat je koopt"
      title={
        <>
          Vragen die we <Em>vaker</Em> krijgen.
        </>
      }
      sub="Staat je vraag er niet bij? Mail of app ons, je krijgt binnen een werkdag antwoord."
    >
      <div className="mx-auto max-w-3xl">
        {VRAGEN.map((v, i) => (
          <Reveal key={v.vraag} delay={i * 0.03}>
            <details className="group border-b border-border py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-display text-[17px] font-bold leading-snug">
                  {v.vraag}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-mono text-lg text-text-muted transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-10 text-[15px] leading-relaxed text-text-muted">
                {v.antwoord}
              </p>
            </details>
          </Reveal>
        ))}

        <Reveal>
          <p className="mt-8 text-sm text-text-muted">
            Nog iets anders?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline-offset-4 hover:text-violet hover:underline"
            >
              {site.email}
            </a>{" "}
            of{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline-offset-4 hover:text-violet hover:underline"
            >
              stuur een appje
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
