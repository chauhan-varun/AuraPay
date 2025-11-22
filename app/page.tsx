"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NeonCard } from "@/components/NeonCard";
import { User, ShieldCheck, Sparkles, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content animation slightly for better effect
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Video Background with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          style={{ filter: 'blur(2px) brightness(0.9)' }}
        >
          <source src="/Landing_Page_Animation.mp4" type="video/mp4" />
        </video>
        {/* Professional dark overlay with gradient */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/40 to-blue-900/20" />
      </div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-zinc-400 animate-pulse">Loading AuraPay...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className={`p-4 md:p-6 transition-all duration-1000 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="AuraPay"
                  width={40}
                  height={40}
                  className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold neon-gradient-text">AuraPay</h1>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="/login"
                className="text-sm md:text-base text-zinc-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-4 md:px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm md:text-base font-medium transition-all hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-start px-4 md:px-6 py-8 md:py-16 mt-12 md:mt-24 lg:mt-32">
          <div className="container mx-auto max-w-7xl ml-0 md:ml-[6%] lg:ml-[10%]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Left Column - Text Content */}
              <div className={`lg:col-span-3 space-y-6 md:space-y-8 lg:space-y-10 transition-all duration-1000 delay-500 ${showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs md:text-sm text-white font-medium">Next-Gen Digital Banking</span>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                    The Future of{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
                      Digital Finance
                    </span>
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-100 leading-relaxed max-w-2xl font-light">
                    Experience seamless transactions, intelligent card management, and secure banking—all in one elegant platform.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-4">
                  <div className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
                    <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">Instant Transfers</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
                    <Shield className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                    <span className="text-xs md:text-sm font-medium">Bank-Level Security</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                    <span className="text-xs md:text-sm font-medium">Smart Analytics</span>
                  </div>
                </div>

              </div>
            </div>

            {/* CTA Button - Bottom Center */}
            {/* <div className={`mt-16 md:mt-24 flex justify-center transition-all duration-1000 delay-900 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
              <Link href="/login" className="group">
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105">
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div> */}
          </div>
        </div>

        {/* Admin Access - Bottom Right Corner */}
        <Link href="/admin/login" className={`fixed bottom-6 right-6 z-50 group transition-all duration-1000 delay-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative px-4 py-3 bg-black/60 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-105 cursor-pointer rounded-xl shadow-lg shadow-black/30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300 hidden sm:inline">Admin Portal</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Footer */}
        <footer className={`p-6 border-t border-white/10 backdrop-blur-sm transition-all duration-1000 delay-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="container mx-auto text-center text-sm text-zinc-500">
            <p>© 2025 AuraPay. Powered by next-generation fintech.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
