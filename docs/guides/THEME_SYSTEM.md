# Theme System

A powerful, JSON-based theming system with standardized naming conventions for colors, typography, and component styling.

## Architecture Overview

### Core Principles

1. **Standardized Naming** - Consistent, semantic naming across all theme properties
2. **CSS Variables** - Runtime theming without rebuilds via CSS custom properties
3. **Mobile-First Typography** - Responsive font sizes that adapt to screen size
4. **Portable Themes** - JSON-based themes that can be imported/exported/shared
5. **Type Safety** - Full TypeScript support with defined interfaces

## Theme Structure

### 1. Colors

All color properties follow the `--color-{name}` convention:

#### Base Colors

```css
--color-primary
--color-primary-hover
--color-primary-active
--color-secondary
--color-secondary-hover
--color-background
--color-foreground
--color-muted
--color-muted-foreground
--color-placeholder
--color-border
```

#### Semantic Colors

```css
--color-info / --color-info-foreground / --color-info-muted / --color-info-border
--color-success / --color-success-foreground / --color-success-muted / --color-success-border
--color-warning / --color-warning-foreground / --color-warning-muted / --color-warning-border
--color-error / --color-error-foreground / --color-error-muted / --color-error-border
```

#### Showcase Colors

```css
--showcase-bg
--showcase-surface
--showcase-surface-elevated
--showcase-text-primary
--showcase-text-secondary
--showcase-border
```

### 2. Typography

Typography uses a **semantic hierarchy** with mobile-first responsive sizing:

#### Heading Levels (h1-h6)

```css
--typography-h1: 1.875rem (mobile) → 2.25rem (desktop) --typography-h2: 1.5rem
    (mobile) → 1.875rem (desktop) --typography-h3: 1.25rem (mobile) → 1.5rem
    (desktop) --typography-h4: 1.125rem (mobile) → 1.25rem (desktop)
    --typography-h5: 1rem (mobile) → 1.125rem (desktop)
    --typography-h6: 0.875rem (mobile) → 1rem (desktop);
```

#### Body & Utility Text

```css
--typography-body: 0.875rem (mobile) → 1rem (desktop)
    --typography-small: 0.75rem (mobile) → 0.875rem (desktop)
    --typography-caption: 0.6875rem (fixed);
```

### 3. Component-Specific Variables

Component variables follow the `--{component}-{property}` pattern:

```css
--checkbox-border-color
--checkbox-checked-color
--radio-border-color
--button-primary-text
--card-icon-blue-bg
```

## File Structure

```
site/src/
├── themes/
│   ├── default.json          # Light theme
│   └── yomologic-dark.json   # Dark theme
├── contexts/
│   └── ThemeContext.tsx      # Theme provider & management
└── app/
    └── globals.css           # CSS variable definitions & utilities
```

## Naming Conventions

> **⚠️ IMPORTANT:** All contributors must follow these naming standards. No component-specific or ad-hoc naming is allowed.

### General Principles

1. **Use semantic, reusable names** - Variables should describe meaning, not location
2. **Follow existing patterns** - Match the established structure before creating new variables
3. **Prefer hierarchy over specificity** - Use h1-h6 scales, not drawer-title or button-text
4. **Namespace by category** - `--color-*`, `--typography-*`, `--spacing-*`
5. **Use kebab-case** - Always lowercase with hyphens: `--color-primary-hover`

### CSS Variable Naming Pattern

```
--{category}-{name}[-{variant}]

Examples:
--typography-h1           (category: typography, name: h1)
--typography-h1-desktop   (category: typography, name: h1, variant: desktop)
--color-primary-hover     (category: color, name: primary, variant: hover)
--spacing-md              (category: spacing, name: md)
```

### Required Naming by Category

#### Typography Variables

**Format:** `--typography-{scale}[-desktop]`

**Allowed scales only:**

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - Heading hierarchy
- `body` - Body text
- `small` - Secondary text
- `caption` - Fine print

**Desktop variants:** Add `-desktop` suffix for responsive sizes

```css
--typography-h1: 1.875rem;
--typography-h1-desktop: 2.25rem;
```

#### Color Variables

**Format:** `--color-{name}[-{variant}]`

**Base colors:**

