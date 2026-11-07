---
title: Component Catalog Specification
tags:
  - catalog
  - directory
  - gallery
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Component Catalog Specification

The **Component Catalog** (`app/components/page.tsx`) is a searchable, filterable directory displaying all available templates.

## User Flow
1. Developer arrives from the [[Landing Page Spec|Landing Page]] via *"Explore Components"*.
2. Developer uses the real-time search bar or category filter pills (*All*, *Primitives*, *Patterns*, *Forms*, *Navigation*).
3. Each template is presented in a high-fidelity card with a live preview, category badge, title, and description.
4. Clicking *"Customize Template"* navigates to the dedicated [[Studio Workspace Spec|Studio Workspace]] (`/studio/[id]`).

## Available Templates (Initial Release)

| Template ID | Name | Category | Features Tested |
| :--- | :--- | :--- | :--- |
| `button` | Primary Action Button | Primitives | Background, text, radius, padding, hover opacity |
| `card` | Content Card | Primitives | Surface, border, radius, shadow, body typography |
| `input` | Form Input Field | Primitives | Border, focus ring, placeholder, label copy |
| `badge` | Status Tag | Primitives | Contrast, pill/rounded radius, subtle tint |
| `auth-card` | Authentication Pattern | Patterns | Multi-input compound card with primary submit |
| `stat-card` | Metric KPI Card | Patterns | Value metric, delta indicator, title, icon |
| `newsletter` | Newsletter Banner | Patterns | Inline input + button compound pattern |

---
Related: [[architecture]] | [[Studio Workspace Spec]] | [[Landing Page Spec]] | [[Design Tokens]]
