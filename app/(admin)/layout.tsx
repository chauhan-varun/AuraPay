import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                {/* Background Effects for Admin Dashboard */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px]" />
                </div>
                {children}
            </main>
        </div>
    );
}
