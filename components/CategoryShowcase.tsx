import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    title: 'React & Next.js',
    description: 'Modern React patterns with Next.js 14+, Server Components, and App Router',
    resources: 156,
  },
  {
    title: 'Database & ORM',
    description: 'PostgreSQL, MySQL with Prisma, Drizzle, and database migrations',
    resources: 84,
  },
  {
    title: 'Authentication',
    description: 'Clerk, Auth.js, Supabase Auth, and secure session management',
    resources: 62,
  },
  {
    title: 'AI & Machine Learning',
    description: 'LangChain, OpenAI API, Vercel AI SDK, and ML integrations',
    resources: 48,
  },
  {
    title: 'Styling & UI',
    description: 'Tailwind CSS, shadcn/ui, and accessible component libraries',
    resources: 71,
  },
  {
    title: 'Backend & API',
    description: 'Node.js, Express, Spring Boot, and serverless functions',
    resources: 93,
  },
]

export default function CategoryShowcase() {
  return (
    <section className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore resources organized by technology and use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-lg border border-border bg-background hover:border-primary/50 transition-all duration-200 cursor-pointer hover:shadow-lg dark:hover:shadow-primary/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.resources} resources
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
