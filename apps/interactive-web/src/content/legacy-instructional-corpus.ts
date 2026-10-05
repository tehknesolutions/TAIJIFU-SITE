import { canonSnapshot, type CanonNucleus } from './canon-snapshot.js';

import white from '../../../../content/legacy/taijifu-platform/white-belt-content.json';
import yellow from '../../../../content/legacy/taijifu-platform/yellow-belt-content.json';
import orange from '../../../../content/legacy/taijifu-platform/orange-belt-content.json';
import red from '../../../../content/legacy/taijifu-platform/red-belt-content.json';
import green from '../../../../content/legacy/taijifu-platform/green-belt-content.json';
import cyan from '../../../../content/legacy/taijifu-platform/cyan-belt-content.json';
import blue from '../../../../content/legacy/taijifu-platform/blue-belt-content.json';
import violet from '../../../../content/legacy/taijifu-platform/violet-belt-content.json';
import brown from '../../../../content/legacy/taijifu-platform/brown-belt-content.json';

export type LegacyInstructionalItem = Readonly<{
  id: string;
  summary: string;
  practice: string;
  source: Readonly<{
    repository: 'Tehkne-Solutions/taijifu-platform';
    revision: '15c81fc99f0bf95560521098e70dec7a92915f24';
    layer: 'legacy-candidate';
  }>;
}>;

export type CanonInstructionalProjection = Readonly<{
  nucleus: CanonNucleus;
  instructional: LegacyInstructionalItem;
}>;

type RawItem = { id: string; summary: string; practice: string };

const source = Object.freeze({
  repository: 'Tehkne-Solutions/taijifu-platform' as const,
  revision: '15c81fc99f0bf95560521098e70dec7a92915f24' as const,
  layer: 'legacy-candidate' as const,
});

const recovered: readonly RawItem[] = Object.freeze([
  ...white, ...yellow, ...orange, ...red, ...green, ...cyan, ...blue, ...violet, ...brown,
]);

function assertCorpusIntegrity(): void {
  if (recovered.length !== canonSnapshot.nuclei.length) {
    throw new Error('Recovered instructional corpus must contain exactly 128 items');
  }

  const canonIds = new Set(canonSnapshot.nuclei.map(({ id }) => id));
  const recoveredIds = new Set(recovered.map(({ id }) => id));

  if (recoveredIds.size !== recovered.length) {
    throw new Error('Recovered instructional corpus contains duplicate nucleus IDs');
  }

  if (recovered.some(({ id, summary, practice }) =>
    !canonIds.has(id) || !summary.trim() || !practice.trim())) {
    throw new Error('Recovered instructional corpus contains an orphan or empty item');
  }

  if (recoveredIds.size !== canonIds.size || [...canonIds].some((id) => !recoveredIds.has(id))) {
    throw new Error('Recovered instructional corpus does not cover Canon N001-N128 exactly');
  }
}

assertCorpusIntegrity();

const nucleusById = new Map(canonSnapshot.nuclei.map((nucleus) => [nucleus.id, nucleus]));
const instructionalById = new Map<string, LegacyInstructionalItem>(
  recovered.map(({ id, summary, practice }) => [
    id,
    Object.freeze({ id, summary, practice, source }),
  ]),
);

export const legacyInstructionalCorpus: readonly LegacyInstructionalItem[] = Object.freeze(
  canonSnapshot.nuclei.map(({ id }) => instructionalById.get(id)!),
);

export function getLegacyInstructionalProjection(
  nucleusId: string,
): CanonInstructionalProjection | null {
  const nucleus = nucleusById.get(nucleusId);
  const instructional = instructionalById.get(nucleusId);
  if (!nucleus || !instructional) return null;
  return Object.freeze({ nucleus, instructional });
}
