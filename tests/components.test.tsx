import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

describe('UI Primitives', () => {
  it('renders Button with primary variant styles', () => {
    render(<Button variant="primary">Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn.className).toContain('bg-[var(--primary)]');
    expect(btn.className).toContain('rounded-[var(--radius)]');
  });

  it('renders Badge with subtle variant', () => {
    render(<Badge variant="subtle">Alpha</Badge>);
    const badge = screen.getByText('Alpha');
    expect(badge).toBeDefined();
    expect(badge.getAttribute('style')).toContain('color-mix');
  });

  it('renders Input with accessible attributes', () => {
    render(<Input placeholder="Enter text..." disabled />);
    const input = screen.getByPlaceholderText('Enter text...');
    expect(input.hasAttribute('disabled')).toBe(true);
    expect(input.className).toContain('rounded-[var(--radius)]');
  });

  it('renders Card with header and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Card Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeDefined();
    expect(screen.getByText('Card Content')).toBeDefined();
  });
});

