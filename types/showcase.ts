export type ProjectCategory = 'SaaS' | 'Dashboard' | 'E-commerce' | 'Portfolio' | 'Internal Tool'

export interface ShowcaseProject {
  id: string
  name: string
  description: string
  category: ProjectCategory
  tags: string[]
  screenshotUrl: string
  author: {
    name: string
    avatarUrl: string
  }
  stats: {
    views: number
    likes: number
  }
  links: {
    live: string
    repo?: string
  }
  complexity: 'Low' | 'Medium' | 'High'
  createdAt: string
}