- `primary`, `secondary` - Brand colors
- `background`, `foreground` - Page colors
- `muted`, `muted-foreground` - Subtle backgrounds/text
- `border`, `placeholder` - UI elements

**Semantic colors:**

- `info`, `success`, `warning`, `error` - Status colors
- Each with variants: `-foreground`, `-muted`, `-muted-foreground`, `-border`

**Variants:**

- `-hover` - Hover state
- `-active` - Active/pressed state
- `-foreground` - Text on colored background

#### Component Variables

**Format:** `--{component}-{property}`

**Only when necessary** - Prefer reusing typography/color variables

```css
/* ✅ GOOD - Uses existing typography scale */
.card-title {
    font-size: var(--typography-h4);
}

/* ❌ BAD - Creates component-specific variable */
.card-title {
    font-size: var(--card-title-size);
}

/* ✅ ACCEPTABLE - Component-specific property needed */
--checkbox-size-md: 1.5rem;
--button-padding-y: 0.5rem;
```

### ✅ DO: Use Semantic Names

```json
{
    "typography": {
        "h1": "1.875rem",
        "body": "0.875rem",
        "caption": "0.6875rem"
    },
    "colors": {
        "primary": "#3b82f6",
        "primary-hover": "#2563eb"
    }
}
```

### ❌ DON'T: Use Component-Specific Names

```json
{
    "typography": {
        "drawer-title": "1rem", // ❌ Too specific - use h5
        "button-text": "0.875rem", // ❌ Not reusable - use body
        "nav-link": "0.875rem", // ❌ Component-specific - use body
        "sidebar-heading": "1.25rem" // ❌ Location-specific - use h3
    }
}
```

### Typography Naming Standards

| Use Case            | Variable               | Utility Class   |
| ------------------- | ---------------------- | --------------- |
| Page titles         | `--typography-h1`      | `.text-h1`      |
| Section headings    | `--typography-h2`      | `.text-h2`      |
| Subsection headings | `--typography-h3`      | `.text-h3`      |
| Component titles    | `--typography-h4`      | `.text-h4`      |
| Small headings      | `--typography-h5`      | `.text-h5`      |
| Labels              | `--typography-h6`      | `.text-h6`      |
| Body text           | `--typography-body`    | `.text-body`    |
| Secondary text      | `--typography-small`   | `.text-small`   |
| Fine print/metadata | `--typography-caption` | `.text-caption` |

### Color Naming Standards

| Use Case          | Variable             | Utility Class                  |
| ----------------- | -------------------- | ------------------------------ |
| Primary actions   | `--color-primary`    | `.bg-primary`, `.text-primary` |
| Background        | `--color-background` | `.theme-bg`                    |
| Text              | `--color-foreground` | `.theme-text`                  |
| Muted backgrounds | `--color-muted`      | `.theme-surface`               |
| Borders           | `--color-border`     | `.theme-border`                |

## Usage

### Using Utility Classes

The theme system provides utility classes that automatically use CSS variables:

```tsx
// Typography
<h1 className="text-h1 font-bold">Page Title</h1>
<h2 className="text-h2 font-semibold">Section Heading</h2>
<p className="text-body">Body text content</p>
<span className="text-caption">Fine print</span>

// Colors
<div className="theme-bg theme-text">
  <div className="theme-surface p-4 theme-border border">
    Content with themed colors
  </div>
</div>
```

### Using CSS Variables Directly

For custom styling, use CSS variables with Tailwind 4 syntax:

```tsx
// Colors
<div className="bg-(--color-primary) text-(--color-primary-foreground)">
  Primary colored element
</div>

// Typography
<p style={{ fontSize: "var(--typography-body)" }}>
  Direct CSS variable usage
</p>

// Mixed approach
<button className="bg-(--color-primary) hover:bg-(--color-primary-hover)">
  Themed Button
</button>
```

