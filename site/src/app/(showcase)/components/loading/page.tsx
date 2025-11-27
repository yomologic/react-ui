"use client";

import {
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { Spinner } from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function LoadingPage() {
    // State for Size example
    const [selectedSize, setSelectedSize] = useState<string>("md");

    // State for Color example
    const [selectedColor, setSelectedColor] = useState<string>("primary");

    // State for Label example
    const [showLabel, setShowLabel] = useState(true);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Spinner
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Spinner Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Spinner Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Choose from four size options: small, medium,
                                large, or extra large.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center min-h-32">
                                            <Spinner
                                                size={
                                                    selectedSize as
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                        | "xl"
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Size"
                                            name="spinnerSize"
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            orientation="horizontal"
                                            options={[
                                                { value: "sm", label: "Small" },
                                                {
                                                    value: "md",
                                                    label: "Medium",
                                                },
                                                { value: "lg", label: "Large" },
                                                {
                                                    value: "xl",
                                                    label: "Extra Large",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Spinner${selectedSize !== "md" ? ` size="${selectedSize}"` : ""} />`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Spinner Colors */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Spinner Colors
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Customize the spinner color to match your design
                                system.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center min-h-32">
                                            <Spinner
                                                color={
                                                    selectedColor as
                                                        | "primary"
                                                        | "secondary"
                                                        | "white"
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Color"
                                            name="spinnerColor"
                                            value={selectedColor}
                                            onChange={setSelectedColor}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "primary",
                                                    label: "Primary",
                                                },
                                                {
                                                    value: "secondary",
                                                    label: "Secondary",
                                                },
                                                {
                                                    value: "white",
                                                    label: "White",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Spinner${selectedColor !== "primary" ? ` color="${selectedColor}"` : ""} />`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Spinner with Label */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Spinner with Label
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Add a label below the spinner to provide context
                                about the loading state.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center min-h-32">
                                            <Spinner
                                                label={
                                                    showLabel
                                                        ? "Loading..."
                                                        : undefined
                                                }
                                            />
                                        </div>

                                        <Checkbox
                                            label="Show Label"
                                            checked={showLabel}
                                            onChange={setShowLabel}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Spinner${showLabel ? ' label="Loading..."' : ""} />`}
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
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot; | &quot;xl&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;md&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Size of the spinner
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        color
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;primary&quot; |
                                        &quot;secondary&quot; |
                                        &quot;white&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;primary&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Color scheme of the spinner
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
                                        Optional label text shown below the
                                        spinner
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
