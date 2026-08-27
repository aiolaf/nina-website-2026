# Overzetten naar Hostnet

Hoe `workshops.nina-ai.nl` van Lovable naar onze eigen hosting gaat, en hoe
je daarna een wijziging live zet.

**Doe dit pas als de nieuwe site inhoudelijk klaar is** — dus met de echte
data, de echte prijzen en werkende Stripe-links erin. Tot die tijd blijft de
Lovable-versie gewoon staan; er gaat niets kapot zolang de DNS nog naar
Lovable wijst.

---

## Waarom een statische export

Hostnet levert gewone webhosting: Apache met PHP, geen Node.js. Een Next.js
site die een server nodig heeft draait daar niet. Daarom bouwt deze app met
`output: "export"` (zie `next.config.ts`): `npm run build` maakt een map
`out/` met kant-en-klare HTML, CSS, JS en beeld. Die map is de hele site.

Wat dat betekent voor wie eraan werkt: geen serverfuncties, geen formulieren
die iets opslaan, geen redirects vanuit `next.config.ts`. Redirects regel je
in `.htaccess`, betalen regelt Stripe. Zie `STRIPE.md`.

---

## Deel 1 — Eenmalig klaarzetten (nog niets gaat live)

### 1. Hostingpakket en subdomein

In het Hostnet-controlepaneel:

1. Zorg dat er een webhostingpakket op `nina-ai.nl` staat waar je een
   subdomein aan kunt hangen.
2. Voeg het subdomein **`workshops`** toe.
3. Noteer de **documentroot** die Hostnet aanmaakt. Meestal iets als
   `/domains/nina-ai.nl/public_html/workshops/` of
   `/subsites/workshops.nina-ai.nl/`. Dit is de map waar `out/` in komt.
