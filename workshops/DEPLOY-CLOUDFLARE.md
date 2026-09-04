# Overzetten naar Cloudflare Pages

Hoe `workshops.nina-ai.nl` van Lovable naar Cloudflare Pages gaat, en hoe je
daarna een wijziging live zet.

**De site staat live sinds 4 september 2026.** De Stripe-links ontbraken op
dat moment nog: de site toont elke datum als *binnenkort in de verkoop* met de
wachtlijst. Zodra de links in `workshops.ts` staan en gepusht zijn, gaat de
kassa open — zie `STRIPE.md`.

---

## Waarom niet bij Hostnet

Dat was het oorspronkelijke plan, en het bleek niet te kunnen: `nina-ai.nl`
heeft bij Hostnet alleen een **E-mail Start**-pakket, geen webhosting. Dus geen
documentroot, geen FTP, geen plek om `out/` te zetten. En bij Hostnet hangt één
webhostingpakket aan precies één domein — "Koppel andere domeinnaam" verhuist
een pakket, het voegt er geen domein aan toe.

Hostnet blijft wel de **domeinnaam en de DNS** beheren. Dat verandert niet.

Cloudflare Pages publiceert de statische export gratis, ook voor commercieel
gebruik, geeft zelf een certificaat af en bouwt bij elke push. Er zijn geen
FTP-gegevens meer nodig, dus ook geen wachtwoorden in GitHub-secrets.

## Waarom een statische export

`next.config.ts` staat op `output: "export"`: `npm run build` maakt een map
`out/` met kant-en-klare HTML, CSS, JS en beeld. Die map is de hele site.

Wat dat betekent voor wie eraan werkt: geen serverfuncties, geen formulieren
die zelf iets opslaan, geen redirects vanuit `next.config.ts`. Headers en
omleidingen staan in `public/_headers` en `public/_redirects`; betalen regelt
Stripe. Zie `STRIPE.md`.

Twee eigenaardigheden van die twee bestanden, want ze lezen anders dan ze
werken. In `_headers` **stapelen** de patronen: matcht een verzoek op twee
regels, dan krijgt het de headers van beide, en dezelfde header twee keer
wordt met een komma aan elkaar geplakt. Het specifiekere pad wint niet. En
`_redirects` kan **niet** omleiden per hostnaam; een regel met
`https://www.…` erin doet niets. De bestanden zelf leggen dat ook uit, op de
plek waar het misgaat.

---

## Deel 1 — Eenmalig klaarzetten (nog niets gaat live)

### 1. De site lokaal nalopen

```bash
cd workshops
npm install
npm run build
npm run start        # bekijkt out/ op http://localhost:3000
```

Loop door: staan de juiste data erin, werken de koopknoppen, klopt de prijs,
komt de bedankpagina goed. `npm run start` is een inhoudelijke controle, geen
bewijs dat de serverinstellingen kloppen — dat is stap 3.

### 2. Het Pages-project aanmaken

**Gedaan op 4 september 2026.** Het project heet `nina-workshops`, de
productie-URL is `https://nina-workshops.pages.dev`, en het staat in het
Cloudflare-account van `olaf@nina-ai.nl`. Onderstaande stappen zijn dus alleen
nog nodig als het project ooit opnieuw moet.

> In hetzelfde account staat ook een **Worker** `nina-website-2026`, per
> ongeluk aangemaakt bij de eerste poging (Workers & Pages → Create kiest
> standaard Workers). Die bouwt bij elke push mee en verbruikt bouwminuten,
> maar doet verder niets. Kan weg: Workers & Pages → nina-website-2026 →
> Settings → Delete. Een Worker had hier ook niet gekund: een custom domain op
> een Worker vereist dat het hele domein bij Cloudflare staat, en `nina-ai.nl`
> blijft bij Hostnet.

In het Cloudflare-dashboard: **Workers & Pages → Create → Pages → Connect to
Git**, en kies de repository `aiolaf/nina-website-2026`.

Vul deze bouwinstellingen in. De middelste twee zijn de gebruikelijke
struikelblokken:

| Instelling | Waarde |
|---|---|
| Project name | `nina-workshops` |
| Production branch | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory (advanced) | `workshops` |

