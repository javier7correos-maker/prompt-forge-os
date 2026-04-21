import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const projectType = searchParams.get('project_type') ?? undefined
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '10', 10), 50)

  let query = supabase
    .from('error_patterns')
    .select('id, error_message, fix, prevention_code, project_type, times_occurred, last_seen')
    .order('times_occurred', { ascending: false })
    .limit(limit)

  if (projectType) {
    query = query.eq('project_type', projectType)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, errors: data ?? [] })
}
