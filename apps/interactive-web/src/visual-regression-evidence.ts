import { visualRegressionMatrix, type VisualRegressionScenario } from './visual-regression-contract.js';

export type VisualRegressionEvidence = Readonly<{
  scenarioId: VisualRegressionScenario['id'];
  authority: 'evidence-only';
  brandBookPath: 'docs/brand/BRAND-BOOK-V1.md';
  invariant: string;
  baselinePath: string;
  status: 'pending-capture' | 'captured' | 'approved';
}>;

export const visualRegressionEvidence: readonly VisualRegressionEvidence[] = Object.freeze(
  visualRegressionMatrix.map((scenario) => Object.freeze({
    scenarioId: scenario.id,
    authority: 'evidence-only' as const,
    brandBookPath: 'docs/brand/BRAND-BOOK-V1.md' as const,
    invariant: scenario.invariant,
    baselinePath: `apps/interactive-web/visual-regression/baselines/${scenario.id}.png`,
    status: 'pending-capture' as const,
  })),
);
