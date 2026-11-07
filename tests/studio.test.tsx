import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import StudioPage from '../app/studio/[id]/page';

describe('Customizer Studio', () => {
  it('renders studio workspace for valid template id', async () => {
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

