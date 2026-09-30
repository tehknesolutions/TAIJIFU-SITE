import { test, expect } from '@playwright/test';
import { visualRegressionMatrix } from '../../src/visual-regression-contract.js';

for (const scenario of visualRegressionMatrix) {
  test.describe(scenario.locale + ' / ' + scenario.id, () => {
    test('matches approved visual contract', async ({ page }) => {
      await page.setViewportSize(scenario.viewport);
      await page.emulateMedia({ reducedMotion: scenario.reducedMotion ? 'reduce' : 'no-preference' });
      await page.goto(scenario.route, { waitUntil: 'networkidle' });
      await expect(page.locator('#main')).toHaveScreenshot(
        scenario.locale + '-' + scenario.id + '.png',
        { animations: 'disabled' },
      );
    });
  });
}
