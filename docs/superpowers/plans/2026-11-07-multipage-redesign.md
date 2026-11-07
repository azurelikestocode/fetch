# Fetch Multi-Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Fetch into an elevated, multi-page design tool with an informational editorial landing page (inspired by Vantra, Idealworks, and Plumeform with zero gradient text), a searchable/filterable component catalog on `/components`, and a dedicated full-screen customization studio on `/studio/[id]`.

**Architecture:** Next.js 15 App Router with 3 distinct tiers (`/`, `/components`, `/studio/[id]`). A strongly-typed Template Registry (`lib/templates.ts`) drives both the catalog directory and the studio customizer with per-template configurable properties (colors, radius, typography, live text copy) and self-contained Tailwind JSX serialization.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, `@radix-ui/react-slider`, `@radix-ui/react-dialog`, `lucide-react`, Vitest + React Testing Library.

**Spec:** `architecture.md`, `Landing Page Spec.md`, `Component Catalog.md`, `Studio Workspace Spec.md`

## Global Constraints
- Target Framework: Next.js 15 App Router with dynamic route `/studio/[id]`.
- Aesthetic Rules: Strictly no gradient text; monochrome minimalism; architectural hairline grid dividers (`border-zinc-800/80`).
- Landing Page Scope: Purely informational/editorial; no inline interactive playground card on `/`.
- Export Contract: 100% self-contained Tailwind JSX (no missing relative imports or unresolved dependencies).
- Routing Hierarchy: `/` (Landing) &rarr; `/components` (Catalog) &rarr; `/studio/[id]` (Studio).

## Review Focus
1. **Unknown Template ID Handling in Studio:** When `/studio/unknown-id` is visited, ensure the page renders a clean fallback/404 state with a return link rather than crashing.
2. **Text Field Overflow in Customizer:** Ensure long custom strings entered in the Studio text inputs do not break component flex/grid containers.
3. **Responsive Viewport Frame Bounds:** In the Studio, switching viewports (Desktop &rarr; Tablet &rarr; Mobile) must isolate canvas width without horizontal viewport scrolling on mobile devices.
4. **Search and Filter Combinations:** On `/components`, verify combining category filter pills (e.g. "Patterns") with a search term (e.g. "Auth") filters accurately without stale results.
5. **Self-Contained JSX Syntax Validity:** Ensure generated code snippets contain valid JSX with escaped characters where necessary.

---

### Task 1: Template Registry & Code Serializer (`lib/templates.ts`)

**Files:**
- Create: `lib/templates.ts`
- Test: `tests/templates.test.ts`

**Interfaces:**
- Produces:
  - `ComponentTemplate` and `TemplateProperty` types
  - `TEMPLATES: Record<string, ComponentTemplate>`
  - `getTemplateById(id: string): ComponentTemplate | undefined`
  - Initial 6 templates: `button`, `card`, `input`, `badge`, `auth-card`, `stat-card`

- [ ] **Step 1: Write the failing test for Template Registry**

```typescript
// tests/templates.test.ts
import { describe, it, expect } from 'vitest';
import { TEMPLATES, getTemplateById } from '../lib/templates';

describe('Template Registry', () => {
  it('registers all 6 foundational templates', () => {
    expect(TEMPLATES).toHaveProperty('button');
    expect(TEMPLATES).toHaveProperty('card');
    expect(TEMPLATES).toHaveProperty('input');
    expect(TEMPLATES).toHaveProperty('badge');
    expect(TEMPLATES).toHaveProperty('auth-card');
    expect(TEMPLATES).toHaveProperty('stat-card');
  });

  it('retrieves template by ID and verifies self-contained JSX generation', () => {
    const template = getTemplateById('button');
    expect(template).toBeDefined();
    const jsx = template!.generateJsx(
      { label: 'Submit Order' },
      template!.defaultTokens
    );
    expect(jsx).toContain('Submit Order');
    expect(jsx).toContain('rounded-[');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/templates.test.ts`
Expected: FAIL with "Cannot find module '../lib/templates'"

- [ ] **Step 3: Implement `lib/templates.ts`**

