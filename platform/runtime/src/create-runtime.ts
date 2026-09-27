import { InMemoryEventPublisher, InMemoryKeyValueStore } from '@taijifu/adapters';
import { createIdentityUseCase, type IdentityCreated } from '@taijifu/identity-service';

export function createInMemoryRuntime() {
  const identities = new InMemoryKeyValueStore();
  const events = new InMemoryEventPublisher<IdentityCreated>();
  let sequence = 0;

  const createIdentity = createIdentityUseCase({
    identities,
    events,
    clock: { now: () => new Date() },
    ids: { next: (prefix) => `${prefix}_${++sequence}` },
  });

  return Object.freeze({
    identity: Object.freeze({ createIdentity }),
    diagnostics: Object.freeze({ identities, events }),
  });
}
