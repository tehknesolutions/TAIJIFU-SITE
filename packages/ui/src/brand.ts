import { brandAssets } from './brand-assets.generated.js';

export type BrandSize = 16 | 24 | 32 | 48;
export type StandardBrandSize = 32 | 48;
export type MicroBrandSize = 16 | 24 | 32;
export type BrandClearSpace = 'normal' | 'compact' | 'none';

export interface BrandOptions<S extends BrandSize = BrandSize> {
  size?: S;
  clearSpace?: BrandClearSpace;
  label?: string;
  decorative?: boolean;
  className?: string;
}

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#39;');

function renderBrand(asset: string, options: BrandOptions, defaultLabel: string, variantClass: string): string {
  const size = options.size ?? 48;
  const clearSpace = options.clearSpace ?? 'normal';
  const classes = ['tj-brand', variantClass, `tj-brand-size-${size}`, `tj-brand-clear-${clearSpace}`];
  if (options.className) classes.push(options.className);
  const accessibility = options.decorative
    ? 'aria-hidden="true"'
    : `role="img" aria-label="${escapeHtml(options.label ?? defaultLabel)}"`;
  return `<span class="${escapeHtml(classes.join(' '))}" ${accessibility}>${asset}</span>`;
}

export const Omega1Mark = (options: BrandOptions = {}) => renderBrand(
  options.size === 16 || options.size === 24 ? brandAssets.micro : brandAssets.master,
  options, 'TAIJIFU Ω1', 'tj-brand-omega1',
);

export const Omega1AccentMark = (options: BrandOptions<StandardBrandSize> = {}) => renderBrand(
  brandAssets.accent, options, 'TAIJIFU Ω1', 'tj-brand-accent',
);

export const Omega1ReverseMark = (options: BrandOptions<StandardBrandSize> = {}) => renderBrand(
  brandAssets.reverse, options, 'TAIJIFU Ω1', 'tj-brand-reverse',
);

export const Omega1MicroMark = (options: BrandOptions<MicroBrandSize> = {}) => renderBrand(
  brandAssets.micro, { ...options, size: options.size ?? 24 }, 'TAIJIFU Ω1', 'tj-brand-micro',
);

export const TaijifuLockupHorizontal = (options: BrandOptions<StandardBrandSize> = {}) => renderBrand(
  brandAssets.horizontalLockup, options, 'TAIJIFU', 'tj-brand-lockup-horizontal',
);

export const TaijifuLockupVertical = (options: BrandOptions<StandardBrandSize> = {}) => renderBrand(
  brandAssets.verticalLockup, options, 'TAIJIFU', 'tj-brand-lockup-vertical',
);

export const HnkSignature = (options: BrandOptions<StandardBrandSize> = {}) => renderBrand(
  brandAssets.hnkSignature, options, 'TAIJIFU HNK signature', 'tj-brand-hnk-signature',
);
