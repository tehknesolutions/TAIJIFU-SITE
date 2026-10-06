import { defineConfig } from 'vite';
import { resolveWebBase, type WebDeploymentTarget } from './src/web-base.js';

const deploymentTarget: WebDeploymentTarget = process.env.TAIJIFU_DEPLOY_TARGET === 'github-pages'
  ? 'github-pages'
  : 'root';

export default defineConfig({
  base: resolveWebBase(deploymentTarget),
});
