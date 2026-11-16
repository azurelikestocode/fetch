"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "github" | "google" | "email";
  handle?: string;
  bio?: string;
  publicRepos?: number;
  isMember: boolean;
  createdAt: string;
}

interface StoredAccount {
  user: User;
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGitHub: (username?: string) => Promise<void>;
  loginWithGoogle: (email?: string, name?: string) => Promise<void>;
  loginWithEmail: (email: string, password?: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  favorites: string[];
  toggleFavorite: (templateId: string) => void;
  recentActivity: string[];
  trackActivity: (templateId: string) => void;
  exportCount: number;
  incrementExportCount: () => void;
  isTemplateLocked: (templateId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Free tier allowed templates when NOT logged in (12 foundation components)
export const FREE_TEMPLATE_IDS = new Set([
  "button",
  "card",
  "input",
  "badge",
  "switch",
  "tabs",
  "stat-card",
  "breadcrumbs",
  "notification",
  "rating-widget",
  "banner-alert",
  "kbd-shortcut-strip",
]);

async function hashPassword(str: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback
    }
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `hash_${Math.abs(hash)}`;
}

function generateInitialAvatar(name: string, bg = "6366f1"): string {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "FE";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bg}&color=fff&size=128&bold=true`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [exportCount, setExportCount] = useState<number>(0);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("fetch_auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedFavs = localStorage.getItem("fetch_favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedRecent = localStorage.getItem("fetch_recent_activity");
      if (storedRecent) {
        setRecentActivity(JSON.parse(storedRecent));
      }
      const storedExports = localStorage.getItem("fetch_export_count");
      if (storedExports) {
        setExportCount(parseInt(storedExports, 10) || 0);
      }
    } catch (e) {
      console.error("Failed to load local session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGitHub = async (username = "azurelikestocode") => {
    setIsLoading(true);
    const targetUsername = username.trim() || "azurelikestocode";
    
    let ghData: any = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`https://api.github.com/users/${targetUsername}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        ghData = await res.json();
      }
    } catch {
      // Fallback seamlessly to targetUsername profile
    }

    const realUser: User = {
      id: ghData?.id ? `gh_${ghData.id}` : `gh_${targetUsername}`,
      name: ghData?.name || targetUsername,
      email: ghData?.email || `${targetUsername}@users.noreply.github.com`,
      avatar: ghData?.avatar_url || `https://avatars.githubusercontent.com/${targetUsername}`,
      provider: "github",
      handle: ghData?.login || targetUsername,
      bio: ghData?.bio || `Frontend developer & component builder`,
      publicRepos: ghData?.public_repos ?? 1,
      isMember: true,
      createdAt: ghData?.created_at || new Date().toISOString(),
    };

    setUser(realUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(realUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async (email = "rbf.rajasukabumi@gmail.com", name?: string) => {
    setIsLoading(true);
    const resolvedName = name || email.split("@")[0] || "Google User";
    const realUser: User = {
      id: `goog_${Date.now()}`,
      name: resolvedName,
      email: email,
      avatar: generateInitialAvatar(resolvedName, "ea4335"),
      provider: "google",
      handle: email.split("@")[0],
      bio: "Google Developer Member",
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    setUser(realUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(realUser));
    setIsLoading(false);
  };

  const registerWithEmail = async (name: string, email: string, password = "password123") => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // Check existing accounts
    const rawAccounts = localStorage.getItem("fetch_accounts_db");
    const accounts: Record<string, StoredAccount> = rawAccounts ? JSON.parse(rawAccounts) : {};

    if (accounts[cleanEmail]) {
      setIsLoading(false);
      throw new Error("An account with this email already exists. Please sign in instead.");
    }

    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanName || cleanEmail.split("@")[0],
      email: cleanEmail,
      avatar: generateInitialAvatar(cleanName, "10b981"),
      provider: "email",
      handle: cleanEmail.split("@")[0],
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    accounts[cleanEmail] = {
      user: newUser,
      passwordHash,
    };

    localStorage.setItem("fetch_accounts_db", JSON.stringify(accounts));
    setUser(newUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const loginWithEmail = async (email: string, password?: string) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    const rawAccounts = localStorage.getItem("fetch_accounts_db");
    const accounts: Record<string, StoredAccount> = rawAccounts ? JSON.parse(rawAccounts) : {};

    const account = accounts[cleanEmail];
    if (!account) {
      // In case user hasn't registered through DB yet, allow seamless onboarding
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: cleanEmail.split("@")[0],
        email: cleanEmail,
        avatar: generateInitialAvatar(cleanEmail.split("@")[0], "6366f1"),
        provider: "email",
        handle: cleanEmail.split("@")[0],
        isMember: true,
        createdAt: new Date().toISOString(),
      };
      const pwHash = await hashPassword(password || "password123");
      accounts[cleanEmail] = { user: newUser, passwordHash: pwHash };
      localStorage.setItem("fetch_accounts_db", JSON.stringify(accounts));
      setUser(newUser);
      localStorage.setItem("fetch_auth_user", JSON.stringify(newUser));
      setIsLoading(false);
      return;
    }

    if (password) {
      const inputHash = await hashPassword(password);
      if (account.passwordHash && account.passwordHash !== inputHash) {
        setIsLoading(false);
        throw new Error("Incorrect password. Please verify your credentials.");
      }
    }

    setUser(account.user);
    localStorage.setItem("fetch_auth_user", JSON.stringify(account.user));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fetch_auth_user");
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem("fetch_auth_user", JSON.stringify(updated));

      // Also update in accounts DB if exists
      try {
        const rawAccounts = localStorage.getItem("fetch_accounts_db");
        if (rawAccounts && updated.email) {
          const accounts = JSON.parse(rawAccounts);
          if (accounts[updated.email]) {
            accounts[updated.email].user = updated;
            localStorage.setItem("fetch_accounts_db", JSON.stringify(accounts));
          }
        }
      } catch (e) {
        console.error("Could not sync profile to DB", e);
      }

      return updated;
    });
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId];
      localStorage.setItem("fetch_favorites", JSON.stringify(next));
      return next;
    });
  };

  const trackActivity = (templateId: string) => {
    setRecentActivity((prev) => {
      const next = [templateId, ...prev.filter((id) => id !== templateId)].slice(0, 8);
      localStorage.setItem("fetch_recent_activity", JSON.stringify(next));
      return next;
    });
  };

  const incrementExportCount = () => {
    setExportCount((prev) => {
      const next = prev + 1;
      localStorage.setItem("fetch_export_count", next.toString());
      return next;
    });
  };

  const isTemplateLocked = (templateId: string): boolean => {
    if (user) return false;
    return !FREE_TEMPLATE_IDS.has(templateId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithGitHub,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        updateProfile,
        favorites,
        toggleFavorite,
        recentActivity,
        trackActivity,
        exportCount,
        incrementExportCount,
        isTemplateLocked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  loginWithGitHub: async () => {},
  loginWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: () => {},
  updateProfile: () => {},
  favorites: [],
  toggleFavorite: () => {},
  recentActivity: [],
  trackActivity: () => {},
  exportCount: 0,
  incrementExportCount: () => {},
  isTemplateLocked: (templateId: string) => !FREE_TEMPLATE_IDS.has(templateId),
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
}
