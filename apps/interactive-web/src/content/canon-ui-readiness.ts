import type { SupportedLocale } from './locale.js';
import { canonLocalizationFor, isReleaseReadyTranslation } from './canon-localization.js';

export function isCanonContentReleaseReady(locale: SupportedLocale): boolean {
  const records = canonLocalizationFor(locale);
  return records.length > 0 && records.every((record) => isReleaseReadyTranslation(record.status) && Boolean(record.text));
}
