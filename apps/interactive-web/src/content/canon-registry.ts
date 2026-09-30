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
  source: readonly CanonSource[];
  status: CanonStatus;
  summary?: string;
  seo?: Readonly<{
    title?: string;
    description?: string;
  }>;
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

// Editorial/experience navigation only. These relationships organize the public
// journey and Three.js projection; they are not assertions about Canon semantics.
export const experienceParentByRouteId = Object.freeze<Record<string, string>>({
  tai: 'fundamentos',
  ji: 'fundamentos',
  fu: 'fundamentos',
  metodo: 'influencias',
  graduacao: 'metodo',
  referencias: 'graduacao',
  historia: 'referencias',
});

// Ordered editorial sequences only. These do not add relationships to Canon.
const experienceSequences: readonly (readonly string[])[] = Object.freeze([
  Object.freeze(['tai', 'ji', 'fu']),
  Object.freeze(['influencias', 'metodo', 'graduacao', 'referencias', 'historia']),
]);

const routeItems: readonly CanonContentItem[] = siteRoutes.map((route) =>
  Object.freeze({
    id: route.id,
    title: route.title,
    slug: route.canonicalUrl.split('/').filter(Boolean).at(-1) ?? route.id,
    canonicalUrl: route.canonicalUrl,
    kind: ['tai', 'ji', 'fu'].includes(route.id) ? ('principle' as const) : ('page' as const),
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
          : route.id === 'ji'
            ? 'Discernimento · Adaptação · Nexus'
            : route.id === 'fu'
              ? 'Manifestação · Fluxo · Flow'
              : undefined,
  }),
);

export const canonRegistry: readonly CanonContentItem[] = Object.freeze([
  ...routeItems,
  Object.freeze({
    id: 'integration',
    title: 'Integração',
    slug: 'integracao',
    kind: 'section' as const,
    source: Object.freeze(['canon-sync' as const]),
    status: 'needs-reconciliation' as const,
    summary: 'Conceito canônico ainda sem rota pública reconciliada.',
  }),
]);

export function getCanonCoverage(): CanonCoverage {
  const pendingOfficialBodies = siteRoutes
    .filter((route) => route.contentState === 'official-route-body-pending')
    .map((route) => route.id);
  const recoveredOfficialBodies = siteRoutes.filter(
    (route) => route.contentState === 'official-body-recovered',
  ).length;
  const unreconciledItems = canonRegistry
    .filter((item) => item.status === 'needs-reconciliation')
    .map((item) => item.id);

  return Object.freeze({
    totalItems: canonRegistry.length,
    reconciledRoutes: siteRoutes.length,
    recoveredOfficialBodies,
    pendingOfficialBodies: Object.freeze(pendingOfficialBodies),
    unreconciledItems: Object.freeze(unreconciledItems),
  });
}

export function getExperienceContext(routeId: string): ExperienceContext {
  if (!routeItems.some((item) => item.id === routeId)) return Object.freeze({});

  const parentId =
    experienceParentByRouteId[routeId] ?? (routeId === 'home' ? undefined : 'home');
  const parent = parentId ? routeItems.find((item) => item.id === parentId) : undefined;
  const sequence = experienceSequences.find((candidate) => candidate.includes(routeId));
  const sequenceIndex = sequence?.indexOf(routeId) ?? -1;
  const previousId = sequence && sequenceIndex > 0 ? sequence[sequenceIndex - 1] : undefined;
  const nextId =
    sequence && sequenceIndex >= 0 && sequenceIndex < sequence.length - 1
      ? sequence[sequenceIndex + 1]
      : undefined;
  const previous = previousId ? routeItems.find((item) => item.id === previousId) : undefined;
  const next = nextId ? routeItems.find((item) => item.id === nextId) : undefined;

  return Object.freeze({ parent, previous, next });
}

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
          parentId:
            item.id === 'home' ? undefined : experienceParentByRouteId[item.id] ?? 'home',
        }),
      ),
  );
}
