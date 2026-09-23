import type { SocialLink } from '@/types';

export const siteConfig = {
  name: 'Devansh Vats',
  title: 'Devansh Vats — Software Developer',
  description:
    'Second-year BCA student at Christ University, Delhi NCR. Building thoughtful software products with a focus on clean interfaces and robust code.',
  url: 'https://devanshvats.dev',
  email: 'vats.devansh18@gmail.com',
  github: 'vatsdevansh18',
  linkedin: 'devansh-vattsss',
  location: 'Delhi NCR, India',
  university: 'Christ University, Delhi NCR',
  degree: 'BCA — Bachelor of Computer Applications',
  yearOfStudy: '2nd Year',
  tagline: 'Building software that matters.',
  shortBio:
    'I design and build digital experiences — from clean user interfaces to backend systems. Currently studying BCA at Christ University while exploring the full spectrum of modern software development.',
  currentlyLearning: ['Next.js', 'TypeScript', 'System Design', 'Data Structures & Algorithms'],
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    url: `https://github.com/${siteConfig.github}`,
    icon: 'Github',
  },
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/${siteConfig.linkedin}/`,
    icon: 'Linkedin',
  },
  {
    label: 'Email',
    url: `mailto:${siteConfig.email}`,
    icon: 'Mail',
  },
];
