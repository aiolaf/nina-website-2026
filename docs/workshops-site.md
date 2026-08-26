# De workshopsite (workshops.nina-ai.nl)

Spec van de losse ticketsite in `workshops/`. Lees dit voordat je daar iets
aanpast; de praktische handleidingen staan in `workshops/README.md`,
`workshops/STRIPE.md` en `workshops/DEPLOY-HOSTNET.md`.

## Wat het is

Een **aparte Next.js-app in dezelfde repository**, die als statische export
op Hostnet komt te staan. Hij vervangt de Lovable-pagina op
`workshops.nina-ai.nl`.

Waarom niet gewoon een route in de hoofdsite:

- Ander domein en andere hosting. De hoofdsite draait op een server, deze
  site is een map met HTML-bestanden op gewone webhosting. Eén app kan niet
  allebei zijn zonder de hoofdsite ook statisch te maken, en dat zou daar
  functionaliteit kosten.
- Ander doel. De hoofdsite verkoopt een gesprek en meet aanvragen; deze site
  verkoopt een ticket en meet betalingen. Dat vraagt een andere paginaopbouw
  en andere knoppen.
- De collega moet er los aan kunnen werken zonder de hoofdsite te raken.

Prijs daarvan: de huisstijltokens en een paar componenten (`Reveal`,
`PijlKnop`, `Section`, `CookieBanner`, het consent-script) staan nu twee keer
in de repo. Dat is bewust; wijzig je iets aan de huisstijl, loop dan beide
kanten na. Wordt dat te vaak, dan is een gedeeld pakket het volgende stap —
nu zou dat meer bouwwerk zijn dan het oplevert.

## Stijl

Zelfde huisstijl "Licht" als de hoofdsite: ivoorkleurig papier, inkt als
primaire actiekleur, violet als merkmoment (maximaal één per scherm), Zodiak
als display-letter met cursief als accent, Fragment Mono voor labels en
cijfers, en de warme duotone over alle foto's. De tokens staan in
`workshops/src/app/globals.css`.

Drie elementen zijn nieuw en horen alleen bij deze site, omdat het hier om
een kaartje gaat:

| Klasse | Wat het is |
|---|---|
| `.ticket` | De kaart per datum: datumdeel, geperforeerde scheurlijn met twee ponsgaten, inhoud, prijs en knop. Op mobiel valt hij uit elkaar en wordt de scheurlijn horizontaal (`.ticket-perforatie-h`). |
| `.stempel` | Datums en bedragen in mono met `tabular-nums`, zodat cijfers in een lijst recht onder elkaar staan. |
| `.koopbalk` | De vaste balk onderin op mobiel. Verschijnt na de eerste schermhoogte, verdwijnt zodra de agenda in beeld komt, en wijkt voor de cookiemelding. |

De ponsgaten van `.ticket` krijgen de kleur van de sectie-achtergrond. Staat
een kaart op een `bg-bg-alt`-sectie, geef dan `ticket-op-alt` mee, anders zijn
het twee lichte vlekken.

## Conversie-uitgangspunten

Deze staan vast; wijk er niet van af zonder aanleiding uit de cijfers.

1. **De agenda staat direct onder de hero**, vóór de uitleg over de
   workshops. Wie al overtuigd binnenkomt hoeft niet eerst door
   overtuigingswerk heen.
2. **De prijs is altijd zichtbaar**, ook bij een uitverkochte datum en bij een
   datum waarvan de Stripe-link nog ontbreekt. Alleen de knop verandert.
3. **De laagste prijs staat vooraan.** De knop toont de prijs per persoon van
   het gewone ticket; het duo-ticket staat als tweede, kleinere knop eronder.
4. **Schaarste alleen als hij echt is.** Een chip verschijnt pas onder de vijf
   vrije plekken (`SCHAARS_VANAF`) en noemt dan het werkelijke aantal. Bij een
   ruime sessie staat er geen aantal, want "nog 12 plekken" leest als
   "niemand heeft geboekt".
