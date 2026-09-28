import { canonToExperienceNodes } from './content/canon-registry.js';
import {
  canonGraduationGroups,
  canonMethodGroups,
  type CanonCurriculumGroup,
} from './content/canon-curriculum-pages.js';
import { getOfficialPageContent, type ContentBlock } from './content/official-page-content.js';
import {
  findSiteRoute,
  primaryNavigation,
  resolveLegacyRedirect,
  siteRoutes,
} from './content/site-ia.js';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;');
}

export function renderPrimaryNavigation(): string {
  return primaryNavigation
    .map((id) => siteRoutes.find((route) => route.id === id))
    .filter((route) => route !== undefined)
    .map(
      (route) =>
        `<a href="${escapeHtml(route.canonicalUrl)}">${escapeHtml(route.title)}</a>`,
    )
    .join('');
}

function renderBlock(block: ContentBlock): string {
  switch (block.kind) {
    case 'paragraph':
      return `<p>${escapeHtml(block.text)}</p>`;
    case 'quote':
      return `<blockquote>${escapeHtml(block.text)}</blockquote>`;
    case 'notice':
      return `<p class="canon-reconciliation">${escapeHtml(block.text)}</p>`;
    case 'list':
      return `<section class="content-list">${block.title ? `<h2>${escapeHtml(block.title)}</h2>` : ''}<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`;
    case 'stats':
      return `<div class="canon-stats">${block.items.map((item) => `<article><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></article>`).join('')}</div>`;
    case 'axes':
      return `<div class="principle-grid">${block.items.map((item) => `<article class="principle-card principle-card--${escapeHtml(item.id)}"><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.meaning)}</p><blockquote>${escapeHtml(item.question)}</blockquote></article>`).join('')}</div>`;
  }
}

function renderCurriculumGroups(groups: readonly CanonCurriculumGroup[]): string {
  return `<section class="canon-curriculum" aria-label="Currículo TAIJIFU">${groups
    .map(
      (group) => `<details class="canon-curriculum__group">
        <summary>${escapeHtml(group.title)}</summary>
        ${group.summary ? `<p>${escapeHtml(group.summary)}</p>` : ''}
        <div class="canon-curriculum__items">${group.items
          .map((item) =>
            item.details.length > 0
              ? `<details class="canon-curriculum__item"><summary>${escapeHtml(item.title)}</summary><p>${escapeHtml(item.summary)}</p><ul>${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul></details>`
              : `<article class="canon-curriculum__item"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></article>`,
          )
          .join('')}</div>
      </details>`,
    )
    .join('')}</section>`;
}

export function renderSemanticRoute(pathname: string): string | null {
  const route = findSiteRoute(pathname);
  if (!route || route.id === 'home') return null;

  const content = getOfficialPageContent(route.id);
  const curriculumGroups =
    route.id === 'metodo'
      ? canonMethodGroups
      : route.id === 'graduacao'
        ? canonGraduationGroups
        : null;
  const blocks =
    content?.blocks.filter(
      (block) =>
        !(
          curriculumGroups &&
          block.kind === 'notice' &&
          block.text.includes('ainda não recuperado')
        ),
    ) ?? [];
  const body = content
    ? `<p class="content-lead">${escapeHtml(content.lead)}</p>${blocks.map(renderBlock).join('')}${curriculumGroups ? renderCurriculumGroups(curriculumGroups) : ''}<p class="content-source">Fonte de autoridade: ${escapeHtml(curriculumGroups ? 'TAIJIFU-CANON-1.0 snapshot' : content.sourceAuthority)}</p>`
    : '<p class="canon-reconciliation">O corpo oficial desta seção está em reconciliação a partir do TAIJIFU CANON. A rota é canônica e já está preservada.</p>';

  return `<section class="content-page" aria-labelledby="page-title">
    <header class="content-page__header">
      <p class="content-entry__type">${escapeHtml(content?.eyebrow ?? 'TAIJIFU')}</p>
      <h1 id="page-title">${escapeHtml(route.title)}</h1>
    </header>
    <div class="content-page__body">
      ${body}
      <nav class="content-navigation" aria-label="Navegação TAIJIFU">${renderPrimaryNavigation()}</nav>
    </div>
  </section>`;
}

export function renderInteractiveLegend(): string {
  return canonToExperienceNodes()
    .map(
      (node) =>
        `<a data-node-id="${escapeHtml(node.id)}" href="${escapeHtml(node.canonicalUrl)}">${escapeHtml(node.label)}</a>`,
    )
    .join('');
}

export function canonicalRedirectFor(pathname: string): string | null {
  return resolveLegacyRedirect(pathname);
}
