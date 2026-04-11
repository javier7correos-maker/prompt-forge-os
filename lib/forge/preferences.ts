import type { ForgePreferences } from '@/types'

export const FORGE_PREFERENCES_STORAGE_KEY = 'prompt-forge.preferences.v1'

export const DEFAULT_FORGE_PREFERENCES: ForgePreferences = {
  defaultProvider: 'manual',
  defaultModel: 'manual-super-prompt',
  strategyProfile: 'execution',
  strictSecurity: true,
  saveHistory: true,
}

export function parseForgePreferences(rawValue: string | null): ForgePreferences {
  if (!rawValue) {
    return DEFAULT_FORGE_PREFERENCES
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ForgePreferences>
    return {
      defaultProvider: parsed.defaultProvider ?? DEFAULT_FORGE_PREFERENCES.defaultProvider,
      defaultModel: parsed.defaultModel ?? DEFAULT_FORGE_PREFERENCES.defaultModel,
      strategyProfile: parsed.strategyProfile ?? DEFAULT_FORGE_PREFERENCES.strategyProfile,
      strictSecurity: parsed.strictSecurity ?? DEFAULT_FORGE_PREFERENCES.strictSecurity,
      saveHistory: parsed.saveHistory ?? DEFAULT_FORGE_PREFERENCES.saveHistory,
    }
  } catch {
    return DEFAULT_FORGE_PREFERENCES
  }
}
