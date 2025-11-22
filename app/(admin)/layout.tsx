import { AdminLayoutClient } from "@/components/AdminLayoutClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Force dynamic rendering for admin routes since we use headers() for auth
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        // Server-side admin role verification
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            console.log("Admin Layout: No session found, redirecting to login");
            redirect("/admin/login");
        }

        // Check admin role from database
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true },
        });

        if (!user) {
            console.log("Admin Layout: User not found in database");
            redirect("/admin/login");
        }

        if (user.role !== "admin") {
            console.log("Admin Layout: User is not admin, role:", user.role);
            redirect("/admin/login");
        }

        console.log("Admin Layout: Access granted for user:", session.user.id);
        return <AdminLayoutClient>{children}</AdminLayoutClient>;
    } catch (error) {
        console.error("Admin Layout Error:", error);
        redirect("/admin/login");
    }
}
