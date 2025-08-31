import { siteConfig } from '@/config/site'

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  publishedTime,
  modifiedTime,
  type = 'website'
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  type?: 'website' | 'article'
}) {
  const url = `${siteConfig.url}${path}`
  const siteName = siteConfig.name
  
  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.novel.translator }],
    creator: siteConfig.novel.translator,
    publisher: siteConfig.novel.translator,
    
    // Open Graph
    openGraph: {
      type,
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || siteConfig.ogImage],
      creator: '@votre_twitter', // Ajoutez votre Twitter
    },
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
  }
}