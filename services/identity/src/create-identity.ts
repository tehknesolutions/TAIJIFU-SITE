import type { Clock, EventPublisher, IdGenerator, KeyValueStore } from '@taijifu/application';
import { domainEvent, type DomainEvent } from '@taijifu/contracts';
import { parseTuid, type Tuid } from '@taijifu/domain';

export type IdentityCreated = DomainEvent<'identity.created', Readonly<{
  tuid: Tuid;
  displayName: string;
}>>;

export type CreateIdentityDependencies = Readonly<{
  identities: KeyValueStore;
  events: EventPublisher<IdentityCreated>;
  clock: Clock;
  ids: IdGenerator;
}>;

export function createIdentityUseCase(deps: CreateIdentityDependencies) {
  return async function createIdentity(input: Readonly<{ displayName: string }>): Promise<Tuid> {
    const displayName = input.displayName.trim();
    if (!displayName) throw new Error('displayName is required');

    const tuid = parseTuid(deps.ids.next('tuid'));
    await deps.identities.set(tuid, JSON.stringify({ tuid, displayName }));

    await deps.events.publish(domainEvent({
      eventId: deps.ids.next('evt'),
      eventType: 'identity.created',
      occurredAt: deps.clock.now().toISOString(),
      producer: 'identity-service',
      aggregate: { type: 'identity', id: tuid },
      payload: { tuid, displayName },
      metadata: { schema: 'taijifu.identity.v1' },
    }));

    return tuid;
  };
}
