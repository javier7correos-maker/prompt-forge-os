import type {
  AIProviderDefinition,
  AIProviderId,
  ForgeStrategyProfile,
  ForgeStrategyProfileId,
} from '@/types'

export const AI_PROVIDERS: AIProviderDefinition[] = [
  {
    id: 'manual',
    label: 'Manual / Copy-Paste',
    description: 'Genera un super prompt y un protocolo de ejecucion para pegarlo en cualquier chat gratis.',
    mode: 'manual',
    free: true,
    requiresApiKey: false,
    recommendedUse: 'Ideal cuando queres usar chats gratis sin depender de APIs pagas.',
    models: ['manual-super-prompt'],
  },
  {
    id: 'gemini',
    label: 'Gemini API',
    description: 'La mejor base gratis para produccion liviana y pruebas frecuentes.',
    mode: 'api',
    free: true,
    requiresApiKey: true,
    configKey: 'GEMINI_API_KEY',
    recommendedUse: 'Recomendado como proveedor por defecto si queres una API con tier gratis.',
    models: ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'],
  },
  {
    id: 'deepseek',
    label: 'DeepSeek API',
    description: 'Buena opcion para razonamiento y codigo con costo bajo si despues queres escalar.',
    mode: 'api',
    free: false,
    requiresApiKey: true,
    configKey: 'DEEPSEEK_API_KEY',
    recommendedUse: 'Usalo como segunda opcion para codigo y auditoria tecnica.',
    models: ['deepseek-chat', 'deepseek-reasoner'],
  },
  {
    id: 'openai',
    label: 'OpenAI API',
    description: 'Excelente para refinado final, pero no es el camino free-first.',
    mode: 'api',
    free: false,
    requiresApiKey: true,
    configKey: 'OPENAI_API_KEY',
    recommendedUse: 'Reservalo para refinement premium o validacion final si mas adelante queres pagarlo.',
    models: ['gpt-4.1-mini', 'gpt-4.1', 'gpt-5-mini'],
  },
  {
    id: 'anthropic',
    label: 'Anthropic API',
    description: 'Disponible como opcion BYOK, pero no es el default de este sistema.',
    mode: 'api',
    free: false,
    requiresApiKey: true,
    configKey: 'ANTHROPIC_API_KEY',
    recommendedUse: 'Dejalo opcional; no es necesario para que Prompt Forge OS funcione bien.',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-latest'],
  },
]

export const FORGE_STRATEGY_PROFILES: ForgeStrategyProfile[] = [
  {
    id: 'execution',
    label: 'Execution',
    description: 'Prioriza velocidad, claridad operativa y pasos accionables.',
    focus: ['MVP', 'roadmap', 'bloqueos criticos', 'pasos de lanzamiento'],
  },
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Equilibra estrategia, producto, crecimiento y riesgo.',
    focus: ['diagnostico', 'prioridades', 'quick wins', 'validacion'],
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'Empuja oferta, conversion, canal y monetizacion.',
    focus: ['ICP', 'funnel', 'oferta', 'KPI comerciales'],
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Pone seguridad, resiliencia y hardening por delante.',
    focus: ['auth', 'abuso', 'secretos', 'controles'],
  },
]

export function getProviderDefinition(providerId: AIProviderId) {
  return AI_PROVIDERS.find((provider) => provider.id === providerId) ?? AI_PROVIDERS[0]
}

export function getStrategyProfile(profileId: ForgeStrategyProfileId) {
  return (
    FORGE_STRATEGY_PROFILES.find((profile) => profile.id === profileId) ??
    FORGE_STRATEGY_PROFILES[1]
  )
}
