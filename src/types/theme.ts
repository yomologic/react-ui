/**
 * Theme System Types
 * 
 * This defines the structure for customizable themes that can be
 * edited in the Theme Builder and applied across all components.
 */

export interface ColorShades {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500: string; // Primary shade - required
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

export interface ThemeColors {
  primary: ColorShades;
  secondary: ColorShades;
  success: string;
  error: string;
  warning: string;
  info: string;
  // Neutral colors
  gray: ColorShades;
  // Background and text
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string[];
    mono: string[];
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface ButtonTheme {
  // Padding for different sizes
  padding: {
    sm: { x: string; y: string };
    md: { x: string; y: string };
    lg: { x: string; y: string };
  };
  // Font sizes for different sizes
  fontSize: {
    sm: string;
    md: string;
    lg: string;
  };
  // Border radius
  borderRadius: string;
  // Font weight
  fontWeight: string;
}

export interface CardTheme {
  padding: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: string;
  borderWidth: string;
  shadow: {
    flat: string;
    elevated: string;
  };
}

export interface ComponentThemes {
  button: ButtonTheme;
  card: CardTheme;
  // Add more components as needed
}

export interface Theme {
  name: string;
  version: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
  components: ComponentThemes;
}

export type ThemeJSON = Theme;
