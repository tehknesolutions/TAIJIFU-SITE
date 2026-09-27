export type DomainEvent<TType extends string = string, TPayload = unknown> = Readonly<{
  eventId: string;
  eventType: TType;
  eventVersion: number;
  occurredAt: string;
  producer: string;
  aggregate: Readonly<{
    type: string;
    id: string;
  }>;
  correlationId?: string;
  causationId?: string;
  payload: TPayload;
  metadata: Readonly<Record<string, string>>;
}>;

export type DomainEventInput<TType extends string, TPayload> = Omit<
  DomainEvent<TType, TPayload>,
  'eventVersion' | 'metadata'
> & {
  eventVersion?: number;
  metadata?: Readonly<Record<string, string>>;
};

export function domainEvent<TType extends string, TPayload>(
  input: DomainEventInput<TType, TPayload>,
): DomainEvent<TType, TPayload> {
  if (!input.eventId.trim()) throw new Error('eventId is required');
  if (!input.eventType.trim()) throw new Error('eventType is required');
  if (!input.producer.trim()) throw new Error('producer is required');
  if (!input.aggregate.type.trim() || !input.aggregate.id.trim()) throw new Error('aggregate identity is required');
  if (Number.isNaN(Date.parse(input.occurredAt))) throw new Error('occurredAt must be ISO-compatible');

  return Object.freeze({
    ...input,
    eventVersion: input.eventVersion ?? 1,
    metadata: Object.freeze({ ...(input.metadata ?? {}) }),
    aggregate: Object.freeze({ ...input.aggregate }),
  });
}
