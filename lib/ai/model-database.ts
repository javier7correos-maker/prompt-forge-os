/**
 * BASE DE DATOS UNIVERSAL DE MODELOS DE IA
 * Prompt Forge OS — God System Engine
 *
 * Cada entrada contiene las características exactas, límites, reglas
 * de prompting y diferenciadores de cada modelo para que el Forge
 * genere instrucciones optimizadas según la IA destino.
 */

export type AIModelType = 'text' | 'image' | 'video'

export interface AIPromptRule {
  rule: string
  example?: string
}

export interface AIModelEntry {
  id: string
  label: string
  provider: string
  type: AIModelType
  version: string
  contextWindow?: number        // tokens (solo text)
  maxOutputTokens?: number
  strengths: string[]
  weaknesses: string[]
  promptRules: AIPromptRule[]
  outputFormat: string
  freeAccess: boolean
  freeNote?: string
  pricingNote: string
  bestFor: string[]
  accessUrl: string
  releaseYear: number
}

// ============================================================
// MODELOS DE TEXTO (LLMs)
// ============================================================

const TEXT_MODELS: AIModelEntry[] = [

  // ── OPENAI ─────────────────────────────────────────────
  {
    id: 'gpt-4o',
    label: 'ChatGPT GPT-4o',
    provider: 'OpenAI',
    type: 'text',
    version: 'gpt-4o-2024-11-20',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    strengths: [
      'Excelente en razonamiento multi-paso',
      'Visión (análisis de imágenes)',
      'Código de alta calidad',
      'Sigue instrucciones complejas con fidelidad',
      'Formato Markdown y tablas sin errores',
    ],
    weaknesses: [
      'Respuestas largas pueden truncarse sin aviso',
      'No tiene acceso a internet en API (solo en chat web)',
      'Costo elevado por millón de tokens vs competidores',
    ],
    promptRules: [
      { rule: 'Empieza siempre con el ROL del asistente. Ejemplo: "Eres un CTO senior en una startup de IA..."', example: 'Eres un Senior Engineer de Python especializado en scripts de automatización para Windows...' },
      { rule: 'Usa secciones delimitadas con ### o --- para que no mezcle contextos.' },
      { rule: 'Si quieres código, dile EXPLÍCITAMENTE el lenguaje y la versión. Ej: "En Python 3.11, escribe..."' },
      { rule: 'Usa "paso a paso" o "step by step" para activar razonamiento secuencial de alta calidad.' },
      { rule: 'Para outputs largos, divide en partes: "Dame la PARTE 1 primero. Esperaré tu respuesta para pedir la PARTE 2."' },
      { rule: 'Evita frases vagas como "hazlo bien" — sé específico: "sin errores de compilación, sin dependencias externas innecesarias".' },
    ],
    outputFormat: 'Markdown, código con fenced blocks, tablas GFM',
    freeAccess: true,
    freeNote: 'GPT-4o disponible en chat.openai.com con límite de mensajes. API es de pago.',
    pricingNote: '$2.50/1M tokens entrada | $10/1M tokens salida (API)',
    bestFor: ['Código complejo', 'Análisis de documentos', 'Escritura profesional', 'Multi-step reasoning'],
    accessUrl: 'https://chat.openai.com',
    releaseYear: 2024,
  },
  {
    id: 'gpt-4o-mini',
    label: 'ChatGPT GPT-4o Mini',
    provider: 'OpenAI',
    type: 'text',
    version: 'gpt-4o-mini-2024-07-18',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    strengths: ['Rápido', 'Barato', 'Suficiente para emails, scripts simples, copywriting'],
    weaknesses: ['Razonamiento multi-step inferior a GPT-4o', 'Código más complejo puede fallar'],
    promptRules: [
      { rule: 'Mantén los prompts cortos y directos. No desperdicies tokens en instrucciones extensas.' },
      { rule: 'Ideal para tareas únicas y acotadas. No encadenes múltiples tareas complejas.' },
    ],
    outputFormat: 'Markdown simple',
    freeAccess: true,
    freeNote: 'Disponible con límite en chat.openai.com',
    pricingNote: '$0.15/1M tokens entrada | $0.60/1M tokens salida (API)',
    bestFor: ['Emails', 'Descripciones de productos', 'Scripts simples', 'Clasificación de textos'],
    accessUrl: 'https://chat.openai.com',
    releaseYear: 2024,
  },
  {
    id: 'o3',
    label: 'ChatGPT o3 (Reasoning)',
    provider: 'OpenAI',
    type: 'text',
    version: 'o3-2025-04-16',
    contextWindow: 200000,
    maxOutputTokens: 100000,
    strengths: [
      'Razonamiento avanzado (piensa antes de responder)',
      'Matemáticas, lógica, ciencia',
      'Código muy complejo y debugging',
      'Contexto ultra extendido',
    ],
    weaknesses: [
      'MUY LENTO — puede tardar minutos por respuesta',
      'Muy caro por token',
      'No es para copywriting simple o conversación casual',
    ],
    promptRules: [
      { rule: 'No le digas "paso a paso" — él ya lo hace solo internamente. Dale el objetivo final directamente.' },
      { rule: 'Evita instrucciones de formato excesivo. Él prioriza la calidad del razonamiento sobre el estilo.' },
      { rule: 'Úsalo solo para problemas donde GPT-4o ya falló. No lo uses para tareas triviales.' },
      { rule: 'Puedes darle todo el contexto de una sola vez — tiene ventana enorme.' },
    ],
    outputFormat: 'Texto estructurado con razonamiento visible',
    freeAccess: false,
    pricingNote: '$10/1M tokens entrada | $40/1M tokens salida (API)',
    bestFor: ['Debugging complejo', 'Arquitectura de sistemas', 'Análisis de código extenso', 'Matemáticas'],
    accessUrl: 'https://chat.openai.com',
    releaseYear: 2025,
  },

  // ── ANTHROPIC ───────────────────────────────────────────
  {
    id: 'claude-3-5-sonnet',
    label: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    type: 'text',
    version: 'claude-3-5-sonnet-20241022',
    contextWindow: 200000,
    maxOutputTokens: 8096,
    strengths: [
      'EL MEJOR para seguir instrucciones largas y complejas con FIDELIDAD',
      'Código de alta calidad sin alucinaciones',
      'Escritura de largo aliento (novelas, reportes)',
      'Nuance y matices — evita respuestas planas o corporativas',
      'Excelente con Markdown',
    ],
    weaknesses: [
      'Más conservador en contenido no estándar',
      'Max output 8096 tokens (limita entregas muy largas)',
      'Sin acceso a internet real',
    ],
    promptRules: [
      { rule: 'Claude respeta MUY bien las instrucciones estructuradas con <xml> o secciones claras. Úsalas para separar CONTEXTO, TAREA y FORMATO.' },
      { rule: 'Para outputs largos, pedirle "no te detengas hasta completar todo el documento" funciona bien.', example: 'Genera el documento completo. No me escribas resúmenes. No te detengas hasta el final.' },
      { rule: 'Puedes ser muy directo con el tono: "Sé brutalmente honesto", "No uses eufemismos".' },
      { rule: 'Claude tiene tendencia a ser reflexivo. Si quieres solo la respuesta sin preámbulo: "Ve directo al punto, sin introducción."' },
      { rule: 'Para código: "Escribe el código en un solo bloque sin interrupciones ni explicaciones intermedias."' },
    ],
    outputFormat: 'Markdown excelente, código perfecto, listas organizadas',
    freeAccess: true,
    freeNote: 'Claude.ai tiene plan gratuito con límite diario',
    pricingNote: '$3/1M tokens entrada | $15/1M tokens salida (API)',
    bestFor: ['Escritura larga', 'Código', 'Análisis de documentos', 'Seguimiento de instrucciones complejas'],
    accessUrl: 'https://claude.ai',
    releaseYear: 2024,
  },
  {
    id: 'claude-3-5-haiku',
    label: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    type: 'text',
    version: 'claude-3-5-haiku-20241022',
    contextWindow: 200000,
    maxOutputTokens: 8096,
    strengths: ['Ultra rápido', 'Barato', 'Suficiente para copywriting y tareas rápidas'],
    weaknesses: ['Razonamiento inferior al Sonnet', 'No para arquitecturas complejas'],
    promptRules: [
      { rule: 'Prompts cortos y directos. Evita contexto largo innecesario.' },
    ],
    outputFormat: 'Markdown',
    freeAccess: false,
    pricingNote: '$0.80/1M tokens entrada | $4/1M tokens salida (API)',
    bestFor: ['Emails', 'Copys cortos', 'Clasificación', 'Chatbots'],
    accessUrl: 'https://claude.ai',
    releaseYear: 2024,
  },
  {
    id: 'claude-4-sonnet',
    label: 'Claude Sonnet 4',
    provider: 'Anthropic',
    type: 'text',
    version: 'claude-sonnet-4-20250514',
    contextWindow: 200000,
    maxOutputTokens: 64000,
    strengths: [
      'Genera código de producción casi sin errores',
      'Extended Thinking (razonamiento profundo)',
      'Contexto enorme con alta fidelidad',
      'Mejor escritura creativa de todos los Claudes',
    ],
    weaknesses: ['Más caro que 3.5 Sonnet', 'Puede sobre-pensar tareas simples'],
    promptRules: [
      { rule: 'Activa "Extended Thinking" para problemas complejos dejando espacio en el prompt: "Piensa detenidamente antes de responder."' },
      { rule: 'Aprovecha la ventana larga pasando el código completo para revisión o refactoring.' },
      { rule: 'Para creatividad: dale restricciones explícitas — paradójicamente genera mejores resultados con límites.' },
    ],
    outputFormat: 'Markdown, código, thinking chains',
    freeAccess: true,
    freeNote: 'Disponible en claude.ai con límite de uso',
    pricingNote: '$3/1M tokens entrada | $15/1M tokens salida (API)',
    bestFor: ['Código producción', 'Análisis profundo', 'Escritura creativa avanzada'],
    accessUrl: 'https://claude.ai',
    releaseYear: 2025,
  },

  // ── GOOGLE ──────────────────────────────────────────────
  {
    id: 'gemini-2-5-pro',
    label: 'Gemini 2.5 Pro',
    provider: 'Google',
    type: 'text',
    version: 'gemini-2.5-pro',
    contextWindow: 1000000,
    maxOutputTokens: 65536,
    strengths: [
      'CONTEXTO GIGANTE (1 millón de tokens = libros enteros)',
      'Multimodal: texto, imagen, audio, video, código',
      'Excelente con Google Workspace (Docs, Sheets)',
      'Gratuito con generoso free tier',
      'Mejor comprensión de prompts en español que la mayoría',
    ],
    weaknesses: [
      'Calidad de código inferior a Claude/GPT en tareas muy complejas',
      'Puede ser prolijo en las respuestas — hay que limitarlo',
    ],
    promptRules: [
      { rule: 'Usa su ventana enorme: puedes pegar el manual completo de un producto y pedirle que lo analice todo.' },
      { rule: 'Para acotar respuestas largas: "Responde en máximo 500 palabras" o "Solo dame el código, nada más".' },
      { rule: 'Funciona bien con instrucciones en español, puedes ser natural en el idioma.' },
      { rule: 'Para análisis de imágenes o PDFs: arrastra el archivo directo en la interfaz — entiende contexto multicapa.' },
    ],
    outputFormat: 'Markdown, tablas, código, multimedia',
    freeAccess: true,
    freeNote: 'Gemini Advanced gratis 1 mes. Google AI Studio API gratuita con límite.',
    pricingNote: 'Tier gratuito disponible | $1.25-$10/1M tokens (API)',
    bestFor: ['Análisis de documentos largos', 'Multimodal', 'Código Python', 'Investigación'],
    accessUrl: 'https://gemini.google.com',
    releaseYear: 2025,
  },
  {
    id: 'gemini-2-0-flash',
    label: 'Gemini 2.0 Flash',
    provider: 'Google',
    type: 'text',
    version: 'gemini-2.0-flash',
    contextWindow: 1000000,
    maxOutputTokens: 8192,
    strengths: ['Ultra rápido', 'Gratis con límite generoso', 'Bueno para tareas rápidas multimodales'],
    weaknesses: ['Output limitado', 'Razonamiento inferior a 2.5 Pro'],
    promptRules: [
      { rule: 'Úsalo para tareas rápidas donde la velocidad es más importante que la profundidad.' },
    ],
    outputFormat: 'Markdown',
    freeAccess: true,
    freeNote: '100% gratuito con límites generosos vía Google AI Studio',
    pricingNote: 'Gratis | $0.075/1M tokens (API)',
    bestFor: ['Clasificación', 'Resúmenes', 'Chatbots', 'Respuestas rápidas'],
    accessUrl: 'https://aistudio.google.com',
    releaseYear: 2025,
  },

  // ── DEEPSEEK ────────────────────────────────────────────
  {
    id: 'deepseek-v3',
    label: 'DeepSeek V3',
    provider: 'DeepSeek',
    type: 'text',
    version: 'deepseek-chat',
    contextWindow: 128000,
    maxOutputTokens: 8192,
    strengths: [
      'GRATIS: interfaz web sin límites publicados',
      'Excelente en código (Python, JS, TypeScript)',
      'Muy bueno en matemáticas y razonamiento lógico',
      'Costos de API los más bajos del mercado',
    ],
    weaknesses: [
      'Calidad de escritura creativa inferior a Claude',
      'Puede alucinar en temas históricos o de cultura general',
      'Latencia variable',
    ],
    promptRules: [
      { rule: 'Para código: dale el contexto exacto de librerías, versiones y OS. Es muy literal.' },
      { rule: 'Se desempeña muy bien con prompts en inglés técnico, aunque acepta español.' },
      { rule: 'Para tareas de razonamiento: "Think step by step" en inglés activa su mejor modo.' },
    ],
    outputFormat: 'Markdown, código',
    freeAccess: true,
    freeNote: 'chat.deepseek.com gratis sin restricciones conocidas',
    pricingNote: '$0.27/1M tokens entrada | $1.10/1M tokens salida (API)',
    bestFor: ['Código Python/JS', 'Scripts de automatización', 'Matemáticas', 'Análisis técnico'],
    accessUrl: 'https://chat.deepseek.com',
    releaseYear: 2024,
  },
  {
    id: 'deepseek-r1',
    label: 'DeepSeek R1 (Reasoning)',
    provider: 'DeepSeek',
    type: 'text',
    version: 'deepseek-reasoner',
    contextWindow: 128000,
    maxOutputTokens: 32768,
    strengths: [
      'Razonamiento profundo tipo o1/o3 pero GRATIS',
      'Top en benchmarks de matemáticas y código',
      'Muestra su "cadena de pensamiento"',
    ],
    weaknesses: ['Muy lento', 'No para tareas simples o creativas', 'Interfaz a veces inestable'],
    promptRules: [
      { rule: 'Dale el problema directamente sin instrucciones de formato — él decide cómo razonar.' },
      { rule: 'Ideal para verificar lógica de código o resolver bugs complejos.' },
    ],
    outputFormat: 'Texto plano + cadena de razonamiento',
    freeAccess: true,
    freeNote: 'Gratis en chat.deepseek.com',
    pricingNote: '$0.55/1M tokens entrada | $2.19/1M tokens salida (API)',
    bestFor: ['Debugging avanzado', 'Matemáticas complejas', 'Verificación de arquitecturas'],
    accessUrl: 'https://chat.deepseek.com',
    releaseYear: 2025,
  },

  // ── XAIA / GROK ─────────────────────────────────────────
  {
    id: 'grok-3',
    label: 'Grok 3',
    provider: 'xAI',
    type: 'text',
    version: 'grok-3',
    contextWindow: 131072,
    maxOutputTokens: 16000,
    strengths: [
      'Acceso a datos en tiempo real via X/Twitter',
      'Muy bueno con humor, ironía y creatividad irreverente',
      'Pensamiento profundo (DeepThink)',
      'Incluido gratis en X Premium',
    ],
    weaknesses: [
      'Sesgado hacia contenido de X/Twitter',
      'Código mediocre comparado con Claude o GPT',
      'API pública limitada',
    ],
    promptRules: [
      { rule: 'Aprovecha su acceso a noticias de hoy para validar tendencias de mercado en tiempo real.' },
      { rule: 'Para creatividad o copywriting con tono irreverente, es el mejor de todos.' },
      { rule: 'Activa DeepThink para análisis más profundo: en el chat hay un toggle.' },
    ],
    outputFormat: 'Markdown, listas',
    freeAccess: true,
    freeNote: 'Disponible en grok.com con account gratuita (limitado) o X Premium',
    pricingNote: 'Incluido en X Premium ($8/mes). API desde $5/mes.',
    bestFor: ['Noticias en tiempo real', 'Marketing irreverente', 'Análisis de tendencias sociales'],
    accessUrl: 'https://grok.com',
    releaseYear: 2025,
  },

  // ── META LLAMA ──────────────────────────────────────────
  {
    id: 'llama-3-3-70b',
    label: 'Llama 3.3 70B (Meta)',
    provider: 'Meta',
    type: 'text',
    version: 'Llama-3.3-70B-Instruct',
    contextWindow: 128000,
    maxOutputTokens: 8192,
    strengths: [
      '100% Open Source — self-hosted sin costos',
      'Excelente performance en código y razonamiento para ser local',
      'Muy bueno en tareas multilingüe',
      'Privacidad total: corre en tu máquina',
    ],
    weaknesses: [
      'Requiere GPU potente para correr localmente (A100 recomendada)',
      'Inferior a los modelos comerciales en tasks muy complejas',
    ],
    promptRules: [
      { rule: 'Usa el formato de chat estándar: <|begin_of_text|><|start_header_id|>system...' },
      { rule: 'Dale instrucciones en inglés para mejores resultados en código.' },
      { rule: 'Para uso en Ollama local: ollama run llama3.3' },
    ],
    outputFormat: 'Markdown estándar',
    freeAccess: true,
    freeNote: 'Gratis en meta.ai (con cuenta Meta) o via Ollama/Groq API (tier gratuito)',
    pricingNote: 'Gratis (open source). Groq API gratuita con límite.',
    bestFor: ['Self-hosting', 'Privacidad', 'Proyectos Open Source', 'Código','Uso local sin internet'],
    accessUrl: 'https://meta.ai',
    releaseYear: 2024,
  },

  // ── PERPLEXITY ──────────────────────────────────────────
  {
    id: 'perplexity-sonar',
    label: 'Perplexity Sonar Pro',
    provider: 'Perplexity',
    type: 'text',
    version: 'sonar-pro',
    contextWindow: 200000,
    strengths: [
      'Internet en tiempo real SIEMPRE activo',
      'Cita fuentes en cada respuesta',
      'Ideal para investigación y fact-checking',
    ],
    weaknesses: ['No genera código de calidad', 'Sin creatividad avanzada', 'Caro para uso casual'],
    promptRules: [
      { rule: 'Úsalo para preguntas que necesiten datos actualizados: precios, estadísticas, noticias.' },
      { rule: 'Pídele que cite las fuentes: "con fuentes verificables de menor a mayor fecha".' },
    ],
    outputFormat: 'Texto con citas numeradas',
    freeAccess: true,
    freeNote: 'Plan gratuito en perplexity.ai con límite de búsquedas Pro',
    pricingNote: '$20/mes Pro | API disponible',
    bestFor: ['Investigación de mercado', 'Datos en tiempo real', 'Fact-checking', 'Noticias'],
    accessUrl: 'https://perplexity.ai',
    releaseYear: 2024,
  },
]

