"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/Loader";
import { User, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    // Profile fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Password fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const session = await authClient.getSession();

            if (!session?.data?.user) {
                router.push("/login");
                return;
            }

            const response = await fetch("/api/profile");
            if (response.ok) {
                const data = await response.json();
                setName(data.name || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        if (!name || !email) {
            toast.error("Name and email are required");
            return;
        }

        setSaving(true);
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, address }),
            });

            if (!response.ok) {
                const error = await response.json();
                toast.error(error.error || "Failed to update profile");
                setSaving(false);
                return;
            }

            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All password fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setChangingPassword(true);
        try {
            const response = await fetch("/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
                const error = await response.json();
                toast.error(error.error || "Failed to change password");
                setChangingPassword(false);
                return;
            }

            toast.success("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return <Loader message="Loading settings..." />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-zinc-400">Manage your account settings and preferences</p>
            </div>

            {/* Profile Information */}
            <NeonCard glow>
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold">Profile Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mike@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-zinc-300">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 234 567 890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium text-zinc-300">
                                Address
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                placeholder="123 Neon St, Cyber City"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="bg-primary hover:bg-primary/90 text-white font-bold neon-border"
                    >
                        {saving ? (
                            <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving...</>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </NeonCard>

            {/* Security */}
            <NeonCard glow>
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold">Security</h2>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-sm font-medium text-zinc-300">
                                    Current Password
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium text-zinc-300">
                                    New Password
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                />
                                <p className="text-xs text-zinc-500">Must be at least 8 characters</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-300">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                />
                            </div>

                            <Button
                                onClick={handleChangePassword}
                                disabled={changingPassword}
                                className="bg-primary hover:bg-primary/90 text-white font-bold neon-border"
                            >
                                {changingPassword ? (
                                    <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Updating...</>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </NeonCard>
        </div>
    );
}
