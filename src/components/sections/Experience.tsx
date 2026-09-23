'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { Badge } from '@/components/ui/Badge';
import { experiences, certifications } from '@/data/experience';
import { ExternalLink } from 'lucide-react';
import { useCursor } from '@/context/CursorContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Experience() {
  const { setCursorVariant, setCursorText } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="section-padding border-t relative overflow-hidden"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="container-portfolio relative z-10">
        
        {/* ── Section marker ─────────────────────────────────── */}
        <FadeIn className="mb-14 flex items-center gap-4">
          <span className="section-number">04</span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
          <span className="section-number">Experience</span>
        </FadeIn>

        {/* ── Header ─────────────────────────────────────────── */}
        <FadeIn className="mb-20">
          <h2 id="experience-heading" className="text-display max-w-3xl leading-[0.95]" style={{ color: 'var(--color-text-primary)' }}>
            Where I&apos;ve <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>contributed</span>.
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-start">
          
          {/* ── Left: Experience Timeline ─────────────────────── */}
          <div>
            {experiences.length > 0 ? (
              <div className="relative">
                {/* Timeline axis background */}
                <div
                  className="absolute left-[3px] top-4 bottom-0 w-px"
                  style={{ background: 'var(--color-border-subtle)' }}
                  aria-hidden="true"
                />
                
                {/* Timeline axis progress (interactive) */}
                <motion.div
                  className="absolute left-[3px] top-4 w-px origin-top"
                  style={{ background: 'var(--color-accent)', height: timelineHeight }}
                  aria-hidden="true"
                />
                
                <div className="space-y-16">
                  {experiences.map((exp, i) => (
                    <FadeIn key={i} delay={0.1 * i}>
                      <div 
                        className="relative pl-10 group/exp transition-colors duration-500 rounded-lg -ml-4 p-4 hover:bg-[var(--color-bg-subtle)]"
                        onMouseEnter={() => {
                          setCursorVariant('project');
                          setCursorText('READ');
                        }}
                        onMouseLeave={() => {
                          setCursorVariant('default');
                          setCursorText('');
                        }}
                        data-custom-cursor
                      >
                        {/* Timeline node */}
                        <div
                          className="absolute left-4 top-6 w-[7px] h-[7px] rounded-full transition-all duration-300 group-hover/exp:scale-150 group-hover/exp:bg-[var(--color-accent)]"
                          style={{
                            background: exp.current ? 'var(--color-accent)' : 'var(--color-border)',
                            boxShadow: exp.current ? '0 0 12px var(--color-accent)' : 'none'
                          }}
                        />

                        {/* Content */}
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                          <h3 className="text-h2" style={{ color: 'var(--color-text-primary)' }}>
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-sm border inline-block" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent-muted)' }}>
                              Present
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm font-mono tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                          <span style={{ color: 'var(--color-accent-muted)' }}>{exp.organization}</span>
                          <span className="opacity-40">•</span>
                          <span>{exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''} {exp.current && !exp.endDate ? '— Present' : ''}</span>
                          <span className="opacity-40">•</span>
                          <span>{exp.location}</span>
                        </div>

                        <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                          {exp.description}
                        </p>

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ) : (
              <FadeIn>
                <div className="border-t border-b py-12" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <p className="text-h3" style={{ color: 'var(--color-text-muted)' }}>
                    Actively seeking internship opportunities.
                  </p>
                </div>
              </FadeIn>
            )}
          </div>

          {/* ── Right: Certifications ─────────────────────────── */}
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-8 sticky top-32">
              <div className="flex items-center gap-4">
                <span className="section-number">Certifications</span>
                <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
              </div>

              {certifications.length > 0 ? (
                <div className="space-y-6">
                  {certifications.map((cert, i) => (
                    <div key={i} className="group relative block"
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
                      <h4 className="text-base font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                        {cert.title}
                      </h4>
                      <p className="text-sm font-mono mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        {cert.issuer}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4 text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        <span>{cert.date}</span>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors relative z-10"
                          >
                            Verify
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      
                      {/* Hover underline effect */}
                      <div className="absolute -bottom-3 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" style={{ background: 'var(--color-border)' }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Certifications will appear here.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
