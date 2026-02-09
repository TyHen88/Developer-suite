import { type ShowcaseProject } from "@/types/showcase"

// MOCK_DATA comment: This array simulates a database collection of showcase projects.
export const mockProjects: ShowcaseProject[] = [
  {
    id: "1",
    name: "Linear Clone",
    description: "A high-performance task management system with real-time sync and nested sub-issues.",
    category: "SaaS",
    tags: ["Real-time", "Dashboard", "Pro"],
    screenshotUrl: "/showcase/linear.jpg",
    author: { name: "Alex Rivera", avatarUrl: "https://i.pravatar.cc/150?u=alex" },
    stats: { views: 12400, likes: 850 },
    links: { live: "https://linear-clone.devsuite.app", repo: "https://github.com/alex/linear" },
    complexity: "High",
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Crypto Pulse",
    description: "Real-time cryptocurrency analytics dashboard with advanced charting and news feeds.",
    category: "Dashboard",
    tags: ["Web3", "Charts", "Real-time"],
    screenshotUrl: "/showcase/crypto.jpg",
    author: { name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
    stats: { views: 8200, likes: 620 },
    links: { live: "https://pulse.crypto.app" },
    complexity: "Medium",
    createdAt: "2024-02-10T00:00:00Z"
  },
  {
    id: "3",
    name: "Minimalist Store",
    description: "A clean, headless e-commerce experience using Stripe and DevSuite primitives.",
    category: "E-commerce",
    tags: ["Stripe", "Auth", "Headless"],
    screenshotUrl: "/showcase/store.jpg",
    author: { name: "Jordan Smith", avatarUrl: "https://i.pravatar.cc/150?u=jordan" },
    stats: { views: 5400, likes: 410 },
    links: { live: "https://store.minimal.app", repo: "https://github.com/jordan/store" },
    complexity: "Medium",
    createdAt: "2024-03-05T00:00:00Z"
  },
  {
    id: "4",
    name: "AI Content Engine",
    description: "Multi-modal AI generator for blogs, social media, and long-form technical writing.",
    category: "SaaS",
    tags: ["AI", "OpenAI", "Editor"],
    screenshotUrl: "/showcase/ai-engine.jpg",
    author: { name: "Chen Wei", avatarUrl: "https://i.pravatar.cc/150?u=chen" },
    stats: { views: 15600, likes: 980 },
    links: { live: "https://ai-gen.devsuite.app" },
    complexity: "High",
    createdAt: "2024-03-12T00:00:00Z"
  },
  {
    id: "5",
    name: "Flow Builder",
    description: "Visual logic builder for automation workflows with custom node support.",
    category: "Internal Tool",
    tags: ["No-code", "React Flow", "Tooling"],
    screenshotUrl: "/showcase/flow.jpg",
    author: { name: "Maya Patel", avatarUrl: "https://i.pravatar.cc/150?u=maya" },
    stats: { views: 7800, likes: 540 },
    links: { live: "https://flow.devsuite.app", repo: "https://github.com/devsuite/flow" },
    complexity: "High",
    createdAt: "2024-03-20T00:00:00Z"
  }
]

// MOCK_DATA comment: Simulated API call to find a project by ID.
export function getMockProjectById(id: string): ShowcaseProject | undefined {
  return mockProjects.find(p => p.id === id)
}

// MOCK_DATA comment: Simulated API call with category filtering.
export function getMockProjects(category?: string): ShowcaseProject[] {
  if (!category || category === 'all') return mockProjects
  return mockProjects.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  features: string[]
  popular?: boolean
  buttonText: string
}

export const MOCK_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for hobbyists and side projects.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Access to 50+ UI Components",
      "Community Support",
      "Direct Copy-Paste",
      "Standard Documentation",
    ],
    buttonText: "Start for Free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who need more power.",
    priceMonthly: 19,
    priceYearly: 190,
    features: [
      "Access to all 200+ Components",
      "Full-page Templates",
      "Advanced Starter Kits",
      "Priority Email Support",
      "Custom Theming Support",
    ],
    popular: true,
    buttonText: "Get Pro Access",
  },
  {
    id: "team",
    name: "Team",
    description: "Scalable solutions for growing teams.",
    priceMonthly: 49,
    priceYearly: 490,
    features: [
      "Unlimited Components & Templates",
      "Team Shared Workspace",
      "Collaborative CLI Usage",
      "Design System Consulting",
      "Slack Discovery Channel",
    ],
    buttonText: "Join Team",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations.",
    priceMonthly: 199,
    priceYearly: 1990,
    features: [
      "Custom UI Library Development",
      "Dedicated Account Manager",
      "On-premise CLI Deployment",
      "Unlimited Team Members",
      "SLA & Premium Support",
    ],
    buttonText: "Contact Sales",
  },
]

