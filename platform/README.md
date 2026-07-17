# NinA · Demo-platform

Lokaal platform om per klant snel een overtuigende demo te maken van een n8n
AI-automation of AI-agent, op basis van hun eigen (vaak minimale) data. De basis
is elke keer hetzelfde; alleen de klant-config verschilt.

Draait volledig op **localhost** met één commando.

> Dit platform staat in de submap `/platform` naast de NinA marketing-website
> (Next.js, in de repo-root). De twee zijn onafhankelijk.

## Stack

- **Frontend**: Vite + React + TypeScript, Tailwind (NinA huisstijl)
- **Backend**: Node/Express — data-profiler, AI-runner, optionele n8n-webhook
- **AI**: Anthropic API (model `claude-sonnet-4-6`, instelbaar via `.env`)
- **Parsers**: papaparse (CSV), SheetJS/xlsx (Excel), native JSON

## Setup

```bash
cd platform
npm install
cp .env.example .env      # vul je ANTHROPIC_API_KEY in
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:8787>

`npm run dev` start frontend én backend tegelijk. De frontend proxyt `/api`
naar de backend, dus je opent alleen `http://localhost:5173`.

Zonder API key werkt het profileren gewoon; de haalbaarheidscheck en de
AI-stappen in de demo hebben de key nodig (real n8n mode werkt wel zonder).

### API key toevoegen

Twee opties:

1. **Via de UI** (aanbevolen) — klik rechtsboven op **⚙ Instellingen**, plak je
   `sk-ant-...` key en klik _Opslaan & testen_. De key wordt getest met een
   minimale API-call en lokaal bewaard in `.local/settings.json` (gitignored).
   Een key die je hier instelt wint van `.env`.
2. **Via `.env`** — zet `ANTHROPIC_API_KEY=...` in `platform/.env`.

### Werken zonder data: context/briefing

Heb je nog geen (dummy)data voor een klant? Op scherm 2 kun je een groot stuk
**context/briefing** plakken (doel, proces, voorbeelden, mails, documentatie).
De haalbaarheidscheck draait dan op die tekst — naast of los van data. Het
rapport bevat een aparte sectie **"Waar data de demo sterker maakt"** die
concreet aangeeft welke data de demo overtuigender zou maken en waarom. De
context wordt per klant lokaal in de browser onthouden (localStorage).

## De drie modules

### 1. Data Profiler (`server/profiler`)

Leest elk bestand in `clients/[naam]/data` (CSV, JSON, Excel) en geeft terug:

- aantal records, kolommen/velden met gedetecteerde types
- percentage lege waarden per veld, dubbelingen, min/max/sample per veld
- PII-flag (e-mail, telefoon, IBAN, BSN-achtige patronen)
- eindoordeel: _genoeg data voor demo?_ → ja / twijfel / nee, met reden

### 2. Haalbaarheidscheck (`server/feasibility`)

Neemt de profiler-output + de klantvraag uit `config.json` en genereert via de
Anthropic API een gestructureerd rapport: wat kan nu al, wat moet nog gebouwd
worden, wat kan niet / risico, open vragen (Data / Taak / Integratie / Productie),
en de aanname automation vs. agent. Netjes als paneel in de UI.

### 3. Live Demo Runner (`server/runner`)

Visualiseert de workflow als n8n-achtige nodes (trigger → stappen → output):

- neemt echte records uit de klantdata als input
- AI-stappen doen echte Anthropic-calls (echte output)
- niet-AI-stappen (fetch/transform/route) zijn gemockt met de echte data
- toont per node de input en output, en laat de data zichtbaar "stromen"
- optionele **real n8n mode**: stuur de payload naar een echte n8n-webhook-URL
  uit `config.json` in plaats van te mocken (toggle in de UI)
- **historie**: elke gedraaide demo wordt bewaard (per klant). Onder de flow
  zie je "Eerdere demo's"; je kunt een oude run terugbekijken, losse runs
  verwijderen (✕) of alles wissen. De historie staat lokaal in
  `.local/history.json` (gitignored).
