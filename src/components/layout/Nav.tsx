'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/data/site';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export function Nav() {
  const scrollDir = useScrollDirection();
  const prefersReduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* Track scroll for background appearance */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('/#', ''));
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navHidden = scrollDir === 'down' && scrolled && !mobileOpen;

  return (
    <>
      <motion.header
        role="banner"
        animate={prefersReduced ? {} : { y: navHidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-subtle)' : '1px solid transparent',
          isolation: 'isolate',
        }}
      >
        <div className="container-portfolio">
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            {/* Logo / Name */}
            <Link
              href="/"
              className="text-sm font-mono font-medium tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
              aria-label="Devansh Vats — Home"
            >
              <span style={{ color: 'var(--color-accent)' }}>DV</span>
              <span className="opacity-40 mx-1">/</span>
              <span className="hidden sm:inline">{siteConfig.name}</span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map(({ label, href }) => {
                const sectionId = href.replace('/#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative px-4 py-2 text-sm transition-colors duration-200 rounded ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                      <span
                        className="absolute bottom-0 left-4 right-4 h-px transition-opacity duration-200"
                        style={{
                          background: 'var(--color-accent)',
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href={`mailto:${siteConfig.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded hover:border-[var(--color-accent-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                Let&apos;s connect
              </motion.a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'var(--color-bg)' }}
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {navLinks.map(({ label, href }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-4 py-4 text-3xl font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors border-b border-[var(--color-border-subtle)]"
                      >
                        <span className="text-label text-[var(--color-accent)] w-8">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
