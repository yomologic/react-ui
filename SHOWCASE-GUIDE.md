# Showcase Page Implementation Guide

This guide provides a standardized approach for creating and maintaining component showcase pages in the react-ui documentation site.

## Overview

Showcase pages demonstrate component variations through **interactive examples** where users control a single component instance via RadioGroups or Checkboxes. Each example displays the live component and its corresponding code side-by-side.

## Core Principles

1. **Single Component Display**: Show one component instance per example, not all variations at once
2. **Interactive Controls**: Use RadioGroups (for mutually exclusive options) or Checkboxes (for toggles)
3. **Side-by-Side Layout**: Live component on left, code snippet on right (stacks on mobile)
4. **Always-Visible Code**: Keep code snippets visible at all times for immediate feedback
5. **Horizontal Controls**: RadioGroups use horizontal orientation with automatic wrapping
6. **Simple Component Titles**: Use just the component name (e.g., "Button", "Input", "Checkbox") without "Usage Examples"
7. **Dynamic Code**: Code snippets update in real-time to reflect current selections
8. **SectionLayout Wrapper**: Always wrap pages in `<SectionLayout>` component for consistent structure

## File Structure

```typescript
"use client";

import { useState } from "react";
import {
  Card,
  CodeSnippet,
  SectionLayout,
  RadioGroup,
  Checkbox,
  Divider,
} from "@yomologic/react-ui";
import { ComponentName } from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";

export default function ComponentNamePage() {
  // State management for each example
  const [stateVariable, setStateVariable] = useState<Type>("defaultValue");

  return (
    <SectionLayout>
      {/* ========================================
          SECTION 1: COMPONENT EXAMPLES
      ======================================== */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Component Name
        </h2>
        <div className="space-y-6">
          {/* Example sections */}
        </div>
      </section>

      <Divider className="my-12" />

      {/* ========================================
          SECTION 2: API REFERENCE
      ======================================== */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          API Reference
        </h2>
        {/* API table */}
      </section>
    </SectionLayout>
  );
}
```

## Example Section Pattern

Each example follows this structure with **specific ordering**:

```typescript
{/* Example Name */}
<Card variant="bordered" padding="lg">
  <h3 className="text-lg font-semibold text-gray-900 mb-3">
    Example Name
  </h3>
  <div className="space-y-4">
    <p className="text-sm text-gray-600">
      Brief description of what this example demonstrates.
    </p>

    {/* Two-column layout: component + code */}
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Left: Display FIRST, then Controls */}
      <div className="flex-1 min-w-0">
        <div className="space-y-4">
          {/* 1. Component Display - FIRST */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <ComponentName prop={stateVariable}>
              Simple Text
            </ComponentName>
          </div>

          {/* 2. Controls - SECOND */}
          <RadioGroup
            label="Select Option"
            name="exampleControl"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            value={stateVariable}
            onChange={setStateVariable}
            orientation="horizontal"
          />
        </div>
      </div>

      {/* 3. Code Snippet - THIRD (Right side) */}
      <div className="flex-1 min-w-0">
        <CodeSnippet
          language="tsx"
          code={`<ComponentName prop="${stateVariable}">
  Simple Text
</ComponentName>`}
        />
      </div>
    </div>
  </div>
</Card>
```

### Critical Ordering Rules:

1. **Display Area** - Always show the component first (top)
2. **Controls** - Interactive controls below the display
3. **Code Snippet** - On the right side (stacks below on mobile)
4. **API Reference** - At the bottom of the page with Divider separator## Layout & Styling Requirements

### Container Layout

```typescript
className = "flex flex-col sm:flex-row gap-6";
```

- **Mobile**: Single column (stacked vertically)
- **Desktop**: Two columns (side-by-side)
- **Gap**: 1.5rem between columns

### Column Containers

```typescript
className = "flex-1 min-w-0";
```

- **flex-1**: Equal width columns
- **min-w-0**: Prevents overflow (critical for mobile)

### RadioGroup Configuration

```typescript
orientation = "horizontal";
```

- Displays options in a row
- Automatically wraps on mobile
- Uses `flex flex-wrap gap-4` internally

### Card Styling

```typescript
className = "flex-1 p-6 min-w-0";
```

- Consistent padding
- Prevents content overflow

## State Management Patterns

### RadioGroup State (Mutually Exclusive)

```typescript
const [selectedVariant, setSelectedVariant] = useState<"default" | "primary" | "secondary">("default");

<RadioGroup
  options={[
    { value: "default", label: "Default" },
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
  ]}
  value={selectedVariant}
  onChange={setSelectedVariant}
  orientation="horizontal"
/>
```

### Checkbox State (Boolean Toggle)

