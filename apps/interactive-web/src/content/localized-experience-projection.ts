import type { SupportedLocale } from './locale.js';
import { primaryNavigationIds } from './primary-navigation.js';
import { localizeEditorialField, type LocalizedEditorialField } from './editorial-localization.js';


export type PrimaryNavigationId = (typeof primaryNavigationIds)[number];

export type LocalizedPrimaryNavigationItem = Readonly<{
  id: PrimaryNavigationId;
  fieldId: `navigation.${PrimaryNavigationId}`;
  localization: LocalizedEditorialField;
}>;

export function projectLocalizedPrimaryNavigation(
  locale: SupportedLocale,
): readonly LocalizedPrimaryNavigationItem[] {
  return Object.freeze(primaryNavigationIds.map((id) => {
    const fieldId = `navigation.${id}` as const;
    return Object.freeze({
      id,
      fieldId,
      localization: localizeEditorialField(fieldId, locale),
    });
  }));
}
