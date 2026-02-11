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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    UserCog,
    ShieldAlert,
    ShieldCheck,
    Trash2,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Ban,
    Clock
} from "lucide-react"
import { AdminUser, MOCK_ADMIN_USERS } from "@/lib/mock-data"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toggleSuspend, deleteUser, bulkSuspend } from "@/actions/userActions"
import { toast } from "sonner"

export function UserTable({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = React.useState<any[]>(initialUsers)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedIds, setSelectedIds] = React.useState<string[]>([])
    const [roleFilter, setRoleFilter] = React.useState<string>("all")

    const filteredUsers = users.filter(u =>
        (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (roleFilter === "all" || u.role === roleFilter)
    )

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredUsers.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(filteredUsers.map(u => u.id))
        }
    }

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleToggleSuspend = async (user: AdminUser) => {
        const res = await toggleSuspend(user.id, user.status)
        if (res.success) {
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: res.newStatus as any } : u))
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to permanently delete this user?")) {
            const res = await deleteUser(id)
            if (res.success) {
                setUsers(prev => prev.filter(u => u.id !== id))
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Bulk Actions Bar */}
            {selectedIds.length > 0 && (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary">{selectedIds.length} users selected</span>
                        <div className="h-4 w-px bg-primary/20" />
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary hover:bg-primary/10 h-8 font-bold text-xs uppercase tracking-wider"
                            onClick={async () => {
                                await bulkSuspend(selectedIds)
                                setSelectedIds([])
                            }}
                        >
                            <Ban className="h-3.5 w-3.5 mr-2" />
                            Bulk Suspend
                        </Button>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])} className="h-8 text-xs font-bold uppercase tracking-wider">
                        Cancel
                    </Button>
                </div>
            )}

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-border">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 h-10 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-muted-foreground" />
                    <select
                        className="bg-background/50 border border-border rounded-xl h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none min-w-[120px]"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="user">Users</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="w-[50px]">
                                <input
                                    type="checkbox"
                                    className="rounded border-border bg-background"
                                    checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
                                    onChange={toggleSelectAll}
                                    aria-label="Select all users"
                                />
                            </TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Last Seen</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className={cn(
                                        "hover:bg-primary/5 transition-colors group",
                                        selectedIds.includes(user.id) && "bg-primary/5"
                                    )}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            className="rounded border-border bg-background"
                                            checked={selectedIds.includes(user.id)}
                                            onChange={() => toggleSelect(user.id)}
                                            aria-label={`Select user ${user.name}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-border shadow-sm">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm tracking-tight">{user.name}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-1.5 py-0 h-4 border-none shadow-sm",
                                                user.role === 'admin' ? "bg-purple-500/10 text-purple-500" : "bg-blue-500/10 text-blue-500"
                                            )}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                                                user.status === 'active' ? "bg-emerald-500 text-emerald-500" : "bg-rose-500 text-rose-500"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider",
                                                user.status === 'active' ? "text-emerald-500" : "text-rose-500 text-shadow-sm"
                                            )}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground font-medium">
                                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                            <Clock className="h-3 w-3" />
                                            {format(new Date(user.lastSignInAt), "MMM d")}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 group-hover:text-primary transition-colors" aria-label={`Actions for ${user.name}`}>
                                                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border rounded-2xl shadow-2xl p-2">
                                                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-black px-2 pb-2">Management</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2 rounded-xl cursor-pointer">
                                                        <UserCog className="h-4 w-4" />
                                                        <span>Edit Profile</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleSuspend(user)}
                                                    className={cn(
                                                        "flex items-center gap-2 rounded-xl cursor-pointer",
                                                        user.status === 'active' ? "text-rose-500 focus:text-rose-500 focus:bg-rose-500/10" : "text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                                                    )}
                                                >
                                                    {user.status === 'active' ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                                                    <span>{user.status === 'active' ? 'Suspend User' : 'Unsuspend User'}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-border/50 my-2" />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(user.id)}
                                                    className="flex items-center gap-2 rounded-xl cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>Delete Permanently</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <Ban className="h-10 w-10 opacity-20" />
                                        <p className="font-medium tracking-tight">No users found match your criteria.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
