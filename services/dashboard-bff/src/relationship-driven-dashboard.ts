import type { DashboardRequest, DashboardResponse } from '@taijifu/contracts';
import type { Relationship, RelationshipKind, RelationshipStatus } from '@taijifu/relationships';
import { resolveContextualDashboard } from './resolve-contextual-dashboard';

type RelationshipProjectionEvent = Readonly<{
  eventType: 'relationship.suspended' | 'relationship.activated' | 'relationship.revoked';
  aggregate: Readonly<{ type: 'relationship'; id: string }>;
  payload: Readonly<{
    tuid: string;
    kind: RelationshipKind;
    previousStatus: RelationshipStatus;
    status: RelationshipStatus;
    version: number;
  }>;
}>;

export function createRelationshipDrivenDashboard(seed: readonly Relationship[] = []) {
  const relationships = new Map(seed.map((relationship) => [relationship.relationshipId, relationship]));

  function project(event: RelationshipProjectionEvent): void {
    const current = relationships.get(event.aggregate.id);
    if (current && event.payload.version <= current.version) return;

    relationships.set(event.aggregate.id, Object.freeze({
      relationshipId: event.aggregate.id,
      tuid: event.payload.tuid,
      kind: event.payload.kind,
      status: event.payload.status,
      version: event.payload.version,
    }));
  }

  function resolve(request: DashboardRequest): DashboardResponse {
    const relevant = [...relationships.values()]
      .filter((relationship) => relationship.tuid === request.tuid)
      .map(({ kind, status }) => ({ kind, status }));

    return resolveContextualDashboard({ request, relationships: relevant });
  }

  return Object.freeze({ project, resolve });
}
