import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { siteConfig } from '@/data/site';


export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t"
      style={{
        borderColor: 'var(--color-border-subtle)',
        background: 'var(--color-bg)',
      }}
    >
      <div className="container-portfolio py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: identity */}
          <div className="space-y-2">
            <p
              className="font-mono text-sm font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              {siteConfig.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {siteConfig.degree} · {siteConfig.university}
            </p>
          </div>

          {/* Center: nav */}
          <nav aria-label="Footer navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm" role="list">
              {['about', 'skills', 'projects', 'experience', 'contact'].map((id) => (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    className="capitalize transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {id}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: social */}
          <div className="flex items-center gap-4">
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <GithubIcon size={18} aria-hidden />
            </a>
            <a
              href={`https://www.linkedin.com/in/${siteConfig.linkedin}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <LinkedinIcon size={18} aria-hidden />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t text-xs"
          style={{
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-muted)',
          }}
        >
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors"
          >
            View source <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
