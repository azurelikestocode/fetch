"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
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
  ExternalLink,
  Copy,
  Check,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "../../context/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const urlError = searchParams.get("error");

  const {
    loginWithGoogleOAuth,
    loginWithGitHub,
    loginWithEmail,
    updateProfile,
    isAuthenticated,
  } = useAuth();

  const [email, setEmail] = useState("rbf.rajasukabumi@gmail.com");
  const [password, setPassword] = useState("");
  const [githubHandle, setGithubHandle] = useState("azurelikestocode");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GitHub Device OAuth State
  const [isDeviceOAuthActive, setIsDeviceOAuthActive] = useState(false);
  const [deviceUserCode, setDeviceUserCode] = useState<string | null>(null);
  const [deviceVerificationUri, setDeviceVerificationUri] = useState<string>("https://github.com/login/device");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (urlError === "missing_github_keys") {
      setError("Standard OAuth keys missing. Use the 1-click GitHub Device Flow below.");
    } else if (urlError) {
      setError(`Authentication error: ${urlError}`);
    }
  }, [urlError]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, redirect, router]);

  // Real 1-Click GitHub OAuth Device Flow (Zero config required from user)
  const handleGitHubDeviceOAuth = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/github/device/start", { method: "POST" });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to start GitHub OAuth.");
      }

      setDeviceUserCode(data.user_code);
      setDeviceVerificationUri(data.verification_uri || "https://github.com/login/device");
      setIsDeviceOAuthActive(true);
      setIsAuthorizing(true);

      // Auto-copy user_code to clipboard for maximum convenience
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(data.user_code).catch(() => {});
      }

      // Open GitHub's official verification URI in a new tab
      window.open(data.verification_uri || "https://github.com/login/device", "_blank");

      // Start Polling every 4 seconds
      const deviceCode = data.device_code;
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);

      pollTimerRef.current = setInterval(async () => {
        try {
          const pollRes = await fetch("/api/auth/github/device/poll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceCode }),
          });

          const pollData = await pollRes.json();

          if (pollData.status === "authenticated" && pollData.user) {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current);
            setIsAuthorizing(false);
            setIsDeviceOAuthActive(false);

            // Store in local session context
            localStorage.setItem("fetch_auth_user", JSON.stringify(pollData.user));
            updateProfile(pollData.user);

            // Redirect to dashboard
            router.push(redirect);
          } else if (pollData.status === "error") {
            if (pollTimerRef.current) clearInterval(pollTimerRef.current);
            setIsAuthorizing(false);
            setError(pollData.error || "GitHub authorization failed or expired.");
          }
        } catch {
          // Retry on network glitch
        }
      }, 4000);
    } catch (err: any) {
      setError(err?.message || "Could not connect to GitHub OAuth.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCodeToClipboard = () => {
    if (deviceUserCode && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(deviceUserCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleGoogleClick = () => {
    loginWithGoogleOAuth();
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
        <Link
          href="/"
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
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
                Live GitHub OAuth
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600">v2.0</span>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
            Sign in to Fetch
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Authenticate directly through real GitHub OAuth to unlock all 40+ components, save custom tokens, and export code.
          </p>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-800/80 rounded-xs text-xs text-red-300 font-mono flex items-start justify-between gap-2">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Real GitHub OAuth 1-Click Button */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={handleGitHubDeviceOAuth}
              disabled={isSubmitting || isAuthorizing}
              className="w-full h-11 px-4 border border-zinc-700 hover:border-zinc-500 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold rounded-xs transition-all flex items-center justify-between active:scale-[0.99] disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-zinc-950" />
                <span>Continue with GitHub (Real OAuth)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-700" />
            </button>

            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isSubmitting || isAuthorizing}
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
                <span>Continue with Google</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>

          {/* Direct Public Handle Sync Fallback */}
          <div className="mb-6 p-3 bg-zinc-900/40 border border-zinc-850 rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-zinc-400">
                Or sync via GitHub handle:
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
                className="h-8 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono rounded-xs transition-colors cursor-pointer"
              >
                Sync
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
          Official GitHub OAuth Device Flow
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          Verified GitHub Emails & User Profile
        </span>
      </footer>

      {/* GitHub Real OAuth Live Authorization Modal */}
      {isDeviceOAuthActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-6 sm:p-8 rounded-xs shadow-2xl relative text-center">
            <button
              onClick={() => {
                if (pollTimerRef.current) clearInterval(pollTimerRef.current);
                setIsDeviceOAuthActive(false);
                setIsAuthorizing(false);
              }}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-750 flex items-center justify-center mx-auto mb-4">
              <Github className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-base font-semibold text-white mb-1.5">Authorize with GitHub</h2>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              A GitHub authorization window has opened. Enter or confirm this 8-character verification code to complete sign-in:
            </p>

            {/* Verification Code Box */}
            <div className="mb-6 p-4 bg-zinc-900 border border-zinc-750 rounded-xs flex flex-col items-center justify-center gap-2">
              <div className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-emerald-400 select-all">
                {deviceUserCode}
              </div>
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Click to Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Polling Status */}
            <div className="flex items-center justify-center gap-2.5 text-xs font-mono text-zinc-400 mb-6 py-2 px-3 bg-zinc-900/60 border border-zinc-800 rounded-xs">
              <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin flex-shrink-0" />
              <span>Waiting for GitHub confirmation...</span>
            </div>

            <div className="space-y-3">
              <a
                href={deviceVerificationUri}
                target="_blank"
                rel="noreferrer"
                className="w-full h-10 px-4 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold uppercase font-mono rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Re-open GitHub Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (pollTimerRef.current) clearInterval(pollTimerRef.current);
                  setIsDeviceOAuthActive(false);
                  setIsAuthorizing(false);
                }}
                className="w-full text-xs font-mono text-zinc-500 hover:text-zinc-300 py-1"
              >
                Cancel OAuth Flow
              </button>
            </div>
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
