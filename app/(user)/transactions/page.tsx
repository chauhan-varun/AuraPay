"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const transactions = [
    { id: 1, name: "Ikea", date: "Today, 10:23 AM", amount: -25.43, type: "Shopping", status: "Completed" },
    { id: 2, name: "Lisa Philips", date: "Today, 08:00 AM", amount: -1000.00, type: "Transfer", status: "Sent" },
    { id: 3, name: "App Store", date: "Yesterday, 05:30 PM", amount: -12.99, type: "Subscription", status: "Completed" },
    { id: 4, name: "Spotify", date: "Yesterday, 09:00 AM", amount: -9.99, type: "Subscription", status: "Completed" },
    { id: 5, name: "Deposit", date: "20 Nov, 10:00 AM", amount: 500.00, type: "Top Up", status: "Received" },
];

export default function TransactionsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold neon-text">Transactions</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="Search transactions..."
                            className="pl-10 bg-white/5 border-white/10 w-64 focus:ring-primary/50"
                        />
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {transactions.map((tx) => (
                    <NeonCard key={tx.id} className="flex items-center justify-between p-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-xl border border-white/10">
                                {tx.amount > 0 ? "⬇️" : "⬆️"}
                            </div>
                            <div>
                                <p className="font-bold text-lg">{tx.name}</p>
                                <p className="text-sm text-zinc-400">{tx.date} • {tx.type}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold text-lg ${tx.amount > 0 ? "text-green-400" : "text-white"}`}>
                                {tx.amount > 0 ? "+" : ""}{tx.amount} USD
                            </p>
                            <p className="text-xs text-zinc-500">{tx.status}</p>
                        </div>
                    </NeonCard>
                ))}
            </div>
        </div>
    );
}
