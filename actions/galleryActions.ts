"use server"

import { db } from "@/lib/db";
import { components, templates, starters, docs, examples } from "@/db/schema";
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

// --- Doc Actions ---

export async function createDoc(data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [newDoc] = await db.insert(docs).values({
        ...data,
        updatedAt: new Date(),
    }).returning();

    revalidatePath("/admin/docs");
    return { success: true, id: newDoc.id };
}

export async function updateDoc(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(docs).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(docs.id, id));

    revalidatePath("/admin/docs");
    return { success: true };
}

export async function deleteDoc(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(docs).where(eq(docs.id, id));

    revalidatePath("/admin/docs");
    return { success: true };
}

// --- Example Actions ---

export async function createExample(data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const [newEx] = await db.insert(examples).values({
        ...data,
        updatedAt: new Date(),
    }).returning();

    revalidatePath("/admin/examples");
    return { success: true, id: newEx.id };
}

export async function updateExample(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(examples).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(examples.id, id));

    revalidatePath("/admin/examples");
    return { success: true };
}

export async function deleteExample(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(examples).where(eq(examples.id, id));

    revalidatePath("/admin/examples");
    return { success: true };
}
