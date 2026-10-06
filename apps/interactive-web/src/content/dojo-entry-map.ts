import { manifestationForContext } from '@taijifu/design-tokens';
import { canonSnapshot } from './canon-snapshot.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import type { SupportedLocale } from './locale.js';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] ?? char);

export function renderDojoEntryMap(locale: SupportedLocale): string {
  const manifestation = manifestationForContext('dojo-entry');
  const belts = canonSnapshot.belts.map((belt, index) => {
    const firstPathCode = belt.pathIds[0];
    if (!firstPathCode) {
      return `<li class="dojo-entry-map__belt dojo-entry-map__belt--synthesis" data-belt-id="${escapeHtml(belt.id)}"><span class="dojo-entry-map__index">${String(index + 1).padStart(2, '0')}</span><div class="dojo-entry-map__belt-copy"><strong>${escapeHtml(belt.name)}</strong><span>${escapeHtml(belt.function)}</span><p>Síntese · sem Caminhos adicionais no Canon.</p></div><span class="dojo-entry-map__state">Síntese</span></li>`;
    }

    const firstPath = canonSnapshot.paths.find(({ beltId, code }) => beltId === belt.id && code === firstPathCode);
    if (!firstPath) throw new Error(`Missing Canon entry Path ${firstPathCode} for ${belt.id}`);
    const entryNucleusId = firstPath.nucleusIds[0];
    const route = findDojoNucleusRoute(entryNucleusId, locale);
    if (!route) throw new Error(`Missing localized Dojo entry route for ${entryNucleusId}`);

    return `<li class="dojo-entry-map__belt" data-belt-id="${escapeHtml(belt.id)}"><a href="${escapeHtml(route.canonicalUrl)}"><span class="dojo-entry-map__index">${String(index + 1).padStart(2, '0')}</span><div class="dojo-entry-map__belt-copy"><strong>${escapeHtml(belt.name)}</strong><span>${escapeHtml(belt.function)}</span><p>${escapeHtml(firstPath.code)} · ${escapeHtml(firstPath.name)}</p></div><small>${escapeHtml(entryNucleusId)}</small><span class="dojo-entry-map__enter" aria-hidden="true">→</span></a></li>`;
  }).join('');

  return `<section class="dojo-entry-map" data-manifestation="${manifestation}" aria-labelledby="dojo-entry-map-title"><header class="dojo-entry-map__hero"><p class="content-entry__type">Currículo oficial</p><p class="dojo-entry-map__overline">TAIJIFU Dojo</p><h1 id="dojo-entry-map-title">Mapa do Dojo</h1><div class="dojo-entry-map__metrics" aria-label="Estrutura curricular"><strong>${canonSnapshot.belts.length}<span> Faixas</span></strong><strong>${canonSnapshot.paths.length}<span> Caminhos</span></strong><strong>${canonSnapshot.nuclei.length}<span> Núcleos</span></strong></div><p class="dojo-entry-map__lead">Escolha uma Faixa para entrar no primeiro Caminho e primeiro Núcleo canônico disponível.</p><p class="dojo-entry-map__orientation">Esta superfície representa estrutura curricular, não progresso pessoal.</p></header><div class="dojo-entry-map__threshold" aria-hidden="true"><span>TAI</span><i></i><span>JI</span><i></i><span>FU</span></div><ol class="dojo-entry-map__belts">${belts}</ol></section>`;
}
