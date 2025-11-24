"use client";

import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { Spinner } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";
import { useState } from "react";

export default function LoadingPage() {
    const [size, setSize] = useState<string>("md");
    const [color, setColor] = useState<string>("primary");
    const [hasLabel, setHasLabel] = useState(false);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (size !== "md") props.push(`size="${size}"`);
        if (color !== "primary") props.push(`color="${color}"`);
        if (hasLabel) props.push('label="Loading..."');

        const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
        return `<Spinner${propsString} />`;
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
                                Loading States Live Preview
                            </h2>
                            <button
                                onClick={() =>
                                    setShowCodeOverlay(!showCodeOverlay)
                                }
                                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors"
                                title="View code"
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                Code
                            </button>
                        </div>

                        {/* Preview Content */}
                        <div className="relative">
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-center min-h-32">
                                    <Spinner
                                        size={size as "sm" | "md" | "lg" | "xl"}
                                        color={
                                            color as
                                                | "primary"
                                                | "secondary"
                                                | "white"
                                        }
                                        label={
                                            hasLabel ? "Loading..." : undefined
                                        }
                                    />
                                </div>
                            </div>

                            {/* Code Overlay */}
                            {showCodeOverlay && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={() =>
                                            setShowCodeOverlay(false)
                                        }
                                    />
                                    {/* Overlay Card */}
                                    <div className="absolute top-12 right-0 z-50 w-full max-w-md">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Spinner Code
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        setShowCodeOverlay(
                                                            false
                                                        )
                                                    }
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                                    title="Close"
                                                >
                                                    <span className="text-2xl leading-none">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <CodeSnippet
                                                    code={generateCode()}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                </>
                            )}
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
                            label="Size"
                            name="size"
                            value={size}
                            onChange={setSize}
                            orientation="horizontal"
                            options={[
                                { value: "sm", label: "Small" },
                                { value: "md", label: "Medium" },
                                { value: "lg", label: "Large" },
                                { value: "xl", label: "Extra Large" },
                            ]}
                        />

                        <RadioGroup
                            label="Color"
                            name="color"
                            value={color}
                            onChange={setColor}
                            orientation="horizontal"
                            options={[
                                { value: "primary", label: "Primary" },
                                { value: "secondary", label: "Secondary" },
                                { value: "white", label: "White" },
                            ]}
                        />

                        <Checkbox
                            label="Show Label"
                            checked={hasLabel}
                            onChange={setHasLabel}
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
