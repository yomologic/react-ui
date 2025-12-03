"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Divider,
    Button,
    SectionLayout,
    Slider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function DividerPage() {
    // Example 1: Divider Variants
    const [variant1, setVariant1] = useState<"fullWidth" | "inset" | "middle">(
        "fullWidth"
    );

    // Example 2: Divider with Text Content
    const [textAlign2, setTextAlign2] = useState<"left" | "center" | "right">(
        "center"
    );

    // Example 3: Vertical Orientation - no state needed

    // Example 4: Divider Thickness
    const [thickness4, setThickness4] = useState(1);

    // Example 5: List with Inset Dividers - no state needed

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Divider
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Divider Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Divider Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Choose between full-width, inset, or middle
                                variants to control divider spacing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border space-y-4 overflow-hidden">
                                            <p className="text-small theme-text-muted">
                                                Content above divider
                                            </p>
                                            <Divider variant={variant1} />
                                            <p className="text-small theme-text-muted">
                                                Content below divider
                                            </p>
                                        </div>
                                        <RadioGroup
                                            label="Variant"
                                            name="variant-example1"
                                            value={variant1}
                                            onChange={(val) =>
                                                setVariant1(
                                                    val as
                                                        | "fullWidth"
                                                        | "inset"
                                                        | "middle"
                                                )
                                            }
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "fullWidth",
                                                    label: "Full Width",
                                                },
                                                {
                                                    value: "inset",
                                                    label: "Inset",
                                                },
                                                {
                                                    value: "middle",
                                                    label: "Middle",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            variant1 === "fullWidth"
                                                ? `<Divider />`
                                                : `<Divider variant="${variant1}" />`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Divider with Text Content */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Divider with Text Content
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Add text or icons inside dividers with
                                customizable alignment for section labeling.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                            <p className="text-small theme-text-muted">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p>
                                            <Divider textAlign={textAlign2}>
                                                SECTION BREAK
                                            </Divider>
                                            <p className="text-small theme-text-muted">
                                                Phasellus accumsan cursus velit.
                                                Vestibulum ante ipsum primis.
                                            </p>
                                        </div>
                                        <RadioGroup
                                            label="Text Alignment"
                                            name="textAlign-example2"
                                            value={textAlign2}
                                            onChange={(val) =>
                                                setTextAlign2(
                                                    val as
                                                        | "left"
                                                        | "center"
                                                        | "right"
                                                )
                                            }
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "left",
                                                    label: "Left",
                                                },
                                                {
                                                    value: "center",
                                                    label: "Center",
                                                },
                                                {
                                                    value: "right",
                                                    label: "Right",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            textAlign2 === "center"
                                                ? `<Divider>SECTION BREAK</Divider>`
                                                : `<Divider textAlign="${textAlign2}">
  SECTION BREAK
</Divider>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Vertical Orientation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Vertical Orientation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Use vertical dividers in flex layouts like
                                toolbars with adjustable thickness.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <div className="flex items-center gap-2 theme-surface p-2 rounded-lg w-fit">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    Bold
                                                </Button>
                                                <Divider
                                                    orientation="vertical"
                                                    flexItem
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    Underline
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Divider 
  orientation="vertical" 
  flexItem 
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Divider Thickness */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Divider Thickness
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Adjust the thickness of dividers to create
                                visual hierarchy.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border space-y-4 overflow-hidden">
                                            <p className="text-small theme-text-muted">
                                                Content above divider
                                            </p>
                                            <Divider thickness={thickness4} />
                                            <p className="text-small theme-text-muted">
                                                Content below divider
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold theme-text-muted">
                                                Thickness: {thickness4}px
                                            </label>
                                            <Slider
                                                value={thickness4}
                                                onChange={(val) =>
                                                    setThickness4(val as number)
                                                }
                                                min={1}
                                                max={5}
                                                step={1}
                                                marks={[
                                                    { value: 1, label: "1px" },
                                                    { value: 2, label: "2px" },
                                                    { value: 3, label: "3px" },
                                                    { value: 4, label: "4px" },
                                                    { value: 5, label: "5px" },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            thickness4 === 1
                                                ? `<Divider />`
                                                : `<Divider thickness={${thickness4}} />`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 5: List with Inset Dividers */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            List with Inset Dividers
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Inset dividers are ideal for lists with avatars
                                or icons, maintaining visual alignment.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border">
                                        <div className="space-y-0 theme-bg border rounded-lg overflow-hidden">
                                            <div className="px-4 py-3 flex items-start gap-4 hover:theme-surface transition-colors">
                                                <div className="w-12 h-12 bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]0 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    I
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium theme-text">
                                                        Inbox
                                                    </div>
                                                    <div className="text-small theme-text-muted">
                                                        12 new messages
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider variant="inset" />
                                            <div className="px-4 py-3 flex items-start gap-4 hover:theme-surface transition-colors">
                                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    D
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium theme-text">
                                                        Drafts
                                                    </div>
                                                    <div className="text-small theme-text-muted">
                                                        3 drafts saved
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider variant="inset" />
                                            <div className="px-4 py-3 flex items-start gap-4 hover:theme-surface transition-colors">
                                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    T
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium theme-text">
                                                        Trash
                                                    </div>
                                                    <div className="text-small theme-text-muted">
                                                        Empty
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<div className="space-y-0">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-full">
      I
    </div>
    <div>
      <div>Inbox</div>
      <div>12 new messages</div>
    </div>
  </div>
  <Divider variant="inset" />
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-full">
      D
    </div>
    <div>
      <div>Drafts</div>
      <div>3 drafts saved</div>
    </div>
  </div>
</div>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* ========================================
                DIVIDER BEFORE API REFERENCE
            ======================================== */}
            <Divider className="my-12" />

            {/* ========================================
                API REFERENCE
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
                                        variant
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;fullWidth&quot; |
                                        &quot;inset&quot; | &quot;middle&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;fullWidth&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        The variant to use. &quot;inset&quot;
                                        adds left margin, &quot;middle&quot;
                                        adds horizontal/vertical margin
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        orientation
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;horizontal&quot; |
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;horizontal&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        The orientation of the divider.
                                        Horizontal renders as &lt;hr&gt;,
                                        vertical renders as &lt;div&gt;
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        textAlign
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;left&quot; | &quot;center&quot; |
                                        &quot;right&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;center&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Alignment of content when children are
                                        provided (horizontal only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        flexItem
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        If true, adds self-stretch for proper
                                        display in flex containers (vertical
                                        only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        thickness
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Thickness of the divider line in pixels
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
                                        Content to be rendered inside the
                                        divider (text, icons, etc.)
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
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Additional CSS classes
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
