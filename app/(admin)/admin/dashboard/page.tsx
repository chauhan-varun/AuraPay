"use client";

import { NeonCard } from "@/components/NeonCard";
import { Users, CreditCard, Activity, AlertTriangle } from "lucide-react";

const stats = [
    { name: "Total Cards Issued", value: "1,234", icon: CreditCard, color: "text-blue-400", bg: "bg-blue-500/20" },
    { name: "Total Registered Users", value: "856", icon: Users, color: "text-green-400", bg: "bg-green-500/20" },
    { name: "Total Transactions", value: "$4.2M", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/20" },
    { name: "Blocked Cards", value: "12", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/20" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <NeonCard key={stat.name} glow className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-zinc-400 text-sm">{stat.name}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                        </NeonCard>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                    <h2 className="text-xl font-bold mb-4">Pending KYC Users</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <NeonCard key={i} className="flex items-center justify-between p-4 hover:bg-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-zinc-800" />
                                    <div>
                                        <p className="font-bold">User #{1000 + i}</p>
                                        <p className="text-xs text-zinc-400">Submitted 2 hours ago</p>
                                    </div>
                                </div>
                                <button className="text-sm text-primary hover:underline">Review</button>
                            </NeonCard>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">Recent System Alerts</h2>
                    <NeonCard className="h-[300px] flex items-center justify-center text-zinc-500">
                        No active alerts
                    </NeonCard>
                </section>
            </div>
        </div>
    );
}
