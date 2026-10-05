export type VisualRegressionLocale = 'pt-BR' | 'en' | 'es';

export type VisualRegressionScenario = Readonly<{
  id: 'desktop' | 'tablet' | 'mobile' | 'reduced-motion' | 'no-media';
  locale: VisualRegressionLocale;
  route: string;
  viewport: Readonly<{ width: number; height: number }>;
  reducedMotion: boolean;
  mediaState: 'asset' | 'fallback';
  invariant: string;
  baseline: 'approved' | 'pending';
}>;

export const visualRegressionMatrix: readonly VisualRegressionScenario[] = Object.freeze([
  scenario('desktop', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, false, 'fallback', 'Full Dojo, identity, Canon UI and navigation remain legible.', 'approved'),
  scenario('desktop', 'en', '/en/manifesto/', 1440, 1024, false, 'fallback', 'English route, shell and localized navigation remain legible.', 'approved'),
  scenario('desktop', 'es', '/es/manifesto/', 1440, 1024, false, 'fallback', 'Spanish route, shell and localized navigation remain legible.', 'approved'),
  scenario('tablet', 'pt-BR', '/pt-br/manifesto/', 1024, 1366, false, 'fallback', 'Layout reflows without changing authority or navigation semantics.', 'approved'),
  scenario('mobile', 'pt-BR', '/pt-br/manifesto/', 390, 844, false, 'fallback', 'Compact composition preserves content and critical touch targets.', 'approved'),
  scenario('reduced-motion', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, true, 'fallback', 'Navigation and focus remain complete without motion dependency.', 'approved'),
  scenario('no-media', 'pt-BR', '/pt-br/manifesto/', 1440, 1024, false, 'fallback', 'Dojo remains intentional using deterministic CSS and identity assets only.', 'approved'),
  scenario('tablet', 'en', '/en/manifesto/', 1024, 1366, false, 'fallback', 'English tablet reflow preserves route and navigation semantics.', 'pending'),
]);

scenario('tablet', 'en', '/en/manifesto/', 1024, 1366, false, 'fallback', 'English tablet reflow preserves route and navigation semantics.', 'pending'),
  scenario('mobile', 'en', '/en/manifesto/', 390, 844, false, 'fallback', 'English mobile preserves content and critical touch targets.', 'pending'),
  scenario('reduced-motion', 'en', '/en/manifesto/', 1440, 1024, true, 'fallback', 'English navigation remains complete without motion dependency.', 'pending'),
  scenario('no-media', 'en', '/en/manifesto/', 1440, 1024, false, 'fallback', 'English no-media mode remains intentional.', 'pending'),
  scenario('tablet', 'es', '/es/manifesto/', 1024, 1366, false, 'fallback', 'Spanish tablet reflow preserves route and navigation semantics.', 'pending'),
  scenario('mobile', 'es', '/es/manifesto/', 390, 844, false, 'fallback', 'Spanish mobile preserves content and critical touch targets.', 'pending'),
  scenario('reduced-motion', 'es', '/es/manifesto/', 1440, 1024, true, 'fallback', 'Spanish navigation remains complete without motion dependency.', 'pending'),
  scenario('no-media', 'es', '/es/manifesto/', 1440, 1024, false, 'fallback', 'Spanish no-media mode remains intentional.', 'pending'),
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
  baseline: VisualRegressionScenario['baseline'],
): VisualRegressionScenario {
  return Object.freeze({
    id, locale, route,
    viewport: Object.freeze({ width, height }),
    reducedMotion, mediaState, invariant, baseline,
  });
}
