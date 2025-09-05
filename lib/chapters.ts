import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from './markdown'

// Directory where chapters are stored
const CHAPTERS_DIR = path.join(process.cwd(), 'content', 'chapters')

/**
 * Reads the raw content of a chapter file
 * @param slug - filename without extension (e.g., "chapitre-001")
 * @returns The complete Markdown file content
 */
export function getChapterFileContent(slug: string): string {
  // Build the full path to the file
  const filePath = path.join(CHAPTERS_DIR, `${slug}.md`)
  
  // Read the file and return its content
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  
  return fileContent
}

/**
 * Parses a chapter file and separates frontmatter from content
 * @param slug - filename without extension (e.g., "chapitre-001") 
 * @returns Object with data (frontmatter) and content (markdown)
 */
export function parseChapter(slug: string) {
  // Get the raw file content
  const fileContent = getChapterFileContent(slug)
  
  // Parse frontmatter and content
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    frontmatter: data,
    content: content.trim()
  }
}

/**
 * Gets a complete chapter with HTML content and navigation info
 * @param slug - filename without extension (e.g., "chapitre-001")
 * @returns Promise<object> - Chapter with frontmatter, HTML content, and navigation
 */
export async function getChapterWithNavigation(slug: string) {
  // Parse the raw chapter
  const { frontmatter, content } = parseChapter(slug)
  
  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(content)
  
  // Get all chapters for navigation
  const allChapters = getAllChapters()
  const currentIndex = allChapters.findIndex(chapter => chapter.slug === slug)
  
  // Find previous and next chapters
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null
  
  return {
    slug,
    frontmatter,
    content: htmlContent,
    navigation: {
      prev: prevChapter ? {
        slug: prevChapter.slug,
        title: prevChapter.title
      } : null,
      next: nextChapter ? {
        slug: nextChapter.slug,
        title: nextChapter.title
      } : null
    }
  }
}

/**
 * Gets metadata for all available chapters
 * @returns Array of chapter metadata sorted by number
 */
export function getAllChapters() {
  // Read all files in chapters directory
  const files = fs.readdirSync(CHAPTERS_DIR)
  
  // Filter only .md files and get their metadata
  const chapters = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '')
      const { frontmatter } = parseChapter(slug)
      
      return {
        slug,
        title: frontmatter.title,
        number: frontmatter.number,
        date: frontmatter.date,
        wordCount: frontmatter.wordCount,
        published: frontmatter.published !== false // Default to true if not specified
      }
    })
    // Filter only published chapters and sort by number
    .filter(chapter => chapter.published)
    .sort((a, b) => a.number - b.number)
  
  return chapters
}

// Test the complete function
// getChapter('chapitre-001').then(chapter => {
//   console.log('Chapter title:', chapter.frontmatter.title)
//   console.log('HTML content:', chapter.content)
// })

/**
 * Gets the first published chapter
 * @returns First chapter or null if none exists
 */
export function getFirstChapter() {
  const chapters = getAllChapters()
  return chapters.length > 0 ? chapters[0] : null
}

/**
 * Gets the latest published chapter
 * @returns Latest chapter or null if none exists
 */
export function getLatestChapter() {
  const chapters = getAllChapters()
  return chapters.length > 0 ? chapters[chapters.length - 1] : null
}