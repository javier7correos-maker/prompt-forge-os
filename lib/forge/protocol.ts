import { getProviderDefinition, getStrategyProfile } from '@/lib/ai/catalog'
import { buildModelPromptRules } from '@/lib/ai/model-database'
import type {
  ForgeGenerationRequest,
  ForgeSkill,
  ForgeStructuredResult,
} from '@/types'

interface ForgePromptPack {
  systemPrompt: string
  userPrompt: string
  superPrompt: string
  skillSnapshot: ForgeSkill[]
  fallbackResult: ForgeStructuredResult
}

function buildSkillSnapshot(providerLabel: string): ForgeSkill[] {
  return [
    {
      name: 'God System Architect',
      desc: 'Piensa en sistemas automatizados y escalables, cero teoría, todo acción.',
      free: true,
    },
    {
      name: 'Copywriter Master',
      desc: 'Escribe copys persuasivos listos para producción; sin rellenar "lorem ipsum".',
      free: true,
    },
    {
      name: 'Tech Stack Optimizer',
      desc: 'Selecciona herramientas de infraestructura gratis (Free-tier) para MVPs.',
      free: true,
    },
    {
      name: 'Security Sentinel',
      desc: 'Asegura que no haya fallas críticas de seguridad o exposición de keys.',
      free: true,
    },
    {
      name: providerLabel,
      desc: 'Motor de inferencia subyacente ejecutando Prompt Forge OS.',
      free: true,
    },
  ]
}

function buildCategoryRules(input: ForgeGenerationRequest): string {
  const c = input.category
  
  if (c === 'codigo' || c === 'agentes_ia') {
    return `
=== REGLAS ESTRICTAS DE CÓDIGO Y AGENTES ===
1. CERO TEORÍA: No me des explicaciones largas sobre qué es Python o Node. Muéstrame el bloque de código documentado.
2. IMPORTACIONES Y LIBRERÍAS: Enlista siempre las librerías a instalar (requirements.txt o package.json).
3. EXCEPCIONES Y ERRORES: Escribe el código asumiendo que va a fallar. Añade bloques try/catch/except rigurosos. No quiero código endeble.
4. SISTEMA OPERATIVO / ENTORNO: El usuario definió su entorno como "${input.answers.osEnv || 'Desconocido/General'}". Asegúrate de que los comandos de terminal (ej: dir vs ls) y las rutas de carpetas cuadren con ese entorno.
5. SEGURIDAD: Nunca hardcodees API Keys ni contraseñas. Implementa carga mediante variables de entorno (.env).
    `.trim()
  }

  if (c === 'ecommerce' || c === 'saas' || c === 'ads' || c === 'contenido') {
    return `
=== REGLAS ESTRICTAS DE NEGOCIOS Y MARKETING ===
1. COPYWRITING FINAL: Está TOTALMENTE PROHIBIDO poner "[Inserta tu texto aquí]" o "Lorem ipsum". TÚ tienes que inventar y redactar cada título, subtítulo, call-to-action y beneficio usando la máxima persuasión. Sé un maestro del copy.
2. IDENTIDAD Y TONO: Adopta un tono de voz "${input.answers.tone || 'Profesional, directo, que inspire extrema confianza y autoridad'}".
3. CONVERSIÓN: Enfócate en resolver la objeción más grande del cliente de inmediato en la primera línea.
4. ENTREGABLE: Si es Landing Page, despídete del código HTML (a menos que se pida). Dame el texto estructurado (Sección 1: Hero, Sección 2: Prueba Social, etc.) listo para yo copiarlo a un builder como Vercel o Carrd.
    `.trim()
  }

  if (c === 'automatizacion') {
    return `
=== REGLAS ESTRICTAS DE AUTOMATIZACIÓN (N8N/MAKE/ZAPIER) ===
1. DEFINIR TRIGGER Y ACCIONES: Describe exactamente qué módulo dispara la acción (ej: Webhook "Catch Hook") y qué módulos le siguen.
2. PASO A PASO LITERAL: Dime qué botones presionar dentro de la herramienta.
3. DATOS CRUZADOS: Explica cómo mapear las variables (ej: "Mapear {{1.email}} al campo To: de Gmail").
4. FILTROS Y MANEJO DE ERRORES: Incluye siempre un enrutador o filtro para evitar que procesos basura consuman las tareas u operaciones mensuales gratis de la cuenta.
    `.trim()
  }

  return `
=== REGLAS GENERALES DEL FORGE ===
1. Entrega el resultado final, no tutoriales para hacerlo uno mismo. TÚ eres el que lo hace.
2. Exprime la creatividad al máximo sin perder el realismo ni el ahorro de recursos.
  `.trim()
}

