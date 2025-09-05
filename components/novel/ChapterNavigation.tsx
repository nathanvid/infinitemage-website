import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, List } from "lucide-react"

interface NavigationChapter {
  slug: string
  title: string
}

interface ChapterNavigationProps {
  prev: NavigationChapter | null
  next: NavigationChapter | null
}

export default function ChapterNavigation({ prev, next }: ChapterNavigationProps) {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:py-6 lg:py-8">
        <Card>
          <CardContent className="px-4 sm:p-6">
            {/* Grid 3 colonnes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
              
              {/* Colonne 1: Previous Chapter */}
              <div className="flex justify-start">
                {prev ? (
                  <Button variant="outline" asChild className="h-auto">
                    <Link href={`/novel/${prev.slug}`} className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3">
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <div className="text-left min-w-0 hidden sm:block">
                        <div className="text-xs text-muted-foreground">Previous</div>
                        <div className="truncate font-medium text-sm">{prev.title}</div>
                      </div>
                      {/* Texte mobile uniquement */}
                      <span className="text-xs sm:hidden">Prev.</span>
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="h-auto p-2 sm:p-3 opacity-50">
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <div className="text-left ml-1 sm:ml-2 hidden sm:block">
                      <div className="text-xs">Previous</div>
                      <div className="text-sm">None</div>
                    </div>
                    <span className="text-xs sm:hidden ml-1">Prev.</span>
                  </Button>
                )}
              </div>

              {/* Colonne 2: Back to Chapter List (centré) */}
              <div className="flex justify-center">
                <Button variant="ghost" asChild>
                  <Link href="/novel" className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3">
                    <List className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm">List</span>
                  </Link>
                </Button>
              </div>

              {/* Colonne 3: Next Chapter */}
              <div className="flex justify-end">
                {next ? (
                  <Button variant="outline" asChild className="h-auto">
                    <Link href={`/novel/${next.slug}`} className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3">
                      {/* Texte mobile uniquement */}
                      <span className="text-xs sm:hidden">Next.</span>
                      <div className="text-right min-w-0 hidden sm:block">
                        <div className="text-xs text-muted-foreground">Next</div>
                        <div className="truncate font-medium text-sm">{next.title}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="h-auto p-2 sm:p-3 opacity-50">
                    <span className="text-xs sm:hidden mr-1">Next.</span>
                    <div className="text-right mr-1 sm:mr-2 hidden sm:block">
                      <div className="text-xs">Next</div>
                      <div className="text-sm">None</div>
                    </div>
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}