import { Loader2 } from "lucide-react";

export function Loader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="relative">
                <div className="absolute inset-0 w-16 h-16 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
            </div>
            <p className="mt-4 text-zinc-400">{message}</p>
        </div>
    );
}
