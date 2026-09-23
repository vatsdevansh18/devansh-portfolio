import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { siteConfig } from '@/data/site';

/* ─── Fonts ───────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

/* ─── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    'Devansh Vats',
    'software developer',
    'BCA student',
    'Christ University',
    'portfolio',
    'React',
    'Next.js',
    'frontend developer',
    'Delhi NCR',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.github}`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

import { CustomCursor } from '@/components/ui/CustomCursor';
import { CursorProvider } from '@/context/CursorContext';

import { FloatingNav } from '@/components/ui/FloatingNav';

/* ─── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CursorProvider>
          <CustomCursor />
          <FloatingNav />
          {/* Accessibility: skip navigation */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          {/* Scroll progress indicator (CSS-driven, no JS) */}
          <div className="scroll-progress-bar" role="progressbar" aria-hidden="true" />

          {/* Smooth scroll */}
          <LenisProvider>
            {children}
          </LenisProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
