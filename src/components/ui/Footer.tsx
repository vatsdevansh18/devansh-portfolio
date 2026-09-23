'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { useCursor } from '@/context/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Footer() {
  const [time, setTime] = useState<string>('');
  const { setCursorVariant } = useCursor();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata', // Delhi NCR timezone
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t py-8 overflow-hidden" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="container-portfolio flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <span className="hidden md:block w-px h-4" style={{ background: 'var(--color-border)' }} />
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new opportunities
          </p>
        </div>

        <div className="flex items-center gap-8">
          <p className="text-sm font-mono tabular-nums tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
            DELHI NCR <span className="text-[var(--color-text-primary)]">{time}</span>
          </p>

          <button 
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant('drag')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex items-center justify-center w-10 h-10 rounded-full border transition-colors hover:bg-[var(--color-bg-subtle)]"
            style={{ borderColor: 'var(--color-border)' }}
            aria-label="Scroll to top"
            data-custom-cursor
          >
            <motion.div
              animate={prefersReduced ? {} : { y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowUp size={16} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </motion.div>
          </button>
        </div>
      </div>
    </footer>
  );
}
