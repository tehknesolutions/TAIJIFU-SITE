import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';
import { handleCanonicalPointerNavigation } from './browser-pointer-navigation.js';

describe('Browser pointer navigation', () => {
  it('converts client coordinates to NDC and navigates to the canonical URL', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeRendererAdapter().render(experience.frame);
    projection.scene.updateMatrixWorld(true);
    projection.camera.updateMatrixWorld(true);
    const navigate = vi.fn();

    const result = handleCanonicalPointerNavigation(
      { clientX: 150, clientY: 100 },
      { left: 100, top: 50, width: 100, height: 100 },
      projection.camera,
      projection.nodes,
      navigate,
    );

    expect(result).toEqual({ nodeId: 'tai', canonicalUrl: '/principios/tai/' });
    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith('/principios/tai/');
  });

  it('does not navigate when the pointer misses the projected nodes', () => {
    const experience = createInteractiveWebExperience({
      nodes: [{ id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/' }],
    });
    const projection = createThreeRendererAdapter().render(experience.frame);
    projection.scene.updateMatrixWorld(true);
    projection.camera.updateMatrixWorld(true);
    const navigate = vi.fn();

    expect(handleCanonicalPointerNavigation(
      { clientX: 199, clientY: 51 },
      { left: 100, top: 50, width: 100, height: 100 },
      projection.camera,
      projection.nodes,
      navigate,
    )).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });
});