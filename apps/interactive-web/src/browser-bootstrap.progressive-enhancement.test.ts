import { describe, expect, it, vi } from 'vitest';
import { bootstrapInteractiveWeb } from './browser-bootstrap.js';

describe('Web V1 progressive enhancement', () => {
  it('keeps a safe runtime when the optional WebGL surface cannot mount', () => {
    const mountSurface = vi.fn(() => {
      throw new Error('WebGL unavailable');
    });

    expect(() => {
      const runtime = bootstrapInteractiveWeb({
        canvas: {} as never,
        navigate: vi.fn(),
        mountSurface,
      });

      expect(runtime.surfaceAvailable).toBe(false);
      expect(() => runtime.focusNode('tai')).not.toThrow();
      expect(() => runtime.dispose()).not.toThrow();
    }).not.toThrow();

    expect(mountSurface).toHaveBeenCalledOnce();
  });
});
