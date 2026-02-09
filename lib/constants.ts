export type ComponentCategory = 'data-display' | 'forms' | 'navigation' | 'overlays' | 'other'
export type TemplateCategory = 'Marketing' | 'Application UI' | 'E-commerce' | 'Dashboard' | 'Blog' | 'Auth'
export type TemplateType = 'Hero' | 'Pricing' | 'Features' | 'Footer' | 'Landing' | 'Dashboard' | 'Forms'
export type StarterCategory = 'Full-stack' | 'Frontend' | 'Mobile' | 'Library'

export interface DocPage {
  title: string
  slug: string
  content: string
}

export interface DocSection {
  title: string
  items: { title: string; slug: string }[]
}

export interface UIComponent {
  id: string
  name: string
  description: string
  category: ComponentCategory
  code: string
  props: Array<{ name: string; type: string; description: string }>
}

export const MOCK_COMPONENTS: UIComponent[] = [
  {
    id: 'button',
    name: 'Interactive Button',
    description: 'A versatile button component with multiple size and color variants.',
    category: 'forms',
    code: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: 'string', description: 'The visual style of the button.' },
      { name: 'size', type: 'string', description: 'The size of the button.' },
      { name: 'asChild', type: 'boolean', description: 'Change the default rendered element for the one passed as a child.' },
    ]
  },
  {
    id: 'input',
    name: 'Text Input',
    description: 'Accessible text field with optional labels and validation states.',
    category: 'forms',
    code: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}`,
    props: [
      { name: 'type', type: 'string', description: 'The type of input field.' },
      { name: 'placeholder', type: 'string', description: 'The placeholder text.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the input is disabled.' },
    ]
  },
  {
    id: 'badge',
    name: 'Status Badge',
    description: 'Small visual indicators for categories, status, or tags.',
    category: 'data-display',
    code: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: 'string', description: 'The visual style of the badge.' },
    ]
  },
  {
    id: 'card',
    name: 'Content Card',
    description: 'Flexible container for grouping related information.',
    category: 'data-display',
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content goes here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}`,
    props: [
      { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    ]
  },
  {
    id: 'dialog',
    name: 'Modal Dialog',
    description: 'A window overlaid on either the primary window or another dialog window.',
    category: 'overlays',
    code: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="py-4">Profile form field placeholders...</div>
      </DialogContent>
    </Dialog>
  )
}`,
    props: [
      { name: 'open', type: 'boolean', description: 'The controlled open state.' },
      { name: 'onOpenChange', type: 'function', description: 'Event handler called when the open state changes.' },
    ]
  },
  {
    id: 'tabs',
    name: 'Tabbed View',
    description: 'Set of layered sections of content, known as tab panels, that are displayed one at a time.',
    category: 'navigation',
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}`,
    props: [
      { name: 'defaultValue', type: 'string', description: 'The value of the tab to select by default.' },
      { name: 'value', type: 'string', description: 'The controlled value of the tab to select.' },
    ]
  },
  {
    id: 'navbar',
    name: 'Navigation Bar',
    description: 'The main navigation component for an application.',
    category: 'navigation',
    code: `<nav className="flex items-center space-x-4 lg:space-x-6">
  <a href="/" className="text-sm font-medium transition-colors hover:text-primary">Overview</a>
  <a href="/customers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Customers</a>
  <a href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Products</a>
</nav>`,
    props: [
      { name: 'links', type: 'array', description: 'Array of navigation links.' },
    ]
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    category: 'data-display',
    code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    props: [
      { name: 'type', type: 'string', description: 'The selection mode (single or multiple).' },
      { name: 'collapsible', type: 'boolean', description: 'Whether the item can be closed.' },
    ]
  },
  {
    id: 'switch',
    name: 'Toggle Switch',
    description: 'A control that allows the user to toggle a setting on or off.',
    category: 'forms',
    code: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`,
    props: [
      { name: 'checked', type: 'boolean', description: 'The checked state.' },
      { name: 'onCheckedChange', type: 'function', description: 'Event handler called when the checked state changes.' },
    ]
  },
  {
    id: 'avatar',
    name: 'User Avatar',
    description: 'An image element with a fallback for representing a user.',
    category: 'data-display',
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
    props: [
      { name: 'src', type: 'string', description: 'The source of the image.' },
      { name: 'alt', type: 'string', description: 'The alt text for the image.' },
    ]
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumbs',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    category: 'navigation',
    code: `<nav aria-label="Breadcrumb">
  <ol className="flex list-none p-0 text-sm text-muted-foreground">
    <li><a href="/" className="hover:text-foreground">Home</a></li>
    <li className="px-2">/</li>
    <li className="text-foreground font-medium" aria-current="page">Components</li>
  </ol>
</nav>`,
    props: [
      { name: 'items', type: 'array', description: 'Array of breadcrumb segments.' },
    ]
  },
  {
    id: 'toast',
    name: 'Toast Notification',
    description: 'A succinct message that is displayed temporarily.',
    category: 'overlays',
    code: `import { toast } from "sonner"

export function ToastDemo() {
  return (
    <Button onClick={() => toast("Event has been created")}>
      Show Toast
    </Button>
  )
}`,
    props: [
      { name: 'message', type: 'string', description: 'The message to display.' },
    ]
  }
]

export interface TemplateFile {
  name: string
  code: string
  language: string
}

export interface UITemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  type: TemplateType
  blocksCount: number
  complexity: 'Low' | 'Medium' | 'High'
  popularity: number
  files: TemplateFile[]
}

export const MOCK_TEMPLATES: UITemplate[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Modern Landing',
    description: 'A complete landing page with hero, features, and pricing sections.',
    category: 'Marketing',
    type: 'Landing',
    blocksCount: 6,
    complexity: 'High',
    popularity: 98,
    files: [
      {
        name: 'page.tsx',
        language: 'tsx',
        code: `import { Hero } from "./components/hero"
import { Features } from "./components/features"
import { Pricing } from "./components/pricing"

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
    </div>
  )`
      },
      {
        name: 'hero.tsx',
        language: 'tsx',
        code: `export function Hero() { return <section>Modern Hero Section</section> }`
      }
    ]
  },
  {
    id: 'admin-dashboard',
    name: 'Analytics Dashboard',
    description: 'A comprehensive dashboard layout with charts, sidebar and stats cards.',
    category: 'Dashboard',
    type: 'Dashboard',
    blocksCount: 12,
    complexity: 'High',
    popularity: 95,
    files: [
      {
        name: 'layout.tsx',
        language: 'tsx',
        code: `export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}`
      }
    ]
  },
  {
    id: 'auth-split',
    name: 'Split Auth Screen',
    description: 'Side-by-side authentication screen with image and form.',
    category: 'Auth',
    type: 'Forms',
    blocksCount: 2,
    complexity: 'Low',
    popularity: 88,
    files: [
      {
        name: 'login.tsx',
        language: 'tsx',
        code: `export function LoginForm() { return <div>Auth Form</div> }`
      }
    ]
  },
  {
    id: 'ecommerce-grid',
    name: 'Product Catalog Grid',
    description: 'Responsive product grid with advanced filters and sorting.',
    category: 'E-commerce',
    type: 'Features',
    blocksCount: 4,
    complexity: 'Medium',
    popularity: 92,
    files: [
      {
        name: 'grid.tsx',
        language: 'tsx',
        code: `export function ProductGrid() { return <div className="grid">Products...</div> }`
      }
    ]
  },
  {
    id: 'pricing-table',
    name: 'Tiered Pricing Table',
    description: 'Conversion-optimized pricing plans with toggle for annual/monthly.',
    category: 'Marketing',
    type: 'Pricing',
    blocksCount: 3,
    complexity: 'Medium',
    popularity: 85,
    files: [
      {
        name: 'pricing.tsx',
        language: 'tsx',
        code: `export function Pricing() { return <div>Plans</div> }`
      }
    ]
  },
  {
    id: 'blog-modern',
    name: 'Clean Blog Layout',
    description: 'Modern blog post layout with reading progress and social share.',
    category: 'Blog',
    type: 'Features',
    blocksCount: 5,
    complexity: 'Medium',
    popularity: 78,
    files: [
      {
        name: 'blog-post.tsx',
        language: 'tsx',
        code: `export function Post() { return <article>Blog Content</article> }`
      }
    ]
  },
  {
    id: 'feature-bento',
    name: 'Bento Feature Grid',
    description: 'Apple-style bento grid layout for highlighting product features.',
    category: 'Marketing',
    type: 'Features',
    blocksCount: 1,
    complexity: 'Medium',
    popularity: 96,
    files: [
      {
        name: 'bento.tsx',
        language: 'tsx',
        code: `export function Bento() { return <div className="grid-cols-4">Features</div> }`
      }
    ]
  },
  {
    id: 'modern-footer',
    name: 'Mega Footer Layout',
    description: 'Multi-column footer with newsletter signup and social links.',
    category: 'Marketing',
    type: 'Footer',
    blocksCount: 1,
    complexity: 'Low',
    popularity: 72,
    files: [
      {
        name: 'footer.tsx',
        language: 'tsx',
        code: `export function Footer() { return <footer>Footer Content</footer> }`
      }
    ]
  }
]
export interface UIStarter {
  id: string
  slug: string
  name: string
  description: string
  category: StarterCategory
  stack: string[]
  stars: number
  githubUrl: string
  demoUrl: string
  features: string[]
  folderStructure: string
  setupInstructions: string
}

export const MOCK_STARTERS: UIStarter[] = [
  {
    id: '1',
    slug: 'nextjs-saas-boilerplate',
    name: 'Next.js SaaS Boilerplate',
    description: 'The ultimate foundation for your next SaaS. Includes Auth, Subscriptions, and Admin Panel.',
    category: 'Full-stack',
    stack: ['Next.js', 'Drizzle', 'Clerk', 'Stripe', 'Tailwind'],
    stars: 1240,
    githubUrl: 'https://github.com/example/saas-boilerplate',
    demoUrl: 'https://saas-demo.example.com',
    features: [
      'Authentication with Clerk',
      'Subscription management with Stripe',
      'Database ORM with Drizzle',
      'Modern UI with shadcn/ui',
      'Email notifications with Resend'
    ],
    folderStructure: `root/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
