import { UserForm } from "@/components/admin/UserForm"
import { getMockAdminUserById } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface EditUserPageProps {
    params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params
    const user = getMockAdminUserById(id)

    if (!user) {
        notFound()
    }

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black tracking-tighter">Edit User Profile</h1>
                <p className="text-muted-foreground font-medium">Update permissions, moderation notes, and account status for <span className="text-foreground font-bold">{user.name}</span>.</p>
            </div>

            <UserForm user={user} />
        </div>
    )
}
