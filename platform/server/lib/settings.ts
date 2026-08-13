import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './clients.ts'

// Lokale instellingen (o.a. de via de UI ingevoerde API key) bewaren we in een
// gitignored bestand, zodat ze een herstart overleven maar nooit in de repo komen.
const DIR = path.join(ROOT, '.local')
const FILE = path.join(DIR, 'settings.json')

interface Settings {
  anthropicApiKey?: string
}

let cache: Settings | null = null

function load(): Settings {
  if (cache) return cache
  try {
    cache = JSON.parse(fs.readFileSync(FILE, 'utf-8')) as Settings
  } catch {
    cache = {}
  }
  return cache
}

export function getStoredApiKey(): string | undefined {
  const key = load().anthropicApiKey
  return key && key.trim() ? key.trim() : undefined
}

export function setStoredApiKey(key: string | undefined): void {
  const s = load()
  if (key && key.trim()) s.anthropicApiKey = key.trim()
  else delete s.anthropicApiKey
  cache = s
  fs.mkdirSync(DIR, { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(s, null, 2))
}
