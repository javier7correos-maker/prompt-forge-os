'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/forge': 'Forge',
  '/library': 'Library',
  '/vault': 'Vault',
  '/history': 'Historial',
  '/settings': 'Config',
}

export interface HeaderProps {
  userName: string
  userPlan: 'free' | 'pro' | 'agency'
}

export function Header({ userName, userPlan }: HeaderProps) {
  const pathname = usePathname()

  const pageTitle = useMemo(() => {
    const matched = Object.entries(TITLES).find(([path]) => pathname === path || pathname.startsWith(`${path}/`))
    return matched?.[1] ?? 'Workspace'
  }, [pathname])

  const initials = userName
    .split(' ')
    .map((piece) => piece.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        padding: '18px 28px',
        background: 'rgba(7, 8, 13, 0.82)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(18px)',
      }}
    >
      <div>
        <div style={{ color: 'var(--text-ghost)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          Prompt Forge OS
        </div>
        <div style={{ marginTop: '6px', fontSize: '28px', fontWeight: 700 }}>{pageTitle}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Badge variant={userPlan === 'free' ? 'ghost' : 'gold'} size="md">
          {userPlan.toUpperCase()}
        </Badge>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '999px',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            background: 'rgba(200,169,106,0.08)',
            fontWeight: 700,
          }}
        >
          {initials || 'PF'}
        </div>
      </div>
    </header>
  )
}
