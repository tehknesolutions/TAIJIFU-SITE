import { describe, expect, it } from 'vitest';
import { InMemoryEventStore, InMemorySnapshotStore } from '@taijifu/adapters';
import { createRelationshipRepository } from './relationship-repository';

describe('relationship repository', () => {
  it('persists transitions and rebuilds relationship state', async () => {
    const events = new InMemoryEventStore<any>();
    const snapshots = new InMemorySnapshotStore<any>();
    const repository = createRelationshipRepository({ events, snapshots });

    await repository.saveInitial({ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 });
    await repository.suspend('rel_1', { eventId: 'evt_1', occurredAt: '2026-09-27T13:00:00.000Z' });

    const rebuilt = await repository.load('rel_1');
    expect(rebuilt).toMatchObject({ relationshipId: 'rel_1', status: 'suspended', version: 2 });
  });

  it('persists suspend activate and revoke lifecycle', async () => {
    const events = new InMemoryEventStore<any>();
    const snapshots = new InMemorySnapshotStore<any>();
    const repository = createRelationshipRepository({ events, snapshots });

    await repository.saveInitial({ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 });
    await repository.suspend('rel_1', { eventId: 'evt_1', occurredAt: '2026-09-27T13:00:00.000Z' });
    await repository.activate('rel_1', { eventId: 'evt_2', occurredAt: '2026-09-27T13:01:00.000Z' });
    await repository.revoke('rel_1', { eventId: 'evt_3', occurredAt: '2026-09-27T13:02:00.000Z' });

    expect(await repository.load('rel_1')).toMatchObject({ status: 'revoked', version: 4 });
  });

  it('checkpoints current state without changing event history', async () => {
    const events = new InMemoryEventStore<any>();
    const snapshots = new InMemorySnapshotStore<any>();
    const repository = createRelationshipRepository({ events, snapshots });

    await repository.saveInitial({ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 });
    await repository.suspend('rel_1', { eventId: 'evt_1', occurredAt: '2026-09-27T13:00:00.000Z' });
    await repository.checkpoint('rel_1');

    expect(await snapshots.load('relationship', 'rel_1')).toMatchObject({ version: 2, state: { status: 'suspended', version: 2 } });
    expect((await events.load('relationship', 'rel_1')).length).toBe(1);
    expect(await repository.load('rel_1')).toMatchObject({ status: 'suspended', version: 2 });
  });

  it('rejects a stale concurrent transition', async () => {
    const events = new InMemoryEventStore<any>();
    const snapshots = new InMemorySnapshotStore<any>();
    const first = createRelationshipRepository({ events, snapshots });
    const second = createRelationshipRepository({ events, snapshots });

    await first.saveInitial({ relationshipId: 'rel_1', tuid: 'tuid_1', kind: 'teacher', status: 'active', version: 1 });
    const stale = await second.load('rel_1');
    expect(stale?.version).toBe(1);

    await first.suspend('rel_1', { eventId: 'evt_1', occurredAt: '2026-09-27T13:01:00.000Z' });
    await expect(second.saveTransition(stale!, 'suspended', { eventId: 'evt_2', occurredAt: '2026-09-27T13:02:00.000Z' }))
      .rejects.toThrow(/Concurrency conflict/);
  });
});
