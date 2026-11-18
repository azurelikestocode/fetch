import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import StudioPage from '../app/studio/[id]/page';

describe('Customizer Studio', () => {
  it('renders studio workspace for valid template id', async () => {
    const page = await StudioPage({ params: Promise.resolve({ id: 'audio-waveform-player' }) });
    render(page);
    expect(screen.getByText(/voice note waveform player/i)).toBeDefined();
    expect(screen.getByText(/corner radius/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeDefined();
  });

  it('renders 404 fallback for invalid template id', async () => {
    const page = await StudioPage({ params: Promise.resolve({ id: 'non-existent' }) });
    render(page);
    expect(screen.getByText(/template not found/i)).toBeDefined();
  });
});
