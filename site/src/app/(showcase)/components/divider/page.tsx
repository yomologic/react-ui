"use client";

import {
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    Divider,
    Button,
    SectionLayout,
} from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";
import { useState } from "react";

export default function DividerPage() {
    const [variant, setVariant] = useState<"fullWidth" | "inset" | "middle">(
        "fullWidth"
    );
    const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
        "horizontal"
    );
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
        "center"
    );
    const [flexItem, setFlexItem] = useState(false);
    const [showChildren, setShowChildren] = useState(false);
    const [thickness, setThickness] = useState(1);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        if (variant !== "fullWidth") props.push(`variant="${variant}"`);
        if (orientation !== "horizontal")
            props.push(`orientation="${orientation}"`);
        if (showChildren && textAlign !== "center")
            props.push(`textAlign="${textAlign}"`);
        if (flexItem && orientation === "vertical") props.push("flexItem");
        if (thickness !== 1) props.push(`thickness={${thickness}}`);

        const propsString = props.join(" ");
        const hasProps = props.length > 0;
        const content = showChildren ? "\n  SECTION BREAK\n" : "";

        if (hasProps && showChildren) {
            return `<Divider ${propsString}>${content}</Divider>`;
        } else if (hasProps) {
            return `<Divider ${propsString} />`;
        } else if (showChildren) {
            return `<Divider>${content}</Divider>`;
        }
        return "<Divider />";
    };

    return (
        <SectionLayout hasStickyPreview>
            {/* ========================================
                SECTION 1: STICKY LIVE PREVIEW
            ======================================== */}
            <section className="sticky top-0 z-15 py-4 bg-gray-50">
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Divider Live Preview
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
                            <div className="p-8 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                {orientation === "horizontal" ? (
                                    <div className="space-y-4 max-w-xl mx-auto">
                                        <p className="text-sm text-gray-600">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                        </p>
                                        <Divider
                                            variant={variant}
                                            orientation={orientation}
                                            textAlign={textAlign}
                                            thickness={thickness}
                                        >
                                            {showChildren
                                                ? "SECTION BREAK"
                                                : undefined}
                                        </Divider>
                                        <p className="text-sm text-gray-600">
                                            Phasellus accumsan cursus velit.
                                            Vestibulum ante ipsum primis in
                                            faucibus.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-4 h-32">
                                        <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-700">
                                            Left
                                        </div>
                                        <Divider
                                            variant={variant}
                                            orientation={orientation}
                                            flexItem={flexItem}
                                            thickness={thickness}
                                        />
                                        <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-700">
                                            Center
                                        </div>
                                        <Divider
                                            variant={variant}
                                            orientation={orientation}
                                            flexItem={flexItem}
                                            thickness={thickness}
                                        />
                                        <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-700">
                                            Right
                                        </div>
                                    </div>
                                )}
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
                                                    Divider Code
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

            {/* ========================================
                SECTION 2: INTERACTIVE CONTROLS
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings2 className="w-5 h-5" />
                    Interactive Controls
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-6">
                        {/* Variant Selection */}
                        <RadioGroup
                            label="Variant"
                            name="variant"
                            value={variant}
                            onChange={(val) =>
                                setVariant(
                                    val as "fullWidth" | "inset" | "middle"
                                )
                            }
                            orientation="horizontal"
                            options={[
                                { value: "fullWidth", label: "Full Width" },
                                { value: "inset", label: "Inset" },
                                { value: "middle", label: "Middle" },
                            ]}
                        />

                        {/* Orientation Selection */}
                        <RadioGroup
                            label="Orientation"
                            name="orientation"
                            value={orientation}
                            onChange={(val) =>
                                setOrientation(val as "horizontal" | "vertical")
                            }
                            orientation="horizontal"
                            options={[
                                { value: "horizontal", label: "Horizontal" },
                                { value: "vertical", label: "Vertical" },
                            ]}
                        />

                        {/* Text Alignment (only for horizontal with children) */}
                        {orientation === "horizontal" && showChildren && (
                            <RadioGroup
                                label="Text Alignment"
                                name="textAlign"
                                value={textAlign}
                                onChange={(val) =>
                                    setTextAlign(
                                        val as "left" | "center" | "right"
                                    )
                                }
                                orientation="horizontal"
                                options={[
                                    { value: "left", label: "Left" },
                                    { value: "center", label: "Center" },
                                    { value: "right", label: "Right" },
                                ]}
                            />
                        )}

                        {/* Thickness Control */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Thickness
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={thickness}
                                    onChange={(e) =>
                                        setThickness(
                                            Math.max(
                                                1,
                                                Math.min(
                                                    5,
                                                    Number(e.target.value) || 1
                                                )
                                            )
                                        )
                                    }
                                    className="w-16 px-2 py-1 text-sm text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={5}
                                step={1}
                                value={thickness}
                                onChange={(e) =>
                                    setThickness(Number(e.target.value))
                                }
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>1px</span>
                                <span>2px</span>
                                <span>3px</span>
                                <span>4px</span>
                                <span>5px</span>
                            </div>
                        </div>

                        {/* Additional Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            {orientation === "horizontal" && (
                                <Checkbox
                                    label="Show text content"
                                    checked={showChildren}
                                    onChange={setShowChildren}
                                />
                            )}
                            {orientation === "vertical" && (
                                <Checkbox
                                    label="Flex Item (for flex containers)"
                                    checked={flexItem}
                                    onChange={setFlexItem}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </section>

            {/* ========================================
                SECTION 3: API REFERENCE
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

            {/* ========================================
                SECTION 4: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-8">
                    {/* Example 1: Basic Horizontal */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Basic Horizontal Divider
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 border rounded-lg bg-white space-y-4">
                                <p className="text-sm text-gray-600">
                                    Content above
                                </p>
                                <Divider />
                                <p className="text-sm text-gray-600">
                                    Content below
                                </p>
                            </div>
                            <CodeSnippet code={`<Divider />`} />
                        </div>
                    </div>

                    {/* Example 2: With Text */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Divider with Text
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 border rounded-lg bg-white space-y-4">
                                <p className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                                <Divider>CENTER</Divider>
                                <p className="text-sm text-gray-600">
                                    Phasellus accumsan cursus velit.
                                </p>
                                <Divider textAlign="left">LEFT</Divider>
                                <p className="text-sm text-gray-600">
                                    Vestibulum ante ipsum primis.
                                </p>
                                <Divider textAlign="right">RIGHT</Divider>
                                <p className="text-sm text-gray-600">
                                    Sed dignissim lacinia nunc.
                                </p>
                            </div>
                            <CodeSnippet
                                code={`<Divider>CENTER</Divider>
<Divider textAlign="left">LEFT</Divider>
<Divider textAlign="right">RIGHT</Divider>`}
                            />
                        </div>
                    </div>

                    {/* Example 3: Vertical in Toolbar */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Vertical Divider in Toolbar
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 border rounded-lg bg-white">
                                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg w-fit">
                                    <Button variant="ghost" size="sm">
                                        Bold
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Italic
                                    </Button>
                                    <Divider orientation="vertical" flexItem />
                                    <Button variant="ghost" size="sm">
                                        Underline
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Strike
                                    </Button>
                                </div>
                            </div>
                            <CodeSnippet
                                code={`<div className="flex items-center gap-2">
  <Button variant="ghost" size="sm">
    Bold
  </Button>
  <Button variant="ghost" size="sm">
    Italic
  </Button>
  <Divider 
    orientation="vertical" 
    flexItem
  />
  <Button variant="ghost" size="sm">
    Underline
  </Button>
  <Button variant="ghost" size="sm">
    Strike
  </Button>
</div>`}
                            />
                        </div>
                    </div>

                    {/* Example 4: List with Inset */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            List with Inset Dividers
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 border rounded-lg bg-white">
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
                            <CodeSnippet
                                code={`<div className="space-y-0 border rounded-lg overflow-hidden">
  <div className="px-4 py-3 flex items-start gap-4">
    <div className="w-12 h-12 bg-blue-500 rounded-full">
      I
    </div>
    <div className="flex-1">
      <div className="font-medium">Inbox</div>
      <div className="text-sm text-gray-500">
        12 new messages
      </div>
    </div>
  </div>
  <Divider variant="inset" />
  <div className="px-4 py-3 flex items-start gap-4">
    <div className="w-12 h-12 bg-green-500 rounded-full">
      D
    </div>
    <div className="flex-1">
      <div className="font-medium">Drafts</div>
      <div className="text-sm text-gray-500">
        3 drafts saved
      </div>
    </div>
  </div>
  <Divider variant="inset" />
  <div className="px-4 py-3 flex items-start gap-4">
    <div className="w-12 h-12 bg-red-500 rounded-full">
      T
    </div>
    <div className="flex-1">
      <div className="font-medium">Trash</div>
      <div className="text-sm text-gray-500">
        Empty
      </div>
    </div>
  </div>
</div>`}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Accessibility Note */}
            <section>
                <Card variant="elevated" padding="lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">
                        Accessibility
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>
                            The Divider component follows WAI-ARIA guidelines
                            for separators:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>
                                Horizontal dividers render as{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    &lt;hr&gt;
                                </code>{" "}
                                elements with implicit{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    role=&quot;separator&quot;
                                </code>
                            </li>
                            <li>
                                Vertical dividers render as{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    &lt;div&gt;
                                </code>{" "}
                                with{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    role=&quot;separator&quot;
                                </code>{" "}
                                and{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    aria-orientation=&quot;vertical&quot;
                                </code>
                            </li>
                            <li>
                                Dividers with children use{" "}
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                                    role=&quot;presentation&quot;
                                </code>{" "}
                                to preserve child element semantics
                            </li>
                        </ul>
                    </div>
                </Card>
            </section>

            {/* Theme Variables */}
            <section>
                <Card variant="elevated" padding="lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">
                        Theme Variables
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold">
                                        Variable
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold">
                                        Default
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold">
                                        Purpose
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-2 font-mono text-blue-600">
                                        --color-border
                                    </td>
                                    <td className="px-4 py-2 font-mono text-gray-600">
                                        #9ca3af
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        Divider line color
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-blue-600">
                                        --color-muted-foreground
                                    </td>
                                    <td className="px-4 py-2 font-mono text-gray-600">
                                        #6b7280
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        Text content color
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-blue-600">
                                        --text-sm
                                    </td>
                                    <td className="px-4 py-2 font-mono text-gray-600">
                                        0.875rem
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        Text content size
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
