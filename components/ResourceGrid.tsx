'use client'

import { ArrowUpRight } from 'lucide-react'
import ResourceCard from './ResourceCard'

interface ResourceGridProps {
  activeTab: 'all' | 'components' | 'templates' | 'starters'
  searchQuery: string
}

const RESOURCES = [
  {
    id: 1,
    title: 'Stripe Subscriptions Starter',
    description: 'The all-in-one subscription starter kit for high-performance SaaS applications, powered by Stripe, Supabase, and Vercel.',
    category: 'starters',
    stack: ['Next.js', 'Stripe', 'Supabase', 'Prisma'],
    tags: ['SaaS', 'Payments', 'Authentication'],
    badge: 'Popular',
  },
  {
    id: 2,
    title: 'Next.js Boilerplate',
    description: 'A Next.js App Router template configured with cookie-based auth using Supabase, TypeScript and Tailwind CSS.',
    category: 'templates',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    tags: ['Auth', 'Starter', 'Full-Stack'],
    badge: 'Official',
  },
  {
    id: 3,
    title: 'AI Chatbot',
    description: 'An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Supabase.',
    category: 'templates',
    stack: ['Next.js', 'AI SDK', 'OpenAI', 'Supabase'],
    tags: ['AI', 'Chatbot', 'LLM'],
    badge: 'Featured',
  },
  {
    id: 4,
    title: 'LangChain + Next.js Starter',
    description: 'Starter template and example use-cases for LangChain projects in Next.js, including chat, agents, and retrieval.',
    category: 'starters',
    stack: ['Next.js', 'LangChain', 'PostgreSQL', 'TypeScript'],
    tags: ['AI', 'LLM', 'Backend'],
    badge: null,
  },
  {
    id: 5,
    title: 'Flutter User Management',
    description: 'Get started with Supabase and Flutter by building a user management app with auth, file storage, and database.',
    category: 'templates',
    stack: ['Flutter', 'Supabase', 'Dart', 'PostgreSQL'],
    tags: ['Mobile', 'Auth', 'Database'],
    badge: null,
  },
  {
    id: 6,
    title: 'Expo React Native Starter',
    description: 'An extended version of create-t3-turbo implementing authentication on both the web and mobile applications.',
    category: 'starters',
    stack: ['React Native', 'Expo', 'TypeScript', 'Turbo'],
    tags: ['Mobile', 'Cross-Platform', 'Auth'],
    badge: null,
  },
  {
    id: 7,
    title: 'Admin Dashboard Template',
    description: 'A comprehensive admin dashboard with Tailwind CSS, PostgreSQL, and Auth.js setup for managing applications.',
    category: 'templates',
    stack: ['Next.js', 'React', 'Prisma', 'PostgreSQL'],
    tags: ['Dashboard', 'Admin', 'CMS'],
    badge: 'Popular',
  },
  {
    id: 8,
    title: 'E-commerce UI Components',
    description: 'A collection of reusable e-commerce UI components built with React and Tailwind CSS for building storefronts.',
    category: 'components',
    stack: ['React', 'Tailwind CSS', 'TypeScript'],
    tags: ['Ecommerce', 'Components', 'UI'],
    badge: null,
  },
]

export default function ResourceGrid({ activeTab, searchQuery }: ResourceGridProps) {
  const filtered = RESOURCES.filter((resource) => {
    const matchesTab = activeTab === 'all' || resource.category === activeTab
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No resources found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
