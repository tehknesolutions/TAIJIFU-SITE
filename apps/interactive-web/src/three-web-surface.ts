import type { Camera, Object3D, Scene } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import {
  handleCanonicalPointerNavigation,
  normalizePointer,
  type PointerCoordinates,
} from './browser-pointer-navigation.js';
import {
  applyProjectedFocus,
  describeProjectedFocus,
  type ProjectedFocus,
} from './three-focus.js';
import { pickProjectedNode } from './three-raycast-navigation.js';
import { createThreeRendererAdapter } from './three-renderer-adapter.js';

export type WebSurfaceCanvas = {
  getBoundingClientRect(): { left: number; top: number; width: number; height: number };
  addEventListener(
    type: 'pointerup' | 'pointermove' | 'pointerleave',
    listener: (event: PointerCoordinates) => void,
  ): void;
  removeEventListener(
    type: 'pointerup' | 'pointermove' | 'pointerleave',
    listener: (event: PointerCoordinates) => void,
  ): void;
};

export type WebSurfaceRenderer = {
  render(scene: Scene, camera: Camera): void;
  dispose(): void;
};

export function mountThreeWebSurface(options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  renderer: WebSurfaceRenderer;
  reducedMotion?: boolean;
  onFocus?: (focus: ProjectedFocus | null) => void;
}) {
  const projection = createThreeRendererAdapter().render(options.frame);
  const bounds = options.canvas.getBoundingClientRect();

  if (bounds.width > 0 && bounds.height > 0) {
    projection.camera.aspect = bounds.width / bounds.height;
    projection.camera.updateProjectionMatrix();
  }

  projection.scene.updateMatrixWorld(true);
  projection.camera.updateMatrixWorld(true);
  options.renderer.render(projection.scene, projection.camera);

  let focusedNode: Object3D | null = null;

  const renderFocusedState = (nextFocus: Object3D | null) => {
    if (focusedNode === nextFocus) return;
    focusedNode = nextFocus;
    applyProjectedFocus(
      projection.nodes,
      focusedNode,
      projection.camera,
      options.reducedMotion ?? false,
    );
    projection.scene.updateMatrixWorld(true);
    options.renderer.render(projection.scene, projection.camera);
    options.onFocus?.(describeProjectedFocus(focusedNode));
  };

  const onPointerMove = (event: PointerCoordinates) => {
    const normalized = normalizePointer(
      event,
      options.canvas.getBoundingClientRect(),
    );
    const hit = normalized
      ? pickProjectedNode(normalized, projection.camera, projection.nodes)
      : null;
    renderFocusedState(hit);
  };

  const onPointerLeave = () => {
    renderFocusedState(null);
  };

  const onPointerUp = (event: PointerCoordinates) => {
    handleCanonicalPointerNavigation(
      event,
      options.canvas.getBoundingClientRect(),
      projection.camera,
      projection.nodes,
      options.navigate,
    );
  };

  options.canvas.addEventListener('pointermove', onPointerMove);
  options.canvas.addEventListener('pointerleave', onPointerLeave);
  options.canvas.addEventListener('pointerup', onPointerUp);

  return Object.freeze({
    canvas: options.canvas,
    projection,
    dispose() {
      options.canvas.removeEventListener('pointermove', onPointerMove);
      options.canvas.removeEventListener('pointerleave', onPointerLeave);
      options.canvas.removeEventListener('pointerup', onPointerUp);
      options.renderer.dispose();
    },
  });
}
