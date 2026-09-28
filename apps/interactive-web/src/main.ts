import { bootstrapInteractiveWeb } from './browser-bootstrap.js';
import {
  canonicalRedirectFor,
  renderPrimaryNavigation,
  renderSemanticRoute,
} from './semantic-site.js';

const primaryNavigation =
  document.querySelector<HTMLElement>('#primary-navigation');
if (primaryNavigation) {
  primaryNavigation.innerHTML = renderPrimaryNavigation();
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

  if (canvas) {
    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate: (canonicalUrl) => window.location.assign(canonicalUrl),
      onFocus: (focus) => {
        if (focusLabel) {
          focusLabel.value = focus?.label ?? 'TAIJIFU';
        }
      },
    });

    window.addEventListener('pagehide', () => runtime.dispose(), { once: true });
  }
}
