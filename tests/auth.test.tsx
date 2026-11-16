import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AuthProvider, useAuth, FREE_TEMPLATE_IDS } from "../context/auth-context";

function TestAuthConsumer() {
  const { user, isAuthenticated, loginWithEmail, logout, isTemplateLocked, favorites, toggleFavorite } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "logged-in" : "logged-out"}</div>
      <div data-testid="user-name">{user?.name || "none"}</div>
      <div data-testid="locked-status">{isTemplateLocked("pricing-card") ? "locked" : "unlocked"}</div>
      <div data-testid="free-status">{isTemplateLocked("button") ? "locked" : "unlocked"}</div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button data-testid="login-btn" onClick={() => loginWithEmail("developer@fetch.dev")}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
      <button data-testid="fav-btn" onClick={() => toggleFavorite("button")}>
        Toggle Fav
      </button>
    </div>
  );
}

describe("Authentication & Gating Context", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("locks advanced templates when user is not authenticated", () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status").textContent).toBe("logged-out");
    expect(screen.getByTestId("free-status").textContent).toBe("unlocked");
    expect(screen.getByTestId("locked-status").textContent).toBe("locked");
  });

  it("unlocks all templates upon user sign in", async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("login-btn"));

    await screen.findByText("developer");

    expect(screen.getByTestId("auth-status").textContent).toBe("logged-in");
    expect(screen.getByTestId("locked-status").textContent).toBe("unlocked");
  });

  it("persists and toggles favorites", () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("favorites-count").textContent).toBe("0");

    act(() => {
      fireEvent.click(screen.getByTestId("fav-btn"));
    });

    expect(screen.getByTestId("favorites-count").textContent).toBe("1");
  });
});
