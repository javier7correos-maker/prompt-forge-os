'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '⚡' },
  { href: '/forge', label: 'Forge', icon: '🔥' },
  { href: '/library', label: 'Library', icon: '📚' },
  { href: '/vault', label: 'Vault', icon: '🧠' },
  { href: '/history', label: 'Historial', icon: '📋' },
  { href: '/settings', label: 'Config', icon: '🛡️' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <aside
        className="desktop-sidebar"
        style={{
          width: '240px',
          minHeight: '100vh',
          background: '#0d0f17',
          borderRight: '1px solid var(--border)',
          flexDirection: 'column',
          padding: '24px 16px',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <div style={{ marginBottom: '40px', paddingLeft: '8px' }}>
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              color: '#C8A96A',
              fontWeight: 700,
              letterSpacing: '0.05em',
              lineHeight: 1.2,
            }}
          >
            PROMPT<br />FORGE OS
          </div>
          <div style={{ color: 'var(--text-ghost)', fontSize: '11px', marginTop: '4px' }}>v1.0.0</div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(200,169,106,0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(200,169,106,0.2)' : '1px solid transparent',
                  color: isActive ? '#C8A96A' : 'var(--text-dim)',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid transparent',
            color: 'var(--text-ghost)',
            fontSize: '14px',
            cursor: 'pointer',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span>🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <nav
        className="mobile-sidebar"
        style={{
          position: 'fixed',
          left: '12px',
          right: '12px',
          bottom: '12px',
          zIndex: 40,
          justifyContent: 'space-between',
          gap: '8px',
          padding: '10px',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10, 12, 18, 0.92)',
          backdropFilter: 'blur(18px)',
        }}
      >
        {NAV_ITEMS.filter((item) => item.href !== '/history').slice(0, 5).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '12px',
                background: isActive ? 'rgba(200,169,106,0.1)' : 'transparent',
                color: isActive ? '#C8A96A' : 'var(--text-dim)',
                textDecoration: 'none',
                fontSize: '11px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
