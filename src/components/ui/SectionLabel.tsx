import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'p' | 'div';
}

/** Small mono uppercase label used above section titles */
export function SectionLabel({ children, className = '', as: Tag = 'span' }: SectionLabelProps) {
  return (
    <Tag className={`text-label inline-flex items-center gap-2 ${className}`}>
      <span
        className="inline-block w-5 h-px"
        style={{ background: 'var(--color-accent)' }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  );
}
