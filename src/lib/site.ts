export const site = {
  name: "NinA AI Agency",
  email: "olaf@nina-ai.nl",
  phone: "+31 6 42 55 85 26",
  phoneHref: "tel:+31642558526",
  address: "Johan Huizingalaan 763A, 1066VH Amsterdam",
  kvk: "93390688",
  linkedinOlaf: "https://www.linkedin.com/in/olaf-lemmens/",
  newsletter: "https://olaflemmens.substack.com/subscribe",
  workshops: "https://workshops.nina-ai.nl",
  /** TidyCal-pagina achter elke "Plan een kennismaking"-knop. */
  booking: "https://tidycal.com/olaf/kennismaking-15-minuten-website",
  /**
   * Aparte TidyCal-pagina voor het AI Partnership. Zelfde gesprek, ander
   * boekingstype, zodat in de agenda direct zichtbaar is dat de aanvraag uit
   * het partnership-spoor komt. Gebruik deze op de partnershippagina's en op
   * de quick scan; overal elders het algemene adres hierboven.
   */
  bookingPartnership:
    "https://tidycal.com/olaf/kennismaking-15-minuten-website-ai-partnership",
  /**
   * WhatsApp in plaats van een zichtbaar telefoonnummer. Op pagina's die
   * betaald verkeer trekken staat het nummer niet meer als tekst in de HTML,
   * zodat scrapers het niet oppikken; bezoekers klikken op een label en
   * openen WhatsApp met een startbericht.
   */
  whatsapp: "https://wa.me/31642558526",
  whatsappNl:
    "https://wa.me/31642558526?text=" +
    encodeURIComponent(
      "Hoi Olaf, ik heb een vraag over een AI-lezing of workshop."
    ),
  whatsappEn:
    "https://wa.me/31642558526?text=" +
    encodeURIComponent("Hi Olaf, I have a question about an AI talk or workshop."),
};

/**
 * Waar de uitkomst van de AI Maturity Quick Scan naartoe gaat. Los van
 * site.email, want dat is het algemene adres dat overal op de site staat en
 * deze leads komen bij Noud binnen, met Olaf in de cc.
 */
export const scanMail = {
  naar: "noud@nina-ai.nl",
  cc: "olaf@nina-ai.nl",
};

export type Lang = "nl" | "en";

/**
 * `uitgelicht` markeert het hoofdproduct. De header geeft dat item een
 * accent, zodat het partnership op elke pagina opvalt tussen de rest.
 */
