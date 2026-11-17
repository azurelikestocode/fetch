import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/auth-context";

function TestAuthConsumer() {
  const {
    user,
    isAuthenticated,
    loginWithEmail,
    registerWithEmail,
    loginWithGitHub,
    logout,
    isTemplateLocked,
    favorites,
    toggleFavorite,
    exportCount,
    incrementExportCount,
  } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "logged-in" : "logged-out"}</div>
      <div data-testid="user-name">{user?.name || "none"}</div>
      <div data-testid="user-handle">{user?.handle || "none"}</div>
      <div data-testid="locked-status">{isTemplateLocked("pricing-card") ? "locked" : "unlocked"}</div>
      <div data-testid="free-status">{isTemplateLocked("button") ? "locked" : "unlocked"}</div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <div data-testid="export-count">{exportCount}</div>
      <button data-testid="login-btn" onClick={() => loginWithEmail("developer@fetch.dev", "password123")}>
        Login
      </button>
      <button
        data-testid="register-btn"
        onClick={() => registerWithEmail("Azure", "azure@hackclub.com", "securePass99")}
      >
        Register
      </button>
      <button data-testid="gh-btn" onClick={() => loginWithGitHub("azurelikestocode")}>
        GitHub Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button data-testid="fav-btn" onClick={() => toggleFavorite("button")}>
        Toggle Fav
      </button>
      <button data-testid="export-btn" onClick={incrementExportCount}>
        Export
      </button>
    </div>
  );
}

describe("Authentication & Gating Context", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides unlocked access to all templates for everyone", () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status").textContent).toBe("logged-out");
    expect(screen.getByTestId("free-status").textContent).toBe("unlocked");
    expect(screen.getByTestId("locked-status").textContent).toBe("unlocked");
  });

  it("unlocks all templates upon user sign in", async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("login-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-in");
    });

    expect(screen.getByTestId("user-name").textContent).toBe("developer");
    expect(screen.getByTestId("locked-status").textContent).toBe("unlocked");
  });

  it("supports real GitHub authentication with live handle", async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("gh-btn"));

    await waitFor(
      () => {
        expect(screen.getByTestId("auth-status").textContent).toBe("logged-in");
      },
      { timeout: 4000 }
    );

    expect(screen.getByTestId("user-handle").textContent).toBe("azurelikestocode");
    expect(screen.getByTestId("locked-status").textContent).toBe("unlocked");
  });

  it("persists and toggles favorites and tracks export counts", () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("favorites-count").textContent).toBe("0");
    expect(screen.getByTestId("export-count").textContent).toBe("0");

    act(() => {
      fireEvent.click(screen.getByTestId("fav-btn"));
      fireEvent.click(screen.getByTestId("export-btn"));
    });

    expect(screen.getByTestId("favorites-count").textContent).toBe("1");
    expect(screen.getByTestId("export-count").textContent).toBe("1");
  });
});
