# PROMPT FORGE OS — GUÍA MAESTRA DE AGENTES Y HERRAMIENTAS
# Versión 1.0 | Para usar en cada sesión de trabajo

═══════════════════════════════════════════════════════════════
## PARTE 1 — LOS 4 AGENTES DEL PROYECTO
═══════════════════════════════════════════════════════════════

Estos son los 4 roles que Claude asume según lo que necesitás.
Al inicio de cada sesión decís cuál necesitás.

---

### 🔴 AGENTE 1 — ARQUITECTO
Cuándo usarlo: cuando no sabés qué hacer o querés planificar
Cómo activarlo: "Activá el Agente Arquitecto"

Qué hace:
- Lee el ESTADO ACTUAL del contexto
- Detecta qué falta
- Define el orden exacto de tareas
- NO escribe código todavía
- Te dice: "Esto es lo que falta, esto es el orden, empezamos por acá"

Reglas que sigue:
- Nunca saltea pasos
- Siempre valida lo existente antes de agregar
- Si algo puede romper Vercel, lo dice antes de hacerlo

---

### 🟡 AGENTE 2 — CONSTRUCTOR
Cuándo usarlo: cuando querés que escriba código
Cómo activarlo: "Activá el Agente Constructor"

Qué hace:
- Recibe una tarea específica del Arquitecto
- Escribe el archivo COMPLETO
- Explica cada bloque en 2-4 líneas
- Corre npx tsc --noEmit mentalmente antes de darte el código
- Te dice exactamente dónde pegar cada archivo

Reglas que sigue:
- Código siempre completo, nunca parcial
- Design tokens en C{} al inicio de cada componente
- Button siempre con size?: 'sm'|'md'|'lg'
- Imports Supabase correctos (client vs server)
- max_tokens: diagnóstico=1000, forge=2500, proyecto=3500

---

### 🟢 AGENTE 3 — VALIDADOR
Cuándo usarlo: cuando algo no funciona o antes de hacer deploy
Cómo activarlo: "Activá el Agente Validador"

Qué hace:
- Recibe el error exacto que ves
- Identifica si es: TypeScript / Supabase / API / Render / Deploy
- Da el fix específico con código completo
- Agrega prevención para que no vuelva a ocurrir
- Actualiza la lista de bugs conocidos

Checklist que corre siempre:
□ ¿Button tiene prop size definida?
□ ¿max_tokens es suficiente para el tipo de llamada?
□ ¿JSON parser tiene .replace(/```json|```/g,'').trim()?
□ ¿ANTHROPIC_API_KEY está sin NEXT_PUBLIC_?
□ ¿clearInterval está en success Y en catch?
□ ¿Supabase server.ts usa cookies() correcto?
□ ¿npx tsc --noEmit da 0 errores?

---

### 🔵 AGENTE 4 — DEPLOYER
Cuándo usarlo: cuando querés subir a Vercel
Cómo activarlo: "Activá el Agente Deployer"

Qué hace:
- Corre npx tsc --noEmit → si hay errores, los corrige antes
- Prepara el commit con mensaje descriptivo
- Sube a GitHub con git push
- Verifica que Vercel buildea sin errores
- Configura variables de entorno en Vercel si faltan
- Te da la URL final cuando termina

Comandos que ejecuta en orden:
  npx tsc --noEmit
  git add .
  git commit -m "descripción del cambio"
  git push
  (Vercel detecta el push y hace deploy automático)

═══════════════════════════════════════════════════════════════
## PARTE 2 — GUÍA DE CONFIGURACIÓN DE HERRAMIENTAS
═══════════════════════════════════════════════════════════════

Cada herramienta con: para qué sirve, cómo instalar,
cómo verificar que funciona, reglas de uso para este proyecto.

---

### 🛠️ HERRAMIENTA 1 — PowerShell (Windows)
Para qué: ejecutar todos los comandos del proyecto
Ya instalado: ✅ viene con Windows

Verificar que funciona:
  Abrí PowerShell y escribí:
  node --version
  Deberías ver: v18.x.x o superior

Reglas para este proyecto:
- SIEMPRE abrí PowerShell como usuario normal (no administrador)
- SIEMPRE estar en la carpeta correcta antes de correr comandos:
    cd C:\Users\javie\Documents\prompt-forge-os
- Si un comando falla con "no se reconoce", cerrá y volvé a abrir PowerShell
- Los warnings en amarillo se ignoran (no son errores)
- Los errores en rojo se copian y se le pasan al Agente Validador

Comandos más usados en este proyecto:
  npm run dev          → levantar en local
  npm run build        → probar build de producción
  npx tsc --noEmit     → verificar TypeScript
  git add .            → preparar cambios
  git commit -m "msg"  → guardar cambios
  git push             → subir a GitHub

---

### 🛠️ HERRAMIENTA 2 — Node.js + npm
Para qué: correr Next.js y gestionar dependencias
Ya instalado: ✅

Verificar que funciona:
  node --version   → debe decir v18+ 
  npm --version    → debe decir 9+

Si hay error de versión:
  Ir a https://nodejs.org → descargar LTS → instalar → reiniciar PowerShell

