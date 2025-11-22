"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface Card {
    id: string;
    cardNumber: string;
    userName: string;
    userEmail: string;
    status: string;
    type: string;
    balance: number;
}

export default function CardManagementPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [updatingCardId, setUpdatingCardId] = useState<string | null>(null);

    useEffect(() => {
        fetchCards();
    }, []);

    useEffect(() => {
        // Filter cards based on search query
        if (searchQuery.trim() === "") {
            setFilteredCards(cards);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = cards.filter(
                (card) =>
                    card.cardNumber.toLowerCase().includes(query) ||
                    card.userName.toLowerCase().includes(query) ||
                    card.userEmail.toLowerCase().includes(query)
            );
            setFilteredCards(filtered);
        }
    }, [searchQuery, cards]);

    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/cards");
            const data = await response.json();
            if (data.cards) {
                setCards(data.cards);
                setFilteredCards(data.cards);
            }
        } catch (error) {
            toast.error("Failed to fetch cards");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (cardId: string, currentStatus: string) => {
        setUpdatingCardId(cardId);
        const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

        try {
            const response = await fetch("/api/admin/cards", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cardId,
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update card status");
            }

            // Update local state
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === cardId ? { ...card, status: newStatus } : card
                )
            );

            toast.success(`Card ${newStatus === "ACTIVE" ? "unblocked" : "blocked"} successfully`);
        } catch (error) {
            toast.error("Failed to update card status");
        } finally {
            setUpdatingCardId(null);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Card Management</h1>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search by card number or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 focus:ring-primary/50"
                    />
                </div>
            </div>

            <NeonCard className="overflow-hidden p-0">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : filteredCards.length === 0 ? (
                    <div className="flex items-center justify-center py-20 text-zinc-400 text-sm md:text-base">
                        {searchQuery ? "No cards found matching your search" : "No cards available"}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-white/5 text-zinc-400">
                                <tr>
                                    <th className="p-3 md:p-4 font-medium text-sm">Card Number</th>
                                    <th className="p-3 md:p-4 font-medium text-sm">Cardholder Name</th>
                                    <th className="p-3 md:p-4 font-medium text-sm">Email</th>
                                    <th className="p-3 md:p-4 font-medium text-sm">Type</th>
                                    <th className="p-3 md:p-4 font-medium text-sm">Status</th>
                                    <th className="p-3 md:p-4 font-medium text-sm text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredCards.map((card) => (
                                    <tr key={card.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 md:p-4 font-mono text-sm">{card.cardNumber}</td>
                                        <td className="p-3 md:p-4 text-sm">{card.userName}</td>
                                        <td className="p-3 md:p-4 text-zinc-400 text-xs md:text-sm">{card.userEmail}</td>
                                        <td className="p-3 md:p-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                                                {card.type}
                                            </span>
                                        </td>
                                        <td className="p-3 md:p-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold ${card.status === "ACTIVE"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {card.status}
                                            </span>
                                        </td>
                                        <td className="p-3 md:p-4 text-right">
                                            <Button
                                                variant={card.status === "ACTIVE" ? "destructive" : "secondary"}
                                                size="sm"
                                                onClick={() => toggleStatus(card.id, card.status)}
                                                disabled={updatingCardId === card.id}
                                            >
                                                {updatingCardId === card.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : card.status === "ACTIVE" ? (
                                                    "Block"
                                                ) : (
                                                    "Unblock"
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </NeonCard>
        </div>
    );
}
