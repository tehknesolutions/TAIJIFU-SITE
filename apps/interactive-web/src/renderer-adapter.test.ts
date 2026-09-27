import { describe, expect, it } from 'vitest';
import { createExperienceShell } from './experience-shell';
import { createRendererAdapter } from './renderer-adapter';

describe('RendererAdapter', () => {
  it('renders website experience nodes without introducing game-state concepts', () => {
    const shell = createExperienceShell({
      nodes: [
        { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
      ],
    });

    const adapter = createRendererAdapter();
    const frame = adapter.render(shell);

    expect(frame.productKind).toBe('interactive-web-site');
    expect(frame.nodes).toEqual([
      { id: 'tai', label: 'Tai', canonicalUrl: '/principios/tai/' },
    ]);
    expect(frame).not.toHaveProperty('health');
    expect(frame).not.toHaveProperty('score');
    expect(frame).not.toHaveProperty('inventory');
  });
});
