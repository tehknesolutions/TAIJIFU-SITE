export const supportedLocales = Object.freeze(['pt-BR', 'en', 'es'] as const);

export type SupportedLocale = (typeof supportedLocales)[number];

const localePrefixes: Readonly<Record<SupportedLocale, string>> = Object.freeze({
  'pt-BR': 'pt-br',
  en: 'en',
  es: 'es',
});

export function localePrefix(locale: SupportedLocale): string {
  return localePrefixes[locale];
}

export function parseLocalePrefix(pathname: string): SupportedLocale | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (!firstSegment) return null;

  return supportedLocales.find((locale) => localePrefixes[locale] === firstSegment) ?? null;
}
