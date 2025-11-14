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
- **Showcase pages** live in `site/src/app/sections/` (lowercase filenames)
- **Theming** uses CSS variables defined in `src/styles.css`
- **Three-section showcase pattern**: Live Preview + Interactive Controls + API Reference

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
        className={cn(baseStyles, variants[variant], sizes[size], className)}
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

### Step 4: Export from Barrel File

Add to `src/ui/index.ts`:

```tsx
export { ComponentName } from "./component-name";
export type { ComponentNameProps } from "./component-name";
```

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

### Three-Section Pattern

Every showcase page should follow this structure:

1. **Live Preview** (Sticky Section)
2. **Interactive Controls**
3. **API Reference**

### Step 1: Create Showcase File

**Location**: `site/src/app/sections/<component-name>.tsx`

**Naming Convention**: Lowercase, matching component file name

- ✅ `rating.tsx`, `badges.tsx`, `code-snippet.tsx`
- ❌ `Rating.tsx`, `rating-section.tsx`, `RatingSection.tsx`

### Step 2: Export from Index

Add to `site/src/app/sections/index.ts`:

```tsx
export { default as ComponentNameSection } from "./component-name";
```

### Step 3: Add to Navigation

Update `site/src/app/page.tsx`:

```tsx
// 1. Add to SectionId type (alphabetically)
type SectionId =
  | "alert"
  | "badges"
  | "component-name" // ← Add here
  | "buttons";
// ...

// 2. Add to navItems array (alphabetically)
const navItems: NavItem[] = [
  { id: "alert", label: "Alerts", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "badges", label: "Badges", icon: <Tag className="w-5 h-5" /> },
  {
    id: "component-name",
    label: "Component Name",
    icon: <Icon className="w-5 h-5" />,
  }, // ← Add here
  // ...
];

// 3. Add to renderSectionContent (alphabetically)
function renderSectionContent(sectionId: SectionId) {
  switch (sectionId) {
    case "alert":
      return <AlertSection />;
    case "badges":
      return <BadgesSection />;
    case "component-name":
      return <ComponentNameSection />; // ← Add here
    // ...
  }
}
```

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
                onClick={() => setShowCodeOverlay(!showCodeOverlay)}
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
                  <ComponentName variant={variant as any} size={size as any}>
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
                    onClick={() => setShowCodeOverlay(false)}
                  />
                  {/* Overlay Card */}
                  <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                    <Card variant="elevated" padding="none">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Component Code
                        </h4>
                        <button
                          onClick={() => setShowCodeOverlay(false)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          title="Close"
                        >
                          <span className="text-2xl leading-none">×</span>
                        </button>
                      </div>
                      <div className="p-4">
                        <CodeSnippet code={generateCode()} />
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
              <Checkbox label="Option 1" checked={false} onChange={() => {}} />
              <Checkbox label="Option 2" checked={false} onChange={() => {}} />
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
                    &quot;default&quot; | &quot;primary&quot; |
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
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
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
    </SectionLayout>
  );
}
```

---

## Theming & CSS Variables

### Using CSS Variables

All components should use CSS variables for theming consistency:

```tsx
// ✅ Good: Use CSS variables
const baseStyles =
  "bg-[var(--color-background)] text-[var(--color-foreground)]";

// ❌ Bad: Hardcoded values
const baseStyles = "bg-white text-black";
```

### Available CSS Variables

From `src/styles.css`:

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

### Adding New CSS Variables

When creating a new component that needs custom variables:

```css
:root {
  /* Component: YourComponent */
  --your-component-padding-sm: 0.5rem;
  --your-component-padding-md: 1rem;
  --your-component-padding-lg: 1.5rem;
  --your-component-border-radius: var(--radius-md);
  --your-component-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
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

### Showcase Pages (`site/src/app/sections/`)

- **Format**: `lowercase-with-hyphens.tsx` (matching component name)
- **Export**: Default export named `ComponentNameSection`
- **Examples**:
  - `rating.tsx` → `export default function RatingSection()` ✅
  - `badges.tsx` → `export default function BadgesSection()` ✅
  - `rating-section.tsx` ❌
  - `RatingSection.tsx` ❌

### Imports & Exports

**Component barrel export** (`src/ui/index.ts`):

```tsx
// Export component and types
export { Rating } from "./rating";
export type { RatingProps } from "./rating";
```

**Showcase barrel export** (`site/src/app/sections/index.ts`):

```tsx
// Export with descriptive name
export { default as RatingSection } from "./rating";
```

---

## Best Practices

### 1. TypeScript First

- Always export component props interface
- Use proper type annotations
- Extend appropriate HTML element types

### 2. Composition Over Configuration

- Keep components focused and single-purpose
- Allow composition through children
- Use compound components when appropriate

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
- Provide code examples in showcase
- Include edge cases and variations

### 7. Code Quality

- Use meaningful variable names
- Keep functions small and focused
- Follow existing patterns in the codebase
- Add comments for complex logic

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
- [ ] Exported component and interface from `src/ui/index.ts`

### Showcase Page

- [ ] Created showcase file in `site/src/app/sections/<component-name>.tsx`
- [ ] Used lowercase filename matching component name
- [ ] Implemented Live Preview section (sticky)
- [ ] Implemented Interactive Controls section
- [ ] Implemented API Reference section
- [ ] Added code generation function
- [ ] Added code overlay functionality
- [ ] Exported from `site/src/app/sections/index.ts`

### Navigation

- [ ] Added to `SectionId` type (alphabetically)
- [ ] Added to `navItems` array (alphabetically)
- [ ] Added to `renderSectionContent` switch (alphabetically)
- [ ] Selected appropriate icon from lucide-react

### CSS Variables (if needed)

- [ ] Added component-specific CSS variables to `src/styles.css`
- [ ] Used descriptive variable names
- [ ] Referenced existing variables where applicable

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
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn("w-2 h-2 rounded-full mr-1.5", dotVariants[variant])}
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

For complex components with sub-components:

```tsx
// Component
export const Card = () => {
  /* ... */
};
export const CardHeader = () => {
  /* ... */
};
export const CardTitle = () => {
  /* ... */
};
export const CardContent = () => {
  /* ... */
};

// Export
export { Card, CardHeader, CardTitle, CardContent } from "./card";
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

**Last Updated**: November 14, 2025
