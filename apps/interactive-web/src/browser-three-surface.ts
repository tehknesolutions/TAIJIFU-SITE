import { WebGLRenderer } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import type { ProjectedFocus } from './three-focus.js';
import { createDojoFpsBrowserInput } from './dojo-fps-browser-input.js';
import { mountThreeWebSurface, type WebSurfaceCanvas } from './three-web-surface.js';

type SizedRenderer = { render: WebGLRenderer['render']; dispose(): void; setSize(width: number, height: number, updateStyle?: boolean): void };

type BrowserCanvas = WebSurfaceCanvas & HTMLCanvasElement;

export function mountBrowserThreeSurface(options: { canvas: WebSurfaceCanvas; frame: RenderFrame; navigate: (url: string) => void; onFocus?: (focus: ProjectedFocus | null) => void; reducedMotion?: boolean; createRenderer?: (canvas: WebSurfaceCanvas) => SizedRenderer }) {
  const createRenderer = options.createRenderer ?? ((canvas) => new WebGLRenderer({ canvas: canvas as HTMLCanvasElement, antialias: true, alpha: false }));
  const renderer = createRenderer(options.canvas);
  const bounds = options.canvas.getBoundingClientRect();
  renderer.setSize(bounds.width, bounds.height, false);
  const reducedMotion = options.reducedMotion ?? (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true);
  const surface = mountThreeWebSurface({ canvas: options.canvas, frame: options.frame, navigate: options.navigate, renderer, reducedMotion, onFocus: options.onFocus });

  if (typeof window === 'undefined' || typeof document === 'undefined') return surface;
  const canvas = options.canvas as BrowserCanvas;
  const input = createDojoFpsBrowserInput();
  let frameId = 0;
  let previous = performance.now();
  const onKeyDown = (event: KeyboardEvent) => { if (event.code.startsWith('Key') || event.code.startsWith('Arrow')) input.key(event.code, true); };
  const onKeyUp = (event: KeyboardEvent) => input.key(event.code, false);
  const onMouseMove = (event: MouseEvent) => { if (document.pointerLockElement === canvas) input.look(event.movementX, event.movementY); };
  const onClick = () => { if (document.pointerLockElement !== canvas) canvas.requestPointerLock?.(); };
  const onBlur = () => input.reset();
  const tick = (now: number) => { const delta = Math.min((now - previous) / 1000, 0.05); previous = now; surface.stepFps(input.snapshot(), delta); frameId = window.requestAnimationFrame(tick); };
  window.addEventListener('keydown', onKeyDown); window.addEventListener('keyup', onKeyUp); window.addEventListener('blur', onBlur); document.addEventListener('mousemove', onMouseMove); canvas.addEventListener('click', onClick); frameId = window.requestAnimationFrame(tick);

  return Object.freeze({ ...surface, dispose() { window.cancelAnimationFrame(frameId); window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp); window.removeEventListener('blur', onBlur); document.removeEventListener('mousemove', onMouseMove); canvas.removeEventListener('click', onClick); input.reset(); surface.dispose(); } });
}
