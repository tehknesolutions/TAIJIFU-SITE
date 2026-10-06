import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo Canon Belt navigation', () => {
  it('exposes every Belt in Canon order and enters each at its first Path and first Nucleus', () => {
    for (const currentBelt of canonSnapshot.belts) {
      const firstPath = canonSnapshot.paths.find(({ beltId, code }) => beltId === currentBelt.id && code === currentBelt.pathIds[0])!;
      const navigation = getDojoNucleusNavigation(firstPath.nucleusIds[0], 'pt-BR');

      expect(navigation?.belts).toHaveLength(canonSnapshot.belts.length);
      expect(navigation?.belts.map(({ id }) => id)).toEqual(canonSnapshot.belts.map(({ id }) => id));
      expect(navigation?.belts.filter(({ current }) => current)).toHaveLength(1);
      expect(navigation?.belts.find(({ id }) => id === currentBelt.id)?.current).toBe(true);

      for (const item of navigation!.belts) {
        const belt = canonSnapshot.belts.find(({ id }) => id === item.id)!;
        const path = canonSnapshot.paths.find(({ beltId, code }) => beltId === belt.id && code === belt.pathIds[0])!;
        expect(item.entryPathCode).toBe(path.code);
        expect(item.entryNucleusId).toBe(path.nucleusIds[0]);
        expect(item.url).toContain('/dojo/nucleos/');
      }
    }
  });
});
