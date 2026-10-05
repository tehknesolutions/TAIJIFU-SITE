import { describe, expect, it } from 'vitest';
import { getDojoNuclei, getDojoNucleiByPath, getDojoNucleus } from './canon-dojo-projection.js';

describe('Canon Dojo nucleus projection', () => {
  it('exposes all 128 nuclei with legacy instruction attached as a candidate layer', () => {
    const nuclei = getDojoNuclei();
    expect(nuclei).toHaveLength(128);
    expect(nuclei.every(({ authority, instructional }) =>
      authority === 'canon-entity-plus-legacy-candidate-instruction' &&
      instructional.source.layer === 'legacy-candidate')).toBe(true);
  });

  it('projects a nucleus without mutating its Canon identity', () => {
    const item = getDojoNucleus('NUC-N001');
    expect(item).not.toBeNull();
    expect(item?.nucleus.id).toBe('NUC-N001');
    expect(item?.nucleus.name).toBeTruthy();
    expect(item?.instructional.id).toBe('NUC-N001');
  });

  it('follows Canon path membership', () => {
    const path = getDojoNucleiByPath('PATH-W01');
    expect(path).toHaveLength(4);
    expect(path.map(({ nucleus }) => nucleus.id)).toEqual([
      'NUC-N001', 'NUC-N002', 'NUC-N003', 'NUC-N004',
    ]);
  });

  it('returns an empty projection for an unknown path', () => {
    expect(getDojoNucleiByPath('PATH-UNKNOWN')).toEqual([]);
  });
});
