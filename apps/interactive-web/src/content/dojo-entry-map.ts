import { canonSnapshot } from './canon-snapshot.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import type { SupportedLocale } from './locale.js';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

export function renderDojoEntryMap(locale: SupportedLocale): string {
  const belts = canonSnapshot.belts.map((belt) => {
    const firstPathCode = belt.pathIds[0];
    if (!firstPathCode) {
      return `<li class="dojo-entry-map__belt dojo-entry-map__belt--synthesis" data-belt-id="${escapeHtml(belt.id)}"><div><strong>${escapeHtml(belt.name)}</strong><span>${escapeHtml(belt.function)}</span></div><p>Síntese · sem Caminhos adicionais no Canon.</p></li>`;
    }

    const firstPath = canonSnapshot.paths.find(({ beltId, code }) => beltId === belt.id && code === firstPathCode);
    if (!firstPath) throw new Error(`Missing Canon entry Path ${firstPathCode} for ${belt.id}`);
    const entryNucleusId = firstPath.nucleusIds[0];
    const route = findDojoNucleusRoute(entryNucleusId, locale);
    if (!route) throw new Error(`Missing localized Dojo entry route for ${entryNucleusId}`);

    return `<li class="dojo-entry-map__belt" data-belt-id="${escapeHtml(belt.id)}"><a href="${escapeHtml(route.canonicalUrl)}"><div><strong>${escapeHtml(belt.name)}</strong><span>${escapeHtml(belt.function)}</span></div><p>${escapeHtml(firstPath.code)} · ${escapeHtml(firstPath.name)}</p><small>${escapeHtml(entryNucleusId)}</small></a></li>`;
  }).join('');

  return `<section class="dojo-entry-map" aria-labelledby="dojo-entry-map-title"><header><p class="content-entry__type">Currículo oficial</p><h2 id="dojo-entry-map-title">Mapa do Dojo</h2><p>${canonSnapshot.belts.length} Faixas · ${canonSnapshot.paths.length} Caminhos · ${canonSnapshot.nuclei.length} Núcleos</p><p>Escolha uma Faixa para entrar no primeiro Caminho e primeiro Núcleo canônico disponível. Esta superfície representa estrutura curricular, não progresso pessoal.</p></header><ol class="dojo-entry-map__belts">${belts}</ol></section>`;
}
