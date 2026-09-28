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

    surface.focusNode('tai');
    expect(onFocus).toHaveBeenCalledWith({
      nodeId: 'tai',
      label: 'TAI',
      canonicalUrl: '/principios/tai/',
    });

    surface.focusNode(null);
    expect(onFocus).toHaveBeenLastCalledWith(null);

    listeners.get('pointermove')?.({ clientX: 200, clientY: 100 });
    expect(onFocus).toHaveBeenLastCalledWith({
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

  it('previews a canonical destination before committing navigation in hybrid mode', () => {
    vi.useFakeTimers();
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const listeners = new Map<string, (event: { clientX: number; clientY: number }) => void>();
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }),
      addEventListener: vi.fn((type, listener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type) => listeners.delete(type)),
    };
    const renderer = { render: vi.fn(), dispose: vi.fn() };
    const navigate = vi.fn();
    const onTransition = vi.fn();
    const surface = mountThreeWebSurface({
      canvas,
      frame: experience.frame,
      navigate,
      renderer,
      onTransition,
      transitionDurationMs: 180,
    });

    listeners.get('pointerup')?.({ clientX: 100, clientY: 50 });

    expect(navigate).not.toHaveBeenCalled();
    expect(onTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: 'preview',
        nodeId: 'tai',
        canonicalUrl: '/principios/tai/',
      }),
    );
    expect(surface.projection.camera.position.z).toBeLessThan(8.5);

    vi.advanceTimersByTime(180);

    expect(navigate).toHaveBeenCalledWith('/principios/tai/');
    expect(onTransition).toHaveBeenLastCalledWith(
      expect.objectContaining({
        phase: 'commit',
        nodeId: 'tai',
        canonicalUrl: '/principios/tai/',
      }),
    );
    vi.useRealTimers();
  });

  it('commits immediately when reduced motion is requested', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const listeners = new Map<string, (event: { clientX: number; clientY: number }) => void>();
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }),
      addEventListener: vi.fn((type, listener) => listeners.set(type, listener)),
      removeEventListener: vi.fn((type) => listeners.delete(type)),
    };
    const navigate = vi.fn();
    mountThreeWebSurface({
      canvas,
      frame: experience.frame,
      navigate,
      renderer: { render: vi.fn(), dispose: vi.fn() },
      reducedMotion: true,
      transitionDurationMs: 180,
    });

    listeners.get('pointerup')?.({ clientX: 100, clientY: 50 });

    expect(navigate).toHaveBeenCalledWith('/principios/tai/');
  });
});
