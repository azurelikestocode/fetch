"use client";

import { useState, useMemo, CSSProperties } from "react";
import { THEME_PRESETS, ThemeTokens, PresetTheme } from "../lib/tokens";

export function useTokenTheme(initialPresetId: string = "default") {
  const [tokens, setTokens] = useState<ThemeTokens>(
    THEME_PRESETS[initialPresetId]?.tokens || THEME_PRESETS.default.tokens
  );
  const [activePreset, setActivePreset] = useState<string>(initialPresetId);

  const setRadius = (radius: number) => {
    setTokens((prev) => ({ ...prev, radius }));
  };

  const setColor = (primary: string, primaryForeground: string = "#ffffff") => {
    setTokens((prev) => ({ ...prev, primary, primaryForeground }));
  };

  const setPreset = (presetId: string) => {
    const preset = THEME_PRESETS[presetId];
    if (preset) {
      setTokens(preset.tokens);
      setActivePreset(presetId);
    }
  };

  const styleObject = useMemo<CSSProperties>(() => {
    return {
      "--primary": tokens.primary,
      "--primary-foreground": tokens.primaryForeground,
      "--background": tokens.background,
      "--surface": tokens.surface,
      "--surface-hover": tokens.surfaceHover,
      "--border": tokens.border,
      "--radius": `${tokens.radius}px`,
    } as CSSProperties;
  }, [tokens]);

  return {
    tokens,
    activePreset,
    setRadius,
    setColor,
    setPreset,
    styleObject,
  };
}
