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
