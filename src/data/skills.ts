import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', level: 'comfortable' },
      { name: 'Python', level: 'comfortable' },
      { name: 'Java', level: 'comfortable' },
      { name: 'TypeScript', level: 'learning' },
      { name: 'HTML', level: 'proficient' },
      { name: 'CSS', level: 'proficient' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', level: 'comfortable' },
      { name: 'Next.js', level: 'learning' },
      { name: 'Tailwind CSS', level: 'comfortable' },
      { name: 'Responsive Design', level: 'comfortable' },
    ],
  },
  {
    label: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 'learning' },
      { name: 'REST APIs', level: 'learning' },
      { name: 'SQL', level: 'learning' },
    ],
  },
  {
    label: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 'comfortable' },
      { name: 'GitHub', level: 'comfortable' },
      { name: 'VS Code', level: 'proficient' },
      { name: 'Linux (basics)', level: 'learning' },
      { name: 'Figma (basics)', level: 'learning' },
    ],
  },
  {
    label: 'Concepts',
    skills: [
      { name: 'Data Structures', level: 'learning' },
      { name: 'Algorithms', level: 'learning' },
      { name: 'OOP', level: 'comfortable' },
      { name: 'Version Control', level: 'comfortable' },
    ],
  },
];
