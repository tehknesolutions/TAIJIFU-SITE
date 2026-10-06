import type { SupportedLocale } from './locale.js';
import { getDojoNucleusPage, findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

export function renderDojoNucleusPage(nucleusId: string, locale: SupportedLocale): string | null {
  const page = getDojoNucleusPage(nucleusId);
  const route = findDojoNucleusRoute(nucleusId, locale);
  const navigation = getDojoNucleusNavigation(nucleusId, locale);
  if (!page || !route || !navigation) return null;

  const pendingCopy = locale === 'pt-BR'
    ? ''
    : '<p class="dojo-nucleus-page__localization">Conteúdo instrucional recuperado preservado no idioma da fonte. Tradução oficial para este locale ainda não está aprovada.</p>';

  const breadcrumb = `<nav class="dojo-nucleus-page__breadcrumb" aria-label="Breadcrumb"><a href="${escapeHtml(locale === 'pt-BR' ? '/pt-br/manifesto/' : locale === 'en' ? '/en/manifesto/' : '/es/manifesto/')}">TAIJIFU</a><span>›</span><span>${escapeHtml(navigation.belt.name)}</span><span>›</span><span>${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)}</span><span>›</span><span>${escapeHtml(page.nucleus.name)}</span></nav>`;
  const pathContext = `<section class="dojo-nucleus-page__path-context"><p class="dojo-nucleus-page__path-label">${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)} · Núcleo ${navigation.pathPosition}/${navigation.pathSize}</p><ol>${navigation.pathNuclei.map((item, index) => `<li class="${index + 1 === navigation.pathPosition ? 'is-current' : ''}"><a href="${escapeHtml(item.url)}" aria-current="${index + 1 === navigation.pathPosition ? 'page' : 'false'}">${escapeHtml(item.id)} · ${escapeHtml(item.name)}</a></li>`).join('')}</ol></section>`;
  const practice = `<section class="dojo-practice" data-practice-authority="${escapeHtml(page.instructional.source.layer)}" tabindex="-1"><div class="dojo-practice__heading"><div><p class="dojo-practice__eyebrow">Prática · Núcleo ${navigation.pathPosition}/${navigation.pathSize}</p><h2>Prática</h2></div><button class="dojo-practice__focus" type="button" data-dojo-practice-focus aria-pressed="false">Entrar no modo prática</button></div><p class="dojo-practice__body">${escapeHtml(page.instructional.practice)}</p><p class="dojo-practice__authority">Conteúdo instrucional recuperado · ${escapeHtml(page.instructional.source.layer)}</p></section>`;
  const sequence = `<nav class="dojo-nucleus-page__sequence" aria-label="Navegação entre Núcleos">${navigation.previous ? `<a href="${escapeHtml(navigation.previous.url)}">← ${escapeHtml(navigation.previous.id)} · ${escapeHtml(navigation.previous.name)}</a>` : '<span></span>'}${navigation.next ? `<a href="${escapeHtml(navigation.next.url)}">${escapeHtml(navigation.next.id)} · ${escapeHtml(navigation.next.name)} →</a>` : '<span></span>'}</nav>`;
  const atPathEnd = navigation.pathPosition === navigation.pathSize;
  const pathTransition = navigation.previousPath || navigation.nextPath || atPathEnd
    ? `<section class="dojo-nucleus-page__path-transition" aria-label="Transição entre Caminhos">${atPathEnd ? `<div class="dojo-nucleus-page__path-boundary"><p class="dojo-nucleus-page__path-boundary-label">Fim deste Caminho</p><strong>${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)}</strong><p>Limite estrutural do currículo. Nenhum progresso pessoal é registrado.</p></div>` : ''}<nav>${navigation.previousPath ? `<a class="dojo-nucleus-page__path-transition-link" href="${escapeHtml(navigation.previousPath.url)}"><span>Caminho anterior</span><strong>← ${escapeHtml(navigation.previousPath.code)} · ${escapeHtml(navigation.previousPath.name)}</strong></a>` : '<span></span>'}${navigation.nextPath ? `<a class="dojo-nucleus-page__path-transition-link" href="${escapeHtml(navigation.nextPath.url)}"><span>Próximo Caminho</span><strong>${escapeHtml(navigation.nextPath.code)} · ${escapeHtml(navigation.nextPath.name)} →</strong></a>` : '<span></span>'}</nav></section>`
    : '';

  return `<article class="dojo-nucleus-page" data-nucleus-id="${escapeHtml(nucleusId)}" data-authority="${escapeHtml(page.authority)}">
    ${breadcrumb}<header><p class="content-entry__type">Dojo · Núcleo</p><p class="dojo-nucleus-page__id">${escapeHtml(page.nucleus.id)}</p><h1>${escapeHtml(page.nucleus.name)}</h1><p>${escapeHtml(page.nucleus.function)}</p></header>
    ${pendingCopy}
    <section class="dojo-nucleus-page__summary"><p class="dojo-nucleus-page__authority">Camada instrucional · ${escapeHtml(page.instructional.source.layer)}</p><h2>Resumo</h2><p>${escapeHtml(page.instructional.summary)}</p></section>
    ${practice}${pathContext}${sequence}${pathTransition}<footer><p>Fonte: ${escapeHtml(page.instructional.source.repository)}</p><p>Revisão: ${escapeHtml(page.instructional.source.revision)}</p><a href="${escapeHtml(route.canonicalUrl)}">URL canônica deste Núcleo</a></footer>
  </article>`;
}
