import Anthropic from '@anthropic-ai/sdk'

// Eén gedeelde client. De key komt uit .env (zie server/index.ts dat dotenv laadt).
// Model is instelbaar via ANTHROPIC_MODEL; default is claude-sonnet-4-6 zoals de
// NinA-briefing voorschrijft.
export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'

let client: Anthropic | null = null

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

export function getClient(): Anthropic {
  if (!hasApiKey()) {
    throw new Error(
      'ANTHROPIC_API_KEY ontbreekt. Kopieer .env.example naar .env en vul je key in.',
    )
  }
  if (!client) {
    client = new Anthropic()
  }
  return client
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
