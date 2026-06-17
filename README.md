# @yomologic/react-ui

A modern, lightweight React UI component library built with TypeScript and Tailwind CSS.

> **📚 [View Full Documentation & Live Examples →](https://react-ui.yomologic.com/)**

## Features

- 🎨 **Themeable** - Built-in dark theme with CSS variables
- 🎯 **TypeScript** - Complete type safety
- 📦 **Tree-shakeable** - Import only what you need
- ⚡ **Framework-agnostic** - Works with Next.js, Remix, Vite, etc.
- ♿ **Accessible** - ARIA compliant
- 📱 **Responsive** - Mobile-first design

## Installation

```bash
npm install @yomologic/react-ui
# or
yarn add @yomologic/react-ui
```

## Quick Start

```tsx
import "@yomologic/react-ui/dist/base.css";
import "@yomologic/react-ui/dist/styles.css";
import { Button, Card, Input } from "@yomologic/react-ui";

function App() {
    return (
        <Card padding="lg">
            <Input label="Email" type="email" />
            <Button variant="primary">Submit</Button>
        </Card>
    );
}
```

## Theming

Override CSS variables to customize the built-in dark theme:

```css
/* custom-theme.css */
:root {
    --color-primary: #3b82f6;
    --color-primary-hover: #2563eb;
    --color-background: #ffffff;
    --color-foreground: #111827;
    --color-muted: #f3f4f6;
    --color-border: #e5e7eb;
    /* ...more variables */
}
```

Import your custom theme **after** the base styles:

```tsx
import "@yomologic/react-ui/dist/base.css";
import "@yomologic/react-ui/dist/styles.css";
import "./custom-theme.css"; // Your overrides
```

## Documentation

**Full documentation, live examples, and interactive demos:**  
👉 **[react-ui.yomologic.com](https://react-ui.yomologic.com/)**

Browse all components, see code examples, and experiment with variants in our interactive showcase.

## AI Docs

Use these files as the canonical AI reference set for this repository:

- [AI Context](./AI_CONTEXT.md) - Project orientation, source-of-truth order, and task routing
- [AI Conventions](./docs/ai/CONVENTIONS.md) - Coding and documentation standards for AI-assisted changes
- [AI Playbooks](./docs/ai/PLAYBOOKS.md) - Repeatable workflows for common implementation tasks
- [AI Prompt Templates](./docs/ai/PROMPTS.md) - Reusable prompt formats with acceptance criteria

When guidance conflicts, follow the precedence defined in [AI_CONTEXT.md](./AI_CONTEXT.md).

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

Contributions are welcome! Feel free to:

- Report bugs or request features via [GitHub Issues](https://github.com/yomologic/react-ui/issues)
- Fork the repository and submit pull requests
- Improve documentation or add examples

For development documentation, see the implementation guides in the repository.

## License

MIT
