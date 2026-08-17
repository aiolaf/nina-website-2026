import { site, type Lang } from "@/lib/site";

const BASIS = "https://nina-ai.nl";

/** Vaste @id's, zodat andere schema-blokken hiernaar kunnen verwijzen. */
export const ORG_ID = `${BASIS}/#organisatie`;
export const OLAF_ID = `${BASIS}/#olaf`;

/**
 * Organization en WebSite voor de homepage. Dit stond nergens op de site:
 * alleen de lezingenpagina had structured data, met een Person en een
 * Service. Daardoor lag er geen enkel blok waarin staat wie NinA is, waar
 * het bedrijf zit en welke diensten er zijn.
 *
 * Alleen velden die kloppen en te controleren zijn. Geen aggregateRating:
 * die 9,3 komt uit eigen sessie-evaluaties en niet uit reviews die op de
 * site staan, en Google verwacht bij een rating dat de onderbouwing
 * zichtbaar is op dezelfde pagina.
 */
export function homepageSchema(lang: Lang = "nl") {
  const isEn = lang === "en";
  const url = isEn ? `${BASIS}/en` : `${BASIS}/`;

  const diensten = isEn
    ? [
        ["AI Partnership", "/en/ai-partnership"],
        ["AI keynotes and workshops", "/en/workshops"],
        ["AI Agents", "/en/ai-agents"],
        ["AI Build", "/en/ai-build"],
        ["n8n Automations", "/en/n8n"],
      ]
    : [
        ["AI Partnership", "/ai-partnership"],
        ["Lezingen en workshops over AI", "/lezingen-workshops"],
        ["AI Agents", "/ai-agents"],
        ["AI Build", "/ai-build"],
        ["n8n Automations", "/n8n"],
      ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        alternateName: "NinA AI",
        url: `${BASIS}/`,
        logo: {
          "@type": "ImageObject",
          url: `${BASIS}/images/nina-logo-ink.webp`,
        },
        image: `${BASIS}/images/og.png`,
        email: site.email,
        telephone: site.phone,
        foundingDate: "2024",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Johan Huizingalaan 763A",
          postalCode: "1066 VH",
          addressLocality: "Amsterdam",
          addressCountry: "NL",
        },
        // KvK-nummer als identifier; dat is het controleerbare anker.
        identifier: {
          "@type": "PropertyValue",
          name: "KvK",
          value: site.kvk,
        },
        areaServed: [
          { "@type": "Country", name: "Nederland" },
          { "@type": "Country", name: "België" },
        ],
        founder: { "@id": OLAF_ID },
        description: isEn
          ? "NinA AI Agency helps organizations automate processes with AI agents and workflows, from keynotes and workshops to a long-term AI partnership."
          : "NinA AI Agency helpt organisaties processen automatiseren met AI-agents en workflows, van lezingen en workshops tot een doorlopend AI Partnership.",
        knowsAbout: [
          "Kunstmatige intelligentie",
          "AI-agents",
          "AI Automation",
          "n8n",
          "Procesautomatisering",
          "AI-adoptie",
          "Large language models",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isEn ? "AI services" : "AI-diensten",
          itemListElement: diensten.map(([naam, pad]) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: naam,
              url: `${BASIS}${pad}`,
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": OLAF_ID,
        name: "Olaf Lemmens",
        jobTitle: isEn ? "AI speaker and founder" : "AI-spreker en founder",
        worksFor: { "@id": ORG_ID },
        url: isEn ? `${BASIS}/en/about-nina` : `${BASIS}/over-nina`,
        sameAs: [site.linkedinOlaf],
      },
      {
        "@type": "WebSite",
        "@id": `${BASIS}/#website`,
        url,
        name: site.name,
        inLanguage: isEn ? "en" : "nl-NL",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** JSON-LD veilig in een script-tag; < wordt geëscaped tegen tag-injectie. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
