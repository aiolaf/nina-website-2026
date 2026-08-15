#!/usr/bin/env node
/**
 * Test voor scripts/update-models.mjs, zonder externe dependencies.
 *
 * Start een lokale mock-server die de Artificial Analysis- en de
 * wisselkoers-endpoint nabootst, draait het echte update-script daartegen
 * met een dummy key, en controleert de uitvoer. Zo is aantoonbaar dat de
 * transformatie, de omrekening naar euro en de koppeling met de verdicts
 * doen wat ze moeten doen, zonder dat er een API-key of internet nodig is.
 *
 * Draaien:
 *   node scripts/test-update-models.mjs
 *
 * Voorbeeldbestand genereren (schrijft public/data/models.json met de
 * mock-data, zodat de pagina te bekijken is zonder API-key):
 *   node scripts/test-update-models.mjs --voorbeeld
 */

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { readFile, rm, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts", "update-models.mjs");
const FIXTURE = path.join(ROOT, "scripts", "fixtures", "aa-models.mock.json");

const KOERS = 0.9124;
const FX_ANTWOORD = {
  amount: 1,
  base: "USD",
  date: "2026-08-14",
  rates: { EUR: KOERS },
};

/** Start de mock-server en geeft de basis-URL terug. */
async function startServer(routes) {
  const server = createServer((req, res) => {
    const pad = req.url.split("?")[0];
    const route = routes[pad];
    if (!route) {
      res.writeHead(404).end("niet gevonden");
      return;
    }
    if (route.status && route.status >= 400) {
      res.writeHead(route.status, { "content-type": "text/plain" });
      res.end(route.body ?? "fout");
      return;
    }
    // De echte API vereist de header; de mock controleert dat ook, zodat
    // een vergeten header hier opvalt en niet pas in productie.
    if (route.vereistKey && req.headers["x-api-key"] !== "dummy-key") {
      res.writeHead(401, { "content-type": "text/plain" });
      res.end("x-api-key ontbreekt of klopt niet");
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(route.body));
  });
  await new Promise((klaar) => server.listen(0, "127.0.0.1", klaar));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    stop: () => new Promise((klaar) => server.close(klaar)),
  };
}

/** Draait het update-script en geeft exitcode plus uitvoer terug. */
function draaiScript(env, args = []) {
  return new Promise((klaar) => {
    const kind = spawn(process.execPath, [SCRIPT, ...args], {
      env: { ...process.env, ...env },
      cwd: ROOT,
    });
    let uit = "";
    let fout = "";
    kind.stdout.on("data", (d) => (uit += d));
    kind.stderr.on("data", (d) => (fout += d));
    kind.on("close", (code) => klaar({ code, uit, fout }));
  });
}

const tests = [];
function test(naam, fn) {
  tests.push({ naam, fn });
}

/** Standaardopstelling: mock-server plus een tijdelijk uitvoerbestand. */
async function metOpstelling(fn, { aa, fxStatus } = {}) {
  const fixture = JSON.parse(await readFile(FIXTURE, "utf8"));
  const server = await startServer({
    "/aa": { body: aa ?? fixture, vereistKey: true },
    "/fx": fxStatus
      ? { status: fxStatus, body: "service unavailable" }
      : { body: FX_ANTWOORD },
  });
  const map = await mkdtemp(path.join(tmpdir(), "nina-modellen-"));
  const uit = path.join(map, "models.json");
  const env = {
    AA_API_KEY: "dummy-key",
    AA_API_URL: `${server.url}/aa`,
    FX_API_URL: `${server.url}/fx`,
    MODELS_OUT: uit,
  };
  try {
    return await fn({ env, uit, server });
  } finally {
    await server.stop();
    await rm(map, { recursive: true, force: true });
  }
}

const lees = async (pad) => JSON.parse(await readFile(pad, "utf8"));
const zoek = (data, naam) => data.modellen.find((m) => m.naam === naam);

