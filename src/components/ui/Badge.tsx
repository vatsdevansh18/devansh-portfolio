import React from 'react';

type BadgeVariant = 'default' | 'accent' | 'muted' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: 'var(--color-bg-elevated)',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
  },
  accent: {
    background: 'var(--color-accent-subtle)',
    color: 'var(--color-accent)',
    border: '1px solid rgba(212,168,83,0.2)',
  },
  muted: {
    background: 'transparent',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border-subtle)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[0.625rem]',
  md: 'px-3 py-1 text-xs',
};

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded tracking-wide ${sizeStyles[size]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
