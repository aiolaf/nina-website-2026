import { runStructured } from '../lib/anthropic.ts'
import type {
  ClientConfig,
  FeasibilityReport,
  ProfileResult,
} from '../lib/types.ts'

const SYSTEM = `Je bent een senior AI-automation consultant bij NinA AI Agency.
Je beoordeelt of een klantvraag haalbaar is als n8n AI-automation of AI-agent,
op basis van (a) een data-profiel, (b) een klantvraag en (c) optionele vrije
context/briefing. Wees concreet, nuchter en eerlijk: benoem wat nu al kan, wat
nog gebouwd moet worden, en wat niet kan of risicovol is. Denk aan koppelingen,
auth, datavolume, ground truth en gevoeligheid van beslissingen.

Als er weinig of geen data is, baseer je oordeel dan op de klantvraag en de
context/briefing, en maak expliciet welke aannames je doet. Vul in dat geval
'dataMeerwaarde' extra zorgvuldig: leg concreet uit welke data (welke velden,
volume, voorbeelden) de demo aantoonbaar sterker en overtuigender maakt, en
waarom — toegespitst op déze klantvraag, niet algemeen.

Schrijf kort en in het Nederlands. Verzin geen data die niet is aangeleverd.`

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
      description:
        'Concrete dingen die met de huidige data/context al kunnen. Leeg als er nog niets kan.',
    },
    moetGebouwd: {
      type: 'array',
      items: { type: 'string' },
      description: 'Wat kan, maar nog gebouwd moet worden (koppelingen, auth, volume).',
    },
    kanNietRisico: {
      type: 'array',
      items: { type: 'string' },
      description:
        'Wat niet kan of risicovol is (te weinig data, geen ground truth, gevoelige beslissing).',
    },
    dataMeerwaarde: {
      type: 'array',
      items: { type: 'string' },
      description:
        'Concreet waar échte of méér data deze specifieke demo sterker maakt: welke velden/records/voorbeelden, en welk demo-effect dat oplevert.',
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
    'dataMeerwaarde',
    'openVragen',
  ],
} as const

function buildUserPrompt(
  config: ClientConfig,
  profile: ProfileResult,
  context: string,
): string {
  const heeftData = profile.totalRecords > 0
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

  const contextBlok = context.trim()
    ? `\nEXTRA CONTEXT / BRIEFING VAN DE KLANT:\n${context.trim()}\n`
    : '\n(Geen extra context/briefing aangeleverd.)\n'

  const dataBlok = heeftData
    ? `DATA-OORDEEL PROFILER: ${profile.verdict.toUpperCase()} — ${profile.verdictReason}
Totaal ${profile.totalRecords} records, ${profile.totalFields} velden.
${profile.piiFound.length ? `Gedetecteerde PII: ${profile.piiFound.join(', ')}.` : 'Geen PII gedetecteerd.'}

DATA-PROFIEL:
${dataSummary}`
    : `DATA: er is nog GEEN (voorbeeld)data aangeleverd. Baseer je oordeel op de
klantvraag en de context hieronder, en wees expliciet over je aannames.`

  return `KLANT: ${config.klant || profile.klant}
KLANTVRAAG: ${config.vraag || '(niet opgegeven)'}
VERWACHT TYPE (uit config): ${config.type}

${dataBlok}
${contextBlok}
Geef een gestructureerd haalbaarheidsrapport via de tool. Vul altijd
'dataMeerwaarde' met concrete punten die specifiek voor deze klantvraag laten
zien waar (meer/echte) data de demo overtuigender maakt.`
}

export async function generateFeasibility(
  config: ClientConfig,
  profile: ProfileResult,
  context = '',
): Promise<FeasibilityReport> {
  return runStructured<FeasibilityReport>(
    SYSTEM,
    buildUserPrompt(config, profile, context),
    'haalbaarheidsrapport',
    SCHEMA as unknown as Record<string, unknown>,
  )
}
