import type { ForgeOutputType, ForgeTemplate } from '@/types'

export const TEMPLATES: ForgeTemplate[] = [
  // ============================================================
  // CASOS REALES (Templates "God System" probados en el mundo)
  // ============================================================
  {
    id: 'luzea-dark-luxury',
    category: 'ecommerce',
    label: '✨ Luzea (Dark Luxury Skincare)',
    icon: '🖤',
    desc: 'Template real de Luzea — tienda de skincare de lujo oscuro en Shopify. Copy, secciones Liquid y estrategia de ventas completa.',
    prefill:
      'Quiero construir la tienda completa de Luzea, una marca de skincare de lujo oscuro ("Dark Luxury"). Vendemos cremas, serums y rituales premium para mujeres que desean poder e identidad. La estética es oscura, elegante y misteriosa — lo opuesto a las marcas coloridas masivas. Necesito el copy de la landing page (Hero, Beneficios, Testimonios, FAQ) + una sección Shopify en Liquid lista para pegarla en el tema Dawn + un plan de primeras 20 ventas en 5 días.',
    prefillBrandName: 'Luzea',
    prefillTone: 'Misterioso, poderoso, elegante. Como si fuera un producto de alta costura.',
    prefillOutputType: 'full_system',
  },

  // ============================================================
  // E-commerce General
  // ============================================================
  {
    id: 'one-product',
    category: 'ecommerce',
    label: 'One Product Store',
    icon: '🛍️',
    desc: 'Landing page para vender UN solo producto. Ideal para validar rapido.',
    prefill: 'Quiero una landing page para vender [PRODUCTO]. Fondo oscuro, elegante, que inspire confianza y convierta visitas en ventas. Incluir hero, beneficios, testimonios y FAQ.',
  },
  {
    id: 'dropshipping',
    category: 'ecommerce',
    label: 'Dropshipping Niche',
    icon: '📦',
    desc: 'Tienda de nicho con multiples productos',
    prefill: 'Quiero una tienda de dropshipping para el nicho de [NICHO]. Diseño moderno, mobile-first, con página de categorías y fichas de producto optimizadas para conversión.',
  },
  {
    id: 'shopify-section',
    category: 'ecommerce',
    label: 'Sección Shopify',
    icon: '🏪',
    desc: 'Sección editable en Liquid para temas Shopify.',
    prefill: 'Necesito una sección Shopify en Liquid para mostrar [PRODUCTO]. Debe ser 100% editable desde el Theme Editor, con schema completo y mobile-first.',
  },
  {
    id: 'email-flow',
    category: 'ecommerce',
    label: 'Flujo de Emails',
    icon: '📧',
    desc: 'Secuencia de emails (Klaviyo/Mailchimp) automáticos post-compra.',
    prefill: 'Necesito una secuencia de emails automáticos para [PRODUCTO]. Incluir confirmación, tracking, follow-up 7 días, review 14 días y reactivación 30 días.',
  },
  // Ads
  {
    id: 'tiktok-copy',
    category: 'ads',
    label: 'Copy TikTok / Ads',
    icon: '🎬',
    desc: 'Scripts de videos virales y copies para ads.',
    prefill: 'Necesito scripts de videos TikTok y copies para ads de [PRODUCTO]. Hooks agresivos, scripts 30s y captions para conseguir ventas inmediatas.',
  },
  {
    id: 'meta-ads',
    category: 'ads',
    label: 'Meta Ads Copy',
    icon: '📣',
    desc: 'Copies testeados para Facebook e Instagram Ads.',
    prefill: 'Necesito 5 variantes de copy para Meta Ads de [PRODUCTO]. Incluir headline, texto principal y CTA para cada variante enfocado en conversion.',
  },
  // SaaS
  {
    id: 'saas-mvp',
    category: 'saas',
    label: 'SaaS MVP',
    icon: '🚀',
    desc: 'Arquitectura y codigo base de un SaaS minimo viable.',
    prefill: 'Necesito construir un SaaS llamado [PRODUCTO] que hace [NICHO]. Stack gratis: Next.js + Supabase + Vercel. Quiero auth, dashboard y las primeras 3 funciones core paso a paso.',
  },
  {
    id: 'saas-landing',
    category: 'saas',
    label: 'SaaS Landing Page',
    icon: '💻',
    desc: 'Landing page premium e impactante para SaaS.',
    prefill: 'Necesito una landing page para mi SaaS [PRODUCTO] en el nicho de [NICHO]. Dark mode premium estilo Apple, hero potente, pricing claro, FAQ y social proof.',
  },
  // Agencia
  {
    id: 'agency-pitch',
    category: 'agencia',
    label: 'Pitch de Agencia',
    icon: '🏢',
    desc: 'Propuesta brutal de servicios para cerrar a un cliente.',
    prefill: 'Necesito una propuesta de servicios para un cliente de [NICHO] que quiere [PRODUCTO]. Formato profesional, directivo, enfocado en ROI y no en horas de trabajo.',
  },
  // Automatizacion
  {
    id: 'n8n-flow',
    category: 'automatizacion',
    label: 'Flujo n8n / Make',
    icon: '🔄',
    desc: 'Automatizacion visual de procesos complejos paso a paso.',
    prefill: 'Necesito automatizar este proceso: [PRODUCTO]. Trigger: [NICHO]. Herramienta a usar: Make.com (plan gratis). Incluir manejo de errores y notificacion en Discord/Slack.',
  },
  // Ventas
  {
    id: 'sales-script',
    category: 'ventas',
    label: 'Script de Ventas',
    icon: '💬',
    desc: 'Script de alta conversion para WhatsApp o DM.',
    prefill: 'Necesito un script de ventas para vender [PRODUCTO] por WhatsApp. Incluir opener, manejo de objeciones (muy caro, no confio, dejame pensarlo) y cierre directo.',
  },
  // Contenido
  {
    id: 'content-strategy',
    category: 'contenido',
    label: 'Estrategia de Contenido',
    icon: '📱',
    desc: '30 días enteros de contenido para redes sociales.',
    prefill: 'Necesito 30 días de contenido para [NICHO]. Tema principal: [PRODUCTO]. Dame el Calendario exacto, ideas de posts y captions listos para publicar (Twitter e Insta).',
  },
  // Agentes IA y Managers (NEW)
  {
    id: 'agent-developer',
    category: 'agentes_ia',
    label: 'Python Developer Agent',
    icon: '🤖',
    desc: 'Un agente experto en programar scripts de Python para Windows.',
    prefill: 'Actua como un Ingeniero Senior de Python. Necesito que me hagas un script paso a paso para automatizar [COMPLETAR TAREA EN WINDOWS]. Dame el codigo, requirements.txt y como ejecutarlo.',
  },
  {
    id: 'manager-sop',
    category: 'agentes_ia',
    label: 'Manager SOP',
    icon: '📋',
    desc: 'Genera Procedimientos Estandarizados (SOP) para delegar tareas completas a IA o humanos.',
    prefill: 'Crea un Standard Operating Procedure (SOP) riguroso para delegar la tarea de [TAREA]. El procedimiento debe ser a prueba de tontos, paso por paso, con checks de calidad.',
  },
  // Finanzas y negocios (NEW)
  {
    id: 'plan-financiero',
    category: 'finanzas_negocios',
    label: 'Análisis Financiero Libre',
    icon: '💸',
    desc: 'Evaluación rápida de rentabilidad, pricing y costos para un negocio.',
    prefill: 'Haz un plan financiero básico para validar si de verdad es rentable vender [PRODUCTO]. Mi costo es [COSTO] y quiero venderlo a [PRECIO].',
  },
  {
    id: 'validate-idea',
    category: 'finanzas_negocios',
    label: 'Validador de Ideas',
    icon: '🔥',
    desc: 'Destruye o valida una idea midiendo si hay mercado y si tiene sentido empezar.',
    prefill: 'Quiero validar esta idea de negocio: [IDEA]. Actúa como inversor angel, dime por qué va a fallar (riesgos) y cómo pivotarla rápido para empezar a facturar sin gastar capital.',
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'Todo', icon: '⚡' },
  { id: 'ecommerce', label: 'E-commerce (Tiendas, Shopify)', icon: '🛍️' },
  { id: 'saas', label: 'SaaS (Apps, Software)', icon: '🚀' },
  { id: 'agentes_ia', label: 'Agentes IA & SOPs', icon: '🤖' },
  { id: 'agencia', label: 'Agencia (Servicios, B2B)', icon: '🏢' },
  { id: 'finanzas_negocios', label: 'Finanzas e Inversión', icon: '💸' },
  { id: 'ads', label: 'Ads & Copywriting', icon: '🎬' },
  { id: 'automatizacion', label: 'Automatización (Make, n8n)', icon: '🔄' },
  { id: 'ventas', label: 'Ventas (Scripts, DM)', icon: '💬' },
  { id: 'contenido', label: 'Redes Sociales', icon: '📱' },
  { id: 'codigo', label: 'Código Puro', icon: '💻' },
  { id: 'otros', label: 'Otros / General', icon: '✨' },
] as const

