import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const useCases = [
  'Lanzar una landing y empezar a vender en 1 dia',
  'Crear scripts Python para Windows y automatizar tareas',
  'Ordenar finanzas y tomar decisiones con criterio',
  'Diseñar ofertas, contenido, prompts y agentes reutilizables',
]

const modules = [
  {
    title: 'Forge',
    text: 'Convierte una idea en estrategia, deliverable y prompt ejecutable.',
  },
  {
    title: 'Library',
    text: 'Te da playbooks por caso de uso para no arrancar desde cero.',
  },
  {
    title: 'Vault',
    text: 'Guarda errores, soluciones y sistemas ganadores para reutilizarlos.',
  },
]

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(7, 8, 13, 0.72)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--gold)',
            letterSpacing: '0.06em',
          }}
        >
          PROMPT FORGE OS
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href={user ? '/dashboard' : '/login'}
            style={{
              padding: '12px 18px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            {user ? 'Abrir dashboard' : 'Ingresar'}
          </Link>
          <Link
            href={user ? '/forge' : '/register'}
            style={{
              padding: '12px 18px',
              borderRadius: '999px',
              background: 'var(--gold)',
              color: 'var(--bg)',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            {user ? 'Ir a Forge' : 'Empezar'}
          </Link>
        </div>
      </header>

      <section
        style={{
          minHeight: 'calc(100svh - 81px)',
          padding: '56px 28px 48px',
          display: 'grid',
          alignItems: 'end',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gap: '28px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          <div style={{ alignSelf: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(200,169,106,0.3)',
                color: 'var(--gold)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              execution operating system
            </div>

            <h1
              style={{
                margin: '18px 0 0',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                lineHeight: 0.92,
                color: 'var(--gold)',
                maxWidth: '820px',
              }}
            >
              De idea vaga a proyecto util en un dia.
            </h1>

            <p
              style={{
                marginTop: '18px',
                color: 'var(--text-dim)',
                fontSize: '18px',
                lineHeight: 1.75,
                maxWidth: '640px',
              }}
            >
              Prompt Forge OS organiza estrategia, ejecucion, memoria y playbooks para que puedas
              lanzar landings, automatizaciones, scripts, ofertas, analisis financieros y sistemas de negocio
              sin perderte en vueltas.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link
                href={user ? '/forge' : '/register'}
                style={{
                  padding: '15px 22px',
                  borderRadius: '999px',
                  background: 'var(--gold)',
                  color: 'var(--bg)',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                {user ? 'Ejecutar un Forge' : 'Crear cuenta y usarlo'}
              </Link>
              <Link
                href={user ? '/library' : '/login'}
                style={{
                  padding: '15px 22px',
                  borderRadius: '999px',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                Ver estructura del sistema
              </Link>
            </div>
          </div>

          <div
            style={{
              padding: '26px',
              borderRadius: '28px',
              border: '1px solid rgba(255,255,255,0.08)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
              boxShadow: '0 20px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ display: 'grid', gap: '14px' }}>
              {modules.map((module) => (
                <div
                  key={module.title}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(10, 12, 18, 0.86)',
                  }}
                >
                  <div style={{ color: 'var(--gold)', fontWeight: 700 }}>{module.title}</div>
                  <div style={{ color: 'var(--text-dim)', marginTop: '6px', lineHeight: 1.6 }}>{module.text}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '18px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'grid',
                gap: '10px',
              }}
            >
              {useCases.map((item) => (
                <div key={item} style={{ color: 'var(--text-dim)' }}>
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 28px 28px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gap: '18px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {[
            {
              title: 'Pensado para free-first',
              text: 'Modo manual listo desde el dia uno y soporte para Gemini como opcion API gratuita.',
            },
            {
              title: 'Seguridad por defecto',
              text: 'Headers, auth revalidada, rate limiting y control de superficie de ataque en backend.',
            },
            {
              title: 'Automejora operativa',
              text: 'Vault guarda lecciones, errores y sistemas ganadores para reusar experiencia acumulada.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: '24px',
                borderRadius: '22px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '28px' }}>{item.title}</h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginTop: '10px' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '16px 28px 56px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '34px',
            borderRadius: '28px',
            border: '1px solid rgba(200,169,106,0.18)',
            background: 'linear-gradient(135deg, rgba(200,169,106,0.08), rgba(91,158,255,0.05))',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <div style={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '12px' }}>
              operating sequence
            </div>
            <h2 style={{ margin: '14px 0 0', fontSize: '42px', fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
              Elegir playbook. Ejecutar. Medir. Guardar aprendizaje. Repetir.
            </h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, marginTop: '14px' }}>
              Ese es el centro de la estrategia nueva. No prometer un milagro abstracto, sino reducir el ciclo
              de proyecto para que en horas puedas salir con una oferta, un sistema o un activo publicable.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
