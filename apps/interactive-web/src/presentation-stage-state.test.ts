import { describe, expect, it } from 'vitest';
import { applyPresentationStageState } from './presentation-stage-state.js';

describe('presentation stage state', () => {
  it('projects runtime media status into a semantic stage attribute', () => {
    const stage = document.createElement('section');
    applyPresentationStageState(stage, { status: 'loading', mediaId: 'current' });
    expect(stage.dataset.presentationState).toBe('loading');
    applyPresentationStageState(stage, { status: 'visible', mediaId: 'next' });
    expect(stage.dataset.presentationState).toBe('visible');
  });

  it('is a no-op when the stage is unavailable', () => {
    expect(() => applyPresentationStageState(null, { status: 'failed', mediaId: undefined })).not.toThrow();
  });
});
