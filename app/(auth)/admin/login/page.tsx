"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2, Mail, Lock, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [showContent, setShowContent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setShowContent(true);
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // First, check if user is admin via our API
            const checkResponse = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const checkData = await checkResponse.json();

            if (!checkResponse.ok) {
                // Handle error responses
                toast.error(checkData.error || "Login failed");

                if (checkData.error?.toLowerCase().includes("not found")) {
                    setErrors({ email: "No account found with this email" });
                } else if (checkData.error?.toLowerCase().includes("admin")) {
                    setErrors({ email: "This account does not have admin privileges" });
                }

                setLoading(false);
                return;
            }

            // User is admin, now authenticate with better-auth
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result?.error) {
                const errorMessage = result.error.message || "Invalid email or password";
                toast.error(errorMessage);

                // Set form errors for better UX
                if (errorMessage.toLowerCase().includes("not found")) {
                    setErrors({ email: "No account found with this email" });
                } else if (errorMessage.toLowerCase().includes("password")) {
                    setErrors({ password: "Incorrect password" });
                }

                setLoading(false);
                return;
            }

            if (!result?.data) {
                toast.error("Login failed. Please check your credentials.");
                setLoading(false);
                return;
            }

            // Success
            toast.success("Admin login successful!");

            // Small delay to ensure cookies are set
            await new Promise(resolve => setTimeout(resolve, 100));

            // Redirect to admin dashboard
            window.location.href = "/admin/dashboard";
        } catch (error: any) {
            console.error("Admin login error:", error);
            toast.error(error?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Back to Home Link */}
            <Link href="/" className={`fixed top-6 left-6 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300 hover:gap-3 ${showContent ? "opacity-100" : "opacity-0"
                }`}>
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
            </Link>

            {/* Main Content */}
            <div className={`w-full max-w-md z-10 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                            <Image
                                src="/logo.svg"
                                alt="AuraPay"
                                width={60}
                                height={60}
                                className="relative drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold neon-gradient-text mb-2">AuraPay Admin</h1>
                    <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Admin Portal</span>
                    </div>
                </div>

                <NeonCard className="w-full backdrop-blur-md bg-black/40" glow>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Admin Login
                        </h2>
                        <p className="text-sm md:text-base text-zinc-400">
                            Sign in with your admin credentials
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@aurapay.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-11 bg-black/30 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20 h-12"
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                {errors.email}
                            </p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-11 bg-black/30 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20 h-12"
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                {errors.password}
                            </p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-base neon-border transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] mt-6"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Sign In as Admin"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-zinc-400 hover:text-primary transition-colors font-medium"
                        >
                            Not an admin? <span className="text-primary underline underline-offset-2">User login</span>
                        </Link>
                    </div>
                </NeonCard>

                {/* Additional Info */}
                <p className="text-center text-xs text-zinc-500 mt-6">
                    By continuing, you agree to AuraPay's Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
