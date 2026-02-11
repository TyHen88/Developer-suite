import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { PricingContent } from "@/components/pricing/PricingContent"
import { db } from "@/lib/db"
import { pricingPlans } from "@/db/schema"
import { eq, asc } from "drizzle-orm"

export const metadata = {
    title: "Pricing | DevSuite",
    description: "Flexible pricing plans for developers and teams.",
}

export default async function PricingPage() {
    // Fetch only active plans for the public page
    const plans = await db.query.pricingPlans.findMany({
        where: eq(pricingPlans.isActive, true),
        orderBy: [asc(pricingPlans.sortOrder)]
    })

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
