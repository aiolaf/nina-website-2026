/**
 * Meten wat er op deze site telt: de stap richting de betaalpagina.
 *
 * De site heeft geen backend, dus de echte conversie ("er is betaald") kan
 * hier niet vastgesteld worden. Die meten we op /bedankt/, de success_url
 * van Stripe: die pagina wordt alleen bereikt na een geslaagde betaling.
 * Zie STRIPE.md.
 *
 * Wat we hier meten is dus de intentie: iemand klikt van een ticket door
 * naar Stripe Checkout. Dat is het laatste moment dat wij nog zien.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type KoopEvent = {
  workshop: string;
  /** ISO-datum van de sessie. */
  datum: string;
  ticket: string;
  /** Prijs exclusief btw, in hele euro's. */
  prijs: number;
  /** Waar op de pagina de klik vandaan kwam: "agenda", "ticketbox", "koopbalk". */
  plek: string;
};

/**
 * Duwt een `begin_checkout` in de dataLayer. Staat GTM er niet (of heeft de
 * bezoeker statistieken geweigerd, waardoor GTM niets mag opslaan), dan
 * gebeurt er hier gewoon niets: de push valt in een dataLayer die nooit
 * uitgelezen wordt en de klik gaat verder naar Stripe.
 */
export function meetKoopklik(e: KoopEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "begin_checkout",
    currency: "EUR",
    value: e.prijs,
    workshop: e.workshop,
    sessie_datum: e.datum,
    ticket: e.ticket,
    plek: e.plek,
  });
}