export const OUTPUT_TYPES: Array<{ id: ForgeOutputType; label: string }> = [
  { id: 'full_system', label: '🌟 Sistema Maestro (Plan + Todo)' },
  { id: 'landing_page', label: 'Landing page CTA-Focused' },
  { id: 'agent_system', label: 'Sistema de Agentes' },
  { id: 'bot_whatsapp', label: 'Bot Script WhatsApp' },
  { id: 'plan_financiero', label: 'Proyeccion de Rentabilidad' },
  { id: 'manager_sop', label: 'Documento Ejecutivo SOP' },
  { id: 'shopify_section', label: 'Seccion Shopify en Codigo' },
  { id: 'email_sequence', label: 'Secuencia de emails p/ Ventas' },
  { id: 'tiktok_scripts', label: 'Scripts TikTok / Reels Virales' },
  { id: 'saas_mvp', label: 'SaaS MVP (Código Completo)' },
  { id: 'api_route', label: 'Ruta API (NodeJS/Python)' },
  { id: 'sales_script', label: 'Script Objecciones/Ventas' },
  { id: 'ad_copy', label: 'Anuncios Facebook/Insta' },
  { id: 'content_strategy', label: 'Grilla Mensual de Contenido' },
  { id: 'automation_flow', label: 'Flujo de Make.com/n8n' },
  { id: 'product_description', label: 'Copy de Ficha de Producto' },
  { id: 'full_store', label: 'Arquitectura de Tienda Entera' },
  { id: 'otros', label: 'Formato Libre' },
]
