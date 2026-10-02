import { describe, expect, it } from 'vitest';
import { editorialSurfaceClass } from './editorial-surface.js';

describe('editorial surface hierarchy', () => {
  it('gives History an official editorial surface', () => {
    expect(editorialSurfaceClass('historia')).toBe('editorial-surface editorial-surface--official');
  });

  it('gives References a visible reconciliation surface', () => {
    expect(editorialSurfaceClass('referencias')).toBe('editorial-surface editorial-surface--pending');
  });

  it('does not classify unknown or SW routes', () => {
    expect(editorialSurfaceClass('treino-personalizado')).toBeNull();
  });
});