// ============================================================
// MODELOS DE IMAGEN
// ============================================================

const IMAGE_MODELS: AIModelEntry[] = [
  {
    id: 'midjourney-v7',
    label: 'Midjourney v7',
    provider: 'Midjourney',
    type: 'image',
    version: 'v7',
    strengths: [
      'LA MEJOR calidad estética del mercado',
      'Composición artística superior',
      'Estilos muy consistentes',
      'Excelente para branding y diseño premium',
    ],
    weaknesses: [
      'Sin API pública — solo en Discord o web app',
      'No gratis (desde $10/mes)',
      'Texto en imágenes sigue siendo impreciso',
      'Sin control total de elementos específicos',
    ],
    promptRules: [
      { rule: 'Estructura: [Sujeto], [Acción/Postura], [Estilo visual], [Iluminación], [Parámetros]' },
      { rule: 'Parámetro de aspecto: --ar 16:9 (landscape) | --ar 9:16 (vertical/Reel) | --ar 1:1 (cuadrado)' },
      { rule: 'Para fotos ultra-realistas: añade --style raw al final' },
      { rule: 'Para definir nivel de detalle: --stylize 0 (literal) a --stylize 1000 (muy artístico). Default: 100' },
      { rule: 'Para excluir elementos: --no [elemento]. Ej: --no text, --no watermark' },
      { rule: 'Para calidad máxima en render: --quality 2' },
      { rule: 'Usa comas para separar conceptos, NO puntos ni punto y coma', example: 'Dark luxury skincare product, dramatic lighting, black background, editorial photography, premium --ar 1:1 --style raw --stylize 150' },
      { rule: 'Versión específica: --v 7 (siempre especificar si necesitas consistencia)' },
    ],
    outputFormat: 'PNG/JPG de alta resolución, múltiples variaciones',
    freeAccess: false,
    pricingNote: 'Desde $10/mes (Basic: ~200 imágenes)',
    bestFor: ['Branding', 'Ilustraciones artísticas', 'Concept art', 'Fotografía editorial ficticia'],
    accessUrl: 'https://midjourney.com',
    releaseYear: 2025,
  },
  {
    id: 'dalle-3',
    label: 'DALL-E 3',
    provider: 'OpenAI',
    type: 'image',
    version: 'dall-e-3',
    strengths: [
      'TEXTO EN IMÁGENES muy preciso (el mejor del mercado)',
      'Entiende prompts en lenguaje natural directo',
      'Integrado en ChatGPT (fácil de usar)',
      'Bueno para ilustraciones explicativas con texto',
    ],
    weaknesses: [
      'Calidad artística inferior a Midjourney',
      'Composiciones complejas pueden fallar',
      'No genera imágenes de personas reales reconocibles',
    ],
    promptRules: [
      { rule: 'Describe en lenguaje natural conversacional, no en lista de tags. DALL-E 3 entiende frases completas.' },
      { rule: 'Para texto en imagen: escribe exactamente qué texto debe aparecer entre comillas en el prompt', example: 'Diseño de logo para "Luzea" con letras elegantes doradas sobre fondo negro brillante' },
      { rule: 'Especifica estilo: "fotografía realista", "ilustración vectorial", "óleo sobre lienzo", "pixel art"' },
      { rule: 'Para mockups: "mockup de producto en contexto lifestyle, [descripción del ambiente]"' },
    ],
    outputFormat: 'PNG 1024x1024, 1792x1024, 1024x1792',
    freeAccess: true,
    freeNote: 'Disponible en ChatGPT gratis con límite diario',
    pricingNote: '$0.04-$0.08 por imagen (API)',
    bestFor: ['Logos con texto', 'Infografías', 'Mockups de producto', 'Ilustraciones explicativas'],
    accessUrl: 'https://chat.openai.com',
    releaseYear: 2023,
  },
  {
    id: 'stable-diffusion-3-5',
    label: 'Stable Diffusion 3.5',
    provider: 'Stability AI',
    type: 'image',
    version: 'sd3.5-large',
    strengths: [
      'Open Source — 100% gratis si tienes GPU',
      'Control total: LoRAs, ControlNet, inpainting',
      'Sin censura (si se corre localmente)',
      'Comunidad enorme con miles de modelos custom',
    ],
    weaknesses: [
      'Requiere configuración técnica para uso local',
      'Calidad por defecto inferior a Midjourney sin fine-tuning',
      'Curva de aprendizaje para parámetros avanzados',
    ],
    promptRules: [
      { rule: 'Usa formato de tags separados por comas (no frases largas)', example: 'dark luxury skincare product, cinematic lighting, black background, hyperrealistic, 8k, professional photography' },
      { rule: 'Añade tags de calidad al inicio y final: (masterpiece:1.2), (best quality:1.1), ultra-detailed' },
      { rule: 'Tags negativos son cruciales: Negative prompt: blurry, low quality, watermark, text, deformed' },
      { rule: 'CFG Scale: 7 (equilibrado) | Steps: 20-30 (calidad) | Sampler: DPM++ 2M Karras' },
      { rule: 'Para consistencia de estilo: usa el mismo seed number en cada variación' },
    ],
    outputFormat: 'PNG configurable, cualquier resolución',
    freeAccess: true,
    freeNote: 'Gratis en GPU propia o via servicios como Invoke AI, ComfyUI. Online: NightCafé gratis con créditos',
    pricingNote: 'Gratis (self-hosted). Stability API desde $0.003/imagen',
    bestFor: ['Proyectos con control total', 'Productización de imágenes', 'Self-hosted', 'Modelos custom'],
    accessUrl: 'https://stability.ai',
    releaseYear: 2024,
  },
  {
    id: 'ideogram-2',
    label: 'Ideogram 2',
    provider: 'Ideogram',
    type: 'image',
    version: '2.0',
    strengths: [
      'TEXTO EN IMÁGENES casi perfecto (rivaliza con DALL-E 3)',
      'Gratis con créditos diarios',
      'Excelente para logos, carteles y material de marketing',
      'Genera variaciones de color/estilo fácilmente',
    ],
    weaknesses: [
      'Calidad artística inferior a Midjourney',
      'Menos control sobre composición exacta',
    ],
    promptRules: [
      { rule: 'Para texto en imagen: escribe el texto entre comillas y especifica: font style, color, position.' },
      { rule: 'Activa el modo "Magic Prompt" para que expanda tu descripción automáticamente.' },
      { rule: 'Selecciona el estilo desde la interfaz (Realistic, Design, Illustration, 3D) antes de generar.' },
    ],
    outputFormat: 'PNG/JPG varios aspectos',
    freeAccess: true,
    freeNote: '25 imágenes gratis por día en ideogram.ai',
    pricingNote: 'Gratis con límite | $8/mes (Basic) para más generaciones',
    bestFor: ['Logos', 'Carteles con texto', 'Material de marketing', 'Thumbnails de YouTube'],
    accessUrl: 'https://ideogram.ai',
    releaseYear: 2024,
  },
  {
    id: 'flux-1-1-pro',
    label: 'Flux 1.1 Pro (Black Forest Labs)',
    provider: 'Black Forest Labs',
    type: 'image',
    version: 'flux-1.1-pro',
    strengths: [
      'Fotorrealismo extremo — el mejor en fotografía de personas',
      'Proporciones anatómicas correctas',
      'Muy rápido (2-4 segundos por imagen)',
      'Sin filtros excesivos de seguridad',
    ],
    weaknesses: [
      'Más caro que alternativas en API',
      'Texto en imágenes malo',
      'Menos artístico que Midjourney',
    ],
    promptRules: [
      { rule: 'Describe en lenguaje natural fotográfico: tipo de lente, iluminación, entorno.', example: 'Professional model holding premium serum bottle, editorial photography, 85mm lens, soft rim lighting, dark luxury aesthetic, black background' },
      { rule: 'Especifica siempre la calidad: "professional photography, 8k resolution, sharp focus"' },
      { rule: 'Para personas: describe características físicas muy específicamente para evitar variaciones.' },
    ],
    outputFormat: 'PNG hasta 2048x2048',
    freeAccess: false,
    pricingNote: '$0.04/imagen (API via Replicate o fal.ai)',
    bestFor: ['Fotografía de producto', 'Retratos realistas', 'Lifestyle photography para e-commerce'],
    accessUrl: 'https://blackforestlabs.ai',
    releaseYear: 2024,
  },
  {
    id: 'adobe-firefly-3',
    label: 'Adobe Firefly 3',
    provider: 'Adobe',
    type: 'image',
    version: 'firefly-3',
    strengths: [
      '100% legal — entrenado solo con contenido con licencia',
      'Safe for commercial use (sin riesgo de copyright)',
      'Integrado en Photoshop y Illustrator',
      'Control preciso para diseñadores (masking, inpainting)',
    ],
    weaknesses: [
      'Calidad artística inferior a Midjourney',
      'Requiere suscripción Adobe Creative Cloud para máximo uso',
    ],
    promptRules: [
      { rule: 'Usa lenguaje descriptivo de diseño gráfico: composición, colores Pantone, tipografía.' },
      { rule: 'Para uso en Photoshop: especifica "generative fill" con descripción del contexto de la imagen.' },
      { rule: 'Selecciona "Content type: Photo/Graphic/Art" antes de generar para mejores resultados.' },
    ],
    outputFormat: 'PNG/JPG hasta 2048x2048',
    freeAccess: true,
    freeNote: '25 créditos gratuitos al mes en firefly.adobe.com',
    pricingNote: 'Incluido en Adobe CC ($55/mes) | Plan dedicado desde $5/mes',
    bestFor: ['Diseño gráfico comercial', 'Integración con Adobe Suite', 'Uso seguro sin copyright'],
    accessUrl: 'https://firefly.adobe.com',
    releaseYear: 2024,
  },
  {
    id: 'leonardo-ai',
    label: 'Leonardo AI',
    provider: 'Leonardo',
    type: 'image',
    version: 'phoenix',
    strengths: [
      'Modelos entrenados por comunidad / fine-tuned',
      'Excelente para game art y concept art',
      'Herramientas de imagen a imagen',
      'Generoso free tier diario',
    ],
    weaknesses: ['Inconsistencia entre modelos', 'UI confusa para principiantes'],
    promptRules: [
      { rule: 'Elige el modelo base según el estilo: Phoenix (general), Kino (cinematic), Anime, etc.' },
      { rule: 'Activa "Prompt Magic v3" para mejores resultados con prompts simples.' },
      { rule: 'Para consistencia de personaje: usa la función "Character Reference".' },
    ],
    outputFormat: 'PNG varios aspectos',
    freeAccess: true,
    freeNote: '150 créditos al día gratis en leonardo.ai',
    pricingNote: 'Gratis con límite | $10/mes (Artisan)',
    bestFor: ['Game art', 'Concept art', 'Marketing gaming', 'Personajes consistentes'],
    accessUrl: 'https://leonardo.ai',
    releaseYear: 2023,
  },
]

