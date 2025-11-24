"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NeonCard } from "@/components/NeonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    CreditCard,
    Smartphone,
    Banknote,
    Users,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = "card" | "upi" | "cash" | "p2p";

export default function TopUpPage() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Payment details state
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [upiId, setUpiId] = useState("");
    const [depositCode, setDepositCode] = useState("");
    const [contactId, setContactId] = useState("");

    const paymentMethods = [
        { id: "card" as PaymentMethod, name: "Card", icon: CreditCard },
        { id: "upi" as PaymentMethod, name: "UPI", icon: Smartphone },
        { id: "cash" as PaymentMethod, name: "Cash Deposit", icon: Banknote },
        { id: "p2p" as PaymentMethod, name: "P2P / Contact", icon: Users },
    ];

    const handleTopUp = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        // Validate payment details based on method
        if (selectedMethod === "card") {
            if (!cardNumber || !cardExpiry || !cardCVV) {
                toast.error("Please fill in all card details");
                return;
            }
        } else if (selectedMethod === "upi") {
            if (!upiId) {
                toast.error("Please enter UPI ID");
                return;
            }
        } else if (selectedMethod === "cash") {
            if (!depositCode) {
                toast.error("Please enter deposit code");
                return;
            }
        } else if (selectedMethod === "p2p") {
            if (!contactId) {
                toast.error("Please enter contact ID");
                return;
            }
        }

        setLoading(true);

        try {
            // Call API to update balance
            const response = await fetch("/api/balance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: parseFloat(amount) }),
            });

            if (!response.ok) {
                const error = await response.json();
                toast.error(error.error || "Failed to process payment");
                setLoading(false);
                return;
            }

            const data = await response.json();

            setSuccess(true);
            setLoading(false);

            const formattedAmount = parseFloat(amount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            toast.success(`₹${formattedAmount} added successfully!`, {
                description: "Your balance has been updated"
            });

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Error processing top-up:", error);
            toast.error("Failed to process payment. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <NeonCard className="max-w-md w-full text-center" glow>
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 w-20 h-20 bg-green-600/20 rounded-full blur-xl animate-pulse" />
                            <CheckCircle2 className="w-20 h-20 text-green-400 relative z-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Top Up Successful!</h2>
                            <p className="text-zinc-400">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} has been added to your balance</p>
                        </div>
                        <p className="text-sm text-zinc-500">Redirecting to dashboard...</p>
                    </div>
                </NeonCard>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Top Up</h1>
                <p className="text-zinc-400">Choose a payment method to add funds</p>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-6 rounded-xl border transition-all ${selectedMethod === method.id
                                ? "bg-primary/20 border-primary neon-border"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                }`}
                        >
                            <Icon className={`h-8 w-8 mx-auto mb-3 ${selectedMethod === method.id ? "text-primary" : "text-zinc-400"
                                }`} />
                            <p className={`text-sm font-medium ${selectedMethod === method.id ? "text-white" : "text-zinc-400"
                                }`}>
                                {method.name}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Payment Details Form */}
            <NeonCard glow>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Payment Details</h2>

                        {/* Amount Input */}
                        <div className="space-y-2 mb-6">
                            <Label htmlFor="amount" className="text-sm font-medium text-zinc-300">
                                Amount (INR)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">₹</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white text-lg pl-10 placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20"
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                {[1000, 5000, 10000, 25000].map((preset) => (
                                    <Button
                                        key={preset}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setAmount(preset.toString())}
                                        className="border-white/10 bg-white/5 hover:bg-white/10 text-xs"
                                    >
                                        ₹{preset.toLocaleString('en-IN')}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Card Payment */}
                        {selectedMethod === "card" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-sm font-medium text-zinc-300">
                                        Card Number
                                    </Label>
                                    <Input
                                        id="cardNumber"
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        maxLength={19}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardExpiry" className="text-sm font-medium text-zinc-300">
                                            Expiry Date
                                        </Label>
                                        <Input
                                            id="cardExpiry"
                                            type="text"
                                            placeholder="MM/YY"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            maxLength={5}
                                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cardCVV" className="text-sm font-medium text-zinc-300">
                                            CVV
                                        </Label>
                                        <Input
                                            id="cardCVV"
                                            type="text"
                                            placeholder="123"
                                            value={cardCVV}
                                            onChange={(e) => setCardCVV(e.target.value)}
                                            maxLength={3}
                                            className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* UPI */}
                        {selectedMethod === "upi" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="upiId" className="text-sm font-medium text-zinc-300">
                                        UPI ID
                                    </Label>
                                    <Input
                                        id="upiId"
                                        type="text"
                                        placeholder="yourname@upi"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500">
                                    Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
                                </p>
                            </div>
                        )}

                        {/* Cash Deposit */}
                        {selectedMethod === "cash" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="depositCode" className="text-sm font-medium text-zinc-300">
                                        Deposit Code
                                    </Label>
                                    <Input
                                        id="depositCode"
                                        type="text"
                                        placeholder="Enter deposit code from ATM/Bank"
                                        value={depositCode}
                                        onChange={(e) => setDepositCode(e.target.value)}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500">
                                    Visit any authorized cash deposit center and use the code provided after deposit
                                </p>
                            </div>
                        )}

                        {/* P2P / Contact */}
                        {selectedMethod === "p2p" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactId" className="text-sm font-medium text-zinc-300">
                                        Contact ID / Mobile Number
                                    </Label>
                                    <Input
                                        id="contactId"
                                        type="text"
                                        placeholder="Enter contact ID or mobile number"
                                        value={contactId}
                                        onChange={(e) => setContactId(e.target.value)}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500">
                                    Request funds from another AuraPay user
                                </p>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleTopUp}
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 neon-border"
                    >
                        {loading ? (
                            <><Loader2 className="animate-spin mr-2" /> Processing...</>
                        ) : (
                            `Confirm Top Up ${amount ? `- ₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : ""}`
                        )}
                    </Button>
                </div>
            </NeonCard>
        </div>
    );
}
