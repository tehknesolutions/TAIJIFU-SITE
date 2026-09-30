import type { ExperienceNode } from '../experience-shell.js';
import type { SupportedLocale } from './locale.js';
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
  source: readonly CanonSource[];
  status: CanonStatus;
  summary?: string;
}>;

export type CanonCoverage = Readonly<{
  totalItems: number;
  reconciledRoutes: number;
  recoveredOfficialBodies: number;
  pendingOfficialBodies: readonly string[];
  unreconciledItems: readonly string[];
}>;

export type ExperienceContext = Readonly<{
  parent?: CanonContentItem;
  previous?: CanonContentItem;
  next?: CanonContentItem;
}>;

export const experienceParentByRouteId = Object.freeze<Record<string, string>>({
  tai: 'fundamentos', ji: 'fundamentos', fu: 'fundamentos',
  metodo: 'influencias', graduacao: 'metodo', referencias: 'graduacao', historia: 'referencias',
});

const experienceSequences: readonly (readonly string[])[] = Object.freeze([
  Object.freeze(['tai', 'ji', 'fu']),
  Object.freeze(['influencias', 'metodo', 'graduacao', 'referencias', 'historia']),
]);

function routeItem(routeId: string, locale: SupportedLocale): CanonContentItem | null {
  const route = siteRoutes.find((candidate) => candidate.id === routeId);
  const projection = route?.localized?.[locale];
  if (!route || !projection) return null;
  return Object.freeze({
    id: route.id,
    title: projection.title,
    slug: projection.canonicalUrl.split('/').filter(Boolean).at(-1) ?? route.id,
    canonicalUrl: projection.canonicalUrl,
    kind: ['tai', 'ji', 'fu'].includes(route.id) ? 'principle' : 'page',
    source: Object.freeze([
      route.source === 'canon-sync'
        ? 'canon-sync'
        : route.source === 'personalized-training-spec'
          ? 'personalized-training-spec'
          : 'current-implementation',
    ]),
    status: 'confirmed',
  });
}

const routeItems: readonly CanonContentItem[] = Object.freeze(
  siteRoutes.flatMap((route) => routeItem(route.id, 'pt-BR') ?? []),
);

export const canonRegistry: readonly CanonContentItem[] = Object.freeze([
  ...routeItems,
  Object.freeze({
    id: 'integration', title: 'Integração', slug: 'integracao', kind: 'section' as const,
    source: Object.freeze(['canon-sync' as const]), status: 'needs-reconciliation' as const,
    summary: 'Conceito canônico ainda sem rota pública reconciliada.',
  }),
]);

export function getCanonCoverage(): CanonCoverage {
  const pendingOfficialBodies = siteRoutes.filter((route) => route.contentState === 'official-route-body-pending').map((route) => route.id);
  const recoveredOfficialBodies = siteRoutes.filter((route) => route.contentState === 'official-body-recovered').length;
  const unreconciledItems = canonRegistry.filter((item) => item.status === 'needs-reconciliation').map((item) => item.id);
  return Object.freeze({
    totalItems: canonRegistry.length, reconciledRoutes: siteRoutes.length, recoveredOfficialBodies,
    pendingOfficialBodies: Object.freeze(pendingOfficialBodies), unreconciledItems: Object.freeze(unreconciledItems),
  });
}

export function getExperienceContext(routeId: string): ExperienceContext {
  if (!routeItems.some((item) => item.id === routeId)) return Object.freeze({});
  const parentId = experienceParentByRouteId[routeId] ?? (routeId === 'home' ? undefined : 'home');
  const parent = parentId ? routeItems.find((item) => item.id === parentId) : undefined;
  const sequence = experienceSequences.find((candidate) => candidate.includes(routeId));
  const sequenceIndex = sequence?.indexOf(routeId) ?? -1;
  const previousId = sequence && sequenceIndex > 0 ? sequence[sequenceIndex - 1] : undefined;
  const nextId = sequence && sequenceIndex >= 0 && sequenceIndex < sequence.length - 1 ? sequence[sequenceIndex + 1] : undefined;
  return Object.freeze({
    parent,
    previous: previousId ? routeItems.find((item) => item.id === previousId) : undefined,
    next: nextId ? routeItems.find((item) => item.id === nextId) : undefined,
  });
}

export function buildLocalizedExperienceNodes(locale: SupportedLocale): readonly ExperienceNode[] {
  return Object.freeze(siteRoutes.flatMap((route) => {
    const projection = route.localized?.[locale];
    if (!projection || route.id === 'home') return [];
    return [Object.freeze({
      id: route.id,
      label: projection.title,
      canonicalUrl: projection.canonicalUrl,
      parentId: experienceParentByRouteId[route.id] ?? 'home',
    })];
  }));
}

export function canonToExperienceNodes(items: readonly CanonContentItem[] = canonRegistry): readonly ExperienceNode[] {
  return Object.freeze(items.filter((item): item is CanonContentItem & { canonicalUrl: string } =>
    item.status === 'confirmed' && typeof item.canonicalUrl === 'string',
  ).map((item) => Object.freeze({
    id: item.id, label: item.title, canonicalUrl: item.canonicalUrl,
    parentId: item.id === 'home' ? undefined : experienceParentByRouteId[item.id] ?? 'home',
  })));
}
