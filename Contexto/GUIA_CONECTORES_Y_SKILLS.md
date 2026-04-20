# GUÍA COMPLETA — QUÉ ACTIVAR EN CLAUDE.AI
# Seguí esto en orden exacto

════════════════════════════════════════════
PASO 1 — PREFERENCES (Settings > Profile)
════════════════════════════════════════════

Ir a: Claude.ai → menú de tu perfil → Settings → Profile
En el campo de preferencias, pegar EXACTAMENTE el contenido
del archivo CLAUDE_AI_PREFERENCES.md (sin el encabezado).

Esto hace que yo recuerde tus reglas en TODOS los chats.
No tenés que repetirlo nunca más.

════════════════════════════════════════════
PASO 2 — CONECTORES DISPONIBLES EN FREE
════════════════════════════════════════════

En Claude.ai free podés habilitar estos conectores:
Ir a: Settings → Integrations (o Connectors)

HABILITAR:
✅ Web Search → yo busco info actualizada cuando lo necesito
✅ Google Drive → si subís archivos ahí puedo leerlos directo

NO DISPONIBLE EN FREE:
❌ GitHub directo (solo Pro/Team)
❌ Slack, Jira, etc.

Para GitHub sin conector: simplemente pegame el código
o el error directamente en el chat. Funciona igual.

════════════════════════════════════════════
PASO 3 — MEMORY (Settings → Memory)
════════════════════════════════════════════

Activar: "Generate memory from chat history" → ON
Esto hace que recuerde cosas importantes entre sesiones.

Luego de leer este documento, si querés que recuerde
el proyecto, decime:
"Recordá que estoy trabajando en Prompt Forge OS,
 Next.js 14, repo: github.com/javier7correos-maker/prompt-forge-os"

════════════════════════════════════════════
PASO 4 — CADA SESIÓN NUEVA
════════════════════════════════════════════

Al abrir un chat nuevo (tuyo o de otra cuenta free):
1. Copiar TODO el contenido de SESSION_STARTER.md
2. Pegarlo como primer mensaje
3. Yo respondo: "Contexto cargado. ¿Qué tarea hoy?"
4. Decís qué querés hacer

Eso es todo. No necesitás explicar nada más.

════════════════════════════════════════════
PASO 5 — CÓMO USAR MÚLTIPLES CUENTAS FREE
════════════════════════════════════════════

Cuando una cuenta se queda sin mensajes:
1. Abrís otra cuenta de Claude.ai
2. Pegás SESSION_STARTER.md
3. Agregás al final: "Venimos de hacer [lo último que hicimos]"
4. Seguís desde donde dejaste

Mantené SESSION_STARTER.md siempre actualizado con el
estado real del proyecto (qué está hecho, qué falta).
Actualizalo al final de cada sesión.

════════════════════════════════════════════
PASO 6 — SUBIR ARCHIVOS AL REPO (una sola vez)
════════════════════════════════════════════

En PowerShell:

cd "C:\Users\javie\OneDrive\Documentos\GitHub\prompt-forge-os"

Copiar AGENTS.md a la raíz del repo (ya lo tenés descargado):
copy "ruta\donde\descargaste\AGENTS.md" ".\AGENTS.md"

Crear carpeta de contexto:
New-Item -ItemType Directory -Force -Path ".\.context"
copy "ruta\SESSION_STARTER.md" ".\.context\SESSION_STARTER.md"
copy "ruta\CLAUDE_AI_PREFERENCES.md" ".\.context\CLAUDE_AI_PREFERENCES.md"

Subir al repo:
git add .
git commit -m "feat: add AI context and agent rules"
git push

Ahora cualquier IA que acceda al repo ve las reglas en AGENTS.md.

════════════════════════════════════════════
RESUMEN — QUÉ HACE CADA ARCHIVO
════════════════════════════════════════════

CLAUDE_AI_PREFERENCES.md → va en Settings > Profile (una vez)
SESSION_STARTER.md       → se pega al inicio de cada chat
AGENTS.md                → va en la raíz del repo de GitHub
                           (lo leen Antigravity, Jules, Cursor)
.context/                → carpeta en el repo con el contexto completo
