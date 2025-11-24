"use client";

import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Rating } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen, Star } from "lucide-react";
import { useState } from "react";

export default function RatingPage() {
    const [value, setValue] = useState(3.5);
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");
    const [color, setColor] = useState("var(--color-warning)");
    const [max, setMax] = useState(5);
    const [readonly, setReadonly] = useState(false);
    const [interactive, setInteractive] = useState(false);
    const [showValue, setShowValue] = useState(true);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Size mapping
    const sizeMap = {
        sm: 20,
        md: 28,
        lg: 36,
    };

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        props.push(`value={${value}}`);
        if (max !== 5) props.push(`max={${max}}`);
        if (size !== "md") props.push(`size={${sizeMap[size]}}`);
        if (color !== "var(--color-warning)")
            props.push(`color="${color === "#FFD600" ? "#FFD600" : color}"`);
        if (interactive) {
            props.push("interactive");
            props.push("onChange={setValue}");
        }

        const propsString = props.join(" ");
        return `<Rating ${propsString} />`;
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
                                Rating Live Preview
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
                            <div className="p-4 sm:p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="flex flex-col items-center gap-4">
                                    <Rating
                                        value={value}
                                        max={max}
                                        size={sizeMap[size]}
                                        color={color}
                                        interactive={interactive}
                                        onChange={setValue}
                                    />
                                    {showValue && (
                                        <div className="text-xl sm:text-2xl font-bold text-gray-700">
                                            {value.toFixed(1)} /{" "}
                                            {max.toFixed(1)}
                                        </div>
                                    )}
                                    {interactive && (
                                        <p className="text-sm text-gray-600">
                                            Click on stars to change rating
                                        </p>
                                    )}
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
                                    <div className="absolute top-12 left-0 right-0 sm:right-0 sm:left-auto z-50 w-full sm:max-w-md mx-2 sm:mx-0">
                                        <Card variant="elevated" padding="none">
                                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Rating Code
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

            {/* Interactive Controls */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        {/* Rating Value Slider */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700">
                                Rating Value: {value.toFixed(1)}
                            </label>
                            <div className="relative">
                                {/* Custom styled range slider */}
                                <input
                                    type="range"
                                    min={0}
                                    max={max}
                                    step={0.5}
                                    value={value}
                                    onChange={(e) =>
                                        setValue(Number(e.target.value))
                                    }
                                    disabled={readonly}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--color-warning) disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: `linear-gradient(to right, var(--color-warning) 0%, var(--color-warning) ${
                                            (value / max) * 100
                                        }%, #e5e7eb ${(value / max) * 100}%, #e5e7eb 100%)`,
                                    }}
                                />
                                {/* Star indicators on slider */}
                                <div className="flex justify-between mt-2 px-1">
                                    {Array.from(
                                        { length: max + 1 },
                                        (_, i) => i
                                    ).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() =>
                                                !readonly && setValue(num)
                                            }
                                            disabled={readonly}
                                            className="flex flex-col items-center gap-1 group disabled:opacity-50 disabled:cursor-not-allowed"
                                            title={`Set rating to ${num}`}
                                        >
                                            <Star
                                                className={`w-4 h-4 transition-colors ${
                                                    value >= num
                                                        ? "fill-(--color-warning) text-(--color-warning)"
                                                        : "text-gray-300"
                                                } group-hover:text-(--color-warning) group-disabled:group-hover:text-gray-300`}
                                            />
                                            <span className="text-xs text-gray-500 font-medium">
                                                {num}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Max Stars Selection */}
                        <RadioGroup
                            label="Maximum Stars"
                            name="max"
                            value={max.toString()}
                            onChange={(val) => {
                                const newMax = Number(val);
                                setMax(newMax);
                                // Adjust value if it exceeds new max
                                if (value > newMax) setValue(newMax);
                            }}
                            orientation="horizontal"
                            options={[
                                { value: "5", label: "5 Stars" },
                                { value: "10", label: "10 Stars" },
                            ]}
                        />

                        {/* Size Selection */}
                        <RadioGroup
                            label="Size"
                            name="size"
                            value={size}
                            onChange={(val) =>
                                setSize(val as "sm" | "md" | "lg")
                            }
                            orientation="horizontal"
                            options={[
                                { value: "sm", label: "Small (20px)" },
                                { value: "md", label: "Medium (28px)" },
                                { value: "lg", label: "Large (36px)" },
                            ]}
                        />

                        {/* Color Selection */}
                        <RadioGroup
                            label="Color"
                            name="color"
                            value={color}
                            onChange={setColor}
                            orientation="horizontal"
                            options={[
                                {
                                    value: "var(--color-warning)",
                                    label: "Warning (Default)",
                                },
                                { value: "#FFD600", label: "Gold" },
                                {
                                    value: "var(--color-primary)",
                                    label: "Primary",
                                },
                                {
                                    value: "var(--color-success)",
                                    label: "Success",
                                },
                                { value: "var(--color-error)", label: "Error" },
                            ]}
                        />

                        {/* Additional Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <Checkbox
                                label="Show numeric value"
                                checked={showValue}
                                onChange={setShowValue}
                            />
                            <Checkbox
                                label="Interactive (clickable stars)"
                                checked={interactive}
                                onChange={setInteractive}
                            />
                            <Checkbox
                                label="Read-only mode"
                                checked={readonly}
                                onChange={setReadonly}
                            />
                        </div>
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
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Current rating value (supports
                                        half-stars, e.g., 3.5)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        max
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        5
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Maximum number of stars to display
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        24
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Size of each star in pixels
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        color
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;#FFD600&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Color of filled stars (hex, rgb, or CSS
                                        variable)
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
                                        &quot;&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Additional CSS classes to apply to the
                                        container
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        interactive
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Allow clicking stars to set rating with
                                        hover preview
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (value: number) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback fired when a star is clicked
                                        (requires interactive=true)
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
