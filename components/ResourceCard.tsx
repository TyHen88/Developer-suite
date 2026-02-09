import { ArrowUpRight, ExternalLink } from 'lucide-react'

interface ResourceCardProps {
  resource: {
    id: number
    title: string
    description: string
    category: string
    stack: string[]
    tags: string[]
    badge?: string | null
  }
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const categoryColors: Record<string, string> = {
    components: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    templates: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    starters: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  }

  const badgeColors: Record<string, string> = {
    Popular: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    Official: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    Featured: 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
  }

  return (
    <div className="group relative flex flex-col h-full p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/10">
      {/* Badge */}
      {resource.badge && (
        <div className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${badgeColors[resource.badge]}`}>
          {resource.badge}
        </div>
      )}

      {/* Category Badge */}
      <div className={`inline-flex w-fit text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[resource.category]}`}>
        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
        {resource.description}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {resource.stack.slice(0, 2).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground font-medium"
          >
            {tech}
          </span>
        ))}
        {resource.stack.length > 2 && (
          <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground font-medium">
            +{resource.stack.length - 2}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-6">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground">
            {tag}
            {resource.tags.indexOf(tag) < resource.tags.length - 1 && ' •'}
          </span>
        ))}
      </div>

      {/* View Template Link */}
      <button className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
        View Template
        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  )
}
