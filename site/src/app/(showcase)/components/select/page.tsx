"use client";

import {
    Select,
    NativeSelect,
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function SelectPage() {
    // Example 1: Select Sizes
    const [size1, setSize1] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
    const [selected1, setSelected1] = useState<string | number>("");

    // Example 2: Select States
    const [state2, setState2] = useState<"normal" | "error" | "disabled">(
        "normal"
    );
    const [selected2, setSelected2] = useState<string | number>("");

    // Example 3: With Helper Text
    const [showHelper3, setShowHelper3] = useState(true);
    const [selected3, setSelected3] = useState<string | number>("");

    // Sample options
    const fruitOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape" },
    ];

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Select
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Select Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Select Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Select dropdowns come in five sizes from extra
                                small to extra large.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Select
                                                label="Select Fruit"
                                                placeholder="Choose a fruit"
                                                options={fruitOptions}
                                                value={selected1}
                                                onChange={setSelected1}
                                                size={size1}
                                            />
                                        </div>
                                        <RadioGroup
                                            label="Size"
                                            name="size-example1"
                                            value={size1}
                                            onChange={(val) =>
                                                setSize1(
                                                    val as
                                                        | "xs"
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                        | "xl"
                                                )
                                            }
                                            orientation="horizontal"
                                            options={[
                                                { value: "xs", label: "XS" },
                                                { value: "sm", label: "SM" },
                                                { value: "md", label: "MD" },
                                                { value: "lg", label: "LG" },
                                                { value: "xl", label: "XL" },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            size1 === "md"
                                                ? `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
/>`
                                                : `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  size="${size1}"
/>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Select States */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Select States
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Select dropdowns support normal, error, and
                                disabled states.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Select
                                                label="Select Fruit"
                                                placeholder="Choose a fruit"
                                                options={fruitOptions}
                                                value={selected2}
                                                onChange={setSelected2}
                                                disabled={state2 === "disabled"}
                                                error={
                                                    state2 === "error"
                                                        ? "Please select a fruit"
                                                        : undefined
                                                }
                                            />
                                        </div>
                                        <RadioGroup
                                            label="State"
                                            name="state-example2"
                                            value={state2}
                                            onChange={(val) =>
                                                setState2(
                                                    val as
                                                        | "normal"
                                                        | "error"
                                                        | "disabled"
                                                )
                                            }
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
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            state2 === "normal"
                                                ? `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
/>`
                                                : state2 === "error"
                                                  ? `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  error="Please select a fruit"
/>`
                                                  : `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  disabled
/>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: With Helper Text */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            With Helper Text
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Add helper text to provide additional context or
                                instructions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Select
                                                label="Select Fruit"
                                                placeholder="Choose a fruit"
                                                options={fruitOptions}
                                                value={selected3}
                                                onChange={setSelected3}
                                                helperText={
                                                    showHelper3
                                                        ? "Choose your favorite fruit"
                                                        : undefined
                                                }
                                            />
                                        </div>
                                        <Checkbox
                                            label="Show Helper Text"
                                            checked={showHelper3}
                                            onChange={setShowHelper3}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            showHelper3
                                                ? `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  helperText="Choose your favorite fruit"
/>`
                                                : `<Select
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
/>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: NativeSelect */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            NativeSelect (Native HTML)
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                For simple forms, use NativeSelect which wraps
                                the native HTML select element. Better for
                                mobile (native OS picker) and accessibility.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <NativeSelect
                                                label="Country"
                                                value={selected3}
                                                onChange={setSelected3}
                                                helperText="Select your country"
                                            >
                                                <option value="">
                                                    Select a country
                                                </option>
                                                <option value="us">
                                                    United States
                                                </option>
                                                <option value="ca">
                                                    Canada
                                                </option>
                                                <option value="uk">
                                                    United Kingdom
                                                </option>
                                                <option value="au">
                                                    Australia
                                                </option>
                                            </NativeSelect>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<NativeSelect
  label="Country"
  value={country}
  onChange={setCountry}
  helperText="Select your country"
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</NativeSelect>`}
                                        language="tsx"
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        SelectOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        []
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Array of options:{" "}
                                        {`{ value, label, disabled? }`}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string | number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Currently selected value
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        (value) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Callback when selection changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Label text displayed above select
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        placeholder
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;Select an option&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Placeholder text when nothing is
                                        selected
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        children
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Custom content to render in select
                                        (overrides options)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        disabled
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Disables the select
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        error
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Error message displayed below (shows red
                                        styling)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        helperText
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Helper text displayed below select
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Marks the field as required (shows
                                        asterisk)
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
