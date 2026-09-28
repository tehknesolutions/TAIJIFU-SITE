import { bootstrapInteractiveWeb } from './browser-bootstrap.js';
import {
  canonicalRedirectFor,
  renderSemanticRoute,
} from './semantic-site.js';

const redirect = canonicalRedirectFor(window.location.pathname);
if (redirect && redirect !== window.location.pathname) {
  window.location.replace(redirect);
} else {
  const semanticRoute = renderSemanticRoute(window.location.pathname);
  const main = document.querySelector<HTMLElement>('#main');

  if (semanticRoute && main) {
    main.innerHTML = semanticRoute;
  }

  const canvas = document.querySelector<HTMLCanvasElement>('#taijifu-experience');

  if (canvas) {
    const runtime = bootstrapInteractiveWeb({
      canvas,
      navigate: (canonicalUrl) => window.location.assign(canonicalUrl),
    });

    window.addEventListener('pagehide', () => runtime.dispose(), { once: true });
  }
}