**Root directory** moet op `workshops` staan. Zonder dat bouwt Cloudflare de
hoofdsite in de repository-root, en die is geen statische export.

De Node-versie komt uit `workshops/.nvmrc`. Werkt dat niet, zet dan een
environment variable `NODE_VERSION` op `22`.

Er zijn **geen secrets of environment variables** nodig. Alle content zit in de
repository, betalen loopt via gehoste Stripe-links.

### 3. Testen op het pages.dev-adres

Je krijgt een adres als `nina-workshops.pages.dev`. **Hier zit de winst van
deze route**: je kunt de hele site echt testen, op een echte server, met een
echt certificaat, terwijl `workshops.nina-ai.nl` nog gewoon bij Lovable staat.
De `hosts`-truc uit het oude draaiboek is niet meer nodig.

Loop de checklist onderaan dit document af op het pages.dev-adres. Twee dingen
zien er daar met opzet anders uit:

- De canonical-tags en de sitemap noemen `workshops.nina-ai.nl`, niet
  `pages.dev`. Dat is goed; `src/lib/site.ts` hoort het echte adres te noemen.
- Een adres onder `www.workshops` bestaat niet. Dat blijft zo: Pages kan niet
  omleiden per hostnaam, dus we hangen die host niet aan het project en houden
  het bij één canonieke naam.

Elke pull request krijgt ook een eigen preview-adres. Handig om een nieuwe
datum of prijs te laten meelezen voordat hij op `main` staat.

---

## Deel 2 — De omzetting

**Gedaan op 4 september 2026, rond 16:15.** Het A-record naar Lovable is
vervangen door de CNAME naar `nina-workshops.pages.dev`; het custom domain in
Pages staat op *Active, SSL enabled*. Lovable staat er nog, opzeggen kan na
een week. Onderstaande stappen zijn dus voor als het ooit opnieuw moet.

> **Wat het draaiboek niet had voorzien.** Lovable draait óók op Cloudflare.
> Na de DNS-wijziging bleef `workshops.nina-ai.nl` daarom ruim een half uur de
> Lovable-site tonen, met een geldig certificaat, terwijl Pages *Inactive
> (Requires DNS setup)* meldde. Eén hostnaam kan maar in één Cloudflare-account
> actief zijn, en Lovable had hem nog geclaimd. Cloudflare controleert die
> claim periodiek; zodra hij zag dat de CNAME niet meer naar Lovable wees, liet
> hij hem los en sprong Pages vanzelf op *Active*. Er was dus niets kapot en
> niets te doen — alleen wachten. Sneller had gekund door in Lovable het domein
> los te koppelen vóór de DNS-wijziging.

Doe dit op een rustig moment, niet op een dag waarop er een workshop is en niet
vlak voor het weekend.

**Bewaar dit getal:** het huidige A-record voor `workshops` is `185.158.133.1`
(Lovable). Daarmee kun je binnen vijf minuten terug.

1. **De TTL hoef je niet te verlagen.** Het record voor `workshops` staat al op
   600 seconden, en dat is de laagste waarde die Hostnet aanbiedt (de keuze is
   600, 3600, 14400 of 86400). De omzetting is dus binnen tien minuten overal
   doorgekomen. Ook fijn bij een terugval.
2. **Voeg het custom domain toe** in Pages: project → **Custom domains → Set up
   a domain →** `workshops.nina-ai.nl`. Cloudflare ziet dat `nina-ai.nl` niet in
   dit account staat en geeft daarom een **CNAME-doel** op, meestal
   `nina-workshops.pages.dev`. Noteer dat precies.
3. **Wijzig het DNS-record bij Hostnet** (Domeinnamen → nina-ai.nl →
   DNS-beheer): haal het A-record voor `workshops` weg en zet er een CNAME neer
   naar het doel uit stap 2.
4. **Wacht en controleer.** `dig workshops.nina-ai.nl` moet het pages.dev-adres
   teruggeven. In Pages springt het domein daarna van *Pending* naar *Active*.
