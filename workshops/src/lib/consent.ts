/**
 * Google Consent Mode v2. Eén plek voor de opslagsleutel, de signalen en de
 * inline-code die vóór Google Tag Manager moet draaien.
 *
 * Werking: bij de eerste paint staat alles op "denied", dus GTM laadt wel
 * maar mag niets opslaan. Zodra iemand kiest sturen we een consent-update en
 * bewaren we die keuze. Bij een volgend bezoek wordt de bewaarde keuze al in
 * de default meegegeven, zodat er geen moment is waarop tags onterecht mogen
 * vuren.
 */

export const CONSENT_KEY = "nina-consent-v1";

export type ConsentKeuze = {
  /** Analytics: statistieken over gebruik van de site. */
  analytics: boolean;
  /** Marketing: Google Ads, remarketing en advertentiemeting. */
  marketing: boolean;
  /** Wanneer de keuze is gemaakt, voor het geval we later opnieuw willen vragen. */
  ts: number;
};

/** Consent Mode-signalen die bij een keuze horen. */
export function signalen(k: Pick<ConsentKeuze, "analytics" | "marketing">) {
  const ads = k.marketing ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: k.analytics ? "granted" : "denied",
  } as const;
}

/**
 * Inline script voor de <head>. Moet met strategy beforeInteractive geladen
 * worden, dus vóór het GTM-script, anders staat de default te laat.
 */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var opgeslagen = null;
try { opgeslagen = JSON.parse(localStorage.getItem('${CONSENT_KEY}')); } catch (e) {}
var analytics = opgeslagen && opgeslagen.analytics ? 'granted' : 'denied';
var marketing = opgeslagen && opgeslagen.marketing ? 'granted' : 'denied';
gtag('consent', 'default', {
  ad_storage: marketing,
  ad_user_data: marketing,
  ad_personalization: marketing,
  analytics_storage: analytics,
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
if (opgeslagen) { gtag('set', 'ads_data_redaction', marketing !== 'granted'); }
`.trim();
