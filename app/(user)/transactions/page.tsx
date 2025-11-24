"use client";

import { useState } from "react";
import { NeonCard } from "@/components/NeonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Image from "next/image";

type TransactionType = "RECEIVED" | "SENT" | "PAYMENT" | "SUBSCRIPTION";
type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";

interface Transaction {
    id: string;
    name: string;
    date: string;
    time: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    method?: string;
    image?: string;
    description?: string;
}

const transactions: Transaction[] = [
    {
        id: "1",
        name: "Rahul Kumar",
        date: "Today",
        time: "2:30 PM",
        amount: 14000,
        type: "RECEIVED",
        status: "COMPLETED",
        method: "Google Pay",
        image: "/rahul.png",
        description: "Payment received",
    },
    {
        id: "2",
        name: "Anjali Sharma",
        date: "Today",
        time: "11:15 AM",
        amount: 5500,
        type: "RECEIVED",
        status: "COMPLETED",
        method: "PhonePe",
        image: "/anjali.png",
        description: "Dinner split payment",
    },
    {
        id: "3",
        name: "Spotify Premium",
        date: "Yesterday",
        time: "9:00 AM",
        amount: 119,
        type: "SUBSCRIPTION",
        status: "COMPLETED",
        method: "Auto-debit",
        image: "/spotify.png",
        description: "Monthly subscription",
    },
    {
        id: "4",
        name: "Flipkart",
        date: "2 days ago",
        time: "4:20 PM",
        amount: 3299,
        type: "PAYMENT",
        status: "COMPLETED",
        method: "Card",
        image: "/flipkart.png",
        description: "Electronics purchase",
    },
    {
        id: "5",
        name: "Apple Store",
        date: "3 days ago",
        time: "1:45 PM",
        amount: 999,
        type: "PAYMENT",
        status: "COMPLETED",
        method: "Card",
        image: "/applestore.png",
        description: "App purchase",
    },
    {
        id: "6",
        name: "Rahul Kumar",
        date: "5 days ago",
        time: "6:30 PM",
        amount: 2000,
        type: "SENT",
        status: "COMPLETED",
        method: "UPI",
        image: "/rahul.png",
        description: "Loan repayment",
    },
    {
        id: "7",
        name: "Flipkart",
        date: "1 week ago",
        time: "11:00 AM",
        amount: 1599,
        type: "PAYMENT",
        status: "COMPLETED",
        method: "Wallet",
        image: "/flipkart.png",
        description: "Fashion items",
    },
    {
        id: "8",
        name: "Anjali Sharma",
        date: "1 week ago",
        time: "8:15 PM",
        amount: 8000,
        type: "RECEIVED",
        status: "COMPLETED",
        method: "Bank Transfer",
        image: "/anjali.png",
        description: "Project payment",
    },
    {
        id: "9",
        name: "Apple Store",
        date: "2 weeks ago",
        time: "3:30 PM",
        amount: 79,
        type: "PAYMENT",
        status: "COMPLETED",
        method: "Card",
        image: "/applestore.png",
        description: "iCloud storage",
    },
    {
        id: "10",
        name: "Spotify Premium",
        date: "1 month ago",
        time: "9:00 AM",
        amount: 119,
        type: "SUBSCRIPTION",
        status: "COMPLETED",
        method: "Auto-debit",
        image: "/spotify.png",
        description: "Monthly subscription",
    },
];

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"ALL" | TransactionType>("ALL");

    const filteredTransactions = transactions.filter((tx) => {
        const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "ALL" || tx.type === filter;
        return matchesSearch && matchesFilter;
    });

    const getTypeColor = (type: TransactionType) => {
        switch (type) {
            case "RECEIVED":
                return "text-green-400";
            case "SENT":
                return "text-red-400";
            case "PAYMENT":
                return "text-orange-400";
            case "SUBSCRIPTION":
                return "text-blue-400";
            default:
                return "text-white";
        }
    };

    const getTypeIcon = (type: TransactionType) => {
        return type === "RECEIVED" ? (
            <ArrowDownLeft className="h-4 w-4 text-green-400" />
        ) : (
            <ArrowUpRight className="h-4 w-4 text-red-400" />
        );
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Transactions</h1>
                <p className="text-sm md:text-base text-zinc-400">View and manage your transaction history</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-zinc-400" />
                    <Input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-zinc-600 text-sm md:text-base"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    <Button
                        variant={filter === "ALL" ? "default" : "outline"}
                        onClick={() => setFilter("ALL")}
                        className={`${filter === "ALL" ? "bg-primary" : "border-white/10 bg-white/5"} whitespace-nowrap text-sm`}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "RECEIVED" ? "default" : "outline"}
                        onClick={() => setFilter("RECEIVED")}
                        className={`${filter === "RECEIVED" ? "bg-primary" : "border-white/10 bg-white/5"} whitespace-nowrap text-sm`}
                    >
                        Received
                    </Button>
                    <Button
                        variant={filter === "SENT" ? "default" : "outline"}
                        onClick={() => setFilter("SENT")}
                        className={`${filter === "SENT" ? "bg-primary" : "border-white/10 bg-white/5"} whitespace-nowrap text-sm`}
                    >
                        Sent
                    </Button>
                    <Button
                        variant={filter === "PAYMENT" ? "default" : "outline"}
                        onClick={() => setFilter("PAYMENT")}
                        className={`${filter === "PAYMENT" ? "bg-primary" : "border-white/10 bg-white/5"} whitespace-nowrap text-sm`}
                    >
                        Payments
                    </Button>
                </div>
            </div>

            {/* Transactions List */}
            <NeonCard glow>
                <div className="space-y-4">
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-zinc-400">No transactions found</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-start sm:items-center justify-between p-3 md:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 gap-3"
                            >
                                <div className="flex items-start sm:items-center gap-3 md:gap-4 flex-1 min-w-0">
                                    {/* Image/Avatar */}
                                    <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {tx.image ? (
                                            <Image
                                                src={tx.image}
                                                alt={tx.name}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg md:text-xl">
                                                {tx.name.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                                            <p className="font-bold text-white truncate text-sm md:text-base">{tx.name}</p>
                                            <div className="shrink-0">
                                                {getTypeIcon(tx.type)}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-zinc-400">
                                            <span className="whitespace-nowrap">{tx.date}</span>
                                            <span>•</span>
                                            <span className="whitespace-nowrap">{tx.time}</span>
                                            {tx.method && (
                                                <>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="hidden sm:inline">{tx.method}</span>
                                                </>
                                            )}
                                        </div>
                                        {tx.description && (
                                            <p className="text-xs text-zinc-500 mt-1 truncate">{tx.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right shrink-0">
                                    <p className={`text-base md:text-lg font-bold ${getTypeColor(tx.type)} whitespace-nowrap`}>
                                        {tx.type === "RECEIVED" ? "+" : "-"}₹
                                        {tx.amount.toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                    <span
                                        className={`inline-block text-xs px-2 py-0.5 md:py-1 rounded-full mt-1 ${tx.status === "COMPLETED"
                                            ? "bg-green-500/20 text-green-400"
                                            : tx.status === "PENDING"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </NeonCard>
        </div>
    );
}
