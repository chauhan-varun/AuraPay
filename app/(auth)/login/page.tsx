"use client";

import { useState } from "react";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string; name?: string } = {};

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

        if (isSignUp && !name) {
            newErrors.name = "Name is required";
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
            if (isSignUp) {
                // Sign up
                const result = await authClient.signUp.email({
                    email,
                    password,
                    name,
                });

                if (result?.error) {
                    toast.error(result.error.message || "Failed to create account");
                    setLoading(false);
                    return;
                }

                if (!result?.data) {
                    toast.error("Failed to create account. Please try again.");
                    setLoading(false);
                    return;
                }

                toast.success("Account created successfully!");
                router.push("/dashboard");
            } else {
                // Sign in
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

                toast.success("Logged in successfully!");
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.error("Auth error:", error);
            const errorMessage = error?.message || error?.toString() || (isSignUp ? "Failed to create account" : "Login failed");
            toast.error(errorMessage);

            // Handle specific error cases
            if (errorMessage.toLowerCase().includes("not found") || errorMessage.toLowerCase().includes("user")) {
                setErrors({ email: "No account found with this email" });
            } else if (errorMessage.toLowerCase().includes("password")) {
                setErrors({ password: "Incorrect password" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <NeonCard className="w-full max-w-md z-10" glow>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className="text-zinc-400">
                        {isSignUp ? "Sign up to get started with AuraPay" : "Sign in to access your dashboard"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
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
                                className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20"
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        {isSignUp && !errors.password && (
                            <p className="text-zinc-500 text-xs mt-1">Must be at least 8 characters long</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 neon-border"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : isSignUp ? (
                            "Create Account"
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setErrors({});
                        }}
                        className="text-sm text-zinc-400 hover:text-primary transition-colors"
                    >
                        {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                    </button>
                </div>
            </NeonCard>
        </div>
    );
}
