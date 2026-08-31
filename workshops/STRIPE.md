# Stripe koppelen

De site heeft geen server, dus geen eigen betaalafhandeling. Betalen loopt via
**Stripe Payment Links**: een betaalpagina die Stripe host, waar je met een
gewone link naartoe stuurt. Dat is precies wat een statische site nodig heeft,
en het scheelt dat wij nooit betaalgegevens aanraken.

Eén Payment Link is één product op één datum. Draait de Claude Workshop op 1
oktober en nog eens in november, dan zijn dat twee links.

## Eenmalig instellen

1. **Stripe-account op naam van NinA AI B.V.**, met het KVK-nummer en het
   IBAN waarop de omzet binnenkomt.
2. **Betaalmethoden aanzetten**: iDEAL, creditcard en Bancontact. iDEAL is in
   Nederland verreweg de belangrijkste; zonder iDEAL verlies je kopers.
3. **Btw aanzetten** onder *Tax settings*. Zet Nederland als vestiging en
   registreer het btw-nummer. Kies **"prices are exclusive of tax"**: de
   prijzen op de site staan exclusief btw, dus Stripe moet er 21% bovenop
   rekenen en niet uit halen.
4. **Automatische facturen aanzetten** (*Customer emails → Successful
   payments*, plus *Invoicing*). De koper hoort direct een factuur met
   btw-specificatie in zijn mailbox te krijgen; dat is voor een zakelijke
   koper de reden dat hij het kan declareren.
5. **Merk instellen** onder *Branding*: logo, en als accentkleur `#0C0E18`
   met `#9952E0` als knopkleur. Het betaalscherm moet niet als een andere
   site voelen dan waar iemand vandaan komt.

## Een Payment Link per datum

Voor elke datum, per tickettype:

1. **Product**: `Claude Workshop — donderdag 1 oktober 2026`. Zet de datum in
   de productnaam. Die naam staat op de factuur en in de mail; "Claude
   Workshop" alleen is over drie maanden niet meer terug te vinden.
2. **Prijs**: het bedrag exclusief btw, zoals het in `workshops.ts` staat.
   Eenmalig, EUR.
3. **Aantal beperken**: zet onder *Inventory / limit* het aantal beschikbare
   tickets gelijk aan `vrij`. Dan sluit Stripe de verkoop zelf zodra het vol
   is — dat is je vangnet voor het geval je de site niet op tijd bijwerkt.
4. **Aantal aanpasbaar**: aan zetten, met een maximum. Iemand die met drie
   collega's komt hoeft dan niet drie keer af te rekenen.
5. **Gegevens verzamelen**:
   - naam en mailadres (staat standaard aan)
   - bedrijfsnaam
   - factuuradres
   - een eigen veld *"Naam van de deelnemer(s), als dat iemand anders is"*
   - een eigen veld *"Dieetwensen"* — er is iets te eten in de pauze en een
     borrel, dus dit voorkomt gedoe
   - een eigen veld *"Inkoop- of referentienummer"* — optioneel, scheelt
     later heen-en-weer over facturen
6. **Kortingscodes toestaan**: aan. Handig voor een vroegboekactie of een
   code voor bestaande klanten.
7. **Na de betaling**: kies *Redirect to your website* en zet daar:

   ```
   https://workshops.nina-ai.nl/bedankt/?w=<slug>&d=<jjjj-mm-dd>
   ```

   Dus voor de Claude Workshop op 1 oktober 2026:

   ```
   https://workshops.nina-ai.nl/bedankt/?w=claude-workshop&d=2026-10-01
   ```

   De slug is hetzelfde veld `slug` als in `workshops.ts`. Met die twee
   parameters toont de bedankpagina de juiste datum, de locatie, wat je moet
   meenemen, en een knop die de afspraak in de agenda zet. Zonder de
   parameters werkt de pagina ook, maar dan met een algemene tekst.

8. **Kopieer de link** (`https://buy.stripe.com/...`) en zet hem in
   `src/content/workshops.ts` bij het juiste ticket:

   ```ts
   {
     naam: "Ticket",
     prijs: 399,
     personen: 1,
     stripeLink: "https://buy.stripe.com/xxxxxxxxxxxx",
     uitgelicht: true,
   }
   ```

