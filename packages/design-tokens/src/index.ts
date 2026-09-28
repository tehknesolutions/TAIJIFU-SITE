export const designTokens = Object.freeze({
  color: Object.freeze({
    ink: '--tj-color-ink',
    paper: '--tj-color-paper',
    metal: '--tj-color-metal',
    tai: '--tj-color-tai',
    ji: '--tj-color-ji',
    fu: '--tj-color-fu',
    integration: '--tj-color-integration',
  }),
  space: Object.freeze({
    xs: '--tj-space-xs', sm: '--tj-space-sm', md: '--tj-space-md',
    lg: '--tj-space-lg', xl: '--tj-space-xl', xxl: '--tj-space-xxl',
  }),
  type: Object.freeze({ display: '--tj-font-display', body: '--tj-font-body', meta: '--tj-font-meta' }),
  motion: Object.freeze({ fast: '--tj-motion-fast', standard: '--tj-motion-standard', deliberate: '--tj-motion-deliberate' }),
  markSpace: '--tj-mark-space',
} as const);

export type TaijifuDesignTokens = typeof designTokens;