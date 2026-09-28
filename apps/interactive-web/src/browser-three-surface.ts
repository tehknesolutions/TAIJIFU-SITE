import { WebGLRenderer } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import { mountThreeWebSurface, type WebSurfaceCanvas } from './three-web-surface.js';

type SizedRenderer = {
  render: WebGLRenderer['render'];
  dispose(): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
};

export function mountBrowserThreeSurface(options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  createRenderer?: (canvas: WebSurfaceCanvas) => SizedRenderer;
}) {
  const createRenderer = options.createRenderer ?? ((canvas) => new WebGLRenderer({ canvas: canvas as HTMLCanvasElement, antialias: true }));
  const renderer = createRenderer(options.canvas);
  const bounds = options.canvas.getBoundingClientRect();
  renderer.setSize(bounds.width, bounds.height, false);
  return mountThreeWebSurface({ canvas: options.canvas, frame: options.frame, navigate: options.navigate, renderer });
}