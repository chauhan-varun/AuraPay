"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    History,
    PlusCircle,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: History },
    { name: "Top Up", href: "/topup", icon: PlusCircle },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully");
            setOpen(false);
            router.push("/");
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="left">
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
                <DrawerHeader className="border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="AuraPay Logo"
                            width={32}
                            height={32}
                            className="shrink-0"
                        />
                        <DrawerTitle className="text-xl font-bold neon-gradient-text">
                            AuraPay
                        </DrawerTitle>
                    </div>
                </DrawerHeader>

                <div className="flex flex-col h-full px-4 py-6">
                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-2 flex-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <DrawerClose asChild key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-primary/20 text-primary neon-border"
                                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </DrawerClose>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="border-t border-white/10 pt-4">
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

