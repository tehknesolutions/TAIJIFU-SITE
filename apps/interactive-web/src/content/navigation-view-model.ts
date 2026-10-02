import type { SupportedLocale } from './locale.js';
import { projectLocalizedPrimaryNavigation } from './localized-experience-projection.js';

export type NavigationViewItem = Readonly<{
  id: string;
  href: `/${string}`;
  label: string | null;
  availability: 'ready' | 'pending';
}>;

export function navigationViewModel(locale: SupportedLocale): readonly NavigationViewItem[] {
  return Object.freeze(projectLocalizedPrimaryNavigation(locale).map((item) => {
    const localization = item.localization;
    return Object.freeze({
      id: item.id,
      href: `/${item.id}` as const,
      label: localization.kind === 'localized' ? localization.text : null,
      availability: localization.kind === 'localized' ? 'ready' as const : 'pending' as const,
    });
  }));
}
