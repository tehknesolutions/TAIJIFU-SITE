import type { SupportedLocale } from './locale.js';

export type PrimaryNavigationDefinition = Readonly<{
  id: 'manifesto' | 'fundamentos' | 'influencias' | 'metodo' | 'graduacao' | 'referencias' | 'historia';
  ptBR: Readonly<{ label: string; slug: string }>;
  en: Readonly<{ label: string; slug: string }>;
  es: Readonly<{ label: string; slug: string }>;
  legacyUrls: readonly string[];
}>;

export const primaryNavigationDefinitions: readonly PrimaryNavigationDefinition[] = Object.freeze([
  Object.freeze({ id: 'manifesto', ptBR: { label: 'Manifesto', slug: 'manifesto' }, en: { label: 'Manifesto', slug: 'manifesto' }, es: { label: 'Manifesto', slug: 'manifesto' }, legacyUrls: ['/o-que-e/'] }),
  Object.freeze({ id: 'fundamentos', ptBR: { label: 'Fundamentos', slug: 'fundamentos' }, en: { label: 'Foundations', slug: 'foundations' }, es: { label: 'Fundamentos', slug: 'fundamentos' }, legacyUrls: ['/filosofia/'] }),
  Object.freeze({ id: 'influencias', ptBR: { label: 'Influências', slug: 'influencias' }, en: { label: 'Influences', slug: 'influences' }, es: { label: 'Influencias', slug: 'influencias' }, legacyUrls: ['/artes-base/'] }),
  Object.freeze({ id: 'metodo', ptBR: { label: 'Método', slug: 'metodo' }, en: { label: 'Method', slug: 'method' }, es: { label: 'Método', slug: 'metodo' }, legacyUrls: ['/trilhas/'] }),
  Object.freeze({ id: 'graduacao', ptBR: { label: 'Graduação', slug: 'graduacao' }, en: { label: 'Graduation', slug: 'graduation' }, es: { label: 'Graduación', slug: 'graduacion' }, legacyUrls: ['/niveis-e-graduacao/'] }),
  Object.freeze({ id: 'referencias', ptBR: { label: 'Referências', slug: 'referencias' }, en: { label: 'References', slug: 'references' }, es: { label: 'Referencias', slug: 'referencias' }, legacyUrls: ['/textos-oficiais/'] }),
  Object.freeze({ id: 'historia', ptBR: { label: 'História', slug: 'historia' }, en: { label: 'History', slug: 'history' }, es: { label: 'Historia', slug: 'historia' }, legacyUrls: ['/registro/'] }),
]);

export const primaryNavigationIds = Object.freeze(
  primaryNavigationDefinitions.map((entry) => entry.id),
);

export function primaryNavigationDefinition(id: string): PrimaryNavigationDefinition | undefined {
  return primaryNavigationDefinitions.find((entry) => entry.id === id);
}

export function primaryNavigationProjection(
  id: string,
  locale: SupportedLocale,
): Readonly<{ label: string; slug: string }> | undefined {
  const definition = primaryNavigationDefinition(id);
  return definition?.[locale === 'pt-BR' ? 'ptBR' : locale];
}
