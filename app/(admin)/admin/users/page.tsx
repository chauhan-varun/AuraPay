"use client";

import { useState } from "react";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, UserPlus, CreditCard, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminUserRegistrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        initialCardNumber: "",
        address: "",
        kycDocument: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, kycDocument: e.target.files ? e.target.files[0] : null });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // In a real app, we'd upload the file first and get a URL
            // For this demo, we'll just pass the metadata

            const response = await fetch("/api/admin/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    initialCardNumber: formData.initialCardNumber,
                    address: formData.address,
                    kycDocument: formData.kycDocument ? formData.kycDocument.name : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register user");
            }

            toast.success(`New user created ${data.user.name} and the password is ${data.password}`);
            // Reset form or redirect
            router.push("/admin/dashboard");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to register user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">User Registration</h1>
                <p className="text-sm md:text-base text-zinc-400">Manually register a new user with full details</p>
            </div>

            <NeonCard glow className="p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                placeholder="+1 234 567 890"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="initialCardNumber" className="text-zinc-300">Initial Card Number</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="initialCardNumber"
                                    name="initialCardNumber"
                                    value={formData.initialCardNumber}
                                    onChange={handleChange}
                                    className="pl-10 bg-black/20 border-white/10 focus:border-primary/50 text-white"
                                    placeholder="4576 XXXX XXXX XXXX"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-zinc-300">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-black/20 border-white/10 focus:border-primary/50 text-white"
                            placeholder="123 Main St, City, Country"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="kycDocument" className="text-zinc-300">KYC Document (Optional)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="kycDocument"
                                name="kycDocument"
                                type="file"
                                onChange={handleChange}
                                className="bg-black/20 border-white/10 focus:border-primary/50 text-white file:bg-white/10 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-4 file:hover:bg-white/20"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white h-11 md:h-12 text-base md:text-lg"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4 md:h-5 md:w-5" />}
                            Register User
                        </Button>
                    </div>
                </form>
            </NeonCard>
        </div>
    );
}
