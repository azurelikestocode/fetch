import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';

describe('Dialog Primitive', () => {
  it('opens dialog when trigger clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Heading</DialogTitle>
          <DialogDescription>Modal description text</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText('Modal Heading')).toBeNull();
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.getByText('Modal Heading')).toBeDefined();
    expect(screen.getByText('Modal description text')).toBeDefined();
  });

  it('passes scoped container style to DialogContent', () => {
    render(
      <Dialog open>
        <DialogContent style={{ '--radius': '0px' } as React.CSSProperties}>
          <DialogTitle>Styled Modal</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const dialogContent = screen.getByRole('dialog');
    expect(dialogContent.style.getPropertyValue('--radius')).toBe('0px');
  });
});

