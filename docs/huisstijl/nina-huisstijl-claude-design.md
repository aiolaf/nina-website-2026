# NinA AI · Huisstijl "Licht" (Legora-esthetiek met NinA-accenten)

Dit is het design-fundament voor alle visuele output van NinA AI Agency in de lichte stijl: website-componenten, nieuwsbrief-afbeeldingen, landingspagina's en presentatiebeelden. Hanteer dit systeem strikt. De basis is de rustige, editorial premium-stijl van moderne SaaS-merken (Legora-esthetiek). NinA is aanwezig in kleine, bewuste momenten: de inktkleur, het violet, het goud en de donkere merk-secties.

## 1. Kernprincipes

1. Rust boven drukte. Veel witruimte, weinig elementen per scherm, één boodschap per sectie.
2. Editorial, niet corporate. Grote dunne serif-koppen, cinematografische fotografie, mono-labels als bijschriften.
3. Data voelt vakkundig. Cijfers, chips en tabellen altijd in mono, altijd met eenheid.
4. NinA-momenten zijn schaars. Violet verschijnt hooguit één keer per scherm. Goud nog zeldzamer. Dat maakt ze waardevol.
5. Eerlijk en concreet. Expected scenario leidend, nooit de best case. Geen beloftes van 100 procent.

## 2. Kleuren

### Basis (licht, leidend)

| Token | Hex | Gebruik |
|---|---|---|
| --bg-page | #f4f2ee | Warm off-white, paginabasis |
| --bg-card | rgba(255,255,255,0.72) | Glassmorphism-kaarten |
| --bg-card-solid | #fbfaf8 | Binnenkaarten, rijen |
| --ink | #0c0e18 | Koppen en primaire tekst (NinA-donker als inkt) |
| --ink-muted | #6b6b70 | Subtekst, labels, metadata |
| --border | rgba(12,14,24,0.08) | Randen, scheidingslijnen |
| --chip-bg | #f0ede6 | Chips, pills, zachte vlakken |

### NinA merk-accenten (klein, bewust)

| Token | Hex | Gebruik |
|---|---|---|
| --violet | #9952e0 | Enig merk-accent: links, actieve states, badges "NinA bouwt", strategic-items, handgeschreven annotaties, de afsluitende CTA-sectie. Maximaal één violet-moment per scherm. |
| --violet-light | #bf80ff | Hover-states op violet, subtiele gradienten |
| --gold | #fde68b | Zeldzame highlight: marker-effect achter een woord, één uitgelichte waarde. Nooit als standaard accent. |
| --dark | #0c0e18 | Donkere merk-secties (afsluiters, footers, quote-blokken) en als inktkleur |

### Functioneel palet (data en diagrammen)

| Token | Hex | Gebruik |
|---|---|---|
| --sand | #e9dfc8 | Zachte tags, tijd/handmatig-categorie, week-chips |
| --amber | #e8963e | Warm accent, actieve iconen, datapunten |
| --cognac | #b0653a | Secundair warm accent |
| --blue | #3f7de0 | Koel accent, spaarzaam (build-items, laag 4) |
| --green-soft | #d9ead3 | Positief, AI-kansen, quick wins |
| --red-soft | #f6d7d7 | Frustraties, waarschuwingen |

Regel: amber en sand zijn werkkleuren voor data en interface. Violet is het merk. Verwar die twee nooit.

## 3. Typografie

Vier lagen, elk met één taak:

1. **Display-koppen: 'Instrument Serif', serif.** Gewicht 400, ook cursief. Groot en dun: h1 clamp(3rem, 6.5vw, 5.5rem), regel 1.05, letter-spacing -0.01em. Voor hero-zinnen en sectie-openers. Eén woord of zinsdeel mag cursief voor nadruk ("Legal work, *without limits*"-patroon). Fallback: Playfair Display.
2. **UI-koppen: 'Bricolage Grotesque', sans-serif.** Gewicht 600-700, letter-spacing -0.02em. Voor kaarttitels, kolomkoppen en compacte koppen in componenten (h3 en kleiner).
3. **Body en interface: 'Inter', sans-serif.** 15-16px, regel 1.6. Gewicht 400-600.
4. **Labels, metadata en cijfers: 'Fragment Mono', monospace.** 12-13px, uppercase labels met letter-spacing 0.06em. Fallback: JetBrains Mono. Voor chips, badges, tabelkoppen, statistiek-labels, contactregels.

Extra: **'Kalam' 300 (handschrift)** in violet, uitsluitend voor korte annotaties bij beeld of diagram ("dit scheelt 45 min per offerte"). Maximaal één per sectie. Dit is het menselijke NinA-moment.

## 4. Signatuur-elementen (Legora-patronen)