5. **Controleer https.** Cloudflare vraagt het certificaat pas aan als de DNS
   naar het project wijst; dat duurt meestal een paar minuten en soms een uur.
   Zolang het niet klaar is krijgt een bezoeker een certificaatwaarschuwing —
   nog een reden om dit niet op een workshopdag te doen.
6. **Zet de TTL op 3600** zodra het een dag goed staat. Tot die tijd houdt 600
   de weg terug open.
7. **Laat de Lovable-versie nog een week staan**, zonder hem los te koppelen.
   Gaat er iets mis, dan zet je het A-record terug op `185.158.133.1` en ben je
   binnen vijf minuten weer in de lucht. Pas daarna opzeggen.

### Na de omzetting

- Meld de site aan in **Google Search Console** en dien
  `https://workshops.nina-ai.nl/sitemap.xml` in.
- Controleer in **GTM en Google Ads** of de conversie op `/bedankt/` binnenkomt
  door zelf één testbetaling te doen met een Stripe-testkaart.
- Doe **één echte betaling** van een paar euro met een tijdelijk product en
  betaal hem daarna terug. Dat is de enige manier om zeker te weten dat iDEAL,
  de factuur en de bedankpagina alle drie werken.
- Loop de links op nina-ai.nl na die naar de workshops wijzen
  (`site.workshops` in `src/lib/site.ts` van de hoofdsite).

---

## Deel 3 — Een wijziging live zetten

Dit is het dagelijkse ritme, bijvoorbeeld bij een nieuwe datum of als een
workshop bijna vol zit:

```bash
cd workshops
# 1. pas src/content/workshops.ts aan
npm run lint
npm run build        # controleer out/ met npm run start
git add -A && git commit -m "Nieuwe datum voor de Claude Workshop in november"
git push
```

Staat het op `main`, dan bouwt Cloudflare Pages binnen een paar minuten en
publiceert het resultaat zelf. Uploaden hoeft niet meer; er is geen knop om in
te drukken.

Twee dingen die daarbij horen:

- `.github/workflows/ci-workshops.yml` bouwt dezelfde site nog een keer in
  GitHub en controleert of de export compleet is. Rood kruisje daar betekent
  dat de Pages-build ook stuk is.
- Ging er iets mis, dan zet je in het Pages-dashboard bij **Deployments** de
  vorige versie terug met *Rollback*. Dat werkt sneller dan een revert pushen.

**Het aantal vrije plekken loopt niet automatisch mee.** Verkoopt een datum
door, dan pas je `vrij` aan en push je. Zet in Stripe ook een maximum op de
Payment Link (zie `STRIPE.md`), dan blijft de site hooguit een paar dagen
achter maar kan er nooit worden overboekt.

---

## Checklist na de omzetting

- [ ] `https://workshops.nina-ai.nl/` opent, met slot in de adresbalk
- [ ] `http://` stuurt door naar `https://`
- [ ] Een workshoppagina opent rechtstreeks, dus zonder eerst via de homepage
      te klikken: `https://workshops.nina-ai.nl/workshop/claude-workshop/`
- [ ] Een adres dat niet bestaat toont onze eigen 404
- [ ] `curl -sI https://workshops.nina-ai.nl/` geeft één `cache-control`, met
      `max-age=0, must-revalidate`, en een JS-bestand onder `/_next/static/`
      geeft `max-age=31536000`. Staan er twee waarden achter elkaar in één
      header, dan zet `_headers` dezelfde header onder twee patronen.
- [ ] De koopknop opent de juiste Stripe-pagina, met het juiste bedrag
- [ ] Na een testbetaling kom je op `/bedankt/` met de juiste datum erop
- [ ] "Zet in mijn agenda" levert een `.ics` op die in de agenda opent
- [ ] Het aanmeldformulier onder de agenda laadt en een testadres komt
      daadwerkelijk in SendFox binnen
- [ ] De cookiemelding verschijnt en de keuze blijft na een herlading staan
- [ ] Op een telefoon verschijnt de koopbalk onderin bij het scrollen
- [ ] `https://workshops.nina-ai.nl/sitemap.xml` en `/robots.txt` openen
- [ ] Beeld en lettertypen laden (geen kale Times New Roman)
