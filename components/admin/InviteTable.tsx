"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    RotateCw,
    Trash2,
    Mail,
    Clock,
    ShieldCheck,
    ShieldAlert,
    Calendar
} from "lucide-react"
import { AdminInvite, MOCK_ADMIN_INVITES } from "@/lib/mock-data"
import { format, formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { resendInvite, cancelInvite } from "@/actions/inviteActions"

export function InviteTable() {
    const [invites, setInvites] = React.useState<AdminInvite[]>(MOCK_ADMIN_INVITES)

    const handleResend = async (id: string) => {
        const res = await resendInvite(id)
        if (res.success) {
            // Mock logic: update invitedAt
            setInvites(prev => prev.map(inv => inv.id === id ? { ...inv, invitedAt: new Date().toISOString() } : inv))
        }
    }

    const handleCancel = async (id: string) => {
        if (confirm("Revoke this invitation? The user will no longer be able to join using this link.")) {
            const res = await cancelInvite(id)
            if (res.success) {
                setInvites(prev => prev.filter(inv => inv.id !== id))
            }
        }
    }

    return (
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead>Email Address</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Expires In</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invites.length > 0 ? (
                        invites.map((invite) => (
                            <TableRow key={invite.id} className="hover:bg-primary/5 transition-colors group">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                            <Mail size={14} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{invite.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-1.5 py-0 h-4 border-none",
                                            invite.role === 'admin' ? "bg-purple-500/10 text-purple-500" : "bg-blue-500/10 text-blue-500"
                                        )}
                                    >
                                        {invite.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            invite.status === 'pending' ? "bg-amber-500 animate-pulse" :
                                                invite.status === 'accepted' ? "bg-emerald-500" : "bg-rose-500"
                                        )} />
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            invite.status === 'pending' ? "text-amber-500" :
                                                invite.status === 'accepted' ? "text-emerald-500" : "text-rose-500"
                                        )}>
                                            {invite.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(invite.invitedAt), "MMM d")}
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs font-bold">
                                    {invite.status === 'pending' ? (
                                        <div className="flex items-center gap-1.5 text-amber-500/80">
                                            <Clock className="h-3 w-3" />
                                            {formatDistanceToNow(new Date(invite.expiresAt))}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground opacity-50 italic">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border rounded-2xl shadow-2xl p-2">
                                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-black px-2 pb-2">Invite Management</DropdownMenuLabel>
                                            {invite.status === 'pending' && (
                                                <DropdownMenuItem onClick={() => handleResend(invite.id)} className="flex items-center gap-2 rounded-xl cursor-pointer">
                                                    <RotateCw className="h-4 w-4" />
                                                    <span>Resend Invitation</span>
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator className="bg-border/50 my-2" />
                                            <DropdownMenuItem
                                                onClick={() => handleCancel(invite.id)}
                                                className="flex items-center gap-2 rounded-xl cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span>Revoke Invite</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-48 text-center">
                                <p className="text-muted-foreground font-medium italic opacity-50 underline decoration-primary/20">No active invitations found.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
