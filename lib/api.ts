import { 
  MOCK_COMPONENTS, 
  MOCK_TEMPLATES,
  MOCK_STARTERS,
  type UIComponent, 
  type UITemplate,
  type UIStarter,
  type ComponentCategory,
  type TemplateCategory,
  type TemplateType,
  type StarterCategory
} from "./constants"

/**
 * API Service for DevSuite
 * Currently uses MOCK_DATA to simulate backend responses.
 * All methods are async to allow for easy replacement with actual fetch calls.
 */

const SIMULATED_DELAY = 100 // ms

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const apiService = {
  // --- Component Gallery APIs ---

  async getComponents(params?: {
    query?: string
    category?: ComponentCategory | 'all'
  }): Promise<UIComponent[]> {
    await sleep(SIMULATED_DELAY)
    
    let result = [...MOCK_COMPONENTS]

    if (params?.category && params.category !== 'all') {
      result = result.filter(c => c.category === params.category)
    }

    if (params?.query) {
      const q = params.query.toLowerCase()
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q)
      )
    }

    return result
  },

  async getComponentById(id: string): Promise<UIComponent | undefined> {
    await sleep(SIMULATED_DELAY)
    return MOCK_COMPONENTS.find(c => c.id === id)
  },

  // --- Template Gallery APIs ---

  async getTemplates(params?: {
    query?: string
    category?: TemplateCategory | 'all'
    type?: TemplateType | 'all'
    sortBy?: 'popular' | 'newest' | 'complexity'
  }): Promise<UITemplate[]> {
    await sleep(SIMULATED_DELAY)

    let result = [...MOCK_TEMPLATES]

    if (params?.category && params.category !== 'all') {
      result = result.filter(t => t.category === params.category)
    }

    if (params?.type && params.type !== 'all') {
      result = result.filter(t => t.type === params.type)
    }

    if (params?.query) {
      const q = params.query.toLowerCase()
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      )
    }

    if (params?.sortBy) {
      result = result.sort((a: UITemplate, b: UITemplate) => {
        if (params.sortBy === "popular") return b.popularity - a.popularity
        if (params.sortBy === "newest") return b.id.localeCompare(a.id)
        if (params.sortBy === "complexity") {
          const complexMap: Record<string, number> = { High: 3, Medium: 2, Low: 1 }
          return complexMap[b.complexity] - complexMap[a.complexity]
        }
        return 0
      })
    }

    return result
  },

  async getTemplateById(id: string): Promise<UITemplate | undefined> {
    await sleep(SIMULATED_DELAY)
    return MOCK_TEMPLATES.find((t: UITemplate) => t.id === id)
  },

  // --- Starter Gallery APIs ---

  async getStarters(params?: {
    query?: string
    category?: StarterCategory | 'all'
  }): Promise<UIStarter[]> {
    await sleep(SIMULATED_DELAY)

    let result = [...MOCK_STARTERS]

    if (params?.category && params.category !== 'all') {
      result = result.filter((s: UIStarter) => s.category === params.category)
    }

    if (params?.query) {
      const q = params.query.toLowerCase()
      result = result.filter((s: UIStarter) => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        s.stack.some((tech: string) => tech.toLowerCase().includes(q))
      )
    }

    return result
  },

  async getStarterBySlug(slug: string): Promise<UIStarter | undefined> {
    await sleep(SIMULATED_DELAY)
    return MOCK_STARTERS.find((s: UIStarter) => s.slug === slug)
  }
}
