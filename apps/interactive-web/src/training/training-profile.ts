export type TrainingProfileInput = {
  ageRange?: string;
  experience?: string;
  primaryGoal?: string;
  secondaryGoals?: string[];
  preferredPractices?: string[];
  rejectedMovements?: string[];
  targetCapacities?: string[];
  equipment?: string[];
  space?: string;
  durationMinutes?: number;
  frequencyPerWeek?: number;
  desiredIntensity?: number;
  declaredRestrictions?: string[];
  readiness?: number;
};

export type TrainingProfile = {
  ageRange?: string;
  experience?: string;
  primaryGoal: string;
  secondaryGoals: string[];
  preferredPractices: string[];
  rejectedMovements: string[];
  targetCapacities: string[];
  equipment: string[];
  space?: string;
  durationMinutes: number;
  frequencyPerWeek?: number;
  desiredIntensity: number;
  declaredRestrictions: string[];
  readiness?: number;
};

export type ProfileValidationError = {
  field: 'primaryGoal' | 'durationMinutes' | 'desiredIntensity' | 'readiness';
  code: 'required' | 'out-of-range';
};

export type ProfileValidationResult =
  | { valid: true; profile: TrainingProfile }
  | { valid: false; errors: ProfileValidationError[] };

function normalizeText(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeList(values: string[] | undefined): string[] {
  const normalized = (values ?? []).map((value) => value.trim()).filter(Boolean);
  return [...new Set(normalized)];
}

export function normalizeTrainingProfile(input: TrainingProfileInput): ProfileValidationResult {
  const primaryGoal = normalizeText(input.primaryGoal);
  const errors: ProfileValidationError[] = [];

  if (!primaryGoal) errors.push({ field: 'primaryGoal', code: 'required' });
  if (!Number.isFinite(input.durationMinutes) || (input.durationMinutes ?? 0) < 1) {
    errors.push({ field: 'durationMinutes', code: 'out-of-range' });
  }
  if (!Number.isFinite(input.desiredIntensity) || (input.desiredIntensity ?? 0) < 1 || (input.desiredIntensity ?? 0) > 10) {
    errors.push({ field: 'desiredIntensity', code: 'out-of-range' });
  }
  if (input.readiness !== undefined && (!Number.isFinite(input.readiness) || input.readiness < 1 || input.readiness > 5)) {
    errors.push({ field: 'readiness', code: 'out-of-range' });
  }

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    profile: {
      ageRange: normalizeText(input.ageRange),
      experience: normalizeText(input.experience),
      primaryGoal: primaryGoal!,
      secondaryGoals: normalizeList(input.secondaryGoals),
      preferredPractices: normalizeList(input.preferredPractices),
      rejectedMovements: normalizeList(input.rejectedMovements),
      targetCapacities: normalizeList(input.targetCapacities),
      equipment: normalizeList(input.equipment),
      space: normalizeText(input.space),
      durationMinutes: input.durationMinutes!,
      frequencyPerWeek: input.frequencyPerWeek,
      desiredIntensity: input.desiredIntensity!,
      declaredRestrictions: normalizeList(input.declaredRestrictions),
      readiness: input.readiness,
    },
  };
}
