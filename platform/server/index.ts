import 'dotenv/config'
import path from 'node:path'
import fs from 'node:fs'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import {
  apiKeySource,
  hasApiKey,
  MODEL,
  validateApiKey,
} from './lib/anthropic.ts'
import { setStoredApiKey } from './lib/settings.ts'
import { addRun, clearHistory, deleteRun, listHistory } from './lib/history.ts'
import {
  listClients,
  listDataFiles,
  readConfig,
  resolveDemos,
  ROOT,
} from './lib/clients.ts'
import { profileClient } from './profiler/index.ts'
import { generateFeasibility } from './feasibility/index.ts'
import { pickRecord, runWorkflow } from './runner/index.ts'

const app = express()
const PORT = Number(process.env.PORT ?? 8787)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// Kleine helper zodat async-route-fouten netjes als JSON terugkomen.
function wrap(
  fn: (req: Request, res: Response) => Promise<void> | void,
) {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      res.status(400).json({ error: message })
    }
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: MODEL, hasApiKey: hasApiKey() })
})

// --- Instellingen: API key ---
app.get(
  '/api/settings',
  wrap((_req, res) => {
    res.json({ hasApiKey: hasApiKey(), source: apiKeySource(), model: MODEL })
  }),
)

// Zet (of test) de API key. Body: { apiKey, validate?: boolean }.
app.post(
  '/api/settings/api-key',
  wrap(async (req, res) => {
    const apiKey = String(req.body?.apiKey ?? '').trim()
    if (!apiKey) {
      res.status(400).json({ error: 'Geen API key opgegeven.' })
      return
    }
    // Standaard valideren we de key met een minimale call, tenzij expliciet uit.
    if (req.body?.validate !== false) {
      try {
        await validateApiKey(apiKey)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        res.status(400).json({ error: `Key afgekeurd: ${message}` })
        return
      }
    }
    setStoredApiKey(apiKey)
    res.json({ hasApiKey: hasApiKey(), source: apiKeySource() })
  }),
)

// Wis de via de UI opgeslagen key (valt terug op .env indien aanwezig).
app.delete(
  '/api/settings/api-key',
  wrap((_req, res) => {
    setStoredApiKey(undefined)
    res.json({ hasApiKey: hasApiKey(), source: apiKeySource() })
  }),
)

// Lijst van klanten + omgevingsstatus.
app.get(
  '/api/clients',
  wrap((_req, res) => {
    res.json({ clients: listClients(), hasApiKey: hasApiKey(), model: MODEL })
  }),
)

// Config + databestanden van één klant.
app.get(
  '/api/clients/:name',
  wrap((req, res) => {
    const name = String(req.params.name)
    const config = readConfig(name)
    res.json({
      config,
      dataFiles: listDataFiles(name, config.dataFiles),
      demos: resolveDemos(config),
    })
  }),
)

// Module 1: data-profiel + oordeel.
app.get(
  '/api/clients/:name/profile',
  wrap((req, res) => {
    res.json(profileClient(String(req.params.name)))
  }),
)

// Module 2: haalbaarheidscheck (vereist API key).
app.post(
  '/api/clients/:name/feasibility',
  wrap(async (req, res) => {
    if (!hasApiKey()) {
      res.status(400).json({ error: 'ANTHROPIC_API_KEY ontbreekt in .env.' })
      return
    }
    const name = String(req.params.name)
    const context = String(req.body?.context ?? '')
    const config = readConfig(name)
    const profile = profileClient(name)
    const report = await generateFeasibility(config, profile, context)
    res.json(report)
  }),
)

// Info over aantal records (voor de record-slider in de UI).
app.get(
  '/api/clients/:name/record',
  wrap((req, res) => {
    const index = Number(req.query.index ?? 0)
    const demoId = req.query.demo ? String(req.query.demo) : undefined
    res.json(
      pickRecord(
        String(req.params.name),
        demoId,
        Number.isFinite(index) ? index : 0,
      ),
    )
  }),
)

// Module 3: live demo runner.
app.post(
  '/api/clients/:name/run',
  wrap(async (req, res) => {
    const name = String(req.params.name)
    const demoId = req.body?.demoId ? String(req.body.demoId) : undefined
    const recordIndex = Number(req.body?.recordIndex ?? 0)
    const realN8n = Boolean(req.body?.realN8n)
    if (!realN8n && !hasApiKey()) {
      res.status(400).json({
        error:
          'ANTHROPIC_API_KEY ontbreekt — nodig voor de AI-stappen in de demo. Voeg de key toe via Instellingen.',
      })
      return
    }
    const result = await runWorkflow(name, demoId, recordIndex, realN8n)
    addRun(result) // bewaar in de historie
    res.json(result)
  }),
)

// --- Demo-historie ---
app.get(
  '/api/history',
  wrap((req, res) => {
    const klant = req.query.klant ? String(req.query.klant) : undefined
    res.json({ entries: listHistory(klant) })
  }),
)

app.delete(
  '/api/history/:id',
  wrap((req, res) => {
    res.json({ deleted: deleteRun(String(req.params.id)) })
  }),
)

app.delete(
  '/api/history',
  wrap((req, res) => {
    const klant = req.query.klant ? String(req.query.klant) : undefined
    res.json({ removed: clearHistory(klant) })
  }),
)

// In productie serveren we de gebouwde frontend (npm run build -> dist).
const distDir = path.join(ROOT, 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`\n  NinA demo-platform API → http://localhost:${PORT}`)
  console.log(`  Model: ${MODEL}  ·  API key: ${hasApiKey() ? 'gevonden' : 'ONTBREEKT (.env)'}`)
  if (!fs.existsSync(distDir)) {
    console.log(`  Frontend (dev): http://localhost:5173\n`)
  }
})
