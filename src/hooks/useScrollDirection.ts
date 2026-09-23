'use client';

import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < threshold) return;
      setDirection(currentY > lastY ? 'down' : 'up');
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY, threshold]);

  return direction;
}
