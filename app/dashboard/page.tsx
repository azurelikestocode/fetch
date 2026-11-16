"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  Star,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Code2,
  Terminal,
  Grid,
  Palette,
  Github,
  Edit3,
  Clock,
  X,
  User as UserIcon,
} from "lucide-react";
import { useAuth, User } from "../../context/auth-context";
import { TEMPLATES } from "../../lib/templates";
import { TemplateCard } from "../../components/catalog/template-card";
import { THEME_PRESETS, PresetTheme } from "../../lib/tokens";

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    updateProfile,
    favorites,
    recentActivity,
    exportCount,
  } = useAuth();

  const [activeThemeId, setActiveThemeId] = useState<string>("default");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editHandle, setEditHandle] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/dashboard");
    }
    if (user) {
      setEditName(user.name);
      setEditBio(user.bio || "");
      setEditAvatar(user.avatar);
      setEditHandle(user.handle || "");
    }
  }, [isLoading, isAuthenticated, router, user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400 font-mono text-xs">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin mb-3"></div>
        <span>Loading Member Console...</span>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || user.name,
      bio: editBio.trim(),
      avatar: editAvatar.trim() || user.avatar,
      handle: editHandle.trim() || user.handle,
    });
    setIsEditModalOpen(false);
  };

  const favoriteTemplates = favorites.map((id) => TEMPLATES[id]).filter(Boolean);
  const recentTemplates = recentActivity
    .map((id) => TEMPLATES[id])
    .filter(Boolean);

  const featuredStudioLaunchers = [
    TEMPLATES["action-dock"],
    TEMPLATES["metric-sparkline"],
    TEMPLATES["pricing-card"],
    TEMPLATES["bento-card"],
  ].filter(Boolean);

  const currentTheme: PresetTheme = THEME_PRESETS[activeThemeId] || THEME_PRESETS.default;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-zinc-800">
      {/* Top Bar */}
      <header className="border-b border-zinc-850 bg-[#09090b]/80 backdrop-blur-md px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-xs bg-[#fafafa] flex items-center justify-center text-[#09090b] shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#fafafa]">Fetch</span>
          <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.2 rounded-xs">
            Member Console
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/components"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1.5"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Components</span>
          </Link>
          <Link
            href="/studio/button"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio</span>
          </Link>
          <button
            onClick={logout}
            className="h-8 px-3 rounded-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-850 text-xs font-mono text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* User Profile Hero */}
        <div className="border border-zinc-850 bg-zinc-950 p-6 sm:p-8 rounded-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700 p-0.5 bg-zinc-900 flex-shrink-0 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{user.name}</h1>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-emerald-950/80 border border-emerald-800 text-emerald-400 rounded-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Pro Architect
                </span>
                {user.handle && (
                  <a
                    href={user.provider === "github" ? `https://github.com/${user.handle}` : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-zinc-400 hover:text-white border border-zinc-800 px-2 py-0.5 rounded-xs flex items-center gap-1 bg-zinc-900/60 transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>@{user.handle}</span>
                  </a>
                )}
              </div>
              <p className="text-xs font-mono text-zinc-400 mb-1.5">{user.email}</p>
              {user.bio && <p className="text-xs text-zinc-400 max-w-lg mb-2">{user.bio}</p>}
              <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500">
                <span>All 40 components unlocked</span>
                <span>•</span>
                <span>Active session</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="h-9 px-3.5 rounded-xs border border-zinc-800 hover:border-zinc-600 bg-zinc-900/80 hover:bg-zinc-850 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <Link
              href="/components"
              className="h-9 px-4 rounded-xs bg-white hover:bg-zinc-200 text-[#09090b] text-xs font-medium uppercase tracking-wide flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-Stat Metric Strip (Replaced License Tier with Design Presets & Exports) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-4 border border-zinc-850 bg-zinc-950 rounded-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-zinc-400" />
              Components
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">40 / 40</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">100% Unlocked</div>
          </div>

          <div className="p-4 border border-zinc-850 bg-zinc-950 rounded-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-zinc-400" />
              Saved Favorites
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{favorites.length}</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              {favorites.length === 0 ? "Star components to pin" : "Pinned for quick access"}
            </div>
          </div>

          <div className="p-4 border border-zinc-850 bg-zinc-950 rounded-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
              <Code2 className="w-3 h-3 text-zinc-400" />
              Studio Exports
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{exportCount}</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">TSX, HTML & CSS copied</div>
          </div>

          <div className="p-4 border border-zinc-850 bg-zinc-950 rounded-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-zinc-400" />
              Active Theme
            </div>
            <div className="text-lg font-bold text-white tracking-tight truncate">{currentTheme.name}</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              Radius: {currentTheme.tokens.radius}px
            </div>
          </div>
        </div>

        {/* Global Design Token Preset Switcher */}
        <section className="mb-10 p-5 border border-zinc-850 bg-zinc-950/70 rounded-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-zinc-400" />
                <h3 className="text-sm font-semibold text-white">Global Theme Token Switcher</h3>
              </div>
              <p className="text-xs text-zinc-400">
                Select an architectural design preset to test across the entire component library.
              </p>
            </div>
            <Link
              href="/studio/button"
              className="text-xs font-mono text-zinc-400 hover:text-white inline-flex items-center gap-1"
            >
              <span>Fine-tune in Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.values(THEME_PRESETS).map((preset) => {
              const isSelected = activeThemeId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveThemeId(preset.id)}
                  className={`p-3 text-left border rounded-xs transition-all cursor-pointer ${
                    isSelected
                      ? "border-zinc-500 bg-zinc-900 shadow-md"
                      : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: preset.tokens.primary }}
                    />
                    <span className="text-xs font-semibold text-white">{preset.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-mono line-clamp-1">{preset.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recently Visited in Studio */}
        {recentTemplates.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400" />
                <h2 className="text-base font-semibold text-white tracking-tight">Recently Worked On in Studio</h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">{recentTemplates.length} components</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTemplates.slice(0, 4).map((template) => (
                <Link
                  key={template.id}
                  href={`/studio/${template.id}`}
                  className="p-4 border border-zinc-850 bg-zinc-950 hover:border-zinc-700 hover:-translate-y-0.5 rounded-xs transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                      {template.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{template.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
                    <span>Resume Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Favorited Components Section */}
        {favoriteTemplates.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h2 className="text-base font-semibold text-white tracking-tight">Saved Favorites</h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">{favoriteTemplates.length} components</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </section>
        )}

        {/* Fast Studio Launchers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-850">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <h2 className="text-base font-semibold text-white tracking-tight">Fast Studio Launchers</h2>
            </div>
            <Link href="/components" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
              View all 40 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredStudioLaunchers.map((template) => (
              <Link
                key={template.id}
                href={`/studio/${template.id}`}
                className="p-4 border border-zinc-850 bg-zinc-950 hover:border-zinc-700 hover:-translate-y-0.5 rounded-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    <span>{template.category}</span>
                    <span className="text-emerald-400">Unlocked</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 mb-1">{template.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{template.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="p-6 border border-zinc-850 bg-zinc-950/60 rounded-xs">
          <h3 className="text-sm font-semibold text-white mb-3">Your Developer Console Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full copy/paste TSX component code</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Live custom token inspection & sliders</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero external runtime dependencies</span>
            </div>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 p-6 rounded-xs shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-850">
              <h2 className="text-sm font-semibold text-white">Edit Developer Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-9 px-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white rounded-xs outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  GitHub Handle (without @)
                </label>
                <input
                  type="text"
                  value={editHandle}
                  onChange={(e) => setEditHandle(e.target.value)}
                  className="w-full h-9 px-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white rounded-xs outline-none"
                  placeholder="azurelikestocode"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full h-9 px-3 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white rounded-xs outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  Bio / Headline
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs text-white rounded-xs outline-none"
                  placeholder="Building scalable UI components..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-8 px-3 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-8 px-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-medium uppercase font-mono rounded-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
