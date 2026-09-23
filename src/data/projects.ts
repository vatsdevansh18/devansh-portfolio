import type { Project } from '@/types';

export const projects: Project[] = [
  // ─── ADD YOUR REAL PROJECTS HERE ───────────────────────────────────────────
  // Each project is a self-contained object. Adding a new project never
  // requires touching the UI — just add an entry to this array.
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: 'project-placeholder-1',
    title: 'Your First Project',
    tagline: 'A short, punchy one-liner that hooks the reader.',
    description:
      'Replace this with a 2–3 paragraph description of what you built, why you built it, and what makes it interesting. Describe the technical challenges you solved and what you learned.',
    category: 'web',
    year: 2025,
    status: 'in-progress',
    featured: true,
    technologies: ['React', 'TypeScript', 'Node.js'],
    role: 'Solo Developer',
    problem:
      'Describe the real problem this project was trying to solve. What was the pain point? Who faced it?',
    approach:
      'Explain the technical approach you took. What architecture decisions did you make? What alternatives did you consider?',
    challenges: [
      'Describe a technical challenge you faced.',
      'Describe how you overcame it.',
    ],
    learnings: [
      'What you learned building this.',
      'What you would do differently.',
    ],
    githubUrl: 'https://github.com/vatsdevansh18',
    // liveUrl: 'https://your-project.vercel.app',
    // coverImage: '/images/projects/project-placeholder-1/cover.jpg',
  },
  {
    slug: 'project-placeholder-2',
    title: 'Your Second Project',
    tagline: 'Another compelling one-liner about what this solves.',
    description:
      'Replace this with your actual project description. Focus on what makes this project demonstrate your skills and thinking.',
    category: 'web',
    year: 2025,
    status: 'completed',
    featured: false,
    technologies: ['Python', 'HTML', 'CSS', 'JavaScript'],
    role: 'Solo Developer',
    problem: 'What problem does this project solve?',
    approach: 'What was your technical approach?',
    challenges: ['A challenge you faced and overcame.'],
    learnings: ['A key lesson from this project.'],
    githubUrl: 'https://github.com/vatsdevansh18',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}
