---
title: Component Catalog (MVP)
tags:
  - components
  - catalog
  - ui-library
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Component Catalog (MVP)

The MVP foundational components are designed to test and showcase all core [[Design Tokens]] (colors, radius, spacing, elevation, typography).

## The Foundational Five

| Component | Primary Purpose | Tokens Tested | Detail Note |
| :--- | :--- | :--- | :--- |
| **Button** | Primary interactive action | `--primary`, `--radius`, hover states | [[Button Component]] |
| **Card** | Surface container for content | `--surface`, `--border`, `--radius`, shadows | [[Card Component]] |
| **Input** | Form entry with validation states | `--border`, `--primary` focus rings, typography | [[Input Component]] |
| **Badge** | Status and category tags | Contrast colors, pill radii, compact font | [[Badge Component]] |
| **Dialog** | Accessible modal dialog overlay | Z-index, backdrop blur, compound layout | [[Dialog Component]] |

## Showcase Grid Integration
On the [[Landing Page Spec]], each of these five components is displayed in an interactive showcase card. Tweaking global theme presets or local sliders updates every card in real time.

---
Related: [[architecture]] | [[Button Component]] | [[Card Component]] | [[Input Component]] | [[Badge Component]] | [[Dialog Component]] | [[Design Tokens]]

