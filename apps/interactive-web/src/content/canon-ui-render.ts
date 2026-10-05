import { canonSnapshot } from './canon-snapshot.js';
import { getDojoNucleus } from './canon-dojo-projection.js';
import { findDojoNucleusRoute } from './dojo-nucleus-routes.js';
import { localizeCanonEntity } from './canon-localization.js';
import { isCanonContentReleaseReady } from './canon-ui-readiness.js';
import type { SupportedLocale } from './locale.js';
import {
  buildCanonHierarchy,
  buildFourBases,
  buildGraduationTrack,
  buildPrincipleTriad,
} from '../canon-ui.js';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char] ?? char);
}

const PrincipleTriad = buildPrincipleTriad(canonSnapshot);
const FourBases = buildFourBases(canonSnapshot);
const GraduationTrack = buildGraduationTrack(canonSnapshot);
const CanonHierarchy = buildCanonHierarchy(canonSnapshot);

export function renderPrincipleTriad(): string {
  return `<section class="canon-principles" aria-labelledby="canon-principles-title"><h2 id="canon-principles-title">TAI · JI · FU</h2><ul>${PrincipleTriad.map((item) => `<li><strong>${escapeHtml(item.name.toUpperCase())}</strong><span>${escapeHtml(item.function)}</span></li>`).join('')}</ul></section>`;
}

export function renderFourBases(): string {
  return `<section class="canon-bases" aria-labelledby="canon-bases-title"><h2 id="canon-bases-title">4 Bases</h2><ul>${FourBases.map((base) => `<li><h3>${escapeHtml(base.name)}</h3><dl><dt>Elemento</dt><dd>${escapeHtml(base.element)}</dd><dt>Animal</dt><dd>${escapeHtml(base.animal)}</dd><dt>Função</dt><dd>${escapeHtml(base.function)}</dd><dt>Cor</dt><dd>${escapeHtml(base.color)}</dd></dl></li>`).join('')}</ul></section>`;
}

export function renderGraduationTrack(): string {
  return `<section class="canon-graduation" aria-labelledby="canon-graduation-title"><h2 id="canon-graduation-title">Graduação</h2><ol>${GraduationTrack.map((belt) => `<li data-belt-id="${escapeHtml(belt.id)}"><span>${belt.order}. ${escapeHtml(belt.name)}</span><small>${escapeHtml(belt.function)}${belt.id === 'BELT-BLACK' ? ' · Síntese' : ''}</small></li>`).join('')}</ol></section>`;
}

export function renderCanonHierarchy(locale: SupportedLocale = 'pt-BR'): string {
  const belts = CanonHierarchy.map((belt) => {
    const paths = belt.paths.map((path) => `<details class="canon-path"><summary>${escapeHtml(path.code)} · ${escapeHtml(path.name)}</summary><p>${escapeHtml(path.function)}</p><ol>${path.nuclei.map((nucleus) => { const dojo = getDojoNucleus(nucleus.id); const route = findDojoNucleusRoute(nucleus.id, locale); return `<li data-nucleus-id="${escapeHtml(nucleus.id)}"><details class="canon-nucleus"><summary><span>${escapeHtml(nucleus.id)}</span> · ${escapeHtml(nucleus.name)}</summary>${dojo ? `<div class="canon-nucleus__instruction"><p class="canon-nucleus__authority">Conteúdo instrucional recuperado · ${escapeHtml(dojo.instructional.source.layer)}</p><h4>Resumo</h4><p>${escapeHtml(dojo.instructional.summary)}</p><h4>Prática</h4><p>${escapeHtml(dojo.instructional.practice)}</p><p class="canon-nucleus__provenance">Fonte: ${escapeHtml(dojo.instructional.source.repository)} · ${escapeHtml(dojo.instructional.source.revision)}</p>${route ? `<a class="canon-nucleus__link" href="${escapeHtml(route.canonicalUrl)}">Abrir Núcleo no Dojo</a>` : ''}</div>` : '<p class="canon-nucleus__missing">Conteúdo instrucional não disponível.</p>'}</details></li>`; }).join('')}</ol></details>`).join('');
    return `<details class="canon-belt"><summary>${belt.order}. ${escapeHtml(belt.name)}</summary><p>${escapeHtml(belt.function)}</p>${paths || '<p class="canon-synthesis">Estado de síntese.</p>'}</details>`;
  }).join('');
  return `<section class="canon-hierarchy" aria-labelledby="canon-hierarchy-title"><h2 id="canon-hierarchy-title">Canon curricular</h2><p>10 Faixas · 32 Caminhos · 128 Núcleos</p><div>${belts}</div></section>`;
}

function renderPendingCanonUI(locale: Exclude<SupportedLocale, 'pt-BR'>): string {
  const label = locale === 'en' ? 'Canon content translation pending' : 'Traducción del contenido del Canon pendiente';
  const detail = locale === 'en'
    ? 'The official TAIJIFU-CANON-1.0 content is not released in this language yet.'
    : 'El contenido oficial de TAIJIFU-CANON-1.0 aún no está publicado en este idioma.';
  return `<section class="canon-ui canon-ui--pending" data-canon-release="TAIJIFU-CANON-1.0" data-canon-localization="pending" aria-labelledby="canon-localization-pending-title"><h2 id="canon-localization-pending-title">TAIJIFU-CANON-1.0</h2><p>${escapeHtml(label)}</p><p>${escapeHtml(detail)}</p></section>`;
}

export function renderCanonUIForLocale(locale: SupportedLocale): string {
  if (!isCanonContentReleaseReady(locale)) {
    return renderPendingCanonUI(locale);
  }
  return renderCanonUI();
}

export function renderCanonUI(): string {
  return `<div class="canon-ui" data-canon-release="TAIJIFU-CANON-1.0">${renderPrincipleTriad()}${renderFourBases()}${renderGraduationTrack()}${renderCanonHierarchy(locale)}</div>`;
}
