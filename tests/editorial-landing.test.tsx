import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Editorial Landing Page', () => {
  it('renders editorial hero with no gradient text', () => {
    const { container } = render(<Page />);
    expect(screen.getByText(/built for architectural precision/i)).toBeDefined();
    // Ensure no vibecoded text gradient classes exist on the landing page
    expect(container.querySelector('.bg-clip-text')).toBeNull();
  });

  it('provides Explore Components link to /components', () => {
    render(<Page />);
    const ctaLinks = screen.getAllByRole('link', { name: /explore components|browse/i });
    expect(ctaLinks.some(l => l.getAttribute('href') === '/components')).toBe(true);
  });
});