├── components/
│   ├── ui/
│   └── shared/
├── lib/
└── prisma/`,
    setupInstructions: '1. Clone the repo\n2. Install dependencies: npm install\n3. Set up environment variables\n4. Run migrations: npx drizzle-kit push\n5. Start dev server: npm run dev'
  },
  {
    id: '2',
    slug: 'ai-chat-dashboard',
    name: 'AI Chat Dashboard',
    description: 'Full-featured AI chat interface with streaming responses and history.',
    category: 'Frontend',
    stack: ['Next.js', 'OpenAI', 'Vercel AI SDK', 'Radix UI'],
    stars: 850,
    githubUrl: 'https://github.com/example/ai-chat',
    demoUrl: 'https://ai-chat.example.com',
    features: [
      'Streaming AI responses',
      'Markdown support in chat',
      'Chat history persistence',
      'Theme switching (Light/Dark)',
      'Responsive design'
    ],
    folderStructure: `root/
├── app/
├── components/
│   ├── chat/
│   └── ui/
├── hooks/
└── lib/`,
    setupInstructions: '1. git clone ...\n2. npm install\n3. Add OPENAI_API_KEY to .env\n4. npm run dev'
  },
  {
    id: '3',
    slug: 'blog-mdx-starter',
    name: 'Blog with MDX',
    description: 'High-performance blog starter with MDX, SEO optimization, and RSS support.',
    category: 'Frontend',
    stack: ['Next.js', 'Contentlayer', 'MDX', 'Tailwind'],
    stars: 420,
    githubUrl: 'https://github.com/example/mdx-blog',
    demoUrl: 'https://blog.example.com',
    features: [
      'MDX for content',
      'Auto-generated TOC',
      'SEO optimized with Metadata API',
      'RSS Feed generation',
      'Syntax highlighting'
    ],
    folderStructure: `root/
