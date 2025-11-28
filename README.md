# @yomologic/react-ui

A modern, lightweight React UI component library built with TypeScript and designed for flexibility and ease of use.

## Features

- 🎨 **Modern Design** - Clean, professional components inspired by Tailwind UI
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript** - Full type safety
- ⚡ **Lightweight** - Minimal dependencies
- 🎭 **Themeable** - CSS variables for easy customization
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Mobile-first design patterns

## Installation

```bash
# Using yarn
yarn add @yomologic/react-ui

# Using npm
npm install @yomologic/react-ui
```

## Usage

```tsx
import { Button, Input, Card } from "@yomologic/react-ui";

function App() {
    return (
        <Card padding="lg">
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Button variant="primary" size="md">
                Submit
            </Button>
        </Card>
    );
}
```

## Components

### UI Components

- **Button** - Interactive buttons with variants (primary, secondary, outline, ghost, danger)
- **Input** - Text inputs with labels, icons, and validation states
- **Card** - Flexible container with variants and padding options
- **Badge** - Status indicators and labels
- **Checkbox** - Single checkboxes and checkbox groups
- **RadioGroup** - Radio button groups for single selections
- **Dropdown** - Select dropdowns with search and custom options
- **Spinner** - Loading indicators
- **CodeSnippet** - Syntax-highlighted code display with copy button
- **Dialog** - Modal dialogs with header, content, and footer sections
- **Divider** - Visual separators for content sections

### Feedback Components

- **Alert** - Contextual feedback messages (info, success, warning, error)

### Layout Components

- **Container** - Responsive page container with max-width constraints
- **SectionLayout** - Layout wrapper for documentation sections
- **Nav** - Navigation bar with mobile menu support (dropdown or drawer)
- **Drawer** - Slide-out drawer/sidebar for navigation

## Theming

The library uses CSS variables for theming, allowing easy customization:

```css
:root {
    --color-primary: #3b82f6;
    --color-secondary: #6b7280;
    --color-success: #10b981;
    --color-error: #ef4444;
    --color-warning: #f59e0b;
    /* ... more variables */
}
```

### Z-Index System

Components follow a structured z-index system to prevent stacking conflicts:

- **Base Layer (0-9)**: Normal content, code buttons
- **Sticky/Fixed (10-99)**: Navigation, sticky headers
- **Overlay (100-999)**: Dropdowns, popovers, drawers
- **Modal (1000-1999)**: Dialogs, tooltips
- **Notification (2000+)**: Toasts, snackbars

All z-index values are defined as CSS variables (e.g., `--z-index-nav`, `--z-index-modal`) for consistency.

## Development

```bash
# Install dependencies
yarn install

# Build the library
yarn build

# Watch mode for development
yarn dev

# Type check
yarn type-check
```

## Contributing

This is a private component library for Yomologic projects. For internal development documentation, see the implementation guides in the repository.

## License

MIT
