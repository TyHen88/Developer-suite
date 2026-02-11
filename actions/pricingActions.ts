"use server"

import { db } from "@/lib/db";
import { pricingPlans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createPlan(data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [newPlan] = await db.insert(pricingPlans).values({
    name: data.name,
    slug: data.slug,
    description: data.description,
    monthlyPrice: data.monthlyPrice,
    yearlyPrice: data.yearlyPrice,
    savingsPercent: data.savingsPercent,
    features: data.features,
    isPopular: data.isPopular,
    isActive: data.isActive,
    sortOrder: data.sortOrder,
  }).returning();

  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  return { success: true, id: newPlan.id };
}

export async function updatePlan(id: string, data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.update(pricingPlans).set({
    name: data.name,
    slug: data.slug,
    description: data.description,
    monthlyPrice: data.monthlyPrice,
    yearlyPrice: data.yearlyPrice,
    savingsPercent: data.savingsPercent,
    features: data.features,
    isPopular: data.isPopular,
    isActive: data.isActive,
    sortOrder: data.sortOrder,
    updatedAt: new Date(),
  }).where(eq(pricingPlans.id, id));

  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  return { success: true };
}

export async function deletePlan(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.delete(pricingPlans).where(eq(pricingPlans.id, id));

  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  return { success: true };
}

export async function togglePlanActive(id: string, currentStatus: boolean) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const newStatus = !currentStatus;
  await db.update(pricingPlans).set({
    isActive: newStatus,
    updatedAt: new Date(),
  }).where(eq(pricingPlans.id, id));

  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  return { success: true, newStatus };
}
