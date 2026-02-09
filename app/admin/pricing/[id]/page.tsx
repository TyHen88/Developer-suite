import { PricingForm } from "@/components/admin/PricingForm"
import { getMockAdminPricingPlanById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditPricingPlanPageProps {
    params: Promise<{ id: string }>
}

export default async function EditPricingPlanPage({ params }: EditPricingPlanPageProps) {
    const { id } = await params
    const plan = getMockAdminPricingPlanById(id)

    if (!plan) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black tracking-tighter">Optimize Plan</h1>
                <p className="text-muted-foreground font-medium">Refining: <span className="text-foreground font-bold">{plan.name}</span></p>
            </div>

            <PricingForm initialData={plan} />
        </div>
    )
}
