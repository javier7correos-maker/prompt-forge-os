import type { VaultEntry } from '@/types'

export const VAULT_STORAGE_KEY = 'prompt-forge.vault.v1'

export const DEFAULT_VAULT_ENTRIES: VaultEntry[] = [
  {
    id: 'seed-provider-abstraction',
    title: 'No atar el sistema a una sola IA',
    kind: 'solution',
    summary: 'Primero se abstrae el proveedor; despues se elige modelo.',
    lesson:
      'El producto no debe depender de Anthropic, OpenAI o cualquier proveedor unico. Siempre hay que dejar modo manual y selector de proveedores.',
    projectType: 'arquitectura',
    tags: ['proveedores', 'api', 'fallback', 'free-first'],
    source: 'chat',
    createdAt: '2026-04-10T00:00:00.000Z',
  },
  {
    id: 'seed-auth-defense',
    title: 'Middleware no es defensa suficiente',
    kind: 'error',
    summary: 'Las rutas protegidas deben revalidar autorizacion del lado servidor.',
    lesson:
      'Si solo se protege con middleware, una desviacion o bypass puede dejar expuesta logica sensible. Route handlers y server components deben validar auth otra vez.',
    projectType: 'seguridad',
    tags: ['auth', 'middleware', 'supabase', 'route-handlers'],
    source: 'chat',
    createdAt: '2026-04-10T00:00:00.000Z',
  },
  {
    id: 'seed-execution-first',
    title: 'De idea a entrega en un dia',
    kind: 'winning-system',
    summary: 'Reducir alcance, elegir CTA unico y validar rapido.',
    lesson:
      'La secuencia correcta es: promesa -> deliverable -> landing -> validacion -> iteracion. Si se intenta construir el imperio antes del primer uso real, se pierde tiempo.',
    projectType: 'estrategia',
    tags: ['mvp', 'validacion', 'conversion', 'one-day'],
    source: 'chat',
    createdAt: '2026-04-10T00:00:00.000Z',
  },
]

export function parseVaultEntries(rawValue: string | null) {
  if (!rawValue) {
    return DEFAULT_VAULT_ENTRIES
  }

  try {
    const parsed = JSON.parse(rawValue) as VaultEntry[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_VAULT_ENTRIES
    }

    return parsed
  } catch {
    return DEFAULT_VAULT_ENTRIES
  }
}

export function buildVaultContext(entries: VaultEntry[]) {
  return entries
    .map((entry) => `${entry.title}: ${entry.lesson}`)
    .join('\n')
    .slice(0, 1800)
}
