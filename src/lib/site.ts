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
  { label: "Blog", href: "/blog" },
  { label: "Freebies", href: "/freebies" },
  { label: "Over NinA AI", href: "/over-nina" },
];

export const navEn = [
  { label: "AI Partnership", href: "/en/ai-partnership", uitgelicht: true },
  { label: "Workshops", href: "/en/workshops" },
  { label: "AI Agents", href: "/en/ai-agents" },
  { label: "AI Build", href: "/en/ai-build" },
  { label: "Blog", href: "/en/blog" },
  { label: "Freebies", href: "/en/freebies" },
  { label: "About NinA AI", href: "/en/about-nina" },
];

export const cta = { label: "Plan een kennismaking", href: site.booking };
export const ctaEn = { label: "Book an intro call", href: site.booking };

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
];

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
