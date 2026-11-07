# Fetch Phase 1 Landing Page & Core Primitives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch the Phase 1 developer landing page for Fetch, featuring an interactive live-token hero playground card, theme presets, the 5 foundational UI primitives (Button, Card, Input, Badge, Dialog), workflow pillars, component showcase grid, and quickstart documentation.

**Architecture:** A unified Next.js 15 App Router application with Tailwind CSS and CSS custom properties for instant client-side theme mutation. The interactive components are isolated inside `.fetch-preview` scopes so token tweaking updates component previews in real-time without distorting outer marketing copy.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, `@radix-ui/react-dialog`, `@radix-ui/react-slider`, `lucide-react`, `clsx`, `tailwind-merge`, Vitest + React Testing Library.

**Spec:** `architecture.md`, `Landing Page Spec.md`, `Hero Playground.md`, `Design Tokens.md`

## Global Constraints
- Target Framework: Next.js 15 App Router with TypeScript.
- Styling Paradigm: Tailwind CSS utility classes combined with scoped CSS Custom Properties (`var(--...)`).
- Component Primitives: Accessible, WAI-ARIA compliant using Radix UI primitives.
- Code Export Contract: Dual-tab view ("Tailwind JSX" for self-contained inline classes, "Theme Tokens" for semantic `var(--...)` snippets).
- Scope Boundary: Phase 1 delivers the full landing page and foundational components; full `/studio` route is deferred to Phase 2.

## Review Focus
1. **Dialog Portal Token Inheritance:** When a Dialog opens, its Radix Portal mounts to the DOM; verify it inherits container-scoped tokens (`--primary`, `--radius`) or mounts within the container scope without losing custom styling.
2. **Arbitrary Radius Value Bounds:** The radius slider allows 0px to 24px; verify extreme values (`0px` sharp and `24px` / pill) do not break layout or overflow button/badge text.
3. **Contrast on Light/Dark Presets:** Ensure `--primary-foreground` maintains legible WCAG AA contrast against each preset color (Indigo, Emerald, Amber, Rose, Violet).
4. **Clipboard Copy Permissions/Fallback:** Ensure the "Copy Code" button handles clipboard API rejections gracefully without crashing the UI.
5. **Mobile Responsiveness of Hero Playground:** Ensure the preview card and token controls stack cleanly on mobile viewports (<640px) without horizontal scrolling.

---

