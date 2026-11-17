"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Github,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  X,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "../../context/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const isReset = searchParams.get("reset") === "true";

  const { loginWithGitHub, loginWithEmail, isAuthenticated, clearAllCache } = useAuth();

  const [githubHandle, setGithubHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated and not explicitly resetting, redirect
  useEffect(() => {
    if (isReset) {
      clearAllCache();
    } else if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, isReset, redirect, router, clearAllCache]);

  const handleGitHubLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const handle = githubHandle.trim();
    if (!handle) {
      setError("Please enter your GitHub username.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await loginWithGitHub(handle);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate with GitHub.");
      setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  const handleManualReset = () => {
    clearAllCache();
    setError(null);
    setGithubHandle("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-between selection:bg-zinc-800">
      {/* Top Bar */}
      <header className="border-b border-zinc-850 bg-[#09090b]/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-xs bg-[#fafafa] flex items-center justify-center text-[#09090b] shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#fafafa]">Fetch</span>
          <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.2 rounded-xs">
            Sign In
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualReset}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-zinc-850 hover:border-zinc-700 bg-zinc-900/40"
            title="Clear all stored session cache"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Cache</span>
          </button>
          <Link
            href="/"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border border-zinc-850 bg-zinc-950 p-8 rounded-xs shadow-2xl relative animate-fade-in">
          {/* Top Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                GitHub Authentication
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">v2.0</span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
            Sign in to Fetch
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Connect your GitHub handle to unlock all 40+ components, save custom tokens, and export code.
          </p>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300 font-mono flex items-start justify-between gap-2">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* GitHub Username Input Form */}
          <form onSubmit={handleGitHubLogin} className="space-y-3 mb-6">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                GitHub Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-500 font-mono">@</span>
                <input
                  type="text"
                  value={githubHandle}
                  onChange={(e) => setGithubHandle(e.target.value)}
                  placeholder="Enter your GitHub username"
                  className="w-full h-10 pl-7 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs font-mono text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-700 hover:border-zinc-500 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold rounded-xs transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Github className="w-4 h-4 text-zinc-950" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>
          </form>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-zinc-850"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              or email & password
            </span>
            <div className="flex-grow border-t border-zinc-850"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  required
                  className="w-full h-10 pl-9 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] font-mono text-zinc-500 cursor-pointer hover:text-zinc-300">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full h-10 pl-9 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 mt-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium tracking-wide uppercase rounded-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In with Password"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 pt-6 border-t border-zinc-850 text-center">
            <p className="text-xs text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                className="text-white underline underline-offset-4 hover:text-zinc-200 font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Features Strip */}
      <footer className="border-t border-zinc-850 py-4 px-6 bg-[#09090b]/80 text-center text-xs text-zinc-500 font-mono flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
          Verified GitHub Profile Sync
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          Zero external runtime dependencies
        </span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-500 font-mono text-xs">Loading Auth...</div>}>
      <LoginForm />
    </Suspense>
  );
}
