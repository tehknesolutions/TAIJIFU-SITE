import { canonSnapshot } from './canon-snapshot.js';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#39;');
}

export function renderCanonBases(): string {
  return `<section class="canon-bases" aria-labelledby="canon-bases-title"><header class="canon-bases__header"><p class="content-entry__type">TAIJIFU-CANON-1.0</p><h2 id="canon-bases-title">Bases canônicas</h2><p>As 4 Bases da release. Esta camada é apresentada separadamente porque a release não define uma relação Base → Faixa nos dados canônicos.</p></header><div class="canon-bases__grid">${canonSnapshot.bases.map((base) => `<article class="canon-base" data-base-id="${escapeHtml(base.id)}"><p class="canon-base__id">${escapeHtml(base.id)}</p><h3>${escapeHtml(base.name)}</h3><p>${escapeHtml(base.function)}</p><dl><div><dt>Elemento</dt><dd>${escapeHtml(base.element)}</dd></div><div><dt>Animal</dt><dd>${escapeHtml(base.animal)}</dd></div><div><dt>Cor</dt><dd>${escapeHtml(base.color)}</dd></div></dl></article>`).join('')}</div></section>`;
}