export const PRICING_FAQ = [
  {
    question: "Is there a free trial for the Pro plan?",
    answer: "No, but we offer a 100% money-back guarantee for the first 14 days if you aren't satisfied with the premium features."
  },
  {
    question: "Can I switch between monthly and yearly billing?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings."
  },
  {
    question: "Do I get updates when new components are added?",
    answer: "Absolutely. All active subscribers get immediate access to every new component and template we release."
  },
  {
    question: "What happens if I cancel my subscription?",
    answer: "You will retain access to the premium features until the end of your current billing period. After that, your account will revert to the Free plan."
  }
]

export interface UIExample {
  id: string
  title: string
  slug: string
  description: string
  tags: string[]
  featuredComponents: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  previewImage?: string
  codeSnippet?: string
}

export const MOCK_EXAMPLES: UIExample[] = [
  {
    id: "ex-1",
    title: "SaaS Dashboard Layout",
    slug: "saas-dashboard-layout",
    description: "A comprehensive dashboard layout featuring a collapsible sidebar, statistics overview cards, and a data-rich table. Built using DevSuite cards and navigation primitives.",
    tags: ["dashboard", "admin", "layout"],
    featuredComponents: ["Sidebar", "Card", "Table", "Avatar"],
    difficulty: "intermediate",
    codeSnippet: `export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <StatsGrid />
        <DataTable />
      </main>
    </div>
  )
}`
  },
  {
    id: "ex-2",
    title: "Multi-Step Auth Flow",
    slug: "multi-step-auth-flow",
    description: "A secure and user-friendly authentication process including login, registration, and password recovery. Features smooth transitions and robust validation patterns.",
    tags: ["auth", "forms", "security"],
    featuredComponents: ["Input", "Button", "Tabs", "Badge"],
    difficulty: "intermediate",
  },
  {
    id: "ex-3",
    title: "Product Landing Page",
    slug: "product-landing-page",
    description: "High-conversion landing page with hero section, feature highlights, and pricing tables. Designed for rapid deployment of new product ideas.",
    tags: ["marketing", "landing", "e-commerce"],
    featuredComponents: ["Hero", "PricingTable", "Accordion", "Button"],
    difficulty: "beginner",
  },
  {
    id: "ex-4",
    title: "Real-time Chat Interface",
    slug: "real-time-chat-interface",
    description: "Advanced messaging interface with contact lists, chat windows, and real-time status indicators. Optimized for high interactivity and performance.",
    tags: ["communication", "real-time", "app"],
    featuredComponents: ["ScrollArea", "Input", "Avatar", "Badge"],
    difficulty: "advanced",
  },
  {
    id: "ex-5",
    title: "Data Visualization Suite",
    slug: "data-visualization-suite",
    description: "A collection of interactive charts and analytical tools for deep data exploration. Integrates seamlessly with popular charting libraries like Recharts.",
    tags: ["charts", "analytics", "dashboard"],
    featuredComponents: ["Card", "Tabs", "Select", "Separator"],
    difficulty: "advanced",
  },
  {
    id: "ex-6",
    title: "Responsive Profile Settings",
    slug: "responsive-profile-settings",
    description: "User settings dashboard for managing profile information, notifications, and security settings. Mobile-first design ensures accessibility on all devices.",
    tags: ["app", "forms", "settings"],
    featuredComponents: ["Input", "Switch", "Avatar", "Button"],
    difficulty: "beginner",
  },
  {
    id: "ex-7",
    title: "E-commerce Catalog Grid",
    slug: "e-commerce-catalog-grid",
    description: "A flexible product listing grid with advanced filtering and sorting capabilities. Includes quick-view modals and add-to-cart interactions.",
    tags: ["e-commerce", "grid", "ux"],
    featuredComponents: ["Card", "Badge", "Drawer", "Button"],
    difficulty: "intermediate",
  },
  {
    id: "ex-8",
    title: "Interactive System Monitor",
    slug: "interactive-system-monitor",
    description: "Low-latency dashboard for monitoring server health and application performance metrics. Uses dynamic status badges and live-updating list views.",
    tags: ["monitoring", "dashboard", "devops"],
    featuredComponents: ["Badge", "Card", "Progress", "Table"],
    difficulty: "intermediate",
  }
]

export function getMockExampleBySlug(slug: string): UIExample | undefined {
  return MOCK_EXAMPLES.find(ex => ex.slug === slug)
}