```typescript
const [showIcon, setShowIcon] = useState(false);

<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showIcon}
    onChange={(e) => setShowIcon(e.target.checked)}
    className="rounded border-gray-700"
  />
  <span className="text-sm">Show Icon</span>
</label>
```

## Dynamic Code Generation

Code snippets must update dynamically based on user selections:

```typescript
<CodeSnippet
  language="tsx"
  code={`<Button
  variant="${selectedVariant}"${selectedSize !== "md" ? `\n  size="${selectedSize}"` : ""}${showIcon ? `\n  leftIcon={<Icon />}` : ""}>
  YOMOLOGIC
</Button>`}
/>
```

### Best Practices for Dynamic Code:

1. Use template literals with embedded state variables
2. Conditionally include props only when non-default
3. Maintain proper indentation in multi-line examples
4. Escape quotes inside template literals: `\"`
5. Use `\n` for line breaks in code strings

## Component Text Standards

Use **simple, meaningful, static text** that reflects real-world usage:

**Examples:**

- Buttons: "Click Me", "Submit", "Save Changes", "Learn More"
- Badges: "New", "Beta", "Featured", "Active"
- Alerts: Contextual messages matching the variant
- Form inputs: Placeholder text like "Enter email", "Search..."
- Helper text: Use proper apostrophes without escaping (e.g., "We'll never share your email")

**Why?** Clear, contextual labels help users understand typical use cases without being overly branded or repetitive. Static text (no dynamic generation) keeps examples simple and readable.

## Page Structure & Visual Separation

### Standard Page Layout

```typescript
<SectionLayout>
  {/* ========================================
      SECTION 1: COMPONENT EXAMPLES
  ======================================== */}
  <section>
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Component Name
    </h2>
    <div className="space-y-6">
      {/* Multiple example cards */}
    </div>
  </section>

  <Divider className="my-12" />

  {/* ========================================
      SECTION 2: API REFERENCE
  ======================================== */}
  <section>
    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <BookOpen className="w-5 h-5" />
      API Reference
    </h2>
    {/* API table */}
  </section>
</SectionLayout>
```

### Key Structure Requirements

1. **Always use `<SectionLayout>` wrapper** - Never use plain `<div>` wrapper
2. **Component name as title** - Use just "Button", "Input", etc. (not "Button Usage Examples")
3. **Section comments** - Add visual separator comments above each section
4. **Two main sections** - Examples first, then API Reference after divider
5. **Consistent spacing** - Use `space-y-6` for examples container

### Required Imports

```typescript
import {
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { ComponentName } from "@yomologic/react-ui"; // Your component
import { BookOpen } from "lucide-react";
import { useState } from "react";
```

**Note:** Always import `SectionLayout` - it's required for all showcase pages.ort {
ComponentName,
Card,
CodeSnippet,
SectionLayout,
RadioGroup,
Checkbox,
Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

````

### Key Visual Elements

- **Divider with spacing**: `<Divider className="my-12" />` before API Reference
- **Display background**: `p-6 bg-gray-50 rounded-lg border border-gray-200`
- **Card wrapper**: Each example in `<Card variant="bordered" padding="lg">`
- **Icon for API**: `<BookOpen className="w-5 h-5" />` next to API Reference heading

## Complete Example Reference

See `/site/src/app/(showcase)/components/buttons/page.tsx` for a fully implemented reference with:

- ✓ Multiple interactive examples
- ✓ RadioGroup and Checkbox controls
- ✓ Horizontal orientation
- ✓ Dynamic code generation
- ✓ Proper mobile responsiveness
- ✓ Standardized text

## Common Examples to Include

### For Most Components:

1. **Variants**: Different visual styles (default, primary, secondary, etc.)
2. **Sizes**: Size variations (xs, sm, md, lg, xl)
3. **States**: Interactive states (loading, disabled, active)
4. **Icons**: Icon placement options (left, right, both, none)
5. **Full Width**: Responsive width behavior

### Conditional Examples:

- **Semantic Variants**: For components with meaning (success, warning, error, info)
- **Dot Indicators**: For badges or status components
- **Animations**: For components with transition effects

## Mobile Responsiveness Checklist
## Code Quality Checklist

