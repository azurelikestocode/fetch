---
title: Design Tokens Specification
tags:
  - design-tokens
  - styling
  - theme
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Design Tokens Specification

The token engine in Fetch maps visual controls to standard CSS custom properties. These properties are scoped to preview containers (`.fetch-preview`), allowing live updates without altering the outer marketing layout.

## Core CSS Custom Properties

### Colors
- `--primary`: Main brand accent color (Buttons, active borders, focus rings).
- `--primary-foreground`: High-contrast foreground text for primary elements.
- `--background`: Base surface background color.
- `--surface`: Elevated container background (Cards, dialogs).
- `--border`: Subtle border stroke color.

### Geometry & Radius
- `--radius`: Dynamic border radius applied across components.
  - `0px`: Sharp / Cyber / Brutalist
  - `6px`: Subtle / Modern Default
  - `12px`: Rounded / Smooth
  - `9999px`: Full Pill

## Preset Themes
The [[Landing Page Spec]] and [[Hero Playground]] feature one-click presets:

1. **Default Modern**: Indigo accent (`#6366f1`), 8px radius, dark slate surface.
2. **Emerald Tech**: Emerald accent (`#10b981`), 6px radius, neutral zinc surface.
3. **Cyber / Brutalist**: Amber accent (`#f59e0b`), 0px radius, high-contrast borders.
4. **Minimal Clean**: Monochromatic white/gray, 12px smooth radius.

## Token Consumption
All components in the [[Component Catalog]] consume these variables via Tailwind utility classes:
- `rounded-[var(--radius)]`
- `bg-[var(--primary)]`
- `text-[var(--primary-foreground)]`
- `border-[var(--border)]`

---
Related: [[architecture]] | [[Tech Stack]] | [[Hero Playground]] | [[Component Catalog]]

