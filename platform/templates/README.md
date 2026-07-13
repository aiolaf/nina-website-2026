# Templates

Herbruikbare startpunten voor nieuwe klant-demos.

- `config.template.json` — kopieer naar `/clients/[klantnaam]/config.json` en pas aan.

## Nieuwe klant toevoegen

1. Maak een map: `clients/[klantnaam]/`
2. Zet databestanden in `clients/[klantnaam]/data/` (CSV, JSON of Excel).
3. Kopieer `config.template.json` naar `clients/[klantnaam]/config.json` en vul in:
   - `klant`, `vraag`, `type` (`automation` of `agent`)
   - `dataFiles`: welke bestanden meedoen (eerste bestand voedt de demo runner)
   - `workflow`: de nodes die de demo toont
4. Herlaad het platform in de browser — de klant verschijnt in de lijst.

### Node-types in `workflow`

| kind        | doel                                   | velden            |
| ----------- | -------------------------------------- | ----------------- |
| `trigger`   | startpunt, toont het echte record      | —                 |
| `ai`        | echte Claude-call op de data           | `prompt`          |
| `transform` | data omvormen/verrijken (gemockt)      | `mockOutput`      |
| `route`     | keuze/routing (gemockt)                | `mockOutput`      |
| `output`    | wegschrijven/versturen (gemockt)       | `mockOutput`      |

In `mockOutput` kun je `{{veldnaam}}` gebruiken om waarden uit de lopende data in te vullen.

### Meerdere demo's per klant

Een klant kan meerdere demo's hebben. Gebruik dan `demos` in plaats van (of naast)
het losse `workflow`-veld. Elke demo heeft een eigen `label`, `workflow` en
optioneel een eigen `dataFile` (welk databestand de trigger-records levert) en
`n8nWebhookUrl`:

```json
{
  "klant": "Naam",
  "vraag": "...",
  "dataFiles": ["a.json", "b.json"],
  "demos": [
    {
      "id": "demo-1",
      "label": "1 · Eerste demo",
      "beschrijving": "Korte uitleg die boven de flow verschijnt.",
      "type": "automation",
      "dataFile": "a.json",
      "workflow": [ { "id": "trigger", "label": "...", "kind": "trigger" } ]
    },
    {
      "id": "demo-2",
      "label": "2 · Tweede demo",
      "dataFile": "b.json",
      "workflow": [ ... ]
    }
  ]
}
```

In de Live demo verschijnt dan een tab per demo. Zonder `demos` valt het platform
terug op het enkele `workflow`-veld (één demo). Zie `clients/pleijsier-bouw` voor
een uitgewerkt voorbeeld met drie demo's op echte klantdata.
