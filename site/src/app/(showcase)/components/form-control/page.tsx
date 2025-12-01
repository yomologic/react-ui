"use client";

import {
    FormControl,
    Input,
    Select,
    Checkbox,
    Card,
    CodeSnippet,
    SectionLayout,
    Divider,
    Button,
    useFormField,
} from "@yomologic/react-ui";
import { BookOpen, Zap } from "lucide-react";
import { useState } from "react";

// Custom component using useFormField hook
function CustomFormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const { register, state } = useFormField();

    return (
        <div className="space-y-2">
            <input
                {...register()}
                {...props}
                placeholder="Custom input with useFormField"
                className={`w-full px-3 py-2 border rounded-md transition-colors ${
                    state.error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-400 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
            />
            {state.isDirty && (
                <div className="flex gap-3 text-xs">
                    <span className="text-gray-600">
                        Characters: {state.value?.length || 0}
                    </span>
                    {state.isValidating && (
                        <span className="text-blue-600">Validating...</span>
                    )}
                </div>
            )}
        </div>
    );
}

export default function FormControlPage() {
    // Example 1: Basic FormControl with validation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Example 2: FormControl states visualization
    const [demoValue, setDemoValue] = useState("");

    // Example 3: Custom validation
    const [username, setUsername] = useState("");

    // Example 4: Multiple fields
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        terms: false,
    });

    // Example 5: asChild pattern
    const [nativeInput, setNativeInput] = useState("");

    // Example 6: Render props pattern
    const [renderPropsValue, setRenderPropsValue] = useState("");

    // Example 7: useFormField hook
    const [hookValue, setHookValue] = useState("");

    // Validation functions
    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
        }
        return true;
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/\d/.test(value)) {
            return "Password must contain at least one number";
        }
        return true;
    };

    const validateUsername = async (value: string) => {
        // Simulate async validation (API call)
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (value.length < 3) {
            return "Username must be at least 3 characters";
        }
        if (value === "admin") {
            return "Username 'admin' is already taken";
        }
        return true;
    };

    const countryOptions = [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" },
    ];

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    FormControl
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Basic validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Basic FormControl with Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                FormControl provides validation, state tracking,
                                and error handling for form inputs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                        <FormControl
                                            label="Email"
                                            required
                                            validate={validateEmail}
                                            value={email}
                                            onChange={setEmail}
                                            helperText="We'll never share your email"
                                        >
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                            />
                                        </FormControl>

                                        <FormControl
                                            label="Password"
                                            required
                                            validate={validatePassword}
                                            value={password}
                                            onChange={setPassword}
                                            helperText="Must be at least 8 characters with a number"
                                        >
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                            />
                                        </FormControl>

                                        <Button variant="primary" size="md">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<FormControl
  label="Email"
  required
  validate={(value) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
    return true;
  }}
  value={email}
  onChange={setEmail}
  helperText="We'll never share your email"
>
  <Input
    type="email"
    placeholder="john@example.com"
  />
</FormControl>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: State visualization */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            FormControl States
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                FormControl tracks pristine, dirty, touched,
                                valid states automatically.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                        <FormControl
                                            label="Type something"
                                            required
                                            value={demoValue}
                                            onChange={setDemoValue}
                                            validate={(value) =>
                                                value.length >= 5 ||
                                                "Must be at least 5 characters"
                                            }
                                        >
                                            <Input placeholder="Start typing..." />
                                        </FormControl>

                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    Pristine:
                                                </span>
                                                <span
                                                    className={
                                                        demoValue === ""
                                                            ? "text-green-600"
                                                            : "text-gray-400"
                                                    }
                                                >
                                                    {demoValue === ""
                                                        ? "✓ Yes"
                                                        : "✗ No"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    Dirty:
                                                </span>
                                                <span
                                                    className={
                                                        demoValue !== ""
                                                            ? "text-green-600"
                                                            : "text-gray-400"
                                                    }
                                                >
                                                    {demoValue !== ""
                                                        ? "✓ Yes"
                                                        : "✗ No"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    Valid:
                                                </span>
                                                <span
                                                    className={
                                                        demoValue.length >= 5
                                                            ? "text-green-600"
                                                            : "text-gray-400"
                                                    }
                                                >
                                                    {demoValue.length >= 5
                                                        ? "✓ Yes"
                                                        : "✗ No"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    Length:
                                                </span>
                                                <span className="text-gray-700">
                                                    {demoValue.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<FormControl
  label="Type something"
  required
  value={value}
  onChange={setValue}
  validate={(value) => 
    value.length >= 5 || 
    "Must be at least 5 characters"
  }
>
  <Input placeholder="Start typing..." />
</FormControl>

// States tracked automatically:
// - isDirty: value !== initialValue
// - isTouched: field has been focused
// - isValid: passes validation
// - isPristine: !isDirty`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Async validation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Async Validation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                FormControl supports async validation for
                                server-side checks like username availability.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <FormControl
                                            label="Username"
                                            required
                                            validate={validateUsername}
                                            value={username}
                                            onChange={setUsername}
                                            helperText="Try typing 'admin' to see error"
                                        >
                                            <Input placeholder="Choose a username" />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`const validateUsername = async (value: string) => {
  // Simulate API call
  await new Promise(resolve => 
    setTimeout(resolve, 500)
  );
  
  if (value.length < 3) {
    return "Must be at least 3 characters";
  }
  if (value === "admin") {
    return "Username already taken";
  }
  return true;
};

<FormControl
  label="Username"
  required
  validate={validateUsername}
  value={username}
  onChange={setUsername}
>
  <Input placeholder="Choose a username" />
</FormControl>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Multiple controls */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Multiple Form Controls
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Compose multiple FormControls for complex forms.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                        <FormControl
                                            label="Full Name"
                                            required
                                            value={formData.name}
                                            onChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    name: value,
                                                })
                                            }
                                        >
                                            <Input placeholder="John Doe" />
                                        </FormControl>

                                        <FormControl
                                            label="Country"
                                            required
                                            value={formData.country}
                                            onChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    country: value,
                                                })
                                            }
                                        >
                                            <Select
                                                options={countryOptions}
                                                placeholder="Select your country"
                                            />
                                        </FormControl>

                                        <FormControl
                                            required
                                            value={formData.terms}
                                            onChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    terms: value,
                                                })
                                            }
                                        >
                                            <Checkbox label="I agree to the terms and conditions" />
                                        </FormControl>

                                        <Button variant="primary" size="md">
                                            Create Account
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<FormControl
  label="Full Name"
  required
  value={formData.name}
  onChange={(value) => 
    setFormData({...formData, name: value})
  }
>
  <Input placeholder="John Doe" />
</FormControl>

<FormControl
  label="Country"
  required
  value={formData.country}
  onChange={(value) => 
    setFormData({...formData, country: value})
  }
>
  <Select
    options={countryOptions}
    placeholder="Select your country"
  />
</FormControl>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: asChild pattern */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            AsChild Pattern (Radix UI Style)
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use{" "}
                                <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                                    asChild
                                </code>{" "}
                                to wrap any native HTML element or third-party
                                component.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                        <FormControl
                                            label="Native Input (asChild)"
                                            required
                                            value={nativeInput}
                                            onChange={setNativeInput}
                                            helperText="Works with any input element"
                                            asChild
                                        >
                                            <input
                                                type="text"
                                                placeholder="Type here..."
                                                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<FormControl
  label="Native Input"
  required
  value={value}
  onChange={setValue}
  asChild
>
  <input
    type="text"
    placeholder="Type here..."
    className="w-full px-3 py-2 border"
  />
</FormControl>

// Works with any element or component!
<FormControl asChild>
  <textarea />
</FormControl>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 6: Render props pattern */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Render Props Pattern
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use a render function for complete control over
                                rendering.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <FormControl
                                            label="Custom Rendered Field"
                                            required
                                            value={renderPropsValue}
                                            onChange={setRenderPropsValue}
                                            validate={(value) =>
                                                value.length >= 3 ||
                                                "Min 3 characters"
                                            }
                                        >
                                            {({
                                                value,
                                                onChange,
                                                error,
                                                isDirty,
                                                isValid,
                                            }) => (
                                                <div className="space-y-2">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) =>
                                                                onChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Custom styled input"
                                                            className={`w-full px-3 py-2 border rounded-md ${
                                                                error
                                                                    ? "border-red-500"
                                                                    : "border-gray-400"
                                                            }`}
                                                        />
                                                        {isDirty && (
                                                            <span className="absolute right-3 top-2.5 text-sm">
                                                                {isValid
                                                                    ? "✓"
                                                                    : "✗"}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-4 text-xs">
                                                        <span
                                                            className={
                                                                isDirty
                                                                    ? "text-orange-600"
                                                                    : "text-gray-400"
                                                            }
                                                        >
                                                            {isDirty
                                                                ? "Modified"
                                                                : "Pristine"}
                                                        </span>
                                                        <span
                                                            className={
                                                                isValid
                                                                    ? "text-green-600"
                                                                    : "text-gray-400"
                                                            }
                                                        >
                                                            {isValid
                                                                ? "Valid"
                                                                : "Invalid"}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<FormControl
  label="Custom Rendered"
  required
  value={value}
  onChange={setValue}
>
  {({ value, onChange, error, isDirty, isValid }) => (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : "border-gray-400"}
      />
      {isDirty && (
        <span>{isValid ? "✓" : "✗"}</span>
      )}
    </div>
  )}
</FormControl>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                SECTION 1G: HOOK PATTERN
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    useFormField Hook Pattern
                </h2>
                <p className="text-gray-600 mb-6">
                    Use the{" "}
                    <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">
                        useFormField
                    </code>{" "}
                    hook in custom components for a React Hook Form-like API.
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card variant="elevated">
                        <div className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold">
                                Custom Component with Hook
                            </h3>
                            <FormControl
                                label="Email Address"
                                helperText="We'll never share your email"
                                required
                                value={hookValue}
                                onChange={setHookValue}
                                validate={(value: string) => {
                                    if (!value.includes("@")) {
                                        return "Must include @ symbol";
                                    }
                                    if (value.length < 5) {
                                        return "Email too short";
                                    }
                                    return true;
                                }}
                            >
                                <CustomFormInput placeholder="you@example.com" />
                            </FormControl>
                        </div>
                    </Card>
                    <Card variant="elevated">
                        <CodeSnippet
                            language="tsx"
                            code={`// Custom component using useFormField hook
const CustomFormInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { fieldProps, state, register } = useFormField();
  const { error, isTouched, isValid } = state;
  
  return (
    <div className="space-y-2">
      <input
        {...register()} // Spread all field props
        {...props}
        className={\`border rounded px-3 py-2 w-full \${
          isTouched && error ? 'border-red-500' : 'border-gray-300'
        }\`}
      />
      <div className="flex justify-between text-sm">
        <span className={error ? "text-red-500" : "text-gray-500"}>
          {fieldProps.value?.length || 0} characters
        </span>
        <span className={isValid ? "text-green-600" : "text-gray-400"}>
          {isValid ? "✓ Valid" : "○ Invalid"}
        </span>
      </div>
    </div>
  );
};

// Usage
<FormControl
  label="Email Address"
  required
  value={email}
  onChange={setEmail}
  validators={[emailValidator]}
>
  <CustomFormInput placeholder="you@example.com" />
</FormControl>`}
                        />
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
                                        name
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Name attribute for the form field
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        any
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Controlled value for the field
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        defaultValue
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        any
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Default value for uncontrolled usage
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (value) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback when field value changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Whether the field is required
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        validate
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        function | ValidationRule[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Validation function or rules. Can be
                                        async.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        error
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        External error message to display
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        helperText
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Helper text displayed below the field
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        validateOnChange
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Whether to validate on value change
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        validateOnBlur
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Whether to validate on blur
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        FormControl State
                    </h3>
                    <Card variant="elevated" padding="none">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            State
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            isDirty
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            boolean
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            True if value differs from initial
                                            value
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            isTouched
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            boolean
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            True if field has been focused
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            isValid
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            boolean
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            True if field passes validation
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            isValidating
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            boolean
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            True during async validation
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            error
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            string | undefined
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Current validation error message
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>
        </SectionLayout>
    );
}
