import { describe, expect, it } from 'vitest';
import { createRelationshipDrivenDashboard } from './relationship-driven-dashboard';

describe('relationship-driven dashboard authority', () => {
  it('removes teacher modules after a suspension event is projected', () => {
    const dashboard = createRelationshipDrivenDashboard([
      { relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 },
    ]);

    expect(dashboard.resolve({ tuid: 'tuid_1', context: 'teacher', surface: 'teacher' }).modules.map((module) => module.id))
      .toEqual(['students', 'curriculum', 'sessions']);

    dashboard.project({
      eventType: 'relationship.suspended',
      aggregate: { type: 'relationship', id: 'rel_1' },
      payload: { tuid: 'tuid_1', kind: 'teacher', previousStatus: 'active', status: 'suspended', version: 2 },
    });

    expect(dashboard.resolve({ tuid: 'tuid_1', context: 'teacher', surface: 'teacher' }).modules).toEqual([]);
  });

  it('ignores stale relationship events so authority cannot roll backwards', () => {
    const dashboard = createRelationshipDrivenDashboard([
      { relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'dojo-operator', status: 'suspended', version: 3 },
    ]);

    dashboard.project({
      eventType: 'relationship.activated',
      aggregate: { type: 'relationship', id: 'rel_1' },
      payload: { tuid: 'tuid_1', kind: 'dojo-operator', previousStatus: 'suspended', status: 'active', version: 2 },
    });

    expect(dashboard.resolve({ tuid: 'tuid_1', context: 'dojo', surface: 'dojo' }).modules).toEqual([]);
  });
});
