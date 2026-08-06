import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ClientConfig, DemoDef, RawClientConfig } from './types.ts'

const here = path.dirname(fileURLToPath(import.meta.url))
// /platform/server/lib -> /platform
export const ROOT = path.resolve(here, '..', '..')
export const CLIENTS_DIR = path.join(ROOT, 'clients')

/** Namen van alle klantmappen (mappen met een config.json). */
export function listClients(): string[] {
  if (!fs.existsSync(CLIENTS_DIR)) return []
  return fs
    .readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => fs.existsSync(path.join(CLIENTS_DIR, d.name, 'config.json')))
    .map((d) => d.name)
    .sort()
}

export function clientDir(name: string): string {
  const dir = path.join(CLIENTS_DIR, name)
  // Voorkom path traversal: de resolved map moet binnen CLIENTS_DIR liggen.
  if (!dir.startsWith(CLIENTS_DIR + path.sep)) {
    throw new Error(`Ongeldige klantnaam: ${name}`)
  }
  if (!fs.existsSync(dir)) {
    throw new Error(`Klant niet gevonden: ${name}`)
  }
  return dir
}

export function clientDataDir(name: string): string {
  return path.join(clientDir(name), 'data')
}

/** Lees de data-bestanden in /clients/[naam]/data (of de subset uit config.dataFiles). */
export function listDataFiles(name: string, only?: string[]): string[] {
  const dir = clientDataDir(name)
  if (!fs.existsSync(dir)) return []
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((f) => /\.(csv|json|xlsx|xls)$/i.test(f))
    .sort()

  if (only && only.length) {
    // Respecteer de volgorde uit config.dataFiles: het eerste bestand voedt
    // de demo runner. Alleen bestanden die echt bestaan blijven over.
    const present = new Set(files)
    return only
      .map((f) => path.basename(f))
      .filter((f) => present.has(f))
  }
  return files
}

const DEFAULT_CONFIG: ClientConfig = {
  klant: '',
  vraag: '',
  type: 'automation',
  dataFiles: [],
  demos: [],
  workflow: [],
  n8nWebhookUrl: '',
}

/** Lees en normaliseer config.json; ontbrekende velden krijgen defaults. */
export function readConfig(name: string): ClientConfig {
  const file = path.join(clientDir(name), 'config.json')
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8')) as RawClientConfig
  return {
    ...DEFAULT_CONFIG,
    ...raw,
    klant: raw.klant || name,
    workflow: raw.workflow ?? [],
    demos: raw.demos ?? [],
    dataFiles: raw.dataFiles ?? [],
  }
}

/**
 * Geef de demo's van een klant terug. Backwards-compat: als er geen `demos`
 * gedefinieerd zijn, maken we er één uit het losse `workflow`-veld.
 */
export function resolveDemos(config: ClientConfig): DemoDef[] {
  if (config.demos.length) {
    return config.demos.map((d) => ({
      ...d,
      type: d.type ?? config.type,
      dataFile: d.dataFile ?? config.dataFiles[0],
      n8nWebhookUrl: d.n8nWebhookUrl ?? config.n8nWebhookUrl,
    }))
  }
  return [
    {
      id: 'demo',
      label: 'Demo',
      type: config.type,
      dataFile: config.dataFiles[0],
      workflow: config.workflow,
      n8nWebhookUrl: config.n8nWebhookUrl,
    },
  ]
}

export function findDemo(config: ClientConfig, demoId?: string): DemoDef {
  const demos = resolveDemos(config)
  return demos.find((d) => d.id === demoId) ?? demos[0]
}
