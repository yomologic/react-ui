"use client";

import {
    Card,
    CodeSnippet,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { Rating } from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function RatingPage() {
    // State for Size example
    const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md");

    // State for Interactive example
    const [interactiveValue, setInteractiveValue] = useState(3.5);

    // State for Display Value example
    const [displayValue, _setDisplayValue] = useState(4);
    const [showValue, setShowValue] = useState(true);
    const [valuePosition, setValuePosition] = useState<"inline" | "bottom">(
        "inline"
    );
    const [valueFormat, setValueFormat] = useState<"decimal" | "fraction">(
        "decimal"
    );

    // State for Color example
    const [selectedColor, setSelectedColor] = useState("var(--color-warning)");

    // State for Max Stars example
    const [maxStars, setMaxStars] = useState(5);
    const [maxStarsValue, setMaxStarsValue] = useState(7);

    const sizeMap = {
        sm: 20,
        md: 28,
        lg: 36,
    };

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Rating
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Rating Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Choose from three size options: small (20px),
                                medium (28px), or large (36px).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
                                            <Rating
                                                value={4}
                                                size={sizeMap[selectedSize]}
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Size"
                                            name="ratingSize"
                                            value={selectedSize}
                                            onChange={(val) =>
                                                setSelectedSize(
                                                    val as "sm" | "md" | "lg"
                                                )
                                            }
                                            orientation="horizontal"
                                            options={[
                                                { value: "sm", label: "Small" },
                                                {
                                                    value: "md",
                                                    label: "Medium",
                                                },
                                                { value: "lg", label: "Large" },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Rating value={4}${selectedSize !== "md" ? ` size={${sizeMap[selectedSize]}}` : ""} />`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Interactive Mode */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Interactive Rating
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Enable interactive mode to allow users to click
                                stars and change the rating value.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border flex flex-col items-center gap-3">
                                        <Rating
                                            value={interactiveValue}
                                            interactive
                                            onChange={setInteractiveValue}
                                        />
                                        <p className="text-small theme-text-muted">
                                            Click stars to rate
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Rating
  value={${interactiveValue}}
  interactive
  onChange={setValue}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Display Value Options */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Display Value
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Show numeric value alongside stars with
                                customizable position and format.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
                                            <Rating
                                                value={displayValue}
                                                showValue={showValue}
                                                valuePosition={valuePosition}
                                                valueFormat={valueFormat}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Checkbox
                                                label="Show numeric value"
                                                checked={showValue}
                                                onChange={setShowValue}
                                            />
                                            {showValue && (
                                                <div className="ml-6 space-y-2">
                                                    <RadioGroup
                                                        label="Value Position"
                                                        name="valuePosition"
                                                        value={valuePosition}
                                                        onChange={(val) =>
                                                            setValuePosition(
                                                                val as
                                                                    | "inline"
                                                                    | "bottom"
                                                            )
                                                        }
                                                        orientation="horizontal"
                                                        options={[
                                                            {
                                                                value: "inline",
                                                                label: "Inline",
                                                            },
                                                            {
                                                                value: "bottom",
                                                                label: "Bottom",
                                                            },
                                                        ]}
                                                    />
                                                    <RadioGroup
                                                        label="Value Format"
                                                        name="valueFormat"
                                                        value={valueFormat}
                                                        onChange={(val) =>
                                                            setValueFormat(
                                                                val as
                                                                    | "decimal"
                                                                    | "fraction"
                                                            )
                                                        }
                                                        orientation="horizontal"
                                                        options={[
                                                            {
                                                                value: "decimal",
                                                                label: "Decimal",
                                                            },
                                                            {
                                                                value: "fraction",
                                                                label: "Fraction",
                                                            },
                                                        ]}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Rating
  value={${displayValue}}${showValue ? "\n  showValue" : ""}${showValue && valuePosition !== "inline" ? `\n  valuePosition="${valuePosition}"` : ""}${showValue && valueFormat !== "decimal" ? `\n  valueFormat="${valueFormat}"` : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Color Customization */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Custom Colors
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Customize the star fill color using CSS
                                variables or hex values.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
                                            <Rating
                                                value={4.5}
                                                color={selectedColor}
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Color"
                                            name="ratingColor"
                                            value={selectedColor}
                                            onChange={setSelectedColor}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "var(--color-warning)",
                                                    label: "Warning",
                                                },
                                                {
                                                    value: "#FFD600",
                                                    label: "Gold",
                                                },
                                                {
                                                    value: "var(--color-primary)",
                                                    label: "Primary",
                                                },
                                                {
                                                    value: "var(--color-error)",
                                                    label: "Error",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Rating
  value={4.5}${selectedColor !== "var(--color-warning)" ? `\n  color="${selectedColor}"` : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: Max Stars */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Maximum Stars
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Set the maximum number of stars to display
                                (default is 5).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
                                            <Rating
                                                value={maxStarsValue}
                                                max={maxStars}
                                                showValue
                                                valueFormat="fraction"
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Maximum Stars"
                                            name="maxStars"
                                            value={maxStars.toString()}
                                            onChange={(val) => {
                                                const newMax = Number(val);
                                                setMaxStars(newMax);
                                                if (maxStarsValue > newMax)
                                                    setMaxStarsValue(newMax);
                                            }}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "5",
                                                    label: "5 Stars",
                                                },
                                                {
                                                    value: "10",
                                                    label: "10 Stars",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Rating
  value={${maxStarsValue}}${maxStars !== 5 ? `\n  max={${maxStars}}` : ""}
  showValue
  valueFormat="fraction"
/>`}
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
                            <tbody className="theme-bg divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Current rating value (supports
                                        half-stars, e.g., 3.5)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        max
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        5
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Maximum number of stars to display
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        24
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Size of each star in pixels
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        color
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;#FFD600&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Color of filled stars (hex, rgb, or CSS
                                        variable)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        className
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Additional CSS classes to apply to the
                                        container
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        interactive
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Allow clicking stars to set rating with
                                        hover preview
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        (value: number) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        -
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Callback fired when a star is clicked
                                        (requires interactive=true)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        showValue
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Display numeric value with the rating
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        valuePosition
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;inline&quot; | &quot;bottom&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;inline&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Position of numeric value: inline with
                                        stars or below
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        valueFormat
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;decimal&quot; |
                                        &quot;fraction&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;decimal&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Format for numeric value:
                                        &quot;3.5&quot; or &quot;3.5/5&quot;
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
