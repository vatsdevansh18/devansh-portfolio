'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCursor } from '@/context/CursorContext';
import { AnimatePresence, motion } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { cursorVariant, cursorText } = useCursor();

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap.quickTo for maximum performance on mousemove
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    // Magnetic interaction defaults for generic links
    const handleLinkHover = () => {
      if (cursorVariant !== 'default') return; // Don't override specific variants
      gsap.to(cursor, { scale: 2.5, backgroundColor: 'transparent', border: '1px solid var(--color-accent)', duration: 0.3 });
    };

    const handleLinkLeave = () => {
      if (cursorVariant !== 'default') return;
      gsap.to(cursor, { scale: 1, backgroundColor: 'var(--color-accent)', border: '0px solid transparent', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    const interactiveElements = document.querySelectorAll('a:not([data-custom-cursor]), button:not([data-custom-cursor])');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [prefersReduced, cursorVariant]);

  // Handle GSAP animation states based on variant changes
  useEffect(() => {
    if (!cursorRef.current) return;
    
    switch (cursorVariant) {
      case 'project':
        gsap.to(cursorRef.current, { scale: 6, backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', mixBlendMode: 'normal', duration: 0.4, ease: 'expo.out' });
        break;
      case 'drag':
        gsap.to(cursorRef.current, { scale: 5, backgroundColor: 'var(--color-accent)', border: '0px solid transparent', mixBlendMode: 'normal', duration: 0.4, ease: 'expo.out' });
        break;
      case 'email':
        gsap.to(cursorRef.current, { scale: 7, backgroundColor: 'var(--color-success)', border: '0px solid transparent', mixBlendMode: 'normal', duration: 0.4, ease: 'expo.out' });
        break;
      case 'default':
      default:
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'var(--color-accent)', border: '0px solid transparent', mixBlendMode: 'difference', duration: 0.4, ease: 'expo.out' });
        break;
    }
  }, [cursorVariant]);

  if (prefersReduced) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ background: 'var(--color-accent)', mixBlendMode: 'difference' }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {cursorText && (
          <motion.div
            key={cursorText}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-[3px] font-mono font-bold tracking-widest uppercase text-center leading-none"
            style={{ 
              color: cursorVariant === 'project' ? 'var(--color-text-primary)' : 'var(--color-bg)',
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
