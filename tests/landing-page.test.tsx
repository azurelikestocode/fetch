import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Page from '../app/page';

describe('Landing Page', () => {
  it('renders all key sections', () => {
    render(<Page />);
    expect(screen.getByText(/build and customize ui/i)).toBeDefined();
    expect(screen.getByText(/how it works/i)).toBeDefined();
    expect(screen.getByText(/component showcase/i)).toBeDefined();
    expect(screen.getByText(/developer quickstart/i)).toBeDefined();
    expect(screen.getByText(/phase 2/i)).toBeDefined();
  });
});
