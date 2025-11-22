"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Wallet,
    CreditCard
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 2000 },
    { name: "Apr", amount: 2780 },
    { name: "May", amount: 1890 },
    { name: "Jun", amount: 2390 },
    { name: "Jul", amount: 3490 },
];

export default function DashboardPage() {
    const router = useRouter();
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    // TODO: Replace with actual user data from session/API
    const userName = "Mike Johns";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/50">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Hello, {userName}!</h1>
                        <p className="text-zinc-400">Welcome back</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10">
                        <Wallet className="mr-2 h-4 w-4" />
                        $8,465.00
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Cards & Actions */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Cards Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Cards 3</h2>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                                + Add new card
                            </Button>
                        </div>

                        {/* Flippable Card */}
                        <div
                            className="card-container cursor-pointer"
                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                            style={{ perspective: "1000px" }}
                        >
                            <div
                                className={`transition-transform duration-700 ${isCardFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                                style={{
                                    transformStyle: "preserve-3d",
                                    position: "relative",
                                    height: "224px"
                                }}
                            >
                                {/* Front of Card */}
                                <NeonCard
                                    glow
                                    className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-purple-900/80 to-black border-none"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />

                                    <div className="flex justify-between items-start z-10">
                                        <CreditCard className="h-8 w-8 text-white/80" />
                                        <span className="text-lg font-bold italic text-white/50">VISA</span>
                                    </div>

                                    <div className="z-10">
                                        <p className="text-zinc-400 text-sm mb-1">Balance</p>
                                        <h3 className="text-3xl font-bold text-white mb-4">$8,465 USD</h3>
                                        <div className="flex justify-between items-end">
                                            <p className="text-zinc-300 tracking-widest">**** **** **** 4568</p>
                                            <p className="text-zinc-400 text-xs">12/25</p>
                                        </div>
                                    </div>
                                </NeonCard>

                                {/* Back of Card */}
                                <NeonCard
                                    glow
                                    className="absolute inset-0 flex flex-col gap-4 bg-gradient-to-br from-purple-900/80 to-black border-none [transform:rotateY(180deg)]"
                                    style={{
                                        backfaceVisibility: "hidden"
                                    }}
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Card Type</span>
                                            <span className="text-white">Physical</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Card Number</span>
                                            <span className="text-white font-mono">4568 **** **** 1234</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Cardholder</span>
                                            <span className="text-white">{userName}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Valid Thru</span>
                                            <span className="text-white">12/25</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">CVV</span>
                                            <span className="text-white">***</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 text-center mt-auto">Click to flip back</p>
                                </NeonCard>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => router.push("/topup")}
                                className="h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-2 rounded-full bg-green-500/20 text-green-400">
                                    <ArrowDownLeft className="h-5 w-5" />
                                </div>
                                <span>Top Up</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                                    <ArrowUpRight className="h-5 w-5" />
                                </div>
                                <span>Transfer</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                    <Send className="h-5 w-5" />
                                </div>
                                <span>Send</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                                    <Wallet className="h-5 w-5" />
                                </div>
                                <span>History</span>
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Right Column - Graph & Stats */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Statistics</h2>
                        <NeonCard className="h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-zinc-400">Total Spends</p>
                                    <h3 className="text-2xl font-bold">$12,450.00</h3>
                                </div>
                                <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
                                    <option>Monthly</option>
                                    <option>Weekly</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="name" stroke="#666" />
                                        <YAxis stroke="#666" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#a855f7"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorAmount)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </NeonCard>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                        <div className="space-y-4">
                            {[
                                { name: "Ikea", date: "Today, 10 AM", amount: "-25.43", type: "Purchase", icon: "🛍️" },
                                { name: "Lisa Philips", date: "Today, 8 AM", amount: "-1000.00", type: "Sent", icon: "👤" },
                                { name: "App Store", date: "Yesterday", amount: "-25.43", type: "Purchase", icon: "🍎" },
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold">{tx.name}</p>
                                            <p className="text-xs text-zinc-400">{tx.date} • {tx.type}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-white">{tx.amount} USD</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
