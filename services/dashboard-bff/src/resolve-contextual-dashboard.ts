import { resolveCapabilities, type CapabilityRelationship } from '@taijifu/capability-resolver';
import type { DashboardRequest, DashboardResponse } from '@taijifu/contracts';
import { resolveDashboard } from './dashboard-policy';

export type ContextualDashboardInput = Readonly<{
  request: DashboardRequest;
  relationships: readonly CapabilityRelationship[];
}>;

export function resolveContextualDashboard(input: ContextualDashboardInput): DashboardResponse {
  const capabilities = resolveCapabilities({
    tuid: input.request.tuid,
    context: input.request.context,
    relationships: input.relationships,
  });

  return resolveDashboard(input.request, capabilities);
}
