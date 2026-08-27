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

### Twee uitzonderingen op het beeldrecept

**De fotowand (`Sfeer.tsx`) blijft in volle kleur.** Al het andere beeld gaat
door de warme duotone, maar hier is de energie het argument: het rode licht
van die zaal, het blauw van een dia, een zaal die zwaait. In cognac-duotone
verdwijnt precies dat en is het weer stockbeeld. Zet de `.foto`-klasse daar
dus niet terug bij een volgende veegslag. Zelfde afweging als bij
`SessieFotos` op de hoofdsite.

**De header klapt om boven een donkere hero.** Bovenaan de pagina is de
header transparant; op de homepage ligt daar een donkere foto onder en
verdwijnt het inktkleurige woordmerk erin, terwijl de andere pagina's juist
licht beginnen. De header weet zelf niet op welke pagina hij staat — hij
wordt vóór de inhoud gerenderd — dus de pagina zet een leeg `#donkere-hero`
neer en `globals.css` vindt dat met `:has()`. Een browser zonder `:has()`
houdt de donkere tekst: minder mooi, niet stuk.

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
8. **De gratis sessie is de instap, niet een bijzaak.** Hij staat in de hero,
   in de agenda op zijn datum, en op de detailpagina van de workshop die erop
   voortbouwt. Violet — de merkkleur die maximaal één keer per scherm mag —
   is hier gereserveerd voor het enige item dat niets kost.
9. **Eerlijk over wat er nog niet staat.** Onder de agenda staat een blok dat
   zegt dat de rest van 2026 volgt, met een aanmeldknop. Anders komt iemand
   die in november wil één keer langs en nooit meer terug.

## Contentmodel

`workshops/src/content/workshops.ts` is de bron voor alles wat geld kost;
`workshops/src/content/live.ts` voor de gratis online sessies. Samen vullen ze
de agenda, de detailpagina's, de sitemap, de gestructureerde data en de
koopknoppen.

### Waarom lives een eigen type hebben

Een LinkedIn Live heeft geen ticket, geen prijs, geen zaal en geen maximum
aantal plaatsen, en aanmelden gaat via LinkedIn in plaats van via Stripe. Dat
in het workshopmodel proppen zou elk veld daar optioneel maken, en dan is er
geen model meer. `lib/programma.ts` voegt de twee samen tot één lijst op
datum, met een eigen kaart per soort (`TicketRij` en `LiveRij`).

De agenda toont ze dus door elkaar. Dat is opzet: het programma loopt van
gratis online kennismaken naar een middag op kantoor, en die volgorde ís het
aanbod. Twee losse lijstjes zouden dat verhaal breken. `leidtNaar` op een Live
legt vast welke workshop erop voortbouwt, zodat de verwijzing op beide
plekken verschijnt zonder dat iemand het bijhoudt.

### Bundels

Een bundel (`BUNDELS`) hoort bij twee workshops tegelijk en heeft dus zijn
eigen Payment Link, geen tickettype binnen een sessie. Het voordeel wordt
berekend tegen de losse **enkele** ticketprijs, niet tegen `vanafPrijs`: die
laatste pakt de goedkoopste prijs per persoon en dat is het duo-ticket,
waardoor de bundel er onterecht minder voordelig uitziet.

```
Workshop
 ├─ slug, naam, ondertitel, niveau, duur, kort, intro
 ├─ voorWie[], leerdoelen[], programma[], meenemen[], inbegrepen[]
 ├─ trainer, foto
 └─ sessies[]
     ├─ datum, inloop, start, eind, plaatsen, vrij
     └─ tickets[]  → naam, prijs (excl. btw), personen, stripeLink

Live
 └─ slug, naam, ondertitel, datum, start, eind, platform,
    kort, wat[], aanmeldUrl, leidtNaar

Bundel
 └─ naam, ondertitel, workshops[], prijs, stripeLink
```

`niveau` is `Instap` | `Verdieping` | `Masterclass`. Bij een masterclass toont
de detailpagina automatisch een regel met het adviesadres uit `site.ts`:
"ben ik hier klaar voor" is bij zo'n prijs de vraag die de verkoop tegenhoudt.

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

## De twee apps naast elkaar in één repo

De root-`tsconfig.json` en `eslint.config.mjs` sluiten `workshops/`
uitdrukkelijk uit. Dat is geen netheid maar noodzaak: de `include` van de
root pakt `**/*.ts` en `**/*.tsx` vanaf de repo-root, dus ook
`workshops/src/**`. Die bestanden gebruiken hun eigen `@/`-alias naar
`workshops/src`, terwijl de root `@/` naar `./src` laat wijzen. Zonder de
uitsluiting typecheckt de hoofdsite de workshopsite tegen de verkeerde paden
en valt `next build` om met `Cannot find module '@/components/...'` — precies
de fout waarmee de preview-deploy stukliep.

In `tsconfig.json` staat daar geen toelichting bij, want Next leest dat
bestand als strikte JSON en struikelt over een commentaarblok. Vandaar dat
het hier staat.

Wie later nog een losse app toevoegt, moet die op dezelfde twee plekken
uitsluiten. Elke app bouwt en lint zichzelf: `npm run build` en
`npm run lint` in zijn eigen map.

## Mailaanmelding

`Updates.tsx` laadt het embed-script van SendFox en laat dat zijn eigen
formulier neerzetten. Het script zoekt bij uitvoering zijn eigen
`<script>`-element op, dus we hangen het met de hand in een container in
plaats van het bovenaan de pagina te laden; anders landt het formulier ergens
anders dan bedoeld. Een vlag voorkomt dat een tweede aankoppeling (strict
mode, of heen en terug navigeren) het formulier dubbel neerzet.

De sectie staat direct onder de agenda, op `#updates`. Daar ontstaat de
teleurstelling — je scrolt de data door en er zit niets bij dat schikt — en
daar is het mailadres dus het meest waard. Alle algemene "hou me op de
hoogte"-knoppen wijzen erheen. Wat wél een mailto blijft: de wachtlijst voor
één specifieke volle datum, want die draagt informatie (welke workshop, welke
dag) die een algemene lijst niet kan opslaan.

De opmaak in `globals.css` (`.sendfox-doos`) hangt bewust aan elementen en
niet aan klassenamen van SendFox: die zijn van hen en kunnen morgen anders
zijn. Er staat geen cookiemuur omheen — dit is geen meting maar een formulier
dat de bezoeker zelf invult.

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
