---
title: Input Component
tags:
  - components
  - input
  - form
  - fetch
date: 2026-11-07
---

# [[Component Catalog|Fetch]] — Input Component

The **Input** component handles single-line user text entry, validation states, and accessible focus interactions.

## File Location
`components/ui/input.tsx`

## States Supported
- **Default**: Muted border with subtle placeholder text.
- **Focus**: Distinct highlight ring bound to `--primary`.
- **Disabled**: Lowered opacity with `cursor-not-allowed`.
- **Error**: High-visibility destructive border and helper text.

## Token Bindings
- **Corner Radius**: `rounded-[var(--radius)]`.
- **Border**: `border border-[var(--border)]`.
- **Focus Ring**: `focus-visible:ring-2 focus-visible:ring-[var(--primary)]`.

---
Related: [[Component Catalog]] | [[Design Tokens]] | [[Hero Playground]]

