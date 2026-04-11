'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { PLAYBOOKS } from '@/constants/playbooks'

export default function LibraryPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(PLAYBOOKS[0]?.id ?? '')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(PLAYBOOKS.map((playbook) => playbook.category)))],
    [],
  )

  const filteredPlaybooks = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return PLAYBOOKS.filter((playbook) => {
      const matchesCategory = activeCategory === 'All' || playbook.category === activeCategory
      const haystack = [
        playbook.title,
        playbook.oneLiner,
        playbook.outcome,
        playbook.category,
        ...playbook.bestFor,
        ...playbook.tools,
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery = !normalized || haystack.includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const selectedPlaybook =
    filteredPlaybooks.find((playbook) => playbook.id === selectedId) ?? filteredPlaybooks[0] ?? null

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', paddingBottom: '48px' }}>
      <div style={{ marginBottom: '28px' }}>
        <Badge variant="blue">Playbooks</Badge>
        <h1
          style={{
            margin: '14px 0 0',
            fontFamily: 'var(--font-display)',
            fontSize: '46px',
            color: 'var(--gold)',
          }}
        >
          Library
        </h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: '760px', marginTop: '10px' }}>
          Playbooks ejecutables para salir de idea vaga a sistema util. La logica es simple:
          elegir uno, ejecutar el sprint, medir y guardar aprendizaje en Vault.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '18px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        <Card padding="lg">
          <Input
            label="Buscar playbook"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="landing, finanzas, python, clientes..."
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
            {categories.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '999px',
                    border: isActive ? '1px solid var(--border-gold)' : '1px solid var(--border)',
                    background: isActive ? 'rgba(200,169,106,0.12)' : 'transparent',
                    color: isActive ? 'var(--gold)' : 'var(--text-dim)',
                    cursor: 'pointer',
                  }}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'grid', gap: '10px', marginTop: '18px' }}>
            {filteredPlaybooks.map((playbook) => {
              const isActive = playbook.id === selectedPlaybook?.id
              return (
                <button
                  key={playbook.id}
                  type="button"
                  onClick={() => setSelectedId(playbook.id)}
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    borderRadius: '14px',
                    border: isActive ? '1px solid var(--border-gold)' : '1px solid var(--border)',
                    background: isActive ? 'rgba(200,169,106,0.08)' : 'var(--bg-card)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <strong>{playbook.title}</strong>
                    <Badge variant="ghost" size="sm">
                      {playbook.category}
                    </Badge>
                  </div>
                  <p style={{ color: 'var(--text-dim)', margin: '8px 0 0' }}>{playbook.oneLiner}</p>
                </button>
              )
            })}
          </div>
        </Card>

        <Card padding="lg">
          {selectedPlaybook ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Badge variant="gold">{selectedPlaybook.category}</Badge>
                {selectedPlaybook.inspiredBy ? <Badge variant="purple">{selectedPlaybook.inspiredBy}</Badge> : null}
              </div>

              <h2 style={{ margin: '14px 0 0', fontSize: '32px' }}>{selectedPlaybook.title}</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '10px' }}>{selectedPlaybook.outcome}</p>

              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  marginTop: '20px',
                }}
              >
                <Card padding="md">
                  <strong>Best for</strong>
                  <div style={{ display: 'grid', gap: '8px', marginTop: '12px', color: 'var(--text-dim)' }}>
                    {selectedPlaybook.bestFor.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </Card>

                <Card padding="md">
                  <strong>Monetizacion</strong>
                  <div style={{ display: 'grid', gap: '8px', marginTop: '12px', color: 'var(--text-dim)' }}>
                    {selectedPlaybook.monetization.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card padding="md">
                <strong>Sprint operativo</strong>
                <div style={{ display: 'grid', gap: '10px', marginTop: '12px', color: 'var(--text-dim)' }}>
                  {selectedPlaybook.sprintSteps.map((item, index) => (
                    <div key={item}>
                      {index + 1}. {item}
                    </div>
                  ))}
                </div>
              </Card>

              <div
                style={{
                  display: 'grid',
                  gap: '16px',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  marginTop: '16px',
                }}
              >
                <Card padding="md">
                  <strong>Deliverables</strong>
                  <div style={{ display: 'grid', gap: '8px', marginTop: '12px', color: 'var(--text-dim)' }}>
                    {selectedPlaybook.deliverables.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </Card>

                <Card padding="md">
                  <strong>Herramientas</strong>
                  <div style={{ display: 'grid', gap: '8px', marginTop: '12px', color: 'var(--text-dim)' }}>
                    {selectedPlaybook.tools.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <p style={{ color: 'var(--text-dim)' }}>No hay playbooks para ese filtro.</p>
          )}
        </Card>
      </div>
    </div>
  )
}