export interface AdminStat {
  label: string
  value: number
  total: number
  published: number
  draft: number
  trend: number
}

export const MOCK_ADMIN_STATS: AdminStat[] = [
  { label: "Components", value: 214, total: 214, published: 186, draft: 28, trend: 12 },
  { label: "Templates", value: 42, total: 42, published: 38, draft: 4, trend: 5 },
  { label: "Starters", value: 18, total: 18, published: 15, draft: 3, trend: 2 },
  { label: "Docs", value: 156, total: 156, published: 142, draft: 14, trend: 8 },
]

export interface Activity {
  id: string
  entity: string
  action: "created" | "updated" | "deleted" | "published"
  user: {
    name: string
    avatar?: string
  }
  timestamp: string
}

export const MOCK_ACTIVITY: Activity[] = [
  { id: "1", entity: "Data Table Component", action: "published", user: { name: "Alex Rivera" }, timestamp: "2024-03-22T14:30:00Z" },
  { id: "2", entity: "SaaS Starter Kit", action: "updated", user: { name: "Sarah Chen" }, timestamp: "2024-03-22T12:15:00Z" },
  { id: "3", entity: "Auth Flow Example", action: "created", user: { name: "Chen Wei" }, timestamp: "2024-03-22T10:00:00Z" },
  { id: "4", entity: "Pricing Docs", action: "published", user: { name: "Alex Rivera" }, timestamp: "2024-03-21T18:45:00Z" },
  { id: "5", entity: "Navigation Template", action: "deleted", user: { name: "Maya Patel" }, timestamp: "2024-03-21T16:20:00Z" },
  { id: "6", entity: "Button Primitive", action: "updated", user: { name: "Sarah Chen" }, timestamp: "2024-03-21T14:10:00Z" },
  { id: "7", entity: "CLI Guide", action: "created", user: { name: "Chen Wei" }, timestamp: "2024-03-21T11:30:00Z" },
  { id: "8", entity: "Header Layout", action: "published", user: { name: "Alex Rivera" }, timestamp: "2024-03-20T20:05:00Z" },
  { id: "9", entity: "Blog Starter", action: "updated", user: { name: "Maya Patel" }, timestamp: "2024-03-20T17:40:00Z" },
  { id: "10", entity: "Input Component", action: "updated", user: { name: "Sarah Chen" }, timestamp: "2024-03-20T15:20:00Z" },
]

