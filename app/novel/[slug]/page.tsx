// app/novel/[slug]/page.tsx
import { getChapterWithNavigation, getAllChapters } from '@/lib/chapters'
import ChapterReader from '@/components/novel/ChapterReader'
import { notFound } from 'next/navigation'
import { extractExcerpt } from '@/lib/markdown'
import { parseChapter } from '@/lib/chapters'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: ChapterPageProps) {
  const { slug } = await params
  
  try {
    const chapter = await getChapterWithNavigation(slug)
    
    // Extrait un résumé du chapitre pour la description
    const { content } = parseChapter(slug) // Contenu markdown brut
    const excerpt = extractExcerpt(content)
    
    return generatePageMetadata({
      title: chapter.frontmatter.title,
      description: excerpt || `Chapter ${chapter.frontmatter.number} - ${chapter.frontmatter.title}`,
      path: `/novel/${slug}`,
      publishedTime: chapter.frontmatter.date,
      type: 'article'
    })
  } catch {
    return generatePageMetadata({
      title: 'Chapter Not Found',
      description: 'The chapter you are looking for does not exist or has not been translated yet. ',
      noIndex: true
    })
  }
}


interface ChapterPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params

  try {
    // Get the chapter data with navigation
    const chapter = await getChapterWithNavigation(slug)
    
    return (
      <main>
        <ChapterReader 
          slug={chapter.slug}
          frontmatter={{
            title: chapter.frontmatter.title,
            number: chapter.frontmatter.number,
            date: chapter.frontmatter.date,
          }}
          content={chapter.content}
          navigation={chapter.navigation}
        />
      </main>
    )
  } catch {
    // If chapter doesn't exist, show 404
    notFound()
  }
}

// Generate static paths for all chapters at build time
export async function generateStaticParams() {
  const chapters = getAllChapters()
  
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }))
}