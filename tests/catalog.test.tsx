import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CatalogPage from '../app/components/page';

describe('Component Catalog', () => {
  it('renders all templates and category filter pills', () => {
    render(<CatalogPage />);
    expect(screen.getByPlaceholderText(/search components/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /^all$/i })).toBeDefined();
    expect(screen.getByText(/voice note waveform player/i)).toBeDefined();
  });

  it('filters templates when search query is entered', () => {
    render(<CatalogPage />);
    const input = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(input, { target: { value: 'Auth' } });
    expect(screen.getByText(/authentication card/i)).toBeDefined();
    expect(screen.queryByText(/voice note waveform player/i)).toBeNull();
  });

  it('handles search queries with leading/trailing whitespace', () => {
    render(<CatalogPage />);
    const input = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(input, { target: { value: '  Auth   ' } });
    expect(screen.getByText(/authentication card/i)).toBeDefined();
    expect(screen.queryByText(/voice note waveform player/i)).toBeNull();
  });
});
