'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/motion/FadeIn';
import { skillGroups } from '@/data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { setCursorVariant, setCursorText } = useCursor();

  const allSkills = skillGroups.flatMap(group => 
    group.skills.map(skill => ({ ...skill, category: group.label }))
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-padding border-t relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="container-portfolio relative z-10">
        
        {/* ── Section marker ─────────────────────────────────── */}
        <FadeIn className="mb-14 flex items-center gap-4">
          <span className="section-number">02</span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
          <span className="section-number">Skills & Architecture</span>
        </FadeIn>

        {/* ── Header ─────────────────────────────────────────── */}
        <FadeIn className="mb-16">
          <h2 id="skills-heading" className="text-display max-w-2xl leading-[0.95]" style={{ color: 'var(--color-text-primary)' }}>
            The ecosystem I use to <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>engineer</span>.
          </h2>
        </FadeIn>

        {/* ── Interactive Categories ─────────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-4 mb-16">
            <button
              className="px-6 py-2 rounded-full border text-sm font-mono transition-all duration-300"
              style={{
                background: activeCategory === null ? 'var(--color-text-primary)' : 'transparent',
                color: activeCategory === null ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                borderColor: activeCategory === null ? 'var(--color-text-primary)' : 'var(--color-border)'
              }}
              onClick={() => setActiveCategory(null)}
              onMouseEnter={() => { setCursorVariant('project'); setCursorText('ALL'); }}
              onMouseLeave={() => { setCursorVariant('default'); setCursorText(''); }}
              data-custom-cursor
            >
              All Technologies
            </button>
            {skillGroups.map((group) => (
              <button
                key={group.label}
                className="px-6 py-2 rounded-full border text-sm font-mono transition-all duration-300"
                style={{
                  background: activeCategory === group.label ? 'var(--color-accent)' : 'transparent',
                  color: activeCategory === group.label ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                  borderColor: activeCategory === group.label ? 'var(--color-accent)' : 'var(--color-border)'
                }}
                onClick={() => setActiveCategory(activeCategory === group.label ? null : group.label)}
                onMouseEnter={() => { setCursorVariant('project'); setCursorText('FILTER'); }}
                onMouseLeave={() => { setCursorVariant('default'); setCursorText(''); }}
                data-custom-cursor
              >
                {group.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── Floating Interactive Skills ──────────────────────── */}
        <motion.div layout className="flex flex-wrap gap-4 md:gap-6 min-h-[300px] content-start">
          <AnimatePresence>
            {allSkills.map((skill, idx) => {
              const isActive = activeCategory === null || activeCategory === skill.category;
              if (!isActive) return null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
                  key={`${skill.category}-${skill.name}`}
                  className="px-6 py-4 rounded-xl border flex items-center gap-3 group transition-colors"
                  style={{ 
                    background: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--color-accent)';
                    el.style.background = 'var(--color-bg)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--color-border-subtle)';
                    el.style.background = 'var(--color-bg-subtle)';
                  }}
                >
                  <span className="text-lg md:text-xl font-medium tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {skill.name}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-accent)' }} />
                  <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-muted)' }}>
                    {skill.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
