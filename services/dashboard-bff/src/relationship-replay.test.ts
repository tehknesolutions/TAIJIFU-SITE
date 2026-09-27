import { describe, expect, it } from 'vitest';
import { replayRelationshipAuthority } from './relationship-replay';

describe('replayRelationshipAuthority', () => {
  it('rebuilds current authority from ordered relationship history', () => {
    const dashboard = replayRelationshipAuthority({
      seed: [{ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 }],
      events: [
        { eventType: 'relationship.suspended', aggregate: { type: 'relationship', id: 'rel_1' }, payload: { tuid: 'tuid_1', kind: 'teacher', previousStatus: 'active', status: 'suspended', version: 2 } },
        { eventType: 'relationship.activated', aggregate: { type: 'relationship', id: 'rel_1' }, payload: { tuid: 'tuid_1', kind: 'teacher', previousStatus: 'suspended', status: 'active', version: 3 } },
      ],
    });

    expect(dashboard.resolve({ tuid: 'tuid_1', context: 'teacher', surface: 'teacher' }).modules.map((module) => module.id))
      .toEqual(['students', 'curriculum', 'sessions']);
  });

  it('is deterministic when stale events are present in replay input', () => {
    const dashboard = replayRelationshipAuthority({
      seed: [{ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'dojo-operator', status: 'active', version: 1 }],
      events: [
        { eventType: 'relationship.revoked', aggregate: { type: 'relationship', id: 'rel_1' }, payload: { tuid: 'tuid_1', kind: 'dojo-operator', previousStatus: 'active', status: 'revoked', version: 4 } },
        { eventType: 'relationship.activated', aggregate: { type: 'relationship', id: 'rel_1' }, payload: { tuid: 'tuid_1', kind: 'dojo-operator', previousStatus: 'suspended', status: 'active', version: 2 } },
      ],
    });

    expect(dashboard.resolve({ tuid: 'tuid_1', context: 'dojo', surface: 'dojo' }).modules).toEqual([]);
  });
});
