# workshops.nina-ai.nl

De ticketsite voor de open AI-workshops op ons kantoor in Amsterdam. Vervangt
de huidige Lovable-pagina.

Dit is een **losse app naast de hoofdsite**, in dezelfde repository. De
hoofdsite (`/src`) blijft ongemoeid: die draait op een server, deze site
wordt een map met HTML-bestanden die op Hostnet komt te staan.

| | Hoofdsite | Deze site |
|---|---|---|
| Domein | nina-ai.nl | workshops.nina-ai.nl |
| Doel | een gesprek | een verkocht ticket |
| Hosting | server | Hostnet, statische bestanden |
| Bouwen | `npm run build` in de root | `npm run build` in `workshops/` |

## Aan de slag

```bash
cd workshops
npm install
npm run dev      # http://localhost:3001
```

De hoofdsite draait op poort 3000, deze op 3001, dus je kunt ze naast elkaar
open hebben.

```bash
npm run build    # schrijft de complete site naar workshops/out/
npm run lint
npm run start    # bekijkt out/ zoals hij straks op Hostnet staat
```

## Waar wat staat

```
src/content/workshops.ts   ← de workshops, de data, de prijzen, de Stripe-links
src/content/live.ts        ← de gratis LinkedIn Lives (geen ticket, geen prijs)
src/content/reviews.ts     ← quotes van deelnemers (nu nog leeg, met opzet)
src/components/sections/Updates.tsx  ← het SendFox-aanmeldformulier
src/lib/site.ts            ← adres, mailadres, KVK, beoordelingscijfer
src/lib/programma.ts       ← voegt lives en workshops samen tot één agenda
src/app/page.tsx           ← de homepage
src/app/workshop/[slug]/   ← één pagina per workshop, automatisch
src/components/            ← de bouwstenen
docs → ../docs/workshops-site.md, STRIPE.md, DEPLOY-HOSTNET.md
```

**Negen van de tien wijzigingen zitten in `src/content/workshops.ts`.** Een
datum toevoegen, een prijs aanpassen, een workshop uit de verkoop halen: dat
is dat ene bestand, en de rest van de site past zich aan. De agenda op de
homepage, de detailpagina, de sitemap, de gestructureerde data voor Google en
de knop naar Stripe komen er allemaal uit.

## Wat je moet weten voordat je iets verandert

**De root sluit deze map uit.** `tsconfig.json` en `eslint.config.mjs` in de
repo-root hebben `workshops` in hun exclude staan. Zonder dat typecheckt de
hoofdsite deze app tegen zijn eigen `@/`-alias en valt de deploy van
nina-ai.nl om. Bouw en lint deze app dus altijd vanuit `workshops/` zelf.

**Er is geen server.** De site wordt gebouwd tot losse HTML-bestanden. Dus:
geen formulieren die iets opslaan, geen inlog, geen API-routes, geen
database. Betalen loopt daarom via Stripe Payment Links: die zijn gehost door
Stripe zelf en werken vanaf een statische pagina.

**Elke wijziging vraagt om een nieuwe build en een nieuwe upload.** Ook een
gewijzigd aantal vrije plekken. Zie `DEPLOY-HOSTNET.md`.

**Het aantal vrije plekken bij houden we met de hand bij** (`vrij` per
sessie). Er is geen koppeling die dat live uit Stripe haalt. Werkbaar bij een
handvol data per maand; wordt dat te veel, dan is dat het moment om over een
echte backend na te denken — niet eerder.

## Het programma dat er nu in staat

| Datum | Wat | Prijs |
|---|---|---|
| wo 2 september | Je Second Brain voor AI — gratis LinkedIn Live, online | gratis |
| do 1 oktober | Claude Workshop — Cowork, Code & Skills | € 399 |
| wo 7 oktober | Je Second Brain voor AI — bouwt voort op de Live | € 399 |
| do 22 oktober | Claude Pro Workshop — Skills, Connectors, MCP, agents | € 399 |

Plus twee bundels, allebei exclusief btw:

