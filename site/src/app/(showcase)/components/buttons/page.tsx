"use client";

import {
    Button,
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Divider,
} from "@yomologic/react-ui";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";

export default function ButtonsPage() {
    const [selectedSize, setSelectedSize] = useState<string>("md");
    const [selectedVariant, setSelectedVariant] = useState<string>("primary");
    const [selectedSemanticVariant, setSelectedSemanticVariant] =
        useState<string>("info");
    const [iconPosition, setIconPosition] = useState<string>("left");
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [showDisabled, setShowDisabled] = useState<boolean>(true);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Button
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Button Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Button Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Different visual styles for various use cases.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button
                                            variant={
                                                selectedVariant as
                                                    | "primary"
                                                    | "secondary"
                                                    | "outline"
                                                    | "ghost"
                                                    | "default"
                                            }
                                        >
                                            Click Me
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Select Variant"
                                            name="buttonVariant"
                                            value={selectedVariant}
                                            onChange={setSelectedVariant}
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
                                                    value: "outline",
                                                    label: "Outline",
                                                },
                                                {
                                                    value: "ghost",
                                                    label: "Ghost",
                                                },
                                                {
                                                    value: "default",
                                                    label: "Default",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button variant="${selectedVariant}">\n  Click Me\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Semantic Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Semantic Color Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Semantic colors for different actions and
                                states.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button
                                            variant={
                                                selectedSemanticVariant as
                                                    | "info"
                                                    | "success"
                                                    | "warning"
                                                    | "error"
                                            }
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Select Semantic Variant"
                                            name="semanticVariant"
                                            value={selectedSemanticVariant}
                                            onChange={
                                                setSelectedSemanticVariant
                                            }
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "info",
                                                    label: "Info",
                                                },
                                                {
                                                    value: "success",
                                                    label: "Success",
                                                },
                                                {
                                                    value: "warning",
                                                    label: "Warning",
                                                },
                                                {
                                                    value: "error",
                                                    label: "Error",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button variant="${selectedSemanticVariant}">\n  Submit\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Button Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Button Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Five sizes from extra small to extra large.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button
                                            size={
                                                selectedSize as
                                                    | "xs"
                                                    | "sm"
                                                    | "md"
                                                    | "lg"
                                                    | "xl"
                                            }
                                        >
                                            Button
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Select Size"
                                            name="buttonSize"
                                            value={selectedSize}
                                            onChange={setSelectedSize}
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
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button size="${selectedSize}">\n  Button\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: With Icons */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Buttons with Icons
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Add icons on the left or right side of the
                                button text.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button
                                            leftIcon={
                                                iconPosition === "left" ||
                                                iconPosition === "both" ? (
                                                    <Search className="w-4 h-4" />
                                                ) : undefined
                                            }
                                            rightIcon={
                                                iconPosition === "right" ||
                                                iconPosition === "both" ? (
                                                    <ArrowRight />
                                                ) : undefined
                                            }
                                        >
                                            Search
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Icon Position"
                                            name="iconPosition"
                                            value={iconPosition}
                                            onChange={setIconPosition}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "left",
                                                    label: "Left Icon",
                                                },
                                                {
                                                    value: "right",
                                                    label: "Right Icon",
                                                },
                                                {
                                                    value: "both",
                                                    label: "Both Icons",
                                                },
                                                {
                                                    value: "none",
                                                    label: "No Icons",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button${iconPosition === "left" || iconPosition === "both" ? '\n  leftIcon={<Search className="w-4 h-4" />}' : ""}${iconPosition === "right" || iconPosition === "both" ? '\n  rightIcon={<ArrowRight className="w-4 h-4" />}' : ""}>\n  Search\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: Loading State */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Loading State
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Show loading spinner and disable interaction.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button isLoading={showLoading}>
                                            {showLoading
                                                ? "Loading..."
                                                : "Save Changes"}
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showLoading}
                                                onChange={(e) =>
                                                    setShowLoading(
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Show Loading State
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button${showLoading ? " isLoading" : ""}>\n  Save Changes\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 6: Disabled State */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Disabled State
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Disabled buttons cannot be interacted with.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Button disabled={showDisabled}>
                                            Disabled Button
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showDisabled}
                                                onChange={(e) =>
                                                    setShowDisabled(
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Disabled
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button${showDisabled ? " disabled" : ""}>\n  Disabled Button\n</Button>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 7: Full Width */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Full Width Button
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use className to make buttons full width.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <Button className="w-full">
                                            Full Width Button
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        code={`<Button className="w-full">\n  Full Width Button\n</Button>`}
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
                                        variant
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;primary&quot; |
                                        &quot;secondary&quot; |
                                        &quot;outline&quot; | &quot;ghost&quot;
                                        | &quot;default&quot; | &quot;info&quot;
                                        | &quot;success&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;primary&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Visual style of the button
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;xs&quot; | &quot;sm&quot; |
                                        &quot;md&quot; | &quot;lg&quot; |
                                        &quot;xl&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;md&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Size of the button (padding and font
                                        size)
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
                                        Disables the button and prevents
                                        interactions
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        isLoading
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Shows loading spinner and disables the
                                        button
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        leftIcon
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Icon or element to display on the left
                                        side
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        rightIcon
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        ReactNode
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Icon or element to display on the right
                                        side
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onClick
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        () =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Click event handler
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
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Additional CSS classes to apply
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
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Button content (text or elements)
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
