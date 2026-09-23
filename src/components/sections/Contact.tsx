'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCheck, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { FadeIn } from '@/components/motion/FadeIn';
import { siteConfig } from '@/data/site';
import { useCursor } from '@/context/CursorContext';

function CopyEmail({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { setCursorVariant, setCursorText } = useCursor();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Email copied!' : 'Copy email address'}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-300 group"
      style={{
        background: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span className="text-xs uppercase font-mono tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
        {copied ? 'Copied' : 'Copy'}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', color: 'var(--color-accent)' }}
          >
            <CheckCheck size={14} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="group-hover:text-[var(--color-accent)] transition-colors"
            style={{ display: 'block', color: 'var(--color-text-secondary)' }}
          >
            <Copy size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Contact() {
  const { setCursorVariant, setCursorText } = useCursor();
  
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding border-t relative overflow-hidden"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      {/* Background glow */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ background: 'var(--color-accent)' }}
        aria-hidden="true"
      />

      <div className="container-portfolio relative z-10">
        
        {/* ── Section marker ─────────────────────────────────── */}
        <FadeIn className="mb-14 flex items-center gap-4">
          <span className="section-number">05</span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
          <span className="section-number">Contact</span>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {/* Main Statement */}
          <FadeIn>
            <h2 id="contact-heading" className="text-h2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Got a project in mind, an internship opening, or just want to chat?
            </h2>
            <p className="text-display max-w-4xl leading-[0.95]" style={{ color: 'var(--color-text-primary)' }}>
              Let&apos;s build something <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>great</span> together.
            </p>
          </FadeIn>

          {/* Big Email Button */}
          <FadeIn delay={0.1}>
            <div 
              className="flex flex-col sm:flex-row sm:items-center gap-6 p-8 md:p-12 rounded-2xl border transition-colors hover:bg-[var(--color-bg-subtle)]" 
              style={{ borderColor: 'var(--color-border)' }}
              onMouseEnter={() => {
                setCursorVariant('email');
                setCursorText('HI');
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
              }}
              data-custom-cursor
            >
              <div className="flex-1">
                <p className="section-number mb-2" style={{ color: 'var(--color-accent)' }}>Email</p>
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="text-2xl md:text-4xl font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors break-all"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full transition-transform hover:scale-105 hover:bg-[#c49840]"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
                  aria-label="Send email"
                >
                  <ArrowUpRight size={20} />
                </a>
                <CopyEmail text={siteConfig.email} />
              </div>
            </div>
          </FadeIn>

          {/* Social Links Footer */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <p className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                Usually responds within 24 hours.
              </p>
              
              <div className="flex items-center gap-6 ml-auto">
                <a
                href={`https://github.com/${siteConfig.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <GithubIcon size={16} />
                <span className="group-hover:text-[var(--color-text-primary)] transition-colors">GitHub</span>
              </a>
              <a
                href={`https://www.linkedin.com/in/${siteConfig.linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <LinkedinIcon size={16} />
                <span className="group-hover:text-[var(--color-text-primary)] transition-colors">LinkedIn</span>
              </a>
            </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
