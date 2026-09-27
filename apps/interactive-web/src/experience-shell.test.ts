import { describe, expect, it } from 'vitest';
import { createExperienceShell } from './experience-shell.js';

describe('TAIJIFU Interactive Web Experience shell', () => {
  it('starts as a website experience with canonical fallback and no game state', () => {
    const shell = createExperienceShell({
      nodes: [
        {
          id: 'tai',
          label: 'TAI',
          canonicalUrl: '/principios/tai/',
        },
      ],
    });

    expect(shell.productKind).toBe('interactive-web-site');
    expect(shell.nodes).toEqual([
      expect.objectContaining({ id: 'tai', canonicalUrl: '/principios/tai/' }),
    ]);
    expect(shell).not.toHaveProperty('health');
    expect(shell).not.toHaveProperty('score');
    expect(shell).not.toHaveProperty('inventory');
  });
});
