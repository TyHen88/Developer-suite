"use client"

import { toast } from "sonner"
import { AdminInvite } from "@/lib/mock-data"

export async function createInvite(data: { emails: string[], role: "admin" | "user", message?: string }) {
  console.log("Creating invites for:", data.emails, "with role:", data.role)
  
  // Simulation: 
  // const invites = await Promise.all(data.emails.map(email => 
  //   clerkClient.invitations.createInvitation({ emailAddress: email, publicMetadata: { role: data.role } })
  // ))
  
  await new Promise(resolve => setTimeout(resolve, 800))
  toast.success(`${data.emails.length} invitation(s) sent successfully`)
  
  return { 
    success: true, 
    inviteLink: "https://devsuite.io/invite/join?token=mock_token_123" 
  }
}

export async function resendInvite(inviteId: string) {
  console.log("Resending invite:", inviteId)
  await new Promise(resolve => setTimeout(resolve, 500))
  toast.success("Invitation resent")
  return { success: true }
}

export async function cancelInvite(inviteId: string) {
  console.log("Cancelling invite:", inviteId)
  await new Promise(resolve => setTimeout(resolve, 500))
  toast.success("Invitation revoked")
  return { success: true }
}
