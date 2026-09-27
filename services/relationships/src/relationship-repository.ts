import type { EventStore, SnapshotStore } from '@taijifu/application';
import { suspendRelationship, type Relationship, type RelationshipStatus } from './relationship-lifecycle';

type Metadata = Readonly<{ eventId: string; occurredAt: string }>;
type StoredEvent = ReturnType<typeof suspendRelationship>['event'];

type Dependencies = Readonly<{
  events: EventStore<StoredEvent>;
  snapshots: SnapshotStore<Relationship>;
}>;

export function createRelationshipRepository({ events, snapshots }: Dependencies) {
  async function saveInitial(relationship: Relationship): Promise<void> {
    await snapshots.save('relationship', relationship.relationshipId, relationship.version, relationship);
  }

  async function load(relationshipId: string): Promise<Relationship | null> {
    const snapshot = await snapshots.load('relationship', relationshipId);
    if (!snapshot) return null;

    const history = await events.load('relationship', relationshipId);
    return history.reduce<Relationship>((state, event) => Object.freeze({
      ...state,
      status: event.payload.status,
      version: event.payload.version,
    }), snapshot.state);
  }

  async function saveTransition(
    relationship: Relationship,
    status: RelationshipStatus,
    metadata: Metadata,
  ): Promise<Relationship> {
    if (status !== 'suspended') throw new Error(`Unsupported repository transition: ${status}`);
    const transition = suspendRelationship(relationship, metadata);
    await events.append('relationship', relationship.relationshipId, relationship.version - 1, [transition.event]);
    return transition.relationship;
  }

  async function suspend(relationshipId: string, metadata: Metadata): Promise<Relationship> {
    const relationship = await load(relationshipId);
    if (!relationship) throw new Error(`Relationship not found: ${relationshipId}`);
    return saveTransition(relationship, 'suspended', metadata);
  }

  return Object.freeze({ saveInitial, load, saveTransition, suspend });
}
