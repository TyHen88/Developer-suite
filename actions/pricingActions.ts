"use client"

import { toast } from "sonner"
import { AdminPricingPlan } from "@/lib/mock-data"

// TODO: Integrate real Stripe/Clerk Billing plan sync here

export async function createPlan(data: any) {
  console.log("Creating new pricing plan:", data)
  await new Promise(resolve => setTimeout(resolve, 800))
  toast.success(`Plan "${data.name}" created successfully`)
  return { success: true, id: "plan-" + Math.random().toString(36).substr(2, 9) }
}

export async function updatePlan(id: string, data: any) {
  console.log(`Updating pricing plan ${id}:`, data)
  await new Promise(resolve => setTimeout(resolve, 800))
  toast.success(`Plan "${data.name}" updated successfully`)
  return { success: true }
}

export async function deletePlan(id: string) {
  console.log(`Deleting pricing plan ${id}`)
  await new Promise(resolve => setTimeout(resolve, 500))
  toast.success("Plan deleted successfully")
  return { success: true }
}

export async function togglePlanActive(id: string, currentStatus: boolean) {
  const newStatus = !currentStatus
  console.log(`Toggling active status for ${id} to ${newStatus}`)
  await new Promise(resolve => setTimeout(resolve, 300))
  toast.success(`Plan ${newStatus ? "activated" : "archived"}`)
  return { success: true, newStatus }
}
