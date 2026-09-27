import type { EventPublisher } from '@taijifu/application';

export class InMemoryEventPublisher<TEvent = unknown> implements EventPublisher<TEvent> {
  readonly events: TEvent[] = [];

  async publish(event: TEvent): Promise<void> {
    this.events.push(event);
  }
}