export const nav = [
  { label: "AI Partnership", href: "/ai-partnership", uitgelicht: true },
  { label: "Lezingen & Workshops", href: "/lezingen-workshops" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "AI Build", href: "/ai-build" },
  // Bewijs hoort tussen de diensten en de kennislaag: wie een dienst
  // bekijkt, wil daarna zien dat het ergens gewerkt heeft.
  { label: "Cases", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Freebies", href: "/freebies" },
  { label: "Over NinA AI", href: "/over-nina" },
];

export const navEn = [
  { label: "AI Partnership", href: "/en/ai-partnership", uitgelicht: true },
  { label: "Workshops", href: "/en/workshops" },
  { label: "AI Agents", href: "/en/ai-agents" },
  { label: "AI Build", href: "/en/ai-build" },
  { label: "Cases", href: "/en/cases" },
  { label: "Blog", href: "/en/blog" },
  { label: "Freebies", href: "/en/freebies" },
  { label: "About NinA AI", href: "/en/about-nina" },
];

export const cta = { label: "Plan een kennismaking", href: site.booking };
export const ctaEn = { label: "Book an intro call", href: site.booking };

/**
 * Kortere variant van dezelfde knop, alleen voor de header. De volledige
 * balk is op 1024px exact vol: logo 62px plus nav 922px is de hele
 * binnenbreedte. Met "Plan een kennismaking" (187px) erin past er geen
 * nav-item meer bij, met "Kennismaken" wel.
 */
export const ctaKort = { label: "Kennismaken", href: site.booking };
export const ctaKortEn = { label: "Intro call", href: site.booking };

/** Footer-kolommen; header houdt alleen de hoofditems. */
export const footerNav = {
  nl: {
    diensten: [
      { label: "AI Partnership", href: "/ai-partnership" },
      { label: "Lezingen & Workshops", href: "/lezingen-workshops" },
      { label: "AI Agents", href: "/ai-agents" },
      { label: "AI Build", href: "/ai-build" },
      { label: "n8n Automations", href: "/n8n" },
      { label: "Workshops", href: "/workshops" },
    ],
    content: [
      { label: "Blog", href: "/blog" },
      { label: "Freebies", href: "/freebies" },
      { label: "Cases", href: "/cases" },
      { label: "AI Kennis", href: "/ai-kennis" },
    ],
    bedrijf: [
      { label: "Over NinA AI", href: "/over-nina" },
      { label: "Vacatures", href: "/vacatures" },
      { label: "Contact", href: "/contact" },
      { label: "Privacyverklaring", href: "/privacy" },
    ],
  },
  en: {
    diensten: [
      { label: "AI Partnership", href: "/en/ai-partnership" },
      { label: "AI Agents", href: "/en/ai-agents" },
      { label: "AI Build", href: "/en/ai-build" },
      { label: "n8n Automations", href: "/en/n8n" },
      { label: "Workshops", href: "/en/workshops" },
    ],
    content: [
      { label: "Blog", href: "/en/blog" },
      { label: "Freebies", href: "/en/freebies" },
      { label: "Cases", href: "/en/cases" },
      { label: "AI Knowledge", href: "/en/ai-knowledge" },
    ],
    bedrijf: [
      { label: "About NinA AI", href: "/en/about-nina" },
      { label: "Careers", href: "/en/careers" },
      { label: "Contact", href: "/en/contact" },
      { label: "Privacy policy", href: "/en/privacy" },
    ],
  },
};

/**
 * NL-pad <-> EN-pad voor de taalswitcher. Paden zonder mapping vallen
 * terug op de homepage van de andere taal.
 */
export const langPairs: [string, string][] = [
  ["/", "/en"],
  ["/ai-partnership", "/en/ai-partnership"],
  ["/lezingen-workshops", "/en/workshops"],
  ["/workshops", "/en/workshops"],
  ["/ai-agents", "/en/ai-agents"],
  ["/ai-build", "/en/ai-build"],
  ["/n8n", "/en/n8n"],
  ["/blog", "/en/blog"],
  ["/freebies", "/en/freebies"],
  ["/cases", "/en/cases"],
  ["/ai-kennis", "/en/ai-knowledge"],
  ["/over-nina", "/en/about-nina"],
  ["/vacatures", "/en/careers"],
  ["/contact", "/en/contact"],
  ["/privacy", "/en/privacy"],
  // /ai-starter, /giveaways, /resources en /en/promotions/... staan hier
  // bewust niet: dat zijn redirect-pagina's zonder eigen inhoud. Een
  // hreflang die naar een redirect wijst rekent Google als fout aan.
];

/**
 * Canonical plus hreflang voor één pagina. Zonder hreflang weet Google niet
 * dat de NL- en EN-versie taalvarianten van dezelfde pagina zijn, en laat
 * het ze deels tegen elkaar concurreren.
 *
 * hreflang moet wederkerig zijn: als A naar B wijst moet B naar A terug
 * wijzen, anders negeert Google de hele set. Dat is hier niet overal het
 * geval. /workshops en /lezingen-workshops wijzen beide naar /en/workshops,
 * en die kan er maar één terugwijzen. Bij zo'n paar laten we de talen weg en
 * blijft alleen de canonical staan; een halve hreflang is slechter dan geen.
 *
 * Relatieve paden mogen: metadataBase in de root-layout maakt ze absoluut.
 */
export function alternatesVoor(pad: string) {
  const isEn = pad === "/en" || pad.startsWith("/en/");
  const nl = isEn ? switchLangPath(pad, "nl") : pad;
  const en = isEn ? pad : switchLangPath(pad, "en");

  const wederkerig =
    switchLangPath(nl, "en") === en && switchLangPath(en, "nl") === nl;
  if (!wederkerig) return { canonical: pad };

  return {
    canonical: pad,
    languages: {
      "nl-NL": nl,
      en,
      // Nederlands is de hoofdtaal, dus die vangt al het overige verkeer.
      "x-default": nl,
    },
  };
}

export function switchLangPath(pathname: string, to: Lang): string {
  if (to === "en") {
    if (pathname.startsWith("/blog/")) return `/en${pathname}`;
    if (pathname.startsWith("/freebies/")) return `/en${pathname}`;
    if (pathname.startsWith("/vacatures/")) return "/en/careers";
    const hit = langPairs.find(([nl]) => nl === pathname);
    return hit ? hit[1] : "/en";
  }
  if (pathname.startsWith("/en/blog/")) return pathname.slice(3);
  if (pathname.startsWith("/en/freebies/")) return pathname.slice(3);
  if (pathname.startsWith("/en/careers/")) return "/vacatures";
  const hit = langPairs.find(([, en]) => en === pathname);
  return hit ? hit[0] : "/";
}
