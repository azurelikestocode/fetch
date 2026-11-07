---
title: Button Component
tags:
  - components
  - button
  - ui-library
  - fetch
date: 2026-11-07
---

# [[Component Catalog|Fetch]] — Button Component

The **Button** is the primary interactive element across the library.

## File Location
`components/ui/button.tsx`

## Variants
- **Primary**: Solid background with `--primary` and `--primary-foreground`.
- **Secondary**: Subtle surface background with neutral text.
- **Outline**: 1px `--border` with transparent background and hover fill.
- **Ghost**: No border, background appears only on hover.

## Sizes
- `sm`: Compact padding, 12px text.
- `md` (default): Standard 14px text, 36px height.
- `lg`: Prominent 16px text, 44px height.
- `icon`: Square aspect ratio for standalone icon buttons.

## Token Bindings
- **Corner Radius**: Bound directly to `--radius`.
- **Primary Color**: Bound to `--primary`.
- **Focus Ring**: `focus-visible:ring-2 focus-visible:ring-[var(--primary)]`.

---
Related: [[Component Catalog]] | [[Design Tokens]] | [[Hero Playground]]