function buildFallbackResult(input: ForgeGenerationRequest): ForgeStructuredResult {
  const profile = getStrategyProfile(input.strategyProfile)
  const target = input.answers.target || 'público objetivo general'
  const goal = input.answers.objetivo || 'lanzamiento inmediato'
  const diferencial = input.answers.diferencial || 'ejecución impecable'

  return {
    diagnostic:
      `La idea "${input.idea}" es viable pero necesita reducir variables. El perfil ${profile.label} nos exige crear el núcleo duro primero y validar con ${target} para asegurar que cumpla el objetivo de ${goal}.`,
    rootCause:
      `Generalmente estas ideas mueren en la "parálisis por análisis". La causa raíz es intentar hacerlo complejo desde el inicio sin probar primero cuál es de verdad el diferencial (${diferencial}) en el mercado.`,
    strategy: [
      'Reducir alcance: definir solo el formato de entrega imprescindible para hoy.',
      'Definir Stack: Carrd.co (gratis), Make.com (gratis), o Next.js+Vercel (gratis) según el requerimiento.',
      'Enfocar en copywriting, no en aditamentos de diseño complejos todavía.',
    ],
    executionPlan: [
      'Paso 1: Compra dominio o usa subdominio gratis (ej: vercel.app).',
      'Paso 2: Monta la estructura que se indica en el "Final Deliverable".',
      'Paso 3: Prepara la forma en la que capturas la venta/cliente (Stripe Payment Link o WhatsApp).',
    ],
    securityProtocol: [
      'Si es código, usar .env para credenciales.',
      'Si es landing, no publicar teléfonos personales sin protección de spam.',
    ],
    quickWins: [
      'Copiar el modelo ya existente en Prompt Forge OS.',
      'Tener el producto vivo en las próximas 3 horas.',
    ],
    kpis: [
      'Tiempo de lanzamiento < 3 horas.',
      '100 visitas a la web esta semana.',
      '2 ventas, llamadas o registros válidos.',
    ],
    aiCoordination: [
      'Usa las sugerencias de este Forge para pedirle a ChatGPT/Claude que escriba la variante final de los copys o generar las imágenes necesarias con Midjourney.',
    ],
    finalDeliverable:
      'Revisa el "Super Prompt" y pégalo en Gemini/ChatGPT. Este sistema ha evolucionado para darte el documento listo para la batalla. (En caso de usar la API configurada localmente, este texto sería reemplazado por la ejecución real).',
    finalPrompt:
      'El motor no cuenta con acceso API propio configurado o falló. Por favor copia el Super Prompt (botón arriba a la derecha) en un LLM como ChatGPT, Claude o Gemini.',
    openQuestions: [
      '¿Qué pasaría si intentas lanzar esto hoy mismo cortando el 50% de las características?',
    ],
  }
}

