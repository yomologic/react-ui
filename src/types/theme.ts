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

export interface SemanticColorShades {
    default: string;
    foreground: string;
    muted: string;
    "muted-foreground": string;
    border: string;
}

export interface ThemeColors {
    primary: ColorShades;
    secondary: ColorShades;
    // Semantic colors with full shade definitions
    info: SemanticColorShades;
    success: SemanticColorShades;
    warning: SemanticColorShades;
    error: SemanticColorShades;
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
    "2xl": string;
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
        "2xl": string;
        "3xl": string;
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
        xs: { x: string; y: string };
        sm: { x: string; y: string };
        md: { x: string; y: string };
        lg: { x: string; y: string };
        xl: { x: string; y: string };
    };
    // Font sizes for different sizes
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    // Border radius
    borderRadius: string;
    // Font weight
    fontWeight: string;
    // Border width
    borderWidth: string;
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
    iconColors?: {
        blue: { bg: string; bgHover: string; text: string };
        purple: { bg: string; bgHover: string; text: string };
        green: { bg: string; bgHover: string; text: string };
        orange: { bg: string; bgHover: string; text: string };
        pink: { bg: string; bgHover: string; text: string };
        indigo: { bg: string; bgHover: string; text: string };
    };
}

export interface InputTheme {
    padding: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: string;
    borderWidth: string;
}

export interface CheckboxTheme {
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    labelSpacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    labelFontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: string;
}

export interface RadioTheme {
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    labelSpacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    labelFontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

export interface DropdownTheme {
    padding: {
        xs: { x: string; y: string };
        sm: { x: string; y: string };
        md: { x: string; y: string };
        lg: { x: string; y: string };
        xl: { x: string; y: string };
    };
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    iconSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    optionPadding: {
        xs: { x: string; y: string };
        sm: { x: string; y: string };
        md: { x: string; y: string };
        lg: { x: string; y: string };
        xl: { x: string; y: string };
    };
    optionFontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: string;
    borderWidth: string;
}

export interface NavTheme {
    height: string;
    itemPadding: {
        xs: { x: string; y: string };
        sm: { x: string; y: string };
        md: { x: string; y: string };
        lg: { x: string; y: string };
        xl: { x: string; y: string };
    };
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: string;
    gap: string;
}

export interface DrawerTheme {
    width: string;
    sectionPadding: {
        comfortable: { y: string };
        standard: { y: string };
        compact: { y: string };
    };
    titleMarginBottom: {
        comfortable: string;
        standard: string;
        compact: string;
    };
    itemPadding: {
        comfortable: { x: string; y: string };
        standard: { x: string; y: string };
        compact: { x: string; y: string };
    };
    itemSpacing: {
        comfortable: string;
        standard: string;
        compact: string;
    };
    fontSize: string;
    borderRadius: string;
}

export interface DialogTheme {
    maxWidth: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    padding: {
        header: { x: string; y: string };
        content: { x: string; y: string };
        footer: { x: string; y: string };
    };
    borderRadius: string;
    borderWidth: string;
    backdropBlur: string;
}

export interface ZIndexScale {
    // Dropdowns and popovers
    dropdown: number;
    popover: number;
    tooltip: number;
    // Overlays
    overlay: number;
    // Navigation
    nav: number;
    navMobileOverlay: number;
    navMobileMenu: number;
    // Drawer
    drawerHeader: number;
    drawerButton: number;
    drawerOverlay: number;
    drawerPanel: number;
    // Modals
    modalBackdrop: number;
    modal: number;
    // Notifications
    snackbar: number;
    toast: number;
}

export interface ComponentThemes {
    button: ButtonTheme;
    card: CardTheme;
    input: InputTheme;
    checkbox: CheckboxTheme;
    radio: RadioTheme;
    dropdown: DropdownTheme;
    nav: NavTheme;
    drawer: DrawerTheme;
    dialog: DialogTheme;
}

export type DensityLevel = "comfortable" | "standard" | "compact";

export interface ThemeTransitions {
    "drawer-duration"?: string;
}

export interface ThemeOverlay {
    background?: string;
}

export interface Theme {
    name: string;
    version: string;
    colors: ThemeColors;
    spacing: ThemeSpacing;
    borderRadius: ThemeBorderRadius;
    typography: ThemeTypography;
    zIndex: ZIndexScale;
    density: DensityLevel;
    components: ComponentThemes;
    transitions?: ThemeTransitions;
    overlay?: ThemeOverlay;
}

export type ThemeJSON = Theme;
