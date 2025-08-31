// app/sitemap.ts - Génération automatique du sitemap
import { getAllChapters } from '@/lib/chapters'
import { siteConfig } from '@/config/site'

export default function sitemap() {
  const chapters = getAllChapters()
  
  const routes = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/novel`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  const chapterRoutes = chapters.map((chapter) => ({
    url: `${siteConfig.url}/novel/${chapter.slug}`,
    lastModified: new Date(chapter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...routes, ...chapterRoutes]
}