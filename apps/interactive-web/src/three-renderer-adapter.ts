import type { RenderFrame } from './renderer-adapter.js';
import { createThreeScene, type ThreeSceneProjection } from './three-renderer.js';

export type ThreeRendererAdapter = Readonly<{
  render(frame: RenderFrame): ThreeSceneProjection;
}>;

export function createThreeRendererAdapter(): ThreeRendererAdapter {
  return Object.freeze({
    render(frame) {
      return createThreeScene(frame);
    },
  });
}