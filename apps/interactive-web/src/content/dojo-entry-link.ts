import type { SupportedLocale } from './locale.js';

export function dojoEntryUrl(locale: SupportedLocale): string {
  return locale === 'pt-BR' ? '/pt-br/dojo/' : locale === 'en' ? '/en/dojo/' : '/es/dojo/';
}
