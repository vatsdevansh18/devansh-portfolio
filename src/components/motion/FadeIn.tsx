'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInVariants, reducedVariant } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  direction = 'up',
  distance = 20,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();

  const directionOffset = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  };

  const variants = prefersReduced
    ? reducedVariant
    : {
        hidden: { opacity: 0, ...directionOffset[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.55,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
