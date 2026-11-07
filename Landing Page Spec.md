---
title: Landing Page Specification
tags:
  - landing-page
  - marketing
  - spec
  - fetch
date: 2026-11-07
---

# [[architecture|Fetch]] — Landing Page Specification

The landing page (`app/page.tsx`) is the primary Phase 1 deliverable for Fetch. It introduces the project vision and immediately demonstrates live token configuration.

## Page Layout & Sections

### 1. Navigation Header
- Logo & Wordmark for **Fetch**.
- Navigation links:
  - Features (`#features`)
  - Components (`#components`)
  - Quickstart (`#quickstart`)
- Secondary CTA: GitHub repository link with star count.
- Primary CTA: *"Launch Studio"* (smooth-scrolls to [[Hero Playground]] with a Phase 2 badge).

### 2. Hero Section
- **Headline**: *"Build and Customize UI Components in Real-Time."*
- **Subheadline**: *"Visually tweak tokens, preview live components, and copy clean, accessible code into your Next.js and Tailwind projects."*
- **Live Teaser Canvas**: Embeds the [[Hero Playground]].

### 3. Workflow Pillars (Value Props)
Explains the 3-step developer loop:
1. **Choose**: Select from accessible headless primitives.
2. **Tweak**: Adjust radius, color, and padding visually with instant feedback.
3. **Export**: Copy production-ready Tailwind classes or CSS variables.

### 4. Showcase Grid
Displays the 5 foundational components from the [[Component Catalog]] in an interactive multi-card grid that responds dynamically to the active [[Design Tokens]].

### 5. Developer Quickstart
Terminal-style guide with copyable snippets showing how to install dependencies and configure `globals.css`.

### 6. Footer
Open source license, GitHub links, and roadmap notes.

---
Related: [[architecture]] | [[Hero Playground]] | [[Component Catalog]] | [[Tech Stack]] | [[Roadmap]]

