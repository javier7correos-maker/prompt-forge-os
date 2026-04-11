'use client'

import React from 'react'

export interface InputProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
}, ref) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ color: 'var(--text-dim)', fontSize: '13px' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: disabled ? 'rgba(255,255,255,0.03)' : '#07080d',
          border: error ? '1px solid var(--red)' : '1px solid var(--border)',
          borderRadius: '8px',
          color: disabled ? 'var(--text-dim)' : 'var(--text)',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
      {error && (
        <span style={{ color: 'var(--red)', fontSize: '12px' }}>{error}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'