- [ ] Page uses `<SectionLayout>` wrapper (not `<div>`)
- [ ] All imports are used (including SectionLayout, Divider, BookOpen)
- [ ] Section title is just component name (e.g., "Button" not "Button Usage Examples")
- [ ] Section comments added above each section
- [ ] State types are properly defined
- [ ] RadioGroup has `label` and `name` props
- [ ] RadioGroup options have consistent structure
- [ ] Checkboxes use Checkbox component (not HTML input)
- [ ] Code snippets match actual rendered component
- [ ] Dynamic code includes all conditional props
- [ ] No apostrophe escaping issues in template literals
- [ ] No console errors or warnings
- [ ] Page follows "use client" directive
- [ ] Display appears BEFORE controls
- [ ] Divider separates examples from API Reference
- [ ] API Reference has BookOpen icon
- [ ] All imports are used (including Divider, BookOpen)
- [ ] State types are properly defined
- [ ] RadioGroup has `label` and `name` props
- [ ] RadioGroup options have consistent structure
- [ ] Checkboxes use Checkbox component (not HTML input)
- [ ] Code snippets match actual rendered component
- [ ] Dynamic code includes all conditional props
- [ ] No console errors or warnings
- [ ] Page follows "use client" directive
- [ ] Component description is clear and concise
- [ ] Display appears BEFORE controls
### Converting Static to Interactive Showcase:

1. **Wrap** page in `<SectionLayout>` (remove plain div wrapper)
2. **Update** title to just component name
3. **Add** section comments above each section
4. **Remove** grid layouts showing all variations
5. **Add** useState hooks for each controllable property
6. **Replace** multiple components with single instance
7. **Add** RadioGroups/Checkboxes for user control
8. **Update** layout to `flex flex-col sm:flex-row gap-6`
9. **Change** RadioGroup orientation to horizontal
10. **Add** dynamic code generation
11. **Add** Divider before API Reference
12. **Test** mobile responsiveness and no parsing errors for user control
**Before (Static with old wrapper):**

```typescript
<div className="space-y-12">
  <div>
    <h1 className="text-4xl font-bold mb-4">Button</h1>
    <p className="text-lg text-gray-600">Description...</p>
  </div>

  <div className="grid grid-cols-3 gap-4">
    <Button variant="default">Button</Button>
    <Button variant="primary">Button</Button>
    <Button variant="secondary">Button</Button>
  </div>
</div>
````

**After (Interactive with SectionLayout):**

````typescript
const [selectedVariant, setSelectedVariant] = useState<"default" | "primary" | "secondary">("default");

<SectionLayout>
  {/* ========================================
      SECTION 1: COMPONENT EXAMPLES
  ======================================== */}
  <section>
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Button
    </h2>
    <div className="space-y-6">
      <Card variant="bordered" padding="lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Button Variants</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <Button variant={selectedVariant}>Click Me</Button>
                </div>

                <RadioGroup
                  label="Select Variant"
                  name="buttonVariant"
                  value={selectedVariant}
                  onChange={setSelectedVariant}
                  orientation="horizontal"
                  options={[
                    { value: "default", label: "Default" },
                    { value: "primary", label: "Primary" },
                    { value: "secondary", label: "Secondary" },
                  ]}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <CodeSnippet
                language="tsx"
                code={`<Button variant="${selectedVariant}">
  Click Me
</Button>`}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </section>
</SectionLayout>
``` <CodeSnippet
      language="tsx"
      code={`<Button variant="${selectedVariant}">
  YOMOLOGIC
</Button>`}
    />
  </div>
</div>
````

## Tips & Tricks

### Handling Complex Props

For props with many options, consider grouping related examples:

```typescript
// Instead of one example with 20 radio options
// Split into logical groups:
// - Example 1: Basic Variants (3-5 options)
// - Example 2: Semantic Variants (4 options)
// - Example 3: Sizes (5 options)
```

### Optional Props in Code Snippets

Only show props that differ from defaults:

```typescript
code={`<Button${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "md" ? ` size="${size}"` : ""}>
  YOMOLOGIC
</Button>`}
```

### Multi-State Examples

Combine multiple controls when they work together:

```typescript
const [iconPosition, setIconPosition] = useState<"left" | "right" | "both" | "none">("none");

// Then conditionally render icons based on position
{iconPosition === "left" || iconPosition === "both" ? <Icon /> : null}
```

## Troubleshooting

### Code Snippet Overflow on Mobile

- **Problem**: Code pushes outside viewport
- **Solution**: Ensure CodeSnippet parent has `min-w-0` class

### RadioGroup Takes Too Much Space

- **Problem**: Vertical RadioGroup crowds mobile view
- **Solution**: Use `orientation="horizontal"` to enable wrapping

### Page Jumping When Changing Options

- **Problem**: Layout shifts when component size changes
- **Solution**: Use consistent container heights or min-heights

### Code Not Updating

- **Problem**: Code snippet shows static values
- **Solution**: Use template literals with `${}` interpolation

## Related Documentation

- [Component Development Guide](./COMPONENT-DEVELOPMENT-GUIDE.md)
- [Component Library](./COMPONENT-LIBRARY.md)
- [Theme System](./THEME_SYSTEM.md)

## Reference Implementation

**Best Example:** `/site/src/app/(showcase)/components/buttons/page.tsx`

This file demonstrates all patterns and best practices outlined in this guide.
