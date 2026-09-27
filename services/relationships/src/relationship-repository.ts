import type { EventStore, SnapshotStore } from '@taijifu/application';
import {
  activateRelationship,
  revokeRelationship,
  suspendRelationship,
  type Relationship,
  type RelationshipStatus,
  type RelationshipTransition,
} from './relationship-lifecycle';

type Metadata = Readonly<{ eventId: string; occurredAt: string }>;
type StoredEvent = RelationshipTransition['event'];

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
    return history
      .filter((event) => event.payload.version > snapshot.version)
      .sort((left, right) => left.payload.version - right.payload.version)
      .reduce<Relationship>((state, event) => Object.freeze({
        ...state,
        status: event.payload.status,
        version: event.payload.version,
      }), snapshot.state);
  }

  function transitionFor(
    relationship: Relationship,
    status: RelationshipStatus,
    metadata: Metadata,
  ): RelationshipTransition {
    if (status === 'suspended') return suspendRelationship(relationship, metadata);
    if (status === 'active') return activateRelationship(relationship, metadata);
    if (status === 'revoked') return revokeRelationship(relationship, metadata);
    throw new Error(`Unsupported repository transition: ${status satisfies never}`);
  }

  async function saveTransition(
    relationship: Relationship,
    status: RelationshipStatus,
    metadata: Metadata,
  ): Promise<Relationship> {
    const transition = transitionFor(relationship, status, metadata);
    await events.append('relationship', relationship.relationshipId, relationship.version - 1, [transition.event]);
    return transition.relationship;
  }

  async function apply(relationshipId: string, status: RelationshipStatus, metadata: Metadata): Promise<Relationship> {
    const relationship = await load(relationshipId);
    if (!relationship) throw new Error(`Relationship not found: ${relationshipId}`);
    return saveTransition(relationship, status, metadata);
  }

  async function suspend(relationshipId: string, metadata: Metadata): Promise<Relationship> {
    return apply(relationshipId, 'suspended', metadata);
  }

  async function activate(relationshipId: string, metadata: Metadata): Promise<Relationship> {
    return apply(relationshipId, 'active', metadata);
  }

  async function revoke(relationshipId: string, metadata: Metadata): Promise<Relationship> {
    return apply(relationshipId, 'revoked', metadata);
  }

  async function checkpoint(relationshipId: string): Promise<Relationship> {
    const relationship = await load(relationshipId);
    if (!relationship) throw new Error(`Relationship not found: ${relationshipId}`);
    await snapshots.save('relationship', relationshipId, relationship.version, relationship);
    return relationship;
  }

  return Object.freeze({ saveInitial, load, saveTransition, suspend, activate, revoke, checkpoint });
}
