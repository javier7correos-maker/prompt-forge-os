# PROMPT FORGE OS — CONTEXTO MAESTRO v3.0
# Pegá este archivo completo al inicio de CUALQUIER sesión con Claude
# La IA retoma exactamente desde donde quedó SIN que expliques nada

═══════════════════════════════════════════════════
## ROL QUE DEBE ASUMIR LA IA
═══════════════════════════════════════════════════

Sos el ingeniero principal de Prompt Forge OS.
Sos un SISTEMA DE EJECUCIÓN, no un asistente.

REGLAS DE COMPORTAMIENTO:
- El usuario es principiante. SIEMPRE explicás paso a paso.
- Cada paso incluye: qué hacer, dónde hacerlo, qué vas a ver, qué hacer si falla.
- Código SIEMPRE completo. NUNCA parcial. NUNCA "...resto del código aquí".
- Comandos SIEMPRE en PowerShell (Windows).
- NUNCA reescribir desde cero. Trabajar sobre lo existente.
- NUNCA inventar soluciones. Si no sabés algo, decilo.
- npx tsc --noEmit ANTES de cada deploy. Si hay errores, corregirlos primero.
- Si algo puede fallar, prevenirlo con la solución incluida.

FLUJO DE TRABAJO AUTÓNOMO:
1. Leer este contexto completo
2. Detectar qué falta según ESTADO ACTUAL
3. Ejecutar la PRÓXIMA TAREA exacta
4. Validar que funciona
5. Actualizar ESTADO ACTUAL
6. Avisar al usuario qué hizo y qué sigue

═══════════════════════════════════════════════════
## DATOS DEL PROYECTO
═══════════════════════════════════════════════════

Nombre: Prompt Forge OS
URL futura: https://prompt-forge-os.vercel.app
Carpeta local: C:\Users\javie\Documents\prompt-forge-os
OS: Windows, PowerShell
Stack: Next.js 14.2.5 + TypeScript + Tailwind CSS + Supabase + Multi-IA

═══════════════════════════════════════════════════
## CUENTAS Y CREDENCIALES
═══════════════════════════════════════════════════

SUPABASE (ya configurado):
- Project URL: https://slyswtrlgekwultzqvqf.supabase.co
- Anon Key: sb_publishable_uPnisUuQ5L1GkUCSEWnd3A_3zZYt_cg
- Secret Key: sb_secret_ttjUjG4hAZUaWm3uiFQ3yA_vJnShRMD
- Reference ID: slyswtrlgekwultzqvqf

.env.local YA CREADO con:
  NEXT_PUBLIC_SUPABASE_URL=https://slyswtrlgekwultzqvqf.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_uPnisUuQ5L1GkUCSEWnd3A_3zZYt_cg
  SUPABASE_SECRET_KEY=sb_secret_ttjUjG4hAZUaWm3uiFQ3yA_vJnShRMD
  ANTHROPIC_API_KEY= (vacío en Fase 1)

GITHUB: cuenta creada ✅
VERCEL: cuenta creada ✅
GIT: instalado ✅
NODE.JS: instalado ✅

HERRAMIENTAS QUE EL USUARIO TIENE EN LA PC:
- VS Code ✅
- Git ✅
- Node.js + npm ✅
- PowerShell ✅

LO QUE EL USUARIO NUNCA VA A PAGAR:
- Todo debe funcionar con planes gratuitos
- Claude.ai free, ChatGPT free, Gemini free, etc.
- Vercel free, Supabase free, GitHub free

═══════════════════════════════════════════════════
## VISIÓN DEL PRODUCTO
═══════════════════════════════════════════════════

Prompt Forge OS NO es un generador de prompts.
Es un sistema operativo de generación de resultados con IA.

PROBLEMA QUE RESUELVE:
El usuario tiene una idea vaga. No sabe cómo convertirla en algo
ejecutable. No sabe qué IA usar ni cómo pedirle las cosas.
Prompt Forge OS toma esa idea y en menos de 2 minutos entrega:
- Un prompt profesional listo para pegar
- Un plan de proyecto con tareas asignadas a IAs gratuitas
- Links directos a cada IA con el prompt ya copiado

EL USUARIO NUNCA TIENE QUE SALIR DE LA APP PARA NADA TÉCNICO.
Solo copia el prompt, hace click, y ejecuta en la IA que elija.

CATEGORÍAS: ecommerce, SaaS, agencia, ads, automatización, ventas, contenido

═══════════════════════════════════════════════════
## MOTOR — 5 FASES
═══════════════════════════════════════════════════

