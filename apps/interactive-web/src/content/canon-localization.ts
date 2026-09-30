import { canonCurriculumEntities } from './canon-snapshot.js';
import type { SupportedLocale } from './locale.js';

export type TranslationStatus = 'pending' | 'translated' | 'reviewed' | 'approved';

export type CanonLocalizationRecord = Readonly<{
  entityId: string;
  locale: SupportedLocale;
  status: TranslationStatus;
  text: string | null;
  sourceRelease: 'TAIJIFU-CANON-1.0';
}>;

const ptBR: readonly CanonLocalizationRecord[] = Object.freeze(canonCurriculumEntities.map((entity) => Object.freeze({
  entityId: entity.id,
  locale: 'pt-BR' as const,
  status: 'approved' as const,
  text: entity.label,
  sourceRelease: 'TAIJIFU-CANON-1.0' as const,
})));

const pendingFor = (locale: 'en' | 'es'): readonly CanonLocalizationRecord[] => Object.freeze(
  canonCurriculumEntities.map((entity) => Object.freeze({
    entityId: entity.id,
    locale,
    status: 'pending' as const,
    text: null,
    sourceRelease: 'TAIJIFU-CANON-1.0' as const,
  })),
);

const records: Readonly<Record<SupportedLocale, readonly CanonLocalizationRecord[]>> = Object.freeze({
  'pt-BR': ptBR,
  en: pendingFor('en'),
  es: pendingFor('es'),
});

export function canonLocalizationFor(locale: SupportedLocale): readonly CanonLocalizationRecord[] {
  return records[locale];
}

export function isReleaseReadyTranslation(status: TranslationStatus): boolean {
  return status === 'reviewed' || status === 'approved';
}

export type LocalizedCanonEntity =
  | Readonly<{ kind: 'localized'; entityId: string; locale: SupportedLocale; text: string; status: 'reviewed' | 'approved' }>
  | Readonly<{ kind: 'pending'; entityId: string; locale: SupportedLocale }>
  | Readonly<{ kind: 'missing'; entityId: string; locale: SupportedLocale }>;

export function localizeCanonEntity(entityId: string, locale: SupportedLocale): LocalizedCanonEntity {
  const record = records[locale].find((candidate) => candidate.entityId === entityId);
  if (!record) return Object.freeze({ kind: 'missing', entityId, locale });
  if (!record.text || !isReleaseReadyTranslation(record.status)) return Object.freeze({ kind: 'pending', entityId, locale });
  return Object.freeze({ kind: 'localized', entityId, locale, text: record.text, status: record.status as 'reviewed' | 'approved' });
}
