import type { SupportedLocale } from './locale.js';
import { getDojoNucleusPage, findDojoNucleusRoute } from './dojo-nucleus-routes.js';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

export function renderDojoNucleusPage(nucleusId: string, locale: SupportedLocale): string | null {
  const page = getDojoNucleusPage(nucleusId);
  const route = findDojoNucleusRoute(nucleusId, locale);
  if (!page || !route) return null;

  const pendingCopy = locale === 'pt-BR'
    ? ''
    : '<p class="dojo-nucleus-page__localization">Conteúdo instrucional recuperado preservado no idioma da fonte. Tradução oficial para este locale ainda não está aprovada.</p>';

  return `<article class="dojo-nucleus-page" data-nucleus-id="${escapeHtml(nucleusId)}" data-authority="${escapeHtml(page.authority)}">
    <header><p class="content-entry__type">Dojo · Núcleo</p><p class="dojo-nucleus-page__id">${escapeHtml(page.nucleus.id)}</p><h1>${escapeHtml(page.nucleus.name)}</h1><p>${escapeHtml(page.nucleus.function)}</p></header>
    ${pendingCopy}
    <section><p class="dojo-nucleus-page__authority">Camada instrucional · ${escapeHtml(page.instructional.source.layer)}</p><h2>Resumo</h2><p>${escapeHtml(page.instructional.summary)}</p><h2>Prática</h2><p>${escapeHtml(page.instructional.practice)}</p></section>
    <footer><p>Fonte: ${escapeHtml(page.instructional.source.repository)}</p><p>Revisão: ${escapeHtml(page.instructional.source.revision)}</p><a href="${escapeHtml(route.canonicalUrl)}">URL canônica deste Núcleo</a></footer>
  </article>`;
}
