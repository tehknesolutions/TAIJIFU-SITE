import type { PlatformContext } from '@taijifu/domain';

export type DashboardSurface = 'front' | 'teacher' | 'dojo' | 'admin';

export type DashboardRequest = Readonly<{
  tuid: string;
  context: PlatformContext;
  surface: DashboardSurface;
}>;

export type DashboardModule = Readonly<{
  id: string;
  title: string;
  capability: string;
  priority: number;
}>;

export type DashboardResponse = Readonly<{
  tuid: string;
  context: PlatformContext;
  surface: DashboardSurface;
  modules: readonly DashboardModule[];
}>;
