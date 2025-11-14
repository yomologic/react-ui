# Showcase Sections

This folder contains individual section components for the component showcase page.

## Structure

Each section is a separate file that demonstrates a specific category of components:

- **buttons-section.tsx** - Button variants, sizes, icons, loading states
- **inputs-section.tsx** - Form inputs with icons, validation, helper text
- **cards-section.tsx** - Card variants, hoverable states, padding options
- **badges-section.tsx** - Badge variants, sizes, indicator dots
- **feedback-section.tsx** - Alerts, spinners, empty states
- **layout-section.tsx** - Container components and layout helpers
- **examples-section.tsx** - Real-world component combinations

## Usage

All sections are exported from `index.ts` for easy importing:

```tsx
import { ButtonsSection, InputsSection } from "./sections";
```

## Props

Sections that need interactive state receive props:

- **ButtonsSection**: `{ loading, setLoading }`
- **FeedbackSection**: `{ showAlert, setShowAlert }`
- Others: No props needed
