"use client";

import {
    Badge,
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen, Star } from "lucide-react";
import { useState } from "react";

export default function BadgesPage() {
    const [selectedVariant, setSelectedVariant] = useState<string>("default");
    const [selectedSize, setSelectedSize] = useState<string>("md");
    const [iconPosition, setIconPosition] = useState<string>("none");

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Badge Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Badge Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Badges support different semantic color
                                variants.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Badge
                                            variant={
                                                selectedVariant as
                                                    | "default"
                                                    | "info"
                                                    | "success"
                                                    | "warning"
                                                    | "error"
                                            }
                                        >
                                            Badge
                                        </Badge>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Select Variant"
                                            name="badgeVariant"
                                            value={selectedVariant}
                                            onChange={setSelectedVariant}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "default",
                                                    label: "Default",
                                                },
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
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Badge variant="${selectedVariant}">\n  Badge\n</Badge>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Badge Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Badge Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Badges come in multiple sizes from extra small
                                to extra large.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Badge
                                            size={
                                                selectedSize as
                                                    | "xs"
                                                    | "sm"
                                                    | "md"
                                                    | "lg"
                                                    | "xl"
                                            }
                                            variant="info"
                                        >
                                            New
                                        </Badge>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Select Size"
                                            name="badgeSize"
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
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Badge size="${selectedSize}" variant="info">\n  New\n</Badge>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Badge with Icons */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Badge with Icons
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Add icons to the left or right side of badge
                                text.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                        <Badge
                                            variant="info"
                                            leftIcon={
                                                iconPosition === "left" ||
                                                iconPosition === "both" ? (
                                                    <Star />
                                                ) : undefined
                                            }
                                            rightIcon={
                                                iconPosition === "right" ||
                                                iconPosition === "both" ? (
                                                    <Star />
                                                ) : undefined
                                            }
                                        >
                                            Featured
                                        </Badge>
                                    </div>
                                    <div className="mt-4">
                                        <RadioGroup
                                            label="Icon Position"
                                            name="badgeIconPosition"
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
                                        code={`<Badge variant="info"${iconPosition === "left" || iconPosition === "both" ? `\n  leftIcon={<Star />}` : ""}${iconPosition === "right" || iconPosition === "both" ? `\n  rightIcon={<Star />}` : ""}>\n  Featured\n</Badge>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Notification Counter Badge */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Notification Counter
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Position badges as notification counters in the
                                top-right corner of elements.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center gap-8">
                                        {/* Inbox Example */}
                                        <div className="relative inline-block">
                                            <button className="p-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                                <svg
                                                    className="w-6 h-6 text-gray-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </button>
                                            <Badge
                                                size="xs"
                                                variant="error"
                                                className="absolute -top-1 -right-1"
                                            >
                                                12
                                            </Badge>
                                        </div>

                                        {/* Notifications Example */}
                                        <div className="relative inline-block">
                                            <button className="p-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                                <svg
                                                    className="w-6 h-6 text-gray-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                    />
                                                </svg>
                                            </button>
                                            <Badge
                                                size="xs"
                                                variant="warning"
                                                className="absolute -top-1 -right-1"
                                            >
                                                5
                                            </Badge>
                                        </div>

                                        {/* Cart Example */}
                                        <div className="relative inline-block">
                                            <button className="p-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                                <svg
                                                    className="w-6 h-6 text-gray-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <Badge
                                                size="xs"
                                                variant="info"
                                                className="absolute -top-1 -right-1"
                                            >
                                                3
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<div className="relative inline-block">
  <button className="p-3 bg-white rounded-lg border">
    <MailIcon className="w-6 h-6" />
  </button>
  <Badge
    size="xs"
    variant="error"
    className="absolute -top-1 -right-1"
  >
    12
  </Badge>
</div>`}
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
                                        &quot;default&quot; |
                                        &quot;success&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                        | &quot;info&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;default&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Color scheme of the badge
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
                                        Size of the badge
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
                                        Icon to display on the left side
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
                                        Icon to display on the right side
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
                                        Label text or content
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
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </SectionLayout>
    );
}
