---
title: Landing Page Specification (Editorial Redesign)
tags:
  - landing-page
  - editorial
  - minimalism
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Landing Page Specification (Editorial Redesign)

The landing page (`app/page.tsx`) embodies an architectural, minimalist, and expensive aesthetic inspired by **Vantra Studio**, **Idealworks**, and **Plumeform**.

## Core Visual Guidelines
- **Strictly No Gradient Text:** Eliminates flashy AI/vibecoded aesthetics; emphasizes crisp typographic weights, generous tracking, and high contrast (`#fafafa` on `#09090b`).
- **Hairline Grid System:** Thin, subtle border rules (`border-zinc-800/80`) that separate content into balanced structural columns.
- **Informational & Editorial Focus:** The landing page does not contain an inline token playground. It serves to communicate the product vision, design principles, and component offerings.

## Page Layout & Sections

### 1. Minimalist Navigation Header (`components/landing/navbar.tsx`)
- Logo & Wordmark ("Fetch").
- Navigation links:
  - Philosophy (`#philosophy`)
  - Ethos (`#ethos`)
  - Featured (`#featured`)
- Primary CTA: *"Explore Components"* &rarr; routes directly to `[[Component Catalog|/components]]`.

### 2. Editorial Hero (`components/landing/editorial-hero.tsx`)
- Large, razor-sharp headline: *"Live-configurable UI primitives built for architectural precision."*
- Descriptive editorial subhead explaining the token-first philosophy.
- Primary CTA: *"Browse Component Directory &rarr;"*
- Secondary CTA: GitHub link with clean technical badge.

### 3. Engineering Ethos Grid (`components/landing/engineering-ethos.tsx`)
A 4-quadrant architectural grid outlining:
1. **Total Ownership:** Zero runtime CSS-in-JS dependencies; pure Tailwind and standard CSS custom properties.
2. **Deep Granular Customization:** Fine-tune radius, spacing, typography, and palette per component.
3. **WAI-ARIA Accessibility:** Unstyled Radix primitives guaranteeing keyboard navigation and screen-reader support.
4. **Instant Export:** 1-click clipboard serialization for clean JSX or global token blocks.

### 4. Curated Showcase Section (`components/landing/curated-showcase.tsx`)
High-fidelity visual cards teasing featured primitives and compound patterns with direct links to their studio customizers.

### 5. Minimalist Footer (`components/landing/editorial-footer.tsx`)
System status, MIT license, GitHub links, and typography credit.

---
Related: [[architecture]] | [[Component Catalog]] | [[Tech Stack]] | [[Roadmap]]
