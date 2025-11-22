# Theme System Architecture

## Design Philosophy

The theme system is designed with **two separate use cases**:

### 1. Production Use (Build-time CSS)

- Components ship with **static CSS** - no runtime theming overhead
- Themes are applied at **build time** via Tailwind
- Fast, predictable, no JavaScript required for styling
- No flash of unstyled content

### 2. Development/Showcase (Runtime Theming)

- **Showcase site only** uses `ThemeProvider` for live preview
- **Theme Builder** allows interactive customization
- Changes apply instantly for testing
- Export themes as static CSS or Tailwind config

---

## File Structure

```
react-ui/
├── src/
│   ├── styles/
│   │   ├── themes/
│   │   │   ├── default.json          # Base theme definition
│   │   │   ├── dark.json             # Dark theme
│   │   │   └── custom-*.json         # User-generated themes
│   │   ├── base.css                  # Core component styles (semantic colors)
│   │   └── themes.css                # Build-time theme generation
│   │
│   ├── shared/contexts/
│   │   └── ThemeContext.tsx          # Runtime theme switching (showcase only)
│   │
│   └── scripts/
│       ├── generate-theme-css.ts     # Build script: JSON → CSS
│       └── generate-tailwind-config.ts # Build script: JSON → Tailwind config
│
└── site/                             # Showcase site
    ├── src/app/
    │   ├── globals.css               # @utility definitions for Tailwind v4
    │   └── layout.tsx                # Wraps with ThemeProvider (showcase only)
    │
    └── (showcase)/
        └── theme-builder/            # Interactive theme editor
            └── page.tsx
```

---

## How It Works

### For Component Library Consumers (Production)

```tsx
// No ThemeProvider needed!
import { Button, Dialog, Alert } from "@yomologic/react-ui";
import "@yomologic/react-ui/styles.css"; // Pre-built CSS with default theme

function App() {
  return <Button variant="info">Click me</Button>;
}
```

**Customizing Theme:**

Option A: Use a pre-built theme

```tsx
import "@yomologic/react-ui/themes/dark.css"; // Pre-built dark theme
```

Option B: Generate custom theme at build time

```bash
# Generate CSS from your theme JSON
npx @yomologic/react-ui generate-theme ./my-theme.json

# Then import it
import './my-theme.css';
```

### For Showcase Site (Development)

```tsx
// Showcase uses ThemeProvider for live preview
import { ThemeProvider } from "@yomologic/react-ui";

export default function ShowcaseLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

---

## Implementation Plan

### Phase 1: Component CSS (Semantic Colors)

**File: `src/styles/base.css`**

```css
/* Semantic color utilities using CSS variables */
/* These reference variables defined in theme CSS */

.bg-info-muted {
  background-color: var(--color-info-muted);
}

.text-info-muted-foreground {
  color: var(--color-info-muted-foreground);
}

/* ... all semantic color utilities */
```

### Phase 2: Build-time Theme Generation

**File: `src/scripts/generate-theme-css.ts`**

```typescript
import fs from "fs";
import path from "path";
import type { Theme } from "../types/theme";

/**
 * Generates static CSS file from theme JSON
 * Usage: node generate-theme-css.ts ./themes/default.json
 */
export function generateThemeCSS(themeJson: Theme): string {
  const { colors } = themeJson;

  return `
:root {
  /* Info colors */
  --color-info: ${colors.info.default};
  --color-info-foreground: ${colors.info.foreground};
  --color-info-muted: ${colors.info.muted};
  --color-info-muted-foreground: ${colors.info["muted-foreground"]};
  --color-info-border: ${colors.info.border};
  
  /* Success colors */
  --color-success: ${colors.success.default};
  --color-success-foreground: ${colors.success.foreground};
  --color-success-muted: ${colors.success.muted};
  --color-success-muted-foreground: ${colors.success["muted-foreground"]};
  --color-success-border: ${colors.success.border};
  
  /* Warning colors */
  --color-warning: ${colors.warning.default};
  --color-warning-foreground: ${colors.warning.foreground};
  --color-warning-muted: ${colors.warning.muted};
  --color-warning-muted-foreground: ${colors.warning["muted-foreground"]};
  --color-warning-border: ${colors.warning.border};
  
  /* Error colors */
  --color-error: ${colors.error.default};
  --color-error-foreground: ${colors.error.foreground};
  --color-error-muted: ${colors.error.muted};
  --color-error-muted-foreground: ${colors.error["muted-foreground"]};
  --color-error-border: ${colors.error.border};
  
  /* Add all other theme properties... */
}
`;
}