### Programmatic Theme Management

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
    const { currentTheme, setTheme, availableThemes, setCSSVariable } =
        useTheme();

    // Switch themes
    const handleThemeChange = () => {
        setTheme("yomologic-dark");
    };

    // Get available themes
    console.log(availableThemes); // [{ id: 'default', name: 'Default Light' }, ...]

    // Manually set a CSS variable
    setCSSVariable("--color-primary", "#ff0000");

    return <button onClick={handleThemeChange}>Switch to Dark Theme</button>;
}
```

## Creating Custom Themes

### Theme JSON Structure

```json
{
    "name": "My Custom Theme",
    "id": "my-theme",
    "colors": {
        "primary": "#3b82f6",
        "primary-hover": "#2563eb",
        "background": "#ffffff",
        "foreground": "#111827"
    },
    "typography": {
        "h1": "1.875rem",
        "h1-desktop": "2.25rem",
        "body": "0.875rem",
        "body-desktop": "1rem",
        "caption": "0.6875rem"
    },
    "showcase": {
        "bg": "#ffffff",
        "surface": "#f9fafb",
        "text-primary": "#111827"
    },
    "semanticColors": {
        "info": "#3b82f6",
        "success": "#22c55e",
        "warning": "#eab308",
        "error": "#ef4444"
    },
    "components": {
        "checkbox": {
            "border-color": "#9ca3af",
            "checked-color": "#3b82f6"
        }
    }
}
```

### Adding a New Theme

1. Create JSON file in `site/src/themes/my-theme.json`
2. Import in `ThemeContext.tsx`:

```typescript
import myTheme from "@/themes/my-theme.json";

const themes: Record<string, any> = {
    default: defaultTheme,
    "yomologic-dark": yomologicDark,
    "my-theme": myTheme, // Add here
};
```

## Extending the System

### Adding New Typography Scales

To add a new typography scale (e.g., for code blocks):

1. **Add to theme JSON** (`site/src/themes/*.json`):

```json
{
    "typography": {
        "code": "0.875rem",
        "code-desktop": "0.9375rem"
    }
}
```

2. **Add utility class** (`site/src/app/globals.css`):

```css
.text-code {
    font-size: var(--typography-code);
}

@media (min-width: 1024px) {
    .text-code {
        font-size: var(--typography-code-desktop);
    }
}
```

3. **Apply in ThemeContext** (already handled automatically by the theme system)

4. **Use in components**:

```tsx
<code className="text-code font-mono">const example = true;</code>
```

### Adding New Color Variables

1. **Add to theme JSON**:

```json
{
    "colors": {
        "accent": "#f59e0b",
        "accent-hover": "#d97706"
    }
}
```

2. **Use directly** (CSS variables are applied automatically):

```tsx
<div className="bg-(--color-accent) hover:bg-(--color-accent-hover)">
    Accent colored element
</div>
```

### Adding Component-Specific Variables

1. **Add to theme JSON**:

```json
{
    "components": {
        "input": {
            "padding": "0.625rem",
            "border-radius": "0.5rem"
        }
    }
}
```

2. **ThemeContext auto-converts** to: `--input-padding`, `--input-border-radius`

3. **Use in component**:

```tsx
<input className="p-(--input-padding) rounded-(--input-border-radius)" />
```

## Responsive Typography System

The typography system is **mobile-first** with automatic desktop scaling:

### How It Works

```css
/* Mobile (default) */
.text-h1 {
    font-size: var(--typography-h1); /* 1.875rem */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .text-h1 {
        font-size: var(--typography-h1-desktop); /* 2.25rem */
    }
}
```

### Usage Examples

```tsx
// Automatically responsive
<h1 className="text-h1">
  Title is 1.875rem on mobile, 2.25rem on desktop
</h1>

// Body text automatically scales
<p className="text-body">
  0.875rem on mobile, 1rem on desktop
</p>

// Fixed size (caption doesn't scale)
<span className="text-caption">
  Always 0.6875rem regardless of screen size
