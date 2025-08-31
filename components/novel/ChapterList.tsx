import Link from 'next/link'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowDown, ArrowUp } from "lucide-react"

interface Chapter {
  slug: string
  title: string
  number: number
  date: string
  wordCount?: number
  published: boolean
}

interface ChapterListProps {
  chapters: Chapter[]
  // Props optionnelles pour la fonctionnalité de tri
  showSortButton?: boolean
  reverseOrder?: boolean
  onToggleOrder?: () => void
  // Props optionnelles pour personnaliser l'affichage
  title?: string
  description?: string
  maxWidth?: string
  showFooter?: boolean
  limitChapters?: number
}

export default function ChapterList({ 
  chapters, 
  showSortButton = false,
  reverseOrder = false,
  onToggleOrder,
  title = "Liste des Chapitres",
  description,
  maxWidth = "max-w-6xl",
  limitChapters
}: ChapterListProps) {
  
  // Sort chapters if needed
  const sortedChapters = reverseOrder 
    ? [...chapters].reverse() 
    : chapters
  
  // Limit chapters if specified
  const displayedChapters = limitChapters 
    ? sortedChapters.slice(0, limitChapters)
    : sortedChapters
  
  // Auto-generate description if not provided
  const finalDescription = description || 
    `${chapters.length} chapitre${chapters.length > 1 ? 's' : ''} disponible${chapters.length > 1 ? 's' : ''}${
      reverseOrder ? ' (du plus récent au plus ancien)' : ''
    }`
  
  return (
    <div className={`${maxWidth} mx-auto px-4 py-8`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {title}
          </h1>
          
          {/* Sort button only if enabled */}
          {showSortButton && onToggleOrder && (
            <Button variant="outline" onClick={onToggleOrder} className="flex items-center gap-2">
              {reverseOrder ? (
                <>
                  <ArrowDown className="h-4 w-4" />
                  forward
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4" />
                  reverse
                </>
              )}
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          {finalDescription}
        </p>
      </div>

      {/* Chapters Grid */}
      {displayedChapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {displayedChapters.map((chapter) => (
            <div key={chapter.slug} className="w-full">
              <Link href={`/novel/${chapter.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer w-full">
                  <CardHeader className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="text-base mb-1 sm:mb-0">
                        {chapter.title}
                      </CardTitle>
                      <span className="text-sm text-muted-foreground sm:ml-4">
                        {new Date(chapter.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <Card>
          <CardHeader className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun chapitre disponible</h3>
            <p className="text-muted-foreground text-center">
              Les chapitres apparaîtront ici une fois publiés.
            </p>
          </CardHeader>
        </Card>
      )}
      
      {/* Show more button if chapters are limited */}
      {limitChapters && chapters.length > limitChapters && (
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/novel">
              Plus de chapitres ({chapters.length - limitChapters} restants)
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}