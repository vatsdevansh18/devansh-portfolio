import { Variants } from 'framer-motion';

// ─── Easing ─────────────────────────────────────────────────────────────────
export const ease = {
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  snappy: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// ─── Level 2: Fade In ───────────────────────────────────────────────────────
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.expo },
  },
};

// ─── Level 3: Stagger Container ─────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.expo },
  },
};

// ─── Level 4: Hero Title (character stagger) ─────────────────────────────────
export const heroTitleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

export const heroCharVariants: Variants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.6, ease: ease.expo },
  },
};

// ─── Page transition ─────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.expo },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: ease.snappy },
  },
};

// ─── Slide in from left ───────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: ease.expo },
  },
};

// ─── Slide in from right ─────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: ease.expo },
  },
};

// ─── Scale in ────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: ease.expo },
  },
};

// ─── Reduced-motion safe versions ────────────────────────────────────────────
// When prefers-reduced-motion is enabled, pass reducedMotion={true} to
// override variants with instant transitions.
export const reducedVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
};
