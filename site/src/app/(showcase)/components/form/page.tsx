"use client";

import {
    Form,
    Input,
    Button,
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Select,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

interface FormValues {
    [key: string]: string | boolean | undefined;
}

export default function FormPage() {
    const [submittedData1, setSubmittedData1] = useState<FormValues | null>(
        null
    );
    const [submittedData2, setSubmittedData2] = useState<FormValues | null>(
        null
    );
    const [spacing, setSpacing] = useState<"none" | "dense" | "normal">(
        "dense"
    );

    const validateUsername = (value: string) => {
        if (value.length < 3) {
            return "Username must be at least 3 characters";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return "Username can only contain letters, numbers, and underscores";
        }
        return undefined;
    };

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Form
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Basic Form with Validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Basic Form with Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Form coordinates validation across multiple
                                inputs. Errors appear only after submit or when
                                a field is touched.
                            </p>

                            {/* Two-column layout */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Form
                                                onSubmit={(values) =>
                                                    setSubmittedData1(values)
                                                }
                                                className="space-y-4"
                                            >
                                                <Input
                                                    name="username"
                                                    label="Username"
                                                    required
                                                    validate={validateUsername}
                                                    helperText="At least 3 characters, letters/numbers/underscores only"
                                                />

                                                <Input
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    required
                                                />

                                                <Input
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    required
                                                    minLength={8}
                                                    helperText="Minimum 8 characters"
                                                />

                                                <Button type="submit">
                                                    Submit
                                                </Button>
                                            </Form>

                                            {submittedData1 && (
                                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                                    <p className="font-semibold text-green-900 mb-2">
                                                        Form submitted
                                                        successfully!
                                                    </p>
                                                    <pre className="text-sm text-green-800">
                                                        {JSON.stringify(
                                                            submittedData1,
                                                            null,
                                                            2
                                                        )}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`const validateUsername = (value: string) => {
  if (value.length < 3) {
    return "Username must be at least 3 characters";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  return undefined;
};

<Form onSubmit={(values) => console.log(values)}>
  <Input
    name="username"
    label="Username"
    required
    validate={validateUsername}
    helperText="At least 3 characters, letters/numbers/underscores only"
  />

  <Input
    name="email"
    label="Email"
    type="email"
    required
  />

  <Input
    name="password"
    label="Password"
    type="password"
    required
    minLength={8}
    helperText="Minimum 8 characters"
  />

  <Button type="submit">Submit</Button>
</Form>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: All Control Types */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            All Form Control Types
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Form works with Input, RadioGroup, Checkbox,
                                Select, Switch, and other form controls. Each
                                control must have a unique <code>name</code>{" "}
                                prop.
                            </p>

                            {/* Two-column layout */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Form
                                                onSubmit={(values) =>
                                                    setSubmittedData2(values)
                                                }
                                                spacing="dense"
                                            >
                                                <Input
                                                    name="fullName"
                                                    label="Full Name"
                                                    required
                                                />

                                                <RadioGroup
                                                    name="plan"
                                                    label="Select Plan"
                                                    required
                                                    options={[
                                                        {
                                                            value: "free",
                                                            label: "Free",
                                                        },
                                                        {
                                                            value: "pro",
                                                            label: "Pro",
                                                        },
                                                        {
                                                            value: "enterprise",
                                                            label: "Enterprise",
                                                        },
                                                    ]}
                                                />

                                                <Select
                                                    name="country"
                                                    label="Country"
                                                    required
                                                    placeholder="Select your country"
                                                    options={[
                                                        {
                                                            value: "us",
                                                            label: "United States",
                                                        },
                                                        {
                                                            value: "ca",
                                                            label: "Canada",
                                                        },
                                                        {
                                                            value: "uk",
                                                            label: "United Kingdom",
                                                        },
                                                    ]}
                                                />

                                                <CheckboxGroup
                                                    name="preferences"
                                                    label="Preferences"
                                                    required
                                                    options={[
                                                        {
                                                            value: "newsletter",
                                                            label: "Subscribe to newsletter",
                                                        },
                                                        {
                                                            value: "updates",
                                                            label: "Receive product updates",
                                                        },
                                                        {
                                                            value: "marketing",
                                                            label: "Marketing communications",
                                                        },
                                                    ]}
                                                />

                                                <Checkbox
                                                    name="terms"
                                                    label="I agree to the terms and conditions"
                                                    required
                                                />

                                                <Button type="submit">
                                                    Submit
                                                </Button>
                                            </Form>

                                            {submittedData2 && (
                                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                                    <p className="font-semibold text-green-900 mb-2">
                                                        Form submitted
                                                        successfully!
                                                    </p>
                                                    <pre className="text-sm text-green-800">
                                                        {JSON.stringify(
                                                            submittedData2,
                                                            null,
                                                            2
                                                        )}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Form onSubmit={(values) => console.log(values)}>
  <Input
    name="fullName"
    label="Full Name"
    required
  />

  <RadioGroup
    name="plan"
    label="Select Plan"
    required
    options={[
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise" },
    ]}
  />

  <Select
    name="country"
    label="Country"
    required
    placeholder="Select your country"
    options={[
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
    ]}
  />

  <Switch
    name="notifications"
    label="Enable notifications"
  />

  <Checkbox
    name="terms"
    label="I agree to the terms and conditions"
    required
  />

  <Button type="submit">Submit</Button>
</Form>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Form Spacing Options */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Form Spacing
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Control vertical spacing between form controls
                                with the <code>spacing</code> prop.
                            </p>

                            {/* Two-column layout */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Left: Display and Controls */}
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        {/* Component Display */}
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Form
                                                onSubmit={(values) =>
                                                    console.log(values)
                                                }
                                                spacing={spacing}
                                            >
                                                <Input
                                                    name="name"
                                                    label="Name"
                                                    placeholder="Enter your name"
                                                />
                                                <Input
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                />
                                                <Input
                                                    name="phone"
                                                    label="Phone"
                                                    placeholder="Enter your phone"
                                                />
                                            </Form>
                                        </div>

                                        {/* Controls */}
                                        <RadioGroup
                                            name="spacingDemo"
                                            label="Select Spacing"
                                            options={[
                                                {
                                                    value: "none",
                                                    label: "None (0px)",
                                                },
                                                {
                                                    value: "dense",
                                                    label: "Dense (8px)",
                                                },
                                                {
                                                    value: "normal",
                                                    label: "Normal (16px)",
                                                },
                                            ]}
                                            value={spacing}
                                            onChange={(value) =>
                                                setSpacing(
                                                    value as
                                                        | "none"
                                                        | "dense"
                                                        | "normal"
                                                )
                                            }
                                            orientation="horizontal"
                                        />
                                    </div>
                                </div>

                                {/* Right: Code Snippet */}
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Form 
  onSubmit={(values) => console.log(values)}
  spacing="${spacing}"
>
  <Input name="name" label="Name" />
  <Input name="email" label="Email" />
  <Input name="phone" label="Phone" />
</Form>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
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
                                        onSubmit
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (values: Record&lt;string, any&gt;)
                                        =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback function called when form is
                                        submitted with valid values
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        spacing
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        "none" | "dense" | "normal"
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        "normal"
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Controls vertical spacing between form
                                        controls. none=0px, dense=8px,
                                        normal=16px
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
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Additional CSS classes for the form
                                        element
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="mt-6 space-y-4">
                    <Card variant="bordered" padding="md">
                        <p className="text-sm text-gray-700">
                            <strong>Note:</strong> All child form controls
                            (Input, RadioGroup, Checkbox, etc.) must have a
                            unique{" "}
                            <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                                name
                            </code>{" "}
                            prop to be tracked by the Form component.
                        </p>
                    </Card>

                    <Card variant="bordered" padding="md">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                            Key Features:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>
                                <strong>Coordinated validation:</strong>{" "}
                                Validates all fields on submit
                            </li>
                            <li>
                                <strong>Smart error display:</strong> Shows
                                errors only after submit or field blur
                            </li>
                            <li>
                                <strong>Built-in validation:</strong> Supports
                                required, minLength, email, etc.
                            </li>
                            <li>
                                <strong>Custom validation:</strong> Use the{" "}
                                <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                                    validate
                                </code>{" "}
                                prop for custom rules
                            </li>
                            <li>
                                <strong>Type-safe:</strong> Returns validated
                                values to onSubmit callback
                            </li>
                        </ul>
                    </Card>
                </div>
            </section>
        </SectionLayout>
    );
}
