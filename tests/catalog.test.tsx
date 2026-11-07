import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CatalogPage from '../app/components/page';

describe('Component Catalog', () => {
  it('renders all templates and category filter pills', () => {
    render(<CatalogPage />);
    expect(screen.getByPlaceholderText(/search components/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /^all$/i })).toBeDefined();
    expect(screen.getByText(/primary action button/i)).toBeDefined();
  });

  it('filters templates when search query is entered', () => {
    render(<CatalogPage />);
    const input = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(input, { target: { value: 'Auth' } });
    expect(screen.getByText(/authentication card/i)).toBeDefined();
    expect(screen.queryByText(/primary action button/i)).toBeNull();
  });
});

