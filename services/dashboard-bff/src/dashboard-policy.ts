import type { DashboardModule, DashboardRequest, DashboardResponse, DashboardSurface } from '@taijifu/contracts';

const modulesBySurface: Readonly<Record<DashboardSurface, readonly DashboardModule[]>> = Object.freeze({
  front: Object.freeze([
    { id: 'practice', title: 'Practice', capability: 'practice.read', priority: 10 },
    { id: 'progress', title: 'Progress', capability: 'progress.read', priority: 20 },
  ]),
  teacher: Object.freeze([
    { id: 'students', title: 'Students', capability: 'students.manage', priority: 10 },
    { id: 'curriculum', title: 'Curriculum', capability: 'curriculum.manage', priority: 20 },
    { id: 'sessions', title: 'Sessions', capability: 'sessions.manage', priority: 30 },
  ]),
  dojo: Object.freeze([
    { id: 'members', title: 'Members', capability: 'members.manage', priority: 10 },
    { id: 'classes', title: 'Classes', capability: 'classes.manage', priority: 20 },
    { id: 'operations', title: 'Operations', capability: 'dojo.operations', priority: 30 },
  ]),
  admin: Object.freeze([
    { id: 'platform', title: 'Platform', capability: 'platform.admin', priority: 10 },
    { id: 'governance', title: 'Governance', capability: 'governance.admin', priority: 20 },
    { id: 'observability', title: 'Observability', capability: 'observability.read', priority: 30 },
  ]),
});

export function resolveDashboard(request: DashboardRequest): DashboardResponse {
  return Object.freeze({
    ...request,
    modules: modulesBySurface[request.surface],
  });
}
