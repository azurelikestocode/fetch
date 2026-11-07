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

  it('generates correct variant classes for badge template', () => {
    const badgeTemplate = getTemplateById('badge');
    expect(badgeTemplate).toBeDefined();

    const solidJsx = badgeTemplate!.generateJsx({ label: 'Active', variant: 'solid' }, badgeTemplate!.defaultTokens);
    expect(solidJsx).toContain('bg-[');
    expect(solidJsx).not.toContain('/10');

    const outlineJsx = badgeTemplate!.generateJsx({ label: 'Draft', variant: 'outline' }, badgeTemplate!.defaultTokens);
    expect(outlineJsx).toContain('border-[');
    expect(outlineJsx).toContain('bg-transparent');
  });

  it('safely escapes quotes in JSX attribute serialization', () => {
    const inputTemplate = getTemplateById('input');
    expect(inputTemplate).toBeDefined();

    const jsx = inputTemplate!.generateJsx({ placeholder: '15" Display' }, inputTemplate!.defaultTokens);
    expect(jsx).not.toContain('placeholder="15" Display"');
    expect(jsx).toContain('&quot;');
  });
});