</span>
```

### When to Use Each Scale

| Scale     | Mobile | Desktop | Use Case                    | Example                   |
| --------- | ------ | ------- | --------------------------- | ------------------------- |
| `h1`      | 30px   | 36px    | Hero titles, page headers   | Landing page hero         |
| `h2`      | 24px   | 30px    | Section headings            | "Features", "Pricing"     |
| `h3`      | 20px   | 24px    | Subsection headings         | Component showcase titles |
| `h4`      | 18px   | 20px    | Card titles, drawer headers | Drawer title, card header |
| `h5`      | 16px   | 18px    | Small headings, labels      | Form section labels       |
| `h6`      | 14px   | 16px    | Smallest headings           | Metadata headings         |
| `body`    | 14px   | 16px    | Body text, descriptions     | Paragraph text            |
| `small`   | 12px   | 14px    | Secondary text, helper text | Form hints, timestamps    |
| `caption` | 11px   | 11px    | Fine print, legal text      | Copyright, terms          |

## Best Practices

### ✅ DO

- **Use semantic variable names** (`--color-primary`, `--typography-h1`)
- **Use utility classes** for common patterns (`.text-h1`, `.theme-bg`)
- **Follow the typography scale** (h1-h6, body, small, caption)
- **Keep themes consistent** across light/dark variants
- **Document custom variables** when adding new ones
- **Test on mobile** to ensure responsive typography works

### ❌ DON'T

- **Don't use component-specific typography** (`--drawer-title`, `--button-text`)
- **Don't hardcode sizes** (`text-lg`, `text-xl`) - use semantic classes instead
- **Don't mix old and new syntax** (use `bg-(--color-primary)` not `[background:var(--color-primary)]`)
- **Don't create duplicate variables** - reuse existing semantic scales
- **Don't skip responsive variants** - always define both mobile and desktop sizes
- **Don't bypass the theme system** - use CSS variables, not hardcoded colors

### Code Style Guide

```tsx
// ✅ GOOD: Semantic, responsive, reusable
<h1 className="text-h1 font-bold theme-text">Title</h1>
<p className="text-body theme-text-muted">Description</p>

// ❌ BAD: Hardcoded, not theme-aware
<h1 className="text-4xl font-bold text-gray-900">Title</h1>
<p className="text-base text-gray-600">Description</p>

// ✅ GOOD: Using CSS variables with Tailwind 4 syntax
<div className="bg-(--color-primary) text-(--color-primary-foreground)">

// ❌ BAD: Using old bracket syntax
<div className="[background:var(--color-primary)] [color:var(--color-primary-foreground)]">

// ✅ GOOD: Semantic component styling
<button
  className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-body"
>
  Click Me
</button>

// ❌ BAD: Component-specific variables
<button style={{ fontSize: "var(--button-text-size)" }}>
  Click Me
</button>
```

## Migration Guide

### From Hardcoded Tailwind to Theme System

**Before:**

```tsx
<div className="bg-blue-500 text-white">
    <h1 className="text-4xl font-bold">Title</h1>
    <p className="text-lg text-gray-600">Description</p>
</div>
```

**After:**

```tsx
<div className="bg-(--color-primary) text-(--color-primary-foreground)">
    <h1 className="text-h1 font-bold">Title</h1>
    <p className="text-body theme-text-muted">Description</p>
</div>
```

### From Old Typography to New Scale

Replace these hardcoded classes:

| Old Class   | New Class      | Variable               |
| ----------- | -------------- | ---------------------- |
| `text-3xl`  | `text-h1`      | `--typography-h1`      |
| `text-2xl`  | `text-h2`      | `--typography-h2`      |
| `text-xl`   | `text-h3`      | `--typography-h3`      |
| `text-lg`   | `text-h4`      | `--typography-h4`      |
| `text-base` | `text-body`    | `--typography-body`    |
| `text-sm`   | `text-small`   | `--typography-small`   |
| `text-xs`   | `text-caption` | `--typography-caption` |

## Benefits

✅ **Consistent Typography** - Standardized scale across all components
✅ **Mobile-First** - Automatically responsive text sizing
✅ **Theme-Aware** - All colors respect the current theme
✅ **Maintainable** - Change once in JSON, applies everywhere
✅ **Portable** - Themes are JSON files that can be shared
✅ **Type Safe** - Full TypeScript support (coming soon)
✅ **Real-time** - Changes apply instantly without rebuild
✅ **Accessible** - Semantic naming improves code readability

## Troubleshooting

### Text not resizing on mobile?

- Ensure you're using utility classes (`.text-h1`) not direct CSS variables
- Check that globals.css has the `@media` queries defined
- Verify the theme JSON has both base and `-desktop` variants

### Colors not updating when theme changes?

- Use CSS variables (`bg-(--color-primary)`) not hardcoded colors
- Check ThemeContext is wrapping your app in `layout.tsx`
- Verify theme JSON has all required color properties

### Custom variable not working?

- Ensure it's defined in all theme JSON files
- Check ThemeContext applies it (auto-applied for standard properties)
- Use correct syntax: `var(--your-variable)` in CSS, `--your-variable` in Tailwind

## Contributor Guidelines

### Before Adding New Variables

**Ask yourself:**

1. Can I use an existing typography scale? (h1-h6, body, small, caption)
2. Can I use an existing color variable?
3. Is this truly component-specific, or can it be generalized?
4. Does it follow the naming pattern?

### Adding New Typography Scales

**Only add if:**

- It represents a new semantic meaning (not location/component)
- It's reusable across multiple components
- It doesn't overlap with existing scales

**Process:**

1. Add to both theme JSON files (default.json, yomologic-dark.json)
2. Add CSS variable to globals.css `:root`
3. Create utility class in globals.css
4. Add responsive variant with `@media (min-width: 1024px)`
5. Document in this file under "Typography Naming Standards"

```json
// 1. Add to theme JSON
{
    "typography": {
        "your-scale": "0.9375rem",
        "your-scale-desktop": "1rem"
    }
}
```

```css
/* 2. Add to globals.css :root */
--typography-your-scale: 0.9375rem;
--typography-your-scale-desktop: 1rem;

