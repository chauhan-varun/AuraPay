"use client";

import { useState } from "react";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 403) {
                    toast.error("Access denied. Admin privileges required.");
                } else {
                    toast.error(data.error || "Invalid credentials");
                }
                setLoading(false);
                return;
            }

            toast.success("Welcome back, Admin!");

            // Wait a bit longer to ensure session cookies are properly set
            await new Promise(resolve => setTimeout(resolve, 500));

            // Use router.push for proper Next.js navigation
            router.push("/admin/dashboard");

            // Fallback to hard navigation after a delay if router.push doesn't work
            setTimeout(() => {
                window.location.href = "/admin/dashboard";
            }, 1000);
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[20%] right-[30%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <NeonCard className="w-full max-w-md z-10 border-purple-500/30" glow>
                <div className="text-center mb-8 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-purple-500/10 mb-4">
                        <ShieldCheck className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-zinc-400">Secure access for administrators</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Email Address</label>
                        <Input
                            type="email"
                            placeholder="admin@aurapay.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 neon-border"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Access Dashboard"}
                    </Button>
                </form>
            </NeonCard>
        </div>
    );
}
