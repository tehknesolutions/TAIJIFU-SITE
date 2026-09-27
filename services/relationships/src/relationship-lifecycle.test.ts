import { describe, expect, it } from 'vitest';
import { activateRelationship, revokeRelationship, suspendRelationship } from './relationship-lifecycle';

describe('relationship lifecycle', () => {
  const base = {
    relationshipId: 'rel_1',
    tuid: 'tuid_1',
    kind: 'teacher' as const,
    status: 'active' as const,
    version: 1,
  };

  it('suspends an active relationship and emits an auditable event', () => {
    const result = suspendRelationship(base, { eventId: 'evt_1', occurredAt: '2026-09-27T12:00:00.000Z' });
    expect(result.relationship).toMatchObject({ status: 'suspended', version: 2 });
    expect(result.event).toMatchObject({
      eventType: 'relationship.suspended',
      aggregate: { type: 'relationship', id: 'rel_1' },
      payload: { tuid: 'tuid_1', kind: 'teacher', previousStatus: 'active', status: 'suspended', version: 2 },
    });
  });

  it('revokes a relationship irreversibly', () => {
    const revoked = revokeRelationship(base, { eventId: 'evt_2', occurredAt: '2026-09-27T12:01:00.000Z' });
    expect(revoked.relationship.status).toBe('revoked');
    expect(() => activateRelationship(revoked.relationship, { eventId: 'evt_3', occurredAt: '2026-09-27T12:02:00.000Z' }))
      .toThrow('Revoked relationships cannot be reactivated');
  });

  it('reactivates a suspended relationship with a new version', () => {
    const suspended = suspendRelationship(base, { eventId: 'evt_4', occurredAt: '2026-09-27T12:03:00.000Z' });
    const active = activateRelationship(suspended.relationship, { eventId: 'evt_5', occurredAt: '2026-09-27T12:04:00.000Z' });
    expect(active.relationship).toMatchObject({ status: 'active', version: 3 });
    expect(active.event.eventType).toBe('relationship.activated');
  });
});
