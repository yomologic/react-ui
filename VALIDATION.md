# Input Validation

A lightweight validation system for form inputs with custom validation functions.

## Features

- ✅ **Simple API** - Pass a validation function to any input
- ✅ **Sync & Async** - Supports both synchronous and asynchronous validation
- ✅ **Real-time Feedback** - Validates on change and blur
- ✅ **Required Indicator** - Automatic asterisk for required fields
- ✅ **Flexible** - Use with or without form libraries
- ✅ **Control-specific** - Each control validates itself

## Basic Usage

```tsx
import { FormControl, Input } from "@yomologic/react-ui";
import { useState } from "react";

function MyForm() {
    const [error, setError] = useState<string>();

    return (
        <FormControl label="Email" required error={error}>
            <Input
                type="email"
                validate={(value) => {
                    if (!value) return "Email is required";
                    if (!value.includes("@")) return "Invalid email";
                    return undefined; // No error
                }}
                onValidationError={setError}
            />
        </FormControl>
    );
}
```

## Required Fields

Add the `required` prop to FormControl to show an asterisk in the label:

```tsx
<FormControl label="Name" required>
    <Input />
</FormControl>
```

## Async Validation

Validation functions can be async for API calls:

```tsx
<Input
    validate={async (value) => {
        const response = await fetch(`/api/check?username=${value}`);
        const { available } = await response.json();
        return available ? undefined : "Username already taken";
    }}
    onValidationError={setError}
/>
```

## Multiple Validations

Combine multiple validation rules:

```tsx
<Input
    validate={(value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Must be at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Must contain uppercase letter";
        if (!/[0-9]/.test(value)) return "Must contain a number";
        return undefined;
    }}
    onValidationError={setError}
/>
```

## API Reference

### FormControl Props

| Prop         | Type      | Description              |
| ------------ | --------- | ------------------------ |
| `required`   | `boolean` | Shows asterisk in label  |
| `error`      | `string`  | Error message to display |
| `label`      | `string`  | Field label              |
| `helperText` | `string`  | Helper text below input  |

### Input Props

| Prop                | Type                                                                     | Description                            |
| ------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `validate`          | `(value: string) => string \| undefined \| Promise<string \| undefined>` | Validation function                    |
| `onValidationError` | `(error: string \| undefined) => void`                                   | Callback when validation error changes |

## Design Philosophy

- **Lightweight** - No external validation libraries required
- **Optional** - Works with React Hook Form, Formik, Zod, or standalone
- **Flexible** - Each control manages its own validation
- **Non-blocking** - Doesn't interfere with other validation approaches

## Examples

See the [Validation showcase page](/components/validation) for interactive examples.
