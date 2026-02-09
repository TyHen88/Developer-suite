'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchAndFilter from '@/components/SearchAndFilter'
import ResourceGrid from '@/components/ResourceGrid'
import CategoryShowcase from '@/components/CategoryShowcase'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'components' | 'templates' | 'starters'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SearchAndFilter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ResourceGrid
        activeTab={activeTab}
        searchQuery={searchQuery}
      />
      <CategoryShowcase />
      <Footer />
    </main>
  )
}
