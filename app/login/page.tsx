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
  Settings,
  ExternalLink,
  Key,
  X,
} from "lucide-react";
import { useAuth } from "../../context/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const urlError = searchParams.get("error");

  const {
    loginWithGitHubOAuth,
    loginWithGoogleOAuth,
    loginWithGitHub,
    loginWithEmail,
    isAuthenticated,
  } = useAuth();

  const [email, setEmail] = useState("rbf.rajasukabumi@gmail.com");
  const [password, setPassword] = useState("");
  const [githubHandle, setGithubHandle] = useState("azurelikestocode");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OAuth Config State
  const [oauthStatus, setOauthStatus] = useState<{
    githubConfigured: boolean;
    googleConfigured: boolean;
  }>({ githubConfigured: false, googleConfigured: false });

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupClientId, setSetupClientId] = useState("");
  const [setupClientSecret, setSetupClientSecret] = useState("");
  const [isSavingKeys, setIsSavingKeys] = useState(false);

  useEffect(() => {
    fetch("/api/auth/status")
      .then((res) => res.json())
      .then((data) => {
        setOauthStatus(data);
      })
      .catch(() => {});

    if (urlError === "missing_github_keys") {
      setShowSetupModal(true);
      setError("GitHub OAuth requires Client ID and Secret in .env.local.");
    } else if (urlError === "missing_google_keys") {
      setError("Google OAuth requires Client ID and Secret in .env.local.");
    } else if (urlError) {
      setError(`Authentication error: ${urlError}`);
    }
  }, [urlError]);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  const handleGitHubClick = () => {
    if (oauthStatus.githubConfigured) {
      // Direct real OAuth redirect
      loginWithGitHubOAuth();
    } else {
      // Open Setup Modal or trigger /api/auth/github
      loginWithGitHubOAuth();
    }
  };

  const handleGoogleClick = () => {
    loginWithGoogleOAuth();
  };

  const handleSaveOAuthKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupClientId.trim() || !setupClientSecret.trim()) {
      setError("Please provide both Client ID and Client Secret.");
      return;
    }
    setIsSavingKeys(true);
    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          githubClientId: setupClientId,
          githubClientSecret: setupClientSecret,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOauthStatus((prev) => ({ ...prev, githubConfigured: true }));
        setShowSetupModal(false);
        // Immediately start OAuth flow!
        window.location.href = "/api/auth/github";
      } else {
        setError(data.error || "Failed to save OAuth credentials.");
      }
    } catch {
      setError("Could not save settings.");
    } finally {
      setIsSavingKeys(false);
    }
  };

  const handlePublicGitHubLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      await loginWithGitHub(githubHandle);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate with GitHub.");
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
      await loginWithEmail(email, password);
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || "Failed to authenticate. Please check your credentials.");
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
            OAuth 2.0
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSetupModal(true)}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60"
            title="Configure OAuth Application Keys"
          >
            <Key className="w-3.5 h-3.5 text-zinc-400" />
            <span>OAuth Keys</span>
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
          {/* Subtle top indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Official OAuth 2.0
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">v2.0</span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
            Sign in to Fetch
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Authenticate directly via your real GitHub or Google account using standard OAuth authorization.
          </p>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300 font-mono flex items-start justify-between gap-2">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Real OAuth Providers */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={handleGitHubClick}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-between active:scale-[0.99] disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4" />
                <span>Continue with GitHub (Real OAuth)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isSubmitting}
              className="w-full h-10 px-4 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-850 text-xs font-medium text-white rounded-xs transition-all flex items-center justify-between active:scale-[0.99] disabled:opacity-50"
            >
              <div className="flex items-center gap-2.5">
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
                <span>Continue with Google (OAuth)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>

          {/* Quick Fallback: Instant Public Handle Link without keys */}
          <div className="mb-6 p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-zinc-400">
                Or connect with GitHub handle:
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Instant</span>
            </div>
            <form onSubmit={handlePublicGitHubLogin} className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-2 text-xs text-zinc-500 font-mono">@</span>
                <input
                  type="text"
                  value={githubHandle}
                  onChange={(e) => setGithubHandle(e.target.value)}
                  placeholder="azurelikestocode"
                  className="w-full h-8 pl-6 pr-2 bg-zinc-950 border border-zinc-800 focus:border-zinc-600 text-xs font-mono text-white rounded-xs outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-8 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono rounded-xs transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              or email & password
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
                  placeholder="rbf.rajasukabumi@gmail.com"
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
              className="w-full h-10 mt-2 bg-white hover:bg-zinc-200 text-[#09090b] text-xs font-medium tracking-wide uppercase rounded-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In with Credentials"}</span>
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
          Real OAuth 2.0 Protocol
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          Verified Email & Token Authorization
        </span>
      </footer>

      {/* OAuth Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg border border-zinc-800 bg-zinc-950 p-6 rounded-xs shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-white" />
                <h2 className="text-sm font-semibold text-white">Setup Real GitHub OAuth App</h2>
              </div>
              <button
                onClick={() => setShowSetupModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              To let users authorize via real GitHub OAuth, you just need a free GitHub OAuth App. It takes 30 seconds to create:
            </p>

            <div className="space-y-3 mb-5 p-3.5 bg-zinc-900/60 border border-zinc-850 rounded-xs text-xs font-mono">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <div>
                  <a
                    href="https://github.com/settings/applications/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-sans font-medium"
                  >
                    <span>Click here to open GitHub OAuth Application Register</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <div>
                  <span className="text-zinc-400">Set Homepage URL:</span>{" "}
                  <code className="text-white bg-zinc-800 px-1 py-0.5 rounded-xs">http://localhost:3000</code>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <div>
                  <span className="text-zinc-400">Set Authorization callback URL:</span>{" "}
                  <code className="text-white bg-zinc-800 px-1 py-0.5 rounded-xs">http://localhost:3000/api/auth/callback/github</code>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveOAuthKeys} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  GitHub Client ID
                </label>
                <input
                  type="text"
                  value={setupClientId}
                  onChange={(e) => setSetupClientId(e.target.value)}
                  placeholder="e.g. Ov23li..."
                  required
                  className="w-full h-9 px-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs font-mono text-white rounded-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  GitHub Client Secret
                </label>
                <input
                  type="password"
                  value={setupClientSecret}
                  onChange={(e) => setSetupClientSecret(e.target.value)}
                  placeholder="Generated Client Secret"
                  required
                  className="w-full h-9 px-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs font-mono text-white rounded-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={() => setShowSetupModal(false)}
                  className="text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingKeys}
                  className="h-8 px-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-medium uppercase font-mono rounded-xs disabled:opacity-50"
                >
                  {isSavingKeys ? "Saving..." : "Save & Authorize"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
