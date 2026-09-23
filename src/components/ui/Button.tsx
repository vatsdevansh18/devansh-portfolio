'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { isExternalUrl } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: 'button' | 'a';
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded transition-all cursor-pointer select-none focus-visible:outline-2 outline-offset-3';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-muted)] shadow-[var(--shadow-accent)]',
  secondary:
    'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent-muted)] hover:text-[var(--color-accent)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]',
  outline:
    'bg-transparent text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  magnetic = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = href ? isExternalUrl(href) : false;
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (Tag === 'a' && href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!prefersReduced && magnetic ? { scale: 1.03 } : undefined}
        whileTap={!prefersReduced ? { scale: 0.97 } : undefined}
        {...externalProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={!prefersReduced ? { scale: 1.02 } : undefined}
      whileTap={!prefersReduced ? { scale: 0.97 } : undefined}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
