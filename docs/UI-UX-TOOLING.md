# UI/UX Tooling Decision Record

## 1. Current Tooling
- **Next.js 16.3 (App Router)** & **React 19**: Core framework.
- **Tailwind CSS v4**: Styling and design tokens.
- **Framer Motion**: Currently driving all animations (simple opacity/y-axis fades, basic spring micro-interactions).
- **Lenis**: Smooth scrolling (basic implementation).
- **Lucide React**: UI Icons.

## 2. Candidate Tools Evaluated

### Motion & Scroll Choreography
- **Framer Motion (Existing)**: Excellent for layout animations, AnimatePresence, and basic state-driven motion. Weak/verbose for complex, timeline-based scroll choreography and pinned sections.
- **GSAP + ScrollTrigger**: The industry standard for complex timeline sequencing, SVG drawing, and deeply integrated scroll-based animations (pinning, horizontal scroll).
- **GSAP ScrollSmoother vs Lenis**: Lenis is already installed, open-source, highly performant, and integrates well with both GSAP and Framer Motion. 

### 3D / WebGL & Visual Effects
- **Three.js + React Three Fiber (R3F) + Drei**: The standard for declarative WebGL in React. 
- **Curtains.js / OGL**: Lighter weight WebGL libraries, but lack the rich React ecosystem of R3F.
- **CSS Shaders / Canvas API**: Native but requires massive boilerplate for basic distortion/fluid effects.

### UI Components & Primitives
- **shadcn/ui / Radix UI**: High-quality headless components. Perfect for complex accessible interactions (Dialogs for projects, Tooltips for skills).
- **Aceternity UI / Magic UI**: Copy-paste premium components (spotlight, magnetic buttons, text reveals). High visual impact.

### Typography
- **SplitType**: Excellent for splitting text into chars/words/lines for advanced GSAP sequencing (fixes issues with nested DOM nodes that Framer's word-by-word reveal struggles with).

## 3. Final Stack & Purpose

| Library / Tool | Primary Purpose | Justification |
| --- | --- | --- |
| **GSAP & ScrollTrigger** | Scroll choreography, timelines, pinning. | Will replace Framer Motion for scroll-linked animations. Enables horizontal scrolling in the Projects section and pinned storytelling in the About section. |
| **Framer Motion** | Micro-interactions, page transitions, layout jumps. | Kept for its unparalleled `layoutId` and `<AnimatePresence>` capabilities. |
| **Lenis** | Smooth scrolling infrastructure. | Will be synchronized with GSAP's ticker for perfectly synced scroll animations without jitter. |
| **React Three Fiber (R3F)** | Interactive 3D / Shader effects. | Will be used in the Hero section for an interactive WebGL background (e.g., fluid/distortion) and in the Projects section for image hover distortions. |
| **Radix UI Primitives** | Accessible complex UI elements. | Will be used for high-end, accessible project showcase modals and interactive tooltips. |
| **SplitType** | Cinematic typography reveals. | Required for the advanced, staggered text choreography requested for the Hero and section headers. |
| **clsx + tailwind-merge** | Dynamic class merging. | Necessary for building robust, reusable UI components inspired by Aceternity/shadcn. |
| **react-icons** | Brand icons. | Replaces the custom SVG brand icons with a maintained library for cleaner code. |

## 4. Performance Considerations
- **Bundle Size**: R3F and GSAP will add to the bundle size. To mitigate this, 3D components will be dynamically imported (`next/dynamic`) so they don't block the initial main thread paint. 
- **GPU Compositing**: All animations will prioritize `transform` and `opacity` to avoid layout thrashing. GSAP's `ScrollTrigger` will be configured to disable complex calculations on mobile if necessary.
- **WebGL Contexts**: Limited to a single canvas instance globally where possible, or strictly unmounted when out of view to preserve battery and memory.

## 5. Accessibility Considerations
- **prefers-reduced-motion**: Both GSAP and R3F components will hook into a global reduced-motion listener. If true, WebGL canvases will fallback to CSS gradients, and GSAP timelines will skip to their end states or use simple crossfades.
- **Radix UI**: Ensures that any complex interactions (modals, popovers) retain full keyboard navigation, focus trapping, and ARIA attributes, which custom Framer/GSAP implementations often miss.