export function buildForgePromptPack(input: ForgeGenerationRequest): ForgePromptPack {
  const provider = getProviderDefinition(input.provider)
  const profile = getStrategyProfile(input.strategyProfile)
  const fallbackResult = buildFallbackResult(input)
  const skillSnapshot = buildSkillSnapshot(provider.label)
  const categoryRules = buildCategoryRules(input)
  const modelRules = input.answers.targetModel
    ? buildModelPromptRules(input.answers.targetModel)
    : ''

  const contextBlock = [
    `========= CONTEXTO DEL USUARIO =========`,
    `Idea Central: ${input.idea}`,
    input.answers.brandName ? `Nombre de Marca/Proyecto: ${input.answers.brandName}` : '',
    `Categoría General: ${input.category}`,
    `Formato Deseado del Entregable: ${input.outputType}`,
    input.templateId ? `Plantilla Solicitada: ${input.templateId}` : '',
    `Público Objetivo: ${input.answers.target || 'Lo que deduzcas óptimo'}`,
    `Precio/Presupuesto (Stack Gratuito por defecto): ${input.answers.precio || '0 - Todo Gratis/Bootstrapped'}`,
    `Diferencial u Oferta Irresistible: ${input.answers.diferencial || 'Descúbrelo y proponlo tú'}`,
    `Objetivo Urgente: ${input.answers.objetivo || 'Lanzarlo y vender/validar HOY'}`,
    `Limitaciones/Restricciones: ${input.answers.constraints || 'Ninguna grave'}`,
    input.answers.tone ? `Identidad/Tono de voz: ${input.answers.tone}` : '',
    input.answers.osEnv ? `Stack/Entorno OS: ${input.answers.osEnv}` : '',
    input.answers.targetModel ? `IA Destino del Output: ${input.answers.targetModel}` : '',
    input.answers.memoryContext ? `⚠️ Memoria Previa Reutilizada (¡No repitas estos errores!): ${input.answers.memoryContext}` : '',
  ].filter(Boolean).join('\n')

  const godSystemInstructions = `
================ INSTRUCCIONES ESTRICTAS DE DIOS DE SISTEMAS ================
Actúa como "Prompt Forge OS System God", la encarnación de la ejecución perfecta.
Tu objetivo AHORA no es hacer preguntas o filosofar. Tu objetivo es REDACTAR EL ENTREGABLE FINAL (código, copies, emails) LISTO PARA USARSE HOY.
Si pidió landing page, redacta todo el copy real, nada de 'pon tu texto aquí'.
MANTÉN COSTOS CERO: Usa Vercel, Supabase, Make.com, Notion, Carrd, WhatsApp, etc.
Responde siempre en ESPAÑOL CLARO, súper directo, ahorrando tokens en saludos.
Tu labor es entregar el MEGA contenido paso a paso para que el usuario construya su imperio hoy mismo.
`

  // EL SYSTEM PROMPT ES EXCLUSIVO PARA LLAMADAS A API (AQUI SÍ ESTÁ OBLIGADO AL JSON)
  const systemPrompt = [
    godSystemInstructions,
    categoryRules,
    modelRules,
    'Tu salida DEBE SER EXCLUSIVAMENTE JSON VALIDO (sin marcadores de bloque de código como ```json si interfiere o malforman el texto, aunque se aceptan si está bien escapado).',
    'El esquema es el siguiente:',
    JSON.stringify(
      {
        diagnostic: 'string (Un diagnóstico brutal y de impacto que destape la verdad de su idea)',
        rootCause: 'string (Por qué otros fracasan haciendo exactamente esto)',
        strategy: ['string', 'string'],
        executionPlan: ['string (Paso literal donde hace click y entra)'],
        securityProtocol: ['string'],
        quickWins: ['string'],
        kpis: ['string (métrica y tiempo exacto)'],
        aiCoordination: ['string (¿qué otro modelo o herramienta le complementa ahora?)'],
        finalDeliverable: 'string (AQUI VA LA MAGIA. CÓDIGO FINAL O TEXTOS REALES SEGÚN LAS REGLAS. Usa formato Markdown, \n e identaciones internas correctamente dentro del string.)',
        finalPrompt: 'string (Un mini prompt iterativo para que él te re-pregunte)',
        openQuestions: ['string (Solo una o dos dudas cruciales)'],
      },
      null,
      2,
    ),
  ].join('\n\n')

  const userPrompt = [
    contextBlock,
    'AHORA, aplica tu motor de God System Architect y genérame el JSON MAESTRO según el esquema. RECUERDA: EN EL FINAL DELIVERABLE QUIERO TEXTOS Y CÓDIGO REAL Y APLICA LAS REGLAS DE CATEGORIA ESTRICTAMENTE.'
  ].join('\n\n')

  // EL SUPER PROMPT ES LO QUE COPIA EL USUARIO. CERO REGLAS DE JSON AQUI, SOLO PURA EJECUCIÓN MARKDOWN.
  const targetModelLabel = input.answers.targetModel ?? 'GPT-4o / Claude 3.5 Sonnet / Gemini 2.5 Pro'

  const superPrompt = [
    'PROMPT FORGE OS :: SUPER PROMPT (GOD SYSTEM)',
    `Pega este prompt en: ${targetModelLabel}`,
    `Perfil de ejecución: ${profile.label}`,
    `------------------------------------------`,
    godSystemInstructions,
    '',
    categoryRules,
    modelRules ? `\n${modelRules}\n` : '',
    contextBlock,
    '',
    `=== ESTRUCTURA ESTIMADA QUE DEBES DEVOLVER (USA MARKDOWN ENRIQUECIDO, DIVIDE CON EMOJIS Y CREA RENDERS ATRACTIVOS) ===`,
    `Por favor, NUNCA devuelvas JSON crudo. Redacta de forma natural y poderosa, separando en estas 7 secciones:`,
    `1. 💥 DIAGNÓSTICO HONESTO: ¿Por qué va a funcionar?`,
    `2. 🛑 CAUSA RAÍZ AL ESTRUENDO: El error que debes evitar a toda costa.`,
    `3. ♟️ ESTRATEGIA: Filosofía de lo que vamos a construir.`,
    `4. 🚀 PLAN DE EJECUCIÓN (TUTORIAL CLIC A CLIC): ¿Donde vas (webs gratuitas sugeridas), qué tocas, dónde conectas el dominio o webhook?`,
    `5. 🛡️ SEGURIDAD/ESTABILIDAD: Evitar hacks o caída de servidor/cuenta.`,
    `6. 📊 KPIs: Números a medir en los primeros 3 días.`,
    `7. 🎁 ENTREGABLE MAESTRO (FINAL DELIVERABLE): Aquí quiero la "Caja Negra" abierta. ACATA PERFECTAMENTE LAS REGLAS ESTRICTAS DE CATEGORIA Y DE LA IA DESTINO MENCIONADAS ARRIBA. Este tiene que ser inmenso y tu mejor trabajo del año. Usa bloques de código si aplica.`,
    '',
    'Ve directo al grano, sin saludar, asume el rol de Inmediato.',
  ].filter(Boolean).join('\n')

  return {
    systemPrompt,
    userPrompt,
    superPrompt,
    skillSnapshot,
    fallbackResult,
  }
}

function extractArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback
  }

  const cleaned = value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)

  return cleaned.length > 0 ? cleaned : fallback
}

function extractString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function extractJsonCandidate(text: string) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  let jsonCandidate = fencedMatch?.[1] ?? text
  const firstBrace = jsonCandidate.indexOf('{')
  const lastBrace = jsonCandidate.lastIndexOf('}')

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null
  }

  try {
    return JSON.parse(jsonCandidate.slice(firstBrace, lastBrace + 1))
  } catch {
    return null
  }
}

export function normalizeStructuredResult(
  value: unknown,
  fallback: ForgeStructuredResult,
): ForgeStructuredResult {
  if (!value || typeof value !== 'object') {
    return fallback
  }

  const record = value as Record<string, unknown>

  return {
    diagnostic: extractString(record.diagnostic, fallback.diagnostic),
    rootCause: extractString(record.rootCause, fallback.rootCause),
    strategy: extractArray(record.strategy, fallback.strategy),
    executionPlan: extractArray(record.executionPlan, fallback.executionPlan),
    securityProtocol: extractArray(record.securityProtocol, fallback.securityProtocol),
    quickWins: extractArray(record.quickWins, fallback.quickWins),
    kpis: extractArray(record.kpis, fallback.kpis),
    aiCoordination: extractArray(record.aiCoordination, fallback.aiCoordination),
    finalDeliverable: extractString(record.finalDeliverable, fallback.finalDeliverable),
    finalPrompt: extractString(record.finalPrompt, fallback.finalPrompt),
    openQuestions: extractArray(record.openQuestions, fallback.openQuestions),
  }
}
