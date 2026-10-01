import { bootstrapInteractiveWeb } from './browser-bootstrap.js';
import { renderInteractiveLegend, renderPrimaryNavigation, renderSemanticRoute } from './semantic-site.js';
import { buildLocalizedExperienceNodes, canonToExperienceNodes } from './content/canon-registry.js';
import { renderInternationalEntry, renderLanguageSelector } from './content/international-entry.js';
import { legacyRedirectFor, resolveLocalizedPath } from './content/locale-routing.js';
import { applyShellLocalization } from './content/shell-localization.js';
import { findSiteRoute } from './content/site-ia.js';
import { renderCanonUIForLocale } from './content/canon-ui-render.js';
import { renderLocalizedSeoHead } from './content/seo-localization.js';
import { resolvePresentationMedia } from './media-runtime.js';
import { buildExperienceHierarchy, visibleExperienceNodes } from './spatial-ui.js';
import { wireHomeDojoLinks } from './home-dojo-wiring.js';
import { applyInteractiveSurfaceState } from './interactive-surface-state.js';

const pathname = window.location.pathname;
const redirect = legacyRedirectFor(pathname);
if (redirect) {
  window.location.replace(redirect);
} else {
  const routeResolution = resolveLocalizedPath(pathname);
  const semanticContent = document.querySelector<HTMLElement>('#semantic-content');

  if (routeResolution.kind === 'international-entry') {
    document.documentElement.lang = 'en';
    if (semanticContent) semanticContent.innerHTML = renderInternationalEntry();
  } else if (routeResolution.kind === 'localized-route') {
    document.documentElement.lang = routeResolution.locale;
    applyShellLocalization(document, routeResolution.locale);
    const seoHead = document.head;
    seoHead.querySelectorAll('link[data-taijifu-i18n-seo]').forEach((node) => node.remove());
    const seoMarkup = renderLocalizedSeoHead(routeResolution.routeId, routeResolution.locale);
    if (seoMarkup) {
      const template = document.createElement('template');
      template.innerHTML = seoMarkup;
      template.content.querySelectorAll('link').forEach((link) => {
        link.dataset.taijifuI18nSeo = 'true';
        seoHead.appendChild(link);
      });
    }
    const semanticRoute = renderSemanticRoute(pathname);
    if (semanticRoute && semanticContent) {
      semanticContent.innerHTML = renderLanguageSelector(routeResolution.routeId, routeResolution.locale) + semanticRoute;
    }
  }

  const activeLocale = routeResolution.kind === 'localized-route' ? routeResolution.locale : 'pt-BR';
  wireHomeDojoLinks(document.querySelectorAll<HTMLAnchorElement>('[data-route-id]'), activeLocale);

  const primaryNavigation = document.querySelector<HTMLElement>('#primary-navigation');
  if (primaryNavigation) primaryNavigation.innerHTML = renderPrimaryNavigation();

  const interactiveLegend = document.querySelector<HTMLElement>('#interactive-node-links');
  if (interactiveLegend) interactiveLegend.innerHTML = renderInteractiveLegend(activeLocale);

  const canonCurriculum = document.querySelector<HTMLElement>('#canon-curriculum');
  if (canonCurriculum) canonCurriculum.innerHTML = renderCanonUIForLocale(activeLocale);

  const dojoMedia = document.querySelector<HTMLElement>('.dojo-gate__media');
  if (dojoMedia) {
    const media = resolvePresentationMedia('r01-dojo-environment');
    dojoMedia.dataset.mediaState = media.state;
    if (media.url) dojoMedia.style.setProperty('--tj-presentation-media-url', 'url("' + media.url + '")');
  }

  const canvas = document.querySelector<HTMLCanvasElement>('#taijifu-experience');
  const focusLabel = document.querySelector<HTMLOutputElement>('#interactive-focus-label');
  const legendLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('#interactive-node-links [data-node-id]'));
  const experienceHierarchy = buildExperienceHierarchy(buildLocalizedExperienceNodes(activeLocale));

  const syncLegend = (focusId: string | null) => {
    const visibleIds = new Set(visibleExperienceNodes(experienceHierarchy, focusId).map((node) => node.id));
    for (const link of legendLinks) {
      const visible = visibleIds.has(link.dataset.nodeId ?? '');
      link.hidden = !visible;
      link.setAttribute('aria-hidden', String(!visible));
      link.tabIndex = visible ? 0 : -1;
    }
  };

  const syncLegendFocus = (nodeId: string | null) => {
    for (const link of legendLinks) link.classList.toggle('is-focused', link.dataset.nodeId === nodeId);
    syncLegend(nodeId);
  };

  syncLegend(null);

  if (canvas) {
    const currentRoute = routeResolution.kind === 'localized-route' ? findSiteRoute(pathname) : null;
    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate: (canonicalUrl) => window.location.assign(canonicalUrl),
      initialFocusNode: currentRoute?.id ?? null,
      onFocus: (focus) => {
        if (focusLabel) focusLabel.value = focus?.label ?? 'TAIJIFU';
        syncLegendFocus(focus?.nodeId ?? null);
      },
    });

    const interactiveExperience = document.querySelector<HTMLElement>('#interactive-experience');
    const surfaceStatus = document.querySelector<HTMLElement>('#interactive-surface-status');
    if (interactiveExperience && surfaceStatus) {
      applyInteractiveSurfaceState(interactiveExperience, surfaceStatus, runtime.surfaceAvailable);
    }

    const dojoEntryLinks = document.querySelectorAll<HTMLAnchorElement>('[href="#interactive-experience"]');
    for (const link of dojoEntryLinks) {
      link.addEventListener('click', () => {
        runtime.focusNode('taijifu');
        interactiveExperience?.focus({ preventScroll: true });
      });
    }

    for (const link of legendLinks) {
      const nodeId = link.dataset.nodeId ?? null;
      const focus = () => runtime.focusNode(nodeId);
      const blur = () => runtime.focusNode(null);
      link.addEventListener('pointerenter', focus);
      link.addEventListener('pointerleave', blur);
      link.addEventListener('focus', focus);
      link.addEventListener('blur', blur);
    }

    window.addEventListener('pagehide', () => runtime.dispose(), { once: true });
  }
}
