import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
