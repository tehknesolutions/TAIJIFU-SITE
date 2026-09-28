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

function navigationHtml(): string {
  return primaryNavigation
    .map((id) => siteRoutes.find((route) => route.id === id))
    .filter((route) => route !== undefined)
    .map(
      (route) =>
        `<a href="${escapeHtml(route.canonicalUrl)}">${escapeHtml(route.title)}</a>`,
    )
    .join('');
}

export function renderSemanticRoute(pathname: string): string | null {
  const route = findSiteRoute(pathname);
  if (!route || route.id === 'home') return null;

  return `<section class="content-page" aria-labelledby="page-title">
    <header class="content-page__header">
      <p class="content-entry__type">TAIJIFU</p>
      <h1 id="page-title">${escapeHtml(route.title)}</h1>
    </header>
    <div class="content-page__body">
      <p class="canon-reconciliation">O corpo oficial desta seção está em reconciliação a partir do TAIJIFU CANON. A rota é canônica e já está preservada.</p>
      <nav class="content-navigation" aria-label="Navegação TAIJIFU">${navigationHtml()}</nav>
    </div>
  </section>`;
}

export function canonicalRedirectFor(pathname: string): string | null {
  return resolveLegacyRedirect(pathname);
}
