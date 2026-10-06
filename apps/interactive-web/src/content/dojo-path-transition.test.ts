import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

describe('Dojo Canon Path transitions', () => {
  it('exposes adjacent Paths separately from previous/next Nucleus navigation', () => {
    const firstPath = canonSnapshot.paths[0];
    const secondPath = canonSnapshot.paths[1];
    const firstLastNucleus = firstPath.nucleusIds[firstPath.nucleusIds.length - 1];
    const secondFirstNucleus = secondPath.nucleusIds[0];

    const end = getDojoNucleusNavigation(firstLastNucleus, 'pt-BR');
    const start = getDojoNucleusNavigation(secondFirstNucleus, 'pt-BR');

    expect(end?.next).toBeNull();
    expect(end?.nextPath?.id).toBe(secondPath.id);
    expect(end?.nextPath?.entryNucleusId).toBe(secondFirstNucleus);

    expect(start?.previous).toBeNull();
    expect(start?.previousPath?.id).toBe(firstPath.id);
    expect(start?.previousPath?.entryNucleusId).toBe(firstLastNucleus);
  });

  it('does not invent a Path beyond curriculum boundaries', () => {
    const firstPath = canonSnapshot.paths[0];
    const lastPath = canonSnapshot.paths[canonSnapshot.paths.length - 1];
    expect(getDojoNucleusNavigation(firstPath.nucleusIds[0], 'pt-BR')?.previousPath).toBeNull();
    expect(getDojoNucleusNavigation(lastPath.nucleusIds.at(-1)!, 'pt-BR')?.nextPath).toBeNull();
  });
});
