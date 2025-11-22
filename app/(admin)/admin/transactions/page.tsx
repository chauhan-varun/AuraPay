"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

const transactions = [
    { id: 1, user: "Rohit Sharma", amount: 5000, date: "2025-11-22", type: "Top Up", status: "Completed" },
    { id: 2, user: "Nisha Patel", amount: 120, date: "2025-11-21", type: "Purchase", status: "Completed" },
    { id: 3, user: "John Smith", amount: 10000, date: "2025-11-21", type: "Transfer", status: "Pending" },
    { id: 4, user: "Rohit Sharma", amount: 250, date: "2025-11-20", type: "Purchase", status: "Completed" },
];

export default function TransactionLogsPage() {
    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Transaction Logs</h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                        type="date"
                        className="bg-white/5 border-white/10 w-full sm:w-40 focus:ring-primary/50"
                    />
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <NeonCard className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-white/5 text-zinc-400">
                            <tr>
                                <th className="p-3 md:p-4 font-medium text-sm">User</th>
                                <th className="p-3 md:p-4 font-medium text-sm">Amount</th>
                                <th className="p-3 md:p-4 font-medium text-sm">Date</th>
                                <th className="p-3 md:p-4 font-medium text-sm">Type</th>
                                <th className="p-3 md:p-4 font-medium text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-3 md:p-4 font-medium text-sm">{tx.user}</td>
                                    <td className="p-3 md:p-4 font-mono font-bold text-sm">${tx.amount}</td>
                                    <td className="p-3 md:p-4 text-zinc-400 text-xs md:text-sm">{tx.date}</td>
                                    <td className="p-3 md:p-4 text-sm">{tx.type}</td>
                                    <td className="p-3 md:p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${tx.status === "Completed"
                                            ? "bg-green-500/20 text-green-400"
                                            : tx.status === "Pending"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </NeonCard>
        </div>
    );
}
