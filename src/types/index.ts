export type ProjectCategory = 'web' | 'mobile' | 'cli' | 'library' | 'experiment';
export type ProjectStatus = 'completed' | 'in-progress' | 'archived';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  role: string;
  problem?: string;
  approach?: string;
  challenges?: string[];
  learnings?: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  gallery?: string[];
}

export interface SkillGroup {
  label: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'learning' | 'comfortable' | 'proficient';
}

export interface Experience {
  organization: string;
  role: string;
  type: 'internship' | 'part-time' | 'freelance' | 'volunteer' | 'academic';
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  certificateUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  certificateImage?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startYear: number;
  endYear: number;
  description?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
