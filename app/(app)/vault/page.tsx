'use client'

import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { DEFAULT_VAULT_ENTRIES, parseVaultEntries, VAULT_STORAGE_KEY } from '@/lib/vault/storage'
import type { VaultEntry, VaultEntryKind } from '@/types'

const ENTRY_KINDS: VaultEntryKind[] = [
  'error',
  'solution',
  'prompt',
  'playbook',
  'checklist',
  'winning-system',
]

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function VaultPage() {
  const [entries, setEntries] = useState<VaultEntry[]>(DEFAULT_VAULT_ENTRIES)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<VaultEntryKind>('solution')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [lesson, setLesson] = useState('')
  const [projectType, setProjectType] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const stored = parseVaultEntries(window.localStorage.getItem(VAULT_STORAGE_KEY))
    setEntries(stored)
  }, [])

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return entries
    }

    return entries.filter((entry) =>
      [entry.title, entry.summary, entry.lesson, entry.projectType, ...entry.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [entries, query])

  const persistEntries = (nextEntries: VaultEntry[]) => {
    setEntries(nextEntries)
    window.localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(nextEntries))
  }

  const handleAddEntry = () => {
    if (!title.trim() || !lesson.trim()) {
      setStatus('Titulo y leccion son obligatorios.')
      return
    }

    const nextEntry: VaultEntry = {
      id: uid(),
      title: title.trim(),
      kind,
      summary: summary.trim() || lesson.trim().slice(0, 120),
      lesson: lesson.trim(),
      projectType: projectType.trim() || 'general',
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      source: 'manual',
      createdAt: new Date().toISOString(),
    }

    const nextEntries = [nextEntry, ...entries]
    persistEntries(nextEntries)
    setTitle('')
    setSummary('')
    setLesson('')
    setProjectType('')
    setTags('')
    setStatus('Entrada guardada.')
  }

  const handleDelete = (id: string) => {
    const nextEntries = entries.filter((entry) => entry.id !== id)
    persistEntries(nextEntries)
    setStatus('Entrada eliminada.')
  }

  const handleExport = async () => {
    await navigator.clipboard.writeText(JSON.stringify(entries, null, 2))
    setStatus('Vault copiado en JSON.')
  }

  const handleReset = () => {
    persistEntries(DEFAULT_VAULT_ENTRIES)
    setStatus('Vault restaurado a la semilla inicial.')
  }

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', paddingBottom: '48px' }}>
      <div style={{ marginBottom: '28px' }}>
        <Badge variant="purple">Memoria</Badge>
        <h1
          style={{
            margin: '14px 0 0',
            fontFamily: 'var(--font-display)',
            fontSize: '46px',
            color: 'var(--gold)',
          }}
        >
          Vault
        </h1>
        <p style={{ color: 'var(--text-dim)', maxWidth: '760px', marginTop: '10px' }}>
          Aca guardas errores, soluciones, prompts y sistemas ganadores. Forge puede reutilizar esta memoria
          para no repetir fallos y acelerar ejecucion.
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
          <h2 style={{ marginTop: 0, fontSize: '24px' }}>Nueva entrada</h2>

          <div style={{ display: 'grid', gap: '14px', marginTop: '14px' }}>
            <Input label="Titulo" value={title} onChange={(event) => setTitle(event.target.value)} />
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Tipo</label>
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value as VaultEntryKind)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {ENTRY_KINDS.map((entryKind) => (
                  <option key={entryKind} value={entryKind}>
                    {entryKind}
                  </option>
                ))}
              </select>
            </div>
            <Input label="Resumen corto" value={summary} onChange={(event) => setSummary(event.target.value)} />
            <Input label="Tipo de proyecto" value={projectType} onChange={(event) => setProjectType(event.target.value)} />
            <Input label="Tags (coma separada)" value={tags} onChange={(event) => setTags(event.target.value)} />
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Leccion / solucion</label>
              <textarea
                value={lesson}
                onChange={(event) => setLesson(event.target.value)}
                rows={8}
                style={{
                  width: '100%',
                  resize: 'vertical',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
            <Button onClick={handleAddEntry}>Guardar entrada</Button>
            <Button variant="ghost" onClick={handleExport}>Copiar JSON</Button>
            <Button variant="danger" onClick={handleReset}>Reset semilla</Button>
          </div>
          {status ? <p style={{ color: 'var(--text-dim)', marginTop: '12px' }}>{status}</p> : null}
        </Card>

        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ marginTop: 0, fontSize: '24px' }}>Entradas guardadas</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>
                {entries.length} lecciones reutilizables.
              </p>
            </div>
            <div style={{ minWidth: '280px' }}>
              <Input
                label="Buscar en memoria"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="auth, landing, python, pricing..."
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginTop: '18px' }}>
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong>{entry.title}</strong>
                      <Badge variant="ghost" size="sm">
                        {entry.kind}
                      </Badge>
                      <Badge variant="blue" size="sm">
                        {entry.projectType}
                      </Badge>
                    </div>
                    <p style={{ color: 'var(--text-dim)', margin: '8px 0 0' }}>{entry.summary}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,91,91,0.3)',
                      background: 'transparent',
                      color: 'var(--red)',
                      cursor: 'pointer',
                      height: 'fit-content',
                    }}
                  >
                    Eliminar
                  </button>
                </div>

                <div
                  style={{
                    marginTop: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text-dim)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {entry.lesson}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="gold" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
