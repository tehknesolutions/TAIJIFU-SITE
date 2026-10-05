import type { PresentationMediaOverlaySnapshot } from './presentation-media-overlay.js';

export function applyPresentationStageState(
  stage: HTMLElement | null,
  snapshot: PresentationMediaOverlaySnapshot,
): void {
  if (!stage) return;
  stage.dataset.presentationState = snapshot.status;
}
