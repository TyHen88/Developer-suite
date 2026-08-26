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
              className="group relative p-6 paper-card spotlight-card cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">
                    {category.resources} resources
                  </p>
                </div>
                <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
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
