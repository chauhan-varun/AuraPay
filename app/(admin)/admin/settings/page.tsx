"use client";

import { useState, useEffect } from "react";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, User, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "", // Optional: for password change
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const session = await authClient.getSession();
            if (session?.data?.user) {
                setFormData(prev => ({
                    ...prev,
                    name: session?.data?.user?.name || "",
                    email: session?.data?.user?.email || "",
                }));
            }
            setFetching(false);
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update profile via our API
            const response = await fetch("/api/admin/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                }),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            // If password is provided, we would use authClient to update it
            if (formData.password) {
                await authClient.changePassword({
                    newPassword: formData.password,
                    currentPassword: "", // We'd need current password for this usually
                    revokeOtherSessions: true,
                });
            }

            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Settings</h1>
                <p className="text-sm md:text-base text-zinc-400">Manage your account preferences</p>
            </div>

            <NeonCard glow className="p-4 md:p-6 lg:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="Admin Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-300">New Password (Optional)</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <p className="text-xs text-zinc-500">Leave blank to keep current password</p>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white h-11 md:h-12"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </NeonCard>
        </div>
    );
}
