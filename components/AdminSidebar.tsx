"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    FileText,
    Settings,
    LogOut,
    ShieldCheck
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Registration", href: "/admin/users", icon: Users },
    { name: "Card Management", href: "/admin/cards", icon: CreditCard },
    { name: "Transactions", href: "/admin/transactions", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="flex h-16 items-center px-6 gap-2">
                <ShieldCheck className="h-6 w-6 text-purple-500" />
                <h1 className="text-xl font-bold text-white">AuraPay Admin</h1>
            </div>
            <nav className="flex-1 space-y-2 px-4 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-purple-500/20 text-purple-400 neon-border"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
