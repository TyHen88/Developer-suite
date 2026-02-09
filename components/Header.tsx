import Link from 'next/link'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-lg">
              DevSuite
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/components" className="text-sm hover:text-primary transition-colors">
                Components
              </Link>
              <Link href="/templates" className="text-sm hover:text-primary transition-colors">
                Templates
              </Link>
              <Link href="/starters" className="text-sm hover:text-primary transition-colors">
                Starters
              </Link>
              <Link href="/docs" className="text-sm hover:text-primary transition-colors">
                Docs
              </Link>
              <Link href="/showcase" className="text-sm hover:text-primary transition-colors">
                Showcase
              </Link>
              <Link href="/pricing" className="text-sm hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/examples" className="text-sm hover:text-primary transition-colors">
                Examples
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* <button className="hidden sm:inline-flex h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Sign In
            </button> */}
            <button className="md:hidden p-2 hover:bg-accent transition-colors rounded-md">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
