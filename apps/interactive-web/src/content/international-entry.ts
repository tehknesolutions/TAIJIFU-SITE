import type { SupportedLocale } from './locale.js';
import { languageOptions, equivalentLocaleUrl } from './language-selector.js';
import { messagesFor } from './ui-messages.js';

const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export function renderInternationalEntry(): string {
  const entries = languageOptions.map(({ locale, label }) => {
    const messages = messagesFor(locale);
    return `<a class="language-entry__option" lang="${locale}" hreflang="${locale}" href="${equivalentLocaleUrl('manifesto', locale)}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(messages.internationalEntryLead)}</span></a>`;
  }).join('');

  return `<section class="language-entry" aria-labelledby="language-entry-title"><h1 id="language-entry-title">TAIJIFU</h1><p>Português · English · Español</p><nav aria-label="Language · Idioma">${entries}</nav></section>`;
}

export function renderLanguageSelector(routeId: string, currentLocale: SupportedLocale): string {
  const messages = messagesFor(currentLocale);
  const options = languageOptions.map(({ locale, label }) => {
    const current = locale === currentLocale ? ' aria-current="true"' : '';
    return `<a lang="${locale}" hreflang="${locale}" href="${equivalentLocaleUrl(routeId, locale)}"${current}>${escapeHtml(label)}</a>`;
  }).join('');

  return `<nav class="language-selector" aria-label="${escapeHtml(messages.languageSelector)}">${options}</nav>`;
}
