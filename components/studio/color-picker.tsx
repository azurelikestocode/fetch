"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (hex: string, isLight: boolean) => void;
}

// Convert HEX to HSV
function hexToHsv(hex: string): { h: number; s: number; v: number } {
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  if (cleaned.length !== 6) return { h: 238, s: 59, v: 95 };

  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return {
    h: Math.max(0, Math.min(360, h)),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

// Convert HSV to HEX
function hsvToHex(h: number, s: number, v: number): string {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function isLightColor(hex: string): boolean {
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) cleaned = cleaned.split("").map((c) => c + c).join("");
  const r = parseInt(cleaned.slice(0, 2), 16) || 0;
  const g = parseInt(cleaned.slice(2, 4), 16) || 0;
  const b = parseInt(cleaned.slice(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 135;
}

export function VisualColorPicker({ color, onChange }: ColorPickerProps) {
  const [hsv, setHsv] = useState(() => hexToHsv(color));
  const spectrumRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const isDraggingSpectrum = useRef(false);
  const isDraggingHue = useRef(false);

  // Sync HSV when external color prop changes meaningfully
  useEffect(() => {
    const currentHex = hsvToHex(hsv.h, hsv.s, hsv.v);
    if (color.toUpperCase() !== currentHex.toUpperCase()) {
      setHsv(hexToHsv(color));
    }
  }, [color]);

  const updateSpectrum = useCallback(
    (clientX: number, clientY: number) => {
      if (!spectrumRef.current) return;
      const rect = spectrumRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100);

      setHsv((prev) => {
        const next = { ...prev, s, v };
        const newHex = hsvToHex(next.h, next.s, next.v);
        onChange(newHex, isLightColor(newHex));
        return next;
      });
    },
    [onChange]
  );

  const updateHue = useCallback(
    (clientX: number) => {
      if (!hueRef.current) return;
      const rect = hueRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const h = Math.round((x / rect.width) * 360);

      setHsv((prev) => {
        const next = { ...prev, h };
        const newHex = hsvToHex(next.h, next.s, next.v);
        onChange(newHex, isLightColor(newHex));
        return next;
      });
    },
    [onChange]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSpectrum.current) updateSpectrum(e.clientX, e.clientY);
      if (isDraggingHue.current) updateHue(e.clientX);
    };

    const handleMouseUp = () => {
      isDraggingSpectrum.current = false;
      isDraggingHue.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateSpectrum, updateHue]);

  const pureHueHex = hsvToHex(hsv.h, 100, 100);

  return (
    <div className="space-y-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xs">
      {/* 2D Saturation / Value Spectrum Box */}
      <div
        ref={spectrumRef}
        onMouseDown={(e) => {
          isDraggingSpectrum.current = true;
          updateSpectrum(e.clientX, e.clientY);
        }}
        className="w-full h-32 rounded-xs relative cursor-crosshair overflow-hidden select-none border border-zinc-800"
        style={{
          backgroundColor: pureHueHex,
          backgroundImage: `
            linear-gradient(to right, #FFFFFF, transparent),
            linear-gradient(to top, #000000, transparent)
          `,
        }}
      >
        {/* Draggable Selector Ring */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* 1D Rainbow Hue Slider */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>HUE</span>
          <span>{hsv.h}°</span>
        </div>
        <div
          ref={hueRef}
          onMouseDown={(e) => {
            isDraggingHue.current = true;
            updateHue(e.clientX);
          }}
          className="w-full h-3.5 rounded-xs relative cursor-pointer select-none border border-zinc-800/80"
          style={{
            background:
              "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
          }}
        >
          {/* Draggable Hue Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-5 bg-white border border-zinc-900 rounded-xs shadow-md pointer-events-none"
            style={{
              left: `${(hsv.h / 360) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Hex & Preview Row */}
      <div className="flex items-center gap-2 pt-1">
        <div
          className="w-7 h-7 rounded-xs border border-zinc-700 shrink-0 shadow-inner"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (/^#[0-9A-F]{6}$/i.test(val)) {
              setHsv(hexToHsv(val));
              onChange(val, isLightColor(val));
            }
          }}
          className="flex-1 h-7 px-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-xs text-[#fafafa] uppercase focus:outline-none focus:border-zinc-500"
        />
        <span className="text-[10px] font-mono text-zinc-500">
          {hsv.s}%, {hsv.v}%
        </span>
      </div>
    </div>
  );
}