- **Pijl-glyphs:** → voor links en CTA's, ↳ voor "lees meer" en verdieping. Altijd in mono of als icoon in een cirkel.
- **Grote statistieken:** het cijfer enorm in Instrument Serif (clamp 3-5rem), de eenheid erachter klein, het label eronder in mono uppercase. Voorbeeld: "6,4" groot, "maanden terugverdientijd" als mono-label.
- **Mono-bijschriften boven secties:** elk blok opent met een klein mono-label ("APO METHODE · 2/4", "BUSINESS CASE") voordat de kop komt.
- **Cinematografische fotografie:** warm, editorial, veel lucht, mensen aan het werk of architectuur. Als sectie-achtergrond met overlay rgba(244,242,238,0.55) zodat glassmorphism leesbaar blijft. Nooit stockfoto-glimlach.
- **Logo- en bewijsrijen:** "Vertrouwd door" in mono, logo's in grijs, klein en rustig.
- **Underline-links:** tekstlinks krijgen een dunne onderstreping die bij hover violet kleurt.

## 5. Componenten

### Glassmorphism-kaart (standaard container)
background: var(--bg-card); backdrop-filter: blur(24px) saturate(1.2);
border: 1px solid rgba(255,255,255,0.6); border-radius: 24px;
box-shadow: 0 24px 64px rgba(12,14,24,0.08), 0 2px 8px rgba(12,14,24,0.04);
Binnenkaarten: radius 16px, subtielere schaduw.

### Iconen
Squircles (afgeronde vierkanten, radius 26%), simpele lucide-glyphs, ink of wit op sand/amber/blue/cream. Formaat 40x40 (groot) of 28x28 (chip). Violet-squircle alleen voor merk-momenten.

### Chips en pills
Fragment Mono, icoon plus waarde, achtergrond #f0ede6, radius 10px, padding 6px 10px. Voorbeeld: [klok] 15 min · [personen] 1 persoon · [staafjes] 35x p/m.

### Knoppen
- Primaire CTA: zwarte pill (var(--ink)), witte tekst, pijl-icoon links in een cirkel, padding 16px 28px, radius 999px. Hover: schaal 1.02, zachtere schaduw.
- Ghost-knop: transparant, 1px ink-rand op 16 procent, zelfde vorm.
- Merk-CTA (maximaal één per pagina, meestal de afsluiter): violet pill of zwarte pill op donkere sectie met violet gloed erachter.

### Donkere merk-sectie (NinA-moment)
Achtergrond #0c0e18, tekst #f2f2f2, subtekst #a6a6a6, een zachte violette gradient-gloed (rgba(153,82,224,0.25), blur 90px) achter de kop. Gebruik voor: afsluitende CTA, klant-quote, footer. Nooit meer dan één donkere sectie per pagina.

## 6. Beweging

Alles subtiel. Kaarten faden in met translateY(16px) naar 0, duur 0.6s, ease cubic-bezier(0.22,1,0.36,1), gestaffeld per 80ms. Getallen tellen op bij in-view. Lijnen en verbindingen tekenen zichzelf. Eén langzaam element per pagina mag doorlopen (draaiende boog, driftende gradient, 20-30s per cyclus). Geen bounce, geen flitsen, geen parallax-geweld.

## 7. Taal

- Nederlands, korte actieve zinnen.
- Nooit em dashes: gebruik komma, dubbele punt of punt.
- Geen emoji's.
- Professioneel maar toegankelijk, geen jargon zonder uitleg.
- Cijfers concreet: "6,4 maanden", "€ 148.000 per jaar" (euro met spatie, punt als duizendtal).
- Bedrijfsgegevens: NinA AI Agency · Olaf Lemmens · olaf@nina-ai.nl.

## 8. Vaste inhoudsprincipes

- Prijzen partnership: Light € 3.900/mnd (13 tokens, kickoff € 3.750, eerste jaar € 50.550), Standaard € 6.000/mnd (20 tokens, kickoff € 7.500, eerste jaar € 79.500), Enterprise € 12.000+/mnd (40+ tokens, kickoff € 7.500, eerste jaar € 151.500+). Token = € 300. Looptijd extern altijd 12 maanden.
- Business case: drie scenario's, Expected leidend, investering verandert niet tussen scenario's.
- Betrouwbaarheid onder 45 procent: toon waarschuwing "Te weinig data of voorbeelden".

## 9. Techniek

React met Tailwind waar mogelijk, anders vanilla HTML/CSS. Elk component zelfstandig, responsive vanaf 380px, data via props uit een centrale config. Fonts via Google Fonts: Instrument Serif (400, 400 italic), Bricolage Grotesque (600, 700), Inter (400, 500, 600), Fragment Mono (400), Kalam (300).
