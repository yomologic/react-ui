# Theme System Quick Reference

> **⚠️ MANDATORY:** All new code must follow these naming standards. No exceptions.

## CSS Variable Naming Rules

### Pattern

```
--{category}-{name}[-{variant}]
```

### Categories

- `typography` - Text sizes (h1-h6, body, small, caption)
- `color` - Colors (primary, background, border, etc.)
- `{component}` - Component-specific (only when absolutely necessary)

### Typography Scales (USE THESE, NOT text-lg/text-xl)

```css
h1, h2, h3, h4, h5, h6  /* Heading hierarchy */
body                     /* Body text */
small                    /* Secondary text */
caption                  /* Fine print */
```

### ❌ NEVER CREATE

```css
--drawer-title          /* Use --typography-h5 */
--button-text           /* Use --typography-body */
--nav-link-size         /* Use --typography-small */
--card-heading          /* Use --typography-h4 */
```

## Typography Classes

| Class           | Mobile Size | Desktop Size | Usage                          |
| --------------- | ----------- | ------------ | ------------------------------ |
| `.text-h1`      | 30px        | 36px         | Hero titles, main page headers |
| `.text-h2`      | 24px        | 30px         | Section headings               |
| `.text-h3`      | 20px        | 24px         | Subsection headings            |
| `.text-h4`      | 18px        | 20px         | Component titles               |
| `.text-h5`      | 16px        | 18px         | Small headings, labels         |
| `.text-h6`      | 14px        | 16px         | Smallest headings              |
| `.text-body`    | 14px        | 16px         | Body text, descriptions        |
| `.text-small`   | 12px        | 14px         | Secondary text, helper text    |
| `.text-caption` | 11px        | 11px         | Fine print, metadata           |

## CSS Variables

### Typography

```css
--typography-h1 / --typography-h1-desktop
--typography-h2 / --typography-h2-desktop
--typography-h3 / --typography-h3-desktop
--typography-h4 / --typography-h4-desktop
--typography-h5 / --typography-h5-desktop
--typography-h6 / --typography-h6-desktop
--typography-body / --typography-body-desktop
--typography-small / --typography-small-desktop
--typography-caption
```

### Colors

```css
/* Base */
--color-primary / --color-primary-hover / --color-primary-active
--color-secondary / --color-secondary-hover
--color-background / --color-foreground
--color-muted / --color-muted-foreground
--color-placeholder / --color-border

/* Semantic */
--color-info / --color-info-foreground / --color-info-muted / --color-info-border
--color-success / --color-success-foreground / --color-success-muted / --color-success-border
--color-warning / --color-warning-foreground / --color-warning-muted / --color-warning-border
--color-error / --color-error-foreground / --color-error-muted / --color-error-border
```

## Utility Classes

### Colors

```css
.theme-bg              /* Background color */
.theme-surface         /* Muted background */
.theme-text            /* Foreground text color */
.theme-text-muted      /* Muted text color */
.theme-border          /* Border color */
```

## Usage Examples

### Basic Typography

```tsx
<h1 className="text-h1 font-bold">Main Title</h1>
<h2 className="text-h2 font-semibold">Section</h2>
<p className="text-body">Body text</p>
<span className="text-caption">Fine print</span>
```

### Themed Colors

```tsx
<div className="theme-bg theme-text">
    <div className="theme-surface p-4 theme-border border">Content</div>
</div>
```

### CSS Variables with Tailwind 4

```tsx
<button className="bg-(--color-primary) hover:bg-(--color-primary-hover)">
    Button
</button>
```

### Inline Styles

```tsx
<div
    style={{
        fontSize: "var(--typography-body)",
        color: "var(--color-foreground)",
    }}
>
    Custom content
</div>
```

## Theme Context API

### Import

```tsx
import { useTheme } from "@/contexts/ThemeContext";
```

### Available Methods

```tsx
const {
    currentTheme, // Current theme ID (string)
    availableThemes, // Array of { id, name }
    setTheme, // (themeId: string) => void
    setCSSVariable, // (name: string, value: string) => void
    getCSSVariable, // (name: string) => string
    exportThemeCSS, // () => string
} = useTheme();
```

### Switch Theme

```tsx
setTheme("yomologic-dark");
```

### Get Available Themes

```tsx
availableThemes.map((theme) => (
    <option key={theme.id} value={theme.id}>
        {theme.name}
    </option>
));
```

## Adding a New Theme

1. **Create JSON file** in `site/src/themes/my-theme.json`
2. **Import in ThemeContext:**

```tsx
import myTheme from "@/themes/my-theme.json";
const themes = {
    default: defaultTheme,
    "my-theme": myTheme,
};
```

## Theme JSON Structure

```json
{
    "name": "My Theme",
    "id": "my-theme",
    "colors": {
        /* ... */
    },
    "typography": {
        /* ... */
    },
    "showcase": {
        /* ... */
    },
    "semanticColors": {
        /* ... */
    },
    "components": {
        /* ... */
    }
}
```

## Migration Cheatsheet

| Old               | New                    | Type       |
| ----------------- | ---------------------- | ---------- |
| `text-3xl`        | `text-h1`              | Typography |
| `text-2xl`        | `text-h2`              | Typography |
| `text-xl`         | `text-h3`              | Typography |
| `text-lg`         | `text-h4`              | Typography |
| `text-base`       | `text-body`            | Typography |
| `text-sm`         | `text-small`           | Typography |
| `text-xs`         | `text-caption`         | Typography |
| `bg-blue-500`     | `bg-(--color-primary)` | Color      |
| `text-gray-900`   | `theme-text`           | Color      |
| `bg-gray-100`     | `theme-surface`        | Color      |
| `border-gray-300` | `theme-border`         | Color      |

## Best Practices

✅ **DO:**

- Use `.text-h1` through `.text-h6` for headings
- Use `.text-body` for body text
- Use `.text-small` for secondary text
- Use `.text-caption` for fine print
- Use utility classes (`.theme-bg`, `.theme-text`)
- Follow the semantic hierarchy

❌ **DON'T:**

- Use hardcoded Tailwind sizes (`text-lg`, `text-xl`)
- Use hardcoded colors (`bg-blue-500`, `text-gray-900`)
- Create component-specific typography variables
- Skip responsive variants
- Mix old and new syntax

## Troubleshooting

**Text not responsive?**
→ Use utility classes (`.text-h1`) not CSS variables directly

**Colors not updating?**
→ Check ThemeProvider wraps app, use CSS variables not hardcoded colors

**Custom variable not working?**
→ Ensure it's in all theme JSON files, check ThemeContext applies it
