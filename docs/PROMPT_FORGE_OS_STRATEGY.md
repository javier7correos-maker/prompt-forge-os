# Prompt Forge OS Strategy

## North Star

Prompt Forge OS no debe vender "prompts". Debe vender velocidad de ejecucion con criterio.

La propuesta correcta es:

- tomar una idea desordenada
- convertirla en decision clara
- dar un playbook ejecutable
- generar deliverables utiles
- guardar el aprendizaje para no repetir errores

## Product Architecture

### 1. Forge

Motor principal.

Funcion:

- recibe idea + contexto + objetivo
- combina proveedor IA + perfil estrategico + memoria previa
- devuelve:
  - diagnostico
  - causa raiz
  - estrategia
  - plan operativo
  - protocolo de seguridad
  - KPI
  - prompt final reutilizable

### 2. Library

Biblioteca de playbooks.

Funcion:

- evitar comenzar desde cero
- elegir un sistema probado por tipo de proyecto
- comprimir el tiempo de decision

Casos incluidos:

- landing en 1 dia
- analista financiero free
- automatizacion Python para Windows
- motor de contenido
- adquisicion de clientes
- agente de soporte
- research de competencia
- agente de codigo y entrega

### 3. Vault

Memoria operativa.

Funcion:

- guardar errores
- guardar soluciones
- guardar prompts
- guardar checklists
- guardar sistemas ganadores

Regla:

- todo aprendizaje util debe terminar en Vault
- Forge debe reutilizar esa memoria al volver a ejecutar

### 4. Settings

Centro de gobierno del motor.

Funcion:

- elegir proveedor
- elegir modelo
- elegir perfil de estrategia
- activar seguridad estricta
- mantener modo free-first

## Execution Loop

Secuencia correcta del sistema:

1. Elegir playbook o entrar a Forge
2. Cargar idea, objetivo, publico y restricciones
3. Seleccionar memoria relevante desde Vault
4. Ejecutar Forge
5. Crear deliverable
6. Probar en mercado
7. Guardar aprendizaje en Vault
8. Repetir con mejor contexto

## What The Platform Should Produce

Prompt Forge OS debe servir para:

- crear landings
- diseñar ofertas
- validar negocios
- generar scripts Python
- ordenar finanzas
- construir automatizaciones
- estructurar contenido
- producir agentes y SOPs
- reducir tiempo de ejecucion

No debe intentar hacerlo todo al mismo tiempo.

Debe forzar una prioridad:

- un deliverable
- un canal
- una metrica

## Free-First Strategy

Default recomendado:

- proveedor principal: `manual`
- opcion API gratis: `Gemini`

Razon:

- no bloquea por presupuesto
- permite usar chats web gratis
- deja espacio para escalar a API mas adelante

Regla operativa:

- si no hay API key, el sistema igual funciona
- si hay API key, acelera
- nunca depende de un solo proveedor

## Security Model

Seguridad real en esta etapa:

- auth revalidada en backend
- rate limiting en `/api/forge`
- sanitizacion de payloads
- CSP y headers duros
- no exponer keys al cliente
- middleware solo como capa auxiliar

Riesgo residual actual:

- la dependencia `next` sigue reportando una vulnerabilidad upstream en `npm audit`
- si el objetivo es endurecimiento maximo, el siguiente salto correcto es migrar a una linea de Next mas nueva y volver a validar

## Monetization Ladder

Orden de monetizacion recomendado:

### Phase 1

Producto de servicio:

- crear sistemas para terceros con Prompt Forge OS
- cobrar por setup, landing, automatizacion, scripts o estrategia

### Phase 2

Producto digital:

- vender plantillas
- vender packs de playbooks
- vender Vaults especializados por nicho

### Phase 3

SaaS simple:

- free: manual mode + playbooks base
- pro: historial, vault expandido, modelos API, playbooks premium
- agency: workspace multiusuario + SOPs + memoria compartida

## One-Day Project Rule

Para que el sistema sirva de verdad:

- todo nuevo proyecto debe tener una version ejecutable en 24 horas
- si no entra en 24 horas, se parte en una version menor

Formato minimo de salida:

- oferta
- deliverable
- CTA
- metrica
- siguiente prueba

## Self-Improvement Rule

Todo error util debe transformarse en:

- regla
- checklist
- playbook
- o entrada de Vault

Esto convierte conversaciones, bugs y fallos en capital operativo.

## Next Steps

Para llevar el sistema de base usable a producto serio:

1. Persistir `Vault` en Supabase para usarlo entre dispositivos.
2. Crear `agents` con foco concreto, no lista decorativa.
3. Añadir exportacion de deliverables por tipo:
   - landing
   - SOP
   - script
   - oferta
   - plan financiero
4. Diseñar plan de pagos y limites de uso.
5. Preparar onboarding con 3 recorridos:
   - vender
   - automatizar
   - construir producto
