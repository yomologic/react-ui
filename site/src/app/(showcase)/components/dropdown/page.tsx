"use client";

import {
    Dropdown,
    Card,
    RadioGroup,
    Checkbox,
    Input,
    CodeSnippet,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, BookOpen, Code2 } from "lucide-react";
import { useState } from "react";

export default function DropdownPage() {
    const [selectedValue, setSelectedValue] = useState<string | number>("");
    const [dropdownState, setDropdownState] = useState<string>("normal");
    const [hasLabel, setHasLabel] = useState(true);
    const [hasHelper, setHasHelper] = useState(false);
    const [customPlaceholder, setCustomPlaceholder] = useState<string>("");
    const [size, setSize] = useState<string>("md");
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Sample options - using fruits for consistency
    const standardOptions = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "grape", label: "Grape (Disabled)", disabled: true },
    ];

    const generateCode = () => {
        const props: string[] = [];

        if (hasLabel) {
            props.push('label="Select Fruit"');
        }

        const placeholderText = customPlaceholder || "Choose a fruit";
        props.push(`placeholder="${placeholderText}"`);

        props.push("options={options}");

        props.push("value={selectedValue}");
        props.push("onChange={setSelectedValue}");

        if (dropdownState === "disabled") {
            props.push("disabled");
        }

        if (dropdownState === "error") {
            props.push('error="This field has an error"');
        }

        if (hasHelper) {
            props.push('helperText="This is a helper text"');
        }

        if (size !== "md") {
            props.push(`size="${size}"`);
        }

        const propsString = props.join("\n  ");
        const fullCode =
            `const options = [\n` +
            `  { value: "apple", label: "Apple" },\n` +
            `  { value: "banana", label: "Banana" },\n` +
            `  { value: "orange", label: "Orange" }\n` +
            `];\n\n` +
            `<Dropdown\n  ${propsString}\n/>`;

        return fullCode;
    };

    return (
        <SectionLayout hasStickyPreview>
            {/* Sticky Preview Section */}
            <section className="sticky top-0 z-15 py-4 bg-gray-50">
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Dropdowns Live Preview
                            </h2>
                            <button
                                onClick={() => setShowCodeOverlay(true)}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-150"
                            >
                                <Code2 className="w-4 h-4" />
                                Code
                            </button>
                        </div>

                        {/* Preview Content */}
                        <div>
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="max-w-md mx-auto">
                                    <Dropdown
                                        label={
                                            hasLabel
                                                ? "Select Fruit"
                                                : undefined
                                        }
                                        placeholder={
                                            customPlaceholder ||
                                            "Choose a fruit"
                                        }
                                        options={standardOptions}
                                        value={selectedValue}
                                        onChange={setSelectedValue}
                                        disabled={dropdownState === "disabled"}
                                        error={
                                            dropdownState === "error"
                                                ? "This field has an error"
                                                : undefined
                                        }
                                        helperText={
                                            hasHelper
                                                ? "This is a helper text"
                                                : undefined
                                        }
                                        size={size as "sm" | "md" | "lg"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Scrollable Content */}
            {/* Interactive Controls */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        <RadioGroup
                            label="State"
                            name="dropdownState"
                            value={dropdownState}
                            onChange={setDropdownState}
                            orientation="horizontal"
                            options={[
                                { value: "normal", label: "Normal" },
                                { value: "error", label: "Error" },
                                { value: "disabled", label: "Disabled" },
                            ]}
                        />

                        <RadioGroup
                            label="Size"
                            name="size"
                            value={size}
                            onChange={setSize}
                            orientation="horizontal"
                            options={[
                                { value: "xs", label: "Extra Small" },
                                { value: "sm", label: "Small" },
                                { value: "md", label: "Medium" },
                                { value: "lg", label: "Large" },
                                { value: "xl", label: "Extra Large" },
                            ]}
                        />

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Checkbox
                                label="Show Label"
                                checked={hasLabel}
                                onChange={setHasLabel}
                            />

                            <Checkbox
                                label="Show Helper Text"
                                checked={hasHelper}
                                onChange={setHasHelper}
                            />
                        </div>

                        <Input
                            label="Custom Placeholder"
                            placeholder="Type custom placeholder..."
                            value={customPlaceholder}
                            onChange={(e) =>
                                setCustomPlaceholder(e.target.value)
                            }
                            helperText="Leave empty for default"
                        />
                    </div>
                </Card>
            </section>

            {/* API Documentation */}
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

            {/* Usage Examples */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Basic Dropdown
                        </h3>
                        <CodeSnippet
                            code={`const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>`}
                            language="tsx"
                        />
                    </Card>

                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            With Error State
                        </h3>
                        <CodeSnippet
                            code={`<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  options={fruitOptions}
  value={fruit}
  onChange={setFruit}
  error="Please select a fruit"
  required
/>`}
                            language="tsx"
                        />
                    </Card>

                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Custom Content
                        </h3>
                        <CodeSnippet
                            code={`<Dropdown
  label="Select Fruit"
  placeholder="Choose a fruit"
  value={selectedFruit}
  onChange={setSelectedFruit}
>
  <div className="py-1">
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
      Popular Fruits
    </div>
    {fruits.map((fruit) => (
      <button
        key={fruit.value}
        onClick={() => setSelectedFruit(fruit.value)}
        className={cn(
          "w-full px-4 py-2 text-left text-sm",
          "hover:bg-gray-100 transition-colors",
          selectedFruit === fruit.value && "bg-blue-50 text-blue-700"
        )}
      >
        {fruit.label}
      </button>
    ))}
  </div>
</Dropdown>`}
                            language="tsx"
                        />
                    </Card>

                    <Card variant="elevated" padding="lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            With Disabled Options
                        </h3>
                        <CodeSnippet
                            code={`const options = [
  { value: "1", label: "Available Option" },
  { value: "2", label: "Another Available" },
  { value: "3", label: "Disabled Option", disabled: true },
  { value: "4", label: "Also Disabled", disabled: true },
];

<Dropdown
  label="Select option"
  options={options}
  value={selected}
  onChange={setSelected}
  helperText="Some options may be disabled"
/>`}
                            language="tsx"
                        />
                    </Card>
                </div>
            </section>

            {/* Code Overlay */}
            {showCodeOverlay && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setShowCodeOverlay(false)}
                    />
                    <div className="fixed inset-4 z-50 flex items-center justify-center pointer-events-none">
                        <Card
                            variant="elevated"
                            padding="lg"
                            className="max-w-3xl w-full max-h-[80vh] overflow-auto pointer-events-auto"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Generated Code
                                </h3>
                                <button
                                    onClick={() => setShowCodeOverlay(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <CodeSnippet code={generateCode()} language="tsx" />
                        </Card>
                    </div>
                </>
            )}
        </SectionLayout>
    );
}
