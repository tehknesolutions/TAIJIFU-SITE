import { describe, expect, it, vi } from 'vitest';
import { bootstrapInteractiveWeb } from './browser-bootstrap.js';

describe('Interactive web browser bootstrap', () => {
  it('mounts the canonical TAI experience without inventing routes', () => {
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 180 }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const navigate = vi.fn();
    const dispose = vi.fn();
    const mountSurface = vi.fn(() => ({ dispose }));

    const runtime = bootstrapInteractiveWeb({ canvas, navigate, mountSurface });

    expect(runtime.experience.frame.productKind).toBe('interactive-web-site');
    expect(runtime.experience.frame.nodes).toEqual([
      { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' },
    ]);
    expect(mountSurface).toHaveBeenCalledWith({
      canvas,
      frame: runtime.experience.frame,
      navigate,
    });

    runtime.dispose();
    expect(dispose).toHaveBeenCalledOnce();
  });
});
