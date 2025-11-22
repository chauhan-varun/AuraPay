"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold neon-text">Settings</h1>

            <div className="space-y-6">
                {/* Profile Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" /> Profile Information
                    </h2>
                    <NeonCard className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input defaultValue="Mike Johns" className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue="mike@example.com" disabled className="bg-white/5 border-white/10 opacity-50" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input defaultValue="+1 234 567 890" className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input defaultValue="123 Neon St, Cyber City" className="bg-white/5 border-white/10" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </NeonCard>
                </section>

                {/* Security Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" /> Security
                    </h2>
                    <NeonCard className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-zinc-400">Add an extra layer of security</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Change Password</p>
                                <p className="text-sm text-zinc-400">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline" className="border-white/10">Update</Button>
                        </div>
                    </NeonCard>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" /> Notifications
                    </h2>
                    <NeonCard className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Transaction Alerts</p>
                                <p className="text-sm text-zinc-400">Receive alerts for all transactions</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Marketing Emails</p>
                                <p className="text-sm text-zinc-400">Receive updates about new features</p>
                            </div>
                            <Switch />
                        </div>
                    </NeonCard>
                </section>
            </div>
        </div>
    );
}
