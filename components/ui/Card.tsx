'use client'

import React from 'react'

export interface CardProps {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  style?: React.CSSProperties
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  onClick,
  style,
  className = '',
}) => {
  const paddings = { sm: '16px', md: '24px', lg: '32px' }

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: paddings[padding],
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  )
}