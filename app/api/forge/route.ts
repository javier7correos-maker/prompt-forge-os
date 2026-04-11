import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateTextWithProvider, getAvailableProviders } from '@/lib/ai/providers'
import {
  buildForgePromptPack,
  extractJsonCandidate,
  normalizeStructuredResult,
} from '@/lib/forge/protocol'
import { sanitizeForgeRequest } from '@/lib/security/input'
import { checkRateLimit } from '@/lib/security/rate-limit'
import type { ForgeGenerationResponse } from '@/types'

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  const rateLimit = checkRateLimit(`forge:${user.id}:${ipAddress}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Demasiadas ejecuciones seguidas. Espera unos minutos e intenta otra vez.',
      },
      { status: 429 },
    )
  }

  let payload

  try {
    payload = sanitizeForgeRequest(await request.json())
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Entrada invalida.',
      },
      { status: 400 },
    )
  }

  const providers = getAvailableProviders()
  const requestedProvider = providers.find((provider) => provider.id === payload.provider) ?? providers[0]
  const promptPack = buildForgePromptPack(payload)
  const warnings: string[] = []

  let mode: ForgeGenerationResponse['mode'] = 'manual'
  let provider = requestedProvider.id
  let model = payload.model
  let structuredResult = promptPack.fallbackResult

  if (requestedProvider.id !== 'manual' && requestedProvider.enabled) {
    try {
      const rawText = await generateTextWithProvider({
        provider: requestedProvider.id,
        model: payload.model,
        systemPrompt: promptPack.systemPrompt,
        userPrompt: promptPack.userPrompt,
      })

      const parsed = extractJsonCandidate(rawText)
      structuredResult = normalizeStructuredResult(parsed, promptPack.fallbackResult)
      mode = 'api'
    } catch (error) {
      warnings.push(
        error instanceof Error
          ? `El proveedor ${requestedProvider.label} fallo y se aplico el fallback manual.`
          : 'Fallo la llamada al proveedor y se aplico el fallback manual.',
      )
      provider = 'manual'
      model = 'manual-super-prompt'
    }
  } else if (requestedProvider.id !== 'manual') {
    warnings.push(
      `El proveedor ${requestedProvider.label} no esta configurado en servidor. Se uso el modo manual.`,
    )
    provider = 'manual'
    model = 'manual-super-prompt'
  } else {
    model = 'manual-super-prompt'
  }

  let saved = false

  try {
    const { error } = await supabase.from('forges').insert({
      user_id: user.id,
      raw_idea: payload.idea,
      output_type: payload.outputType,
      category: payload.category,
      prompt: structuredResult.finalPrompt,
      super_prompt: promptPack.superPrompt,
      skills: promptPack.skillSnapshot,
      template_id: payload.templateId ?? null,
    })

    if (error) {
      warnings.push('No se pudo guardar el forge en historial, pero el resultado si se genero.')
    } else {
      saved = true
    }
  } catch {
    warnings.push('No se pudo persistir el resultado en Supabase.')
  }

  return NextResponse.json<ForgeGenerationResponse>(
    {
      ok: true,
      mode,
      provider,
      model,
      structuredResult,
      superPrompt: promptPack.superPrompt,
      saved,
      warnings,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
