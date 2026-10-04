export type CanonHistoricalOrigin = Readonly<{
  year: 2006;
  label: 'Desde 2006';
  source: 'canon/history/propagation-policy.json';
  modern2026Classification: 'MODERN_PHASE_UNCLASSIFIED';
}>;

/**
 * Platform projection of the EPIC-002 historical invariant.
 *
 * Authority remains the repository Canon. This view model exists so UI and
 * Experience code consume one governed boundary instead of redefining the
 * historical origin independently.
 */
export const canonHistoricalOrigin: CanonHistoricalOrigin = Object.freeze({
  year: 2006,
  label: 'Desde 2006',
  source: 'canon/history/propagation-policy.json',
  modern2026Classification: 'MODERN_PHASE_UNCLASSIFIED',
});

export type ExperienceHistoricalOrigin = Readonly<{
  eyebrow: 'TAIJIFU';
  since: CanonHistoricalOrigin['label'];
  year: CanonHistoricalOrigin['year'];
}>;

export function projectHistoricalOriginToExperience(
  origin: CanonHistoricalOrigin = canonHistoricalOrigin,
): ExperienceHistoricalOrigin {
  return Object.freeze({
    eyebrow: 'TAIJIFU',
    since: origin.label,
    year: origin.year,
  });
}
