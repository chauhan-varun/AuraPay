import { cn } from "@/lib/utils";
import React from "react";

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
}

export function NeonCard({ children, className, glow = false, ...props }: NeonCardProps) {
    return (
        <div
            className={cn(
                "glass-card rounded-xl p-6 transition-all duration-300 hover:bg-white/10",
                glow && "neon-border border-primary/50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
