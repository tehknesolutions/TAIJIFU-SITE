import { bootstrapInteractiveWeb } from './browser-bootstrap.js';

const canvas = document.querySelector<HTMLCanvasElement>('#taijifu-experience');

if (!canvas) {
  throw new Error('TAIJIFU interactive canvas was not found.');
}

const runtime = bootstrapInteractiveWeb({
  canvas,
  navigate: (canonicalUrl) => window.location.assign(canonicalUrl),
});

window.addEventListener('pagehide', () => runtime.dispose(), { once: true });
