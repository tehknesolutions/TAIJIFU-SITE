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
  type: Object.freeze({
    display: '--tj-font-display',
    heading: '--tj-font-heading',
    body: '--tj-font-body',
    meta: '--tj-font-meta',
    size: Object.freeze({
      display: '--tj-type-size-display',
      heading: '--tj-type-size-heading',
      body: '--tj-type-size-body',
      meta: '--tj-type-size-meta',
    }),
    lineHeight: Object.freeze({
      tight: '--tj-type-line-tight',
      body: '--tj-type-line-body',
    }),
    letterSpacing: Object.freeze({
      display: '--tj-type-tracking-display',
      meta: '--tj-type-tracking-meta',
    }),
  }),
  intensity: Object.freeze({
    signal: '--tj-intensity-signal',
    artifact: '--tj-intensity-artifact',
    ritual: '--tj-intensity-ritual',
  }),
  surface: Object.freeze({
    void: '--tj-surface-void',
    elevated: '--tj-surface-elevated',
    deep: '--tj-surface-deep',
    metal: '--tj-surface-metal',
  }),
  depth: Object.freeze({
    signal: '--tj-depth-signal',
    artifact: '--tj-depth-artifact',
    ritual: '--tj-depth-ritual',
  }),
  energy: Object.freeze({
    signal: '--tj-energy-signal',
    artifact: '--tj-energy-artifact',
    ritual: '--tj-energy-ritual',
  }),
  motion: Object.freeze({
    duration: Object.freeze({
      fast: '--tj-motion-duration-fast',
      standard: '--tj-motion-duration-standard',
      deliberate: '--tj-motion-duration-deliberate',
    }),
    semantic: Object.freeze({
      tai: '--tj-motion-tai',
      ji: '--tj-motion-ji',
      fu: '--tj-motion-fu',
    }),
    easing: Object.freeze({
      standard: '--tj-motion-easing-standard',
      emphasized: '--tj-motion-easing-emphasized',
    }),
  }),
  mark: Object.freeze({
    clearSpace: '--tj-mark-clear-space',
    size: Object.freeze({
      sm: '--tj-mark-size-sm',
      md: '--tj-mark-size-md',
      lg: '--tj-mark-size-lg',
    }),
  }),
} as const);

export type TaijifuDesignTokens = typeof designTokens;

export * from './identity.js';
