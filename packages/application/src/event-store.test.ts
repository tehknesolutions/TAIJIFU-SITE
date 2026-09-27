import { describe, expect, it } from 'vitest';
import type { EventStore, SnapshotStore } from './event-store';

describe('event persistence ports', () => {
  it('supports append-only aggregate event history', async () => {
    const events: unknown[] = [];
    const store: EventStore<unknown> = {
      append: async (_aggregateType, _aggregateId, expectedVersion, newEvents) => {
        expect(expectedVersion).toBe(1);
        events.push(...newEvents);
      },
      load: async () => events,
    };

    await store.append('relationship', 'rel_1', 1, [{ eventType: 'relationship.suspended' }]);
    expect(await store.load('relationship', 'rel_1')).toEqual([{ eventType: 'relationship.suspended' }]);
  });

  it('supports versioned snapshots independently from the event log', async () => {
    let saved: { version: number; state: unknown } | null = null;
    const snapshots: SnapshotStore<unknown> = {
      load: async () => saved,
      save: async (_aggregateType, _aggregateId, version, state) => { saved = { version, state }; },
    };

    await snapshots.save('relationship', 'rel_1', 8, { status: 'suspended' });
    expect(await snapshots.load('relationship', 'rel_1')).toEqual({ version: 8, state: { status: 'suspended' } });
  });
});
