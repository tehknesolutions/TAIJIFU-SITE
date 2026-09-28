import type { ExperienceNode } from '../experience-shell.js';

export type CanonSource =
  | 'taijifu-project-history'
  | 'taijifu-site-repository'
  | 'project-document'
  | 'current-implementation'
  | 'wordpress-canon-theme'
  | 'official-brand-spec';

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

export const canonRegistry: readonly CanonContentItem[] = Object.freeze([
  Object.freeze({
    id: 'tai',
    title: 'TAI',
    slug: 'tai',
    canonicalUrl: '/principios/tai/',
    kind: 'principle',
    source: Object.freeze(['current-implementation', 'taijifu-site-repository', 'wordpress-canon-theme']),
    status: 'confirmed',
    summary: 'Essência · Permanência · Axis',
  }),
  Object.freeze({
    id: 'ji',
    title: 'JI',
    slug: 'ji',
    kind: 'principle',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Discernimento · Adaptação · Nexus',
  }),
  Object.freeze({
    id: 'fu',
    title: 'FU',
    slug: 'fu',
    kind: 'principle',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Manifestação · Fluxo · Flow',
  }),
  Object.freeze({
    id: 'integration',
    title: 'Integração',
    slug: 'integracao',
    kind: 'principle',
    source: Object.freeze(['wordpress-canon-theme', 'official-brand-spec']),
    status: 'needs-reconciliation',
    summary: 'Axis · Nexus · Flow em relação.',
  }),
  ...['principles', 'paths', 'library', 'lab'].map((id) =>
    Object.freeze({
      id: `content-model-${id}`,
      title: id,
      slug: id,
      canonicalUrl: `/${id}/`,
      kind: 'section' as const,
      source: Object.freeze(['taijifu-site-repository'] as const),
      status: 'needs-reconciliation' as const,
    }),
  ),
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
        }),
      ),
  );
}