5. **Eén klik van kaartje naar betaalscherm.** De koopknop is een gewone link
   naar de Stripe Payment Link, zonder tussenpagina en zonder `target`.
6. **De header heeft drie links.** Elke extra link is een afslag weg van de
   kassa. De enige uitgaande links staan in de footer en in het blok "met het
   hele team", onderaan.
7. **Geen verzonnen bewijs.** `src/content/reviews.ts` is leeg en het
   reviewblok rendert dan niets. Liever geen sectie dan een quote met een
   verzonnen naam eronder.

## Contentmodel

`workshops/src/content/workshops.ts` is de enige bron van waarheid: de agenda,
de detailpagina's, de sitemap, de gestructureerde data en de koopknoppen komen
er allemaal uit.

```
Workshop
 ├─ slug, naam, ondertitel, niveau, duur, kort, intro
 ├─ voorWie[], leerdoelen[], programma[], meenemen[], inbegrepen[]
 ├─ trainer, foto
 └─ sessies[]
     ├─ datum, start, eind, plaatsen, vrij
     └─ tickets[]  → naam, prijs (excl. btw), personen, stripeLink
```

Een sessie heeft vier toestanden, afgeleid in `sessieStatus()`:

- **open** — te koop, ruim plek
- **schaars** — te koop, vier plekken of minder
- **uitverkocht** — `vrij` is 0, of de datum is geweest
- **binnenkort** — datum staat vast, `stripeLink` is nog leeg

Die laatste toestand is er met opzet: zo kun je data aankondigen voordat de
betaallinks bestaan, zonder een dode knop op de pagina.

`vrij` wordt met de hand bijgehouden. Er is geen koppeling met Stripe die dat
live doet; het vangnet tegen overboeken is de voorraadlimiet op de Payment
Link zelf.

## Betalen

Stripe Payment Links: één link per tickettype per datum. Er is geen backend,
dus geen eigen checkout en geen webhook. De volledige inrichting staat in
`workshops/STRIPE.md`.

De `success_url` van elke link moet
`/bedankt/?w=<slug>&d=<jjjj-mm-dd>` zijn. Die twee parameters vullen de
bevestigingspagina met de juiste datum, locatie, meeneemlijst en een
agendabestand. Ontbreken ze, dan valt de pagina terug op een algemene tekst —
nooit op een foutmelding, want dit is het eerste wat iemand na het betalen
ziet.

## Meten

- `begin_checkout` in de dataLayer bij elke koopklik, met workshop, datum,
  tickettype, prijs en de plek op de pagina (`agenda`, `ticketbox`,
  `koopbalk`). Zo zie je welke plek de verkoop maakt.
- `/bedankt/` is het conversiepunt: die pagina is alleen na een geslaagde
  betaling bereikbaar. Daar hangt de Google Ads-conversie aan.
- Het bedrag komt niet mee naar de bedankpagina; omzet per workshop haal je
  uit Stripe.
- Dezelfde GTM-container als de hoofdsite (`workshops/src/lib/gtm.ts`), met
  hetzelfde Consent Mode-gedrag: alles op geweigerd tot de bezoeker kiest.

## Randvoorwaarden van een statische export

Wat hier **niet** kan, en wat je in de plaats gebruikt:

| Werkt niet | In plaats daarvan |
|---|---|
| Redirects en headers in `next.config.ts` | `workshops/public/.htaccess` |
| Route handlers die een request lezen | niets; anders is een backend nodig |
| Server actions, formulieren die opslaan | Stripe Checkout, of een mailto |
| `next/image` met de standaard-loader | `images.unoptimized`, dus zelf webp aanleveren op ~1600px |
| `useSearchParams` zonder Suspense-grens | `useSyncExternalStore` op `window.location` |
| `sitemap.ts` / `robots.ts` zonder meer | met `export const dynamic = "force-static"` |
