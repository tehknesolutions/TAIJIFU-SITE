import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo Canon Path boundaries', () => {
  it('keeps previous/next inside every Canon Path', () => {
    expect(canonSnapshot.paths.length).toBeGreaterThan(0);

    for (const path of canonSnapshot.paths) {
      expect(path.nucleusIds).toHaveLength(4);

      for (const [index, nucleusId] of path.nucleusIds.entries()) {
        const navigation = getDojoNucleusNavigation(nucleusId, 'pt-BR');
        expect(navigation?.path.id).toBe(path.id);
        expect(navigation?.pathPosition).toBe(index + 1);
        expect(navigation?.pathSize).toBe(path.nucleusIds.length);
        expect(navigation?.pathNuclei.map(({ id }) => id)).toEqual(path.nucleusIds);
        expect(navigation?.previous?.id ?? null).toBe(index === 0 ? null : path.nucleusIds[index - 1]);
        expect(navigation?.next?.id ?? null).toBe(index === path.nucleusIds.length - 1 ? null : path.nucleusIds[index + 1]);
      }
    }
  });
});
