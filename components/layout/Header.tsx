// components/layout/Header.tsx
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo/Site name */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-lg sm:text-xl font-bold">
              {siteConfig.title}
            </span>
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}