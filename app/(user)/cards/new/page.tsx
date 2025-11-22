"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function CreateCardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreateCard = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/cards/my-card", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to create card");
            }

            toast.success("New card created successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Failed to create card. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <NeonCard className="w-full max-w-md text-center space-y-8 p-8" glow>
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-purple-500/10 relative">
                        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                        <CreditCard className="w-12 h-12 text-purple-400 relative z-10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">Get Your New Aura Card</h1>
                    <p className="text-zinc-400">
                        Experience the future of payments with our secure, instant virtual cards.
                    </p>
                </div>

                <div className="grid gap-4 text-left bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <div>
                            <p className="font-medium text-white">Instant Activation</p>
                            <p className="text-xs text-zinc-400">Ready to use immediately</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <div>
                            <p className="font-medium text-white">Secure Payments</p>
                            <p className="text-xs text-zinc-400">Advanced fraud protection</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="flex-1 border-white/10 hover:bg-white/5"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white neon-border"
                        onClick={handleCreateCard}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Create Card"}
                    </Button>
                </div>
            </NeonCard>
        </div>
    );
}
