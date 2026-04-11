'use client'

import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'red' | 'blue' | 'purple' | 'ghost'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const colors: Record<string, React.CSSProperties> = {
    gold: { background: 'rgba(200,169,106,0.15)', color: '#C8A96A', border: '1px solid rgba(200,169,106,0.3)' },
    green: { background: 'rgba(59,255,142,0.1)', color: '#3BFF8E', border: '1px solid rgba(59,255,142,0.3)' },
    red: { background: 'rgba(255,91,91,0.1)', color: '#FF5B5B', border: '1px solid rgba(255,91,91,0.3)' },
    blue: { background: 'rgba(91,158,255,0.1)', color: '#5B9EFF', border: '1px solid rgba(91,158,255,0.3)' },
    purple: { background: 'rgba(139,59,255,0.1)', color: '#8B3BFF', border: '1px solid rgba(139,59,255,0.3)' },
    ghost: { background: 'transparent', color: 'var(--text-dim)', border: '1px solid var(--border)' },
  }

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 10px', fontSize: '12px' },
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '6px',
        fontWeight: 500,
        ...sizes[size],
        ...colors[variant],
      }}
    >
      {children}
    </span>
  )
}