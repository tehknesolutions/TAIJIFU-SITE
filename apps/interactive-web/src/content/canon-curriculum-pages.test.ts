import { describe, expect, it } from 'vitest';
import { canonCurriculumOverview } from './canon-curriculum-pages.js';

describe('Canon curriculum overview', () => {
  it('projects the complete belt journey from the Canon snapshot', () => {
    expect(canonCurriculumOverview).toHaveLength(10);
    expect(canonCurriculumOverview.reduce((total, belt) => total + belt.pathCount, 0)).toBe(32);
    expect(canonCurriculumOverview.reduce((total, belt) => total + belt.nucleusCount, 0)).toBe(128);
    expect(canonCurriculumOverview[0]).toEqual(
      expect.objectContaining({ id: 'BELT-WHITE', order: 1 }),
    );
    expect(canonCurriculumOverview.at(-1)).toEqual(
      expect.objectContaining({ id: 'BELT-BLACK', pathCount: 0, nucleusCount: 0 }),
    );
  });
});
