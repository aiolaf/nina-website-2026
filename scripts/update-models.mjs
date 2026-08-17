#!/usr/bin/env node
/**
 * Bouwt public/data/models.json: de databron onder /ai-modellen.
 *
 * Twee externe bronnen, allebei verplicht:
 *   1. Artificial Analysis (rankings, prijzen in dollar, snelheid). Vereist
 *      een API-key in de env var AA_API_KEY.
 *   2. Frankfurter (dagkoers USD naar EUR). Gratis, geen key.
 *
 * Daar bovenop komt data/nina-verdicts.json: het handmatige oordeel van
 * NinA. Dat bestand wordt alleen gelezen, nooit geschreven.
 *
 * Harde regel: bij elke fout stopt het script met exitcode 1 en blijft het
 * bestaande models.json onaangeroerd. De site mag nooit breken door een
 * mislukte update. Er wordt pas geschreven als alle stappen zijn geslaagd.
 *
 * Draaien:
 *   AA_API_KEY=xxx node scripts/update-models.mjs
 *
 * Env vars voor testen (zie scripts/test-update-models.mjs):
 *   AA_API_URL   overschrijft de Artificial Analysis-endpoint
 *   FX_API_URL   overschrijft de wisselkoers-endpoint
 *   MODELS_OUT   overschrijft het pad van het uitvoerbestand
 *
 * Vlaggen:
 *   --force      schrijf ook als de data ongewijzigd is
 */

import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const AA_URL =
  process.env.AA_API_URL ||
  "https://artificialanalysis.ai/api/v2/data/llms/models";
const FX_URL =
  process.env.FX_API_URL || "https://api.frankfurter.app/latest?from=USD&to=EUR";

const VERDICTS_PAD = path.join(ROOT, "data", "nina-verdicts.json");
const UIT_PAD =
  process.env.MODELS_OUT || path.join(ROOT, "public", "data", "models.json");

/** Hoeveel modellen de pagina toont. Gesorteerd op Intelligence Index. */
const TOP = 40;

/** Netwerk-timeout per verzoek. Een hangende API mag de Action niet gijzelen. */
const TIMEOUT_MS = 30_000;

const FORCE = process.argv.includes("--force");

/**
 * De veldnamen van de Artificial Analysis API liggen niet vast en zijn in
 * v2 al een keer verschoven. Per waarde staat hier een lijstje kandidaat-
 * paden; de eerste die een bruikbaar getal oplevert wint. Zo blijft het
 * script overeind bij een hernoeming, en waarschuwt het hieronder als een
 * veld voor bijna alle modellen leeg blijft.
 */
const VELDEN = {
  intelligentie: [
    "evaluations.artificial_analysis_intelligence_index",
    "artificial_analysis_intelligence_index",
    "evaluations.intelligence_index",
  ],
  coding: [
    "evaluations.artificial_analysis_coding_index",
    "artificial_analysis_coding_index",
    "evaluations.coding_index",
  ],
  prijsInput: [
    "pricing.price_1m_input_tokens",
    "price_1m_input_tokens",
    "pricing.input_price_1m",
  ],
  prijsOutput: [
    "pricing.price_1m_output_tokens",
    "price_1m_output_tokens",
    "pricing.output_price_1m",
  ],
  snelheid: [
    "median_output_tokens_per_second",
    "evaluations.median_output_tokens_per_second",
    "output_tokens_per_second",
  ],
  contextvenster: [
    "context_window",
    "context_window_tokens",
    "specifications.context_window",
    "max_context_window",
  ],
};

/** Leest een waarde via een pad met punten, zonder te struikelen over null. */
function viaPad(obj, pad) {
  return pad.split(".").reduce((acc, sleutel) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[sleutel];
  }, obj);
}

/** Eerste kandidaatpad dat een eindig getal oplevert, anders null. */
function pakGetal(obj, paden) {
  for (const pad of paden) {
    const waarde = viaPad(obj, pad);
    const getal = typeof waarde === "string" ? Number(waarde) : waarde;
    if (typeof getal === "number" && Number.isFinite(getal)) return getal;
  }
  return null;
}

/** Eerste kandidaatpad dat een niet-lege string oplevert, anders null. */
function pakTekst(obj, paden) {
  for (const pad of paden) {
    const waarde = viaPad(obj, pad);
    if (typeof waarde === "string" && waarde.trim() !== "") return waarde.trim();
  }
  return null;
}

