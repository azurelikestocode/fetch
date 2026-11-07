---
title: Hero Playground Specification
tags:
  - playground
  - hero
  - interactive
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Hero Playground Specification

The **Hero Playground** (`components/landing/hero-playground.tsx`) is an interactive teaser embedded directly within the [[Landing Page Spec]].

## Purpose
Allows first-time visitors to experience the core value proposition of Fetch within 3 seconds of landing on the site—without navigating to a subpage or opening an editor.

## The Interactive Preview Canvas
A live product card containing:
- [[Badge Component]]: Version or status pill (e.g. `v1.0-alpha`).
- Card Heading & Body text: Crisp typography responding to token settings.
- [[Input Component]]: Interactive text input with label and dynamic focus rings.
- [[Button Component]]: Primary action button using the active `--primary` color.

## Inline Visual Controls
Beside or beneath the card, visitors can tweak:
1. **Corner Radius Slider**: Sliders adjusting `--radius` from `0px` to `24px`.
2. **Color Swatch Selector**: Indigo, Emerald, Amber, Rose, Violet.
3. **Preset Chips**: Instant jumps defined in [[Design Tokens]].

## Live Code Export Bar
Directly under the card:
- Displays a synchronized snippet bar showing the current generated Tailwind classes.
- Tabbed toggle:
  - **Tailwind JSX**: Self-contained inline classes (e.g., `rounded-[12px] bg-indigo-600 ...`).
  - **Theme Tokens**: Clean semantic variables (`rounded-[var(--radius)] bg-[var(--primary)]`).
- 1-Click "Copy Code" button with instant visual feedback ("Copied!").

---
Related: [[Landing Page Spec]] | [[Design Tokens]] | [[Button Component]] | [[Input Component]] | [[Card Component]]

