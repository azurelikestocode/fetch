"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, Github, Mail, Lock, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const { loginWithOAuth, loginWithEmail, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const handleOAuth = async (provider: "github" | "google") => {
    try {
      setIsSubmitting(true);
      setError(null);
      await loginWithOAuth(provider);
      router.push(redirect);
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      await loginWithEmail(email);
      router.push(redirect);
    } catch {
      setError("Failed to authenticate.");
    } finally {
      setIsSubmitting(false);
    }
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
            Auth
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border border-zinc-850 bg-zinc-950 p-8 rounded-xs shadow-2xl relative animate-fade-in">
          {/* Subtle top indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Secure Session
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">v2.0</span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
            Sign in to Fetch
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Unlock all 40+ production components, live customizer tokens, and instant code export.
          </p>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300 font-mono">
              {error}
            </div>
          )}

          {/* 1-Click Social Auth Providers */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              <span>Continue with GitHub</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              or email
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
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
                  placeholder="••••••••••••"
                  required
                  className="w-full h-10 pl-9 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 mt-2 bg-white hover:bg-zinc-200 text-[#09090b] text-xs font-medium tracking-wide uppercase rounded-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Studio"}</span>
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
                Register free
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Features Strip */}
      <footer className="border-t border-zinc-850 py-4 px-6 bg-[#09090b]/80 text-center text-xs text-zinc-500 font-mono flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
          40+ Production Components Unlocked
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
