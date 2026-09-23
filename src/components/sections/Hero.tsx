'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, MoveDownRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { siteConfig } from '@/data/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Dynamically import the 3D Canvas so it doesn't block the main thread SSR
const HeroCanvas = dynamic(() => import('@/components/canvas/HeroCanvas'), {
  ssr: false,
});

export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: heroRef });

  useGSAP(() => {
    if (prefersReduced) return;

    let split1: SplitType | null = null;
    let split2: SplitType | null = null;
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

    // Small timeout ensures fonts have loaded and layout is stable before splitting
    const timer = setTimeout(() => {
      // 1. Split the text into characters
      split1 = new SplitType(name1Ref.current!, { types: 'chars' });
      split2 = new SplitType(name2Ref.current!, { types: 'chars' });

      // 2. Hide initially to prevent FOUC
      gsap.set([split1.chars, split2.chars], { y: '100%', opacity: 0 });
      gsap.set('.hero-fade', { opacity: 0, y: 15 });
      gsap.set('.hero-line', { scaleX: 0 });

      // 3. Create the entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, delay: 0.1 })
        .to(split1.chars, { y: '0%', opacity: 1, duration: 1.2, stagger: 0.03 }, '-=0.6')
        .to(split2.chars, { y: '0%', opacity: 1, duration: 1.2, stagger: 0.03 }, '-=1.0')
        .to('.hero-line', { scaleX: 1, duration: 1.5, ease: 'expo.inOut' }, '-=0.8')
        .to('.hero-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '-=1.2');

      // 4. Pointer-reactive depth parallax effect
      if (!prefersReduced && typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
        const xToName1 = gsap.quickTo(name1Ref.current, 'x', { duration: 0.8, ease: 'power3.out' });
        const yToName1 = gsap.quickTo(name1Ref.current, 'y', { duration: 0.8, ease: 'power3.out' });
        
        const xToName2 = gsap.quickTo(name2Ref.current, 'x', { duration: 1.2, ease: 'power3.out' });
        const yToName2 = gsap.quickTo(name2Ref.current, 'y', { duration: 1.2, ease: 'power3.out' });

        mouseMoveHandler = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 40; // max 20px
          const y = (e.clientY / innerHeight - 0.5) * 40;
          xToName1(x);
          yToName1(y);
          xToName2(x * 1.5);
          yToName2(y * 1.5);
        };

        window.addEventListener('mousemove', mouseMoveHandler);
      }
    }, 50); // slight delay

    return () => {
      clearTimeout(timer);
      if (split1) split1.revert();
      if (split2) split2.revert();
      if (mouseMoveHandler) {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }
    };
  }, { dependencies: [prefersReduced], revertOnUpdate: true });

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col overflow-hidden pt-32 pb-20 lg:pt-[18vh]"
    >
      {/* ── Background WebGL Layer ───────────────────────────── */}
      {!prefersReduced && <HeroCanvas />}

      {/* ── Fallback / Base Background ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240,237,232,0.028) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240,237,232,0.028) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="container-portfolio relative z-10 flex-1 flex flex-col justify-start">

        {/* Eyebrow */}
        <div className="hero-fade hero-eyebrow mb-10 flex items-center gap-3">
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--color-accent)' }}
            aria-hidden="true"
          />
          <span className="section-number tracking-widest" style={{ color: 'var(--color-accent)' }}>
            Software Developer&nbsp;&nbsp;·&nbsp;&nbsp;BCA Student&nbsp;&nbsp;·&nbsp;&nbsp;Delhi NCR
          </span>
        </div>

        {/* Name — SplitType target */}
        <div className="overflow-hidden mix-blend-difference pb-2">
          <h1 className="sr-only">Devansh Vats — {siteConfig.tagline}</h1>
          
          <span 
            ref={name1Ref} 
            className="hero-name block select-none clip-text-reveal"
          >
            DEVANSH
          </span>
          <span 
            ref={name2Ref} 
            className="hero-name block select-none clip-text-reveal" 
            aria-hidden="true"
          >
            VATS<span style={{ color: 'var(--color-accent)' }}>.</span>
          </span>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="hero-line my-8 lg:my-10 h-px origin-left"
          style={{ background: 'var(--color-border)' }}
        />

        {/* Tagline + bio */}
        <div className="max-w-2xl">
          <p
            className="hero-fade text-h3 mb-3"
            style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}
          >
            {siteConfig.tagline}
          </p>
          <p
            className="hero-fade text-base leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {siteConfig.yearOfStudy} at {siteConfig.university}.{' '}
            Building interfaces that feel as good as they look.
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-text-inverse)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#c49840';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)';
              }}
            >
              See my work
              <MoveDownRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold border transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                borderColor: 'var(--color-border)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--color-accent-muted)';
                el.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--color-border)';
                el.style.color = 'var(--color-text-secondary)';
              }}
            >
              Let&apos;s connect
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </MagneticButton>
        </div>

        {/* Social strip */}
        <div className="hero-fade mt-16 flex items-center gap-5">
          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group flex items-center gap-2.5 text-sm transition-colors duration-200"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
            }}
          >
            <GithubIcon size={14} aria-hidden />
            <span className="font-mono">{siteConfig.github}</span>
          </a>
          <span className="w-px h-4" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
          <a
            href={`https://www.linkedin.com/in/${siteConfig.linkedin}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2.5 text-sm transition-colors duration-200"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
            }}
          >
            <LinkedinIcon size={14} aria-hidden />
            <span className="font-mono">devansh-vattsss</span>
          </a>
        </div>
      </div>

    </section>
  );
}
