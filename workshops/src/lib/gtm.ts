/**
 * Google Tag Manager.
 *
 * Dezelfde container als nina-ai.nl, zodat de workshopverkoop in hetzelfde
 * account meeloopt en je in Google Ads één conversieset houdt. Wil je de
 * subdomein-data juist gescheiden hebben, maak dan een tweede container aan
 * en wissel alleen het ID hieronder.
 *
 * De hoofdsite gebruikt hiervoor @next/third-parties. Dat pakket voegt
 * client-side routewissels toe aan de dataLayer, en dat is nuttig op een
 * site met veel interne navigatie. Deze site is een handvol pagina's met
 * gewone paginaladingen, dus het losse snippet is genoeg en scheelt een
 * afhankelijkheid.
 */
export const GTM_ID = "GTM-58FHHD5V";

export function gtmScript(): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
}
