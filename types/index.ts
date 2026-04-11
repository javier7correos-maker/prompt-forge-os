export type ForgeCategory =
  | 'ecommerce'
  | 'saas'
  | 'agencia'
  | 'contenido'
  | 'automatizacion'
  | 'ads'
  | 'ventas'
  | 'codigo'
  | 'agentes_ia'
  | 'finanzas_negocios'
  | 'otros'

export type ForgeOutputType =
  | 'landing_page'
  | 'shopify_section'
  | 'email_sequence'
  | 'tiktok_scripts'
  | 'product_description'
  | 'full_store'
  | 'saas_mvp'
  | 'api_route'
  | 'sales_script'
  | 'ad_copy'
  | 'content_strategy'
  | 'automation_flow'
  | 'agent_system'
  | 'full_system'
  | 'bot_whatsapp'
  | 'plan_financiero'
  | 'manager_sop'
  | 'otros'

export interface ForgeTemplate {
  id: string
  category: ForgeCategory
  label: string
  icon: string
  desc: string
  prefill: string
  prefillBrandName?: string
  prefillTone?: string
  prefillOsEnv?: string
  prefillOutputType?: ForgeOutputType
  prefillTargetModel?: string
}

export interface ForgeSkill {
  name: string
  desc: string
  free: boolean
}

export interface ForgeResult {
  prompt: string
  superPrompt: string
  skills: ForgeSkill[]
  outputType: ForgeOutputType
}

export interface ForgeHistoryItem {
  id: string
  user_id: string
  raw_idea: string
  output_type: string
  category: string
  prompt: string
  super_prompt: string
  skills: ForgeSkill[]
  template_id?: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro' | 'agency'
  forges_count: number
  created_at: string
}

export type AIProviderId =
  | 'manual'
  | 'gemini'
  | 'deepseek'
  | 'openai'
  | 'anthropic'

export type ForgeStrategyProfileId =
  | 'execution'
  | 'balanced'
  | 'growth'
  | 'security'

export interface AIProviderDefinition {
  id: AIProviderId
  label: string
  description: string
  mode: 'manual' | 'api'
  free: boolean
  requiresApiKey: boolean
  configKey?: string
  recommendedUse: string
  models: string[]
}

export interface AIProviderRuntimeInfo extends AIProviderDefinition {
  enabled: boolean
}

export interface ForgeStrategyProfile {
  id: ForgeStrategyProfileId
  label: string
  description: string
  focus: string[]
}

export interface ForgePreferences {
  defaultProvider: AIProviderId
  defaultModel: string
  strategyProfile: ForgeStrategyProfileId
  strictSecurity: boolean
  saveHistory: boolean
}

export interface ForgeContextAnswers {
  target: string
  precio: string
  diferencial: string
  objetivo: string
  constraints: string
  memoryContext?: string
  brandName?: string
  tone?: string
  osEnv?: string
  targetModel?: string
}

export interface ForgeGenerationRequest {
  idea: string
  category: ForgeCategory
  outputType: ForgeOutputType
  provider: AIProviderId
  model: string
  strategyProfile: ForgeStrategyProfileId
  templateId?: string
  answers: ForgeContextAnswers
}

export interface ForgeStructuredResult {
  diagnostic: string
  rootCause: string
  strategy: string[]
  executionPlan: string[]
  securityProtocol: string[]
  quickWins: string[]
  kpis: string[]
  aiCoordination: string[]
  finalDeliverable: string
  finalPrompt: string
  openQuestions: string[]
}

export interface ForgeGenerationResponse {
  ok: boolean
  mode: 'manual' | 'api'
  provider: AIProviderId
  model: string
  structuredResult: ForgeStructuredResult
  superPrompt: string
  saved: boolean
  warnings: string[]
}

export type VaultEntryKind =
  | 'error'
  | 'solution'
  | 'prompt'
  | 'playbook'
  | 'checklist'
  | 'winning-system'

export interface VaultEntry {
  id: string
  title: string
  kind: VaultEntryKind
  summary: string
  lesson: string
  projectType: string
  tags: string[]
  source: 'manual' | 'chat' | 'forge'
  createdAt: string
}

export interface ForgePlaybook {
  id: string
  title: string
  category: string
  oneLiner: string
  bestFor: string[]
  outcome: string
  sprintSteps: string[]
  monetization: string[]
  deliverables: string[]
  tools: string[]
  inspiredBy?: string
}