4. Zet **SSL** aan voor het subdomein (Let's Encrypt, zit bij het pakket).
   Doe dit vóór de DNS-omzetting, dan is het certificaat er zodra het
   verkeer binnenkomt.

### 2. FTP-toegang

Maak in het paneel een **FTP- of SFTP-account** dat alleen bij die
documentroot kan. Kies SFTP als het aangeboden wordt. Noteer host,
gebruikersnaam, wachtwoord en poort, en zet ze in de wachtwoordkluis van het
team — niet in deze repository.

### 3. De site bouwen

```bash
cd workshops
npm install
npm run build
```

Je hebt nu `workshops/out/`. Controleer dat het er goed uitziet voordat je
iets uploadt:

```bash
npx serve out
```

Loop dan door: staan de juiste data erin, werken de koopknoppen, klopt de
prijs, komt de bedankpagina goed. Let op: `npx serve` gedraagt zich net iets
anders dan Apache, dus dit is een inhoudelijke controle, geen bewijs dat de
serverinstellingen kloppen.

### 4. Uploaden naar een testmap

Zet de eerste upload **niet** meteen op de plek van het subdomein, maar in een
tijdelijke map, bijvoorbeeld `/domains/nina-ai.nl/public_html/workshops-test/`,
en bekijk hem op `https://nina-ai.nl/workshops-test/`. Klopt alles, dan pas
de echte plek.

> Op zo'n testpad werken de links naar `/workshop/...` niet, want die gaan uit
> van de root van een domein. Voor een controle op stijl en beeld is het
> genoeg; de echte test is stap 6.

### 5. Uploaden naar de echte plek

Kopieer **de inhoud van `out/`** naar de documentroot van het subdomein — dus
de bestanden zelf, niet de map `out` eromheen. Op het hoogste niveau moet
straks `index.html` staan.

Twee dingen om op te letten:

- **Verborgen bestanden meenemen.** Er zit een `.htaccess` in `out/` met de
  https-redirect, de 404-pagina en de cache-instellingen. FTP-programma's
  verbergen bestanden met een punt standaard. In FileZilla: *Server → Force
  showing hidden files*.
- **Oude bestanden weghalen.** Bij een latere upload laat een simpele
  overschrijf-actie oude workshoppagina's staan. Verwijder de inhoud van de
  documentroot voordat je een nieuwe versie uploadt, of gebruik een
  synchronisatie die verwijdert (`--delete`).

Met `lftp` kan dat in één opdracht (vervang de gegevens):

```bash
lftp -u GEBRUIKER,WACHTWOORD sftp://ftp.hostnet.nl -e "
  mirror -R --delete --verbose --parallel=4 out/ /domains/nina-ai.nl/public_html/workshops/;
  bye"
```

### 6. Testen vóór de omzetting

Zet in je `hosts`-bestand het IP van de Hostnet-server tijdelijk op
`workshops.nina-ai.nl`, zodat alleen jouw computer de nieuwe site ziet
terwijl de rest van de wereld nog bij Lovable uitkomt:

```
# /etc/hosts   (Mac en Linux: sudo nano /etc/hosts)
123.123.123.123  workshops.nina-ai.nl
```

Het IP staat in het Hostnet-paneel bij het pakket. Loop daarna de checklist
onderaan dit document af. Haal de regel weg als je klaar bent.

---

## Deel 2 — De omzetting

Doe dit op een rustig moment, niet op een dag waarop er een workshop is en
niet vlak voor het weekend.

1. **Verlaag de TTL** van de bestaande DNS-record voor `workshops` naar 300
   seconden, minstens een dag van tevoren. Dan is de omzetting straks binnen
   vijf minuten overal doorgekomen in plaats van pas na een dag.
2. **Zet de nieuwe versie klaar** in de documentroot (deel 1, stap 5) en
   controleer hem via de `hosts`-truc (stap 6).
3. **Wijzig het DNS-record** voor `workshops` naar het Hostnet-adres. Staat
   er nu een CNAME naar Lovable, dan wordt dat een A-record naar het IP van
   het pakket, of het CNAME dat Hostnet opgeeft.
4. **Wacht en controleer**: `dig workshops.nina-ai.nl` moet het nieuwe adres
   geven. Open de site in een browser die je nog niet gebruikt hebt, dus
   zonder cache.
5. **Controleer https.** Werkt het certificaat niet meteen, vraag het dan in
   het paneel opnieuw aan; Let's Encrypt kan pas een certificaat afgeven als
   de DNS naar de juiste server wijst.
6. **Zet de TTL weer terug** naar de normale waarde (3600 of hoger).
7. **Laat de Lovable-versie nog een week staan**, zonder hem los te koppelen.
   Als er iets misgaat kun je het DNS-record binnen vijf minuten terugzetten.
   Pas daarna opzeggen.

### Na de omzetting

- Meld de site aan in **Google Search Console** en dien
  `https://workshops.nina-ai.nl/sitemap.xml` in.
- Controleer in **GTM en Google Ads** of de conversie op `/bedankt/` binnenkomt
  door zelf één testbetaling te doen met een Stripe-testkaart.
- Doe **één echte betaling** van een paar euro met een tijdelijk product en
  betaal hem daarna terug. Dat is de enige manier om zeker te weten dat
  iDEAL, de factuur en de bedankpagina alle drie werken.
- Loop de links op nina-ai.nl na die naar de workshops wijzen (`site.workshops`
  in `src/lib/site.ts` van de hoofdsite).

---

## Deel 3 — Een wijziging live zetten

Dit is het dagelijkse ritme, bijvoorbeeld bij een nieuwe datum of als een
workshop bijna vol zit:

```bash
cd workshops
# 1. pas src/content/workshops.ts aan
npm run lint
npm run build
# 2. controleer out/ met npx serve out
# 3. upload de inhoud van out/ naar de documentroot
git add -A && git commit -m "Nieuwe datum voor de Claude Workshop in november"
git push
```

De git-stap hoort erbij, ook als je alleen een getal hebt veranderd: anders
weet niemand meer welke versie er op de server staat.

**Het aantal vrije plekken loopt niet automatisch mee.** Verkoopt een datum
door, dan pas je `vrij` aan en upload je opnieuw. Zet in Stripe ook een
maximum op de Payment Link (zie `STRIPE.md`), dan blijft de site hooguit een
paar dagen achter maar kan er nooit worden overboekt.

### Uploaden met één druk op de knop

Er staat een GitHub Action klaar: `.github/workflows/deploy-workshops.yml`.
Die bouwt de site, controleert dat de export gelukt is en zet hem via FTPS op
Hostnet.

Hij start **niet vanzelf**. Je draait hem met de hand vanuit het tabblad
*Actions* in GitHub. Dat is bewust: zonder de secrets zou elke push een rood
kruisje geven, en deze site is de kassa — een deploy die vertrekt zodra iemand
een komma verandert is hier geen voordeel.

Eenmalig instellen, onder *Settings → Secrets and variables → Actions*:

| Secret | Wat erin hoort |
|---|---|
| `HOSTNET_FTP_HOST` | het FTP- of SFTP-adres van Hostnet |
| `HOSTNET_FTP_USER` | de gebruikersnaam van het FTP-account |
| `HOSTNET_FTP_PASSWORD` | het wachtwoord daarvan |

En in het workflow-bestand zelf: zet `server-dir` op de documentroot die
Hostnet voor het subdomein heeft aangemaakt (stap 1.3 hierboven).

Wil je hem later automatisch laten lopen bij elke wijziging in `workshops/`,
haal dan het commentaar weg bij het `push`-blok bovenin het bestand.


---

## Checklist na elke upload

- [ ] `https://workshops.nina-ai.nl/` opent, met slot in de adresbalk
- [ ] `http://` stuurt door naar `https://`
- [ ] Een workshoppagina opent rechtstreeks, dus zonder eerst via de
      homepage te klikken: `https://workshops.nina-ai.nl/workshop/claude-workshop/`
- [ ] Een adres dat niet bestaat toont onze eigen 404 en niet die van Apache
- [ ] De koopknop opent de juiste Stripe-pagina, met het juiste bedrag
- [ ] Na een testbetaling kom je op `/bedankt/` met de juiste datum erop
- [ ] "Zet in mijn agenda" levert een `.ics` op die in de agenda opent
- [ ] Het aanmeldformulier onder de agenda laadt en een testadres komt
      daadwerkelijk in SendFox binnen
- [ ] De cookiemelding verschijnt en de keuze blijft na een herlading staan
- [ ] Op een telefoon verschijnt de koopbalk onderin bij het scrollen
- [ ] `https://workshops.nina-ai.nl/sitemap.xml` en `/robots.txt` openen
- [ ] Beeld en lettertypen laden (geen kale Times New Roman)
