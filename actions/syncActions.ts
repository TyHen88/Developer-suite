"use server"

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncClerkUsers() {
    const client = await clerkClient();
    const clerkUsers = await client.users.getUserList();

    for (const clerkUser of clerkUsers.data) {
        const role = (clerkUser.publicMetadata.role as string) || "user";

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
                role: role,
                status: clerkUser.banned ? "suspended" : "active",
            }
        });
    }

    revalidatePath("/admin/users");
    return { success: true, count: clerkUsers.data.length };
}