| Bundel | Wat erin zit | Prijs | Los |
|---|---|---|---|
| Claude Complete | Claude Workshop + Claude Pro | € 750 | € 798 |
| Het hele programma | alle drie de workshops | € 999 | € 1.197 |

En een blok onder de agenda dat zegt dat de rest van 2026 volgt, met een
aanmeldknop. De data van november en december zet je erbij in
`src/content/workshops.ts`.

Er is één tickettype per sessie. Wil je toch een duo- of groepsticket, voeg
dan een tweede ticket toe met `personen: 2`; de site rekent de prijs per
persoon zelf uit en zet hem als tweede knop onder de eerste.

## Wat er nog moet gebeuren voordat dit live kan

- [ ] **Nalopen wat er is overgenomen.** De data en de prijzen komen van
      Olaf en kloppen. De programmablokken en de beschrijvingen komen van de
      huidige site en uit zoekresultaten. In `src/content/workshops.ts`,
      `src/content/live.ts` en `src/lib/site.ts` staan blokken met
      `TE BEVESTIGEN` die precies zeggen wat er gecontroleerd moet worden.
- [ ] Titel en tijden van de LinkedIn Live van 2 september (`src/content/live.ts`)
- [ ] Stripe Payment Links aanmaken en invullen, ook voor de bundel (zie
      `STRIPE.md`)
- [ ] Echte deelnemersquotes in `src/content/reviews.ts`
- [ ] Btw-nummer invullen in `src/lib/site.ts`
- [ ] `workshops@nina-ai.nl` laten bestaan, of vervangen door een adres dat
      bestaat (staat in `src/lib/site.ts`)
- [ ] De deelnamevoorwaarden laten nakijken (zie de waarschuwing bovenaan
      `src/app/voorwaarden/page.tsx`)
- [ ] Een eigen og-afbeelding voor deze site (nu geen, dus een gedeelde link
      toont alleen tekst)
- [ ] Beslissen of de meting in dezelfde GTM-container blijft
      (`src/lib/gtm.ts`)
- [ ] Het SendFox-formulier één keer in een echte browser controleren. Het
      script komt van `cdn.sendfox.com` en is hier niet te bereiken, dus de
      opmaak ervan is op de tast gedaan (zie `.sendfox-doos` in
      `globals.css`). Meld je één keer aan met een testadres en kijk of hij
      binnenkomt op lijst `3qoqw6`.

## Stijl

Zelfde huisstijl als nina-ai.nl: ivoorkleurig papier, inkt als hoofdkleur,
violet als merkmoment (maximaal één per scherm), Zodiak als display-letter,
een warme duotone over al het beeld. De tokens en de recepten staan in
`src/app/globals.css`, met per blok een toelichting.

Drie dingen zijn nieuw en alleen van deze site, omdat het hier om een kaartje
gaat en niet om een aanvraag:

- `.ticket` — de kaart met een geperforeerde afscheurrand en twee ponsgaten
- `.stempel` — het datumblok in mono-cijfers
- `.koopbalk` — de vaste balk onderin op mobiel

## Conversie: hoe de pagina is opgebouwd

De volgorde op de homepage is geen smaakkwestie:

1. **Hero** met de gratis Live erin als laagste drempel
2. **Agenda** — direct daarna, nog vóór de uitleg. Gratis en betaald door
   elkaar, op datum, want die volgorde ís het aanbod
3. **Bundel** — de tweede workshop verkopen aan wie de eerste overweegt
4. **Logo's** — wie zaten hier eerder
5. **De workshops** — voor wie nog moet kiezen
6. **Hoe een middag loopt** — de belofte concreet gemaakt
7. **Reviews** (zodra ze er zijn)
8. **Praktisch** — waar, hoe kom ik er, wat is inbegrepen
9. **Team op maat** — de tweede, grotere conversie
10. **Vragen** — de laatste twijfels wegnemen
11. **Terug naar de agenda**

Op mobiel staat er vanaf de tweede schermhoogte een vaste koopbalk onderin,
die weer verdwijnt zodra de agenda in beeld komt.
