import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { mountThreeWebSurface } from './three-web-surface.js';

describe('Three web surface', () => {
  it('renders the projection and binds pointer focus plus canonical navigation', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const listeners = new Map<string, (event: { clientX: number; clientY: number }) => void>();
    const canvas = {
      getBoundingClientRect: () => ({ left: 100, top: 50, width: 200, height: 100 }),
      addEventListener: vi.fn((type, listener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type) => listeners.delete(type)),
    };
    const renderer = { render: vi.fn(), dispose: vi.fn() };
    const navigate = vi.fn();
    const onFocus = vi.fn();
    const surface = mountThreeWebSurface({
      canvas,
      frame: experience.frame,
      navigate,
      renderer,
      onFocus,
    });

    expect(surface.projection.camera.aspect).toBe(2);
    expect(renderer.render).toHaveBeenCalledWith(
      surface.projection.scene,
      surface.projection.camera,
    );
    expect(canvas.addEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    );
    expect(canvas.addEventListener).toHaveBeenCalledWith(
      'pointerleave',
      expect.any(Function),
    );
    expect(canvas.addEventListener).toHaveBeenCalledWith(
      'pointerup',
      expect.any(Function),
    );

    listeners.get('pointermove')?.({ clientX: 200, clientY: 100 });
    expect(onFocus).toHaveBeenCalledWith({
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    });

    surface.dispose();
    expect(canvas.removeEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    );
    expect(canvas.removeEventListener).toHaveBeenCalledWith(
      'pointerleave',
      expect.any(Function),
    );
    expect(canvas.removeEventListener).toHaveBeenCalledWith(
      'pointerup',
      expect.any(Function),
    );
    expect(renderer.dispose).toHaveBeenCalledOnce();
  });
});