export interface AdminComponent {
  id: string
  name: string
  slug: string
  category: string
  description: string
  tags: string[]
  codeSnippet?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_COMPONENTS: AdminComponent[] = [
  {
    id: "comp-1",
    name: "Interactive Button",
    slug: "interactive-button",
    category: "Forms",
    description: "A versatile button component with multiple size and color variants.",
    tags: ["ui", "button", "interactive"],
    isPublished: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
    codeSnippet: "export function Button() { ... }"
  },
  {
    id: "comp-2",
    name: "Data Table",
    slug: "data-table",
    category: "Data Display",
    description: "Powerful table component with sorting, filtering, and pagination.",
    tags: ["ui", "table", "data"],
    isPublished: true,
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "comp-3",
    name: "Modal Dialog",
    slug: "modal-dialog",
    category: "Overlays",
    description: "Accessible dialog window for critical information or forms.",
    tags: ["ui", "modal", "accessible"],
    isPublished: false,
    createdAt: "2024-03-05T16:20:00Z",
    updatedAt: "2024-03-05T16:20:00Z",
  },
  {
    id: "comp-4",
    name: "Nav Bar",
    slug: "nav-bar",
    category: "Navigation",
    description: "Responsive top navigation bar with dropdown menus.",
    tags: ["ui", "nav", "layout"],
    isPublished: true,
    createdAt: "2024-03-12T11:30:00Z",
    updatedAt: "2024-03-20T20:05:00Z",
  }
]

export function getMockAdminComponentById(id: string): AdminComponent | undefined {
  return MOCK_ADMIN_COMPONENTS.find(c => c.id === id)
}

export interface AdminTemplate {
  id: string
  title: string
  slug: string
  category: string
  blocksCount: number
  previewImage?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_TEMPLATES: AdminTemplate[] = [
  {
    id: "temp-1",
    title: "SaaS Modern Landing",
    slug: "saas-modern-landing",
    category: "Marketing",
    blocksCount: 8,
    isPublished: true,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "temp-2",
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    category: "Dashboard",
    blocksCount: 14,
    isPublished: true,
    createdAt: "2024-02-15T09:15:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "temp-3",
    title: "Split Auth Screen",
    slug: "split-auth-screen",
    category: "Auth",
    blocksCount: 3,
    isPublished: false,
    createdAt: "2024-03-10T16:20:00Z",
    updatedAt: "2024-03-10T16:20:00Z",
  }
]

export function getMockAdminTemplateById(id: string): AdminTemplate | undefined {
  return MOCK_ADMIN_TEMPLATES.find(t => t.id === id)
}

export interface AdminStarter {
  id: string
  name: string
  slug: string
  description: string
  techStack: string[]
  features: string[]
  repoUrl?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_STARTERS: AdminStarter[] = [
  {
    id: "start-1",
    name: "Next.js SaaS Boilerplate",
    slug: "nextjs-saas-boilerplate",
    description: "The ultimate foundation for your next SaaS. Includes Auth, Subscriptions, and Admin Panel.",
    techStack: ["Next.js", "Drizzle", "Clerk", "Stripe", "Tailwind"],
    features: ["Authentication", "Subscriptions", "Database ORM", "Email Notifications"],
    repoUrl: "https://github.com/devsuite/saas-boilerplate",
    isPublished: true,
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "start-2",
    name: "AI Chat Dashboard",
    slug: "ai-chat-dashboard",
    description: "Full-featured AI chat interface with streaming responses and history.",
    techStack: ["Next.js", "OpenAI", "Vercel AI SDK", "Radix UI"],
    features: ["Streaming Responses", "Markdown Support", "History Persistence"],
    repoUrl: "https://github.com/devsuite/ai-chat",
    isPublished: true,
    createdAt: "2024-02-20T09:15:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "start-3",
    name: "Blog with MDX",
    slug: "blog-mdx-starter",
    description: "High-performance blog starter with MDX, SEO optimization, and RSS support.",
    techStack: ["Next.js", "Contentlayer", "MDX", "Tailwind"],
    features: ["MDX Content", "Auto TOC", "SEO Optimized", "RSS Feed"],
    isPublished: false,
    createdAt: "2024-03-15T16:20:00Z",
    updatedAt: "2024-03-15T16:20:00Z",
  }
]

export function getMockAdminStarterById(id: string): AdminStarter | undefined {
  return MOCK_ADMIN_STARTERS.find(s => s.id === id)
}

export interface AdminDoc {
  id: string
  title: string
  slug: string
  content: string
  category: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_DOCS: AdminDoc[] = [
  {
    id: "doc-1",
    title: "Getting Started Guide",
    slug: "getting-started",
    content: "# Getting Started\n\nWelcome to DevSuite. This guide will help you set up your first project...",
    category: "Installation",
    isPublished: true,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "doc-2",
    title: "CLI Reference",
    slug: "cli-reference",
    content: "# CLI Reference\n\nDevSuite CLI allows you to scaffold projects quickly...",
    category: "API Reference",
    isPublished: true,
    createdAt: "2024-02-05T09:15:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "doc-3",
    title: "Deployment Workflow",
    slug: "deployment-workflow",
    content: "# Deployment\n\nHow to push your code to production using our CI/CD pipeline...",
    category: "Operations",
    isPublished: false,
    createdAt: "2024-03-20T16:20:00Z",
    updatedAt: "2024-03-20T16:20:00Z",
  }
]

export function getMockAdminDocById(id: string): AdminDoc | undefined {
  return MOCK_ADMIN_DOCS.find(d => d.id === id)
}

export interface AdminExample {
  id: string
  title: string
  slug: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_EXAMPLES: AdminExample[] = [
  {
    id: "ex-1",
    title: "SaaS Dashboard Layout",
    slug: "saas-dashboard-layout",
    description: "A comprehensive dashboard layout featuring a collapsible sidebar...",
    difficulty: "intermediate",
    category: "Dashboard",
    isPublished: true,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "ex-2",
    title: "Multi-Step Auth Flow",
    slug: "multi-step-auth-flow",
    description: "A secure and user-friendly authentication process...",
    difficulty: "intermediate",
    category: "Authentication",
    isPublished: true,
    createdAt: "2024-02-12T09:15:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "ex-3",
    title: "Product Landing Page",
    slug: "product-landing-page",
    description: "High-conversion landing page with hero section...",
    difficulty: "beginner",
    category: "Marketing",
    isPublished: false,
    createdAt: "2024-03-18T16:20:00Z",
    updatedAt: "2024-03-18T16:20:00Z",
  }
]

export function getMockAdminExampleById(id: string): AdminExample | undefined {
  return MOCK_ADMIN_EXAMPLES.find(ex => ex.id === id)
}

export interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "user"
  status: "active" | "suspended"
  createdAt: string
  lastSignInAt: string
  notes?: string
}

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: "user-1",
    name: "Alex Rivera",
    email: "alex@devsuite.io",
    avatar: "https://i.pravatar.cc/150?u=alex",
    role: "admin",
    status: "active",
    createdAt: "2023-10-01T10:00:00Z",
    lastSignInAt: "2024-03-22T14:30:00Z",
    notes: "Main platform administrator.",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah@design.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "user",
    status: "active",
    createdAt: "2024-01-15T09:15:00Z",
    lastSignInAt: "2024-03-21T18:45:00Z",
  },
  {
    id: "user-3",
    name: "Chen Wei",
    email: "chen@tech.cn",
    avatar: "https://i.pravatar.cc/150?u=chen",
    role: "user",
    status: "suspended",
    createdAt: "2023-11-20T16:20:00Z",
    lastSignInAt: "2024-02-10T11:30:00Z",
    notes: "Suspended due to terms of service violation.",
  },
  {
    id: "user-4",
    name: "Maya Patel",
    email: "maya@creative.io",
    avatar: "https://i.pravatar.cc/150?u=maya",
    role: "user",
    status: "active",
    createdAt: "2024-02-05T11:30:00Z",
    lastSignInAt: "2024-03-22T09:00:00Z",
  },
]

export function getMockAdminUserById(id: string): AdminUser | undefined {
  return MOCK_ADMIN_USERS.find(u => u.id === id)
}

export interface AdminInvite {
  id: string
  email: string
  role: "admin" | "user"
  status: "pending" | "accepted" | "expired"
  invitedAt: string
  expiresAt: string
  invitedBy: string
}

export const MOCK_ADMIN_INVITES: AdminInvite[] = [
  {
    id: "inv-1",
    email: "designer@company.com",
    role: "user",
    status: "pending",
    invitedAt: "2024-03-20T10:00:00Z",
    expiresAt: "2024-03-27T10:00:00Z",
    invitedBy: "Alex Rivera",
  },
  {
    id: "inv-2",
    email: "dev@partnership.net",
    role: "admin",
    status: "pending",
    invitedAt: "2024-03-22T14:30:00Z",
    expiresAt: "2024-03-29T14:30:00Z",
    invitedBy: "Alex Rivera",
  },
  {
    id: "inv-3",
    email: "old-request@archive.org",
    role: "user",
    status: "expired",
    invitedAt: "2024-03-10T09:15:00Z",
    expiresAt: "2024-03-17T09:15:00Z",
    invitedBy: "Sarah Chen",
  },
  {
    id: "inv-4",
    email: "newcomer@community.io",
    role: "user",
    status: "accepted",
    invitedAt: "2024-03-21T18:45:00Z",
    expiresAt: "2024-03-28T18:45:00Z",
    invitedBy: "Alex Rivera",
  },
]

export interface AdminPricingPlan {
  id: string
  name: string
  slug: string
  description: string
  monthlyPrice: number
  yearlyPrice?: number
  savingsPercent?: number
  features: string[]
  isPopular: boolean
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export const MOCK_ADMIN_PRICING_PLANS: AdminPricingPlan[] = [
  {
    id: "plan-1",
    name: "Free",
    slug: "free",
    description: "Perfect for hobbyists and side projects.",
    monthlyPrice: 0,
    features: ["Up to 3 projects", "Basic components", "Community support"],
    isPopular: false,
    isActive: true,
    sortOrder: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "plan-2",
    name: "Pro",
    slug: "pro",
    description: "Ideal for professional developers and startups.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    savingsPercent: 17,
    features: ["Unlimited projects", "All components", "Premium templates", "Email support"],
    isPopular: true,
    isActive: true,
    sortOrder: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-22T14:30:00Z",
  },
  {
    id: "plan-3",
    name: "Enterprise",
    slug: "enterprise",
    description: "Custom solutions for large organizations.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    savingsPercent: 17,
    features: ["SSO & SAML", "Custom branding", "Dedicated support", "SLA guarantees"],
    isPopular: false,
    isActive: true,
    sortOrder: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "plan-4",
    name: "Legacy Pro",
    slug: "legacy-pro",
    description: "Old pro plan for existing customers.",
    monthlyPrice: 19,
    features: ["Unlimited projects", "Standard components"],
    isPopular: false,
    isActive: false,
    sortOrder: 4,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  }
]

export function getMockAdminPricingPlanById(id: string): AdminPricingPlan | undefined {
  return MOCK_ADMIN_PRICING_PLANS.find(p => p.id === id)
}
