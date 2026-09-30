import { describe, expect, it } from 'vitest';
import { visualRegressionMatrix } from './visual-regression-contract.js';
import { visualRegressionEvidence } from './visual-regression-evidence.js';

describe('Brand Book visual regression evidence manifest', () => {
  it('defines evidence for every regression scenario exactly once', () => {
    expect(visualRegressionEvidence.map((evidence) => evidence.scenarioId)).toEqual(
      visualRegressionMatrix.map((scenario) => scenario.id),
    );
    expect(new Set(visualRegressionEvidence.map((evidence) => evidence.scenarioId)).size)
      .toBe(visualRegressionEvidence.length);
  });

  it('traces every evidence record to Brand Book invariants without making screenshots authoritative', () => {
    for (const evidence of visualRegressionEvidence) {
      expect(evidence.authority).toBe('evidence-only');
      expect(evidence.brandBookPath).toBe('docs/brand/BRAND-BOOK-V1.md');
      expect(evidence.invariant.length).toBeGreaterThan(0);
      expect(evidence.baselinePath).toMatch(/^apps\/interactive-web\/visual-regression\/baselines\//);
      expect(evidence.baselinePath).toMatch(/\.png$/);
    }
  });

  it('keeps baseline state pending until a real deterministic capture is produced', () => {
    expect(visualRegressionEvidence.every((evidence) => evidence.status === 'pending-capture')).toBe(true);
  });
});
