import type { SupportedLocale } from './content/locale.js';
import { buildHomeDojoLinks } from './content/home-dojo-links.js';
import { dojoEntryUrl } from './content/dojo-entry-link.js';

type DojoAnchor = {
  dataset: { routeId?: string; dojoEntry?: string };
  href: string;
};

export function wireHomeDojoLinks(anchors: Iterable<DojoAnchor>, locale: SupportedLocale): void {
  const canonicalUrls = new Map(buildHomeDojoLinks(locale).map((link) => [link.id, link.canonicalUrl]));

  for (const anchor of anchors) {
    const routeId = anchor.dataset.routeId;
    if (!routeId) continue;
    const canonicalUrl = canonicalUrls.get(routeId as 'tai' | 'ji' | 'fu');
    if (canonicalUrl) anchor.href = canonicalUrl;
  }
}

export function wireDojoEntryLinks(anchors: Iterable<DojoAnchor>, locale: SupportedLocale): void {
  const canonicalUrl = dojoEntryUrl(locale);
  for (const anchor of anchors) anchor.href = canonicalUrl;
}
