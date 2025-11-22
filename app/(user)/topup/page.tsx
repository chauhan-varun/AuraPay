"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Banknote, Landmark, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const methods = [
    { id: "card", name: "Card", icon: CreditCard },
    { id: "bank", name: "Bank Transfer", icon: Landmark },
    { id: "cash", name: "Cash Deposit", icon: Banknote },
    { id: "p2p", name: "P2P / Contact", icon: Users },
];

export default function TopUpPage() {
    const [selectedMethod, setSelectedMethod] = useState("card");
    const [amount, setAmount] = useState("");

    const handleTopUp = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(`Successfully topped up $${amount} via ${selectedMethod}`);
        setAmount("");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold neon-text">Top Up Balance</h1>
                <p className="text-zinc-400">Choose a payment method to add funds</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {methods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 ${isSelected
                                    ? "bg-primary/20 border-primary text-primary neon-border"
                                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon className="h-8 w-8" />
                            <span className="text-sm font-medium">{method.name}</span>
                        </button>
                    );
                })}
            </div>

            <NeonCard glow className="space-y-6">
                <form onSubmit={handleTopUp} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Amount (USD)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-zinc-500">$</span>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="pl-8 text-2xl font-bold bg-black/20 border-white/10 h-16 focus:ring-primary/50"
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 neon-border">
                        Confirm Top Up
                    </Button>
                </form>
            </NeonCard>
        </div>
    );
}
