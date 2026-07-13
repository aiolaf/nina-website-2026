import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { ROOT } from './clients.ts'
import type { HistoryEntry, RunResult } from './types.ts'

// Geschiedenis van gedraaide demo's, lokaal bewaard (gitignored). Bewust géén
// onderdeel van de repo: het is per-installatie werkgeheugen.
const DIR = path.join(ROOT, '.local')
const FILE = path.join(DIR, 'history.json')
const MAX = 100

function loadAll(): HistoryEntry[] {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'))
    return Array.isArray(data) ? (data as HistoryEntry[]) : []
  } catch {
    return []
  }
}

function saveAll(list: HistoryEntry[]): void {
  fs.mkdirSync(DIR, { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2))
}

/** Runs voor een klant (of alle), nieuwste eerst. */
export function listHistory(klant?: string): HistoryEntry[] {
  const all = loadAll()
  return klant ? all.filter((e) => e.klant === klant) : all
}

/** Bewaar een net gedraaide run bovenaan de historie. */
export function addRun(run: RunResult): HistoryEntry {
  const all = loadAll()
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    klant: run.klant,
    createdAt: new Date().toISOString(),
    recordIndex: run.recordIndex,
    usedRealN8n: run.usedRealN8n,
    nodes: run.nodes,
  }
  all.unshift(entry)
  saveAll(all.slice(0, MAX))
  return entry
}

/** Verwijder één run op id. Retourneert of er iets verwijderd is. */
export function deleteRun(id: string): boolean {
  const all = loadAll()
  const next = all.filter((e) => e.id !== id)
  if (next.length === all.length) return false
  saveAll(next)
  return true
}

/** Wis alle runs (of alleen die van één klant). Retourneert aantal verwijderd. */
export function clearHistory(klant?: string): number {
  const all = loadAll()
  const next = klant ? all.filter((e) => e.klant !== klant) : []
  saveAll(next)
  return all.length - next.length
}
