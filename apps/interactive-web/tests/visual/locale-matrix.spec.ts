import { test, expect } from '@playwright/test';
import { visualRegressionMatrix } from '../../src/visual-regression-contract.js';

for (const scenario of visualRegressionMatrix) {
  test.describe(scenario.locale + ' / ' + scenario.id, () => {
    test('matches approved visual contract', async ({ page }) => {
      await page.goto(scenario.route, { waitUntil: 'networkidle' });
      await expect(page.locator('#main')).toHaveScreenshot(
        scenario.locale.toLowerCase() + '-' + scenario.id + '.png',
        { animations: 'disabled' },
      );
    });
  });
}
