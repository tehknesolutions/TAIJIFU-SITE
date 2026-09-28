import type { ExperienceNode } from '../experience-shell.js';
import { siteRoutes } from './site-ia.js';

export type CanonSource =
  | 'taijifu-project-history'
  | 'taijifu-site-repository'
  | 'project-document'
  | 'current-implementation'
  | 'wordpress-canon-theme'
  | 'official-brand-spec'
  | 'canon-sync'
  | 'personalized-training-spec';

export type CanonStatus = 'confirmed' | 'needs-reconciliation';

export type CanonContentItem = Readonly<{
  id: string;
  title: string;
  slug: string;
  canonicalUrl?: string;
  kind: 'principle' | 'page' | 'section' | 'profile' | 'other';
  parentId?: string;
  source: readonly CanonSource[];
  status: CanonStatus;
  summary?: string;
  seo?: Readonly<{
    title?: string;
    description?: string;
  }>;
}>;

const routeItems: readonly CanonContentItem[] = siteRoutes.map((route) =>
  Object.freeze({
    id: route.id,
    title: route.title,
    slug: route.canonicalUrl.split('/').filter(Boolean).at(-1) ?? route.id,
    canonicalUrl: route.canonicalUrl,
    kind: route.id === 'tai' ? ('principle' as const) : ('page' as const),
    parentId: route.id === 'home' ? undefined : 'home',
    source: Object.freeze([
      route.source === 'canon-sync'
        ? ('canon-sync' as const)
        : route.source === 'personalized-training-spec'
          ? ('personalized-training-spec' as const)
          : ('current-implementation' as const),
    ]),
    status: 'confirmed' as const,
    summary:
      route.id === 'home'
        ? 'Arte Marcial de se Adaptar'
        : route.id === 'tai'
          ? 'Essência · Permanência · Axis'
          : undefined,
  }),
);

export const canonRegistry: readonly CanonContentItem[] = Object.freeze([
  ...routeItems,
  Object.freeze({
    id: 'ji',
    title: 'JI',
    slug: 'ji',
    kind: 'principle',
    parentId: 'fundamentos',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Discernimento · Adaptação · Nexus',
  }),
  Object.freeze({
    id: 'fu',
    title: 'FU',
    slug: 'fu',
    kind: 'principle',
    parentId: 'fundamentos',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Manifestação · Fluxo · Flow',
  }),
  Object.freeze({
    id: 'integration',
    title: 'Integração',
    slug: 'integracao',
    kind: 'principle',
    parentId: 'fundamentos',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Axis · Nexus · Flow em relação.',
  }),
]);

export function canonToExperienceNodes(
  items: readonly CanonContentItem[] = canonRegistry,
): readonly ExperienceNode[] {
  return Object.freeze(
    items
      .filter(
        (item): item is CanonContentItem & { canonicalUrl: string } =>
          item.status === 'confirmed' && typeof item.canonicalUrl === 'string',
      )
      .map((item) =>
        Object.freeze({
          id: item.id,
          label: item.title,
          canonicalUrl: item.canonicalUrl,
          parentId: item.parentId,
        }),
      ),
  );
}
