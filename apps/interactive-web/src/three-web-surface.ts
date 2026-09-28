import type { Camera, Object3D, Scene } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import { handleCanonicalPointerNavigation } from './browser-pointer-navigation.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';

export type WebSurfaceCanvas = {
  getBoundingClientRect(): { left: number; top: number; width: number; height: number };
  addEventListener(type: 'pointerup', listener: (event: { clientX: number; clientY: number }) => void): void;
  removeEventListener(type: 'pointerup', listener: (event: { clientX: number; clientY: number }) => void): void;
};
export type WebSurfaceRenderer = { render(scene: Scene, camera: Camera): void; dispose(): void };

export function mountThreeWebSurface(options: {
  canvas: WebSurfaceCanvas; frame: RenderFrame; navigate: (url: string) => void; renderer: WebSurfaceRenderer;
}) {
  const projection = createThreeRendererAdapter().render(options.frame);
  projection.scene.updateMatrixWorld(true);
  projection.camera.updateMatrixWorld(true);
  options.renderer.render(projection.scene, projection.camera);
  const onPointerUp = (event: { clientX: number; clientY: number }) => {
    handleCanonicalPointerNavigation(event, options.canvas.getBoundingClientRect(), projection.camera, projection.nodes as readonly Object3D[], options.navigate);
  };
  options.canvas.addEventListener('pointerup', onPointerUp);
  return Object.freeze({ canvas: options.canvas, projection, dispose() { options.canvas.removeEventListener('pointerup', onPointerUp); options.renderer.dispose(); } });
}