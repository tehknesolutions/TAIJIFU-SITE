import type { Snapshot, SnapshotStore } from '@taijifu/application';

export class InMemorySnapshotStore<TState> implements SnapshotStore<TState> {
  private readonly snapshots = new Map<string, Snapshot<TState>>();

  async load(aggregateType: string, aggregateId: string): Promise<Snapshot<TState> | null> {
    return this.snapshots.get(`${aggregateType}:${aggregateId}`) ?? null;
  }

  async save(aggregateType: string, aggregateId: string, version: number, state: TState): Promise<void> {
    const key = `${aggregateType}:${aggregateId}`;
    const current = this.snapshots.get(key);

    if (current && version < current.version) {
      throw new Error(`Snapshot version regression: current version ${current.version}, attempted version ${version}`);
    }

    this.snapshots.set(key, Object.freeze({ version, state }));
  }
}
