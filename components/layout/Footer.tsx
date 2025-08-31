// components/layout/Footer.tsx
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { MessageCircle, Coffee, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-8 sm:mt-2">
      <div className="max-w-6xl mx-auto px-4 py-2">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Site Info */}
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              Translation of {siteConfig.novel.originalTitle || siteConfig.novel.title}
            </p>
            <p className="text-xs text-muted-foreground">
              By {siteConfig.novel.translator}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-end gap-4">
            <h4 className="text-sm font-semibold">Follow us</h4>
            <div className="flex flex-wrap gap-2">
              
              {siteConfig.links.discord && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discord
                  </Link>
                </Button>
              )}
              
              {siteConfig.links.kofi && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={siteConfig.links.kofi} target="_blank" rel="noopener noreferrer">
                    <Coffee className="h-4 w-4 mr-2" />
                    Ko-fi
                  </Link>
                </Button>
              )}
              
              {siteConfig.links.email && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`mailto:${siteConfig.links.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          
          <div className="flex gap-4 text-xs text-muted-foreground">
            {siteConfig.links.originalSource && (
              <Link 
                href={siteConfig.links.originalSource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Source originale
              </Link>
            )}
            <span>•</span>
            <span>Non official translation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}