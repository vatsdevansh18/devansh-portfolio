'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic hover effect: element gently follows the cursor within its bounds.
 * The element snaps back when the cursor leaves.
 */
export function useMagneticHover<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s linear';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
}