// CLI usage
const themeFile = process.argv[2];
if (themeFile) {
  const theme = JSON.parse(fs.readFileSync(themeFile, "utf-8"));
  const css = generateThemeCSS(theme);
  fs.writeFileSync(
    path.join(
      __dirname,
      "../dist/themes",
      path.basename(themeFile, ".json") + ".css"
    ),
    css
  );
}
```

### Phase 3: Showcase Site (Runtime Theming)

**File: `site/src/app/globals.css` (Tailwind v4)**

```css
@import "tailwindcss";
@import "@yomologic/react-ui/styles/base.css";

/* Define Tailwind utilities that reference CSS variables */
@utility bg-info-muted {
  background-color: var(--color-info-muted);
}

@utility text-info-muted-foreground {
  color: var(--color-info-muted-foreground);
}

/* ... all semantic utilities */

/* Default theme values (fallback) */
:root {
  --color-info: #3b82f6;
  --color-info-foreground: #ffffff;
  --color-info-muted: #eff6ff;
  --color-info-muted-foreground: #1d4ed8;
  --color-info-border: #3b82f6;
  /* ... */
}
```

**ThemeContext only updates CSS variables**

- Tailwind utilities already reference the variables
- No flash because utilities are pre-generated
- Variables update reactively

### Phase 4: Theme Builder

**Export Options:**

1. **JSON** - For sharing/importing
2. **CSS File** - For direct use in production
3. **Tailwind Config** - For Tailwind v3 users
4. **npm Package** - Full theme package

---

## Benefits

✅ **Performance**: Zero runtime overhead for production apps
✅ **No Flash**: CSS is static, no hydration issues
✅ **DX**: Interactive theme builder for development
✅ **Flexibility**: Use pre-built themes or generate custom ones
✅ **Type Safety**: TypeScript throughout
✅ **Portable**: Themes are JSON files
✅ **Scalable**: Add new themes easily

---

## Migration Path

### Current State (Runtime Only)

- ThemeProvider updates CSS variables at runtime
- Works but has flash of unstyled content
- Runtime overhead

### Target State (Hybrid)

- Production: Build-time CSS (static)
- Showcase: Runtime CSS (dynamic)
- Best of both worlds

### Steps

1. ✅ Create build script to generate CSS from JSON
2. ✅ Update components to use semantic CSS classes
3. ✅ Keep ThemeProvider for showcase only
4. ✅ Export pre-built theme CSS files
5. ✅ Document both usage patterns
6. ✅ Add Theme Builder export functionality

---

## Example: Theme Builder Export

```typescript
// Theme Builder UI
function ThemeBuilderExportButton() {
  const { theme } = useTheme();

  const exportOptions = [
    {
      label: "Export as JSON",
      action: () => downloadJSON(theme),
    },
    {
      label: "Export as CSS",
      action: () => {
        const css = generateThemeCSS(theme);
        downloadFile("my-theme.css", css);
      },
    },
    {
      label: "Export as Tailwind Config",
      action: () => {
        const config = generateTailwindConfig(theme);
        downloadFile("tailwind.config.js", config);
      },
    },
    {
      label: "Generate npm Package",
      action: () => generateNpmPackage(theme),
    },
  ];

  return <Dropdown label="Export Theme" options={exportOptions} />;
}
```

---

## Usage Patterns

### Pattern 1: Default Theme (Zero Config)

```tsx
import "@yomologic/react-ui/styles.css";
import { Button } from "@yomologic/react-ui";

// Uses default theme, no setup needed
<Button variant="info">Click</Button>;
```

### Pattern 2: Pre-built Theme

```tsx
import "@yomologic/react-ui/themes/dark.css";
import { Button } from "@yomologic/react-ui";

// Uses pre-built dark theme
<Button variant="info">Click</Button>;
```

### Pattern 3: Custom Theme (Build-time)

```bash
# 1. Create theme JSON
{
  "name": "My Theme",
  "colors": {
    "info": {
      "default": "#ff0000",
      ...
    }
  }
}

# 2. Generate CSS
npx @yomologic/react-ui generate-theme ./my-theme.json

# 3. Import
import './my-theme.css';
```

### Pattern 4: Theme Builder (Interactive)

```tsx
// Only in showcase/development
import { ThemeProvider } from "@yomologic/react-ui";

<ThemeProvider>
  <App />
</ThemeProvider>;

// Navigate to /theme-builder
// Customize visually
// Export as CSS or JSON
```

---

## Future Enhancements

- [ ] Theme marketplace (share/discover themes)
- [ ] VS Code extension for theme editing
- [ ] Figma plugin integration
- [ ] Accessibility checker (contrast ratios)
- [ ] Theme interpolation (smooth transitions)
- [ ] CSS variable fallbacks for IE11
- [ ] Automatic dark mode generation
- [ ] Theme analytics (most popular themes)
