"use client";

import { NeonCard } from "@/components/NeonCard";
import { Users, CreditCard, Activity, AlertTriangle, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";

const stats = [
    { name: "Total Cards Issued", value: "1,234", icon: CreditCard, color: "text-blue-400", bg: "bg-blue-500/20", trend: "+12%" },
    { name: "Total Registered Users", value: "856", icon: Users, color: "text-green-400", bg: "bg-green-500/20", trend: "+5%" },
    { name: "Total Transactions", value: "$4.2M", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/20", trend: "+24%" },
    { name: "Blocked Cards", value: "12", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/20", trend: "-2%" },
];

const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 550 },
    { name: "Mar", users: 700 },
    { name: "Apr", users: 650 },
    { name: "May", users: 856 },
    { name: "Jun", users: 1200 },
];

const revenueData = [
    { name: "Mon", revenue: 4000 },
    { name: "Tue", revenue: 3000 },
    { name: "Wed", revenue: 2000 },
    { name: "Thu", revenue: 2780 },
    { name: "Fri", revenue: 1890 },
    { name: "Sat", revenue: 2390 },
    { name: "Sun", revenue: 3490 },
];

const recentActivity = [
    { id: 1, user: "Rahul Kumar", action: "New Account Created", time: "2 mins ago", status: "success" },
    { id: 2, user: "Anjali Sharma", action: "KYC Verification Pending", time: "15 mins ago", status: "warning" },
    { id: 3, user: "Vikram Singh", action: "Large Transaction Detected", time: "1 hour ago", status: "danger" },
    { id: 4, user: "Priya Patel", action: "Card Blocked by Admin", time: "2 hours ago", status: "danger" },
    { id: 5, user: "Amit Shah", action: "Profile Updated", time: "3 hours ago", status: "success" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-sm md:text-base text-zinc-400">Overview of system performance and user activity</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs md:text-sm border border-green-500/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="hidden sm:inline">System Operational</span>
                        <span className="sm:hidden">Operational</span>
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const isPositive = stat.trend.startsWith("+");
                    return (
                        <NeonCard key={stat.name} glow className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className={`p-2 sm:p-3 rounded-full ${stat.bg}`}>
                                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-xs sm:text-sm">{stat.name}</p>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">{stat.value}</h3>
                                </div>
                            </div>
                            <div className={`text-xs font-bold ${isPositive ? "text-green-400" : "text-red-400"} flex items-center self-end sm:self-auto`}>
                                {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {stat.trend}
                            </div>
                        </NeonCard>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <NeonCard className="h-[300px] sm:h-[350px] md:h-[400px]">
                    <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                        User Growth
                    </h2>
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={userGrowthData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                                dataKey="users"
                                stroke="#a855f7"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </NeonCard>

                <NeonCard className="h-[300px] sm:h-[350px] md:h-[400px]">
                    <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                        Revenue Overview
                    </h2>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </NeonCard>
            </div>

            {/* Recent Activity Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <NeonCard>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                            <h2 className="text-lg md:text-xl font-bold">Recent System Activity</h2>
                            <button className="text-xs sm:text-sm text-primary hover:underline self-start sm:self-auto">View All</button>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shrink-0 ${activity.status === 'success' ? 'bg-green-500/20 text-green-400' :
                                            activity.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {activity.status === 'success' ? <Users className="h-4 w-4 md:h-5 md:w-5" /> :
                                                activity.status === 'warning' ? <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" /> :
                                                    <Activity className="h-4 w-4 md:h-5 md:w-5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm md:text-base">{activity.action}</p>
                                            <p className="text-xs md:text-sm text-zinc-400">by {activity.user}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-zinc-500 self-end sm:self-auto">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </NeonCard>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <NeonCard className="h-full">
                        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Quick Actions</h2>
                        <div className="space-y-2 md:space-y-3">
                            <button className="w-full p-3 md:p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors text-left text-sm md:text-base font-medium flex items-center justify-between group">
                                Generate Report
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform shrink-0" />
                            </button>
                            <button className="w-full p-3 md:p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-left text-sm md:text-base font-medium flex items-center justify-between group">
                                Review KYC
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform shrink-0" />
                            </button>
                            <button className="w-full p-3 md:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-left text-sm md:text-base font-medium flex items-center justify-between group">
                                System Maintenance
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform shrink-0" />
                            </button>
                        </div>
                    </NeonCard>
                </div>
            </div>
        </div>
    );
}