Define schema, initial 6 templates with default tokens, configurable props (text label, radius, colors), live render function, and self-contained JSX code generator.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/templates.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/templates.ts tests/templates.test.ts
git commit -m "feat(templates): implement strongly-typed template registry and JSX serializers"
```

---

### Task 2: Informational Editorial Landing Page (`app/page.tsx` & components)

**Files:**
- Create: `components/landing/editorial-hero.tsx`
- Create: `components/landing/engineering-ethos.tsx`
- Create: `components/landing/curated-showcase.tsx`
- Create: `components/landing/editorial-footer.tsx`
- Modify: `components/landing/navbar.tsx`
- Modify: `app/page.tsx`
- Test: `tests/editorial-landing.test.tsx`

**Interfaces:**
- Consumes: `Button`, `Badge` from `components/ui/`
- Produces: Editorial landing page on `/` with zero gradient text and navigation linking to `/components`

- [ ] **Step 1: Write failing test for Editorial Landing Page**

```tsx
// tests/editorial-landing.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Editorial Landing Page', () => {
  it('renders editorial hero with no gradient text', () => {
    const { container } = render(<Page />);
    expect(screen.getByText(/built for architectural precision/i)).toBeDefined();
    expect(container.querySelector('.bg-clip-text')).toBeNull();
  });

  it('provides Explore Components link to /components', () => {
    render(<Page />);
    const ctaLinks = screen.getAllByRole('link', { name: /explore components|browse/i });
    expect(ctaLinks.some(l => l.getAttribute('href') === '/components')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/editorial-landing.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement editorial landing components and assemble in `app/page.tsx`**

Build `editorial-hero.tsx`, `engineering-ethos.tsx`, `curated-showcase.tsx`, update `navbar.tsx` and `editorial-footer.tsx`. Remove the inline hero playground from `/`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/editorial-landing.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/landing app/page.tsx tests/editorial-landing.test.tsx
git commit -m "feat(landing): redesign landing page with minimalist editorial aesthetic"
```

---

### Task 3: Searchable & Filterable Component Catalog (`app/components/page.tsx`)

**Files:**
- Create: `components/catalog/catalog-header.tsx`
- Create: `components/catalog/template-card.tsx`
- Create: `app/components/page.tsx`
- Test: `tests/catalog.test.tsx`

**Interfaces:**
- Consumes: `TEMPLATES` from `lib/templates.ts`, `Badge`, `Button`
- Produces: Searchable, category-filtered catalog directory on `/components`

- [ ] **Step 1: Write failing test for Catalog Page**

```tsx
// tests/catalog.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CatalogPage from '../app/components/page';

describe('Component Catalog', () => {
  it('renders all templates and category filter pills', () => {
    render(<CatalogPage />);
    expect(screen.getByPlaceholderText(/search components/i)).toBeDefined();
    expect(screen.getByText(/all/i)).toBeDefined();
    expect(screen.getByText(/primary action button/i)).toBeDefined();
  });

  it('filters templates when search query is entered', () => {
    render(<CatalogPage />);
    const input = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(input, { target: { value: 'Auth' } });
    expect(screen.getByText(/authentication pattern/i)).toBeDefined();
    expect(screen.queryByText(/primary action button/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/catalog.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `components/catalog/` components and `app/components/page.tsx`**

Build responsive grid with search state, filter pills, card previews, and "Customize in Studio" links pointing to `/studio/[id]`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/catalog.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/catalog app/components tests/catalog.test.tsx
git commit -m "feat(catalog): implement searchable and filterable component catalog on /components"
```

---

### Task 4: Dedicated Full-Screen Customizer Studio Workspace (`app/studio/[id]/page.tsx`)

**Files:**
- Create: `components/studio/studio-header.tsx`
- Create: `components/studio/inspector-panel.tsx`
- Create: `components/studio/preview-viewport.tsx`
- Create: `components/studio/code-export-modal.tsx`
- Create: `app/studio/[id]/page.tsx`
- Test: `tests/studio.test.tsx`

**Interfaces:**
- Consumes: `getTemplateById` from `lib/templates.ts`, `Slider`, `Input`, `Button`, `Dialog`
- Produces: Live customizer studio on `/studio/[id]` with real-time property controls and code export

- [ ] **Step 1: Write failing test for Studio Page**

```tsx
// tests/studio.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import StudioPage from '../app/studio/[id]/page';

describe('Customizer Studio', () => {
  it('renders studio workspace for valid template id', async () => {
    // Mock Next.js dynamic params
    const page = await StudioPage({ params: Promise.resolve({ id: 'button' }) });
    render(page);
    expect(screen.getByText(/primary action button/i)).toBeDefined();
    expect(screen.getByText(/corner radius/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeDefined();
  });

  it('renders 404 fallback for invalid template id', async () => {
    const page = await StudioPage({ params: Promise.resolve({ id: 'non-existent' }) });
    render(page);
    expect(screen.getByText(/template not found/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/studio.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement studio components and `app/studio/[id]/page.tsx`**

Build split-screen workspace: Header with viewport toggles, Left Inspector for colors/radius/typography/text, Center Canvas, and Code Export Modal with tabbed output.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/studio.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/studio app/studio tests/studio.test.tsx
git commit -m "feat(studio): implement dedicated full-screen customizer studio on /studio/[id]"
```

---

### Task 5: End-to-End Test Suite Verification & Production Build

**Files:**
- Update: `tests/landing-page.test.tsx`
- Verify: All tests across `tests/` pass
- Verify: `npm run build` succeeds

- [ ] **Step 1: Update existing legacy tests to match new multi-page architecture**

Align older test assertions with new component locations and routes.

- [ ] **Step 2: Run full test suite**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 3: Run Next.js production build**

Run: `npm run build`
Expected: Production build succeeds with 0 errors, generating static routes for `/`, `/components`, and dynamic route `/studio/[id]`.

- [ ] **Step 4: Commit**

```bash
git add tests/
git commit -m "test: align full test suite and verify production build"
```

