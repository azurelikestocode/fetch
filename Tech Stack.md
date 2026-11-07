---
title: Tech Stack Specification
tags:
  - tech-stack
  - architecture
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Tech Stack Specification

This note documents the core technologies powering **Fetch** and the rationale for each architectural choice.

## Core Framework
- **Next.js 15 (App Router)**: Powers both the marketing site and the upcoming interactive studio.
  - Hybrid server rendering for performance, SEO, and open-graph metadata on the landing page.
  - Client component boundaries (`"use client"`) for live token preview canvases.
  - Links to: [[Landing Page Spec]], [[Roadmap]]

## Styling & Token Engine
- **Tailwind CSS v4 / v3**: Utility-first CSS framework.
- **CSS Custom Properties (`var(--...)`)**: Dynamic token engine allowing real-time CSS mutation without re-compilation.
- **`tailwind-merge` + `clsx`**: Utility helpers (`cn(...)`) for conditional and conflict-free class merging.
- Links to: [[Design Tokens]]

## Headless Component Primitives
- **Radix UI Primitives**: Unstyled, accessible component primitives.
  - Provides keyboard navigation, focus management, and WAI-ARIA compliance out of the box.
  - Used in: [[Dialog Component]], [[Button Component]], [[Input Component]]

## Utilities & Tooling
- **TypeScript**: Strict type definitions for design tokens, component variants, and theme presets.
- **Lucide React**: Clean, modern, tree-shakeable icon set.
- **Zustand**: Lightweight client state management for syncing token adjustments across the [[Hero Playground]] and [[Component Catalog]].

---
Related: [[architecture]] | [[Design Tokens]] | [[Landing Page Spec]] | [[Roadmap]]

