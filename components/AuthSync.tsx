"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { syncCurrentUser } from "@/actions/syncUser"

export function AuthSync() {
    const { isLoaded, isSignedIn, user } = useUser()

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            console.log("[AuthSync] User matched, triggering syncCurrentUser...");
            syncCurrentUser().then(res => {
                console.log("[AuthSync] Sync result:", res);
            }).catch(err => {
                console.error("[AuthSync] Sync failed:", err);
            });
        } else if (isLoaded) {
            console.log("[AuthSync] User not signed in or not loaded yet", { isSignedIn });
        }
    }, [isLoaded, isSignedIn, user])

    return null
}
