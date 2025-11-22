"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/Loader";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import {
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Wallet,
    CreditCard,
    Eye,
    EyeOff
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
import { authClient } from "@/lib/auth-client";

const data = [
    { name: "Jan", amount: 320000 },
    { name: "Feb", amount: 240000 },
    { name: "Mar", amount: 160000 },
    { name: "Apr", amount: 222400 },
    { name: "May", amount: 151200 },
    { name: "Jun", amount: 191200 },
    { name: "Jul", amount: 279200 },
];

export default function DashboardPage() {
    const router = useRouter();
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [cards, setCards] = useState<any[]>([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const session = await authClient.getSession();

            if (!session?.data?.user) {
                router.push("/login");
                return;
            }

            setUserData({
                name: session.data.user.name || "User",
                email: session.data.user.email || "",
            });

            // Fetch user balance from API
            const balanceResponse = await fetch("/api/balance");
            if (balanceResponse.ok) {
                const balanceData = await balanceResponse.json();
                setBalance(balanceData.balance || 0);
            }

            // Fetch cards data
            const cardResponse = await fetch("/api/cards/my-card");
            if (cardResponse.ok) {
                const data = await cardResponse.json();
                if (data.cards && data.cards.length > 0) {
                    setCards(data.cards);
                }
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setError("Failed to load user data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [router]);

    if (loading) {
        return <Loader message="Loading your dashboard..." />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchUserData} />;
    }

    const userName = userData?.name || "User";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    // Get selected card data
    const selectedCard = cards[selectedCardIndex] || {};
    const cardNumber = selectedCard.cardNumber || "**** **** **** ****";
    const cardExpiry = selectedCard.expiryDate || "**/**";
    const cardCVV = selectedCard.cvv || "***";
    const cardName = selectedCard.name || "My Card";
    const cardStatus = selectedCard.status || "ACTIVE";
    const cardType = selectedCard.type || "PHYSICAL";

    const handleCardUpdate = async (updates: any) => {
        if (!selectedCard.id) return;

        try {
            const response = await fetch("/api/cards/my-card", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cardId: selectedCard.id,
                    ...updates
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Update local state
                const newCards = [...cards];
                newCards[selectedCardIndex] = data.card;
                setCards(newCards);
            }
        } catch (error) {
            console.error("Failed to update card:", error);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary/50">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-white">Hello, {userName}!</h1>
                        <p className="text-sm md:text-base text-zinc-400">Welcome back</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-sm md:text-base">
                        <Wallet className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                        {showBalance ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "₹****.**"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column - Cards & Actions */}
                <div className="lg:col-span-1 space-y-6 md:space-y-8">
                    {/* Cards Section */}
                    <section>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg md:text-xl font-bold">Cards</h2>
                                {cards.length > 0 && (
                                    <select
                                        className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm outline-none focus:border-primary/50"
                                        value={selectedCardIndex}
                                        onChange={(e) => {
                                            setSelectedCardIndex(Number(e.target.value));
                                            setIsCardFlipped(false);
                                        }}
                                    >
                                        {cards.map((card, index) => (
                                            <option key={card.id} value={index} className="bg-black text-white">
                                                {card.name || `Card ${index + 1}`} (..{card.cardNumber.slice(-4)})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:text-primary/80 hover:bg-primary/10 text-xs md:text-sm"
                                onClick={() => router.push("/cards/new")}
                            >
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
                                        <div className="text-right">
                                            <span className="text-lg font-bold italic text-white/50 block">VISA</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${cardStatus === 'BLOCKED' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                                {cardStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="z-10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-zinc-400 text-sm">Balance</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowBalance(!showBalance);
                                                }}
                                                className="text-zinc-400 hover:text-white transition-colors"
                                            >
                                                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">
                                            {showBalance ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "₹****.**"}
                                        </h3>
                                        <div className="flex justify-between items-end">
                                            <p className="text-zinc-300 tracking-widest">**** **** **** {cardNumber.slice(-4)}</p>
                                            <div className="text-right">
                                                <p className="text-zinc-400 text-xs">{cardExpiry}</p>
                                                <p className="text-white/60 text-xs mt-1">{cardName}</p>
                                            </div>
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
                                            <span className="text-white">{cardType}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Card Number</span>
                                            <span className="text-white font-mono">{cardNumber}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Cardholder</span>
                                            <span className="text-white">{userName}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Valid Thru</span>
                                            <span className="text-white">{cardExpiry}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">CVV</span>
                                            <span className="text-white">{cardCVV}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-500 text-center mt-auto">Click to flip back</p>
                                </NeonCard>
                            </div>
                        </div>

                        {/* Card Controls */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="border-white/10 hover:bg-white/5"
                                onClick={() => {
                                    const newName = prompt("Enter new name for this card:", cardName);
                                    if (newName) handleCardUpdate({ name: newName });
                                }}
                            >
                                Rename Card
                            </Button>
                            <Button
                                variant="outline"
                                className={`border-white/10 hover:bg-white/5 ${cardStatus === 'BLOCKED' ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}
                                onClick={() => handleCardUpdate({ status: cardStatus === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED' })}
                            >
                                {cardStatus === 'BLOCKED' ? 'Unblock Card' : 'Block Card'}
                            </Button>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section>
                        <h2 className="text-lg md:text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <Button
                                onClick={() => router.push("/topup")}
                                className="h-auto py-3 md:py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-1.5 md:p-2 rounded-full bg-green-500/20 text-green-400">
                                    <ArrowDownLeft className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                                <span className="text-xs md:text-sm">Top Up</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-3 md:py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-1.5 md:p-2 rounded-full bg-red-500/20 text-red-400">
                                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                                <span className="text-xs md:text-sm">Transfer</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-3 md:py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-1.5 md:p-2 rounded-full bg-blue-500/20 text-blue-400">
                                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                                <span className="text-xs md:text-sm">Send</span>
                            </Button>
                            <Button
                                onClick={() => router.push("/transactions")}
                                className="h-auto py-3 md:py-4 flex flex-col gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
                            >
                                <div className="p-1.5 md:p-2 rounded-full bg-purple-500/20 text-purple-400">
                                    <Wallet className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                                <span className="text-xs md:text-sm">History</span>
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Right Column - Graph & Stats */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <section>
                        <h2 className="text-lg md:text-xl font-bold mb-4">Statistics</h2>
                        <NeonCard className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-zinc-400">Total Spends</p>
                                    <h3 className="text-2xl font-bold">₹9,96,000.00</h3>
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
                        <h2 className="text-lg md:text-xl font-bold mb-4">Recent Transactions</h2>
                        <div className="space-y-3 md:space-y-4">
                            {[
                                {
                                    name: "Rahul Kumar",
                                    date: "Today, 2:30 PM",
                                    amount: "+14,000.00",
                                    type: "Received",
                                    image: "/rahul.png",
                                    method: "Google Pay"
                                },
                                {
                                    name: "Anjali Sharma",
                                    date: "Today, 11:15 AM",
                                    amount: "+5,500.00",
                                    type: "Received",
                                    image: "/anjali.png",
                                    method: "PhonePe"
                                },

                                {
                                    name: "Apple Store",
                                    date: "3 days ago, 1:45 PM",
                                    amount: "-999.00",
                                    type: "Purchase",
                                    image: "/applestore.png",
                                    method: "Card"
                                },
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                            <Image
                                                src={tx.image}
                                                alt={tx.name}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm md:text-base">{tx.name}</p>
                                            <p className="text-xs text-zinc-400">{tx.date} • {tx.type}</p>
                                            {tx.method && (
                                                <p className="text-xs text-zinc-500">{tx.method}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`font-bold text-sm md:text-base ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>₹{tx.amount}</span>
                                </div>
                            ))}</div>
                    </section>
                </div>
            </div>
        </div>
    );
}
