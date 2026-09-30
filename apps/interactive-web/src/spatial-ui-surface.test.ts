import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { mountThreeWebSurface } from './three-web-surface.js';

describe('Spatial UI Three surface', () => {
  it('renders only experience roots before focus and reveals the focused branch', () => {
    const experience = createInteractiveWebExperience({
      nodes: [
        { id: 'home', label: 'Home', canonicalUrl: '/' },
        { id: 'fundamentos', label: 'Fundamentos', canonicalUrl: '/fundamentos/', parentId: 'home' },
        { id: 'tai', label: 'TAI', canonicalUrl: '/principios/tai/', parentId: 'fundamentos' },
        { id: 'ji', label: 'JI', canonicalUrl: '/principios/ji/', parentId: 'fundamentos' },
      ],
    });
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const renderer = { render: vi.fn(), dispose: vi.fn() };

    const surface = mountThreeWebSurface({
      canvas,
      frame: experience.frame,
      navigate: vi.fn(),
      renderer,
    });

    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'home')?.visible).toBe(true);
    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'fundamentos')?.visible).toBe(true);
    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'tai')?.visible).toBe(false);
    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'ji')?.visible).toBe(false);

    surface.focusNode('fundamentos');

    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'tai')?.visible).toBe(true);
    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'ji')?.visible).toBe(true);
    expect(surface.projection.nodes.find((node) => node.userData.nodeId === 'fundamentos')?.visible).toBe(true);

    surface.dispose();
  });
});
