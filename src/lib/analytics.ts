/**
 * Losse events naar de dataLayer, zodat Google Tag Manager ze kan doorzetten
 * naar GA4. Bewust minimaal: we sturen alleen of iets gebeurd is, geen
 * antwoorden of scores.
 *
 * Consent regelt Google zelf. Staat analytics_storage op denied, dan houdt de
 * GA4-tag in GTM het tegen; deze push blijft dan zonder gevolg in de dataLayer
 * staan. Dus geen eigen consent-check hier, dat zou de twee uit elkaar laten
 * lopen.
 *
 * Window.dataLayer is al getypeerd door @next/third-parties, dus geen eigen
 * declaratie.
 */
export function stuurEvent(
  naam: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: naam, ...params });
}
