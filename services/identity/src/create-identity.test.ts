import { describe, expect, it } from 'vitest';
import { createIdentityUseCase, type IdentityCreated } from './create-identity';

class MemoryStore {
  values = new Map<string, string>();
  async get(key: string) { return this.values.get(key) ?? null; }
  async set(key: string, value: string) { this.values.set(key, value); }
  async delete(key: string) { this.values.delete(key); }
}

class MemoryEvents<T> {
  events: T[] = [];
  async publish(event: T) { this.events.push(event); }
}

describe('createIdentityUseCase', () => {
  it('persists sovereign identity and emits its domain event', async () => {
    const identities = new MemoryStore();
    const events = new MemoryEvents<IdentityCreated>();
    let sequence = 0;
    const createIdentity = createIdentityUseCase({
      identities,
      events,
      clock: { now: () => new Date('2026-09-26T21:00:00.000Z') },
      ids: { next: (prefix) => `${prefix}_${++sequence}` },
    });

    const tuid = await createIdentity({ displayName: 'Miguel Da Vinci' });

    expect(tuid).toBe('tuid_1');
    expect(JSON.parse((await identities.get(tuid))!)).toEqual({ tuid, displayName: 'Miguel Da Vinci' });
    expect(events.events).toHaveLength(1);
    expect(events.events[0]).toMatchObject({
      eventId: 'evt_2',
      eventType: 'identity.created',
      producer: 'identity-service',
      aggregate: { type: 'identity', id: 'tuid_1' },
      payload: { tuid: 'tuid_1', displayName: 'Miguel Da Vinci' },
    });
  });
});
