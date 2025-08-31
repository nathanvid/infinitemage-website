// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getAllChapters, getFirstChapter, getLatestChapter } from '@/lib/chapters'
import ChapterList from '@/components/novel/ChapterList'
import { siteConfig } from '@/config/site'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Calendar } from "lucide-react"
import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: '/',
  type: 'website'
})

// Ajout du JSON-LD pour la page d'accueil
function generateHomeJsonLd(chapters: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: siteConfig.novel.title,
    alternateName: siteConfig.novel.originalTitle,
    author: {
      '@type': 'Person',
      name: siteConfig.novel.author,
    },
    translator: {
      '@type': 'Person',
      name: siteConfig.novel.translator,
    },
    genre: siteConfig.novel.genre,
    description: siteConfig.novel.synopsis,
    image: siteConfig.novel.coverImage,
    url: siteConfig.url,
    inLanguage: 'fr-FR',
    originalLanguage: 'en-US', // Ajustez selon l'original
    numberOfPages: chapters.length,
    datePublished: siteConfig.novel.startDate,
    publisher: {
      '@type': 'Person',
      name: siteConfig.novel.translator,
    },
  }
}

export default function HomePage() {
  const chapters = getAllChapters()
  const firstChapter = getFirstChapter()
  const latestChapter = getLatestChapter()
  const displayedChapters = chapters.slice(0, 20)

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHomeJsonLd(chapters)),
        }}
      />
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Novel Cover */}
          <div>
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <Image
                src={siteConfig.novel.coverImage}
                alt={`Couverture de ${siteConfig.novel.title}`}
                fill
                className="object-cover rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Novel Info */}
          <div>
            <div className="space-y-6">
              {/* Status Badge */}
              <Badge variant="secondary" className="text-sm">
                {siteConfig.novel.status}
              </Badge>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {siteConfig.novel.title}
                </h1>
                {siteConfig.novel.originalTitle && (
                  <p className="text-xl text-muted-foreground">
                    {siteConfig.novel.originalTitle}
                  </p>
                )}
              </div>

              {/* Author & Translator */}
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="font-medium">Author :</span> {siteConfig.novel.author}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Translator :</span> {siteConfig.novel.translator}
                </p>
              </div>

              {/* Synopsis */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {siteConfig.novel.synopsis}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {firstChapter && (
                  <Button asChild size="lg" className="flex-1">
                    <Link href={`/novel/${firstChapter.slug}`}>
                      <BookOpen className="h-5 w-5 mr-2" />
                      First chapter
                    </Link>
                  </Button>
                )}
                
                {latestChapter && (
                  <Button asChild variant="outline" size="lg" className="flex-1">
                    <Link href={`/novel/${latestChapter.slug}`}>
                      <Clock className="h-5 w-5 mr-2" />
                      Latest chapter
                    </Link>
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {chapters.length} Chapter{chapters.length > 1 ? 's' : ''}
                </div>
                {latestChapter && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Last update: {new Date(latestChapter.date).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator/>

      {/* Chapters List Section */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <ChapterList 
        chapters={chapters}
        title="Latest chapters available"
        description="The most recent chapters that have been translated and are available to read."
        limitChapters={20}
        reverseOrder={true}
        showFooter={false} // Footer géré par la page parent
      />
      </section>
      {/* More Chapters Button */}
        {chapters.length > 1 && (
          <div className="text-center mb-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/novel">
                View all chapters
              </Link>
            </Button>
          </div>
        )}
    </div>
  )
}