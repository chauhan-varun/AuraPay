import Link from "next/link";
import { NeonCard } from "@/components/NeonCard";
import { User, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter text-white neon-text">
            AuraPay
          </h1>
          <p className="text-zinc-400 text-xl">
            The Future of Digital Finance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Link href="/login" className="group">
            <NeonCard glow className="h-64 flex flex-col items-center justify-center gap-6 cursor-pointer group-hover:scale-105">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">User Access</h2>
                <p className="text-zinc-400">Manage your personal finances</p>
              </div>
            </NeonCard>
          </Link>

          <Link href="/admin/login" className="group">
            <NeonCard glow className="h-64 flex flex-col items-center justify-center gap-6 cursor-pointer group-hover:scale-105">
              <div className="p-4 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                <ShieldCheck className="w-12 h-12 text-purple-400" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
                <p className="text-zinc-400">System management and logs</p>
              </div>
            </NeonCard>
          </Link>
        </div>
      </div>
    </main>
  );
}
