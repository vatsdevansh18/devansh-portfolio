import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { projects, getProjectBySlug } from '@/data/projects';
import { siteConfig } from '@/data/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.tagline,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[currentIndex + 1] ?? projects[0];

  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section
          className="pt-32 pb-16 border-b"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="container-portfolio">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <ArrowLeft size={14} />
                All projects
              </Link>
            </FadeIn>

            <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">
              <div>
                <FadeIn>
                  <div className="flex items-center gap-3 mb-5">
                    <Badge variant="accent">{project.year}</Badge>
                    <span className="text-label" style={{ color: 'var(--color-text-muted)' }}>
                      {project.category} · {project.role}
                    </span>
                  </div>
                  <h1 className="text-h1 mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    {project.title}
                  </h1>
                  <p
                    className="text-h3 max-w-xl"
                    style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}
                  >
                    {project.tagline}
                  </p>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <FadeIn delay={0.15} direction="left">
                <div
                  className="p-5 rounded-xl border space-y-4"
                  style={{
                    background: 'var(--color-bg-subtle)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div>
                    <p className="text-label mb-2">Tech stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <Badge key={t} variant="default" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div
                    className="pt-4 border-t space-y-3"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-[var(--color-accent)] transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <GithubIcon size={14} aria-hidden />
                        View on GitHub
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-[var(--color-accent)] transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <ExternalLink size={14} />
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-16">
          <div className="container-portfolio max-w-3xl">
            <StaggerContainer className="space-y-12">
              {/* Overview */}
              <StaggerItem>
                <FadeIn>
                  <SectionLabel className="mb-4">Overview</SectionLabel>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {project.description}
                  </p>
                </FadeIn>
              </StaggerItem>

              {/* Problem */}
              {project.problem && (
                <StaggerItem>
                  <FadeIn>
                    <div
                      className="p-6 rounded-xl border-l-2"
                      style={{
                        background: 'var(--color-bg-subtle)',
                        borderColor: 'var(--color-accent)',
                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'transparent',
                      }}
                    >
                      <SectionLabel className="mb-3">The Problem</SectionLabel>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {project.problem}
                      </p>
                    </div>
                  </FadeIn>
                </StaggerItem>
              )}

              {/* Approach */}
              {project.approach && (
                <StaggerItem>
                  <FadeIn>
                    <SectionLabel className="mb-4">Approach</SectionLabel>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.approach}
                    </p>
                  </FadeIn>
                </StaggerItem>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <StaggerItem>
                  <FadeIn>
                    <SectionLabel className="mb-4">Challenges</SectionLabel>
                    <ul className="space-y-3">
                      {project.challenges.map((c, i) => (
                        <li
                          key={i}
                          className="flex gap-4 text-base leading-relaxed"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span
                            className="mt-1 font-mono text-sm shrink-0"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </StaggerItem>
              )}

              {/* Learnings */}
              {project.learnings && project.learnings.length > 0 && (
                <StaggerItem>
                  <FadeIn>
                    <SectionLabel className="mb-4">What I Learned</SectionLabel>
                    <ul className="space-y-3">
                      {project.learnings.map((l, i) => (
                        <li
                          key={i}
                          className="flex gap-4 text-base leading-relaxed"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span
                            className="mt-1 font-mono text-sm shrink-0"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            →
                          </span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </StaggerItem>
              )}
            </StaggerContainer>
          </div>
        </article>

        {/* Next project */}
        <FadeIn>
          <div
            className="border-t py-16"
            style={{ borderColor: 'var(--color-border-subtle)' }}
          >
            <div className="container-portfolio">
              <p className="text-label mb-6" style={{ color: 'var(--color-text-muted)' }}>
                Next project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-4"
              >
                <span
                  className="text-h2 group-hover:text-[var(--color-accent)] transition-colors duration-200"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {nextProject.title}
                </span>
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                  style={{ color: 'var(--color-accent)' }}
                />
              </Link>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
