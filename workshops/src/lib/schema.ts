import { isoMetTijd } from "@/lib/datum";
import { locatie, site } from "@/lib/site";
import { VRAGEN } from "@/components/sections/Vragen";
import {
  koopbareTickets,
  sessieStatus,
  type AgendaItem,
  type Sessie,
  type Workshop,
} from "@/content/workshops";

/**
 * Gestructureerde data.
 *
 * Voor deze site is dat geen SEO-vinkje maar de reden dat een datum in
 * Google als evenement kan verschijnen, met plaats, prijs en beschikbaarheid
 * erbij. Dat is precies de informatie waarop iemand klikt.
 *
 * De prijzen staan hier exclusief btw, net als op de pagina, met
 * `valueAddedTaxIncluded: false` erbij zodat er geen verkeerd bedrag in een
 * zoekresultaat belandt.
 */

const ORGANISATIE = {
  "@type": "Organization",
  name: "NinA AI Agency",
  url: site.hoofdsite,
};

const PLAATS = {
  "@type": "Place",
  name: locatie.naam,
  address: {
    "@type": "PostalAddress",
    streetAddress: locatie.straat,
    postalCode: locatie.postcode,
    addressLocality: locatie.plaats,
    addressCountry: "NL",
  },
};

function beschikbaarheid(sessie: Sessie): string {
  const status = sessieStatus(sessie);
  if (status === "uitverkocht") return "https://schema.org/SoldOut";
  if (status === "binnenkort") return "https://schema.org/PreOrder";
  if (status === "schaars") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/InStock";
}

export function evenementSchema(workshop: Workshop, sessie: Sessie) {
  const tickets = koopbareTickets(sessie);
  const url = `${site.url}/workshop/${workshop.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: `${workshop.naam} — ${workshop.ondertitel}`,
    description: workshop.kort,
    startDate: isoMetTijd(sessie.datum, sessie.start),
    endDate: isoMetTijd(sessie.datum, sessie.eind),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: PLAATS,
    image: [`${site.url}${workshop.foto}`],
    url,
    organizer: ORGANISATIE,
    performer: {
      "@type": "Person",
      name: workshop.trainer.naam,
    },
    maximumAttendeeCapacity: sessie.plaatsen,
    /* Staat er nog geen betaallink, dan geen offers-blok: een aanbod zonder
       koopbare prijs is voor Google een fout, geen aankondiging. */
    ...(tickets.length > 0
      ? {
          offers: tickets.map((t) => ({
            "@type": "Offer",
            name: t.naam,
            url: t.stripeLink,
            availability: beschikbaarheid(sessie),
            priceSpecification: {
              "@type": "PriceSpecification",
              price: t.prijs,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
          })),
        }
      : {}),
  };
}

/** Alle komende datums als één lijst, voor de homepage. */
export function evenementenSchema(items: AgendaItem[]) {
  return items.map((item) => evenementSchema(item.workshop, item.sessie));
}

/** De veelgestelde vragen, zodat ze als uitklapbaar blok kunnen verschijnen. */
export function vragenSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VRAGEN.map((v) => ({
      "@type": "Question",
      name: v.vraag,
      acceptedAnswer: { "@type": "Answer", text: v.antwoord },
    })),
  };
}
