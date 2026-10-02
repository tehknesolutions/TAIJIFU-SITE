import { describe, expect, it } from 'vitest';
import { getEditorialScope } from './editorial-scope.js';

describe('TAIJIFU editorial scope', () => {
  it('marks history as recoverable official content', () => {
    expect(getEditorialScope('historia')).toMatchObject({
      routeId: 'historia',
      state: 'official',
      sourceAuthority: 'Issue #7 — CANON Visual V1',
    });
  });

  it('marks references as pending instead of inventing official copy', () => {
    expect(getEditorialScope('referencias')).toMatchObject({
      routeId: 'referencias',
      state: 'pending',
    });
  });

  it('rejects unknown editorial routes', () => {
    expect(getEditorialScope('treino-personalizado')).toBeNull();
  });
});