├── content/
├── app/
├── components/
└── lib/`,
    setupInstructions: '1. git clone ...\n2. npm install\n3. Start writing in content/ posts\n4. npm run dev'
  }
]

export const DOCS_NAVIGATION: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
      { title: "Project Structure", slug: "project-structure" },
    ],
  },
  {
    title: "Application Guide",
    items: [
      { title: "Adding Components", slug: "adding-components" },
      { title: "Using Templates", slug: "using-templates" },
      { title: "Fetching Data", slug: "fetching-data" },
    ],
  },
  {
    title: "Theming",
    items: [
      { title: "CSS Variables", slug: "css-variables" },
      { title: "Dark Mode", slug: "dark-mode" },
      { title: "Custom Themes", slug: "custom-themes" },
    ],
  },
  {
    title: "CLI",
    items: [
      { title: "Commands", slug: "cli-commands" },
      { title: "Configuration", slug: "cli-config" },
    ],
  },
]

export const MOCK_DOCS: Record<string, DocPage> = {
  introduction: {
    title: "Introduction",
    slug: "introduction",
    content: `# Introduction
    
Welcome to DevSuite, a comprehensive ecosystem of UI components, full-page templates, and high-performance starter kits.

DevSuite is designed to help developers build premium web applications with speed and consistency, using modern tools like React, Next.js, and Tailwind CSS.`
  },
  installation: {
    title: "Installation",
    slug: "installation",
    content: `# Installation
    
