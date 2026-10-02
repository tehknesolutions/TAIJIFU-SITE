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
        canonicalUrl: '/pt-br/principios/tai/',
        parentId: 'fundamentos',
      }),
    );
    expect(mountSurface).toHaveBeenNthCalledWith(1, {
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
    expect(dispose).toHaveBeenCalledTimes(2);
  });

  it('uses the governed locale when building the interactive experience', () => {
    const mountSurface = vi.fn(() => ({ dispose: vi.fn(), focusNode: vi.fn() }));
    const runtime = bootstrapInteractiveWeb({
      canvas: {} as never,
      navigate: vi.fn(),
      mountSurface,
      locale: 'pt-BR',
    });

    expect(runtime.experience.frame.nodes).toContainEqual(expect.objectContaining({ id: 'historia', label: 'História' }));
  });

  it('mounts personalized training only when a training root is supplied', () => {
    const canvas = {} as never;
    const trainingRoot = document.createElement('section');
    const trainingDispose = vi.fn();
    const mountTraining = vi.fn(() => ({ getState: vi.fn(), dispose: trainingDispose }));
    const mountSurface = vi.fn(() => ({ dispose: vi.fn(), focusNode: vi.fn() }));

    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate: vi.fn(),
      mountSurface,
      trainingRoot,
      mountTraining,
    });

    expect(mountTraining).toHaveBeenCalledOnce();
    expect(mountTraining).toHaveBeenCalledWith(trainingRoot);
    expect(runtime.trainingAvailable).toBe(true);

    runtime.dispose();
    expect(trainingDispose).toHaveBeenCalledOnce();
  });

  it('does not mount personalized training on routes without its root', () => {
    const mountTraining = vi.fn();
    const mountSurface = vi.fn(() => ({ dispose: vi.fn(), focusNode: vi.fn() }));

    const runtime = bootstrapInteractiveWeb({
      canvas: {} as never,
      navigate: vi.fn(),
      mountSurface,
      mountTraining,
    });

    expect(mountTraining).not.toHaveBeenCalled();
    expect(runtime.trainingAvailable).toBe(false);
  });
});