// ============================================================
// MODELOS DE VIDEO
// ============================================================

const VIDEO_MODELS: AIModelEntry[] = [
  {
    id: 'sora',
    label: 'Sora (OpenAI)',
    provider: 'OpenAI',
    type: 'video',
    version: 'sora-2024',
    strengths: [
      'Videos de hasta 20 segundos con coherencia física',
      'Mejor comprensión de física y movimiento realista',
      'Generación texto-a-video de alta fidelidad',
      'Disponible en ChatGPT Plus',
    ],
    weaknesses: [
      'Máximo 20 segundos hasta ahora',
      'Caro en uso intensivo',
      'Alucinaciones físicas en escenas muy complejas',
      'Solo disponible en US/mercados seleccionados',
    ],
    promptRules: [
      { rule: 'Estructura: [Tipo de plano], [Sujeto + acción específica], [Ambiente], [Estilo visual], [Iluminación]', example: 'Tracking shot of a dark luxury skincare bottle slowly rotating on a black marble surface, dramatic product photography, cinematic lighting, 4K' },
      { rule: 'Especifica tipo de plano: close-up, wide shot, aerial shot, tracking shot, dolly zoom' },
      { rule: 'Para productos: "slow motion product reveal, studio lighting, premium brand aesthetic"' },
      { rule: 'Specifica duración deseada: "5 second loop", "10 second video"' },
      { rule: 'Añade estilo cinematográfico: "film grain", "anamorphic lens flare", "shallow depth of field"' },
    ],
    outputFormat: 'MP4 1080p, varios aspectos',
    freeAccess: false,
    pricingNote: 'Incluido en ChatGPT Plus ($20/mes) con límite. API próximamente.',
    bestFor: ['Videos de producto premium', 'Trailers', 'Contenido de marca cinematic', 'Prototipos de video'],
    accessUrl: 'https://sora.com',
    releaseYear: 2024,
  },
  {
    id: 'runway-gen3-alpha',
    label: 'Runway Gen-3 Alpha',
    provider: 'Runway',
    type: 'video',
    version: 'gen3-alpha',
    strengths: [
      'El más popular para video profesional',
      'Imagen-a-video de alta calidad',
      'Herramientas de edición profesional integradas',
      'Motion Brush (control de zonas de movimiento)',
    ],
    weaknesses: [
      'Videos cortos (4-10s)',
      'Caro para uso frecuente',
      'Movimiento de personas puede verse extraño',
    ],
    promptRules: [
      { rule: 'Para imagen-a-video: sube imagen de referencia + describe el movimiento específico', example: 'The product bottle slowly rotates counterclockwise, liquid droplets fall around it, dramatic lighting' },
      { rule: 'Describe el movimiento de cámara explícitamente: "camera slowly zooms in", "static shot", "pan right"' },
      { rule: 'Activa Motion Brush para aislar partes de la imagen que deben moverse vs las estáticas.' },
      { rule: 'Para loops: describe que el final se conecta con el inicio: "seamless loop animation"' },
    ],
    outputFormat: 'MP4 hasta 4K, varios aspectos',
    freeAccess: true,
    freeNote: '125 créditos gratis al registrarse en runwayml.com',
    pricingNote: '$15/mes (Standard: 625 créditos/mes)',
    bestFor: ['Video de producto', 'Short films', 'Reels con movimiento', 'Animación de imágenes estáticas'],
    accessUrl: 'https://runwayml.com',
    releaseYear: 2024,
  },
  {
    id: 'kling-1-6',
    label: 'Kling 1.6 (Kuaishou)',
    provider: 'Kuaishou',
    type: 'video',
    version: 'kling-1.6',
    strengths: [
      'Videos de hasta 3 minutos (el más largo)',
      'Excelente para video de personas/movimiento de cuerpo',
      'Gratis con límite generoso',
      'Modo de cámara amplio',
    ],
    weaknesses: ['Empresa china (privacidad)', 'Interfaz en inglés con bugs ocasionales'],
    promptRules: [
      { rule: 'En modo "Professional": describe EXACTAMENTE cada segundo del video si quieres control total.' },
      { rule: 'Para movimiento de personas: especifica la pose inicial y la pose final del movimiento.' },
      { rule: 'Kling responde muy bien a "film style" específico: "Wes Anderson style", "horror film style".' },
    ],
    outputFormat: 'MP4 1080p hasta 3 minutos',
    freeAccess: true,
    freeNote: 'Tier gratuito en klingai.com con límite de generaciones',
    pricingNote: 'Gratis con límite | $8/mes (Standard)',
    bestFor: ['Videos largos', 'Movimiento de personas', 'Narrativa visual larga'],
    accessUrl: 'https://klingai.com',
    releaseYear: 2024,
  },
  {
    id: 'pika-2',
    label: 'Pika 2.0',
    provider: 'Pika Labs',
    type: 'video',
    version: '2.0',
    strengths: [
      'Muy fácil de usar',
      'Efectos especiales tipo "pikaffects" únicos',
      'Bueno para contenido creativo/divertido',
      'Integra efectos de sonido automáticos',
    ],
    weaknesses: [
      'Calidad inferior a Runway o Kling en realismo',
      'Videos cortos (3-5s default)',
    ],
    promptRules: [
      { rule: 'Para efectos especiales creativos: usa "Crush it", "Inflate", "Melt" — son sus Pikaffects únicos.' },
      { rule: 'Para Reels/TikToks: genera en 9:16 con "text on screen" capability.' },
      { rule: 'Sound effects: activa la opción de audio para que genere ambiente sonoro automático.' },
    ],
    outputFormat: 'MP4 varios aspectos | 3-5s',
    freeAccess: true,
    freeNote: 'Tier gratuito en pika.art (150 créditos/mes)',
    pricingNote: '$8/mes (Basic)',
    bestFor: ['TikToks creativos', 'Efectos especiales virales', 'Memes animados', 'Content marketing'],
    accessUrl: 'https://pika.art',
    releaseYear: 2024,
  },
  {
    id: 'luma-dream-machine',
    label: 'Luma Dream Machine',
    provider: 'Luma AI',
    type: 'video',
    version: 'dream-machine-1.6',
    strengths: [
      'Excelente físicas y movimiento realista de objetos',
      'Generación imagen-a-video muy fiel a la imagen original',
      'Bueno para video de producto lifestyle',
      'API disponible',
    ],
    weaknesses: ['Videos cortos (5s base)', 'Personas con movimiento extraño a veces'],
    promptRules: [
      { rule: 'Para imagen-a-video: usa imágenes con composición clara y fondo limpio para mejores resultados.' },
      { rule: 'Especifica el mood: "dramatic", "peaceful", "energetic", "slow motion"' },
      { rule: 'Para loops perfectos: "seamless loop, camera stays static, subject moves gently"' },
    ],
    outputFormat: 'MP4 HD varios aspectos',
    freeAccess: true,
    freeNote: '30 generaciones gratis/mes en lumalabs.ai',
    pricingNote: '$29/mes (Pro: 120 generaciones)',
    bestFor: ['Video de producto realista', 'Lifestyle brand videos', 'Loops para redes sociales'],
    accessUrl: 'https://lumalabs.ai/dream-machine',
    releaseYear: 2024,
  },
]

