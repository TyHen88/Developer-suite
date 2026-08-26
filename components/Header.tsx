"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SignInButton, UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'

export default function Header() {
  const { user } = useUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Components', href: '/components' },
    { label: 'Templates', href: '/templates' },
    { label: 'Starters', href: '/starters' },
    { label: 'Docs', href: '/docs' },
    { label: 'Showcase', href: '/showcase' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Examples', href: '/examples' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-white text-base">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight leading-none text-foreground flex items-center gap-1">
                  Bayon <span className="text-cyan-400 font-semibold">Developer</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Infrastructure</span>
              </div>
            </Link>
            <nav className="hidden md:flex gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-cyan-400 hover:bg-primary/20 transition-colors hidden sm:block"
                >
                  Admin Console
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent transition-colors rounded-xl border border-white/[0.08]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-background/95 backdrop-blur-2xl px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-muted-foreground hover:text-cyan-400 py-1.5"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-cyan-400 py-1.5"
            >
              Admin Console
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
