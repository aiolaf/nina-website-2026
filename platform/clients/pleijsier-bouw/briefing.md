# Pleijsier Bouw — briefing prijsvergelijk

Samenvatting uit de discovery call (2026-06-03) en de demo-sessie (2026-06-24),
plus de aangeleverde data (project Segro Hoofddorp, onderdeel kanaalplaatvloeren).
Deze tekst kun je in de UI in het context/briefing-veld plakken voor de
haalbaarheidscheck.

## Organisatie
- Aannemer, grote (binnenstedelijke) projecten, o.a. distributiecentra en flats.
- Platte organisatie: werkvoorbereiders, projectcoördinatoren, uitvoerders.
- AI-volwassenheid laag; wat losse ChatGPT/Copilot-licenties. Data gefragmenteerd
  (veel in mailboxen, wisselend op de schijf). Werken (nog) niet in de cloud;
  file server / NAS on-premise, mogelijk later cloud.

## Het proces (prijsvergelijk) — dit is het meest urgent
1. Vanuit calculatie komt een werkbegroting (de "gele" eerste kolom in het Excel)
   plus eerste offertes bij werkvoorbereiding binnen.
2. Voor een onderdeel (hier kanaalplaatvloeren) sturen ze de volledige uitvraag
   (tekeningen, technische omschrijving, adviesrapporten) naar meerdere
   leveranciers en vragen een aanbieding.
3. Er komen meerdere offertes terug (hier: Preco, Nieuwpoort, Olbecon, VBI).
4. De werkvoorbereider vergelijkt die offertes met de begroting en met de
   technische omschrijving, en vult het prijsvergelijk-Excel in.
5. Voor contract + goedkeuring is er uiteindelijk één Excel nodig met alle
   aangeboden onderdelen, afgesproken prijs, voorwaarden (incl./excl.) en het
   inkoopresultaat t.o.v. bestek.

## Pijnpunten (letterlijk benoemd)
- "Appels met peren": leveranciers noemen posten anders, gebruiken andere
  eenheden (per m2 of alleen een totaalprijs), laten posten weg of nemen ze
  "incl." mee. Handmatig gelijktrekken kost soms twee dagen per onderdeel.
- Afwijkingen/ontbrekende posten moeten opvallen (bv. andere Rc-waarde, andere
  dikte). Nu markeert iedereen dat op zijn eigen manier (kleurtjes, notities).
- Historische kennis/kengetallen zitten in de hoofden van een paar mensen.

## Harde eisen aan de oplossing
- Output = hun eigen prijsvergelijk-Excel, mét formules en huisstijl (het is een
  contractdocument). Cijfers worden tijdens inkoopgesprekken nog aangepast, dus
  de formules moeten in Excel blijven — "rauwe cijfers erin, formules erachter".
- Mens in de loop: markeer twijfel/afwijkingen (afspraak: met "@@"), de
  werkvoorbereider controleert.
- Draait bij voorkeur op n8n op hun eigen omgeving/servers; geen lock-in.

## Aanpak in dit demo-platform (3 demo's)
1. **Offerte normaliseren** — één offerte inlezen, regels omrekenen naar €/m2,
   posten herkennen, "incl." apart zetten.
2. **Prijsvergelijk invullen** — per begrotingspost de aanbiedingen semantisch
   matchen, afwijkingen/ontbrekend met @@ markeren, gunstigste bepalen.
3. **Inkoopadvies & inkoopresultaat** — beste aanbieding per post kiezen (prijs +
   voorwaarden), inkoopresultaat t.o.v. begroting berekenen, onderbouwing voor
   de directie schrijven.

## Bron-bestanden (map `bron/`)
- `Financieel_000_PVG structuuronderdeel ...xlsx` — het officiële (blanco)
  prijsvergelijk-/PVG-template met Kennisbank, Uittrekstaat en contractopmaak.
- `Prijsvergelijk kanaalplaten segro Hoofddorp ML.xlsx` — een ingevuld
  prijsvergelijk (ground truth) met 4 offertes.
- `Offerte 155654 ...pdf`, `2231473.pdf`, `20221206.1.1.pdf` — offertes.
- `[221816-1] Segro - DHL ...pdf` — projectstuk / technische context.
- De JSON in `data/` is hieruit afgeleid, geschikt gemaakt voor de demo's.
