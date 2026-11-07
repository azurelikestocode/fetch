import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Editorial Landing Page Assembly', () => {
  it('renders all key editorial sections', () => {
    render(<Page />);
    expect(screen.getByText(/built for architectural precision/i)).toBeDefined();
    expect(screen.getByText(/engineering ethos/i)).toBeDefined();
    expect(screen.getByText(/curated component roster/i)).toBeDefined();
  });
});
