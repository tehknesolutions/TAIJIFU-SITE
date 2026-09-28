import { WebGLRenderer } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import type { ProjectedFocus } from './three-focus.js';
import {
  mountThreeWebSurface,
  type WebSurfaceCanvas,
} from './three-web-surface.js';

type SizedRenderer = {
  render: WebGLRenderer['render'];
  dispose(): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
};

export function mountBrowserThreeSurface(options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  onFocus?: (focus: ProjectedFocus | null) => void;
  reducedMotion?: boolean;
  createRenderer?: (canvas: WebSurfaceCanvas) => SizedRenderer;
}) {
  const createRenderer =
    options.createRenderer ??
    ((canvas) =>
      new WebGLRenderer({
        canvas: canvas as HTMLCanvasElement,
        antialias: true,
        alpha: false,
      }));

  const renderer = createRenderer(options.canvas);
  const bounds = options.canvas.getBoundingClientRect();
  renderer.setSize(bounds.width, bounds.height, false);

  const reducedMotion =
    options.reducedMotion ??
    (typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true);

  return mountThreeWebSurface({
    canvas: options.canvas,
    frame: options.frame,
    navigate: options.navigate,
    renderer,
    reducedMotion,
    onFocus: options.onFocus,
  });
}