/**
 * Dollar naar euro, op twee decimalen zoals afgesproken. De ondergrens van
 * een cent voorkomt dat een model van 0,004 dollar als "0,00" op de site
 * komt te staan: dat leest als gratis, en dat is het niet.
 */
function naarEuro(usd, koers) {
  if (usd === null) return null;
  const euro = usd * koers;
  if (euro <= 0) return 0;
  return Math.max(0.01, Math.round(euro * 100) / 100);
}

async function haalJson(url, opties, wat) {
  let res;
  try {
    res = await fetch(url, { ...opties, signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (err) {
    throw new Error(`${wat}: verzoek naar ${url} mislukte (${err.message})`, {
      cause: err,
    });
  }
  if (!res.ok) {
    const body = (await res.text().catch(() => "")).slice(0, 300);
    throw new Error(
      `${wat}: ${url} gaf HTTP ${res.status} ${res.statusText}${
        body ? ` - ${body}` : ""
      }`
    );
  }
  try {
    return await res.json();
  } catch (err) {
    throw new Error(`${wat}: antwoord van ${url} is geen geldige JSON`, {
      cause: err,
    });
  }
}

async function haalVerdicts() {
  let ruw;
  try {
    ruw = JSON.parse(await readFile(VERDICTS_PAD, "utf8"));
  } catch (err) {
    throw new Error(`Kan ${VERDICTS_PAD} niet lezen of parsen: ${err.message}`, {
      cause: err,
    });
  }
  if (!Array.isArray(ruw?.verdicts)) {
    throw new Error(`${VERDICTS_PAD} mist een array onder "verdicts".`);
  }
  return ruw.verdicts.map((v) => ({
    ...v,
    match: (v.match || []).map((m) => String(m).toLowerCase()),
  }));
}

/**
 * Koppelt een verdict aan een model. Bij meerdere treffers wint de langste
 * substring: "gpt-5 mini" is specifieker dan "gpt-5" en hoort dus voor te
 * gaan, ongeacht de volgorde in het bestand.
 */
function kiesVerdict(zoektekst, verdicts) {
  let beste = null;
  let besteLengte = 0;
  for (const verdict of verdicts) {
    for (const naald of verdict.match) {
      if (naald && zoektekst.includes(naald) && naald.length > besteLengte) {
        beste = verdict;
        besteLengte = naald.length;
      }
    }
  }
  return beste;
}

/** Alles behalve de tijdstempel: hierop wordt op wijzigingen vergeleken. */
function zonderTijdstempel(payload) {
  const kopie = { ...payload };
  delete kopie.laatstBijgewerkt;
  return JSON.stringify(kopie);
}

async function main() {
  const sleutel = process.env.AA_API_KEY;
  if (!sleutel) {
    throw new Error(
      "AA_API_KEY ontbreekt. Zet de key in de omgeving (lokaal in je shell, " +
        "in GitHub als repository secret)."
    );
  }

  const verdicts = await haalVerdicts();
  console.log(`Verdicts geladen: ${verdicts.length}`);

  const [aa, fx] = await Promise.all([
    haalJson(
      AA_URL,
      { headers: { "x-api-key": sleutel, accept: "application/json" } },
      "Artificial Analysis"
    ),
    haalJson(FX_URL, {}, "Wisselkoers"),
  ]);

  const koers = Number(fx?.rates?.EUR);
  if (!Number.isFinite(koers) || koers <= 0) {
    throw new Error(
      `Wisselkoers: geen bruikbare EUR-koers in het antwoord (${JSON.stringify(
        fx?.rates
      )})`
    );
  }
  console.log(`Wisselkoers USD naar EUR: ${koers} (${fx?.date ?? "onbekend"})`);

  const ruweModellen = Array.isArray(aa?.data)
    ? aa.data
    : Array.isArray(aa)
      ? aa
      : null;
  if (!ruweModellen) {
    throw new Error(
      "Artificial Analysis: geen array met modellen gevonden onder .data"
    );
  }
  console.log(`Modellen ontvangen: ${ruweModellen.length}`);

  const modellen = [];
  let zonderIndex = 0;

  for (const ruw of ruweModellen) {
    const naam = pakTekst(ruw, ["name", "model_name"]);
    if (!naam) continue;

    const intelligentie = pakGetal(ruw, VELDEN.intelligentie);
    if (intelligentie === null) {
      // Zonder Intelligence Index valt een model niet te rangschikken.
      zonderIndex += 1;
      continue;
    }

    const slug =
      pakTekst(ruw, ["slug", "id", "model_id"]) ||
      naam.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const verdict = kiesVerdict(`${naam} ${slug}`.toLowerCase(), verdicts);

    modellen.push({
      slug,
      naam,
      provider:
        pakTekst(ruw, [
          "model_creator.name",
          "model_creator",
          "creator.name",
          "provider",
        ]) || "Onbekend",
      intelligentie: Math.round(intelligentie * 10) / 10,
      coding: (() => {
        const c = pakGetal(ruw, VELDEN.coding);
        return c === null ? null : Math.round(c * 10) / 10;
      })(),
      prijsInput: naarEuro(pakGetal(ruw, VELDEN.prijsInput), koers),
      prijsOutput: naarEuro(pakGetal(ruw, VELDEN.prijsOutput), koers),
      snelheid: (() => {
        const s = pakGetal(ruw, VELDEN.snelheid);
        return s === null ? null : Math.round(s);
      })(),
      contextvenster: pakGetal(ruw, VELDEN.contextvenster),
      verdict: verdict
        ? {
            categorie: verdict.categorie ?? [],
            ninaVerdict: verdict.ninaVerdict ?? "",
            waarGoedVoor: verdict.waarGoedVoor ?? "",
            sterren: verdict.sterren ?? null,
            aanrader: verdict.aanrader === true,
          }
        : null,
    });
  }

  if (zonderIndex > 0) {
    console.log(
      `Overgeslagen zonder Intelligence Index: ${zonderIndex} model(len)`
    );
  }
  if (modellen.length === 0) {
    throw new Error(
      "Geen enkel bruikbaar model overgehouden. Waarschijnlijk zijn de " +
        "veldnamen van de API veranderd; controleer VELDEN in dit script."
    );
  }

  modellen.sort((a, b) => b.intelligentie - a.intelligentie);
  const top = modellen.slice(0, TOP);
  if (modellen.length > TOP) {
    console.log(`Ingekort tot de top ${TOP} van ${modellen.length} modellen.`);
  }

  // Waarschuw als een veld voor bijna alles leeg blijft: dan is de API van
  // naam veranderd en staat er straks een halve tabel op de site.
  for (const veld of ["prijsInput", "prijsOutput", "snelheid", "contextvenster"]) {
    const gevuld = top.filter((m) => m[veld] !== null).length;
    if (gevuld < top.length / 2) {
      console.warn(
        `Let op: "${veld}" is maar voor ${gevuld} van de ${top.length} ` +
          `modellen gevuld. Controleer de veldnamen in VELDEN.`
      );
    }
  }

  const metVerdict = top.filter((m) => m.verdict).length;
  console.log(`Verdicts gekoppeld: ${metVerdict} van de ${top.length}`);

  const payload = {
    laatstBijgewerkt: new Date().toISOString(),
    bron: {
      naam: "Artificial Analysis",
      url: "https://artificialanalysis.ai",
    },
    wisselkoers: {
      van: "USD",
      naar: "EUR",
      koers,
      datum: typeof fx?.date === "string" ? fx.date : null,
      bron: "frankfurter.app",
    },
    aantal: top.length,
    // De bovengrens meeschrijven, zodat de onderbouwingspagina hem kan
    // noemen zonder dat het getal op twee plekken onderhouden wordt.
    maximum: TOP,
    modellen: top,
  };

  const nieuw = JSON.stringify(payload, null, 2) + "\n";

  if (!FORCE) {
    const bestaand = await readFile(UIT_PAD, "utf8").catch(() => null);
    if (bestaand) {
      try {
        if (
          zonderTijdstempel(JSON.parse(bestaand)) === zonderTijdstempel(payload)
        ) {
          console.log(
            "Data ongewijzigd, bestand blijft staan. Gebruik --force om toch te schrijven."
          );
          return;
        }
      } catch {
        // Bestaand bestand is stuk; dan gewoon overschrijven.
      }
    }
  }

  // Schrijven via een tijdelijk bestand plus rename: zo staat er nooit een
  // half weggeschreven models.json op schijf als het proces sneuvelt.
  await mkdir(path.dirname(UIT_PAD), { recursive: true });
  const tijdelijk = `${UIT_PAD}.tmp`;
  await writeFile(tijdelijk, nieuw, "utf8");
  await rename(tijdelijk, UIT_PAD);

  console.log(`Geschreven: ${UIT_PAD} (${top.length} modellen)`);
}

main().catch((err) => {
  console.error("Update mislukt, models.json is niet aangeraakt.");
  console.error(`Reden: ${err.message}`);
  if (err.cause) console.error(err.cause);
  process.exit(1);
});
