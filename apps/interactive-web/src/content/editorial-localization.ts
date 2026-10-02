import type { SupportedLocale } from './locale.js';
import { isReleaseReadyTranslation, type TranslationStatus } from './canon-localization.js';

export type EditorialLocalizationRecord = Readonly<{
  fieldId: string;
  locale: SupportedLocale;
  status: TranslationStatus;
  text: string | null;
  sourceRelease: 'TAIJIFU-CANON-1.0';
}>;

const authoritativePtBR = Object.freeze({
  'navigation.explore-principle': 'Explorar princípio',
} as const);

const fieldIds = Object.freeze(Object.keys(authoritativePtBR) as readonly (keyof typeof authoritativePtBR)[]);

const ptBR: readonly EditorialLocalizationRecord[] = Object.freeze(fieldIds.map((fieldId) => Object.freeze({
  fieldId,
  locale: 'pt-BR' as const,
  status: 'approved' as const,
  text: authoritativePtBR[fieldId],
  sourceRelease: 'TAIJIFU-CANON-1.0' as const,
})));

const pendingFor = (locale: 'en' | 'es'): readonly EditorialLocalizationRecord[] => Object.freeze(
  fieldIds.map((fieldId) => Object.freeze({
    fieldId,
    locale,
    status: 'pending' as const,
    text: null,
    sourceRelease: 'TAIJIFU-CANON-1.0' as const,
  })),
);

const records: Readonly<Record<SupportedLocale, readonly EditorialLocalizationRecord[]>> = Object.freeze({
  'pt-BR': ptBR,
  en: pendingFor('en'),
  es: pendingFor('es'),
});

export function editorialLocalizationFor(locale: SupportedLocale): readonly EditorialLocalizationRecord[] {
  return records[locale];
}

export type LocalizedEditorialField =
  | Readonly<{ kind: 'localized'; fieldId: string; locale: SupportedLocale; text: string; status: 'reviewed' | 'approved' }>
  | Readonly<{ kind: 'pending'; fieldId: string; locale: SupportedLocale }>
  | Readonly<{ kind: 'missing'; fieldId: string; locale: SupportedLocale }>;

export function localizeEditorialField(fieldId: string, locale: SupportedLocale): LocalizedEditorialField {
  const record = records[locale].find((candidate) => candidate.fieldId === fieldId);
  if (!record) return Object.freeze({ kind: 'missing', fieldId, locale });
  if (!record.text || !isReleaseReadyTranslation(record.status)) return Object.freeze({ kind: 'pending', fieldId, locale });
  return Object.freeze({ kind: 'localized', fieldId, locale, text: record.text, status: record.status as 'reviewed' | 'approved' });
}
