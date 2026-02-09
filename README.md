# DevSuite | Modern Developer Infrastructure & Admin Panel

DevSuite is a high-performance, aesthetically premium administrative ecosystem built for modern SaaS products and developer tools. It provides a complete control plane for content management, user orchestration, and monetization strategy.

![DevSuite Admin Preview](https://raw.githubusercontent.com/TyHen88/Developer-suite/main/public/devsuite-logo-light.svg)

## 🚀 Vision
To provide developers with a "Day 1" infrastructure that feels like a "Year 5" enterprise product. DevSuite bridges the gap between raw code and a polished, accessible management interface.

## 💎 Key Features

### 📊 Tactical Dashboard
- **Real-time Metrics**: High-fidelity Stat Cards with trend analysis and pulse animations.
- **Quick Actions**: Rapid-fire entity creation (Components, Templates, Starters, Docs).
- **Activity Ledger**: Detailed audit trail of platform events and user modifications.

### 👥 User & Access Governance
- **Role-Based Orchestration**: Manage administrative privileges and user status (Active/Suspended).
- **Bulk Operations**: Reactive selection bar for mass user management.
- **Invite Engine**: Multi-email invitation system with customizable roles and expiration logic.

### 💰 Monetization Engine
- **Dynamic Pricing tiers**: Manage feature lists, monthly/yearly pricing, and "Popular" highlights.
- **Automatic Savings Logic**: Integrated calculation for yearly discount percentages.
- **Elastic Tiers**: Instantly update public-facing pricing pages from the admin console.

### 🎨 Theme & Experience Engine
- **Midnight Blue Dark Mode**: A custom-tuned, low-glare dark mode using `oklch` color spaces.
- **Live Theme Preview**: Interactive visualization of Light/Dark/System modes within settings.
- **Glassmorphism UI**: High-end translucent layers for a premium, modern aesthetic.

### 🛡️ Core Infrastructure
- **Accessibility (A11y)**: WCAG-compliant ARIA landmarks, keyboard navigation, and screen reader announcements.
- **Type-Safe Form Logic**: Strict validation powered by Zod and React Hook Form.
- **Unified API Layer**: Clean, centralized data fetching and mutation patterns.

## 🛠️ Technical Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Componentry**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **State/Themes**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- npm (or pnpm/yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TyHen88/Developer-suite.git
   cd Developer-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000/admin](http://localhost:3000/admin) to explore the dashboard.

## 📂 Project Structure

```text
├── actions/            # Server Actions for data mutations
├── app/                # Next.js App Router (Admin & Public routes)
├── components/         # Reusable UI & Admin specific blocks
│   ├── admin/          # Context-specific admin components
│   └── ui/             # Atomic shadcn/ui components
├── lib/                # Shared utilities, constants, and mock data
└── public/             # Static brand assets
```

## 📜 Roadmap
- [ ] Live Stripe/Billing production sync
- [ ] Clerk Auth hardware integration
- [ ] Drizzle ORM / Neon Database connectivity
- [ ] Media asset management (Cloudinary/S3)

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
Built with ⚡ by the DevSuite Team.