/* 3. Create utility class */
.text-your-scale {
    font-size: var(--typography-your-scale);
}

/* 4. Add responsive variant */
@media (min-width: 1024px) {
    .text-your-scale {
        font-size: var(--typography-your-scale-desktop);
    }
}
```

### Adding New Colors

**Only add if:**

- It's a core theme color (not one-off use)
- It needs to work across light/dark themes
- It has semantic meaning (not just "blue" or "red")

**Process:**

1. Add to both theme JSON files with consistent naming
2. ThemeContext automatically applies it as `--color-{name}`
3. Document usage in this file

```json
// Add to theme JSON
{
    "colors": {
        "accent": "#f59e0b",
        "accent-hover": "#d97706",
        "accent-foreground": "#ffffff"
    }
}
```

```tsx
// Use directly (auto-applied by ThemeContext)
<div className="bg-(--color-accent) text-(--color-accent-foreground)">
```

### Adding Component-Specific Variables

**Last resort only** - Prefer semantic reuse

**Allowed when:**

- Property is truly unique to one component (checkbox size, slider thumb size)
- Can't be expressed with existing variables
- Multiple related properties need to scale together

**Process:**

1. Add to theme JSON under `components` section
2. ThemeContext auto-converts to `--{component}-{property}`
3. Use hyphens in property names (they become dashes in CSS)

```json
// theme JSON
{
    "components": {
        "slider": {
            "thumb-size": "1.5rem",
            "track-height": "0.5rem"
        }
    }
}
```

```css
/* Auto-generated CSS variables */
--slider-thumb-size: 1.5rem;
--slider-track-height: 0.5rem;
```

### Review Checklist

Before submitting PR with new variables:

- [ ] Checked existing variables first
- [ ] Followed naming pattern exactly
- [ ] Added to ALL theme JSON files
- [ ] Created utility classes if needed
- [ ] Added responsive variants for typography
- [ ] Tested in both light and dark themes
- [ ] Updated this documentation
- [ ] No hardcoded Tailwind classes remain

### Code Review Focus

Reviewers should check:

- ✅ Variable names follow standards
- ✅ No component-specific typography (drawer-title, button-text)
- ✅ No hardcoded colors or sizes
- ✅ Utility classes used where available
- ✅ Responsive typography variants defined
- ✅ Works in both themes

## Future Enhancements

- [ ] TypeScript interfaces for theme JSON validation
- [ ] Theme builder UI for visual customization
- [ ] Color palette generator (auto-generate shades)
- [ ] Multiple preset themes (Light, Dark, High Contrast, Accessibility)
- [ ] Theme marketplace/sharing platform
- [ ] CSS export (generate static CSS from theme)
- [ ] Accessibility checker (contrast ratios, WCAG compliance)
- [ ] Animation/transition theming
- [ ] Shadow/elevation system
- [ ] Pre-commit hook to validate CSS variable naming
- [ ] ESLint rule to prevent hardcoded colors/sizes
