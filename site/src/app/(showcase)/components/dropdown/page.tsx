"use client";

import {
    Dropdown,
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function DropdownPage() {
    // Example 1: Dropdown Sizes
    const [size1, setSize1] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
    const [selected1, setSelected1] = useState<string | number>("");

    // Example 2: Dropdown States
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
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Dropdown
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Dropdown Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Dropdown Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Dropdowns come in five sizes from extra small to
                                extra large.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Dropdown
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
                                                ? `<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
/>`
                                                : `<Dropdown
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

                    {/* Example 2: Dropdown States */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Dropdown States
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Dropdowns support normal, error, and disabled
                                states.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Dropdown
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
                                                ? `<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
/>`
                                                : state2 === "error"
                                                  ? `<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  error="Please select a fruit"
/>`
                                                  : `<Dropdown
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            With Helper Text
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Add helper text to provide additional context or
                                instructions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Dropdown
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
                                                ? `<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={selected}
  onChange={setSelected}
  helperText="Choose your favorite fruit"
/>`
                                                : `<Dropdown
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
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        DropdownOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        []
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Array of options:{" "}
                                        {`{ value, label, disabled? }`}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string | number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Currently selected value
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
                                        Callback when selection changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Label text displayed above dropdown
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        placeholder
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;Select an option&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Placeholder text when nothing is
                                        selected
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        children
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Custom content to render in dropdown
                                        (overrides options)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        disabled
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Disables the dropdown
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
                                        Error message displayed below (shows red
                                        styling)
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
                                        Helper text displayed below dropdown
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
