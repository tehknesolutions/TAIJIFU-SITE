import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { mountThreeWebSurface } from './three-web-surface.js';

describe('Three web surface', () => {
  it('renders the projection and binds pointer navigation through an injected browser surface', () => {
    const experience = createInteractiveWebExperience({ nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }] });
    const listeners = new Map<string, (event: { clientX: number; clientY: number }) => void>();
    const canvas = {
      getBoundingClientRect: () => ({ left: 100, top: 50, width: 200, height: 100 }),
      addEventListener: vi.fn((type, listener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type) => listeners.delete(type)),
    };
    const renderer = { render: vi.fn(), dispose: vi.fn() };
    const navigate = vi.fn();
    const surface = mountThreeWebSurface({ canvas, frame: experience.frame, navigate, renderer });

    expect(surface.projection.camera.aspect).toBe(2);
    expect(renderer.render).toHaveBeenCalledWith(surface.projection.scene, surface.projection.camera);
    expect(canvas.addEventListener).toHaveBeenCalledWith('pointerup', expect.any(Function));

    surface.dispose();
    expect(canvas.removeEventListener).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(renderer.dispose).toHaveBeenCalledOnce();
  });
});