test("draait door op de mock en schrijft een compleet bestand", () =>
  metOpstelling(async ({ env, uit }) => {
    const { code, fout } = await draaiScript(env);
    assert.equal(code, 0, `script faalde: ${fout}`);

    const data = await lees(uit);
    assert.ok(
      !Number.isNaN(Date.parse(data.laatstBijgewerkt)),
      "laatstBijgewerkt is geen geldige ISO-tijdstempel"
    );
    assert.equal(data.bron.naam, "Artificial Analysis");
    assert.equal(data.wisselkoers.koers, KOERS);
    assert.equal(data.wisselkoers.datum, "2026-08-14");
    assert.equal(data.aantal, data.modellen.length);
  }));

test("laat modellen zonder Intelligence Index vallen", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const data = await lees(uit);
    // De fixture heeft 23 modellen met index plus 1 zonder.
    assert.equal(data.modellen.length, 23);
    assert.equal(zoek(data, "Legacy Model zonder index"), undefined);
  }));

test("sorteert aflopend op Intelligence Index", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const { modellen } = await lees(uit);
    const scores = modellen.map((m) => m.intelligentie);
    assert.deepEqual(scores, [...scores].sort((a, b) => b - a));
    assert.equal(modellen[0].naam, "Claude Opus 5");
  }));

test("rekent dollars om naar euro op twee decimalen", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const data = await lees(uit);
    const opus = zoek(data, "Claude Opus 5");
    // 15 en 75 dollar maal 0,9124.
    assert.equal(opus.prijsInput, 13.69);
    assert.equal(opus.prijsOutput, 68.43);
  }));

test("leest prijzen die als tekst binnenkomen", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const mistral = zoek(await lees(uit), "Mistral Medium 3.1");
    assert.equal(mistral.prijsInput, 0.36);
    assert.equal(mistral.prijsOutput, 1.82);
  }));

test("zet een prijs onder een cent niet op nul", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    // 0,005 dollar maal 0,9124 is 0,0046: afgerond op twee decimalen 0,00,
    // en dat leest als gratis. Ondergrens is een cent.
    assert.equal(zoek(await lees(uit), "Phi-5").prijsInput, 0.01);
  }));

test("neemt provider, snelheid en contextvenster over", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const gemini = zoek(await lees(uit), "Gemini 3 Pro");
    assert.equal(gemini.provider, "Google");
    assert.equal(gemini.snelheid, 133);
    assert.equal(gemini.contextvenster, 1048576);
    assert.equal(gemini.coding, 65.8);
  }));

test("koppelt verdicts en kiest de langste match", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const data = await lees(uit);

    // "GPT-5 mini" bevat zowel "gpt-5" als "gpt-5 mini". De langste wint.
    const mini = zoek(data, "GPT-5 mini");
    assert.ok(mini.verdict, "GPT-5 mini heeft geen verdict");
    assert.ok(mini.verdict.categorie.includes("budget"));
    assert.match(mini.verdict.ninaVerdict, /^Prima instapmodel/);

    // De variantnaam "GPT-5 (high)" hoort nog steeds op "gpt-5" te vallen.
    const high = zoek(data, "GPT-5 (high)");
    assert.ok(high.verdict, "GPT-5 (high) heeft geen verdict");
    assert.ok(high.verdict.categorie.includes("content"));
  }));

test("laat modellen zonder verdict leeg", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const data = await lees(uit);
    assert.equal(zoek(data, "Command A").verdict, null);
    assert.equal(zoek(data, "Kimi K2").verdict, null);
  }));

test("markeert alleen de aanraders", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const data = await lees(uit);
    const aanraders = data.modellen
      .filter((m) => m.verdict?.aanrader)
      .map((m) => m.naam)
      .sort();
    assert.deepEqual(aanraders, [
      "Claude Fable 5",
      "Claude Opus 5",
      "Claude Sonnet 5",
    ]);
  }));

test("bewaart hooguit de top 40", () => {
  const veel = {
    data: Array.from({ length: 60 }, (_, i) => ({
      slug: `model-${i}`,
      name: `Testmodel ${i}`,
      model_creator: { name: "Testlab" },
      evaluations: { artificial_analysis_intelligence_index: 100 - i },
      pricing: { price_1m_input_tokens: 1, price_1m_output_tokens: 2 },
      median_output_tokens_per_second: 100,
      context_window: 128000,
    })),
  };
  return metOpstelling(
    async ({ env, uit }) => {
      const { code } = await draaiScript(env);
      assert.equal(code, 0);
      const data = await lees(uit);
      assert.equal(data.modellen.length, 40);
      assert.equal(data.modellen[0].naam, "Testmodel 0");
      assert.equal(data.modellen[39].naam, "Testmodel 39");
    },
    { aa: veel }
  );
});