Install the DevSuite CLI to get started with our professional component ecosystem.

## Prerequisites

- React 18+
- Tailwind CSS 4+
- TypeScript

## Quick Start

Run the following command to initialize a new project:

\`\`\`bash
npx devsuite-cli init my-app
\`\`\`

During initialization, you will be prompted to choose your preferred stack and styling options.

## Manual Installation

If you prefer to add DevSuite to an existing project:

\`\`\`bash
npm install @devsuite/core @devsuite/ui
\`\`\`

Then, add the DevSuite plugin to your \`postcss.config.mjs\`:

\`\`\`javascript
export default {
  plugins: {
    '@devsuite/postcss': {},
  },
};
\`\`\``
  },
  "adding-components": {
    title: "Adding Components",
    slug: "adding-components",
    content: `# Adding Components

DevSuite components are designed to be copied and pasted directly into your codebase.

## Direct Copy

Go to the [Components Gallery](/components), select a component, and click the **Copy Code** button.

## CLI Usage

You can also use our CLI to pull components directly into your \`components/ui\` directory:

\`\`\`bash
npx devsuite-cli add button
\`\`\`

This will automatically install any required Radix primitives and update your styles.`
  },
  "css-variables": {
    title: "Theming & CSS Variables",
    slug: "css-variables",
    content: `# Theming

DevSuite uses CSS variables for theming, making it easy to customize the look and feel of your application.

## Default Variables

The following variables are defined in your \`globals.css\`:

\`\`\`css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #0a0a0a;
  --primary-foreground: #ffffff;
}
\`\`\`

## Customizing Colors

To change your primary color, simply updated the \`--primary\` variable with an HSL, Hex, or RGB value.`
  },
  "cli-commands": {
    title: "CLI Commands",
    slug: "cli-commands",
    content: `# CLI Commands

The DevSuite CLI is the fastest way to build and manage your application.

## Available Commands

- \`init\`: Initialize a new DevSuite project.
- \`add [component]\`: Add a component to your project.
- \`template [slug]\`: Scaffold a full page template.
- \`diff\`: Check for updates in your components.`
  }
}
