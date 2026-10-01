type SurfaceSection = { dataset: Record<string, string> };
type SurfaceStatus = { textContent: string | null; hidden: boolean };

export function applyInteractiveSurfaceState(
  section: SurfaceSection,
  status: SurfaceStatus,
  surfaceAvailable: boolean,
): void {
  section.dataset.surfaceState = surfaceAvailable ? 'available' : 'unavailable';

  if (surfaceAvailable) {
    status.textContent = '';
    status.hidden = true;
    return;
  }

  status.textContent = 'A visualização espacial não está disponível neste dispositivo. A navegação por links continua disponível.';
  status.hidden = false;
}
