import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const WORKSPACES = [
  {
    href: '/forge',
    title: 'Forge',
    description: 'Idea -> estrategia -> deliverable -> prompt listo para ejecutar.',
    accent: 'var(--gold)',
  },
  {
    href: '/library',
    title: 'Library',
    description: 'Playbooks concretos para landing, finanzas, automatizacion y ventas.',
    accent: 'var(--blue)',
  },
  {
    href: '/vault',
    title: 'Vault',
    description: 'Memoria reutilizable de errores, soluciones, prompts y sistemas ganadores.',
    accent: 'var(--purple)',
  },
]

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: forges } = await supabase
    .from('forges')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(6)

  const memberSince = new Date(user.created_at).toLocaleDateString('es-UY', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '48px' }}>
      <section
        style={{
          padding: '36px',
          borderRadius: '26px',
          border: '1px solid rgba(200,169,106,0.18)',
          background:
            'radial-gradient(circle at top right, rgba(91,158,255,0.18), transparent 28%), linear-gradient(135deg, rgba(200,169,106,0.08), rgba(255,255,255,0.02))',
        }}
      >
        <div style={{ maxWidth: '760px' }}>
          <div style={{ color: 'var(--text-dim)', letterSpacing: '0.14em', fontSize: '12px', textTransform: 'uppercase' }}>
            Prompt Forge OS
          </div>
          <h1
            style={{
              margin: '14px 0 0',
              fontFamily: 'var(--font-display)',
              fontSize: '54px',
              lineHeight: 1,
              color: 'var(--gold)',
            }}
          >
            Ejecuta mas rapido. Aprende una vez. Reutiliza siempre.
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '17px', lineHeight: 1.7, maxWidth: '640px' }}>
            El sistema ahora se organiza como un OS de ejecucion: Forge para construir, Library para elegir el
            playbook correcto y Vault para guardar memoria operativa. Eso reduce vueltas y mejora cada iteracion.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
          <Link
            href="/forge"
            style={{
              padding: '14px 22px',
              borderRadius: '999px',
              background: 'var(--gold)',
              color: 'var(--bg)',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Abrir Forge
          </Link>
          <Link
            href="/library"
            style={{
              padding: '14px 22px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            Ver playbooks
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          marginTop: '22px',
        }}
      >
        {[
          { label: 'Forges', value: `${forges?.length || 0}`, color: 'var(--gold)' },
          { label: 'Plan', value: profile?.plan?.toUpperCase() || 'FREE', color: 'var(--green)' },
          { label: 'Proveedor default', value: 'MANUAL / FREE', color: 'var(--blue)' },
          { label: 'Miembro desde', value: memberSince, color: 'var(--purple)' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: '22px',
              borderRadius: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ color: item.color, fontSize: '30px', fontFamily: 'var(--font-display)' }}>{item.value}</div>
            <div style={{ color: 'var(--text-dim)', marginTop: '6px' }}>{item.label}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {WORKSPACES.map((workspace) => (
            <Link
              key={workspace.href}
              href={workspace.href}
              style={{
                textDecoration: 'none',
                padding: '24px',
                borderRadius: '22px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text)',
              }}
            >
              <div style={{ color: workspace.accent, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                workspace
              </div>
              <h2 style={{ margin: '10px 0 0', fontSize: '28px' }}>{workspace.title}</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '10px', lineHeight: 1.6 }}>{workspace.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '30px' }}>Ultimos forges</h2>
            <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>
              Historial reciente para reciclar ideas que ya mostraron señal.
            </p>
          </div>
          <Link href="/history" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            Ver historial completo
          </Link>
        </div>

        {!forges || forges.length === 0 ? (
          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-dim)',
            }}
          >
            No hay forges guardados todavia. La secuencia correcta es: ir a Forge, ejecutar un primer caso real,
            guardar el resultado util y despues extraer el aprendizaje hacia Vault.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {forges.map((forge: any) => (
              <div
                key={forge.id}
                style={{
                  padding: '18px 20px',
                  borderRadius: '18px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{forge.raw_idea?.slice(0, 90)}</div>
                  <div style={{ color: 'var(--text-dim)', marginTop: '6px', fontSize: '13px' }}>
                    {forge.category} · {forge.output_type} · {new Date(forge.created_at).toLocaleDateString('es-UY')}
                  </div>
                </div>
                <div
                  style={{
                    padding: '6px 10px',
                    borderRadius: '999px',
                    background: 'rgba(200,169,106,0.12)',
                    color: 'var(--gold)',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  listo
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
