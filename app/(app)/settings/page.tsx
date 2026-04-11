'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AI_PROVIDERS, FORGE_STRATEGY_PROFILES } from '@/lib/ai/catalog'
import {
  DEFAULT_FORGE_PREFERENCES,
  FORGE_PREFERENCES_STORAGE_KEY,
  parseForgePreferences,
} from '@/lib/forge/preferences'
import type { AIProviderRuntimeInfo, ForgePreferences } from '@/types'

type ProvidersResponse = {
  providers: AIProviderRuntimeInfo[]
  recommendedProvider: string
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<ForgePreferences>(DEFAULT_FORGE_PREFERENCES)
  const [providers, setProviders] = useState<AIProviderRuntimeInfo[]>([])
  const [recommendedProvider, setRecommendedProvider] = useState('manual')
  const [savedNotice, setSavedNotice] = useState('')

  useEffect(() => {
    const stored = parseForgePreferences(window.localStorage.getItem(FORGE_PREFERENCES_STORAGE_KEY))
    setPreferences(stored)

    const loadProviders = async () => {
      const response = await fetch('/api/providers', { cache: 'no-store' })
      const payload = (await response.json()) as ProvidersResponse
      setProviders(payload.providers)
      setRecommendedProvider(payload.recommendedProvider)
    }

    void loadProviders()
  }, [])

  const selectedProvider = useMemo(
    () =>
      providers.find((provider) => provider.id === preferences.defaultProvider) ??
      AI_PROVIDERS.find((provider) => provider.id === preferences.defaultProvider) ??
      AI_PROVIDERS[0],
    [preferences.defaultProvider, providers],
  )

  useEffect(() => {
    if (!selectedProvider.models.includes(preferences.defaultModel)) {
      setPreferences((current) => ({
        ...current,
        defaultModel: selectedProvider.models[0],
      }))
    }
  }, [preferences.defaultModel, selectedProvider])

  const handleSave = () => {
    window.localStorage.setItem(FORGE_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
    setSavedNotice('Configuracion guardada en este navegador.')
    window.setTimeout(() => setSavedNotice(''), 2500)
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '48px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '44px',
            color: 'var(--gold)',
            margin: 0,
          }}
        >
          Config
        </h1>
        <p style={{ color: 'var(--text-dim)', marginTop: '10px', maxWidth: '720px' }}>
          Aca definis el cerebro operativo del sistema: proveedor por defecto, perfil de ejecucion y
          las reglas de seguridad que siempre deben acompanar cada forge.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px' }}>Proveedor por defecto</h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '8px', maxWidth: '680px' }}>
                Recomendacion actual: <strong>{recommendedProvider}</strong>. Si queres mantener un flujo
                free-first, usa Gemini cuando tengas `GEMINI_API_KEY`; si no, deja el modo manual y pega el
                super prompt en tu chat favorito.
              </p>
            </div>
            <Link href="/forge" style={{ textDecoration: 'none' }}>
              <Button variant="ghost">Ir al Forge</Button>
            </Link>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
            {providers.map((provider) => {
              const isActive = provider.id === preferences.defaultProvider
              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() =>
                    setPreferences((current) => ({
                      ...current,
                      defaultProvider: provider.id,
                      defaultModel: provider.models[0],
                    }))
                  }
                  style={{
                    textAlign: 'left',
                    background: isActive ? 'rgba(200,169,106,0.08)' : 'var(--bg-card)',
                    border: isActive ? '1px solid var(--border-gold)' : '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '18px',
                    cursor: 'pointer',
                    color: 'var(--text)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <strong>{provider.label}</strong>
                        <Badge variant={provider.free ? 'green' : 'blue'} size="sm">
                          {provider.free ? 'Free-first' : 'BYOK'}
                        </Badge>
                        <Badge variant={provider.enabled ? 'gold' : 'ghost'} size="sm">
                          {provider.enabled ? 'Configurado' : 'No configurado'}
                        </Badge>
                      </div>
                      <p style={{ color: 'var(--text-dim)', margin: '8px 0 0' }}>{provider.description}</p>
                    </div>
                    {isActive ? <Badge variant="gold">Activo</Badge> : null}
                  </div>
                  <p style={{ color: 'var(--text-ghost)', margin: '10px 0 0', fontSize: '13px' }}>
                    {provider.recommendedUse}
                  </p>
                </button>
              )
            })}
          </div>
        </Card>

        <Card padding="lg">
          <h2 style={{ marginTop: 0, fontSize: '22px' }}>Motor por defecto</h2>
          <div style={{ display: 'grid', gap: '18px', marginTop: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>Modelo</label>
              <select
                value={preferences.defaultModel}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    defaultModel: event.target.value,
                  }))
                }
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {selectedProvider.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)' }}>
                Perfil de estrategia
              </label>
              <div style={{ display: 'grid', gap: '12px' }}>
                {FORGE_STRATEGY_PROFILES.map((profile) => {
                  const isActive = profile.id === preferences.strategyProfile
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() =>
                        setPreferences((current) => ({
                          ...current,
                          strategyProfile: profile.id,
                        }))
                      }
                      style={{
                        textAlign: 'left',
                        background: isActive ? 'rgba(91,158,255,0.1)' : 'var(--bg-card)',
                        border: isActive ? '1px solid rgba(91,158,255,0.35)' : '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '16px',
                        color: 'var(--text)',
                        cursor: 'pointer',
                      }}
                    >
                      <strong>{profile.label}</strong>
                      <p style={{ margin: '8px 0 0', color: 'var(--text-dim)' }}>{profile.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={preferences.strictSecurity}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      strictSecurity: event.target.checked,
                    }))
                  }
                />
                <span>Forzar protocolo estricto de seguridad en cada forge</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={preferences.saveHistory}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      saveHistory: event.target.checked,
                    }))
                  }
                />
                <span>Guardar resultados en historial</span>
              </label>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 style={{ marginTop: 0, fontSize: '22px' }}>Variables para conectar proveedores</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>
            No pongas keys en el cliente. Todo proveedor API se conecta por variables de entorno del servidor.
          </p>
          <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
            <Input label="Gemini" value="GEMINI_API_KEY" disabled />
            <Input label="DeepSeek" value="DEEPSEEK_API_KEY" disabled />
            <Input label="OpenAI" value="OPENAI_API_KEY" disabled />
            <Input label="Anthropic" value="ANTHROPIC_API_KEY" disabled />
          </div>
        </Card>

        <Card padding="lg">
          <h2 style={{ marginTop: 0, fontSize: '22px' }}>Seguridad base que ya queda activada</h2>
          <div style={{ display: 'grid', gap: '10px', marginTop: '16px', color: 'var(--text-dim)' }}>
            <div>• Security headers globales (CSP, frame protection, referrer policy, CORP y HSTS en prod).</div>
            <div>• Middleware con refresco de sesion de Supabase y redirect UX para zonas protegidas.</div>
            <div>• Rate limiting del forge por usuario/IP para bajar abuso y spam.</div>
            <div>• Validacion y sanitizacion server-side antes de tocar proveedores externos.</div>
            <div>• Auth revalidada en route handlers; middleware no queda como defensa unica.</div>
          </div>
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Button onClick={handleSave}>Guardar configuracion</Button>
          {savedNotice ? <span style={{ color: 'var(--green)' }}>{savedNotice}</span> : null}
        </div>
      </div>
    </div>
  )
}
