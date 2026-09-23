import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Decorative number */}
      <div aria-hidden="true" className="relative mb-8 select-none">
        <span
          className="text-[10rem] font-black leading-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px var(--color-border)',
            letterSpacing: '-0.05em',
          }}
        >
          404
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center text-[10rem] font-black leading-none opacity-[0.03]"
          style={{
            color: 'var(--color-accent)',
            letterSpacing: '-0.05em',
          }}
        >
          404
        </span>
      </div>

      <h1 className="text-h2 mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Page not found
      </h1>
      <p className="text-base mb-10 max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-text-inverse)',
        }}
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>
    </div>
  );
}
