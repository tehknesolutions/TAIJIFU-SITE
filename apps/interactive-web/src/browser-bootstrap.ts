import { mountBrowserThreeSurface } from './browser-three-surface.js';
import { createInteractiveWebExperience } from './experience.js';
import type { RenderFrame } from './renderer-adapter.js';
import type { WebSurfaceCanvas } from './three-web-surface.js';

type MountedSurface = Readonly<{ dispose(): void }>;

type MountSurface = (options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
}) => MountedSurface;

export function bootstrapInteractiveWeb(options: {
  canvas: WebSurfaceCanvas;
  navigate: (url: string) => void;
  mountSurface?: MountSurface;
}) {
  const experience = createInteractiveWebExperience({
    nodes: [
      {
        id: 'tai',
        label: 'TAI',
        canonicalUrl: '/principios/tai/',
      },
    ],
  });

  const mountSurface = options.mountSurface ?? mountBrowserThreeSurface;
  const surface = mountSurface({
    canvas: options.canvas,
    frame: experience.frame,
    navigate: options.navigate,
  });

  return Object.freeze({
    experience,
    dispose: () => surface.dispose(),
  });
}
