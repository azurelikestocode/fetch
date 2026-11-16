"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "github" | "google" | "email";
  isMember: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithOAuth: (provider: "github" | "google") => Promise<void>;
  loginWithEmail: (email: string) => Promise<void>;
  registerWithEmail: (name: string, email: string) => Promise<void>;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (templateId: string) => void;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

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
    } catch (e) {
      console.error("Failed to load local session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithOAuth = async (provider: "github" | "google") => {
    setIsLoading(true);
    // Simulate real OAuth handshake
    await new Promise((res) => setTimeout(res, 500));

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      name: provider === "github" ? "Azure Developer" : "Google Explorer",
      email: provider === "github" ? "developer@github.com" : "developer@gmail.com",
      avatar:
        provider === "github"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      provider,
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithEmail = async (email: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0] || "Fetch Developer",
      email: email,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      provider: "email",
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const registerWithEmail = async (name: string, email: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const mockUser: User = {
      id: `usr_${Date.now()}`,
      name: name || "Fetch Developer",
      email: email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      provider: "email",
      isMember: true,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("fetch_auth_user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fetch_auth_user");
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

  const isTemplateLocked = (templateId: string): boolean => {
    // If logged in, nothing is locked!
    if (user) return false;
    // If not logged in, only foundation templates are free
    return !FREE_TEMPLATE_IDS.has(templateId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithOAuth,
        loginWithEmail,
        registerWithEmail,
        logout,
        favorites,
        toggleFavorite,
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
  loginWithOAuth: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: () => {},
  favorites: [],
  toggleFavorite: () => {},
  isTemplateLocked: (templateId: string) => !FREE_TEMPLATE_IDS.has(templateId),
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
}
