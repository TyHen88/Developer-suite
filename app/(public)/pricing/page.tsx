import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { PricingContent } from "@/components/pricing/PricingContent"
import { db } from "@/lib/db"
import { pricingPlans } from "@/db/schema"
import { eq, asc } from "drizzle-orm"
import { MOCK_PLANS } from "@/lib/mock-data"

export const metadata = {
    title: "Pricing | Bayon Developer",
    description: "Flexible pricing plans for developers and engineering teams.",
}

export default async function PricingPage() {
    let plans: any[] = []
    try {
        plans = await db.query.pricingPlans.findMany({
            where: eq(pricingPlans.isActive, true),
            orderBy: [asc(pricingPlans.sortOrder)]
        })
        if (!plans || plans.length === 0) {
            plans = MOCK_PLANS
        }
    } catch (error) {
        console.warn("Database query failed for pricing plans, falling back to mock data:", error)
        plans = MOCK_PLANS
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-1">
                <PricingContent plans={plans} />
            </main>
            <Footer />
        </div>
    )
}
