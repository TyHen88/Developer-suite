'use client'

import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

interface SearchAndFilterProps {
  activeTab: 'all' | 'components' | 'templates' | 'starters'
  setActiveTab: (tab: 'all' | 'components' | 'templates' | 'starters') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchAndFilter({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: SearchAndFilterProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const tabs = [
    { id: 'all', label: 'All Resources', count: 248 },
    { id: 'components', label: 'Components', count: 120 },
    { id: 'templates', label: 'Templates', count: 64 },
    { id: 'starters', label: 'Starters', count: 32 },
  ]

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search resources, templates, starters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Tabs and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
          >
            <Filter size={18} />
            Advanced Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Use Cases</h4>
                <div className="space-y-2">
                  {['AI', 'Ecommerce', 'SaaS', 'Blog', 'Dashboard', 'Mobile', 'Authentication', 'Real-time'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer text-sm hover:text-foreground transition-colors">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Frontend</h4>
                <div className="space-y-2">
                  {['React', 'Next.js', 'Vue.js', 'Svelte', 'Tailwind CSS', 'shadcn/ui'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer text-sm hover:text-foreground transition-colors">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Backend</h4>
                <div className="space-y-2">
                  {['Node.js', 'Express', 'Spring Boot', 'Python', 'Java', 'Go'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer text-sm hover:text-foreground transition-colors">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Database</h4>
                <div className="space-y-2">
                  {['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'Prisma'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer text-sm hover:text-foreground transition-colors">
                      <input type="checkbox" className="rounded" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
