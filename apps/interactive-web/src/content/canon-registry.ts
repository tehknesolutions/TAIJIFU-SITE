import type { ExperienceNode } from '../experience-shell.js';

export type CanonSource =
  | 'taijifu-project-history'
  | 'taijifu-site-repository'
  | 'project-document'
  | 'current-implementation';

export type CanonStatus = 'confirmed' | 'needs-reconciliation';

export type CanonContentItem = Readonly<{
  id: string;
  title: string;
  slug: string;
  canonicalUrl: string;
  kind: 'principle' | 'page' | 'section' | 'profile' | 'other';
  parentId?: string;
  source: readonly CanonSource[];
  status: CanonStatus;
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
    source: Object.freeze(['current-implementation', 'taijifu-site-repository']),
    status: 'confirmed',
  }),
]);

export function canonToExperienceNodes(
  items: readonly CanonContentItem[] = canonRegistry,
): readonly ExperienceNode[] {
  return Object.freeze(
    items
      .filter((item) => item.status === 'confirmed')
      .map((item) =>
        Object.freeze({
          id: item.id,
          label: item.title,
          canonicalUrl: item.canonicalUrl,
        }),
      ),
  );
}
