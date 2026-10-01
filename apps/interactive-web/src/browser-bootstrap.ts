import { mountBrowserThreeSurface } from './browser-three-surface.js';
import { canonToExperienceNodes } from './content/canon-registry.js';
import { createInteractiveWebExperience } from './experience.js';
import type { RenderFrame } from './renderer-adapter.js';
import type { ProjectedFocus } from './three-focus.js';
import type { WebSurfaceCanvas } from './three-web-surface.js';

type MountedSurface = Readonly<{
  focusNode(nodeId: string | null): void;
  dispose(): void;
}>;

type MountSurface = (options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  onFocus?: (focus: ProjectedFocus | null) => void;
}) => MountedSurface;

const unavailableSurface: MountedSurface = Object.freeze({
  focusNode: () => undefined,
  dispose: () => undefined,
});

export function bootstrapInteractiveWeb(options: {
  canvas: WebSurfaceCanvas;
  navigate: (url: string) => void;
  onFocus?: (focus: ProjectedFocus | null) => void;
  initialFocusNode?: string | null;
  mountSurface?: MountSurface;
}) {
  const experience = createInteractiveWebExperience({
    nodes: canonToExperienceNodes(),
  });

  const mountSurface = options.mountSurface ?? mountBrowserThreeSurface;
  let surface: MountedSurface;
  let surfaceAvailable = true;

  try {
    surface = mountSurface({
      canvas: options.canvas,
      frame: experience.frame,
      navigate: options.navigate,
      onFocus: options.onFocus,
    });
  } catch {
    surface = unavailableSurface;
    surfaceAvailable = false;
  }

  if (options.initialFocusNode) {
    surface.focusNode(options.initialFocusNode);
  }

  return Object.freeze({
    experience,
    surfaceAvailable,
    focusNode: (nodeId: string | null) => surface.focusNode(nodeId),
    dispose: () => surface.dispose(),
  });
}
