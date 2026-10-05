import type { SupportedLocale } from './locale.js';

export const localizationStatuses = Object.freeze(['approved', 'pending'] as const);
export type LocalizationStatus = (typeof localizationStatuses)[number];

export type LocalizedValue = Readonly<{
  sourceKey: string;
  locale: SupportedLocale;
  value: string;
  status: LocalizationStatus;
}>;

export type LocalizationEntry = Readonly<{
  sourceKey: string;
  values: Readonly<Record<SupportedLocale, LocalizedValue>>;
}>;

export function isApprovedLocalization(value: LocalizedValue): boolean {
  return value.status === 'approved' && value.value.trim().length > 0;
}

export function missingLocalizationLocales(entry: LocalizationEntry): SupportedLocale[] {
  return (Object.keys(entry.values) as SupportedLocale[]).filter(
    (locale) => !isApprovedLocalization(entry.values[locale]),
  );
}

export function assertStableSourceKey(entry: LocalizationEntry): void {
  if (!entry.sourceKey.trim()) {
    throw new Error('Localization sourceKey must be stable and non-empty.');
  }

  for (const locale of Object.keys(entry.values) as SupportedLocale[]) {
    if (entry.values[locale].sourceKey !== entry.sourceKey) {
      throw new Error(`Localization sourceKey mismatch for locale: ${locale}.`);
    }
  }
}