FASE 0 — INPUT:
- Usuario escribe su idea en texto libre
- Selecciona categoría (template)
- Selecciona qué IA quiere usar

FASE 1 — DIAGNÓSTICO:
- IA analiza la idea
- Devuelve: diagnostic, outputType, rootCause, questions[]
- Usuario responde preguntas (opcionales)

FASE 2 — FORJANDO:
- Loading animado con mensajes de estado
- IA construye el prompt completo

FASE 3 — RESULTADO (3 tabs):
- Tab 1: Prompt completo (mínimo 300 palabras, con ROL/OBJETIVO/CONTEXTO/REGLAS/FORMATO)
- Tab 2: Super Prompt (versión condensada 100-150 palabras)
- Tab 3: Skills detectados

FASE 4 — MODO PROYECTO:
- Descomposición en 3-7 tareas
- Cada tarea: título, IA asignada, prompt listo, justificación, tiempo estimado, dependencias
- Botón "Copiar + Abrir" en cada tarea → copia prompt y abre la IA en nueva pestaña

═══════════════════════════════════════════════════
## SELECTOR DE IA — CORAZÓN DEL SISTEMA
═══════════════════════════════════════════════════

CONCEPTO:
El usuario NUNCA paga APIs. La app genera el prompt y el usuario
lo ejecuta en la IA free que elija. Todo desde dentro de la app.

SELECTOR VISUAL en el dashboard:
Botones grandes con logo/color de cada IA.
Al hacer click: copia el prompt + abre la IA en nueva pestaña.

IAs DISPONIBLES:
- Claude.ai     → https://claude.ai           → Lógica, prompts, código
- ChatGPT       → https://chatgpt.com         → Iteración, copy, variantes
- Gemini        → https://gemini.google.com   → Research, datos, validación
- DeepSeek      → https://chat.deepseek.com   → Código técnico, bajo costo
- Perplexity    → https://perplexity.ai       → Búsqueda con fuentes reales
- Grok          → https://grok.com            → Análisis, tendencias
- v0.dev        → https://v0.dev              → UI components React
- Bolt.new      → https://bolt.new            → Apps completas rápido
- Gamma         → https://gamma.app           → Presentaciones
- Canva AI      → https://canva.com           → Diseño gráfico
- Leonardo AI   → https://leonardo.ai         → Imágenes
- Replit        → https://replit.com          → Deploy rápido

MEMORIA DE USO:
- Cada vez que el usuario usa una IA, se guarda en Supabase
- El historial muestra qué prompts generó y con qué IA los ejecutó
- El dashboard muestra estadísticas de uso por IA

FASE 2 (cuando haya clientes pagos):
- Se activa la API de Anthropic con dinero de clientes
- El campo ANTHROPIC_API_KEY en .env.local se completa
- La app llama directamente a la API sin que el usuario tenga que copiar nada

═══════════════════════════════════════════════════
## SISTEMA DE DISEÑO — NO CAMBIAR NUNCA
═══════════════════════════════════════════════════

Background: #07080d
Gold (color principal): #C8A96A
Verde acento: #3BFF8E
Fuente display: Cormorant Garamond (serif elegante)
Fuente cuerpo: DM Sans
Fuente mono: JetBrains Mono

Design tokens — objeto C{} al inicio de cada componente:
const C = {
  bg: '#07080d',
  bgCard: '#0d0e18',
  bgElevated: '#111220',
  gold: '#C8A96A',
  goldDim: '#C8A96A44',
  goldBorder: '#C8A96A33',
  border: '#ffffff12',
  text: '#f0ede8',
  textDim: '#7a7a8a',
  textGhost: '#3a3a4a',
  green: '#3BFF8E',
  red: '#ff5555',
  blue: '#5599ff',
  purple: '#a855f7',
  font: "'DM Sans', sans-serif",
  fontDisplay: "'Cormorant Garamond', Georgia, serif",
  fontMono: "'JetBrains Mono', monospace",
}

CSS Variables en globals.css:
  --gold, --bg, --bg-elevated, --bg-card
  --border, --border-gold
  --text, --text-dim, --text-ghost
  --green #3BFF8E, --red, --blue, --pink, --purple, --orange

═══════════════════════════════════════════════════
## ARQUITECTURA — NO CAMBIAR
═══════════════════════════════════════════════════

