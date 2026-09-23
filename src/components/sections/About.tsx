'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/data/site';
import { education } from '@/data/experience';
import { useCursor } from '@/context/CursorContext';

export function About() {
  const edu = education[0];
  const { setCursorVariant, setCursorText } = useCursor();

  const handleHover = (text: string) => {
    setCursorVariant('project');
    setCursorText(text);
  };
  const handleLeave = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="container-portfolio">

        {/* ── Section marker ─────────────────────────────────── */}
        <FadeIn className="mb-14 flex items-center gap-4">
          <span className="section-number">01</span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border-subtle)' }} aria-hidden="true" />
          <span className="section-number">About</span>
        </FadeIn>

        {/* ── Editorial 60/40 grid ────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 items-start">

          {/* Left — large typographic statement + bio */}
          <div>
            <FadeIn>
              <h2 id="about-heading" className="text-display mb-10 leading-[0.95]" style={{ color: 'var(--color-text-primary)' }}>
                Building at the<br />
                intersection of<br />
                <span 
                  style={{ color: 'var(--color-accent)' }}
                  onMouseEnter={() => handleHover('UI/UX')}
                  onMouseLeave={handleLeave}
                  data-custom-cursor
                >design</span> and<br />
                <span
                  style={{ color: 'var(--color-text-primary)' }}
                  onMouseEnter={() => handleHover('SYSTEMS')}
                  onMouseLeave={handleLeave}
                  data-custom-cursor
                >engineering</span>.
              </h2>
            </FadeIn>

            <StaggerContainer className="space-y-5 max-w-lg">
              <StaggerItem>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  I&apos;m Devansh — a second-year BCA student at Christ University, Delhi NCR.
                  I care about the quality of what I ship: <span 
                    className="font-medium underline decoration-[var(--color-border)] underline-offset-4 cursor-default" 
                    style={{ color: 'var(--color-text-primary)' }}
                    onMouseEnter={() => handleHover('MAINTAINABLE')} onMouseLeave={handleLeave} data-custom-cursor
                  >clean code</span>, <span 
                    className="font-medium underline decoration-[var(--color-border)] underline-offset-4 cursor-default" 
                    style={{ color: 'var(--color-text-primary)' }}
                    onMouseEnter={() => handleHover('ACCESSIBLE')} onMouseLeave={handleLeave} data-custom-cursor
                  >thoughtful UX</span>,
                  and the discipline to finish what I start.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  My interest lives at the edge where software and design meet.
                  I don&apos;t just want things to work — I want them to feel
                  considered and intentional.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Outside coursework I&apos;m building projects, exploring open source,
                  and actively looking for <span 
                    className="font-medium underline decoration-[var(--color-border)] underline-offset-4 cursor-default" 
                    style={{ color: 'var(--color-text-primary)' }}
                    onMouseEnter={() => handleHover('HIRE ME')} onMouseLeave={handleLeave} data-custom-cursor
                  >internships and collaborations</span> where
                  I can contribute and grow alongside experienced engineers.
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right — credential sidebar */}
          <FadeIn delay={0.2} direction="left">
            <div className="space-y-6">

              {/* Education card — styled like a credential */}
              <div
                className="p-6 rounded-xl border relative overflow-hidden"
                style={{
                  background: 'var(--color-bg-subtle)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {/* Watermark */}
                <span
                  className="absolute -right-4 -top-4 text-[7rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'var(--color-accent)', opacity: 0.04 }}
                  aria-hidden="true"
                >
                  BCA
                </span>

                <p className="section-number mb-4" style={{ color: 'var(--color-accent)' }}>
                  Education
                </p>
                <h3
                  className="font-bold text-base mb-1"
                  style={{ color: 'var(--color-text-primary)', fontSize: '1.0625rem' }}
                >
                  {edu.institution}
                </h3>
                <p
                  className="text-sm font-mono mb-4"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {edu.degree}
                </p>
                <div
                  className="pt-4 border-t flex flex-col gap-2"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Location</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{edu.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Period</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Status</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-accent)' }}>
                      {siteConfig.yearOfStudy} · Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Currently exploring */}
              <div
                className="p-6 rounded-xl border"
                style={{
                  background: 'var(--color-bg-subtle)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <p className="section-number mb-4" style={{ color: 'var(--color-accent)' }}>
                  Currently Exploring
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.currentlyLearning.map((item) => (
                    <Badge key={item} variant="accent" size="md">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <div
                className="p-6 rounded-xl border"
                style={{
                  background: 'var(--color-bg-subtle)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <p className="section-number mb-4" style={{ color: 'var(--color-accent)' }}>
                  Quick Facts
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Location', value: siteConfig.location },
                    { label: 'Focus', value: 'Frontend + Full-stack' },
                    { label: 'Status', value: 'Open to internships' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                      <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
