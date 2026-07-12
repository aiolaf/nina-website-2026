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