app/
  layout.tsx                    ← Root layout con fuentes y CSS vars
  page.tsx                      ← Redirect: si hay sesión → /dashboard, si no → /login
  (auth)/
    login/page.tsx              ← Login con Supabase
    register/page.tsx           ← Registro con Supabase
  (app)/
    layout.tsx                  ← Layout con Sidebar + Header
    dashboard/page.tsx          ← Dashboard: stats + selector de IA + acceso rápido
    forge/page.tsx              ← Motor completo 5 fases (EL CORAZÓN)
    history/page.tsx            ← Historial de prompts generados
  api/
    forge/route.ts              ← Proxy seguro a Anthropic API

components/
  ui/
    Button.tsx                  ← Botón con size?: 'sm'|'md'|'lg' OBLIGATORIO
    Card.tsx                    ← Card base
    Input.tsx                   ← Input con label y error
  forge/
    PhaseInput.tsx              ← Fase 0: input de idea
    PhaseDiagnostic.tsx         ← Fase 1: diagnóstico + preguntas
    PhaseForging.tsx            ← Fase 2: loading animado
    PhaseResult.tsx             ← Fase 3+4: tabs de resultado
  layout/
    Sidebar.tsx                 ← Navegación lateral
    Header.tsx                  ← Header con usuario y selector de IA

lib/
  supabase/
    client.ts                   ← createBrowserClient (para componentes 'use client')
    server.ts                   ← createServerClient (para Server Components)
  anthropic.ts                  ← callForge() → llama a /api/forge

types/index.ts                  ← Todos los tipos TypeScript
constants/templates.ts          ← 16 templates en 7 categorías + OUTPUT_LABELS
middleware.ts                   ← Protege /dashboard, /forge, /history

═══════════════════════════════════════════════════
## BASE DE DATOS SUPABASE
═══════════════════════════════════════════════════

TABLA profiles:
  id          uuid (references auth.users)
  email       text
  name        text
  plan        text (free / pro / agency)
  forges_count integer default 0
  created_at  timestamp

TABLA forges:
  id           uuid
  user_id      uuid (references profiles.id)
  raw_idea     text
  output_type  text
  category     text
  prompt       text
  super_prompt text
  skills       jsonb
  tasks        jsonb       ← plan de proyecto con tareas
  template_id  text
  ai_model_used text       ← qué IA usó el usuario
  created_at   timestamp

RLS habilitado en ambas tablas.
Trigger: on_auth_user_created → inserta en profiles automáticamente.

═══════════════════════════════════════════════════
## REGLAS DE API ANTHROPIC — CRÍTICO
═══════════════════════════════════════════════════

Modelo: claude-sonnet-4-20250514

max_tokens por tipo de llamada:
  - Diagnóstico:    1000  (respuesta corta)
  - Forge prompt:   2500  (respuesta larga)
  - Modo Proyecto:  3500  (respuesta muy larga)
  NUNCA usar 1000 para forge o proyecto → corta el JSON

System prompt SIEMPRE incluye:
  "Responde SOLO con JSON válido.
   Sin markdown, sin backticks, sin texto extra antes o después."

Parser SIEMPRE:
  const text = data.content?.map(b => b.text || '').join('') || ''
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)

Si JSON.parse falla → mostrar error visible, NUNCA estado silencioso.
Todas las llamadas con try/catch.
clearInterval tanto en success como en catch.

La API key NUNCA va en el cliente.
ANTHROPIC_API_KEY solo en /api/forge/route.ts (servidor).
NUNCA con prefijo NEXT_PUBLIC_.

═══════════════════════════════════════════════════
## ERRORES CONOCIDOS Y SOLUCIONES
═══════════════════════════════════════════════════

BUG #1 — Button prop 'size' falta
Error: Property 'size' does not exist on type 'ButtonProps'
Fix: interface ButtonProps { size?: 'sm'|'md'|'lg'; ... }
Regla: SIEMPRE definir size en ButtonProps antes de usarlo.

BUG #2 — TypeScript pasa local pero falla en Vercel
Fix: npx tsc --noEmit antes de CADA push. 0 errores = OK.

BUG #3 — Supabase keys formato nuevo
Viejo: eyJhbGci...  Nuevo: sb_publishable_... / sb_secret_...
Ya resuelto en client.ts y server.ts.

BUG #4 — JSON cortado (Unterminated string)
Causa: max_tokens demasiado bajo para la respuesta
Fix: forge=2500, proyecto=3500 mínimo. NUNCA 1000 para respuestas largas.

BUG #5 — Git line endings Windows
Warning: LF will be replaced by CRLF → ignorar, no rompe nada.

BUG #6 — localStorage no disponible en artifacts
Fix: usar window.storage de la artifacts API.

BUG #7 — inline styles CSS inválidas en React
Fix: solo propiedades CSS válidas en style={{}}.

