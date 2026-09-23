'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({ children, className, delay = 0 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            ...((staggerContainer.visible as { transition?: object }).transition ?? {}),
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
