import { describe, it, expect } from 'vitest';
import { TEMPLATES, getTemplateById } from '../lib/templates';

describe('Template Registry', () => {
  it('registers all flagship architectural systems', () => {
    expect(TEMPLATES).toHaveProperty('audio-waveform-player');
    expect(TEMPLATES).toHaveProperty('deploy-pipeline-status');
    expect(TEMPLATES).toHaveProperty('telemetry-donut-dial');
    expect(TEMPLATES).toHaveProperty('multiplayer-presence');
    expect(TEMPLATES).toHaveProperty('virtual-card');
    expect(TEMPLATES).toHaveProperty('auth-card');
    expect(TEMPLATES).toHaveProperty('floating-glass-nav');
    expect(TEMPLATES).toHaveProperty('feature-grid');
    expect(TEMPLATES).toHaveProperty('system-incident-banner');
  });

  it('retrieves template by ID and verifies self-contained JSX generation', () => {
    const template = getTemplateById('audio-waveform-player');
    expect(template).toBeDefined();
    const jsx = template!.generateJsx(
      { speakerName: 'Sarah Jenkins', timeElapsed: '01:24' },
      template!.defaultTokens
    );
    expect(jsx).toContain('Sarah Jenkins');
    expect(jsx).toContain('01:24');
    expect(jsx).toContain('rounded-[');
  });

  it('verifies code generation for telemetry and pipeline systems', () => {
    const telemetryTemplate = getTemplateById('telemetry-donut-dial');
    expect(telemetryTemplate).toBeDefined();
    const telemetryJsx = telemetryTemplate!.generateJsx(
      { centerStat: '99.98%' },
      telemetryTemplate!.defaultTokens
    );
    expect(telemetryJsx).toContain('99.98%');
    expect(telemetryJsx).toContain('P99 Latency');

    const pipelineTemplate = getTemplateById('deploy-pipeline-status');
    expect(pipelineTemplate).toBeDefined();
    const pipelineJsx = pipelineTemplate!.generateJsx(
      { branchName: 'main' },
      pipelineTemplate!.defaultTokens
    );
    expect(pipelineJsx).toContain('main');
  });

  it('safely escapes quotes in JSX attribute serialization', () => {
    const aiTemplate = getTemplateById('ai-prompt-bar');
    expect(aiTemplate).toBeDefined();
    const jsx = aiTemplate!.generateJsx(
      { placeholder: 'Ask "Claude" or "Gemini" anything...' },
      aiTemplate!.defaultTokens
    );
    expect(jsx).not.toContain('placeholder="Ask "Claude"');
    expect(jsx).toContain('&quot;');
  });

  it('registers cloud, security, and runtime engineering systems', () => {
    expect(TEMPLATES).toHaveProperty('ai-prompt-bar');
    expect(TEMPLATES).toHaveProperty('code-diff-viewer');
    expect(TEMPLATES).toHaveProperty('usage-quota-meter');
    expect(TEMPLATES).toHaveProperty('kanban-task-card');
    expect(TEMPLATES).toHaveProperty('deploy-pipeline-status');
    expect(TEMPLATES).toHaveProperty('activity-heatmap');
    expect(TEMPLATES).toHaveProperty('secret-rotation-modal');
    expect(TEMPLATES).toHaveProperty('log-stream-console');
    expect(TEMPLATES).toHaveProperty('feature-flag-matrix');
    expect(TEMPLATES).toHaveProperty('webhook-event-inspector');
    expect(TEMPLATES).toHaveProperty('query-metrics-analyzer');
    expect(TEMPLATES).toHaveProperty('event-audit-trail');
    expect(TEMPLATES).toHaveProperty('rate-limiter-budget');

    const heatmapTemplate = getTemplateById('activity-heatmap');
    expect(heatmapTemplate).toBeDefined();
    const heatmapJsx = heatmapTemplate!.generateJsx({ totalEvents: '9,999' }, heatmapTemplate!.defaultTokens);
    expect(heatmapJsx).toContain('9,999');

    const glassNavTemplate = getTemplateById('floating-glass-nav');
    expect(glassNavTemplate).toBeDefined();
    const glassNavJsx = glassNavTemplate!.generateJsx({ logo: 'HyperOS' }, glassNavTemplate!.defaultTokens);
    expect(glassNavJsx).toContain('HyperOS');

    const secretTemplate = getTemplateById('secret-rotation-modal');
    expect(secretTemplate).toBeDefined();
    const secretJsx = secretTemplate!.generateJsx({ secretName: 'VAULT_MASTER_KEY' }, secretTemplate!.defaultTokens);
    expect(secretJsx).toContain('VAULT_MASTER_KEY');
  });
});
