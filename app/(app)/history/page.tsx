'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [supabase] = useState(() => createClient())
  const router = useRouter()
  const [forges, setForges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data } = await supabase
        .from('forges')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setForges(data || [])
      setLoading(false)
    }
    load()
  }, [router, supabase])

  const handleCopy = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('forges').delete().eq('id', id)
    setForges(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '40px',
          color: '#C8A96A',
          margin: 0,
        }}>
          Historial
        </h1>
        <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>
          Todos tus forges generados.
        </p>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '60px' }}>
          Cargando...
        </div>
      ) : forges.length === 0 ? (
        <div style={{
          background: '#0d0f17',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '60px',
          textAlign: 'center',
          color: 'var(--text-dim)',
        }}>
          No tenés forges guardados todavía.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {forges.map((forge: any) => (
            <div key={forge.id} style={{
              background: '#0d0f17',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <div style={{ color: 'var(--text)', fontSize: '15px', fontWeight: 500 }}>
                    {forge.raw_idea?.slice(0, 80)}...
                  </div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '12px', marginTop: '4px' }}>
                    {forge.category} · {forge.output_type} · {new Date(forge.created_at).toLocaleDateString('es-UY')}
                  </div>
                </div>
              </div>

              <div style={{
                background: '#07080d',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '12px',
                color: 'var(--text-dim)',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '12px',
                maxHeight: '80px',
                overflow: 'hidden',
              }}>
                {forge.prompt?.slice(0, 200)}...
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleCopy(forge.prompt, forge.id)}
                  style={{
                    padding: '6px 14px',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: copied === forge.id ? '#3BFF8E' : 'var(--text-dim)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {copied === forge.id ? '✅ Copiado' : '📋 Copiar'}
                </button>
                <button
                  onClick={() => handleDelete(forge.id)}
                  style={{
                    padding: '6px 14px',
                    background: 'transparent',
                    border: '1px solid rgba(255,91,91,0.2)',
                    borderRadius: '6px',
                    color: '#FF5B5B',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
