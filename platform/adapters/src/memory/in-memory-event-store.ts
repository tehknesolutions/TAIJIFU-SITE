import type { EventStore } from '@taijifu/application';

export class InMemoryEventStore<TEvent> implements EventStore<TEvent> {
  private readonly streams = new Map<string, TEvent[]>();
  private readonly versions = new Map<string, number>();

  async append(
    aggregateType: string,
    aggregateId: string,
    expectedVersion: number,
    events: readonly TEvent[],
  ): Promise<void> {
    const key = `${aggregateType}:${aggregateId}`;
    const currentEvents = this.streams.get(key) ?? [];
    const currentVersion = this.versions.get(key) ?? currentEvents.length;

    if (currentVersion !== expectedVersion) {
      throw new Error(`Concurrency conflict: expected version ${expectedVersion}, current version ${currentVersion}`);
    }

    this.streams.set(key, [...currentEvents, ...events]);
    this.versions.set(key, currentVersion + events.length);
  }

  async load(aggregateType: string, aggregateId: string): Promise<readonly TEvent[]> {
    return [...(this.streams.get(`${aggregateType}:${aggregateId}`) ?? [])];
  }

  async seedVersion(aggregateType: string, aggregateId: string, version: number): Promise<void> {
    const key = `${aggregateType}:${aggregateId}`;
    const currentVersion = this.versions.get(key) ?? (this.streams.get(key)?.length ?? 0);
    if (version < currentVersion) {
      throw new Error(`Stream version regression: current version ${currentVersion}, attempted version ${version}`);
    }
    this.versions.set(key, version);
  }

  async version(aggregateType: string, aggregateId: string): Promise<number> {
    const key = `${aggregateType}:${aggregateId}`;
    return this.versions.get(key) ?? (this.streams.get(key)?.length ?? 0);
  }
}
