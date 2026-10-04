import { describe, expect, it } from 'vitest';
import {
  canonHistoricalOrigin,
  projectHistoricalOriginToExperience,
} from './canon-history-projection.js';

describe('EPIC-002 historical Canon propagation', () => {
  it('projects the governed Platform historical origin', () => {
    expect(canonHistoricalOrigin).toEqual({
      year: 2006,
      label: 'Desde 2006',
      source: 'canon/history/propagation-policy.json',
      modern2026Classification: 'MODERN_PHASE_UNCLASSIFIED',
    });
  });

  it('projects the same governed value into Experience', () => {
    expect(projectHistoricalOriginToExperience()).toEqual({
      eyebrow: 'TAIJIFU',
      since: 'Desde 2006',
      year: 2006,
    });
  });

  it('does not regress 2026 into an origin representation', () => {
    const experience = projectHistoricalOriginToExperience();
    expect(experience.since).not.toBe('Desde 2026');
    expect(experience.year).not.toBe(2026);
  });
});
