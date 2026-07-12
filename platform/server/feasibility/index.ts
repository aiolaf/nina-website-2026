import { runStructured } from '../lib/anthropic.ts'
import type {
  ClientConfig,
  FeasibilityReport,
  ProfileResult,
} from '../lib/types.ts'

const SYSTEM = `Je bent een senior AI-automation consultant bij NinA AI Agency.
Je beoordeelt of een klantvraag haalbaar is als n8n AI-automation of AI-agent,
op basis van een data-profiel en de klantvraag. Wees concreet, nuchter en eerlijk:
benoem wat nu al kan, wat nog gebouwd moet worden, en wat niet kan of risicovol is.
Denk aan koppelingen, auth, datavolume, ground truth en gevoeligheid van beslissingen.
Schrijf kort en in het Nederlands. Verzin geen data die niet in het profiel staat.`

// JSON-schema voor de gestructureerde tool-output.
const SCHEMA = {
  type: 'object',
  properties: {
    samenvatting: {
      type: 'string',
      description: 'Eén à twee zinnen: kan dit een goede demo/oplossing worden?',
    },
    aannameType: {
      type: 'string',
      enum: ['automation', 'agent'],
      description:
        'Is dit een vast pad (automation) of beslist het systeem zelf en kiest tools (agent)?',
    },
    aannameUitleg: {
      type: 'string',
      description: 'Korte onderbouwing van de gekozen aanname.',
    },
    watKanNu: {
      type: 'array',
      items: { type: 'string' },
      description: 'Concrete dingen die met de huidige data al kunnen.',
    },
    moetGebouwd: {
      type: 'array',
      items: { type: 'string' },
      description: 'Wat kan, maar nog gebouwd moet worden (koppelingen, auth, volume).',
    },
    kanNietRisico: {
      type: 'array',
      items: { type: 'string' },
      description: 'Wat niet kan of risicovol is (te weinig data, geen ground truth, gevoelige beslissing).',
    },
    openVragen: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { type: 'string' } },
        taak: { type: 'array', items: { type: 'string' } },
        integratie: { type: 'array', items: { type: 'string' } },
        productie: { type: 'array', items: { type: 'string' } },
      },
      required: ['data', 'taak', 'integratie', 'productie'],
    },
  },
  required: [
    'samenvatting',
    'aannameType',
    'aannameUitleg',
    'watKanNu',
    'moetGebouwd',
    'kanNietRisico',
    'openVragen',
  ],
} as const

function buildUserPrompt(config: ClientConfig, profile: ProfileResult): string {
  const dataSummary = profile.files
    .map((f) => {
      const fields = f.fields
        .map(
          (fld) =>
            `  - ${fld.name} (${fld.type}, ${fld.emptyPct}% leeg, ${fld.distinct} uniek${
              fld.pii.length ? `, PII: ${fld.pii.join('/')}` : ''
            })`,
        )
        .join('\n')
      return `Bestand ${f.file} — ${f.records} records:\n${fields || '  (geen velden)'}`
    })
    .join('\n\n')

  return `KLANT: ${config.klant || profile.klant}
KLANTVRAAG: ${config.vraag || '(niet opgegeven)'}
VERWACHT TYPE (uit config): ${config.type}

DATA-OORDEEL PROFILER: ${profile.verdict.toUpperCase()} — ${profile.verdictReason}
Totaal ${profile.totalRecords} records, ${profile.totalFields} velden.
${profile.piiFound.length ? `Gedetecteerde PII: ${profile.piiFound.join(', ')}.` : 'Geen PII gedetecteerd.'}

DATA-PROFIEL:
${dataSummary || '(geen databestanden)'}

Geef een gestructureerd haalbaarheidsrapport via de tool.`
}

export async function generateFeasibility(
  config: ClientConfig,
  profile: ProfileResult,
): Promise<FeasibilityReport> {
  return runStructured<FeasibilityReport>(
    SYSTEM,
    buildUserPrompt(config, profile),
    'haalbaarheidsrapport',
    SCHEMA as unknown as Record<string, unknown>,
  )
}
