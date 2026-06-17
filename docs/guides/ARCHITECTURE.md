# Theme System Architecture

## Design Philosophy

The theme system uses **CSS variables** for maximum simplicity and flexibility:

### 1. Production Use (Static CSS)

- Components use CSS variables defined in `styles.css`
- No JavaScript required for styling
- Fast, predictable, zero runtime overhead
- Users can override variables by importing their own CSS file

### 2. Theme Builder (Showcase Only)

- **Showcase site** has a minimal `ThemeProvider` for live preview
- **Theme Builder** allows interactive CSS variable editing
- Changes apply instantly via `document.documentElement.style.setProperty()`
- Export themes as pure CSS files (no JSON, no build step)
- **Not exported from library** - only for internal showcase use

---

## File Structure

```
react-ui/
├── src/
│   ├── styles/
│   │   └── styles.css                # All CSS variables defined here
│   │
│   └── ui/                           # Components use CSS variables
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
└── site/                             # Showcase site
    ├── src/
    │   ├── contexts/
    │   │   └── ThemeContext.tsx      # Minimal helper for Theme Builder
    │   │
    │   └── app/
    │       ├── globals.css           # Imports library styles
    │       ├── layout.tsx            # Wraps with ThemeProvider
    │       │
    │       └── (showcase)/
    │           └── theme-builder/    # Interactive CSS variable editor
    │               └── page.tsx
```

---

## How It Works

### For Component Library Consumers (Production)

```tsx
// No ThemeProvider needed!
import { Button, Dialog, Alert } from "@yomologic/react-ui";
import "@yomologic/react-ui/styles.css"; // Includes default CSS variables

function App() {
    return <Button variant="info">Click me</Button>;
}
```

**Customizing Theme:**

Create a CSS file that overrides CSS variables:

```css
/* my-theme.css */
:root {
    --color-primary: #ff0000;
    --color-secondary: #00ff00;
    --spacing-md: 1rem;
    /* Override any CSS variable */
}
```

Then import after the library styles:

```tsx
import "@yomologic/react-ui/styles.css";
import "./my-theme.css"; // Your overrides
```

### For Showcase Site (Development)

```tsx
// Showcase uses minimal ThemeProvider for live preview only
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function ShowcaseLayout({ children }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
```

---

## Implementation Details

### Component Styling

Components use CSS variables directly:

```tsx
// button.tsx
<button
    className={cn(
        "bg-[var(--color-primary)]",
        "text-[var(--color-primary-foreground)]",
        "px-[var(--spacing-md)]",
        "rounded-[var(--border-radius-md)]"
    )}
>
    {children}
</button>
```

### Showcase Site Theme Builder

**File: `site/src/contexts/ThemeContext.tsx`**

```typescript
"use client";
import React, { createContext, useContext } from "react";

interface ThemeContextType {
  setCSSVariable: (name: string, value: string) => void;
  getCSSVariable: (name: string) => string;
  exportThemeCSS: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setCSSVariable = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
  };

  const getCSSVariable = (name: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  };

  const exportThemeCSS = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const allProps = Array.from(computedStyle)
      .filter((prop) => prop.startsWith("--"))
      .sort();

    // Group by prefix for organization
    const grouped: Record<string, string[]> = {};
    allProps.forEach((prop) => {
      const prefix = prop.split("-")[1] || "other";
      if (!grouped[prefix]) grouped[prefix] = [];
      grouped[prefix].push(
        `  ${prop}: ${computedStyle.getPropertyValue(prop).trim()};`
      );
    });

    // Generate CSS
    const sections = Object.entries(grouped).map(
      ([prefix, props]) =>
        `  /* ${prefix} */\n${props.join("\n")}`
    );

    return `:root {\n${sections.join("\n\n")}\n}\n`;
  };

  return (
    <ThemeContext.Provider
      value={{ setCSSVariable, getCSSVariable, exportThemeCSS }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

### Theme Builder UI (Future)

```tsx
// site/src/app/(showcase)/theme-builder/page.tsx
function ThemeBuilderPage() {
    const { setCSSVariable, getCSSVariable, exportThemeCSS } = useTheme();

    const handleColorChange = (variable: string, color: string) => {
        setCSSVariable(variable, color);
    };

    const handleExport = () => {
        const css = exportThemeCSS();
        // Download CSS file
        const blob = new Blob([css], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "my-theme.css";
        a.click();
    };

    return (
        <div>
            <h1>Theme Builder</h1>
            {/* Color pickers for each CSS variable */}
            <input
                type="color"
                value={getCSSVariable("--color-primary")}
                onChange={(e) =>
                    handleColorChange("--color-primary", e.target.value)
                }
            />
            {/* Preview components live */}
            <Button>Preview</Button>
            <button onClick={handleExport}>Export Theme CSS</button>
        </div>
    );
}
```

---

## Benefits

✅ **Performance**: Zero runtime overhead for production apps  
✅ **Simplicity**: CSS variables as single source of truth  
✅ **Flexibility**: Users override variables with their own CSS  
✅ **DX**: Interactive Theme Builder for visual editing  
✅ **Portable**: Export themes as pure CSS files  
✅ **Zero Dependencies**: No JSON parsing or theme provider in production

---

## Usage Patterns

### Pattern 1: Default Theme (Zero Config)

```tsx
import "@yomologic/react-ui/styles.css";
import { Button } from "@yomologic/react-ui";

// Uses default CSS variables
<Button variant="info">Click</Button>;
```

### Pattern 2: Custom Theme (CSS Override)

```css
/* my-theme.css */
:root {
    --color-primary: #ff0000;
    --color-secondary: #00ff00;
    --spacing-md: 1rem;
    --border-radius-md: 0.5rem;
    /* Override any CSS variable */
}
```

```tsx
import "@yomologic/react-ui/styles.css";
import "./my-theme.css"; // Your overrides

<Button>Styled with custom theme</Button>;
```

### Pattern 3: Theme Builder (Interactive - Showcase Only)

```tsx
// Navigate to showcase /theme-builder
// 1. Adjust colors, spacing, borders visually
// 2. See live preview of all components
// 3. Export as CSS file
// 4. Import in your project
```

---

## Future Enhancements

- [ ] Theme Builder UI with color pickers, spacing editors
- [ ] Theme marketplace (share/discover themes)
- [ ] Dark mode toggle preset
- [ ] Accessibility checker (contrast ratios)
- [ ] Export to Tailwind config format
- [ ] Figma plugin integration
