"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    History,
    PlusCircle,
    Settings,
    LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: History },
    { name: "Top Up", href: "/topup", icon: PlusCircle },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
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
        <Sidebar
            collapsible="icon"
            className="border-white/10 bg-black/50 backdrop-blur-xl"
        >
            <SidebarHeader className="border-b border-white/10 h-16 flex items-center justify-center">
                <div className="flex items-center gap-2 px-2">
                    <Image
                        src="/logo.svg"
                        alt="AuraPay Logo"
                        width={32}
                        height={32}
                        className="shrink-0"
                    />
                    <h1 className="text-xl font-bold neon-gradient-text group-data-[collapsible=icon]:hidden">
                        AuraPay
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.name}
                                            className={isActive ? "bg-primary/20 text-primary neon-border" : "text-zinc-400 hover:bg-white/5 hover:text-white"}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            tooltip="Logout"
                            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
