import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChapterNavigation from "./ChapterNavigation"

interface NavigationChapter {
  slug: string
  title: string
}

interface ChapterReaderProps {
  slug: string
  frontmatter: {
    title: string
    number: number
    date: string
    wordCount?: number
  }
  content: string // HTML content
  navigation?: {
    prev: NavigationChapter | null
    next: NavigationChapter | null
  }
}

export default function ChapterReader({ frontmatter, content, navigation }: ChapterReaderProps) {
  return (
    <>
      {/* Navigation Top */}
      {navigation && (
        <ChapterNavigation 
          prev={navigation.prev} 
          next={navigation.next} 
        />
      )}

      <div className="w-full">
        {/* Chapter Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Card className="mb-6 sm:mb-8">
            <CardHeader className="px-4 sm:px-6 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl mt-3 sm:mt-4 leading-tight">
                    {frontmatter.title}
                </CardTitle>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(frontmatter.date).toLocaleDateString('fr-FR')}
                </span>
              </div>

            </CardHeader>
          </Card>
        </div>

        {/* Chapter Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <Card>
            <CardContent className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none 
                           dark:prose-invert
                           prose-headings:text-foreground prose-headings:font-semibold
                           prose-h1:text-xl sm:prose-h1:text-2xl lg:prose-h1:text-3xl
                           prose-h2:text-lg sm:prose-h2:text-xl lg:prose-h2:text-2xl
                           prose-h3:text-base sm:prose-h3:text-lg lg:prose-h3:text-xl
                           prose-p:text-foreground prose-p:leading-relaxed sm:prose-p:leading-loose
                           prose-p:mb-4 sm:prose-p:mb-6
                           prose-strong:text-foreground prose-strong:font-semibold
                           prose-em:text-foreground prose-em:italic
                           prose-blockquote:text-muted-foreground prose-blockquote:border-l-border
                           prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded
                           prose-hr:border-border prose-hr:my-6 sm:prose-hr:my-8
                           [&>p]:mb-4 sm:[&>p]:mb-6
                           [&>p+p]:mt-4 sm:[&>p+p]:mt-6
                           leading-relaxed sm:leading-loose"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Bottom */}
      {navigation && (
        <ChapterNavigation 
          prev={navigation.prev} 
          next={navigation.next} 
        />
      )}
    </>
  )
}