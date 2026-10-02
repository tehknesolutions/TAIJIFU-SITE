import type { TrainingCatalog, TrainingCandidate } from './training-catalog.js';
import type { TrainingProfile } from './training-profile.js';

export type CompositionCapability = keyof TrainingCatalog['capabilities'];

export type CompositionItem = Readonly<{
  canonId: string;
  label: string;
  score: number;
  rationale: readonly string[];
}>;

export type CompositionResult =
  | Readonly<{ status: 'composed'; items: readonly CompositionItem[] }>
  | Readonly<{ status: 'no-compatible-candidates' }>
  | Readonly<{ status: 'insufficient-metadata'; missingCapabilities: readonly CompositionCapability[] }>
  | Readonly<{ status: 'invalid-request' }>;

const requiredCapabilities: readonly CompositionCapability[] = [
  'exerciseSelection',
  'dosage',
  'rest',
  'goalScoring',
];

type CandidateMetadata = TrainingCandidate & {
  exercise?: string;
  dosage?: string;
  rest?: string;
  equipment?: readonly string[];
  goals?: readonly string[];
  safetyRestrictions?: readonly string[];
};

function missingRequiredCapabilities(catalog: TrainingCatalog): CompositionCapability[] {
  return requiredCapabilities.filter((capability) => !catalog.capabilities[capability]);
}

function hasSafetyConflict(candidate: CandidateMetadata, profile: TrainingProfile, catalog: TrainingCatalog): boolean {
  if (!catalog.capabilities.safetyFiltering) return false;
  const restrictions = new Set(profile.declaredRestrictions);
  return (candidate.safetyRestrictions ?? []).some((restriction) => restrictions.has(restriction));
}

function scoreCandidate(candidate: CandidateMetadata, profile: TrainingProfile, catalog: TrainingCatalog): CompositionItem {
  let score = 0;
  const rationale: string[] = [];

  if (catalog.capabilities.goalScoring && (candidate.goals ?? []).includes(profile.primaryGoal)) {
    score += 1;
    rationale.push(`goal:${profile.primaryGoal}`);
  }

  return Object.freeze({
    canonId: candidate.canonId,
    label: candidate.label,
    score,
    rationale: Object.freeze(rationale),
  });
}

export function composeTraining(
  profile: TrainingProfile,
  catalog: TrainingCatalog,
  _feedback?: unknown,
): CompositionResult {
  if (!profile.primaryGoal.trim() || profile.durationMinutes < 1 || profile.desiredIntensity < 1 || profile.desiredIntensity > 10) {
    return Object.freeze({ status: 'invalid-request' });
  }

  const missingCapabilities = missingRequiredCapabilities(catalog);
  if (missingCapabilities.length > 0) {
    return Object.freeze({
      status: 'insufficient-metadata',
      missingCapabilities: Object.freeze(missingCapabilities),
    });
  }

  const compatible = (catalog.candidates as readonly CandidateMetadata[])
    .filter((candidate) => !hasSafetyConflict(candidate, profile, catalog))
    .map((candidate) => scoreCandidate(candidate, profile, catalog))
    .sort((a, b) => b.score - a.score || a.canonId.localeCompare(b.canonId));

  if (compatible.length === 0) {
    return Object.freeze({ status: 'no-compatible-candidates' });
  }

  return Object.freeze({
    status: 'composed',
    items: Object.freeze(compatible),
  });
}
