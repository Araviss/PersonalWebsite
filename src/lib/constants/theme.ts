/**
 * Switch OS Design Tokens
 *
 * Accurate color palette derived from the Nintendo Switch dark theme UI.
 * Reference: https://github.com/Chelny/nintendo-switch-ui
 */

export const colors = {
  dark: {
    bgPrimary: '#2D2D2D',
    bgBody: '#383A3D',
    bgDeep: '#161616',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#737A80',
    accent: '#00C3E3',
    accentLight: '#96F5F5',
    danger: '#ED2939',
    dangerDark: '#960018',
  },
  light: {
    bgPrimary: '#EBEBEB',
    bgBody: '#F5F5F5',
    bgDeep: '#FFFFFF',
    black: '#000000',
    white: '#2D2D2D',
    gray: '#737A80',
    accent: '#00C3E3',
    accentLight: '#96F5F5',
    danger: '#ED2939',
    dangerDark: '#960018',
  },
} as const;

export const typography = {
  fontFamily: "'Inter', 'Verdana', system-ui, sans-serif",
  sizes: {
    xxs: '0.625rem', // 10px
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    xxl: '1.375rem', // 22px
    xxxl: '1.5rem', // 24px
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  screenPadding: '20px',
  gap: {
    xs: '4px',
    sm: '8px',
    md: '10px',
    lg: '15px',
    xl: '20px',
    xxl: '30px',
  },
} as const;

export const layout = {
  topBarHeight: '36px',
  tile: {
    borderRadius: '8px',
    padding: '6px',
    borderWidth: '4px',
  },
  bottomNav: {
    iconSize: '24px',
    sectionMargin: '0 20px',
  },
} as const;

export const animation = {
  duration: {
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
    launch: 0.5,
  },
  easing: {
    default: [0.25, 0.1, 0.25, 1],
    snappy: [0.4, 0, 0.2, 1],
  },
} as const;
