'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { CATEGORIES, OUTPUT_TYPES, TEMPLATES } from '@/constants/templates'
import { FORGE_STRATEGY_PROFILES } from '@/lib/ai/catalog'
import { AI_MODELS_BY_TYPE, getModelById } from '@/lib/ai/model-database'
import type { AIModelType } from '@/lib/ai/model-database'
import {
  DEFAULT_FORGE_PREFERENCES,
  FORGE_PREFERENCES_STORAGE_KEY,
  parseForgePreferences,
} from '@/lib/forge/preferences'
import { buildVaultContext, parseVaultEntries, VAULT_STORAGE_KEY } from '@/lib/vault/storage'
import type {
  AIProviderRuntimeInfo,
  ForgeCategory,
  ForgeGenerationResponse,
  ForgeOutputType,
  ForgePreferences,
  VaultEntry,
} from '@/types'

type ProvidersResponse = {
  providers: AIProviderRuntimeInfo[]
  recommendedProvider: string
}

const DEFAULT_IDEA =
  'Quiero construir un sistema que convierta una idea en un plan, un deliverable y una ruta de ejecucion real sin perder tiempo en vueltas.'

export default function ForgePage() {
  const [idea, setIdea] = useState(DEFAULT_IDEA)
  const [target, setTarget] = useState('')
  const [precio, setPrecio] = useState('')
  const [diferencial, setDiferencial] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [constraints, setConstraints] = useState('')
  const [category, setCategory] = useState<ForgeCategory>('saas')
  const [outputType, setOutputType] = useState<ForgeOutputType>('full_system')
  const [templateId, setTemplateId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [tone, setTone] = useState('')
  const [osEnv, setOsEnv] = useState('')
  const [targetModelType, setTargetModelType] = useState<AIModelType>('text')
  const [targetModel, setTargetModel] = useState('')
  const [preferences, setPreferences] = useState<ForgePreferences>(DEFAULT_FORGE_PREFERENCES)
  const [providers, setProviders] = useState<AIProviderRuntimeInfo[]>([])
  const [vaultEntries, setVaultEntries] = useState<VaultEntry[]>([])
  const [selectedMemoryIds, setSelectedMemoryIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ForgeGenerationResponse | null>(null)

  useEffect(() => {
    const stored = parseForgePreferences(window.localStorage.getItem(FORGE_PREFERENCES_STORAGE_KEY))
    setPreferences(stored)
    const storedVault = parseVaultEntries(window.localStorage.getItem(VAULT_STORAGE_KEY))
    setVaultEntries(storedVault)

    const loadProviders = async () => {
      const response = await fetch('/api/providers', { cache: 'no-store' })
      const payload = (await response.json()) as ProvidersResponse
      setProviders(payload.providers)
    }

    void loadProviders()
  }, [])

  const activeProvider = useMemo(
    () => providers.find((provider) => provider.id === preferences.defaultProvider) ?? providers[0],
    [preferences.defaultProvider, providers],
  )

  useEffect(() => {
    if (!activeProvider) {
      return
    }

    if (!activeProvider.models.includes(preferences.defaultModel)) {
      setPreferences((current) => ({
        ...current,
        defaultModel: activeProvider.models[0],
      }))
    }
  }, [activeProvider, preferences.defaultModel])

  const activeTemplate = useMemo(
    () => TEMPLATES.find((template) => template.id === templateId) ?? null,
    [templateId],
  )

  const suggestedMemory = useMemo(() => {
    const haystack = `${idea} ${category} ${outputType}`.toLowerCase()
    return vaultEntries
      .filter((entry) =>
        [entry.title, entry.summary, entry.lesson, entry.projectType, ...entry.tags]
          .join(' ')
          .toLowerCase()
          .split(' ')
          .some((token) => token && haystack.includes(token)),
      )
      .slice(0, 4)
  }, [category, idea, outputType, vaultEntries])

  useEffect(() => {
    if (suggestedMemory.length > 0 && selectedMemoryIds.length === 0) {
      setSelectedMemoryIds(suggestedMemory.slice(0, 2).map((entry) => entry.id))
    }
  }, [selectedMemoryIds.length, suggestedMemory])

  const applyTemplate = (nextTemplateId: string) => {
    const template = TEMPLATES.find((item) => item.id === nextTemplateId)
    setTemplateId(nextTemplateId)

    if (!template) {
      return
    }

    setCategory(template.category)

    if (!idea || idea === DEFAULT_IDEA) {
      setIdea(template.prefill)
    }

    if (template.prefillBrandName) {
      setBrandName(template.prefillBrandName)
    }

    if (template.prefillTone) {
      setTone(template.prefillTone)
    }

    if (template.prefillOsEnv) {
      setOsEnv(template.prefillOsEnv)
    }

    if (template.prefillOutputType) {
      setOutputType(template.prefillOutputType)
    }

    if (template.prefillTargetModel) {
      setTargetModel(template.prefillTargetModel)
    }
  }

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const selectedMemory = vaultEntries.filter((entry) => selectedMemoryIds.includes(entry.id))

      const response = await fetch('/api/forge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea,
          category,
          outputType,
          provider: preferences.defaultProvider,
          model: preferences.defaultModel,
          strategyProfile: preferences.strategyProfile,
          templateId: templateId || undefined,
          answers: {
            target,
            precio,
            diferencial,
            objetivo,
            constraints,
            brandName,
            tone,
            osEnv,
            targetModel: targetModel || undefined,
            memoryContext: buildVaultContext(selectedMemory),
          },
        }),
      })

      const payload = (await response.json()) as ForgeGenerationResponse & { error?: string }

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'No se pudo ejecutar el forge.')
      }

      if (preferences.saveHistory) {
        window.localStorage.setItem(FORGE_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
      }

      setResult(payload)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrio un error inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '48px' }}>
      <div style={{ marginBottom: '28px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Badge variant="gold">GOD SYSTEM ENGINE</Badge>
          <Badge variant="blue">{preferences.strategyProfile.toUpperCase()}</Badge>
          <Badge variant="green">
            {preferences.defaultProvider === 'manual' ? 'MODO MANUAL (Sin Costo API)' : preferences.defaultProvider.toUpperCase()}
          </Badge>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '56px',
            color: 'var(--gold)',
            margin: '16px 0 0',
            letterSpacing: '-1px',
            textShadow: '0 0 20px rgba(224, 187, 113, 0.3)',
          }}
        >
          El Forge 🪄
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginTop: '12px', maxWidth: '800px', lineHeight: '1.6' }}>
          Convierte ideas vagas en verdaderos <strong>imperios paso a paso</strong>. 
          Llena la información de abajo. El "God System" armará el código, los copys, los pasos técnicos y el esquema exacto para que no tengas que pensar en CÓMO hacerlo, sino en CUÁNDO empezar (HOY).
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        <Card padding="lg" style={{ border: '1px solid rgba(224, 187, 113, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '28px', color: 'var(--text)' }}>1. La Idea Central 💬</h2>
              <p style={{ color: 'var(--gold)', marginTop: '8px', maxWidth: '700px', fontWeight: 500 }}>
                ¿De qué trata tu proyecto? No escatimes en detalles.
              </p>
            </div>
            <Link href="/settings" style={{ textDecoration: 'none' }}>
              <Button variant="ghost">⚙️ Ajustar Motor IA</Button>
            </Link>
          </div>

          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontWeight: 'bold' }}>
              Describe lo que quieres lograr (El "Qué")
            </label>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Ejemplo: Quiero armar una pizzería napolitana en Uruguay que sólo venda por Instagram, con envío en 30 minutos y pizzas hechas a leña..."
              rows={4}
              style={{
                width: '100%',
                resize: 'vertical',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '16px',
                lineHeight: '1.5',
                transition: 'border 0.3s ease',
              }}
            />
            <small style={{ display: 'block', marginTop: '8px', color: 'var(--text-ghost)'}}>
              <strong>Tip:</strong> Si no sabes qué escribir, clickea en un Template (sección 2) para rellenar este campo automáticamente.
            </small>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '20px',
              marginTop: '24px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                Target (¿A quién se lo vendes?)
              </label>
              <Input
                placeholder="Ej: Hombres 20-35 años, oficinistas..."
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />
            </div>

            {(category === 'ecommerce' || category === 'saas' || category === 'agencia' || category === 'ads' || category === 'contenido') && (
              <>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                    Nombre de Marca / Entidad
                  </label>
                  <Input
                    placeholder="Ej: Pizzería Luigi, CodeForge..."
                    value={brandName}
                    onChange={(event) => setBrandName(event.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                    Identidad / Tono de voz
                  </label>
                  <Input
                    placeholder="Ej: Rebelde, formal, corporativo..."
                    value={tone}
                    onChange={(event) => setTone(event.target.value)}
                  />
                </div>
              </>
            )}

            {(category === 'codigo' || category === 'agentes_ia' || category === 'automatizacion') && (
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                  Stack OS / Entorno
                </label>
                <Input
                  placeholder="Ej: Windows 11, Node.js 18, Python 3.10..."
                  value={osEnv}
                  onChange={(event) => setOsEnv(event.target.value)}
                />
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                Diferencial (¿Por qué te van a elegir?)
              </label>
              <Input
                placeholder="Ej: Pizza a la leña cruda traída de Italia..."
                value={diferencial}
                onChange={(event) => setDiferencial(event.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                Presupuesto (Stack Gratis por defecto)
              </label>
              <Input
                placeholder="Ej: Solo quiero herramientas gratis como Vercel/Make..."
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-dim)' }}>
                Objetivo (Tu meta final o KPI)
              </label>
              <Input
                placeholder="Ej: Primeras 100 ventas en 2 horas."
                value={objetivo}
                onChange={(event) => setObjetivo(event.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>
              Limitaciones o "Miedos" conocidos ⚠️
            </label>
            <textarea
              value={constraints}
              onChange={(event) => setConstraints(event.target.value)}
              placeholder="Ej: No se programar nada, no tengo plata para pagar ChatGPT premium u otras APIS. Todo debe ser sin código y sin tarjeta de crédito."
              rows={2}
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
        </Card>

        <Card padding="lg">
          <h2 style={{ margin: 0, fontSize: '28px', color: 'var(--text)' }}>2. Elige tu Formato de Salida y Categoria 🧩</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '8px', marginBottom: '24px' }}>
            Dile al sistema <strong>exactamente qué archivo o formato</strong> necesitas que te devuelva.
          </p>

          <div style={{ marginTop: '14px', marginBottom: '26px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>Templates Rápidos:</div>
            </div>
            <p style={{ color: 'var(--text-ghost)', fontSize: '14px', margin: '6px 0 14px' }}>
              ¿Necesitas inspiración? Toca un botón para autocompletar la "Idea" y categoría con una fórmula ganadora.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {TEMPLATES.map((template) => {
                const isActive = template.id === templateId
                return (
                  <button
                    key={template.id}
                    title={template.desc}
                    type="button"
                    onClick={() => applyTemplate(template.id)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '999px',
                      border: isActive ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: isActive ? 'rgba(224, 187, 113, 0.15)' : 'var(--bg)',
                      color: isActive ? 'var(--gold)' : 'var(--text-dim)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 0 10px rgba(224, 187, 113, 0.2)' : 'none',
                    }}
                  >
                    <span style={{ marginRight: '6px' }}>{template.icon}</span>
                    {template.label}
                  </button>
                )
              })}
            </div>
            {activeTemplate ? (
              <div style={{ margin: '14px 0 0', color: 'var(--gold)', fontSize: '15px' }}>
                ↳ <strong>Aplicando plantilla:</strong> {activeTemplate.desc}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'grid',
              gap: '24px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              padding: '24px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '14px',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontWeight: 'bold' }}>Categoría de Negocio</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as ForgeCategory)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--text)',
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.icon} {item.label}
                  </option>
                ))}
              </select>
              <small style={{display: 'block', marginTop: '6px', color: 'var(--text-ghost)'}}>
                El sector general del proyecto. Determina las sugerencias de la IA.
              </small>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontWeight: 'bold' }}>
                Formato Deseado (El Resultado Literal)
              </label>
              <select
                value={outputType}
                onChange={(event) => setOutputType(event.target.value as ForgeOutputType)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--text)',
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                {OUTPUT_TYPES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <small style={{display: 'block', marginTop: '6px', color: 'var(--text-ghost)'}}>
                "Sistema Maestro" es el más completo (Incluirá copy, tutorial de lanzamiento y plan financiero).
              </small>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>3. Vault (Memoria del Sistema) 🧠</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '8px', maxWidth: '760px', lineHeight: '1.5' }}>
                El Forge cometerá errores. Cuando un proyecto falla o un prompt tuyo no va bien, 
                guárdalo en <strong>Tu Vault</strong>. Aquí abajo puedes inyectar esas memorias previas 
                para que el sistema NO vuelva a cometer los mismos errores o reuse copys exitosos del pasado.
              </p>
            </div>
            <Link href="/vault" style={{ textDecoration: 'none' }}>
              <Button variant="ghost">🗄️ Administrar Memoria</Button>
            </Link>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
            {suggestedMemory.length > 0 ? (
              suggestedMemory.map((entry) => {
                const isChecked = selectedMemoryIds.includes(entry.id)
                return (
                  <label
                    key={entry.id}
                    style={{
                      display: 'block',
                      padding: '16px',
                      borderRadius: '14px',
                      border: isChecked ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: isChecked ? 'rgba(224, 187, 113, 0.08)' : 'var(--bg-card)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          setSelectedMemoryIds((current) =>
                            current.includes(entry.id)
                              ? current.filter((id) => id !== entry.id)
                              : [...current, entry.id],
                          )
                        }
                        style={{ marginTop: '4px', transform: 'scale(1.2)' }}
                      />
                      <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '16px', color: isChecked ? 'var(--gold)' : 'var(--text)'}}>{entry.title}</strong>
                          <Badge variant="ghost" size="sm">
                            {entry.kind.toUpperCase()}
                          </Badge>
                        </div>
                        <p style={{ color: 'var(--text-dim)', margin: '8px 0 0', fontSize: '14px' }}>{entry.summary}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            ) : (
              <div style={{ color: 'var(--text-dim)', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', textAlign: 'center' }}>
                Tu memoria está vacía. Cuando empieces a ganar o a cometer errores, guarda esos aprendizajes en el "Vault".
              </div>
            )}
          </div>
        </Card>

        <Card padding="lg">
          <h2 style={{ margin: 0, fontSize: '24px', color: 'var(--text)' }}>4. IA de Destino 🎯</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '8px', marginBottom: '24px', maxWidth: '760px', lineHeight: '1.5' }}>
            ¿En qué IA vas a pegar el Súper Prompt o ejecutar el resultado? El sistema adaptará las instrucciones exactamente para esa IA — su formato, sus límites y sus mejores trucos de prompting.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {(['text', 'image', 'video'] as AIModelType[]).map((type) => {
              const labels: Record<AIModelType, string> = { text: '💬 LLM / Texto', image: '🖼️ Imagen', video: '🎬 Video' }
              const isActive = targetModelType === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => { setTargetModelType(type); setTargetModel('') }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '999px',
                    border: isActive ? '1px solid var(--gold)' : '1px solid var(--border)',
                    background: isActive ? 'rgba(224, 187, 113, 0.15)' : 'var(--bg)',
                    color: isActive ? 'var(--gold)' : 'var(--text-dim)',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  {labels[type]}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {AI_MODELS_BY_TYPE[targetModelType].map((model) => {
              const isSelected = targetModel === model.id
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setTargetModel(isSelected ? '' : model.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(224, 187, 113, 0.08)' : 'var(--bg-card)',
                    color: 'var(--text)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? '0 0 12px rgba(224, 187, 113, 0.2)' : 'none',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: isSelected ? 'var(--gold)' : 'var(--text)' }}>
                    {model.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-ghost)', marginBottom: '8px' }}>
                    {model.provider} · {model.version}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                    {model.strengths[0]}
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {model.freeAccess && (
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(60, 200, 100, 0.15)', color: '#4CAF82' }}>✓ Gratis</span>
                    )}
                    {model.contextWindow && (
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-ghost)' }}>ctx: {(model.contextWindow / 1000).toFixed(0)}k</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {targetModel && (() => {
            const model = getModelById(targetModel)
            if (!model) return null
            return (
              <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', border: '1px solid var(--gold)', background: 'rgba(224, 187, 113, 0.05)' }}>
                <div style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>🎯 IA Seleccionada: {model.label}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  <strong>Mejores para:</strong> {model.bestFor.join(' · ')}<br />
                  <strong>Precio:</strong> {model.pricingNote}<br />
                  {model.freeNote && <><strong>Gratis:</strong> {model.freeNote}<br /></>}
                  <strong>El prompt se optimizará específicamente con sus {model.promptRules.length} reglas internas.</strong>
                </div>
                <a href={model.accessUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '10px', color: 'var(--gold)', fontSize: '13px', textDecoration: 'underline' }}>
                  Abrir {model.provider} ↗
                </a>
              </div>
            )
          })()}
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Button onClick={handleSubmit} loading={loading} size="lg" style={{ 
            fontSize: '20px', 
            padding: '14px 48px', 
            background: 'var(--gold)', 
            color: 'black', 
            boxShadow: '0 0 20px rgba(224, 187, 113, 0.4)' 
          }}>
            ⚡ Encender Forge
          </Button>
          <div style={{ color: 'var(--text-ghost)', fontSize: '14px' }}>
            Procesando a través de: <strong>{preferences.defaultProvider.toUpperCase()}</strong>
          </div>
          {error ? <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>{error}</span> : null}
        </div>

        {result ? (
          <div style={{ marginTop: '20px' }}>
            <Card padding="lg" style={{ border: '2px solid var(--gold)', boxShadow: '0 0 40px rgba(224, 187, 113, 0.1)' }}>
              
              <div style={{ marginBottom: '32px', textAlign: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                <h2 style={{ fontSize: '38px', color: 'var(--gold)', margin: '0 0 10px 0', fontFamily: 'var(--font-display)' }}>
                  {result.provider === 'manual' ? '🎯 Tu Sistema Maestro está Listo' : '🔮 Forge Generado'}
                </h2>
                {result.provider === 'manual' && (
                  <p style={{ color: 'var(--text-dim)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
                    Al estar en <strong>Modo Manual</strong> (sin costo de API), debes copiar el <strong>Súper Prompt</strong> que generamos y pegarlo ahora mismo en la Inteligencia Artificial que uses habitualmente.
                  </p>
                )}
              </div>

              {result.provider === 'manual' && (
                <div style={{ background: 'var(--bg)', border: '1px solid rgba(224, 187, 113, 0.5)', padding: '24px', borderRadius: '16px', marginBottom: '32px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 16px', color: 'var(--text)' }}>👉 COPIA y PEGA en ChatGPT o Claude:</h3>
                  <Button 
                    onClick={() => copyText(result.superPrompt)}
                    style={{ fontSize: '18px', padding: '12px 32px', background: 'var(--text)', color: 'var(--bg)' }}
                  >
                    📋 Copiar Súper Prompt Completo
                  </Button>
                  <p style={{ color: 'var(--text-ghost)', fontSize: '14px', marginTop: '14px' }}>
                    <em>* Esto obligará a la IA a seguir el "Protocolo Dios" y te entregará el código, textos y guía paso a paso.</em>
                  </p>
                </div>
              )}

              {result.warnings.length > 0 ? (
                <div style={{ marginTop: '18px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,91,91,0.08)', border: '1px solid rgba(255,91,91,0.2)', color: 'var(--red)', marginBottom: '32px' }}>
                  {result.warnings.map((warning) => (
                    <div key={warning}>⚠️ {warning}</div>
                  ))}
                </div>
              ) : null}

              <div style={{ display: 'grid', gap: '24px' }}>
                
                {/* Visualizacion de respuesta desde API o Analisis previo manual */}
                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>💥 Diagnóstico Bruto</h4>
                    <p style={{ color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{result.structuredResult.diagnostic}</p>
                  </Card>

                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>🛑 Causa Raíz Frecuente</h4>
                    <p style={{ color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{result.structuredResult.rootCause}</p>
                  </Card>
                </div>

                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>♟️ Estrategia Optimizada</h4>
                    <div style={{ display: 'grid', gap: '10px', color: 'var(--text-dim)' }}>
                      {result.structuredResult.strategy.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: '8px' }}><span>✓</span> <span>{item}</span></div>
                      ))}
                    </div>
                  </Card>

                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>🚀 Plan de Vuelo Inicial</h4>
                    <div style={{ display: 'grid', gap: '10px', color: 'var(--text-dim)' }}>
                      {result.structuredResult.executionPlan.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: '8px' }}><span>👉</span> <span>{item}</span></div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>🛡️ Protocolo Seguridad</h4>
                    <div style={{ display: 'grid', gap: '10px', color: 'var(--text-dim)' }}>
                      {result.structuredResult.securityProtocol.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: '8px' }}><span>🔒</span> <span>{item}</span></div>
                      ))}
                    </div>
                  </Card>

                  <Card padding="md" style={{ background: 'var(--bg-card)' }}>
                    <h4 style={{ margin: '0 0 10px', color: 'var(--text)' }}>📊 KPIs (Éxito Medible)</h4>
                    <div style={{ display: 'grid', gap: '10px', color: 'var(--text-dim)' }}>
                      {result.structuredResult.kpis.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: '8px' }}><span>📈</span> <span>{item}</span></div>
                      ))}
                    </div>
                  </Card>
                </div>

                {result.provider !== 'manual' && (
                   <Card padding="lg" style={{ background: 'rgba(224, 187, 113, 0.05)', border: '1px solid var(--gold)' }}>
                     <h3 style={{ margin: '0 0 16px', color: 'var(--gold)' }}>🎁 Entregable Maestro (Final Deliverable)</h3>
                     <p style={{ color: 'var(--text)', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '15px' }}>
                       {result.structuredResult.finalDeliverable}
                     </p>
                   </Card>
                )}

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link href="/vault" style={{ textDecoration: 'none' }}>
                      <Button variant="ghost" style={{ border: '1px solid var(--border)' }}>
                        💾 Guardar Resultado en el Vault
                      </Button>
                    </Link>
                </div>

              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}
