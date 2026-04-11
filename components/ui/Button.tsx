'use client'

import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  loading,
  type = 'button',
  style,
  className = '',
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.2s',
    opacity: disabled || loading ? 0.5 : 1,
    fontFamily: 'var(--font-body)',
  }

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '16px' },
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: '#C8A96A', color: '#07080d' },
    ghost: { background: 'rgba(255,255,255,0.05)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.1)' },
    danger: { background: 'rgba(255,91,91,0.15)', color: '#FF5B5B', border: '1px solid rgba(255,91,91,0.3)' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      className={className}
    >
      {loading ? 'Cargando...' : children}
    </button>
  )
}