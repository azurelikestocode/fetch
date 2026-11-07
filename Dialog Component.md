---
title: Dialog Component
tags:
  - components
  - dialog
  - modal
  - radix-ui
  - fetch
date: 2026-11-07
---

# [[Component Catalog|Fetch]] — Dialog Component

The **Dialog** component provides an accessible modal window overlaid on the primary viewport.

## Primitive & Dependencies
- Built using `@radix-ui/react-dialog`.
- Provides automatic focus trapping, `Escape` key dismissal, outside click detection, and ARIA title/description linkages.

## File Location
`components/ui/dialog.tsx`

## Scoping & Portal Architecture
Because Radix Dialog mounts to a DOM portal, previewing it inside a container scope (`.fetch-preview`) requires binding the dialog's container prop or applying the CSS variables directly to the portal root so custom theme tokens inherit correctly into the open modal.

## Token Bindings
- **Backdrop**: Semi-transparent dark overlay with `backdrop-blur-sm`.
- **Modal Surface**: `bg-[var(--surface)]`.
- **Border**: `border border-[var(--border)]`.
- **Corner Radius**: `rounded-[var(--radius)]`.

---
Related: [[Component Catalog]] | [[Design Tokens]] | [[Tech Stack]]

