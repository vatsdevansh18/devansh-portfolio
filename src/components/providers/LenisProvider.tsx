'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for GSAP to prevent jank when synced with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
