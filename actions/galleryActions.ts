"use server"

import { db } from "@/lib/db";
import { components, templates, starters } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// --- Component Actions ---

export async function createComponent(data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [newComp] = await db.insert(components).values({
        ...data,
        updatedAt: new Date(),
    }).returning();

    revalidatePath("/admin/components");
    revalidatePath("/components");
    return { success: true, id: newComp.id };
}

export async function updateComponent(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(components).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(components.id, id));

    revalidatePath("/admin/components");
    revalidatePath("/components");
    return { success: true };
}

export async function deleteComponent(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(components).where(eq(components.id, id));

    revalidatePath("/admin/components");
    revalidatePath("/components");
    return { success: true };
}

// --- Template Actions ---

export async function createTemplate(data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [newTemp] = await db.insert(templates).values({
        ...data,
        updatedAt: new Date(),
    }).returning();

    revalidatePath("/admin/templates");
    revalidatePath("/templates");
    return { success: true, id: newTemp.id };
}

export async function updateTemplate(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(templates).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(templates.id, id));

    revalidatePath("/admin/templates");
    revalidatePath("/templates");
    return { success: true };
}

export async function deleteTemplate(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(templates).where(eq(templates.id, id));

    revalidatePath("/admin/templates");
    revalidatePath("/templates");
    return { success: true };
}

// --- Starter Actions ---

export async function createStarter(data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [newStarter] = await db.insert(starters).values({
        ...data,
        updatedAt: new Date(),
    }).returning();

    revalidatePath("/admin/starters");
    revalidatePath("/starters");
    return { success: true, id: newStarter.id };
}

export async function updateStarter(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(starters).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(starters.id, id));

    revalidatePath("/admin/starters");
    revalidatePath("/starters");
    return { success: true };
}

export async function deleteStarter(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(starters).where(eq(starters.id, id));

    revalidatePath("/admin/starters");
    revalidatePath("/starters");
    return { success: true };
}
