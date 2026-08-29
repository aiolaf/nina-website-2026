import Anthropic from '@anthropic-ai/sdk'
import { getStoredApiKey } from './settings.ts'

// Model is instelbaar via ANTHROPIC_MODEL; default is claude-sonnet-4-6 zoals de
// NinA-briefing voorschrijft.
export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'

let client: Anthropic | null = null
let clientKey: string | undefined

/** Effectieve key: een via de UI ingestelde key wint van .env. */
export function effectiveApiKey(): string | undefined {
  return getStoredApiKey() || process.env.ANTHROPIC_API_KEY || undefined
}

export function hasApiKey(): boolean {
  return Boolean(effectiveApiKey())
}

export function apiKeySource(): 'settings' | 'env' | 'none' {
  if (getStoredApiKey()) return 'settings'
  if (process.env.ANTHROPIC_API_KEY) return 'env'
  return 'none'
}

export function getClient(): Anthropic {
  const key = effectiveApiKey()
  if (!key) {
    throw new Error(
      'ANTHROPIC_API_KEY ontbreekt. Voeg de key toe via Instellingen in de app, of zet hem in .env.',
    )
  }
  // Herbouw de client als de key is gewijzigd (bv. net via de UI ingesteld).
  if (!client || clientKey !== key) {
    client = new Anthropic({ apiKey: key })
    clientKey = key
  }
  return client
}

/** Test of een key geldig is met een minimale API-call. */
export async function validateApiKey(key: string): Promise<void> {
  const probe = new Anthropic({ apiKey: key })
  await probe.messages.create({
    model: MODEL,
    max_tokens: 1,
    messages: [{ role: 'user', content: 'hi' }],
  })
}

/**
 * Vraag Claude om vrije tekst terug te geven op basis van een systeem- en user-prompt.
 * Gebruikt door de demo runner voor ai-nodes.
 */
export async function runText(
  system: string,
  user: string,
  maxTokens = 1024,
): Promise<string> {
  const res = await getClient().messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
  })
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim()
}

/**
 * Dwing gestructureerde output af via een tool met een JSON-schema. Werkt op elk
 * model (ook sonnet-4-6, dat de structured-outputs API niet ondersteunt).
 * Retourneert het gevalideerde tool-input object.
 */
export async function runStructured<T>(
  system: string,
  user: string,
  toolName: string,
  schema: Record<string, unknown>,
  maxTokens = 2048,
): Promise<T> {
  const res = await getClient().messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    tools: [
      {
        name: toolName,
        description:
          'Lever het gevraagde gestructureerde resultaat via dit schema.',
        input_schema: schema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: 'tool', name: toolName },
    messages: [{ role: 'user', content: user }],
  })

  const toolUse = res.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
  )
  if (!toolUse) {
    throw new Error('Model gaf geen gestructureerd antwoord terug.')
  }
  return toolUse.input as T
}

/**
 * Lees een PDF (base64) met Claude en dwing gestructureerde output af via een
 * tool met JSON-schema. Gebruikt door de offerte-upload: Claude leest de
 * offerte-PDF echt uit en levert de posten/prijzen als JSON.
 */
export async function runStructuredPdf<T>(
  system: string,
  user: string,
  pdfBase64: string,
  toolName: string,
  schema: Record<string, unknown>,
  maxTokens = 4096,
): Promise<T> {
  const res = await getClient().messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system,
    tools: [
      {
        name: toolName,
        description:
          'Lever het gevraagde gestructureerde resultaat via dit schema.',
        input_schema: schema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: 'tool', name: toolName },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
          },
          { type: 'text', text: user },
        ],
      },
    ],
  })

  const toolUse = res.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
  )
  if (!toolUse) {
    throw new Error('Model kon de PDF niet als gestructureerd antwoord teruggeven.')
  }
  return toolUse.input as T
}
