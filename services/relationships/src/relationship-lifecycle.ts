import { domainEvent, type DomainEvent } from '@taijifu/contracts';

export type RelationshipKind = 'identity' | 'teacher' | 'dojo-operator' | 'researcher' | 'platform-admin';
export type RelationshipStatus = 'active' | 'suspended' | 'revoked';

export type Relationship = Readonly<{
  relationshipId: string;
  tuid: string;
  kind: RelationshipKind;
  status: RelationshipStatus;
  version: number;
}>;

type TransitionMetadata = Readonly<{ eventId: string; occurredAt: string }>;
type TransitionEventType = 'relationship.suspended' | 'relationship.activated' | 'relationship.revoked';

type RelationshipTransitionEvent = DomainEvent<TransitionEventType, Readonly<{
  tuid: string;
  kind: RelationshipKind;
  previousStatus: RelationshipStatus;
  status: RelationshipStatus;
  version: number;
}>>;

export type RelationshipTransition = Readonly<{
  relationship: Relationship;
  event: RelationshipTransitionEvent;
}>;

function transition(
  relationship: Relationship,
  status: RelationshipStatus,
  eventType: TransitionEventType,
  metadata: TransitionMetadata,
): RelationshipTransition {
  const next = Object.freeze({ ...relationship, status, version: relationship.version + 1 });
  const event = domainEvent({
    eventId: metadata.eventId,
    eventType,
    occurredAt: metadata.occurredAt,
    producer: 'relationships-service',
    aggregate: { type: 'relationship', id: relationship.relationshipId },
    payload: {
      tuid: relationship.tuid,
      kind: relationship.kind,
      previousStatus: relationship.status,
      status,
      version: next.version,
    },
    metadata: { schema: 'taijifu.relationship.v1' },
  });
  return Object.freeze({ relationship: next, event });
}

export function suspendRelationship(relationship: Relationship, metadata: TransitionMetadata): RelationshipTransition {
  if (relationship.status !== 'active') throw new Error('Only active relationships can be suspended');
  return transition(relationship, 'suspended', 'relationship.suspended', metadata);
}

export function activateRelationship(relationship: Relationship, metadata: TransitionMetadata): RelationshipTransition {
  if (relationship.status === 'revoked') throw new Error('Revoked relationships cannot be reactivated');
  if (relationship.status !== 'suspended') throw new Error('Only suspended relationships can be activated');
  return transition(relationship, 'active', 'relationship.activated', metadata);
}

export function revokeRelationship(relationship: Relationship, metadata: TransitionMetadata): RelationshipTransition {
  if (relationship.status === 'revoked') throw new Error('Relationship is already revoked');
  return transition(relationship, 'revoked', 'relationship.revoked', metadata);
}
