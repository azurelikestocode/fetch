import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { HeroPlayground } from '../components/landing/hero-playground';

describe('HeroPlayground', () => {
  it('renders interactive controls and preview card', () => {
    render(<HeroPlayground />);
    expect(screen.getByText(/radius/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /copy code/i })).toBeDefined();
    expect(screen.getByRole('heading', { name: /configurable card/i })).toBeDefined();
  });

  it('switches between Tailwind JSX and Theme Tokens tabs', () => {
    render(<HeroPlayground />);
    const tokensTab = screen.getByRole('tab', { name: /theme tokens/i });
    fireEvent.click(tokensTab);
    expect(screen.getByText(/--primary:/i)).toBeDefined();
  });
});
