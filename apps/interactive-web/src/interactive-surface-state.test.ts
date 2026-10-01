import { describe, expect, it } from 'vitest';
import { applyInteractiveSurfaceState } from './interactive-surface-state.js';

describe('Web V1 interactive surface state', () => {
  it('marks the optional spatial layer unavailable without hiding semantic navigation', () => {
    const section = { dataset: {} as Record<string, string> };
    const status = { textContent: '', hidden: true };

    applyInteractiveSurfaceState(section, status, false);

    expect(section.dataset.surfaceState).toBe('unavailable');
    expect(status.hidden).toBe(false);
    expect(status.textContent).toContain('navegação por links continua disponível');
  });

  it('keeps the status unobtrusive when the spatial layer is available', () => {
    const section = { dataset: {} as Record<string, string> };
    const status = { textContent: 'stale', hidden: false };

    applyInteractiveSurfaceState(section, status, true);

    expect(section.dataset.surfaceState).toBe('available');
    expect(status.hidden).toBe(true);
    expect(status.textContent).toBe('');
  });
});
