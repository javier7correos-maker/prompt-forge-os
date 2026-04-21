# PROMPT FORGE OS — REGLAS PARA AGENTES IA
# Este archivo lo leen: Antigravity, Jules, Cursor, Windsurf, cualquier IDE con IA
# Ubicación: raíz del repo → /AGENTS.md

## PROYECTO
Sistema que construye proyectos completos usando IAs gratuitas coordinadas.
NO es un generador de prompts. El output es un proyecto funcionando.

## STACK
Next.js 14.2.5 | TypeScript estricto | Tailwind CSS | Supabase | Vercel

## LO QUE YA EXISTE — NO RECREAR NI MODIFICAR SIN PEDIRLO
- app/layout.tsx
- app/page.tsx
- app/(auth)/login/page.tsx
- lib/supabase/client.ts
- lib/supabase/server.ts
- lib/anthropic.ts
- middleware.ts
- types/index.ts
- constants/templates.ts
- app/api/forge/route.ts

## ARCHIVOS PENDIENTES — EN ESTE ORDEN
1. app/(auth)/register/page.tsx
2. app/(app)/layout.tsx
3. components/layout/Sidebar.tsx
4. components/layout/Header.tsx
5. components/ui/Button.tsx
6. components/ui/Card.tsx
7. components/ui/Input.tsx
8. app/(app)/dashboard/page.tsx
9. app/(app)/forge/page.tsx ← más importante
10. app/(app)/history/page.tsx

## DISEÑO — NUNCA CAMBIAR
Background: #07080d
Gold: #C8A96A
Fonts: Cormorant Garamond (display) + DM Sans (body) + JetBrains Mono (code)
Design tokens al inicio de cada componente:
const C = {
  bg: '#07080d', bgCard: '#0e0f17', bgElevated: '#13141f',
  gold: '#C8A96A', border: '#ffffff1a', borderGold: '#C8A96A33',
  text: '#ffffff', textDim: '#888888', textGhost: '#444444',
  green: '#3BFF8E', red: '#ff4d4d',
}

## REGLAS DE CÓDIGO — TODAS OBLIGATORIAS
- Archivos siempre COMPLETOS. Nunca parciales.
- ButtonProps siempre incluye: size?: 'sm' | 'md' | 'lg'
- ANTHROPIC_API_KEY nunca con prefijo NEXT_PUBLIC_
- JSON parse siempre: text.replace(/```json|```/g,'').trim()
- try/catch en TODAS las llamadas API
- clearInterval tanto en success como en catch
- max_tokens: diagnóstico=1000 / forge=2500 / proyecto=3500
- Un componente por archivo
- 'use client' obligatorio en todo componente con hooks o eventos
- Imports Supabase: client.ts para componentes, server.ts para API routes

## VALIDACIÓN ANTES DE ENTREGAR CÓDIGO
Antes de generar cualquier archivo, verificar internamente:
□ ¿Tiene 'use client' si usa useState/useEffect/onClick?
□ ¿ButtonProps tiene size?
□ ¿Los imports de Supabase son correctos (client vs server)?
□ ¿Las llamadas API tienen try/catch?
□ ¿El JSON parser tiene el .replace()?
□ ¿TypeScript compilaría sin errores?
□ ¿El diseño usa los tokens C{} en vez de colores hardcodeados?
Si alguna falla → corregir antes de entregar.

## SUPABASE
URL: https://slyswtrlgekwultzqvqf.supabase.co
Anon key: sb_publishable_uPnisUuQ5L1GkUCSEWnd3A_3zZYt_cg
RLS: siempre activado. Nunca desactivar.
Tablas: profiles, forges

## COMANDOS PARA VALIDAR (correr antes de hacer push)
npx tsc --noEmit
npm run build

## BUGS CONOCIDOS
- ButtonProps sin size → falla build Vercel
- max_tokens bajo → JSON cortado
- Supabase pausa a los 7 días de inactividad
- Windows MSIX: claude_desktop_config.json en ruta diferente
