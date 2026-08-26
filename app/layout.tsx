import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { AuthSync } from "@/components/AuthSync"
import { PaperMouseEffect } from "@/components/PaperMouseEffect"
import { InteractiveCanvasGrid } from "@/components/InteractiveCanvasGrid"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Bayon Developer | Modern Developer Infrastructure & UI Ecosystem',
  description: 'High-performance components, starters, and templates built for modern engineers.',
  generator: 'bayondeveloper.io',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    apple: '/favicon.png',
  },
}

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <InteractiveCanvasGrid />
            <PaperMouseEffect />
            {children}
            <AuthSync />
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
