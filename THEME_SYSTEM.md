# Theme System

A powerful, JSON-based theming system that allows users to customize the entire design system through a visual interface or by editing JSON files.

## Architecture

### 1. **Theme Definition** (`src/types/theme.ts`)

TypeScript interfaces define the complete theme structure:

- Colors (with shades 50-900)
- Spacing
- Border radius
- Typography (fonts, sizes, weights)
- Component-specific settings (Button, Card, etc.)

### 2. **Theme Storage** (`src/styles/themes/`)

Themes are stored as JSON files:

- `default.json` - The default theme
- Users can create/import custom themes

### 3. **Theme Provider** (`src/contexts/ThemeContext.tsx`)

React context that:

- Loads theme from localStorage on mount
- Applies theme by setting CSS custom properties
- Provides `useTheme()` hook for components
- Handles theme import/export

### 4. **CSS Variables** (`src/app/globals.css`)

CSS custom properties that components reference:

```css
:root {
  --color-primary: #3b82f6;
  --button-padding-md-x: 1rem;
  --button-radius: 0.5rem;
  /* ... and many more */
}
```

### 5. **Component Integration**

Components use CSS variables via Tailwind's arbitrary values:

```tsx
className = "[background-color:var(--color-primary)]";
```

## Usage

### Using the Theme Builder

1. Navigate to the "Theme Builder" section in the showcase
2. Use color pickers and controls to customize
3. See changes applied in real-time
4. Export your theme as JSON
5. Import previously saved themes

### Programmatic Usage

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, applyTheme, resetTheme } = useTheme();

  // Access current theme
  console.log(theme.colors.primary[500]);

  // Apply a custom theme
  applyTheme(customThemeObject);

  // Reset to default
  resetTheme();
}
```

### Creating Custom Themes

Create a JSON file matching the Theme interface:

```json
{
  "name": "My Theme",
  "version": "1.0.0",
  "colors": {
    "primary": {
      "500": "#FF6B6B",
      "600": "#EE5A52",
      "700": "#E04848"
    }
    // ... more colors
  },
  "components": {
    "button": {
      "padding": {
        "md": { "x": "1.5rem", "y": "0.75rem" }
      },
      "borderRadius": "1rem"
    }
  }
}
```

## Theme Properties

### Colors

- `primary` - Main brand color (with shades)
- `secondary` - Secondary brand color
- `success`, `error`, `warning`, `info` - Semantic colors
- `gray` - Neutral colors
- `background`, `foreground`, `muted` - UI colors

### Spacing

Consistent spacing scale: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Border Radius

Consistent radius scale: `none`, `sm`, `md`, `lg`, `xl`, `full`

### Typography

- Font families (sans, mono)
- Font sizes (xs through 3xl)
- Font weights (normal, medium, semibold, bold)

### Component Settings

#### Button

- Padding for each size (sm, md, lg)
- Font sizes
- Border radius
- Font weight

#### Card

- Padding variants (none, sm, md, lg)
- Border radius and width
- Shadow styles (flat, elevated)

## Extending the System

### Adding New Components

1. **Add to Theme Types** (`src/types/theme.ts`):

```typescript
export interface InputTheme {
  padding: string;
  borderRadius: string;
  // ... other properties
}

export interface ComponentThemes {
  button: ButtonTheme;
  card: CardTheme;
  input: InputTheme; // NEW
}
```

2. **Add to Default Theme** (`src/styles/themes/default.json`):

```json
{
  "components": {
    "input": {
      "padding": "0.625rem",
      "borderRadius": "0.5rem"
    }
  }
}
```

3. **Add CSS Variables** (`src/app/globals.css`):

```css
:root {
  --input-padding: 0.625rem;
  --input-radius: 0.5rem;
}
```

4. **Apply in ThemeContext** (`src/contexts/ThemeContext.tsx`):

```typescript
const input = theme.components.input;
root.style.setProperty("--input-padding", input.padding);
root.style.setProperty("--input-radius", input.borderRadius);
```

5. **Use in Component**:

```tsx
className =
  "[padding:var(--input-padding)] [border-radius:var(--input-radius)]";
```

### Adding Theme Controls

Update `ThemeBuilderSection.tsx` to add more controls:

- Color pickers for other colors
- Sliders for spacing/sizing
- Dropdowns for font families
- Number inputs for specific values

## Benefits

✅ **User Customizable** - Users can create and save custom themes
✅ **Portable** - Themes are JSON files that can be shared
✅ **Type Safe** - Full TypeScript support
✅ **Real-time Preview** - Changes apply instantly
✅ **Persistent** - Themes saved to localStorage
✅ **Exportable** - Download themes as JSON files
✅ **Importable** - Load themes from JSON files
✅ **Extendable** - Easy to add new components and properties

## Future Enhancements

- [ ] Multiple theme presets (Light, Dark, High Contrast)
- [ ] Color palette generator (auto-generate shades)
- [ ] Advanced controls for all component properties
- [ ] Theme marketplace/sharing
- [ ] CSS export (generate static CSS from theme)
- [ ] Tailwind config generator
- [ ] Accessibility checker (contrast ratios, etc.)
- [ ] Theme preview mode (test without saving)
