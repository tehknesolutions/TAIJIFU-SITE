import { describe, expect, it } from 'vitest';
import { canonCurriculumOverview } from './canon-curriculum-pages.js';

describe('canonical curriculum journey', () => {
  it('preserves the complete TAIJIFU-CANON-1.0 totals', () => {
    expect(canonCurriculumOverview).toHaveLength(10);
    expect(canonCurriculumOverview.reduce((sum, belt) => sum + belt.pathCount, 0)).toBe(32);
    expect(canonCurriculumOverview.reduce((sum, belt) => sum + belt.nucleusCount, 0)).toBe(128);
  });
});
