import type { Camera, Object3D, Scene } from 'three';
import type { RenderFrame } from './renderer-adapter.js';
import {
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

export type DojoTransition = ProjectedFocus & Readonly<{
  phase: 'preview' | 'commit';
}>;

export function mountThreeWebSurface(options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  renderer: WebSurfaceRenderer;
  reducedMotion?: boolean;
  onFocus?: (focus: ProjectedFocus | null) => void;
  onTransition?: (transition: DojoTransition) => void;
  transitionDurationMs?: number;
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
  let navigationTimer: ReturnType<typeof setTimeout> | null = null;

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
    const normalized = normalizePointer(
      event,
      options.canvas.getBoundingClientRect(),
    );
    const selected = normalized
      ? pickProjectedNode(normalized, projection.camera, projection.nodes)
      : null;
    const destination = describeProjectedFocus(selected);

    if (!selected || !destination) return;

    renderFocusedState(selected);

    if (options.reducedMotion) {
      options.onTransition?.({ ...destination, phase: 'commit' });
      options.navigate(destination.canonicalUrl);
      return;
    }

    projection.camera.position.z = 7.35;
    projection.camera.lookAt(
      selected.position.x * 0.32,
      selected.position.y * 0.32,
      0,
    );
    projection.camera.updateMatrixWorld(true);
    projection.scene.updateMatrixWorld(true);
    options.renderer.render(projection.scene, projection.camera);
    options.onTransition?.({ ...destination, phase: 'preview' });

    if (navigationTimer) clearTimeout(navigationTimer);
    navigationTimer = setTimeout(() => {
      options.onTransition?.({ ...destination, phase: 'commit' });
      options.navigate(destination.canonicalUrl);
    }, options.transitionDurationMs ?? 220);
  };

  options.canvas.addEventListener('pointermove', onPointerMove);
  options.canvas.addEventListener('pointerleave', onPointerLeave);
  options.canvas.addEventListener('pointerup', onPointerUp);

  return Object.freeze({
    canvas: options.canvas,
    projection,
    focusNode(nodeId: string | null) {
      const node =
        nodeId === null
          ? null
          : projection.nodes.find(
              (candidate) => candidate.userData.nodeId === nodeId,
            ) ?? null;
      renderFocusedState(node);
    },
    dispose() {
      if (navigationTimer) clearTimeout(navigationTimer);
      options.canvas.removeEventListener('pointermove', onPointerMove);
      options.canvas.removeEventListener('pointerleave', onPointerLeave);
      options.canvas.removeEventListener('pointerup', onPointerUp);
      options.renderer.dispose();
    },
  });
}
