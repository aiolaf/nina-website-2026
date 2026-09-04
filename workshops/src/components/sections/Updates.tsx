import PijlKnop from "@/components/ui/PijlKnop";
import { site } from "@/lib/site";

/**
 * Aanmelden voor bericht bij nieuwe data, via SendFox.
 *
 * Waarom dit blok er is: het najaarsprogramma loopt tot eind oktober en de
 * rest van 2026 staat er nog niet. Iemand die in november wil komt nu één
 * keer langs en daarna nooit meer. Een mailadres achterlaten is de enige
 * manier om die bezoeker terug te krijgen, en het is de op één na
 * waardevolste actie op deze site, na een gekocht ticket.
 *
 * Waarom een knop en geen ingebouwd formulier. Het embed-script van SendFox
 * (cdn.sendfox.com/js/embed.js, formulier 3qoqw6) rendert wel, maar elke
 * verzending kwam op 4 september 2026 terug met een 422 en "Sorry, there was
 * an error processing your request". Op een kale testpagina met exact het
 * snippet van SendFox precies hetzelfde, dus het ligt niet aan deze site.
 * SendFox' eigen formulierpagina werkt wél. Vermoedelijk struikelt de
 * embed-route op de reCAPTCHA-controle die op het formulier aanstaat.
 *
 * Een iframe van die pagina is geen oplossing: SendFox leunt daarin op
 * sessiecookies, en die blokkeert Safari in een iframe van een ander domein.
 * Dus: de knop opent de pagina van SendFox zelf. Minder mooi, maar hij werkt,
 * en dat is hier het enige dat telt. Werkt de embed ooit weer, dan komt hij
 * hier terug; zie de git-geschiedenis van dit bestand voor de vorige versie.
 *
 * Het formulier vraagt alleen om een mailadres, met een verplicht
 * toestemmingsvinkje. Knoptekst en bevestiging ("Dank voor je interesse, je
 * hoort snel van ons over de volgende workshop!") wijzig je in SendFox.
 */
export default function Updates() {
  return (
    <div className="kaart mx-auto max-w-2xl border border-border bg-bg-card p-7 sm:p-9">
      <p className="label-mono text-[11px] text-text-muted">
        Nieuwe data, één mail
      </p>
      <h3 className="display-serif mt-3 text-[1.7rem] leading-tight sm:text-[2rem]">
        Wil je bericht als er een datum bij komt?
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
        We plannen de data voor november en december binnenkort in. Laat je
        mailadres achter, dan hoor je het als eerste. Meer mail sturen we niet.
      </p>

      <div className="mt-6">
        <PijlKnop href={site.formulier} data-cta="updates-formulier">
          Hou me op de hoogte
        </PijlKnop>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-text-muted">
        Het formulier opent op de pagina van SendFox, ons mailprogramma.
        Uitschrijven kan met één klik, en je adres gaat nergens anders heen.
      </p>
    </div>
  );
}