test("schrijft niet opnieuw als de data ongewijzigd is", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const eerste = await lees(uit);
    const tweede = await draaiScript(env);
    assert.equal(tweede.code, 0);
    assert.match(tweede.uit, /ongewijzigd/);
    const naDeTweedeRun = await lees(uit);
    assert.equal(naDeTweedeRun.laatstBijgewerkt, eerste.laatstBijgewerkt);
  }));

test("schrijft wel opnieuw met --force", () =>
  metOpstelling(async ({ env, uit }) => {
    await draaiScript(env);
    const eerste = await lees(uit);
    // Een milliseconde wachten, anders is de nieuwe tijdstempel gelijk.
    await new Promise((klaar) => setTimeout(klaar, 5));
    await draaiScript(env, ["--force"]);
    const tweede = await lees(uit);
    assert.notEqual(tweede.laatstBijgewerkt, eerste.laatstBijgewerkt);
  }));

test("stopt met code 1 en laat het bestand staan als de koers-API faalt", () =>
  metOpstelling(
    async ({ env, uit }) => {
      // Eerst een geldig bestand neerzetten via een geslaagde run.
      const goedeServer = await startServer({
        "/aa": { body: JSON.parse(await readFile(FIXTURE, "utf8")), vereistKey: true },
        "/fx": { body: FX_ANTWOORD },
      });
      await draaiScript({
        ...env,
        AA_API_URL: `${goedeServer.url}/aa`,
        FX_API_URL: `${goedeServer.url}/fx`,
      });
      await goedeServer.stop();
      const voor = await readFile(uit, "utf8");

      const { code, fout } = await draaiScript(env);
      assert.equal(code, 1);
      assert.match(fout, /niet aangeraakt/);
      assert.equal(await readFile(uit, "utf8"), voor);
    },
    { fxStatus: 503 }
  ));

test("stopt met code 1 zonder AA_API_KEY", () =>
  metOpstelling(async ({ env }) => {
    const { code, fout } = await draaiScript({ ...env, AA_API_KEY: "" });
    assert.equal(code, 1);
    assert.match(fout, /AA_API_KEY/);
  }));

test("stuurt de x-api-key mee naar Artificial Analysis", () =>
  metOpstelling(async ({ env }) => {
    // De mock geeft 401 als de header ontbreekt of niet klopt.
    const { code, fout } = await draaiScript({ ...env, AA_API_KEY: "fout" });
    assert.equal(code, 1);
    assert.match(fout, /401/);
  }));

/** Schrijft het echte public/data/models.json met de mock-data. */
async function schrijfVoorbeeld() {
  const uit = path.join(ROOT, "public", "data", "models.json");
  return metOpstelling(async ({ env }) => {
    const { code, uit: log, fout } = await draaiScript({
      ...env,
      MODELS_OUT: uit,
    }, ["--force"]);
    if (code !== 0) {
      console.error(fout);
      process.exit(1);
    }
    console.log(log.trim());
    console.log(`\nVoorbeeldbestand geschreven: ${path.relative(ROOT, uit)}`);
    console.log(
      "Let op: dit is mock-data. De eerste echte run van de workflow overschrijft het."
    );
  });
}

async function main() {
  if (process.argv.includes("--voorbeeld")) {
    await schrijfVoorbeeld();
    return;
  }

  let gefaald = 0;
  for (const { naam, fn } of tests) {
    try {
      await fn();
      console.log(`  ok  ${naam}`);
    } catch (err) {
      gefaald += 1;
      console.error(`  FOUT  ${naam}`);
      console.error(`        ${err.message.split("\n").join("\n        ")}`);
    }
  }
  console.log(
    `\n${tests.length - gefaald} van de ${tests.length} tests geslaagd.`
  );
  if (gefaald > 0) process.exit(1);
}

main();
