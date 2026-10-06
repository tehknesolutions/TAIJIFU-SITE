import type { SupportedLocale } from './locale.js';
import { getDojoNucleusPage, findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import { getDojoNucleusNavigation } from './dojo-nucleus-navigation.js';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

const dojoEntryUrl = (locale: SupportedLocale) => locale === 'pt-BR' ? '/pt-br/dojo/' : locale === 'en' ? '/en/dojo/' : '/es/dojo/';
const manifestoUrl = (locale: SupportedLocale) => locale === 'pt-BR' ? '/pt-br/manifesto/' : locale === 'en' ? '/en/manifesto/' : '/es/manifesto/';
const practiceChrome = (locale: SupportedLocale) => locale === 'en'
  ? { practice: 'Practice', nucleus: 'Nucleus', action: 'PRACTICE THIS NUCLEUS', exitAction: 'EXIT PRACTICE MODE', nextNucleus: 'Next Nucleus', nextPath: 'Next Path', curriculum: 'Curriculum', dojoMap: 'Dojo Map' }
  : locale === 'es'
    ? { practice: 'Práctica', nucleus: 'Núcleo', action: 'PRACTICAR ESTE NÚCLEO', exitAction: 'SALIR DEL MODO PRÁCTICA', nextNucleus: 'Siguiente Núcleo', nextPath: 'Siguiente Camino', curriculum: 'Currículo', dojoMap: 'Mapa del Dojo' }
    : { practice: 'Prática', nucleus: 'Núcleo', action: 'PRATICAR ESTE NÚCLEO', exitAction: 'SAIR DO MODO PRÁTICA', nextNucleus: 'Próximo Núcleo', nextPath: 'Próximo Caminho', curriculum: 'Currículo', dojoMap: 'Mapa do Dojo' };

export function renderDojoNucleusPage(nucleusId: string, locale: SupportedLocale): string | null {
  const page = getDojoNucleusPage(nucleusId);
  const route = findDojoNucleusRoute(nucleusId, locale);
  const navigation = getDojoNucleusNavigation(nucleusId, locale);
  if (!page || !route || !navigation) return null;
  const chrome = practiceChrome(locale);

  const pendingCopy = locale === 'pt-BR'
    ? ''
    : '<p class="dojo-nucleus-page__localization">Conteúdo instrucional recuperado preservado no idioma da fonte. Tradução oficial para este locale ainda não está aprovada.</p>';

  const breadcrumb = `<nav class="dojo-nucleus-page__breadcrumb" aria-label="Breadcrumb"><a href="${escapeHtml(manifestoUrl(locale))}">TAIJIFU</a><span>›</span><a href="${escapeHtml(dojoEntryUrl(locale))}">${escapeHtml(chrome.dojoMap)}</a><span>›</span><span>${escapeHtml(navigation.belt.name)}</span><span>›</span><span>${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)}</span><span>›</span><span>${escapeHtml(page.nucleus.name)}</span></nav>`;
  const dojoMap = `<section class="dojo-map" aria-labelledby="dojo-map-title"><header class="dojo-map__header"><div><p class="content-entry__type">${escapeHtml(chrome.dojoMap)}</p><h2 id="dojo-map-title">${escapeHtml(navigation.belt.name)} → ${escapeHtml(navigation.path.code)} → ${escapeHtml(page.nucleus.id)}</h2><p>Orientação estrutural do currículo oficial. Não representa progresso pessoal.</p></div><a class="dojo-map__return" href="${escapeHtml(dojoEntryUrl(locale))}">Ver mapa completo →</a></header><nav class="dojo-map__belts" aria-label="Faixas do currículo"><p>Faixas</p><ol>${navigation.belts.map((item) => `<li class="${item.current ? 'is-current' : ''}"><a href="${escapeHtml(item.url)}" aria-current="${item.current ? 'page' : 'false'}"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.entryPathCode)} · ${escapeHtml(item.entryNucleusId)}</span></a></li>`).join('')}</ol></nav><nav class="dojo-map__paths" aria-label="Caminhos da ${escapeHtml(navigation.belt.name)}"><p>${escapeHtml(navigation.belt.name)} · Caminho ${navigation.beltPathPosition}/${navigation.beltPathCount}</p><ol>${navigation.beltPaths.map((item) => `<li class="${item.current ? 'is-current' : ''}"><a href="${escapeHtml(item.url)}" aria-current="${item.current ? 'page' : 'false'}"><strong>${escapeHtml(item.code)}</strong><span>${escapeHtml(item.name)}</span></a></li>`).join('')}</ol></nav><nav class="dojo-map__nuclei" aria-label="Núcleos de ${escapeHtml(navigation.path.code)}"><p>${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)} · ${escapeHtml(chrome.nucleus)} ${navigation.pathPosition}/${navigation.pathSize}</p><ol>${navigation.pathNuclei.map((item, index) => `<li class="${index + 1 === navigation.pathPosition ? 'is-current' : ''}"><a href="${escapeHtml(item.url)}" aria-current="${index + 1 === navigation.pathPosition ? 'page' : 'false'}">${escapeHtml(item.id)} · ${escapeHtml(item.name)}</a></li>`).join('')}</ol></nav></section>`;
  const practiceContinuation = navigation.next
    ? `<a class="dojo-practice__continue" href="${escapeHtml(navigation.next.url)}"><span>${escapeHtml(chrome.nextNucleus)}</span><strong>${escapeHtml(navigation.next.id)} · ${escapeHtml(navigation.next.name)} →</strong></a>`
    : navigation.nextPath
      ? `<a class="dojo-practice__continue" href="${escapeHtml(navigation.nextPath.url)}"><span>${escapeHtml(chrome.nextPath)}</span><strong>${escapeHtml(navigation.nextPath.code)} · ${escapeHtml(navigation.nextPath.name)} · ${escapeHtml(navigation.nextPath.entryNucleusId)} →</strong></a>`
      : `<a class="dojo-practice__continue" href="${escapeHtml(dojoEntryUrl(locale))}"><span>${escapeHtml(chrome.curriculum)}</span><strong>${escapeHtml(chrome.dojoMap)} →</strong></a>`;
  const practice = `<section class="dojo-practice" data-practice-authority="${escapeHtml(page.instructional.source.layer)}" tabindex="-1"><div class="dojo-practice__heading"><div><p class="dojo-practice__eyebrow">${escapeHtml(chrome.practice)} · ${escapeHtml(chrome.nucleus)} ${navigation.pathPosition}/${navigation.pathSize}</p><h2>${escapeHtml(chrome.practice)}</h2></div><button class="dojo-practice__focus" type="button" data-dojo-practice-focus aria-pressed="false" data-practice-enter-label="${escapeHtml(chrome.action)}" data-practice-exit-label="${escapeHtml(chrome.exitAction)}">${escapeHtml(chrome.action)}</button></div><p class="dojo-practice__body">${escapeHtml(page.instructional.practice)}</p><p class="dojo-practice__authority">Conteúdo instrucional recuperado · ${escapeHtml(page.instructional.source.layer)}</p>${practiceContinuation}</section>`;
  const sequence = `<nav class="dojo-nucleus-page__sequence" aria-label="Navegação entre Núcleos">${navigation.previous ? `<a href="${escapeHtml(navigation.previous.url)}">← ${escapeHtml(navigation.previous.id)} · ${escapeHtml(navigation.previous.name)}</a>` : '<span></span>'}${navigation.next ? `<a href="${escapeHtml(navigation.next.url)}">${escapeHtml(navigation.next.id)} · ${escapeHtml(navigation.next.name)} →</a>` : '<span></span>'}</nav>`;
  const atPathEnd = navigation.pathPosition === navigation.pathSize;
  const pathTransition = navigation.previousPath || navigation.nextPath || atPathEnd
    ? `<section class="dojo-nucleus-page__path-transition" aria-label="Transição entre Caminhos">${atPathEnd ? `<div class="dojo-nucleus-page__path-boundary"><p class="dojo-nucleus-page__path-boundary-label">Fim deste Caminho</p><strong>${escapeHtml(navigation.path.code)} · ${escapeHtml(navigation.path.name)}</strong><p>Limite estrutural do currículo. Nenhum progresso pessoal é registrado.</p></div>` : ''}<nav>${navigation.previousPath ? `<a class="dojo-nucleus-page__path-transition-link" href="${escapeHtml(navigation.previousPath.url)}"><span>Caminho anterior</span><strong>← ${escapeHtml(navigation.previousPath.code)} · ${escapeHtml(navigation.previousPath.name)}</strong></a>` : '<span></span>'}${navigation.nextPath ? `<a class="dojo-nucleus-page__path-transition-link" href="${escapeHtml(navigation.nextPath.url)}"><span>Próximo Caminho</span><strong>${escapeHtml(navigation.nextPath.code)} · ${escapeHtml(navigation.nextPath.name)} →</strong></a>` : '<span></span>'}</nav></section>`
    : '';

  return `<article class="dojo-nucleus-page" data-nucleus-id="${escapeHtml(nucleusId)}" data-authority="${escapeHtml(page.authority)}">
    ${breadcrumb}<header><p class="content-entry__type">Dojo · ${escapeHtml(chrome.nucleus)}</p><p class="dojo-nucleus-page__id">${escapeHtml(page.nucleus.id)}</p><h1>${escapeHtml(page.nucleus.name)}</h1><p>${escapeHtml(page.nucleus.function)}</p></header>
    ${pendingCopy}
    ${dojoMap}
    <section class="dojo-nucleus-page__summary"><p class="dojo-nucleus-page__authority">Camada instrucional · ${escapeHtml(page.instructional.source.layer)}</p><h2>Resumo</h2><p>${escapeHtml(page.instructional.summary)}</p></section>
    ${practice}${sequence}${pathTransition}<footer><p>Fonte: ${escapeHtml(page.instructional.source.repository)}</p><p>Revisão: ${escapeHtml(page.instructional.source.revision)}</p><a href="${escapeHtml(route.canonicalUrl)}">URL canônica deste Núcleo</a></footer>
  </article>`;
}
