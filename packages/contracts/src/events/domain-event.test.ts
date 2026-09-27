import { describe, expect, it } from 'vitest';
import { domainEvent } from './domain-event';

describe('domainEvent', () => {
  it('creates a versioned immutable envelope', () => {
    const event = domainEvent({
      eventId: 'evt_001',
      eventType: 'identity.created',
      occurredAt: '2026-09-26T12:00:00.000Z',
      producer: 'identity-service',
      aggregate: { type: 'identity', id: 'tuid_001' },
      correlationId: 'corr_001',
      payload: { displayName: 'Miguel' },
      metadata: { schema: 'taijifu.events.v1' },
    });

    expect(event.eventVersion).toBe(1);
    expect(event.eventType).toBe('identity.created');
    expect(event.aggregate).toEqual({ type: 'identity', id: 'tuid_001' });
    expect(Object.isFrozen(event)).toBe(true);
    expect(Object.isFrozen(event.aggregate)).toBe(true);
    expect(Object.isFrozen(event.metadata)).toBe(true);
  });

  it('rejects malformed envelope identity', () => {
    expect(() => domainEvent({
      eventId: '',
      eventType: 'identity.created',
      occurredAt: '2026-09-26T12:00:00.000Z',
      producer: 'identity-service',
      aggregate: { type: 'identity', id: 'tuid_001' },
      payload: {},
    })).toThrow('eventId is required');
  });
});
