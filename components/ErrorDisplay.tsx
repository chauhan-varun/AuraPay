import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeonCard } from "@/components/NeonCard";

interface ErrorDisplayProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorDisplay({
    title = "Something went wrong",
    message,
    onRetry
}: ErrorDisplayProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-4">
            <NeonCard className="max-w-md w-full" glow>
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 w-16 h-16 bg-red-600/20 rounded-full blur-xl" />
                        <AlertCircle className="w-16 h-16 text-red-400 relative z-10" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                        <p className="text-zinc-400">{message}</p>
                    </div>

                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            className="bg-primary hover:bg-primary/90 text-white gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    )}
                </div>
            </NeonCard>
        </div>
    );
}
