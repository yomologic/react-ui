# Component Development Guide

> **Comprehensive guide for creating reusable UI components and showcase pages in the @yomologic/react-ui library**

## Table of Contents

1. [Overview](#overview)
2. [Component Creation Workflow](#component-creation-workflow)
3. [Showcase Page Structure](#showcase-page-structure)
4. [Theming & CSS Variables](#theming--css-variables)
5. [File Naming Conventions](#file-naming-conventions)
6. [Code Templates](#code-templates)
7. [Best Practices](#best-practices)
8. [Component Checklist](#component-checklist)

---

## Overview

Our component library follows a consistent pattern:

- **Components** live in `src/ui/` (lowercase filenames)
- **Showcase pages** live in `site/src/app/(showcase)/components/` (lowercase filenames)
- **Theming** uses JSON configuration in `src/styles/themes/` with CSS variables applied via ThemeContext
- **Four-section showcase pattern**: Live Preview + Interactive Controls + API Reference + Usage Examples
- **Navigation** uses Drawer component (right-side panel) configured in `site/src/app/(showcase)/layout.tsx`

---

## Component Creation Workflow

### Step 1: Create the Component File

**Location**: `src/ui/<component-name>.tsx`

**Naming Convention**: Use lowercase with hyphens for multi-word components

- ✅ `button.tsx`, `rating.tsx`, `code-snippet.tsx`
- ❌ `Button.tsx`, `Rating.tsx`, `CodeSnippet.tsx`

### Step 2: Define Component Interface

```tsx
export interface ComponentNameProps
    extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "primary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    // ... other props
}
```

**Key Guidelines**:

- Extend appropriate React HTML attributes for type safety
- Use optional props with sensible defaults
- Export the interface for external use

### Step 3: Implement Component with forwardRef

```tsx
import React from "react";
import { cn } from "../lib/utils";

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
    (
        { className, variant = "default", size = "md", children, ...props },
        ref
    ) => {
        // Base styles using CSS variables
        const baseStyles = "...";

        // Variant styles
        const variants = {
            default: "...",
            primary: "...",
            // ...
        };

        // Size styles
        const sizes = {
            sm: "...",
            md: "...",
            lg: "...",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ComponentName.displayName = "ComponentName";

export { ComponentName };
```

### Step 4: Export from Main Index

**CRITICAL**: Add exports to `src/index.ts` (not `src/ui/index.ts`):

```tsx
// Add to src/index.ts
export { ComponentName } from "./ui/component-name";
export type { ComponentNameProps } from "./ui/component-name";
```

**For compound components**, export all subcomponents:

```tsx
export {
    ComponentName,
    ComponentHeader,
    ComponentTitle,
    ComponentContent,
    ComponentFooter,
} from "./ui/component-name";
export type { ComponentNameProps } from "./ui/component-name";
```

**Note**: The showcase site uses path mapping (`@yomologic/react-ui` → `../src`) configured in `site/tsconfig.json`, so all exports must be in `src/index.ts` to be importable.

### Step 5: Add CSS Variables (if needed)

Update `src/styles.css`:

```css
:root {
    /* Component: ComponentName */
    --component-name-padding-sm: 0.5rem;
    --component-name-padding-md: 1rem;
    --component-name-padding-lg: 1.5rem;
    --component-name-border-radius: 0.5rem;
    /* ... */
}
```

---

## Showcase Page Structure

### Four-Section Pattern

Every showcase page should follow this structure:

1. **Live Preview** (Sticky Section)
2. **Interactive Controls**
3. **API Reference**
4. **Usage Examples** (Optional but recommended)

### Step 1: Create Showcase File

**Location**: `site/src/app/(showcase)/components/<component-name>/page.tsx`

**Naming Convention**: Lowercase folder with `page.tsx` file

- ✅ `cards/page.tsx`, `badges/page.tsx`, `buttons/page.tsx`
- ❌ `Cards/page.tsx`, `card-section.tsx`, `CardsSection.tsx`

### Step 2: Add to Drawer Navigation

Update `site/src/app/(showcase)/layout.tsx` in the `navSections` array:

```tsx
const navSections: DrawerNavSection[] = [
    {
        title: "UI Components", // Choose appropriate section
        items: [
            {
                id: "buttons",
                label: "Buttons",
                icon: <Circle className="w-5 h-5" />,
            },
            {
                id: "badges",
                label: "Badges",
                icon: <Tag className="w-5 h-5" />,
            },
            {
                id: "cards",
                label: "Cards",
                icon: <CreditCard className="w-5 h-5" />,
            },
            // Add your component here (alphabetically within section)
            {
                id: "component-name",
                label: "Component Name",
                icon: <Icon className="w-5 h-5" />,
            },
        ],
    },
    // ... other sections
];
```

**Navigation Sections**:

- **Form Components**: Inputs, Checkboxes, Radio Buttons, Dropdown
- **UI Components**: Buttons, Badges, Cards, Alerts, Rating
- **Feedback & Loading**: Loading indicators, Spinners
- **Layout**: Layout, Navigation, Drawer

**Notes**:

- Choose the most appropriate section for your component
- Add items alphabetically within each section
- The `id` must match your folder name in `components/`
- Import the icon from `lucide-react`

---

## Showcase Page Template

```tsx
import { useState } from "react";
import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { ComponentName } from "../../../../src/ui";
import { Settings2, Code2, BookOpen } from "lucide-react";

export default function ComponentNameSection() {
    // State for component props
    const [variant, setVariant] = useState<string>("default");
    const [size, setSize] = useState<string>("md");
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (variant !== "default") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);

        const propsString = props.join(" ");
        return `<ComponentName${
            props.length > 0 ? ` ${propsString}` : ""
        }>Content</ComponentName>`;
    };

    return (
        <SectionLayout hasStickyPreview>
            {/* ========================================
          SECTION 1: STICKY LIVE PREVIEW
      ======================================== */}
            <section className="sticky top-0 z-15 py-4 bg-gray-50">
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Component Name Live Preview
                            </h2>
                            <button
                                onClick={() =>
                                    setShowCodeOverlay(!showCodeOverlay)
                                }
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                                title="View code"
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                Code
                            </button>
                        </div>

                        {/* Preview Content */}
                        <div className="relative">
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="flex justify-center">
                                    <ComponentName
                                        variant={variant as any}
                                        size={size as any}
                                    >
                                        Preview Content
                                    </ComponentName>
                                </div>
                            </div>

                            {/* Code Overlay */}
                            {showCodeOverlay && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={() =>
                                            setShowCodeOverlay(false)
                                        }
                                    />
                                    {/* Overlay Card */}
                                    <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Component Code
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        setShowCodeOverlay(
                                                            false
                                                        )
                                                    }
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                                    title="Close"
                                                >
                                                    <span className="text-2xl leading-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <CodeSnippet
                                                    code={generateCode()}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 2: INTERACTIVE CONTROLS
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        {/* Variant Selection */}
                        <RadioGroup
                            label="Variant"
                            name="variant"
                            value={variant}
                            onChange={setVariant}
                            orientation="horizontal"
                            options={[
                                { value: "default", label: "Default" },
                                { value: "primary", label: "Primary" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "danger", label: "Danger" },
                            ]}
                        />

                        {/* Size Selection */}
                        <RadioGroup
                            label="Size"
                            name="size"
                            value={size}
                            onChange={setSize}
                            orientation="horizontal"
                            options={[
                                { value: "sm", label: "Small" },
                                { value: "md", label: "Medium" },
                                { value: "lg", label: "Large" },
                            ]}
                        />

                        {/* Additional Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <Checkbox
                                label="Option 1"
                                checked={false}
                                onChange={() => {}}
                            />
                            <Checkbox
                                label="Option 2"
                                checked={false}
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 3: API REFERENCE
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        variant
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;default&quot; |
                                        &quot;primary&quot; |
                                        &quot;success&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;default&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Visual style variant
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;md&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Component size
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        children
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Component content
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        className
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Additional CSS classes
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* ========================================
          SECTION 4: USAGE EXAMPLES (Optional)
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    {/* Example 1 */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Basic Usage
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ComponentName variant="primary" size="md">
                                Example Content
                            </ComponentName>
                            <CodeSnippet
                                code={`<ComponentName variant="primary" size="md">
  Example Content
</ComponentName>`}
                            />
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Advanced Usage
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ComponentName variant="success" size="lg">
                                Advanced Example
                            </ComponentName>
                            <CodeSnippet
                                code={`<ComponentName variant="success" size="lg">
  Advanced Example
</ComponentName>`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </SectionLayout>
    );
}
```

---

## Theming & CSS Variables

### Theme System Architecture

Our theme system uses:

1. **JSON Configuration**: Theme definitions in `src/styles/themes/default.json`
2. **TypeScript Types**: Theme interfaces in `src/types/theme.ts`
3. **CSS Variables**: Applied at runtime by `src/shared/contexts/ThemeContext.tsx`
4. **Global Styles**: Base styles in `site/src/app/globals.css`

### Using CSS Variables

All themeable properties should use CSS variables:

```tsx
// ✅ Good: Use CSS variables with Tailwind arbitrary values
const iconStyles =
    "[background-color:var(--card-icon-blue-bg)] [color:var(--card-icon-blue-text)]";

// ✅ Good: Tailwind utilities (for non-themeable styles)
const baseStyles = "rounded-lg p-4 flex items-center";

// ❌ Bad: Hardcoded theme colors
const iconStyles = "bg-blue-100 text-blue-600";
```

### Available CSS Variables

From `site/src/app/globals.css` (applied via ThemeContext):

#### Colors

```css
--color-primary
--color-primary-hover
--color-primary-active
--color-secondary
--color-secondary-hover
--color-success
--color-error
--color-warning
--color-info
--color-background
--color-foreground
--color-muted
--color-muted-foreground
--color-placeholder
--color-border
```

#### Spacing

```css
--spacing-xs   /* 0.25rem */
--spacing-sm   /* 0.5rem */
--spacing-md   /* 1rem */
--spacing-lg   /* 1.5rem */
--spacing-xl   /* 2rem */
--spacing-2xl  /* 2.5rem */
```

#### Border Radius

```css
--radius-none
--radius-sm    /* 0.25rem */
--radius-md    /* 0.5rem */
--radius-lg    /* 0.75rem */
--radius-xl    /* 1rem */
--radius-full  /* 9999px */
```

#### Typography

```css
--text-xs      /* 0.75rem */
--text-sm      /* 0.875rem */
--text-base    /* 1rem */
--text-lg      /* 1.125rem */
--text-xl      /* 1.25rem */
--text-2xl     /* 1.5rem */
--text-3xl     /* 1.875rem */

--font-normal    /* 400 */
--font-medium    /* 500 */
--font-semibold  /* 600 */
--font-bold      /* 700 */
```

### Adding New Theme Properties

When a component needs themeable properties:

**1. Update Theme Types** (`src/types/theme.ts`):

```typescript
export interface ComponentTheme {
    padding: {
        sm: string;
        md: string;
        lg: string;
    };
    colors?: {
        primary: { bg: string; text: string; hover: string };
        secondary: { bg: string; text: string; hover: string };
    };
}

export interface Theme {
    // ... existing themes
    component: ComponentTheme; // Add your theme
}
```

**2. Add Theme Configuration** (`src/styles/themes/default.json`):

```json
{
    "component": {
        "padding": {
            "sm": "0.5rem",
            "md": "1rem",
            "lg": "1.5rem"
        },
        "colors": {
            "primary": {
                "bg": "#dbeafe",
                "text": "#2563eb",
                "hover": "#bfdbfe"
            }
        }
    }
}
```

**3. Apply CSS Variables** (`src/shared/contexts/ThemeContext.tsx`):

```typescript
// In useEffect where CSS variables are set
const component = theme.component;
if (component.colors) {
    Object.entries(component.colors).forEach(([name, values]) => {
        root.style.setProperty(`--component-${name}-bg`, values.bg);
        root.style.setProperty(`--component-${name}-text`, values.text);
        root.style.setProperty(`--component-${name}-hover`, values.hover);
    });
}
```

**4. Define CSS Variables** (`site/src/app/globals.css`):

```css
:root {
    /* Component: YourComponent */
    --component-primary-bg: #dbeafe;
    --component-primary-text: #2563eb;
    --component-primary-hover: #bfdbfe;
}
```

**5. Use in Component**:

```tsx
const styles =
    "[background-color:var(--component-primary-bg)] [color:var(--component-primary-text)]";
```

---

## File Naming Conventions

### Components (`src/ui/`)

- **Format**: `lowercase-with-hyphens.tsx`
- **Examples**:
    - `button.tsx` ✅
    - `rating.tsx` ✅
    - `code-snippet.tsx` ✅
    - `Button.tsx` ❌
    - `Rating.tsx` ❌

### Showcase Pages (`site/src/app/(showcase)/components/`)

- **Format**: `lowercase-folder/page.tsx`
- **Structure**: Each component gets its own folder with a `page.tsx` file
- **Export**: Default export function (name doesn't matter due to Next.js file routing)
- **Examples**:
    - `cards/page.tsx` → `export default function CardsPage()` ✅
    - `badges/page.tsx` → `export default function BadgesPage()` ✅
    - `rating/page.tsx` → `export default function RatingPage()` ✅
    - `rating.tsx` ❌ (must be in folder)
    - `Cards/page.tsx` ❌ (folder must be lowercase)

### Imports & Exports

**Main index export** (`src/index.ts`):

```tsx
// Export component and types
export { Rating } from "./ui/rating";
export type { RatingProps } from "./ui/rating";

// For compound components, export all subcomponents
export {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
} from "./ui/dialog";
export type { DialogProps } from "./ui/dialog";
```

**Why `src/index.ts`?** The showcase site imports via `@yomologic/react-ui` which maps to `../src` in `site/tsconfig.json`. Only exports from `src/index.ts` are available.

**Showcase pages**: No barrel export needed - Next.js uses file-based routing

---

## Best Practices

### 1. TypeScript First

- Always export component props interface
- Use proper type annotations
- Extend appropriate HTML element types

### 2. Composition Over Configuration

- Keep components focused and single-purpose
- Allow composition through children
- Use compound components for complex UI patterns (e.g., Card with CardHeader, CardContent, CardFooter)
- Export all subcomponents from the same file
- Document subcomponents in a separate API reference table

### 3. Accessibility

- Use semantic HTML elements
- Include ARIA attributes when needed
- Support keyboard navigation
- Provide proper labels and descriptions

### 4. Performance

- Use `React.forwardRef` for ref forwarding
- Memoize expensive computations
- Avoid inline function definitions in render

### 5. Styling

- Use Tailwind CSS utility classes
- Leverage `cn()` utility for class merging
- Use CSS variables for theming
- Follow the existing design system

### 6. Documentation

- Document all props in API Reference table
- Provide real-world Usage Examples with side-by-side code
- Use CodeSnippet component for all code examples
- Include edge cases and variations
- Show both basic and advanced usage patterns

### 7. Code Quality

- Use meaningful variable names
- Keep functions small and focused
- Follow existing patterns in the codebase
- Add comments for complex logic

### 8. Interactive Controls

- Use RadioGroup for mutually exclusive options (variant, size, etc.)
- Use Checkbox for boolean toggles
- Group related controls with headings and spacing
- For nested options, show/hide based on parent checkbox state
- Keep control state in sync with live preview
- Update code generation when controls change

**Nested Checkbox Pattern** (for compound components):

```tsx
<div className="space-y-3">
    <h3 className="text-sm font-semibold text-gray-700">Card Sections</h3>
    <div className="space-y-2">
        <Checkbox
            label="Show Header"
            checked={showHeader}
            onChange={setShowHeader}
        />
        {showHeader && (
            <div className="ml-6 space-y-2">
                <Checkbox
                    label="Show Title"
                    checked={showTitle}
                    onChange={setShowTitle}
                />
                <Checkbox
                    label="Show Description"
                    checked={showDescription}
                    onChange={setShowDescription}
                />
            </div>
        )}
    </div>
</div>
```

This pattern allows users to:

- Toggle parent component visibility
- Conditionally show child component controls
- Maintain logical hierarchy in the UI

---

## Component Checklist

Use this checklist when creating a new component:

### Component Implementation

- [ ] Created component file in `src/ui/<component-name>.tsx`
- [ ] Used lowercase filename with hyphens
- [ ] Defined TypeScript interface extending appropriate HTML attributes
- [ ] Implemented with `React.forwardRef`
- [ ] Added `displayName` for debugging
- [ ] Used `cn()` utility for class merging
- [ ] Applied CSS variables for theming
- [ ] **Exported component and all subcomponents from `src/index.ts`** (not `src/ui/index.ts`)

### Showcase Page

- [ ] Created folder `site/src/app/(showcase)/components/<component-name>/`
- [ ] Created `page.tsx` file in component folder
- [ ] Used lowercase folder name matching component name
- [ ] Implemented Live Preview section (sticky with SectionLayout)
- [ ] Implemented Interactive Controls section with RadioGroup/Checkbox
- [ ] Added nested checkboxes if component has subcomponents
- [ ] Implemented API Reference section with complete props table
- [ ] Added separate Subcomponents table if applicable (see Cards example)
- [ ] Implemented Usage Examples section (optional but recommended)
- [ ] Used CodeSnippet component for all code examples
- [ ] Added code generation function for live preview
- [ ] Added code overlay functionality with close button
- [ ] Included lucide-react icons (Settings2, Code2, BookOpen)

### Navigation

- [ ] Added to `navSections` array in `site/src/app/(showcase)/layout.tsx`
- [ ] Placed in appropriate section (Form Components, UI Components, etc.)
- [ ] Added alphabetically within the section
- [ ] Used correct `id` matching folder name in `components/`
- [ ] Selected appropriate icon from lucide-react
- [ ] Verified navigation works in Drawer (right-side panel)

### Theme Integration (if needed)

- [ ] Added TypeScript interface to `src/types/theme.ts`
- [ ] Added theme configuration to `src/styles/themes/default.json`
- [ ] Updated ThemeContext to apply CSS variables
- [ ] Added CSS variable definitions to `site/src/app/globals.css`
- [ ] Made theme properties optional with `?` for backwards compatibility
- [ ] Added safety checks in ThemeContext (e.g., `if (theme.component?.property)`)
- [ ] Documented theme variables in showcase page

### Testing

- [ ] Tested all prop variations
- [ ] Verified responsive behavior
- [ ] Checked accessibility with screen reader
- [ ] Tested keyboard navigation
- [ ] Verified showcase page renders correctly

### Documentation

- [ ] Completed API Reference table
- [ ] Added meaningful descriptions for all props
- [ ] Included code examples
- [ ] Documented edge cases

### Final Review

- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Follows existing code patterns
- [ ] Consistent with design system
- [ ] Ready for review/merge

---

## Examples

### Simple Component Example: Badge

**Component** (`src/ui/badge.tsx`):

```tsx
import React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
    size?: "sm" | "md" | "lg";
    dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = "default",
            size = "md",
            dot = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = "inline-flex items-center font-medium rounded-full";

        const variants = {
            default: "bg-gray-100 text-gray-800",
            primary: "bg-blue-100 text-blue-800",
            success: "bg-green-100 text-green-800",
            warning: "bg-yellow-100 text-yellow-800",
            danger: "bg-red-100 text-red-800",
            info: "bg-cyan-100 text-cyan-800",
        };

        const sizes = {
            sm: "text-xs px-2 py-0.5",
            md: "text-sm px-2.5 py-1",
            lg: "text-base px-3 py-1.5",
        };

        const dotVariants = {
            default: "bg-gray-600",
            primary: "bg-blue-600",
            success: "bg-green-600",
            warning: "bg-yellow-600",
            danger: "bg-red-600",
            info: "bg-cyan-600",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {dot && (
                    <span
                        className={cn(
                            "w-2 h-2 rounded-full mr-1.5",
                            dotVariants[variant]
                        )}
                    />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
```

**Export** (`src/ui/index.ts`):

```tsx
export { Badge } from "./badge";
export type { BadgeProps } from "./badge";
```

**Showcase** (`site/src/app/sections/badges.tsx`):
See full template above - follows three-section pattern with:

1. Live Preview (sticky)
2. Interactive Controls (variant, size, dot toggle)
3. API Reference (complete prop documentation)

---

## Advanced Patterns

### Custom Interactive Controls

For components with unique props (like Rating's slider), create custom controls:

```tsx
{
    /* Custom Slider with Visual Feedback */
}
<div className="space-y-3">
    <label className="block text-sm font-semibold text-gray-700">
        Rating Value: {value.toFixed(1)}
    </label>
    <div className="relative">
        <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--color-warning)"
            style={{
                background: `linear-gradient(to right, var(--color-warning) 0%, var(--color-warning) ${
                    (value / 5) * 100
                }%, #e5e7eb ${(value / 5) * 100}%, #e5e7eb 100%)`,
            }}
        />
        {/* Add visual indicators */}
        <div className="flex justify-between mt-2">
            {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                    key={num}
                    onClick={() => setValue(num)}
                    className="text-xs text-gray-500"
                >
                    {num}
                </button>
            ))}
        </div>
    </div>
</div>;
```

### Compound Components

For complex components with multiple subcomponents (like Card):

```tsx
// card.tsx - Define all components in one file
const Card = React.forwardRef<HTMLDivElement, CardProps>(/* ... */);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold", className)}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Export all from same file
export { Card, CardHeader, CardTitle, CardContent };
```

**Showcase Documentation**:

- Add a separate "Card Subcomponents" table after the main API Reference (see Cards example)
- Include columns: Component, Description, Default Styles
- Show usage examples with proper composition
- Include nested checkboxes to toggle subcomponents in interactive controls

Example Subcomponents Table Structure:

```tsx
<div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Card Subcomponents
    </h3>
    <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Component
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Default Styles
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                            CardHeader
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            Container for card header content
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            flex flex-col space-y-1.5
                        </td>
                    </tr>
                    {/* More rows... */}
                </tbody>
            </table>
        </div>
    </Card>
</div>
```

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons
- **React forwardRef**: https://react.dev/reference/react/forwardRef
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/

---

## Questions or Improvements?

This guide should evolve with the component library. If you encounter patterns not covered here or have suggestions for improvement, update this document to help future contributors.

---

**Last Updated**: November 21, 2025
