import { AI_PROVIDERS } from '@/lib/ai/catalog'
import type { AIProviderId, AIProviderRuntimeInfo } from '@/types'

interface ProviderGenerationInput {
  provider: AIProviderId
  model: string
  systemPrompt: string
  userPrompt: string
}

const PROVIDER_ENV_KEYS: Partial<Record<AIProviderId, string>> = {
  gemini: 'GEMINI_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
}

export function getAvailableProviders(): AIProviderRuntimeInfo[] {
  return AI_PROVIDERS.map((provider) => ({
    ...provider,
    enabled: provider.mode === 'manual' || Boolean(provider.configKey && process.env[provider.configKey]),
  }))
}

export function getRecommendedProvider(providers = getAvailableProviders()): AIProviderRuntimeInfo {
  return (
    providers.find((provider) => provider.id === 'gemini' && provider.enabled) ??
    providers.find((provider) => provider.id === 'manual') ??
    providers[0]
  )
}

function getApiKey(provider: AIProviderId) {
  const envKey = PROVIDER_ENV_KEYS[provider]
  return envKey ? process.env[envKey] : undefined
}

async function assertOk(response: Response) {
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Provider request failed with status ${response.status}`)
  }
}

async function generateWithGemini(input: ProviderGenerationInput, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(input.model)}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${input.systemPrompt}\n\n${input.userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 4096,
        },
      }),
    },
  )

  await assertOk(response)
  const payload = await response.json()
  return (
    payload?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? '')
      .join('\n')
      .trim() ?? ''
  )
}

async function generateWithOpenAiCompatible(
  endpoint: string,
  input: ProviderGenerationInput,
  apiKey: string,
) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: input.model,
      temperature: 0.4,
      max_tokens: 2500,
      messages: [
        { role: 'system', content: input.systemPrompt },
        { role: 'user', content: input.userPrompt },
      ],
    }),
  })

  await assertOk(response)
  const payload = await response.json()
  return payload?.choices?.[0]?.message?.content?.trim() ?? ''
}

async function generateWithAnthropic(input: ProviderGenerationInput, apiKey: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: input.model,
      max_tokens: 2500,
      system: input.systemPrompt,
      messages: [
        {
          role: 'user',
          content: input.userPrompt,
        },
      ],
    }),
  })

  await assertOk(response)
  const payload = await response.json()
  return (
    payload?.content
      ?.map((item: { type?: string; text?: string }) => (item.type === 'text' ? item.text ?? '' : ''))
      .join('\n')
      .trim() ?? ''
  )
}

export async function generateTextWithProvider(input: ProviderGenerationInput) {
  if (input.provider === 'manual') {
    throw new Error('Manual mode does not call an external provider.')
  }

  const apiKey = getApiKey(input.provider)
  if (!apiKey) {
    throw new Error(`Provider ${input.provider} is not configured.`)
  }

  if (input.provider === 'gemini') {
    return generateWithGemini(input, apiKey)
  }

  if (input.provider === 'deepseek') {
    return generateWithOpenAiCompatible('https://api.deepseek.com/chat/completions', input, apiKey)
  }

  if (input.provider === 'openai') {
    return generateWithOpenAiCompatible('https://api.openai.com/v1/chat/completions', input, apiKey)
  }

  return generateWithAnthropic(input, apiKey)
}
