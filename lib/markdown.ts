import { remark } from 'remark'
import html from 'remark-html'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { 
      sanitize: false, // Permet les balises HTML personnalisées
      allowDangerousHtml: true 
    })
    .process(markdown)
    
  return result.toString()
}

// Extrait un résumé pour les meta descriptions
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Supprime le markdown et HTML
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Supprime les titres markdown
    .replace(/\*\*(.*?)\*\*/g, '$1') // Supprime le gras
    .replace(/\*(.*?)\*/g, '$1') // Supprime l'italique
    .replace(/<[^>]*>/g, '') // Supprime les balises HTML
    .replace(/\n\s*\n/g, ' ') // Remplace les sauts de ligne multiples
    .trim()
  
  if (plainText.length <= maxLength) return plainText
  
  // Coupe au dernier espace pour éviter de couper un mot
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return truncated.substring(0, lastSpace) + '...'
}