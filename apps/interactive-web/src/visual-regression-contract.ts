export type VisualRegressionLocale = 'pt-BR' | 'en' | 'es';

export type VisualRegressionScenario = Readonly<{
  id: 'desktop' | 'tablet' | 'mobile' | 'reduced-motion' | 'no-media';
  locale: VisualRegressionLocale;
  route: string;
  viewport: Readonly<{ width: number; height: number }>;
  reducedMotion: boolean;
  mediaState: 'asset' | 'fallback';
  invariant: string;
}>;

export const visualRegressionMatrix: readonly VisualRegressionScenario[] = Object.freeze([
  scenario('desktop', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, false, 'fallback', 'Full Dojo, identity, Canon UI and navigation remain legible.'),
  scenario('desktop', 'en', '/en/manifesto/', 1440, 1024, false, 'fallback', 'English route, shell and localized navigation remain legible.'),
  scenario('desktop', 'es', '/es/manifesto/', 1440, 1024, false, 'fallback', 'Spanish route, shell and localized navigation remain legible.'),
  scenario('tablet', 'pt-BR', '/pt-br/manifesto/', 1024, 1366, false, 'fallback', 'Layout reflows without changing authority or navigation semantics.'),
  scenario('mobile', 'pt-BR', '/pt-br/manifesto/', 390, 844, false, 'fallback', 'Compact composition preserves content and critical touch targets.'),
  scenario('reduced-motion', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, true, 'fallback', 'Navigation and focus remain complete without motion dependency.'),
  scenario('no-media', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, false, 'fallback', 'Dojo remains intentional using deterministic CSS and identity assets only.'),
]);

function scenario(
  id: VisualRegressionScenario['id'],
  locale: VisualRegressionLocale,
  route: string,
  width: number,
  height: number,
  reducedMotion: boolean,
  mediaState: VisualRegressionScenario['mediaState'],
  invariant: string,
): VisualRegressionScenario {
  return Object.freeze({
    id, locale, route,
    viewport: Object.freeze({ width, height }),
    reducedMotion, mediaState, invariant,
  });
}