Reglas para este proyecto:
- NUNCA borrar node_modules manualmente
- Si hay error raro, correr: npm install (reinstala todo)
- NUNCA correr npm install --force (rompe dependencias)
- package.json y package-lock.json van en Git siempre

---

### 🛠️ HERRAMIENTA 3 — Git + GitHub
Para qué: guardar el código y hacer deploy automático en Vercel
Ya instalado: ✅

Verificar que funciona:
  git --version → debe decir git version 2.x.x

Configuración inicial (solo una vez):
  git config --global user.email "tu@email.com"
  git config --global user.name "Javier"

Conectar el proyecto a GitHub (si no está conectado):
  1. Ir a https://github.com → New repository
  2. Nombre: prompt-forge-os
  3. Privado o público (tu elección)
  4. NO inicialices con README
  5. Copiá la URL que te da (https://github.com/tu-usuario/prompt-forge-os.git)
  6. En PowerShell:
     cd C:\Users\javie\Documents\prompt-forge-os
     git remote add origin https://github.com/tu-usuario/prompt-forge-os.git
     git branch -M main
     git push -u origin main

Reglas para este proyecto:
- Hacer push SOLO después de que npx tsc --noEmit dé 0 errores
- Mensaje de commit siempre descriptivo: "feat: login page" no "cambios"
- NUNCA subir el archivo .env.local → ya está en .gitignore
- Si push falla con error de autenticación: usar GitHub Desktop (más fácil)

---

### 🛠️ HERRAMIENTA 4 — Vercel
Para qué: hospedar la app gratis en Internet
Ya configurado: ✅ cuenta creada

Conectar Vercel con el proyecto (una sola vez):
  1. Ir a https://vercel.com → Log in
  2. Click en "Add New Project"
  3. Importar desde GitHub → seleccionar prompt-forge-os
  4. Framework: Next.js (lo detecta solo)
  5. ANTES de hacer deploy → agregar variables de entorno:
     NEXT_PUBLIC_SUPABASE_URL = https://slyswtrlgekwultzqvqf.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_uPnisUuQ5L1GkUCSEWnd3A_3zZYt_cg
     SUPABASE_SECRET_KEY = sb_secret_ttjUjG4hAZUaWm3uiFQ3yA_vJnShRMD
     ANTHROPIC_API_KEY = (dejar vacío por ahora)
  6. Click Deploy
  7. En 2-3 minutos tenés la URL: prompt-forge-os.vercel.app

Reglas para este proyecto:
- Cada push a GitHub dispara deploy automático en Vercel
- Si el build falla en Vercel pero pasa local:
  → correr npx tsc --noEmit local → si pasa → el error es de env vars
  → verificar que TODAS las variables están en Vercel Settings → Environment Variables
- NUNCA editar código directo en Vercel → siempre desde local
- Los logs de error de Vercel se copian y se pasan al Agente Validador

Cómo ver logs de error en Vercel:
  Dashboard → tu proyecto → Deployments → click en el deploy fallido
  → Build Logs → copiar el error rojo

---

### 🛠️ HERRAMIENTA 5 — Supabase
Para qué: base de datos + autenticación de usuarios
Ya configurado: ✅

Datos del proyecto:
  URL: https://slyswtrlgekwultzqvqf.supabase.co
  Dashboard: https://supabase.com/dashboard/project/slyswtrlgekwultzqvqf

Tablas ya creadas:
  profiles → datos del usuario (nombre, plan, cantidad de forges)
  forges   → cada prompt generado (idea, resultado, IA usada)

Verificar que las tablas existen:
  1. Ir al dashboard de Supabase
  2. Click en "Table Editor" en el menú izquierdo
  3. Deberías ver: profiles y forges

Si las tablas NO existen, ejecutar este SQL en Supabase SQL Editor:

  -- Tabla profiles
  create table profiles (
    id uuid references auth.users on delete cascade,
    email text,
    name text,
    plan text default 'free',
    forges_count integer default 0,
    created_at timestamp default now(),
    primary key (id)
  );

  -- Tabla forges
  create table forges (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references profiles(id) on delete cascade,
    raw_idea text,
    output_type text,
    category text,
    prompt text,
    super_prompt text,
    skills jsonb,
    tasks jsonb,
    template_id text,
    ai_model_used text,
    created_at timestamp default now()
  );

  -- RLS
  alter table profiles enable row level security;
  alter table forges enable row level security;

  create policy "Users can view own profile"
    on profiles for select using (auth.uid() = id);

  create policy "Users can update own profile"
    on profiles for update using (auth.uid() = id);

  create policy "Users can view own forges"
    on forges for select using (auth.uid() = user_id);

  create policy "Users can insert own forges"
    on forges for insert with check (auth.uid() = user_id);

  -- Trigger para crear perfil automático al registrarse
  create or replace function handle_new_user()
  returns trigger as $$
  begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
  end;
  $$ language plpgsql security definer;

  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();

Reglas para este proyecto:
- NUNCA desactivar RLS
- NUNCA usar la secret key en el cliente (solo en servidor)
- Si hay error "row violates RLS policy" → revisar que el usuario esté logueado
- Si hay error de conexión → verificar que las env vars están correctas

---

### 🛠️ HERRAMIENTA 6 — VS Code
Para qué: editar los archivos del proyecto
Ya instalado: ✅

Extensiones recomendadas para este proyecto:
  1. Prettier → formateo automático de código
  2. ESLint → detecta errores antes de correr
  3. Tailwind CSS IntelliSense → autocompletado de clases
  4. TypeScript (viene incluido) → errores en tiempo real

Instalar extensiones:
  En VS Code → Ctrl+Shift+X → buscar cada nombre → Install

Configuración útil (settings.json):
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  Ctrl+Shift+P → "Open User Settings JSON" → pegar eso

Reglas para este proyecto:
- Abrir SIEMPRE la carpeta completa: File → Open Folder → prompt-forge-os
- NUNCA abrir archivos individuales sueltos
- Si VS Code muestra errores rojos → son los mismos que tsc va a detectar
- Guardar siempre con Ctrl+S antes de correr npm run dev

---

### 🛠️ HERRAMIENTA 7 — Pinecone (EVALUADO: NO NECESARIO)
Decisión: NO usar Pinecone en este proyecto.
Razón: Pinecone es una base de datos vectorial para búsqueda semántica
y memoria de IA a largo plazo. Prompt Forge OS no necesita eso.

Lo que sí necesita (y ya tiene con Supabase):
- Guardar historial de prompts → tabla forges ✅
- Autenticación de usuarios → Supabase Auth ✅
- Estadísticas de uso por IA → campo ai_model_used ✅

Si en el futuro se quiere agregar "búsqueda inteligente en historial",
ahí sí se evalúa Pinecone. Por ahora: $0 extra, Supabase alcanza.

═══════════════════════════════════════════════════════════════
## PARTE 3 — FLUJO DE TRABAJO DE CADA SESIÓN
═══════════════════════════════════════════════════════════════

INICIO DE SESIÓN (siempre igual):
1. Abrís Obsidian → copiás CONTEXTO_PFOS_v3.md
2. Pegás en Claude nuevo chat
3. Escribís: "Leé el contexto. Activá el Agente [ARQUITECTO/CONSTRUCTOR/VALIDADOR/DEPLOYER]"
4. La IA ejecuta sola

DURANTE LA SESIÓN:
- Si algo falla → "Activá el Agente Validador, este es el error: [pegás el error]"
- Si querés avanzar → "Activá el Agente Constructor, siguiente tarea"
- Si querés saber qué falta → "Activá el Agente Arquitecto"

FIN DE SESIÓN:
1. Actualizás ESTADO ACTUAL en el contexto (qué pasó a ✅)
2. Actualizás PRÓXIMA TAREA
3. Guardás el archivo en Obsidian
4. Hacés git push si hay cambios

═══════════════════════════════════════════════════════════════
## PARTE 4 — ORDEN COMPLETO DE TAREAS RESTANTES
═══════════════════════════════════════════════════════════════

SESIÓN ACTUAL — hacer todo esto en orden:

[ ] 1. Verificar npm run dev → localhost:3000 muestra login
[ ] 2. register/page.tsx → mismo estilo que login
[ ] 3. app/(app)/layout.tsx → layout con sidebar
[ ] 4. components/layout/Sidebar.tsx → navegación lateral
[ ] 5. components/layout/Header.tsx → header con selector de IA
[ ] 6. components/ui/Button.tsx → con size prop obligatorio
[ ] 7. components/ui/Card.tsx → card base
[ ] 8. components/ui/Input.tsx → input con label y error
[ ] 9. app/(app)/dashboard/page.tsx → stats + selector de IAs visual
[ ] 10. app/(app)/forge/page.tsx → motor completo 5 fases
[ ] 11. app/(app)/history/page.tsx → historial con filtros
[ ] 12. npx tsc --noEmit → 0 errores
[ ] 13. git push → Vercel deploy automático
[ ] 14. Configurar env vars en Vercel
[ ] 15. Verificar URL pública funciona

TIEMPO ESTIMADO TOTAL: 3-4 sesiones de trabajo

═══════════════════════════════════════════════════════════════
## PARTE 5 — REGLAS DE ORO (NUNCA ROMPER)
═══════════════════════════════════════════════════════════════

1.  $0 SIEMPRE. Nunca sugerir herramienta paga.
2.  Código completo. Nunca parcial.
3.  npx tsc --noEmit antes de cada push.
4.  Button siempre con size?: 'sm'|'md'|'lg'.
5.  max_tokens: 1000 diagnóstico / 2500 forge / 3500 proyecto.
6.  JSON parser siempre con .replace(/```json|```/g,'').trim()
7.  try/catch en TODAS las llamadas API.
8.  clearInterval en success Y en catch.
9.  ANTHROPIC_API_KEY sin NEXT_PUBLIC_.
10. Supabase server.ts con cookies() correcto.
11. Un componente por archivo.
12. Design tokens en C{} al inicio de cada componente.
13. RLS siempre activado en Supabase.
14. .env.local NUNCA sube a GitHub.
15. Errores de Vercel se copian al Agente Validador.
