"use client";

import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function UserRegistrationPage() {
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("User registered successfully!");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">User Registration</h1>

            <NeonCard glow className="space-y-6">
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="John Doe" className="bg-black/20 border-white/10" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="john@example.com" className="bg-black/20 border-white/10" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input placeholder="+1 234 567 890" className="bg-black/20 border-white/10" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Initial Card Number</Label>
                            <Input placeholder="4576 XXXX XXXX XXXX" className="bg-black/20 border-white/10" required />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label>Address</Label>
                            <Input placeholder="123 Main St, City, Country" className="bg-black/20 border-white/10" required />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label>KYC Document (Optional)</Label>
                            <Input type="file" className="bg-black/20 border-white/10 cursor-pointer" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold py-6 neon-border">
                        Register User
                    </Button>
                </form>
            </NeonCard>
        </div>
    );
}
