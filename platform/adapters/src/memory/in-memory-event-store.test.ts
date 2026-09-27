import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from './in-memory-event-store';

describe('InMemoryEventStore', () => {
  it('appends events when expected version matches current stream version', async () => {
    const store = new InMemoryEventStore<string>();
    await store.append('relationship', 'rel_1', 0, ['created']);
    await store.append('relationship', 'rel_1', 1, ['suspended']);
    expect(await store.load('relationship', 'rel_1')).toEqual(['created', 'suspended']);
  });

  it('rejects stale writes when expected version does not match', async () => {
    const store = new InMemoryEventStore<string>();
    await store.append('relationship', 'rel_1', 0, ['created']);
    await expect(store.append('relationship', 'rel_1', 0, ['stale']))
      .rejects.toThrow('Concurrency conflict: expected version 0, current version 1');
    expect(await store.load('relationship', 'rel_1')).toEqual(['created']);
  });

  it('tracks logical stream version independently from retained event count', async () => {
    const store = new InMemoryEventStore<string>();
    await store.seedVersion('relationship', 'rel_1', 8);
    await store.append('relationship', 'rel_1', 8, ['version-9-event']);

    expect(await store.version('relationship', 'rel_1')).toBe(9);
    expect(await store.load('relationship', 'rel_1')).toEqual(['version-9-event']);
  });

  it('uses logical stream version for concurrency after a checkpoint baseline', async () => {
    const store = new InMemoryEventStore<string>();
    await store.seedVersion('relationship', 'rel_1', 8);

    await expect(store.append('relationship', 'rel_1', 0, ['stale']))
      .rejects.toThrow('Concurrency conflict: expected version 0, current version 8');
  });
});
