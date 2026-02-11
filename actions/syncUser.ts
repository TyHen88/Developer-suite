"use server"

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { count, eq } from "drizzle-orm";

/**
 * Syncs the currently logged-in Clerk user to the local database.
 * This should be called on the first visit after sign-in/up.
 */
export async function syncCurrentUser() {
    try {
        const { currentUser } = await import("@clerk/nextjs/server");
        const clerkUser = await currentUser();
        if (!clerkUser) return { success: false, error: "No user found" };

        console.log(`[Sync] Syncing user: ${clerkUser.id} (${clerkUser.emailAddresses[0]?.emailAddress})`);

        // Check if ANY admin already exists
        const adminCountResult = await db.select({ value: count() }).from(users).where(eq(users.role, "admin"));
        const adminCount = adminCountResult[0].value;
        
        let role = (clerkUser.publicMetadata.role as string);
        
        // If no role in Clerk and NO admin exists in the system, make them admin
        if (!role && adminCount === 0) {
            console.log(`[Sync] NO ADMIN found in system. Granting ADMIN role to ${clerkUser.id}`);
            role = "admin";
            
            // Update Clerk metadata
            const { clerkClient } = await import("@clerk/nextjs/server");
            const client = await clerkClient();
            await client.users.updateUserMetadata(clerkUser.id, {
                publicMetadata: { role: "admin" }
            });
        } else if (!role) {
            role = "user";
        }

        console.log(`[Sync] Final role decision: ${role}`);

        await db.insert(users).values({
            id: clerkUser.id,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Anonymous',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            avatar: clerkUser.imageUrl,
            role: role,
            status: clerkUser.banned ? "suspended" : "active",
            createdAt: new Date(clerkUser.createdAt),
        }).onConflictDoUpdate({
            target: users.id,
            set: {
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Anonymous',
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                avatar: clerkUser.imageUrl,
                role: role, // Keep role in sync
            }
        });

        console.log(`[Sync] Successfully synced user ${clerkUser.id} to DB.`);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("[Sync] Error syncing user:", error);
        return { success: false, error: String(error) };
    }
}
