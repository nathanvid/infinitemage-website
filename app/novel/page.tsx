import { getAllChapters } from '@/lib/chapters'
import ChapterListWithSort from '@/components/novel/ChapterListWithSort'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site'

export const metadata = generatePageMetadata({
  title: 'All Chapters',
  description: `All chapters of ${siteConfig.novel.title}. Novel translated by ${siteConfig.novel.translator}.`,
  path: '/novel'
})

export default function NovelPage() {
  const chapters = getAllChapters()
  
  return (
    <main>
      <ChapterListWithSort chapters={chapters} />
    </main>
  )
}