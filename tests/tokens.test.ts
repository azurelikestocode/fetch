import { describe, it, expect } from 'vitest';
import { THEME_PRESETS, generateTailwindJsx, generateThemeCss } from '../lib/tokens';

describe('tokens', () => {
  it('provides all 4 design presets', () => {
    expect(THEME_PRESETS).toHaveProperty('default');
    expect(THEME_PRESETS).toHaveProperty('emerald');
    expect(THEME_PRESETS).toHaveProperty('brutalist');
    expect(THEME_PRESETS).toHaveProperty('minimal');
  });

  it('ensures Emerald Tech has WCAG AA compliant dark text foreground', () => {
    expect(THEME_PRESETS.emerald.tokens.primaryForeground).toBe('#09090b');
  });

  it('generates correct CSS variable strings including component usage snippet', () => {
    const css = generateThemeCss(THEME_PRESETS.default.tokens);
    expect(css).toContain('--primary:');
    expect(css).toContain('--radius:');
    expect(css).toContain('rounded-[var(--radius)]');
  });

  it('generates self-contained Tailwind JSX snippet with inlined radius', () => {
    const jsx = generateTailwindJsx('button', THEME_PRESETS.default.tokens);
    expect(jsx).toContain('rounded-[');
    expect(jsx).toContain(THEME_PRESETS.default.tokens.primary);
  });
});

