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

  it('registers modern architectural templates including AI copilot and pipeline tracker', () => {
    expect(TEMPLATES).toHaveProperty('ai-prompt-bar');
    expect(TEMPLATES).toHaveProperty('code-diff-viewer');
    expect(TEMPLATES).toHaveProperty('usage-quota-meter');
    expect(TEMPLATES).toHaveProperty('kanban-task-card');
    expect(TEMPLATES).toHaveProperty('deploy-pipeline-status');

    const aiTemplate = getTemplateById('ai-prompt-bar');
    expect(aiTemplate).toBeDefined();
    const aiJsx = aiTemplate!.generateJsx({ modelName: 'GPT-4o' }, aiTemplate!.defaultTokens);
    expect(aiJsx).toContain('GPT-4o');

    const waveformTemplate = getTemplateById('audio-waveform-player');
    expect(waveformTemplate).toBeDefined();
    const waveformJsx = waveformTemplate!.generateJsx({ speakerName: 'Alex' }, waveformTemplate!.defaultTokens);
    expect(waveformJsx).toContain('Alex');

    const heatmapTemplate = getTemplateById('activity-heatmap');
    expect(heatmapTemplate).toBeDefined();
    const heatmapJsx = heatmapTemplate!.generateJsx({ totalEvents: '9,999' }, heatmapTemplate!.defaultTokens);
    expect(heatmapJsx).toContain('9,999');

    const glassNavTemplate = getTemplateById('floating-glass-nav');
    expect(glassNavTemplate).toBeDefined();
    const glassNavJsx = glassNavTemplate!.generateJsx({ logo: 'HyperOS' }, glassNavTemplate!.defaultTokens);
    expect(glassNavJsx).toContain('HyperOS');
  });
});

