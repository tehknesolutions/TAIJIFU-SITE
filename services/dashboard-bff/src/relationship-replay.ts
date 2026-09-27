import type { Relationship } from '@taijifu/relationships';
import { createRelationshipDrivenDashboard } from './relationship-driven-dashboard';

type ReplayEvent = Parameters<ReturnType<typeof createRelationshipDrivenDashboard>['project']>[0];

export type RelationshipReplayInput = Readonly<{
  seed?: readonly Relationship[];
  events: readonly ReplayEvent[];
}>;

export function replayRelationshipAuthority(input: RelationshipReplayInput) {
  const dashboard = createRelationshipDrivenDashboard(input.seed ?? []);

  for (const event of input.events) {
    dashboard.project(event);
  }

  return dashboard;
}
