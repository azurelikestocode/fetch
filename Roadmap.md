---
title: Product Roadmap & Phasing
tags:
  - roadmap
  - milestones
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Product Roadmap & Phasing

## Phase 1: Foundational Setup & Primitives (Completed)
- [x] Next.js 15 App Router, TypeScript, Tailwind CSS scaffolding
- [x] CSS Variable Token Engine (`--primary`, `--radius`, `--surface`, `--border`)
- [x] Initial Primitives: Button, Card, Input, Badge, Dialog
- [x] Vitest suite with 15 passing tests

---

## Phase 2: Architectural Multi-Page Redesign (Current Focus)
> Detailed Plan: [[2026-11-07-multipage-redesign|Multi-Page Redesign Plan]]

- [ ] **Editorial Landing Page (`/`)**:
  - [ ] Minimalist navigation header linking to `/components`
  - [ ] Razor-sharp editorial hero without gradient text or widget clutter
  - [ ] Engineering Ethos 4-quadrant architectural grid
  - [ ] Curated static component showcases
  - [ ] Minimalist editorial footer
- [ ] **Component Catalog (`/components`)**:
  - [ ] Real-time search bar & category filter pills (*All*, *Primitives*, *Patterns*, *Forms*, *Navigation*)
  - [ ] Responsive grid of template cards with live preview thumbnails and "Customize" action
- [ ] **Template Registry (`lib/templates.ts`)**:
  - [ ] Typed template schema with configurable props (color, radius, typography, text copy)
  - [ ] Initial release templates (Button, Card, Input, Badge, Auth Card, Stat Card, Newsletter)
- [ ] **Customizer Studio Workspace (`/studio/[id]`)**:
  - [ ] Dynamic studio page route
  - [ ] Left Inspector Panel (Colors, Corner Radius, Typography sizes/weights, Live Text Editing, Padding)
  - [ ] Center Stage responsive viewport canvas (Desktop / Tablet / Mobile)
  - [ ] Dual-tab Code Export Drawer (Tailwind JSX vs Theme Tokens)

---
Related: [[architecture]] | [[Landing Page Spec]] | [[Component Catalog]] | [[Studio Workspace Spec]]
