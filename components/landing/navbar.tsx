"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Github, Sliders, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/auth-context";

export function Navbar() {
  const pathname = usePathname() || "";
  const isComponentsPage = pathname.startsWith("/components");
  const isStudioPage = pathname.startsWith("/studio");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-xs bg-[#fafafa] flex items-center justify-center text-[#09090b] shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#fafafa]">Fetch</span>
          <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.2 rounded-xs">
            v2.0
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
          <Link
            href="/components"
            className={`transition-colors hover:text-white ${
              isComponentsPage ? "text-white font-medium underline underline-offset-8 decoration-zinc-600" : ""
            }`}
          >
            Components
          </Link>
          <Link
            href="/studio/button"
            className={`transition-colors hover:text-white ${
              isStudioPage ? "text-white font-medium underline underline-offset-8 decoration-zinc-600" : ""
            }`}
          >
            Studio
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                isDashboardPage ? "text-white font-medium underline underline-offset-8 decoration-zinc-600" : ""
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-zinc-400" />
              <span>Dashboard</span>
            </Link>
          )}
          <a href="/#philosophy" className="hover:text-white transition-colors">
            Philosophy
          </a>
          <a href="/#featured" className="hover:text-white transition-colors">
            Featured
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/azurelikestocode/fetch"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors hidden sm:block"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-2.5 py-1 rounded-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 transition-colors"
                title="Open Member Dashboard"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-3 h-3 text-zinc-400" />
                  )}
                </div>
                <span className="text-xs font-mono text-zinc-300 max-w-[90px] truncate">{user.name.split(" ")[0]}</span>
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded-2xs ${
                    user.role === "Developer" || user.handle?.toLowerCase() === "azurelikestocode"
                      ? "bg-indigo-950/80 border border-indigo-800 text-indigo-300"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                  }`}
                >
                  {user.role === "Developer" || user.handle?.toLowerCase() === "azurelikestocode" ? "Developer" : "User"}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors rounded-xs border border-transparent hover:border-zinc-800"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="h-8 px-3 rounded-xs text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors flex items-center"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="h-8 px-3.5 rounded-xs bg-[#fafafa] hover:bg-zinc-200 text-[#09090b] text-xs font-medium tracking-wide uppercase transition-all active:scale-[0.98] flex items-center gap-1.5"
              >
                <span>Register</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