// ============================================================
// BASE DE DATOS COMPLETA + FUNCIONES DE ACCESO
// ============================================================

export const ALL_AI_MODELS: AIModelEntry[] = [
  ...TEXT_MODELS,
  ...IMAGE_MODELS,
  ...VIDEO_MODELS,
]

export const AI_MODELS_BY_TYPE = {
  text: TEXT_MODELS,
  image: IMAGE_MODELS,
  video: VIDEO_MODELS,
}

export function getModelById(id: string): AIModelEntry | undefined {
  return ALL_AI_MODELS.find((model) => model.id === id)
}

export function getModelsByType(type: AIModelType): AIModelEntry[] {
  return ALL_AI_MODELS.filter((model) => model.type === type)
}

export function buildModelPromptRules(modelId: string): string {
  const model = getModelById(modelId)
  if (!model) return ''

  const lines: string[] = [
    `=== REGLAS ESPECÍFICAS PARA: ${model.label} (${model.provider}) ===`,
    `Tipo: ${model.type.toUpperCase()} | Versión: ${model.version}`,
    ``,
    `FORTALEZAS A APROVECHAR:`,
    ...model.strengths.map((s) => `• ${s}`),
    ``,
    `INSTRUCCIONES OBLIGATORIAS PARA ESTE MODELO:`,
    ...model.promptRules.map((r, i) => {
      const base = `${i + 1}. ${r.rule}`
      return r.example ? `${base}\n   EJEMPLO: ${r.example}` : base
    }),
  ]

  if (model.contextWindow) {
    lines.push(``, `VENTANA DE CONTEXTO: ${model.contextWindow.toLocaleString()} tokens — aprovéchala.`)
  }

  return lines.join('\n')
}
