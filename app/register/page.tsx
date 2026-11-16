"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, Github, Mail, Lock, User as UserIcon, CheckCircle2, ArrowLeft, Shield, Sparkle } from "lucide-react";
import { useAuth } from "../../context/auth-context";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const { registerWithEmail, loginWithGitHub, loginWithGoogle, isAuthenticated } = useAuth();
  const [name, setName] = useState("Azure");
  const [email, setEmail] = useState("rbf.rajasukabumi@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const handleGitHubAuth = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await loginWithGitHub("azurelikestocode");
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "GitHub authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await loginWithGoogle("rbf.rajasukabumi@gmail.com", "Azure");
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Google authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      await registerWithEmail(name, email, password);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
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
            Join
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
          {/* Top Indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 rounded-xs flex items-center gap-1.5">
              <Sparkle className="w-3 h-3 text-emerald-400" />
              Free Developer Access
            </span>
            <span className="text-[11px] font-mono text-zinc-600">40+ Unlocked</span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
            Create your account
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Create a real developer account to unlock all 40+ components, save custom token presets, and export source code.
          </p>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300 font-mono">
              {error}
            </div>
          )}

          {/* Social Sign Up Options */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={handleGitHubAuth}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              <span>Connect with GitHub (@azurelikestocode)</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-50"
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
              or register with email
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                Full Name / Alias
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Azure"
                  required
                  className="w-full h-10 pl-9 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

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
                  placeholder="rbf.rajasukabumi@gmail.com"
                  required
                  className="w-full h-10 pl-9 pr-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white placeholder-zinc-600 rounded-xs outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
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
              <span>{isSubmitting ? "Creating Account..." : "Create Account & Unlock All"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-6 border-t border-zinc-850 text-center">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                className="text-white underline underline-offset-4 hover:text-zinc-200 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Features Strip */}
      <footer className="border-t border-zinc-850 py-4 px-6 bg-[#09090b]/80 text-center text-xs text-zinc-500 font-mono flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
          No credit card required
        </span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-zinc-400" />
          Instant full unlock of all 40+ components
        </span>
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-500 font-mono text-xs">Loading Register...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