9. **Committen en pushen.** Pages bouwt zelf. Zie `DEPLOY-CLOUDFLARE.md`.

## De bundels

Er zijn er twee, allebei één Payment Link die meerdere datums tegelijk dekt:

| Bundel | Wat erin zit | Prijs excl. btw |
|---|---|---|
| Claude Complete | Claude Workshop + Claude Pro | € 750 |
| Het hele programma | alle drie de workshops | € 999 |

Zet de datums in de productnaam (`Claude Complete — 1 en 22 oktober 2026`) en
de voorraadlimiet op het laagste aantal vrije plekken van de sessies die
erin zitten. De success_url wijst naar de eerste datum van de bundel:

```
https://workshops.nina-ai.nl/bedankt/?w=claude-workshop&d=2026-10-01
```

Zet de links in `BUNDELS` in `src/content/workshops.ts`.

**Let op bij een bundelverkoop**: die bezet een stoel in elke sessie die
erin zit. Haal `vrij` dus bij allemaal omlaag, en houd er rekening mee dat de
voorraadlimiet van de losse Payment Links daar niets van weet. Verkoop je er
veel, zet de limiet op de losse links dan wat lager dan het aantal stoelen.

## Gratis sessies gaan niet via Stripe

De LinkedIn Lives staan in `src/content/live.ts` en verwijzen rechtstreeks
naar het LinkedIn-event. Daar is niets aan in te stellen in Stripe. Wat je wel
wilt: in GTM een aparte trigger op het `generate_lead`-event dat de site
stuurt bij een klik op "Meld je aan". Dat is de goedkoopste lead die deze site
oplevert en het is zonde om hem niet te tellen.

## Een datum zonder betaallink

Een ticket met `stripeLink: ""` is geen fout. De site toont die datum dan als
*binnenkort in de verkoop*, met de prijs erbij en een knop naar de wachtlijst
in plaats van naar Stripe. Zo kun je een datum alvast aankondigen terwijl je
de links nog aanmaakt.

## Waar de cancel-url naartoe moet

Stripe stuurt iemand die op het betaalscherm terugklikt standaard terug naar
de pagina waar hij vandaan kwam. Kun je die instellen, gebruik dan:

```
https://workshops.nina-ai.nl/betaling-afgebroken/
```

Die pagina zegt dat er niets is afgeschreven en biedt de drie routes die er
op dat moment toe doen: opnieuw proberen, op factuur betalen, of met het hele
team komen.

## Meten of het werkt

- **Gratis aanmelding**: een klik op "Meld je aan" bij een LinkedIn Live
  stuurt `generate_lead` met de naam en datum van de sessie.
- **Klik naar Stripe**: de site stuurt bij elke koopknop een `begin_checkout`
  in de dataLayer, met workshop, datum, tickettype, prijs en de plek op de
  pagina waar geklikt is (`agenda`, `ticketbox`, `koopbalk`). Zo zie je welke
  plek de verkoop maakt.
- **Geslaagde betaling**: `/bedankt/` wordt alleen bereikt na een geslaagde
  betaling. Maak daar in GTM een trigger van (paginaweergave, URL bevat
  `/bedankt`) en koppel die als conversie aan Google Ads. Dat is de enige
  betrouwbare koopconversie die deze site kan meten.
- **Omzet per workshop** haal je uit Stripe zelf, niet uit GA4: het bedrag
  komt niet mee naar de bedankpagina.

De GTM-container staat in `src/lib/gtm.ts` en is nu dezelfde als die van
nina-ai.nl. Wil je de workshopdata gescheiden houden, maak dan een tweede
container en wissel alleen dat ID.

## Terugbetalen en annuleringen

De voorwaarden op de site beloven kosteloos annuleren tot 14 dagen vooraf. Dat
doe je met de hand in Stripe (*Payments → refund*). Vergeet daarna niet `vrij`
in `workshops.ts` weer op te hogen en opnieuw te uploaden, anders staat de
plek niet terug in de verkoop.