### Task 1: Scaffolding Next.js App, Dependencies & Base Styling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `lib/utils.ts`
- Test: `tests/utils.test.ts`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` in `lib/utils.ts`
- Produces: Global CSS variables (`--primary`, `--radius`, `--surface`, `--border`) in `app/globals.css`

- [ ] **Step 1: Write the failing test for `cn` utility**

```typescript
// tests/utils.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
  it('merges class names and resolves tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('bg-red-500', false && 'text-white', 'text-black')).toBe('bg-red-500 text-black');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/utils.test.ts`
Expected: FAIL with "Cannot find module '../lib/utils'"

- [ ] **Step 3: Initialize Next.js project dependencies and implement `lib/utils.ts`**

Install dependencies: `next`, `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog`, `@radix-ui/react-slider`.
Dev dependencies: `typescript`, `@types/react`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `jsdom`.

Implement `lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Implement `app/globals.css` with CSS custom variables for default theme.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/utils.test.ts`
Expected: PASS

- [ ] **Step 5: Verify Next.js build**

Run: `npm run build`
Expected: Build passes with zero type errors.

---

### Task 2: Token System, Theme Presets & Reactive State Hook

**Files:**
- Create: `lib/tokens.ts`
- Create: `hooks/use-token-theme.ts`
- Test: `tests/tokens.test.ts`

**Interfaces:**
- Consumes: None
- Produces:
  - `ThemeTokens` interface and `THEME_PRESETS` in `lib/tokens.ts`
  - `generateTailwindJsx(component: string, tokens: ThemeTokens): string`
  - `generateThemeCss(tokens: ThemeTokens): string`
  - `useTokenTheme()` hook returning `{ tokens, setRadius, setColor, setPreset, styleObject }`

- [ ] **Step 1: Write the failing tests for token utilities**

```typescript
// tests/tokens.test.ts
import { describe, it, expect } from 'vitest';
import { THEME_PRESETS, generateTailwindJsx, generateThemeCss } from '../lib/tokens';

describe('tokens', () => {
  it('provides all 4 design presets', () => {
    expect(THEME_PRESETS).toHaveProperty('default');
    expect(THEME_PRESETS).toHaveProperty('emerald');
    expect(THEME_PRESETS).toHaveProperty('brutalist');
    expect(THEME_PRESETS).toHaveProperty('minimal');
  });

  it('generates correct CSS variable strings', () => {
    const css = generateThemeCss(THEME_PRESETS.default.tokens);
    expect(css).toContain('--primary:');
    expect(css).toContain('--radius:');
  });

  it('generates self-contained Tailwind JSX snippet with inlined radius', () => {
    const jsx = generateTailwindJsx('button', THEME_PRESETS.default.tokens);
    expect(jsx).toContain('rounded-[');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tokens.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `lib/tokens.ts` and `hooks/use-token-theme.ts`**

Define token interfaces, preset configurations (Default Modern, Emerald Tech, Cyber Brutalist, Minimal Clean), export serializers, and the reactive state hook.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tokens.test.ts`
Expected: PASS

---

### Task 3: Foundational Primitives (Button, Badge, Card, Input, Slider)

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/slider.tsx`
- Test: `tests/components.test.tsx`

**Interfaces:**
- Consumes: `cn` from `lib/utils.ts`
- Produces:
  - `<Button variant="primary" | "secondary" | "outline" | "ghost" size="sm" | "md" | "lg" />`
  - `<Badge variant="solid" | "subtle" | "outline" />`
  - `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`
  - `<Input />`
  - `<Slider value={[number]} min={0} max={24} onValueChange={(val) => void} />`

- [ ] **Step 1: Write failing component tests**

```tsx
// tests/components.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

describe('UI Primitives', () => {
  it('renders Button with primary variant styles', () => {
    render(<Button variant="primary">Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn.className).toContain('bg-[var(--primary)]');
  });

  it('renders Badge with subtle variant', () => {
    render(<Badge variant="subtle">Alpha</Badge>);
    expect(screen.getByText('Alpha')).toBeDefined();
  });

  it('renders Input with accessible attributes', () => {
    render(<Input placeholder="Enter text..." disabled />);
    const input = screen.getByPlaceholderText('Enter text...');
    expect(input.hasAttribute('disabled')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement components in `components/ui/`**

Write standard, accessible React components bound to CSS variables (`var(--radius)`, `var(--primary)`, `var(--border)`, `var(--surface)`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components.test.tsx`
Expected: PASS

---

### Task 4: Accessible Overlay Primitive (Dialog)

**Files:**
- Create: `components/ui/dialog.tsx`
- Test: `tests/dialog.test.tsx`

**Interfaces:**
- Consumes: `@radix-ui/react-dialog`, `cn`
- Produces: `<Dialog>`, `<DialogTrigger>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogFooter>`, `<DialogClose>`

- [ ] **Step 1: Write failing test for Dialog**

```tsx
// tests/dialog.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../components/ui/dialog';

describe('Dialog Primitive', () => {
  it('opens dialog when trigger clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Heading</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText('Modal Heading')).toBeNull();
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.getByText('Modal Heading')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/dialog.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `components/ui/dialog.tsx`**

Implement Radix Dialog wrapper with backdrop blur, surface tokens, and container-friendly portal styling.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/dialog.test.tsx`
Expected: PASS

---

### Task 5: Hero Section & Interactive Playground Card

**Files:**
- Create: `components/landing/hero-playground.tsx`
- Create: `components/landing/hero.tsx`
- Test: `tests/hero-playground.test.tsx`

**Interfaces:**
- Consumes: Primitives (`Button`, `Card`, `Input`, `Badge`, `Slider`), `useTokenTheme`
- Produces: `<Hero />` and `<HeroPlayground />` with live preview and dual-tab code export

- [ ] **Step 1: Write failing test for HeroPlayground**

```tsx
// tests/hero-playground.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroPlayground } from '../components/landing/hero-playground';

describe('HeroPlayground', () => {
  it('renders interactive controls and preview card', () => {
    render(<HeroPlayground />);
    expect(screen.getByText(/radius/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /copy/i })).toBeDefined();
  });

  it('switches between Tailwind JSX and Theme Tokens tabs', () => {
    render(<HeroPlayground />);
    const tokensTab = screen.getByRole('tab', { name: /tokens/i });
    fireEvent.click(tokensTab);
    expect(screen.getByText(/var\(--primary\)/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/hero-playground.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `components/landing/hero-playground.tsx` & `hero.tsx`**

Build the live preview card, the interactive sliders, color preset swatches, and the dual-tabbed syntax code snippet viewer with clipboard copy feedback.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/hero-playground.test.tsx`
Expected: PASS

---

### Task 6: Full Landing Page Assembly & Polish

**Files:**
- Create: `components/landing/navbar.tsx`
- Create: `components/landing/features.tsx`
- Create: `components/landing/showcase-grid.tsx`
- Create: `components/landing/quickstart.tsx`
- Create: `components/landing/footer.tsx`
- Modify: `app/page.tsx`
- Test: `tests/landing-page.test.tsx`

**Interfaces:**
- Consumes: All landing components, primitives, tokens
- Produces: Production Next.js Landing Page on `/`

- [ ] **Step 1: Write failing test for Landing Page integration**

```tsx
// tests/landing-page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

describe('Landing Page', () => {
  it('renders all key sections', () => {
    render(<Page />);
    expect(screen.getByText(/build and customize ui/i)).toBeDefined();
    expect(screen.getByText(/how it works/i)).toBeDefined();
    expect(screen.getByText(/component showcase/i)).toBeDefined();
    expect(screen.getByText(/quickstart/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/landing-page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement remaining landing page sections and wire up `app/page.tsx`**

Assemble Navbar (with smooth scroll and Studio CTA), Features workflow pillars, Showcase Grid (displaying Button, Card, Input, Badge, Dialog reacting to theme), Quickstart code tabs, and Footer.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/landing-page.test.tsx`
Expected: PASS

- [ ] **Step 5: Full verification build**

Run: `npm run build`
Expected: Production build succeeds with 0 errors.

