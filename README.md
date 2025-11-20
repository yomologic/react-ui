# @yomologic/react-ui

A modern, lightweight React UI component library built with TypeScript and designed for flexibility and ease of use.

## Features

- 🎨 **Modern Design** - Clean, professional components
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript** - Full type safety
- ⚡ **Zero Dependencies** - Minimal bundle size (except lucide-react for icons)
- 🎭 **Customizable** - Easy to style and extend
- ♿ **Accessible** - Built with accessibility in mind

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
- **CodeSnippet** - Syntax-highlighted code display

### Feedback Components

- **Alert** - Contextual feedback messages (info, success, warning, error)

### Layout Components

- **Container** - Responsive page container
- **SectionLayout** - Layout wrapper for sections
- **Drawer** - Navigation drawer/sidebar
- **SidebarNav** - (Deprecated, use Drawer instead)

### Shared Components

- **EmptyState** - Empty state placeholders

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

## License

MIT
