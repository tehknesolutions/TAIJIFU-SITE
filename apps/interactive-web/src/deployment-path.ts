/** Prefix root-relative navigation paths without changing external or already-prefixed URLs. */
export function withDeploymentBase(url: string, base = '/'): string {
  if (!url.startsWith('/') || url.startsWith('//') || base === '/') return url;
  const prefix = base.replace(/\/$/, '');
  return url === prefix || url.startsWith(prefix + '/') ? url : prefix + url;
}
