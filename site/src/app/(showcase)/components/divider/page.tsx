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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Divider
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Divider Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Divider Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Choose between full-width, inset, or middle
                                variants to control divider spacing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4 overflow-hidden">
                                            <p className="text-sm text-gray-600">
                                                Content above divider
                                            </p>
                                            <Divider variant={variant1} />
                                            <p className="text-sm text-gray-600">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Divider with Text Content
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Add text or icons inside dividers with
                                customizable alignment for section labeling.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                            <p className="text-sm text-gray-600">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p>
                                            <Divider textAlign={textAlign2}>
                                                SECTION BREAK
                                            </Divider>
                                            <p className="text-sm text-gray-600">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Vertical Orientation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use vertical dividers in flex layouts like
                                toolbars with adjustable thickness.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg w-fit">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Divider Thickness
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Adjust the thickness of dividers to create
                                visual hierarchy.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-4 overflow-hidden">
                                            <p className="text-sm text-gray-600">
                                                Content above divider
                                            </p>
                                            <Divider thickness={thickness4} />
                                            <p className="text-sm text-gray-600">
                                                Content below divider
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            List with Inset Dividers
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Inset dividers are ideal for lists with avatars
                                or icons, maintaining visual alignment.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="space-y-0 bg-white border rounded-lg overflow-hidden">
                                            <div className="px-4 py-3 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    I
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900">
                                                        Inbox
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        12 new messages
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider variant="inset" />
                                            <div className="px-4 py-3 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    D
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900">
                                                        Drafts
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        3 drafts saved
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider variant="inset" />
                                            <div className="px-4 py-3 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                                                    T
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900">
                                                        Trash
                                                    </div>
                                                    <div className="text-sm text-gray-500">
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
                                        &quot;fullWidth&quot; |
                                        &quot;inset&quot; | &quot;middle&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;fullWidth&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The variant to use. &quot;inset&quot;
                                        adds left margin, &quot;middle&quot;
                                        adds horizontal/vertical margin
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        orientation
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;horizontal&quot; |
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;horizontal&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        The orientation of the divider.
                                        Horizontal renders as &lt;hr&gt;,
                                        vertical renders as &lt;div&gt;
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        textAlign
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;left&quot; | &quot;center&quot; |
                                        &quot;right&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;center&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Alignment of content when children are
                                        provided (horizontal only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        flexItem
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        If true, adds self-stretch for proper
                                        display in flex containers (vertical
                                        only)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        thickness
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Thickness of the divider line in pixels
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
                                        Content to be rendered inside the
                                        divider (text, icons, etc.)
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
