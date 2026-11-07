  import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
  it('merges class names and resolves tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('bg-red-500', false && 'text-white', 'text-black')).toBe('bg-red-500 text-black');
  });

  it('provides copyToClipboard helper with success boolean', async () => {
    const { copyToClipboard } = await import('../lib/utils');
    expect(typeof copyToClipboard).toBe('function');
  });
});