- **Excel invullen** (optioneel per demo): vul een bestaand Excel-template in en
  bied het als download aan. Het bestand wordt niet herbouwd — alleen de lege
  invoercellen worden gevuld; formules (bv. totaal = prijs × hoeveelheid) en de
  huisstijl blijven behouden, en Excel herrekent bij het openen. Zie de demo
  "Prijsvergelijk invullen" van `pleijsier-bouw`. Config: zet op de demo
  `"excel": { "template": "bron/....xlsx", "fill": "data/....json", "filename": "...", "viewFilled": "bron/....xlsx" }`,
  waarbij `fill` een `{ sheet, cells: [{ address, value }] }` mapping is. Met
  `excel` verschijnt in de demo ook een **Excel-viewer** (toggle leeg template ↔
  ingevuld, met de automatisch gevulde cellen groen gemarkeerd) plus een
  download-knop; `viewFilled` is het bestand dat als "ingevuld" wordt getoond
  én dat rechtstreeks als download wordt teruggegeven. Dat laatste is bewust: een
  door Excel zelf gemaakt bestand teruggeven voorkomt de "we found a problem /
  recover"-herstelmelding die je krijgt als je een complex werkblad (met o.a.
  shared formulas) via een library herserialiseert. Zonder `viewFilled` vult het
  platform het template met ExcelJS (kan bij complexe sheets die melding geven).
- **Brondocumenten-paneel** (optioneel per demo): laat visueel zien dat bestanden
  automatisch uit een SharePoint-map komen óf zelf geüpload worden. Config:
  `"sources": { "sharepoint": "pad", "files": [{ "name": "...", "bedrijf": "..." }] }`.
  (De SharePoint-ophaal en PDF-upload zijn in de demo visueel; de verwerking loopt
  via de bestaande stappen.)

## Mappenstructuur

```
platform/
  src/          frontend (React + TS)
  server/       backend (profiler + feasibility + runner)
  clients/      per klant een map: clients/[naam]/data + config.json
  templates/    herbruikbare demo-templates
```

## Nieuwe klant toevoegen

1. `clients/[klantnaam]/data/` — zet hier de databestanden (CSV/JSON/Excel).
2. `clients/[klantnaam]/config.json` — kopieer van `templates/config.template.json`.
3. Herlaad de browser; de klant staat in de lijst.

Zie `templates/README.md` voor het `config.json`-formaat en de node-types.

## Commando's

| Commando            | Doel                                            |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | frontend + backend op localhost (development)   |
| `npm run build`     | typecheck + productie-build van de frontend     |
| `npm run start`     | backend in productie (serveert `dist/` mee)     |
| `npm run typecheck` | TypeScript check van frontend én backend        |

> **Gebruik `npm run dev`** om alles lokaal te draaien (open dan
> <http://localhost:5173>). Voor productie: eerst `npm run build`, dan
> `npm run start` (open <http://localhost:8787>).

### Fout 404 / "Geen klanten gevonden"?

Dan draait de **frontend zonder de backend**. De API leeft in de Express-backend;
alleen de frontend serveren geeft een 404 op `/api/...`. Oplossing:

- Draai `npm run dev` (start frontend én backend) en open `http://localhost:5173`.
- Of `npm run build` + `npm run start` en open `http://localhost:8787`.
- `npm run preview` serveert standaard alleen de frontend — start dan óók de
  backend (`npm run dev:server`) in een tweede terminal; de preview proxyt `/api`
  daar automatisch naartoe.

## config.json

```json
{
  "klant": "",
  "vraag": "",
  "type": "automation | agent",
  "dataFiles": [],
  "workflow": [
    { "id": "", "label": "", "kind": "trigger | ai | transform | route | output",
      "prompt": "", "mockOutput": "" }
  ],
  "n8nWebhookUrl": ""
}
```

## Omgevingsvariabelen (`.env`)

| Variabele           | Default            | Doel                          |
| ------------------- | ------------------ | ----------------------------- |
| `ANTHROPIC_API_KEY` | —                  | vereist voor AI-stappen       |
| `ANTHROPIC_MODEL`   | `claude-sonnet-4-6`| overschrijf het model         |
| `PORT`              | `8787`             | poort van de backend          |
