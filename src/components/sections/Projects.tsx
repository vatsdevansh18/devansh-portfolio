'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { FadeIn } from '@/components/motion/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { projects, getFeaturedProjects } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCursor } from '@/context/CursorContext';

const categoryLabels: Record<ProjectCategory | 'all', string> = {
  all: 'All',
  web: 'Web',
  mobile: 'Mobile',
  cli: 'CLI',
  library: 'Library',
  experiment: 'Experiment',
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const allCategories = ['all', ...new Set(projects.map((p) => p.category))] as (ProjectCategory | 'all')[];
  const featuredProjects = getFeaturedProjects();
  const nonFeatured = projects.filter((p) => !p.featured);
  const filteredNonFeatured = activeCategory === 'all'
    ? nonFeatured
    : nonFeatured.filter((p) => p.category === activeCategory);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursorVariant, setCursorText } = useCursor();

  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    if (prefersReduced || typeof window === 'undefined' || window.innerWidth < 1024) return;
    
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    // Delay calculation slightly to ensure layout is done
    const calculateScroll = () => {
      const totalWidth = wrapper.scrollWidth;
      const viewportWidth = window.innerWidth;
      return Math.max(0, totalWidth - viewportWidth);
    };

    let amountToScroll = calculateScroll();

    if (amountToScroll > 0) {
      gsap.to(wrapper, {
        x: () => -calculateScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: () => `+=${calculateScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }
  }, { dependencies: [prefersReduced], revertOnUpdate: true });

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t relative overflow-hidden"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="container-portfolio pt-24 pb-12">
        {/* ── Section marker ─────────────────────────────────── */}
        <FadeIn className="mb-14 flex items-center gap-4">
          <span className="section-number">03</span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
          <span className="section-number">Selected Work</span>
        </FadeIn>

        {/* ── Header ─────────────────────────────────────────── */}
        <FadeIn className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 id="projects-heading" className="text-display max-w-2xl leading-[0.95]" style={{ color: 'var(--color-text-primary)' }}>
            Selected <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>works</span> &amp; experiments.
          </h2>
          <a
            href="https://github.com/vatsdevansh18"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium pb-1 border-b"
            style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}
          >
            <GithubIcon size={14} />
            <span className="group-hover:text-[var(--color-text-primary)] transition-colors">View Github Archive</span>
            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </FadeIn>
      </div>

      {/* ── Featured Projects (Horizontal GSAP Scroll) ──────── */}
      {featuredProjects.length > 0 && (
        <div ref={containerRef} className="relative w-full pb-12 lg:pb-0 h-[80vh] lg:h-screen flex items-center">
          <div 
            ref={scrollWrapperRef} 
            className="flex flex-col lg:flex-row gap-16 lg:gap-32 px-6 md:px-12 lg:px-24 w-full lg:w-max h-full lg:h-[75vh]"
          >
            {featuredProjects.map((project, idx) => (
              <div 
                key={project.slug} 
                className="w-full lg:w-[65vw] max-w-5xl shrink-0 h-full flex flex-col justify-center"
              >
                <div className="group grid lg:grid-cols-[1fr_450px] gap-8 lg:gap-16 items-center">
                  
                  {/* Left: Project Info */}
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="section-number" style={{ color: 'var(--color-accent)' }}>
                        0{idx + 1}
                      </span>
                      <span className="w-8 h-px" style={{ background: 'var(--color-border)' }} />
                      <span className="text-xs uppercase font-mono tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                        {project.year}
                      </span>
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-h1 mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
                        {project.title}
                      </h3>
                    </Link>
                    
                    <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                      ))}
                    </div>

                    <Link 
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-colors hover:text-[var(--color-accent)]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Read Case Study
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right: Abstract Graphic */}
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="order-1 lg:order-2 block w-full"
                    onMouseEnter={() => {
                      setCursorVariant('project');
                      setCursorText('EXPLORE');
                    }}
                    onMouseLeave={() => {
                      setCursorVariant('default');
                      setCursorText('');
                    }}
                    data-custom-cursor
                  >
                    <div 
                      className="aspect-video lg:aspect-[4/5] rounded-2xl border overflow-hidden relative group/img"
                      style={{ background: 'var(--color-bg-subtle)', borderColor: 'var(--color-border)' }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover/img:opacity-20 transition-all duration-700 group-hover/img:scale-110">
                        <span className="font-black text-[10rem] lg:text-[16rem] leading-none select-none tracking-tighter" style={{ color: 'var(--color-text-primary)' }}>
                          {project.title.substring(0, 1)}
                        </span>
                      </div>
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none" />
                    </div>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Secondary Projects (Horizontal List) ───────────── */}
      {nonFeatured.length > 0 && (
        <div className="container-portfolio pb-24 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div className="pt-24 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-h3" style={{ color: 'var(--color-text-primary)' }}>More Experiments</h3>
            
            {/* Filter tabs */}
            {allCategories.length > 2 && (
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-1.5 rounded-full text-xs font-mono transition-colors border"
                    style={{
                      background: activeCategory === cat ? 'var(--color-border-subtle)' : 'transparent',
                      color: activeCategory === cat ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      borderColor: activeCategory === cat ? 'var(--color-border)' : 'transparent',
                    }}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {filteredNonFeatured.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 py-6 border-b items-center transition-colors hover:bg-[var(--color-bg-subtle)] px-4 -mx-4 rounded-lg group/row"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                    onMouseEnter={() => {
                      setCursorVariant('project');
                      setCursorText('VIEW');
                    }}
                    onMouseLeave={() => {
                      setCursorVariant('default');
                      setCursorText('');
                    }}
                    data-custom-cursor
                  >
                    <div>
                      <h4 className="text-base font-semibold group-hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                        {project.title}
                      </h4>
                      <span className="text-xs font-mono md:hidden block mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        {project.year}
                      </span>
                    </div>
                    
                    <p className="text-sm line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.tagline}
                    </p>

                    <div className="hidden md:flex items-center gap-6 justify-end">
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        {project.year}
                      </span>
                      <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-accent)]" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

    </section>
  );
}
