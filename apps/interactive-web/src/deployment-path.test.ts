import { describe, expect, it } from 'vitest';
import { withDeploymentBase } from './deployment-path.js';

describe('deployment navigation paths', () => {
  it('preserves root deployments', () => {
    expect(withDeploymentBase('/pt-br/dojo/', '/')).toBe('/pt-br/dojo/');
  });

  it('prefixes GitHub Pages paths exactly once', () => {
    expect(withDeploymentBase('/pt-br/dojo/', '/TAIJIFU-SITE/')).toBe('/TAIJIFU-SITE/pt-br/dojo/');
    expect(withDeploymentBase('/TAIJIFU-SITE/pt-br/dojo/', '/TAIJIFU-SITE/')).toBe('/TAIJIFU-SITE/pt-br/dojo/');
  });

  it('does not rewrite external, fragment, or protocol-relative URLs', () => {
    expect(withDeploymentBase('https://example.org/', '/TAIJIFU-SITE/')).toBe('https://example.org/');
    expect(withDeploymentBase('#dojo', '/TAIJIFU-SITE/')).toBe('#dojo');
    expect(withDeploymentBase('//example.org/path', '/TAIJIFU-SITE/')).toBe('//example.org/path');
  });
});
