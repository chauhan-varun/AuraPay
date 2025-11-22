"use client";

import { AdminAppSidebar } from "@/components/AdminSidebar";
import { AdminMobileMenu } from "@/components/AdminMobileMenu";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
                <AdminAppSidebar />
            </div>

            <SidebarInset className="bg-black text-white">
                <header className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
                    {/* Desktop Sidebar Trigger - Hidden on mobile */}
                    <div className="hidden lg:block">
                        <SidebarTrigger />
                    </div>

                    {/* Mobile Menu Drawer - Visible only on mobile */}
                    <div className="lg:hidden">
                        <AdminMobileMenu />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
                    {/* Background Effects for Admin Dashboard */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px]" />
                    </div>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

