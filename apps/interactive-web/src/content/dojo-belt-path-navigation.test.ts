import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo Belt Path navigation', () => {
  it('exposes every Canon Path in the current Belt and enters each at its first Nucleus', () => {
    for (const path of canonSnapshot.paths) {
      const belt = canonSnapshot.belts.find(({ id }) => id === path.beltId)!;
      const navigation = getDojoNucleusNavigation(path.nucleusIds[0], 'pt-BR');

      expect(navigation?.beltPaths).toHaveLength(belt.pathIds.length);
      expect(navigation?.beltPaths.map(({ code }) => code)).toEqual(belt.pathIds);
      expect(navigation?.beltPaths.find(({ code }) => code === path.code)?.current).toBe(true);

      for (const item of navigation!.beltPaths) {
        const canonPath = canonSnapshot.paths.find(({ code }) => code === item.code)!;
        expect(item.entryNucleusId).toBe(canonPath.nucleusIds[0]);
        expect(item.url).toContain('/dojo/nucleos/');
      }
    }
  });
});
