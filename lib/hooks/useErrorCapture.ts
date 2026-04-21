'use client'

/**
 * Hook para capturar errores en la DB del sistema de aprendizaje.
 * Usar en cualquier componente que detecte un error nuevo.
 * El sistema aprende de cada error para no repetirlo.
 */
export function useErrorCapture() {
  const capture = async (params: {
    error_message: string
    fix: string
    error_context?: string
    prevention_code?: string
    project_type?: string
  }) => {
    try {
      await fetch('/api/errors/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
    } catch {
      // silencioso — no interrumpir el flujo del usuario
    }
  }

  return { capture }
}
