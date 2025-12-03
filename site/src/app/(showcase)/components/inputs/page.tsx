"use client";

import {
    Input,
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { Search, Mail, Lock, BookOpen } from "lucide-react";
import { useState } from "react";

export default function InputsPage() {
    // State for Type example
    const [selectedType, setSelectedType] = useState<string>("text");

    // State for Icons example
    const [iconPosition, setIconPosition] = useState<string>("left");

    // State for State example
    const [inputState, setInputState] = useState<string>("normal");

    // State for Label & Helper example
    const [showLabel, setShowLabel] = useState(true);
    const [showHelper, setShowHelper] = useState(true);

    // Helper functions
    const getIcon = () => {
        switch (selectedType) {
            case "email":
                return <Mail className="w-5 h-5" />;
            case "search":
                return <Search className="w-5 h-5" />;
            case "password":
                return <Lock className="w-5 h-5" />;
            default:
                return <Search className="w-5 h-5" />;
        }
    };

    const getPlaceholder = () => {
        switch (selectedType) {
            case "email":
                return "you@example.com";
            case "search":
                return "Search...";
            case "password":
                return "Enter password";
            case "number":
                return "0.00";
            case "tel":
                return "+1 (555) 000-0000";
            case "url":
                return "https://example.com";
            default:
                return "Enter text...";
        }
    };

    const getLabel = () => {
        switch (selectedType) {
            case "email":
                return "Email Address";
            case "search":
                return "Search";
            case "password":
                return "Password";
            case "number":
                return "Amount";
            case "tel":
                return "Phone Number";
            case "url":
                return "Website URL";
            default:
                return "Text Input";
        }
    };

    const getIconName = () => {
        switch (selectedType) {
            case "email":
                return "Mail";
            case "search":
                return "Search";
            case "password":
                return "Lock";
            default:
                return "Search";
        }
    };

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">Input</h2>
                <div className="space-y-6">
                    {/* Example 1: Input Types */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Input Types
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Inputs support various HTML5 input types
                                including text, email, password, search, number,
                                tel, and url.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Input
                                                type={selectedType}
                                                label={getLabel()}
                                                placeholder={getPlaceholder()}
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Type"
                                            name="inputType"
                                            value={selectedType}
                                            onChange={setSelectedType}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "text",
                                                    label: "Text",
                                                },
                                                {
                                                    value: "email",
                                                    label: "Email",
                                                },
                                                {
                                                    value: "password",
                                                    label: "Password",
                                                },
                                                {
                                                    value: "search",
                                                    label: "Search",
                                                },
                                                {
                                                    value: "number",
                                                    label: "Number",
                                                },
                                                { value: "tel", label: "Tel" },
                                                { value: "url", label: "URL" },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input${selectedType !== "text" ? `\n  type="${selectedType}"` : ""}\n  label="${getLabel()}"\n  placeholder="${getPlaceholder()}"\n/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Icons */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Input Icons
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Add icons to the left or right side of the input
                                to provide visual context.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Input
                                                type={selectedType}
                                                label={getLabel()}
                                                placeholder={getPlaceholder()}
                                                leftIcon={
                                                    iconPosition === "left" ||
                                                    iconPosition === "both"
                                                        ? getIcon()
                                                        : undefined
                                                }
                                                rightIcon={
                                                    iconPosition === "right" ||
                                                    iconPosition === "both"
                                                        ? getIcon()
                                                        : undefined
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Icon Position"
                                            name="iconPosition"
                                            value={iconPosition}
                                            onChange={setIconPosition}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "none",
                                                    label: "None",
                                                },
                                                {
                                                    value: "left",
                                                    label: "Left",
                                                },
                                                {
                                                    value: "right",
                                                    label: "Right",
                                                },
                                                {
                                                    value: "both",
                                                    label: "Both",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input\n  type="${selectedType}"\n  label="${getLabel()}"\n  placeholder="${getPlaceholder()}"${iconPosition === "left" || iconPosition === "both" ? `\n  leftIcon={<${getIconName()} />}` : ""}${iconPosition === "right" || iconPosition === "both" ? `\n  rightIcon={<${getIconName()} />}` : ""}\n/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Input States */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Input States
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Display validation errors, disable the input, or
                                make it read-only.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Input
                                                label="Email Address"
                                                placeholder="you@example.com"
                                                leftIcon={
                                                    <Mail className="w-5 h-5" />
                                                }
                                                error={
                                                    inputState === "error"
                                                        ? "This field is required"
                                                        : undefined
                                                }
                                                disabled={
                                                    inputState === "disabled"
                                                }
                                                readOnly={
                                                    inputState === "readonly"
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select State"
                                            name="inputState"
                                            value={inputState}
                                            onChange={setInputState}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "normal",
                                                    label: "Normal",
                                                },
                                                {
                                                    value: "error",
                                                    label: "Error",
                                                },
                                                {
                                                    value: "disabled",
                                                    label: "Disabled",
                                                },
                                                {
                                                    value: "readonly",
                                                    label: "Read Only",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input\n  label="Email Address"\n  placeholder="you@example.com"\n  leftIcon={<Mail />}${inputState === "error" ? '\n  error="This field is required"' : ""}${inputState === "disabled" ? "\n  disabled" : ""}${inputState === "readonly" ? "\n  readOnly" : ""}\n/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Label & Helper Text */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Label & Helper Text
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Add labels above the input and helper text below
                                for additional context.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Input
                                                label={
                                                    showLabel
                                                        ? "Email Address"
                                                        : undefined
                                                }
                                                placeholder="you@example.com"
                                                leftIcon={
                                                    <Mail className="w-5 h-5" />
                                                }
                                                helperText={
                                                    showHelper
                                                        ? "We'll never share your email"
                                                        : undefined
                                                }
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            <Checkbox
                                                label="Show Label"
                                                checked={showLabel}
                                                onChange={setShowLabel}
                                            />
                                            <Checkbox
                                                label="Show Helper Text"
                                                checked={showHelper}
                                                onChange={setShowHelper}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input${showLabel ? '\n  label="Email Address"' : ""}\n  placeholder="you@example.com"\n  leftIcon={<Mail />}${showHelper ? '\n  helperText="We\'ll never share your email"' : ""}\n/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                SECTION 2: VALIDATION EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Validation
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Built-in validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Built-in Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Input supports HTML5 validation attributes like
                                required, minLength, maxLength, pattern, etc.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                        <Input
                                            id="validation-username-builtin"
                                            label="Username"
                                            required
                                            minLength={3}
                                            maxLength={15}
                                            helperText="This field is required"
                                            placeholder="Enter username"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input
  label="Username"
  required
  minLength={3}
  maxLength={15}
  helperText="This field is required"
  placeholder="Enter username"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Custom validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Custom Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Use the validate prop to provide custom
                                validation logic with regex patterns or custom
                                rules.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                        <Input
                                            id="validation-username-custom"
                                            label="Username"
                                            required
                                            validate={(value) => {
                                                if (value.includes(" ")) {
                                                    return "Username cannot contain spaces";
                                                }
                                                if (
                                                    value.length < 3 ||
                                                    value.length > 15
                                                ) {
                                                    return "Username must be 3-15 characters";
                                                }
                                                return undefined;
                                            }}
                                            helperText="No spaces, 3-15 characters"
                                            placeholder="john_doe"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input
  label="Username"
  required
  validate={(value) => {
    if (value.includes(" ")) {
      return "Cannot contain spaces";
    }
    if (value.length < 3 || value.length > 15) {
      return "Must be 3-15 characters";
    }
    return undefined;
  }}
  helperText="No spaces, 3-15 characters"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Async validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Async Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                The validate function can be async, useful for
                                checking username availability or other
                                server-side validations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                        <Input
                                            id="validation-username-async"
                                            label="Username"
                                            required
                                            validate={async (value) => {
                                                // Simulate API call
                                                await new Promise((resolve) =>
                                                    setTimeout(resolve, 500)
                                                );
                                                if (
                                                    [
                                                        "admin",
                                                        "test",
                                                        "user",
                                                    ].includes(
                                                        value.toLowerCase()
                                                    )
                                                ) {
                                                    return "Username is already taken";
                                                }
                                                return undefined;
                                            }}
                                            helperText="Try: admin, test, or user"
                                            placeholder="johndoe"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Input
  label="Username"
  required
  validate={async (value) => {
    // Check with API
    const response = await checkUsername(value);
    if (response.taken) {
      return "Username is already taken";
    }
    return undefined;
  }}
  helperText="Check availability"
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                SECTION 3: API REFERENCE
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    API Reference
                </h2>
                <Card variant="elevated" padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="theme-surface border-b theme-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Prop
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Default
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="theme-bg divide-y theme-border">
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        type
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;text&quot; | &quot;email&quot; |
                                        &quot;password&quot; |
                                        &quot;number&quot; | &quot;tel&quot; |
                                        &quot;url&quot; | &quot;search&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;text&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        HTML input type attribute
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Label text displayed above the input
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        placeholder
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Placeholder text shown when input is
                                        empty
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        leftIcon
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Icon or element displayed on the left
                                        side
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        rightIcon
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Icon or element displayed on the right
                                        side
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        helperText
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Helper text displayed below the input
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        error
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Error message with red styling
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        disabled
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Disables the input
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        readOnly
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Makes the input read-only
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-mono"
                                        style={{
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Marks the input as required
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
