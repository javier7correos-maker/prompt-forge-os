import { AI_PROVIDERS, FORGE_STRATEGY_PROFILES } from '@/lib/ai/catalog'
import type {
  ForgeCategory,
  ForgeGenerationRequest,
  ForgeOutputType,
} from '@/types'

const ALLOWED_CATEGORIES: ForgeCategory[] = [
  'ecommerce',
  'saas',
  'agencia',
  'contenido',
  'automatizacion',
  'ads',
  'ventas',
  'codigo',
]

const ALLOWED_OUTPUT_TYPES: ForgeOutputType[] = [
  'landing_page',
  'shopify_section',
  'email_sequence',
  'tiktok_scripts',
  'product_description',
  'full_store',
  'saas_mvp',
  'api_route',
  'sales_script',
  'ad_copy',
  'content_strategy',
  'automation_flow',
  'agent_system',
  'full_system',
]

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value
    .replace(/\0/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeForgeRequest(input: unknown): ForgeGenerationRequest {
  if (!input || typeof input !== 'object') {
    throw new Error('Payload invalido.')
  }

  const record = input as Record<string, unknown>
  const idea = cleanText(record.idea, 1200)

  if (!idea) {
    throw new Error('La idea es obligatoria.')
  }

  const provider = cleanText(record.provider, 40) as ForgeGenerationRequest['provider']
  const strategyProfile = cleanText(record.strategyProfile, 40) as ForgeGenerationRequest['strategyProfile']
  const category = cleanText(record.category, 40) as ForgeCategory
  const outputType = cleanText(record.outputType, 40) as ForgeOutputType
  const templateId = cleanText(record.templateId, 120)
  const model = cleanText(record.model, 120)

  const answersSource =
    record.answers && typeof record.answers === 'object'
      ? (record.answers as Record<string, unknown>)
      : {}

  const safeProvider =
    AI_PROVIDERS.find((item) => item.id === provider)?.id ?? 'manual'

  const safeProfile =
    FORGE_STRATEGY_PROFILES.find((item) => item.id === strategyProfile)?.id ?? 'execution'

  return {
    idea,
    provider: safeProvider,
    model: model || AI_PROVIDERS.find((item) => item.id === safeProvider)?.models[0] || 'manual-super-prompt',
    strategyProfile: safeProfile,
    category: ALLOWED_CATEGORIES.includes(category) ? category : 'saas',
    outputType: ALLOWED_OUTPUT_TYPES.includes(outputType) ? outputType : 'full_system',
    templateId: templateId || undefined,
    answers: {
      target: cleanText(answersSource.target, 260),
      precio: cleanText(answersSource.precio, 160),
      diferencial: cleanText(answersSource.diferencial, 260),
      objetivo: cleanText(answersSource.objetivo, 260),
      constraints: cleanText(answersSource.constraints, 260),
      memoryContext: cleanText(answersSource.memoryContext, 1800),
    },
  }
}
