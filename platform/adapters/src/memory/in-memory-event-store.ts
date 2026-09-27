import type { EventStore } from '@taijifu/application';

export class InMemoryEventStore<TEvent> implements EventStore<TEvent> {
  private readonly streams = new Map<string, TEvent[]>();

  async append(
    aggregateType: string,
    aggregateId: string,
    expectedVersion: number,
    events: readonly TEvent[],
  ): Promise<void> {
    const key = `${aggregateType}:${aggregateId}`;
    const current = this.streams.get(key) ?? [];

    if (current.length !== expectedVersion) {
      throw new Error(`Concurrency conflict: expected version ${expectedVersion}, current version ${current.length}`);
    }

    this.streams.set(key, [...current, ...events]);
  }

  async load(aggregateType: string, aggregateId: string): Promise<readonly TEvent[]> {
    return [...(this.streams.get(`${aggregateType}:${aggregateId}`) ?? [])];
  }
}
