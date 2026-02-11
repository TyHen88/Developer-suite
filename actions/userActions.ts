"use server"

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";

export async function updateRole(userId: string, role: "admin" | "user") {
  const { userId: requesterId } = await auth();
  if (!requesterId) throw new Error("Unauthorized");

  // Update in Clerk
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role },
  });

  // Update in DB
  await db.update(users).set({ role }).where(eq(users.id, userId));

  revalidatePath("/admin/users");
  return { success: true };
}

export async function toggleSuspend(userId: string, currentStatus: "active" | "suspended") {
  const { userId: requesterId } = await auth();
  if (!requesterId) throw new Error("Unauthorized");

  const newStatus = currentStatus === "active" ? "suspended" : "active";

  const client = await clerkClient();
  if (newStatus === "suspended") {
    await client.users.banUser(userId);
  } else {
    await client.users.unbanUser(userId);
  }

  // Update in DB
  await db.update(users).set({ status: newStatus }).where(eq(users.id, userId));

  revalidatePath("/admin/users");
  return { success: true, newStatus };
}

export async function deleteUser(userId: string) {
  const { userId: requesterId } = await auth();
  if (!requesterId) throw new Error("Unauthorized");

  const client = await clerkClient();
  await client.users.deleteUser(userId);

  // Delete from DB
  await db.delete(users).where(eq(users.id, userId));

  revalidatePath("/admin/users");
  return { success: true };
}

export async function bulkSuspend(userIds: string[]) {
  const { userId: requesterId } = await auth();
  if (!requesterId) throw new Error("Unauthorized");

  const client = await clerkClient();
  for (const id of userIds) {
    await client.users.banUser(id);
  }

  // Update in DB
  await db.update(users).set({ status: "suspended" }).where(inArray(users.id, userIds));

  revalidatePath("/admin/users");
  return { success: true };
}
