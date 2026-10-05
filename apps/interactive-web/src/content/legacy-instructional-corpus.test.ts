import { describe, expect, it } from 'vitest';
import { canonSnapshot } from './canon-snapshot.js';
import {
  getLegacyInstructionalProjection,
  legacyInstructionalCorpus,
} from './legacy-instructional-corpus.js';

describe('recovered N001-N128 instructional corpus', () => {
  it('covers every Canon nucleus exactly once', () => {
    expect(legacyInstructionalCorpus).toHaveLength(128);
    expect(new Set(legacyInstructionalCorpus.map(({ id }) => id)).size).toBe(128);
    expect(legacyInstructionalCorpus.map(({ id }) => id)).toEqual(
      canonSnapshot.nuclei.map(({ id }) => id),
    );
  });

  it('keeps the recovered source pinned and non-authoritative', () => {
    expect(new Set(legacyInstructionalCorpus.map(({ source }) => source.repository))).toEqual(
      new Set(['Tehkne-Solutions/taijifu-platform']),
    );
    expect(new Set(legacyInstructionalCorpus.map(({ source }) => source.revision))).toEqual(
      new Set(['15c81fc99f0bf95560521098e70dec7a92915f24']),
    );
    expect(new Set(legacyInstructionalCorpus.map(({ source }) => source.layer))).toEqual(
      new Set(['legacy-candidate']),
    );
  });

  it('joins instructional fields to the Canon entity without changing Canon names', () => {
    const projection = getLegacyInstructionalProjection('NUC-N001');
    expect(projection?.nucleus.name).toBe(canonSnapshot.nuclei[0].name);
    expect(projection?.instructional.summary).toBeTruthy();
    expect(projection?.instructional.practice).toBeTruthy();
    expect(getLegacyInstructionalProjection('NUC-N999')).toBeNull();
  });
});
