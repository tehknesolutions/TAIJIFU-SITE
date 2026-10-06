import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo structural orientation inside a Belt', () => {
  it('derives Path position from Canon belt membership without learner progress semantics', () => {
    for (const path of canonSnapshot.paths) {
      const belt = canonSnapshot.belts.find(({ id }) => id === path.beltId)!;
      const expectedPosition = belt.pathIds.indexOf(path.code) + 1;
      const navigation = getDojoNucleusNavigation(path.nucleusIds[0], 'pt-BR');

      expect(navigation?.belt.id).toBe(belt.id);
      expect(navigation?.beltPathPosition).toBe(expectedPosition);
      expect(navigation?.beltPathCount).toBe(belt.pathIds.length);
      expect(navigation?.beltPathPosition).toBeGreaterThan(0);
    }
  });
});
