export interface EventStore<TEvent> {
  append(
    aggregateType: string,
    aggregateId: string,
    expectedVersion: number,
    events: readonly TEvent[],
  ): Promise<void>;

  load(aggregateType: string, aggregateId: string): Promise<readonly TEvent[]>;
}

export type Snapshot<TState> = Readonly<{
  version: number;
  state: TState;
}>;

export interface SnapshotStore<TState> {
  load(aggregateType: string, aggregateId: string): Promise<Snapshot<TState> | null>;
  save(aggregateType: string, aggregateId: string, version: number, state: TState): Promise<void>;
}
