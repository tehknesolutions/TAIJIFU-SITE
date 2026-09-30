import type { SupportedLocale } from './locale.js';
import { buildLocalizedExperienceNodes } from './canon-registry.js';

export type WebV1RouteNode = Readonly<{
  id: string;
  canonicalUrl: string;
  parentId?: string;
}>;

export function buildWebV1RouteGraph(locale: SupportedLocale): readonly WebV1RouteNode[] {
  return Object.freeze(buildLocalizedExperienceNodes(locale).map((node) => Object.freeze({
    id: node.id,
    canonicalUrl: node.canonicalUrl,
    parentId: node.parentId,
  })));
}
