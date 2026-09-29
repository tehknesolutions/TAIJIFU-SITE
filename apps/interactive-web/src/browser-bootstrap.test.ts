import { describe, expect, it, vi } from 'vitest';
import { bootstrapInteractiveWeb } from './browser-bootstrap.js';

describe('Interactive web browser bootstrap', () => {
  it('mounts the current canonical site graph without inventing routes', () => {
    const canvas = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 320, height: 180 }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const navigate = vi.fn();
    const onFocus = vi.fn();
    const dispose = vi.fn();
    const focusNode = vi.fn();
    const mountSurface = vi.fn(() => ({ dispose, focusNode }));

    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate,
      onFocus,
      mountSurface,
    });

    expect(runtime.experience.frame.productKind).toBe('interactive-web-site');
    expect(runtime.experience.frame.nodes[0]).toEqual(
      expect.objectContaining({
        id: 'home',
        label: 'TAIJIFU',
        canonicalUrl: '/',
      }),
    );
    expect(runtime.experience.frame.nodes).toContainEqual(
      expect.objectContaining({
        id: 'tai',
        label: 'TAI',
        canonicalUrl: '/principios/tai/',
        parentId: 'fundamentos',
      }),
    );
    expect(mountSurface).toHaveBeenCalledWith({
      canvas,
      frame: runtime.experience.frame,
      navigate,
      onFocus,
    });

    runtime.focusNode('tai');
    expect(focusNode).toHaveBeenCalledWith('tai');

    const focused = bootstrapInteractiveWeb({ canvas, navigate, mountSurface, initialFocusNode: 'fu' });
    expect(focusNode).toHaveBeenLastCalledWith('fu');
    focused.dispose();

    runtime.dispose();
    expect(dispose).toHaveBeenCalledOnce();
  });
});