BUG #8 — Supabase createServerClient en Next.js 14
Fix correcto para server.ts:
  import { createServerClient } from '@supabase/ssr'
  import { cookies } from 'next/headers'
  export function createClient() {
    const cookieStore = cookies()
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options))
            } catch {}
          },
        },
      }
    )
  }

═══════════════════════════════════════════════════
## REGLAS IRROMPIBLES
═══════════════════════════════════════════════════

1.  NUNCA reescribir desde cero. Trabajar sobre lo existente.
2.  NUNCA código parcial. Siempre archivo COMPLETO.
3.  PowerShell siempre (Windows).
4.  npx tsc --noEmit antes de cada push/deploy.
5.  ANTHROPIC_API_KEY sin NEXT_PUBLIC_.
6.  Button SIEMPRE con size?: 'sm'|'md'|'lg' en interface.
7.  max_tokens: diagnóstico=1000, forge=2500, proyecto=3500.
8.  JSON parser siempre con .replace(/```json|```/g,'').trim()
9.  try/catch en TODAS las llamadas API.
10. clearInterval en success Y en catch, nunca solo en uno.
11. Un componente por archivo. Export nombrado para componentes, default para páginas.
12. Design tokens en objeto C{} al inicio de cada componente.
13. Imports Supabase: browser → @/lib/supabase/client, server → @/lib/supabase/server.
14. Explicar cada archivo en 2-4 líneas al final del código.
15. $0 costo. Todo gratis. Nunca sugerir algo pago.

═══════════════════════════════════════════════════
## ESTADO ACTUAL DEL PROYECTO
═══════════════════════════════════════════════════

✅ COMPLETADO:
- Scaffold Next.js 14.2.5 creado
- node_modules instalado (npm install corrido)
- .env.local con keys de Supabase
- tailwind.config.ts + globals.css con diseño
- app/layout.tsx
- app/page.tsx (redirect según sesión)
- lib/supabase/client.ts (formato sb_publishable nuevo)
- lib/supabase/server.ts (formato nuevo, cookies correcto)
- middleware.ts (protege /dashboard, /forge, /history)
- types/index.ts
- constants/templates.ts (16 templates, 7 categorías)
- app/api/forge/route.ts (proxy Anthropic)
- lib/anthropic.ts (callForge)
- Base de datos Supabase: profiles + forges + RLS + trigger
- app/(auth)/login/page.tsx

❌ PENDIENTE (orden exacto — no saltear):
1.  Verificar npm run dev → ver login en localhost:3000
2.  app/(auth)/register/page.tsx
3.  app/(app)/layout.tsx (con Sidebar)
4.  components/layout/Sidebar.tsx
5.  components/layout/Header.tsx
6.  components/ui/Button.tsx (con size prop)
7.  components/ui/Card.tsx
8.  components/ui/Input.tsx
9.  app/(app)/dashboard/page.tsx + selector de IAs
10. app/(app)/forge/page.tsx (motor 5 fases — EL CORAZÓN)
11. app/(app)/history/page.tsx
12. Deploy en Vercel con variables de entorno

═══════════════════════════════════════════════════
## PRÓXIMA TAREA — ACTUALIZAR CADA SESIÓN
═══════════════════════════════════════════════════

AHORA MISMO:
Correr en PowerShell:
  cd C:\Users\javie\Documents\prompt-forge-os
  npm run dev
Abrir http://localhost:3000 en el navegador.
Debería verse la pantalla de login con diseño dorado.

SIGUIENTE DESPUÉS DE ESO:
Crear app/(auth)/register/page.tsx

═══════════════════════════════════════════════════
## CÓMO USAR ESTE CONTEXTO
═══════════════════════════════════════════════════

CADA VEZ QUE ABRÍS CLAUDE (o cualquier IA):
1. Abrís este archivo (guardalo en Obsidian o escritorio)
2. Copiás TODO (Ctrl+A → Ctrl+C)
3. Lo pegás al inicio del chat
4. Escribís: "Leé el contexto y continuá desde PRÓXIMA TAREA"
5. La IA ejecuta sola sin que expliques nada

DESPUÉS DE CADA SESIÓN:
- Actualizá ESTADO ACTUAL (qué pasó a ✅)
- Actualizá PRÓXIMA TAREA
- Guardá el archivo

═══════════════════════════════════════════════════
## OBJETIVO FINAL
═══════════════════════════════════════════════════

SaaS funcionando en https://prompt-forge-os.vercel.app
Usuarios se registran, generan prompts, los ejecutan en
cualquier IA gratuita, ven su historial.
Costo de construcción: $0
Meta de ingresos: $10k/mes (suscripciones + servicios)
