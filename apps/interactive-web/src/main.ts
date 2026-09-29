import { bootstrapInteractiveWeb } from './browser-bootstrap.js';
import {
  canonicalRedirectFor,
  renderInteractiveLegend,
  renderPrimaryNavigation,
  renderSemanticRoute,
} from './semantic-site.js';
import { findSiteRoute } from './content/site-ia.js';

const primaryNavigation =
  document.querySelector<HTMLElement>('#primary-navigation');
if (primaryNavigation) {
  primaryNavigation.innerHTML = renderPrimaryNavigation();
}

const interactiveLegend =
  document.querySelector<HTMLElement>('#interactive-node-links');
if (interactiveLegend) {
  interactiveLegend.innerHTML = renderInteractiveLegend();
}

const redirect = canonicalRedirectFor(window.location.pathname);
if (redirect && redirect !== window.location.pathname) {
  window.location.replace(redirect);
} else {
  const semanticRoute = renderSemanticRoute(window.location.pathname);
  const semanticContent =
    document.querySelector<HTMLElement>('#semantic-content');

  if (semanticRoute && semanticContent) {
    semanticContent.innerHTML = semanticRoute;
  }

  const canvas = document.querySelector<HTMLCanvasElement>('#taijifu-experience');
  const focusLabel =
    document.querySelector<HTMLOutputElement>('#interactive-focus-label');
  const legendLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      '#interactive-node-links [data-node-id]',
    ),
  );

  const syncLegendFocus = (nodeId: string | null) => {
    for (const link of legendLinks) {
      link.classList.toggle('is-focused', link.dataset.nodeId === nodeId);
    }
  };

  if (canvas) {
    const currentRoute = findSiteRoute(window.location.pathname);
    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate: (canonicalUrl) => window.location.assign(canonicalUrl),
      initialFocusNode: currentRoute?.id ?? null,
      onFocus: (focus) => {
        if (focusLabel) {
          focusLabel.value = focus?.label ?? 'TAIJIFU';
        }
        syncLegendFocus(focus?.nodeId ?? null);
      },
    });
 

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
