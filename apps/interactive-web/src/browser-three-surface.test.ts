import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { mountBrowserThreeSurface } from './browser-three-surface.js';

describe('Browser Three surface', () => {
  it('creates a WebGL renderer for the canvas and delegates to the interactive surface', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 180 }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const renderer = { render: vi.fn(), dispose: vi.fn(), setSize: vi.fn() };
    const createRenderer = vi.fn(() => renderer);
    const onFocus = vi.fn();

    const surface = mountBrowserThreeSurface({
      canvas,
      frame: experience.frame,
      navigate: vi.fn(),
      onFocus,
      reducedMotion: true,
      createRenderer,
    });

    expect(createRenderer).toHaveBeenCalledWith(canvas);
    expect(renderer.setSize).toHaveBeenCalledWith(320, 180, false);
    expect(renderer.render).toHaveBeenCalledWith(
      surface.projection.scene,
      surface.projection.camera,
    );
    surface.dispose();
  });
});
