"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

const cards = [
    { id: 1, number: "4576 XXXX XXXX 1234", name: "Rohit Sharma", status: "Active" },
    { id: 2, number: "7894 XXXX XXXX 5678", name: "Nisha Patel", status: "Blocked" },
    { id: 3, number: "4576 XXXX XXXX 9012", name: "John Smith", status: "Active" },
];

export default function CardManagementPage() {
    const toggleStatus = (id: number, currentStatus: string) => {
        toast.success(`Card ${currentStatus === "Active" ? "Blocked" : "Unblocked"} successfully`);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Card Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search by card number or name..."
                        className="pl-10 bg-white/5 border-white/10 w-80 focus:ring-primary/50"
                    />
                </div>
            </div>

            <NeonCard className="overflow-hidden p-0">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-zinc-400">
                        <tr>
                            <th className="p-4 font-medium">Card Number</th>
                            <th className="p-4 font-medium">Cardholder Name</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {cards.map((card) => (
                            <tr key={card.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono">{card.number}</td>
                                <td className="p-4">{card.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${card.status === "Active"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {card.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Button
                                        variant={card.status === "Active" ? "destructive" : "secondary"}
                                        size="sm"
                                        onClick={() => toggleStatus(card.id, card.status)}
                                    >
                                        {card.status === "Active" ? "Block" : "Unblock"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </NeonCard>
        </div>
    );
}
