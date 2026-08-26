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
src/content/reviews.ts     ← quotes van deelnemers (nu nog leeg, met opzet)
src/lib/site.ts            ← adres, mailadres, KVK, beoordelingscijfer
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

## Wat er nog moet gebeuren voordat dit live kan

- [ ] De echte workshops, data en prijzen in `src/content/workshops.ts`
- [ ] Stripe Payment Links aanmaken en invullen (zie `STRIPE.md`)
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

1. **Hero** met de eerstvolgende datum erin
2. **Agenda** — direct daarna, nog vóór de uitleg. Wie al overtuigd
   binnenkomt hoeft niet door drie secties heen te scrollen
3. **Logo's** — wie zaten hier eerder
4. **De vier workshops** — voor wie nog moet kiezen
5. **Hoe een dag loopt** — de belofte concreet gemaakt
6. **Reviews** (zodra ze er zijn)
7. **Praktisch** — waar, hoe kom ik er, wat is inbegrepen
8. **Team op maat** — de tweede, grotere conversie
9. **Vragen** — de laatste twijfels wegnemen
10. **Terug naar de agenda**

Op mobiel staat er vanaf de tweede schermhoogte een vaste koopbalk onderin,
die weer verdwijnt zodra de agenda in beeld komt.
