
'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { siteConfig } from '@/config/site'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!siteConfig.analytics?.googleAnalyticsId) return

    const url = pathname + searchParams.toString()
    
    // Track page views
    window.gtag('config', siteConfig.analytics.googleAnalyticsId, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}

export default function Analytics() {
  if (!siteConfig.analytics?.googleAnalyticsId) {
    return null
  }

  return (
    <>
      {/* Google Analytics Scripts */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Tracking wrapped in Suspense */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  )
}