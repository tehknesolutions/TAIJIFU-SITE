import { defineConfig, devices } from '@playwright/test';
import { visualRegressionMatrix } from './src/visual-regression-contract.js';

export default defineConfig({
  testDir: './tests/visual',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
  projects: visualRegressionMatrix.map((scenario) => ({
    name: scenario.locale + '-' + scenario.id,
    use: {
      ...devices['Desktop Chrome'],
      viewport: scenario.viewport,
      reducedMotion: scenario.reducedMotion ? 'reduce' : 'no-preference',
    },
    metadata: {
      route: scenario.route,
      mediaState: scenario.mediaState,
    },
  })),
});
