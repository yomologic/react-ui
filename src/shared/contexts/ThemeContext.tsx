"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Theme } from "../../types/theme";
import defaultTheme from "../../styles/themes/default.json";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme as Theme);

  // Apply theme by setting CSS custom properties
  const applyTheme = (newTheme: Theme) => {
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

    // Semantic colors
    root.style.setProperty("--color-success", colors.success);
    root.style.setProperty("--color-error", colors.error);
    root.style.setProperty("--color-warning", colors.warning);
    root.style.setProperty("--color-info", colors.info);

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
    root.style.setProperty(
      "--font-sans",
      typography.fontFamily.sans.join(", ")
    );
    root.style.setProperty(
      "--font-mono",
      typography.fontFamily.mono.join(", ")
    );

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

    // Component: Card
    const card = newTheme.components.card;
    Object.entries(card.padding).forEach(([size, padding]) => {
      root.style.setProperty(`--card-padding-${size}`, padding);
    });
    root.style.setProperty("--card-radius", card.borderRadius);
    root.style.setProperty("--card-border-width", card.borderWidth);
    root.style.setProperty("--card-shadow-flat", card.shadow.flat);
    root.style.setProperty("--card-shadow-elevated", card.shadow.elevated);

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

  // Load theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          applyTheme(parsedTheme);
        } catch (error) {
          console.error("Failed to parse saved theme:", error);
          applyTheme(defaultTheme as Theme);
        }
      } else {
        applyTheme(defaultTheme as Theme);
      }
    }
  }, []);

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
