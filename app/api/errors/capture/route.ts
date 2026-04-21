import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/security/rate-limit'

interface ErrorCapturePayload {
  error_message: string
  error_context?: string
  fix: string
  prevention_code?: string
  project_type?: string
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const rateLimit = checkRateLimit(`errors:${user.id}`, {
    limit: 30,
    windowMs: 60 * 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json({ ok: false, error: 'Rate limit alcanzado.' }, { status: 429 })
  }

  let payload: ErrorCapturePayload

  try {
    const body = await request.json()
    const msg = typeof body.error_message === 'string' ? body.error_message.trim().slice(0, 500) : ''
    const fix = typeof body.fix === 'string' ? body.fix.trim().slice(0, 2000) : ''

    if (!msg || !fix) {
      return NextResponse.json(
        { ok: false, error: 'error_message y fix son obligatorios.' },
        { status: 400 }
      )
    }

    payload = {
      error_message: msg,
      error_context: typeof body.error_context === 'string' ? body.error_context.slice(0, 500) : undefined,
      fix,
      prevention_code: typeof body.prevention_code === 'string' ? body.prevention_code.slice(0, 2000) : undefined,
      project_type: typeof body.project_type === 'string' ? body.project_type.slice(0, 80) : 'general',
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 })
  }

  // Verificar si este error ya existe para incrementar el contador
  const { data: existing } = await supabase
    .from('error_patterns')
    .select('id, times_occurred')
    .eq('error_message', payload.error_message)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('error_patterns')
      .update({
        times_occurred: existing.times_occurred + 1,
        last_seen: new Date().toISOString(),
        fix: payload.fix,
        prevention_code: payload.prevention_code ?? null,
      })
      .eq('id', existing.id)

    return NextResponse.json({ ok: true, action: 'incremented', id: existing.id })
  }

  const { data: inserted, error: insertError } = await supabase
    .from('error_patterns')
    .insert({
      error_message: payload.error_message,
      error_context: payload.error_context ?? null,
      fix: payload.fix,
      prevention_code: payload.prevention_code ?? null,
      project_type: payload.project_type ?? 'general',
    })
    .select('id')
    .single()

  if (insertError) {
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar el error.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, action: 'created', id: inserted.id })
}
