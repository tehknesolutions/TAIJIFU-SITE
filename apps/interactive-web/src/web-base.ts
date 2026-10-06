export type WebDeploymentTarget = 'root' | 'github-pages';

export function resolveWebBase(target: WebDeploymentTarget = 'root'): string {
  return target === 'github-pages' ? '/TAIJIFU-SITE/' : '/';
}
