export const colors = {
  // Colores principales
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',

  // Colores de fondo
  background: '#0a0a0a',
  surface: '#111111',
  surfaceElevated: '#1a1a1a',
  surfaceHover: '#2a2a2a',

  // Colores de texto
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  textTertiary: '#6b7280',
  textDisabled: '#4b5563',

  // State colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Colores de borde
  border: '#1f1f1f',
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderMedium: 'rgba(255, 255, 255, 0.2)',

  // Colores de sombra
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.5)',

  // Colores de overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
};

// Espaciado consistente
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Typography
export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
    xxxl: 24,
    xxxxl: 28,
  },

  // Pesos de fuente
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Espaciado de letras
  letterSpacing: {
    tight: 0.2,
    normal: 0.3,
    wide: 0.5,
  },
};

// Bordes redondeados
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Elevaciones y sombras
export const elevation = {
  sm: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  md: {
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  lg: {
    elevation: 6,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  xl: {
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
};
