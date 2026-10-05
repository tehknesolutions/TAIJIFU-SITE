import { mountBrowserThreeSurface } from './browser-three-surface.js';
import { buildLocalizedExperienceNodes } from './content/canon-registry.js';
import type { SupportedLocale } from './content/locale.js';
import { createInteractiveWebExperience } from './experience.js';
import type { RenderFrame } from './renderer-adapter.js';
import type { ProjectedFocus } from './three-focus.js';
import type { WebSurfaceCanvas } from './three-web-surface.js';
import { mountTrainingExperience } from './training/training-browser.js';

type MountedSurface = Readonly<{
  focusNode(nodeId: string | null): void;
  dispose(): void;
}>;

type MountedTraining = Readonly<{
  getState(): unknown;
  dispose(): void;
}>;

type MountSurface = (options: {
  canvas: WebSurfaceCanvas;
  frame: RenderFrame;
  navigate: (url: string) => void;
  onFocus?: (focus: ProjectedFocus | null) => void;
}) => MountedSurface;

type MountTraining = (root: HTMLElement) => MountedTraining;

const unavailableSurface: MountedSurface = Object.freeze({
  focusNode: () => undefined,
  dispose: () => undefined,
});

export function bootstrapInteractiveWeb(options: {
  locale?: SupportedLocale;
  canvas: WebSurfaceCanvas;
  navigate: (url: string) => void;
  onFocus?: (focus: ProjectedFocus | null) => void;
  initialFocusNode?: string | null;
  presentationMediaId?: string;
  mountSurface?: MountSurface;
  trainingRoot?: HTMLElement | null;
  mountTraining?: MountTraining;
}) {
  const experience = createInteractiveWebExperience({
    nodes: buildLocalizedExperienceNodes(options.locale ?? 'pt-BR'),
    presentationMediaId: options.presentationMediaId ?? 'r01-dojo-environment',
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

  const trainingRoot = options.trainingRoot ?? null;
  const mountTraining = options.mountTraining ?? mountTrainingExperience;
  let training: MountedTraining | null = null;

  if (trainingRoot) {
    try {
      training = mountTraining(trainingRoot);
    } catch {
      training = null;
    }
  }

  return Object.freeze({
    experience,
    surfaceAvailable,
    trainingAvailable: training !== null,
    focusNode: (nodeId: string | null) => surface.focusNode(nodeId),
    dispose: () => {
      training?.dispose();
      surface.dispose();
    },
  });
}
