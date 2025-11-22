"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Theme } from "../../types/theme";
import defaultTheme from "../../styles/themes/default.json";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Initialize theme synchronously to avoid flash
const initializeTheme = (): Theme => {
  if (typeof window === "undefined") {
    return defaultTheme as Theme;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    try {
      return JSON.parse(savedTheme);
    } catch (error) {
      console.error("Failed to parse saved theme:", error);
    }
  }
  return defaultTheme as Theme;
};

// Separate function to apply theme to DOM (can be called outside React)
function applyThemeToDOM(newTheme: Theme) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  // Colors
  const colors = newTheme.colors;

  // Primary colors
  Object.entries(colors.primary).forEach(([shade, value]) => {
    if (value) {
      root.style.setProperty(`--color-primary-${shade}`, value);
    }
  });

  // Secondary colors
  Object.entries(colors.secondary).forEach(([shade, value]) => {
    if (value) {
      root.style.setProperty(`--color-secondary-${shade}`, value);
    }
  });

  // Semantic colors (shared across all components)
  const semanticColors = ["info", "success", "warning", "error"] as const;
  semanticColors.forEach((semantic) => {
    const color = colors[semantic];
    if (color && typeof color === "object") {
      root.style.setProperty(`--color-${semantic}`, color.default);
      root.style.setProperty(
        `--color-${semantic}-foreground`,
        color.foreground
      );
      root.style.setProperty(`--color-${semantic}-muted`, color.muted);
      root.style.setProperty(
        `--color-${semantic}-muted-foreground`,
        color["muted-foreground"]
      );
      root.style.setProperty(`--color-${semantic}-border`, color.border);
    }
  });

  // Gray scale
  Object.entries(colors.gray).forEach(([shade, value]) => {
    if (value) {
      root.style.setProperty(`--color-gray-${shade}`, value);
    }
  });

  // Background and foreground
  root.style.setProperty("--color-background", colors.background);
  root.style.setProperty("--color-foreground", colors.foreground);
  root.style.setProperty("--color-muted", colors.muted);
  root.style.setProperty("--color-muted-foreground", colors.mutedForeground);

  // Spacing
  Object.entries(newTheme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Border radius
  Object.entries(newTheme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Typography
  const { typography } = newTheme;

  // Font families
  root.style.setProperty("--font-sans", typography.fontFamily.sans.join(", "));
  root.style.setProperty("--font-mono", typography.fontFamily.mono.join(", "));

  // Font sizes
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--text-${key}`, value);
  });

  // Font weights
  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });

  // Component: Button
  const button = newTheme.components.button;
  Object.entries(button.padding).forEach(([size, padding]) => {
    root.style.setProperty(`--button-padding-${size}-x`, padding.x);
    root.style.setProperty(`--button-padding-${size}-y`, padding.y);
  });
  Object.entries(button.fontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--button-font-size-${size}`, fontSize);
  });
  root.style.setProperty("--button-radius", button.borderRadius);
  root.style.setProperty("--button-font-weight", button.fontWeight);
  root.style.setProperty("--button-border-width", button.borderWidth);

  // Component: Card
  const card = newTheme.components.card;
  Object.entries(card.padding).forEach(([size, padding]) => {
    root.style.setProperty(`--card-padding-${size}`, padding);
  });
  root.style.setProperty("--card-radius", card.borderRadius);
  root.style.setProperty("--card-border-width", card.borderWidth);
  root.style.setProperty("--card-shadow-flat", card.shadow.flat);
  root.style.setProperty("--card-shadow-elevated", card.shadow.elevated);

  // Card icon colors
  if (card.iconColors) {
    Object.entries(card.iconColors).forEach(([color, values]) => {
      root.style.setProperty(`--card-icon-${color}-bg`, values.bg);
      root.style.setProperty(`--card-icon-${color}-bg-hover`, values.bgHover);
      root.style.setProperty(`--card-icon-${color}-text`, values.text);
    });
  }

  // Component: Input
  const input = newTheme.components.input;
  Object.entries(input.padding).forEach(([size, padding]) => {
    root.style.setProperty(`--input-padding-${size}`, padding);
  });
  Object.entries(input.fontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--input-font-size-${size}`, fontSize);
  });
  root.style.setProperty("--input-radius", input.borderRadius);
  root.style.setProperty("--input-border-width", input.borderWidth);

  // Component: Checkbox
  const checkbox = newTheme.components.checkbox;
  Object.entries(checkbox.size).forEach(([size, dimension]) => {
    root.style.setProperty(`--checkbox-size-${size}`, dimension);
  });
  Object.entries(checkbox.labelSpacing).forEach(([size, spacing]) => {
    root.style.setProperty(`--checkbox-label-spacing-${size}`, spacing);
  });
  Object.entries(checkbox.labelFontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--checkbox-label-font-size-${size}`, fontSize);
  });
  root.style.setProperty("--checkbox-radius", checkbox.borderRadius);

  // Component: Radio
  const radio = newTheme.components.radio;
  Object.entries(radio.size).forEach(([size, dimension]) => {
    root.style.setProperty(`--radio-size-${size}`, dimension);
  });
  Object.entries(radio.labelSpacing).forEach(([size, spacing]) => {
    root.style.setProperty(`--radio-label-spacing-${size}`, spacing);
  });
  Object.entries(radio.labelFontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--radio-label-font-size-${size}`, fontSize);
  });

  // Component: Dropdown
  const dropdown = newTheme.components.dropdown;
  Object.entries(dropdown.padding).forEach(([size, padding]) => {
    root.style.setProperty(`--dropdown-padding-${size}-x`, padding.x);
    root.style.setProperty(`--dropdown-padding-${size}-y`, padding.y);
  });
  Object.entries(dropdown.fontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--dropdown-font-size-${size}`, fontSize);
  });
  Object.entries(dropdown.iconSize).forEach(([size, iconSize]) => {
    root.style.setProperty(`--dropdown-icon-size-${size}`, iconSize);
  });
  Object.entries(dropdown.optionPadding).forEach(([size, padding]) => {
    root.style.setProperty(`--dropdown-option-padding-${size}-x`, padding.x);
    root.style.setProperty(`--dropdown-option-padding-${size}-y`, padding.y);
  });
  Object.entries(dropdown.optionFontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--dropdown-option-font-size-${size}`, fontSize);
  });
  root.style.setProperty("--dropdown-radius", dropdown.borderRadius);
  root.style.setProperty("--dropdown-border-width", dropdown.borderWidth);

  // Component: Nav
  const nav = newTheme.components.nav;
  root.style.setProperty("--nav-height", nav.height);
  Object.entries(nav.itemPadding).forEach(([size, padding]) => {
    root.style.setProperty(`--nav-item-padding-${size}-x`, padding.x);
    root.style.setProperty(`--nav-item-padding-${size}-y`, padding.y);
  });
  Object.entries(nav.fontSize).forEach(([size, fontSize]) => {
    root.style.setProperty(`--nav-font-size-${size}`, fontSize);
  });
  root.style.setProperty("--nav-border-radius", nav.borderRadius);
  root.style.setProperty("--nav-gap", nav.gap);

  // Component: Drawer
  const drawer = newTheme.components.drawer;
  const density = newTheme.density;
  root.style.setProperty("--drawer-width", drawer.width);
  root.style.setProperty(
    "--drawer-section-padding-y",
    drawer.sectionPadding[density].y
  );
  root.style.setProperty(
    "--drawer-title-margin-bottom",
    drawer.titleMarginBottom[density]
  );
  root.style.setProperty(
    "--drawer-item-padding-x",
    drawer.itemPadding[density].x
  );
  root.style.setProperty(
    "--drawer-item-padding-y",
    drawer.itemPadding[density].y
  );
  root.style.setProperty("--drawer-item-spacing", drawer.itemSpacing[density]);
  root.style.setProperty("--drawer-font-size", drawer.fontSize);
  root.style.setProperty("--drawer-border-radius", drawer.borderRadius);

  // Component: Dialog
  if (newTheme.components.dialog) {
    const dialog = newTheme.components.dialog;
    Object.entries(dialog.maxWidth).forEach(([size, width]) => {
      root.style.setProperty(`--dialog-max-width-${size}`, width);
    });
    root.style.setProperty(
      "--dialog-padding-header-x",
      dialog.padding.header.x
    );
    root.style.setProperty(
      "--dialog-padding-header-y",
      dialog.padding.header.y
    );
    root.style.setProperty(
      "--dialog-padding-content-x",
      dialog.padding.content.x
    );
    root.style.setProperty(
      "--dialog-padding-content-y",
      dialog.padding.content.y
    );
    root.style.setProperty(
      "--dialog-padding-footer-x",
      dialog.padding.footer.x
    );
    root.style.setProperty(
      "--dialog-padding-footer-y",
      dialog.padding.footer.y
    );
    root.style.setProperty("--dialog-border-radius", dialog.borderRadius);
    root.style.setProperty("--dialog-border-width", dialog.borderWidth);
    root.style.setProperty("--dialog-backdrop-blur", dialog.backdropBlur);
  }

  // Z-Index Scale
  // Z-Index Scale
  Object.entries(newTheme.zIndex).forEach(([key, value]) => {
    root.style.setProperty(`--z-index-${key}`, value.toString());
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage or default AND apply it immediately
  const [theme, setThemeState] = useState<Theme>(() => {
    const initialTheme = initializeTheme();
    // Apply theme synchronously during initialization (before first render)
    applyThemeToDOM(initialTheme);
    return initialTheme;
  });

  // Apply theme by setting CSS custom properties
  const applyTheme = (newTheme: Theme) => {
    applyThemeToDOM(newTheme);
    setThemeState(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
    // Optionally save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(newTheme));
    }
  };

  const resetTheme = () => {
    applyTheme(defaultTheme as Theme);
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, applyTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
