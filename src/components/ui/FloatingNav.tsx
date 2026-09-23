'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' }
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-3">
      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;
        
        return (
          <div 
            key={section.id}
            className="relative flex items-center justify-end group cursor-pointer h-6"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => scrollTo(section.id)}
            data-custom-cursor
          >
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="absolute right-8 text-xs font-mono uppercase tracking-widest whitespace-nowrap"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
                >
                  0{idx + 1} {section.label}
                </motion.span>
              )}
            </AnimatePresence>
            <div 
              className="w-1 rounded-full transition-all duration-300"
              style={{
                height: isActive ? '24px' : isHovered ? '12px' : '4px',
                background: isActive ? 'var(--color-accent)' : 'var(--color-border)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
