import { describe, expect, it } from 'vitest';
import { InMemorySnapshotStore } from './in-memory-snapshot-store';

describe('InMemorySnapshotStore', () => {
  it('persists and replaces aggregate snapshots by version', async () => {
    const store = new InMemorySnapshotStore<{ status: string }>();
    await store.save('relationship', 'rel_1', 2, { status: 'suspended' });
    await store.save('relationship', 'rel_1', 3, { status: 'active' });
    expect(await store.load('relationship', 'rel_1')).toEqual({ version: 3, state: { status: 'active' } });
  });

  it('rejects an older snapshot so state cannot roll backwards', async () => {
    const store = new InMemorySnapshotStore<{ status: string }>();
    await store.save('relationship', 'rel_1', 4, { status: 'revoked' });
    await expect(store.save('relationship', 'rel_1', 2, { status: 'active' }))
      .rejects.toThrow('Snapshot version regression: current version 4, attempted version 2');
  });
});
