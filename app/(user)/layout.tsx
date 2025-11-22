import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-black text-white">
                <header className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Effects for Dashboard */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[100px]" />
                    </div>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
