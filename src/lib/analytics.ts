/**
 * Meetlaag. Alles gaat via de dataLayer naar Google Tag Manager, die het
 * doorzet naar GA4.
 *
 * Waarom niet rechtstreeks gtag('event', ...): de Google-tag wordt door GTM
 * geladen, en dan pikt gtag.js losse event-commando's uit de dataLayer niet
 * op. Gemeten op de live site: alleen page_view kwam aan, de rest niet. Dus
 * dataLayer plus een GTM-tag.
 *
 * Consent regelt Google zelf. Staat analytics_storage op denied, dan houdt de
 * GA4-tag in GTM het tegen; de push blijft dan zonder gevolg in de dataLayer
 * staan. Geen eigen consent-check hier, dat zou de twee uit elkaar laten
 * lopen.
 *
 * Window.dataLayer is al getypeerd door @next/third-parties, dus geen eigen
 * declaratie.
 */

/**
 * Vaste parameternamen. GTM moet elke parameter apart mappen op een
 * gegevenslaagvariabele, dus houden we de set klein en hergebruiken we hem
 * voor elk event. Een nieuw event kost daardoor geen GTM-werk meer.
 */
export type MeetParams = {
  /** Machinenaam van het ding, bijvoorbeeld "hero_partnership". */
  naam?: string;
  /** Zichtbaar label, zoals de knoptekst. */
  tekst?: string;
  /** Waar op de site: pad plus sectie. */
  locatie?: string;
  /** Categorie: hero, nav, footer, pakket, formulier, scroll, quickscan. */
  soort?: string;
  /** Doel van een link. */
  bestemming?: string;
  /** Getal, bijvoorbeeld scrollpercentage. */
  waarde?: number;
  /** Vrije keuze binnen een event, bijvoorbeeld welke CTA. */
  keuze?: string;
  /** Taal van de pagina. */
  taal?: string;
  /** Of er al iets was ingevuld voordat er geklikt werd. */
  ingevuld?: boolean;
};

export function stuurEvent(naam: string, params: MeetParams = {}) {
  if (typeof window === "undefined") return;
  const schoon: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") schoon[k] = v;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: naam, ...schoon });
}

/**
 * Google Ads-conversie. Twee wegen tegelijk, want de site heeft de Google-tag
 * via GTM en niet los:
 *
 * 1. Een dataLayer-push met de eventnaam. Dat is de weg die hier bewezen
 *    werkt: in GTM maak je een trigger "Aangepaste gebeurtenis" op deze naam
 *    en hang je daar de Google Ads-conversietag aan.
 * 2. Daarnaast hetzelfde event via gtag, exact zoals het fragment dat Ads
 *    aanlevert. Onder de huidige GTM-opzet doet die niets (gemeten: gtag.js
 *    pikt losse event-commando's uit de dataLayer niet op), maar zodra er ooit
 *    een losse Google-tag met AW-id op de site staat, telt de conversie mee
 *    zonder dat hier iets hoeft te veranderen.
 *
 * Consent: niet zelf checken. Consent Mode v2 staat op denied tot iemand
 * kiest, en dan houdt de Ads-tag in GTM zichzelf tegen. Een eigen check zou
 * daar naast gaan lopen.
 *
 * transaction_id is de sleutel tegen dubbeltellen: Ads negeert een tweede
 * conversie met hetzelfde id.
 */
export function stuurConversie(
  naam: string,
  params: MeetParams & { transaction_id?: string; value?: number; currency?: string } = {}
) {
  if (typeof window === "undefined") return;
  const schoon: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") schoon[k] = v;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: naam, ...schoon });

  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof g === "function") g("event", naam, schoon);
}

/** Knip lange labels af, zodat GA4-parameters onder de 100 tekens blijven. */
export function kort(tekst: string, max = 90) {
  const t = tekst.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/** Machinenaam uit een label: "Plan een kennismaking" wordt "plan-een-kennismaking". */
export function slug(tekst: string, max = 40) {
  return kort(tekst, 200)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max);
}
