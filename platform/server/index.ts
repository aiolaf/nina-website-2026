import 'dotenv/config'
import path from 'node:path'
import fs from 'node:fs'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { hasApiKey, MODEL } from './lib/anthropic.ts'
import { listClients, listDataFiles, readConfig, ROOT } from './lib/clients.ts'
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
    res.json({ config, dataFiles: listDataFiles(name, config.dataFiles) })
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
    const config = readConfig(name)
    const profile = profileClient(name)
    const report = await generateFeasibility(config, profile)
    res.json(report)
  }),
)

// Info over aantal records (voor de record-slider in de UI).
app.get(
  '/api/clients/:name/record',
  wrap((req, res) => {
    const index = Number(req.query.index ?? 0)
    res.json(pickRecord(String(req.params.name), Number.isFinite(index) ? index : 0))
  }),
)

// Module 3: live demo runner.
app.post(
  '/api/clients/:name/run',
  wrap(async (req, res) => {
    const name = String(req.params.name)
    const recordIndex = Number(req.body?.recordIndex ?? 0)
    const realN8n = Boolean(req.body?.realN8n)
    if (!realN8n && !hasApiKey()) {
      res.status(400).json({
        error:
          'ANTHROPIC_API_KEY ontbreekt in .env — nodig voor de AI-stappen in de demo.',
      })
      return
    }
    const result = await runWorkflow(name, recordIndex, realN8n)
    res.json(result)
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
