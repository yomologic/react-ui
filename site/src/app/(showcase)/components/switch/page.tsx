"use client";

import {
    Card,
    Switch,
    RadioGroup,
    CodeSnippet,
    SectionLayout,
    Divider,
    Checkbox,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function SwitchPage() {
    // Example 1: Basic Switch
    const [basicChecked, setBasicChecked] = useState(false);

    // Example 2: Switch Sizes
    const [selectedSize, setSelectedSize] = useState<string>("md");
    const [sizeChecked, setSizeChecked] = useState(true);

    // Example 3: Switch Colors
    const [selectedColor, setSelectedColor] = useState<string>("primary");
    const [colorChecked, setColorChecked] = useState(true);

    // Example 4: Label Placement
    const [labelPlacement, setLabelPlacement] = useState<string>("end");
    const [labelChecked, setLabelChecked] = useState(true);

    // Example 5: States
    const [normalChecked, setNormalChecked] = useState(true);
    const [disabledChecked, setDisabledChecked] = useState(true);
    const [showDisabled, setShowDisabled] = useState(true);

    return (
        <SectionLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Switch</h2>
                    <p className="mt-2 text-base text-gray-600">
                        Toggle switches for binary options with support for
                        different sizes, colors, and label placements.
                    </p>
                </div>

                {/* Example 1: Basic Switch */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Basic Switch
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            A simple switch with a label.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Switch
                                        label="Enable notifications"
                                        checked={basicChecked}
                                        onChange={setBasicChecked}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <CodeSnippet
                                    language="tsx"
                                    code={`<Switch
  label="Enable notifications"
  checked={${basicChecked}}
  onChange={setChecked}
/>`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Example 2: Switch Sizes */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Switch Sizes
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Choose from small, medium, or large sizes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Switch
                                        label="Enable feature"
                                        size={
                                            selectedSize as "sm" | "md" | "lg"
                                        }
                                        checked={sizeChecked}
                                        onChange={setSizeChecked}
                                    />
                                </div>
                                <RadioGroup
                                    label="Size"
                                    name="size"
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                    orientation="horizontal"
                                    options={[
                                        { value: "sm", label: "Small" },
                                        { value: "md", label: "Medium" },
                                        { value: "lg", label: "Large" },
                                    ]}
                                />
                            </div>
                            <div className="flex-1">
                                <CodeSnippet
                                    language="tsx"
                                    code={`<Switch
  label="Enable feature"
  size="${selectedSize}"
  checked={checked}
  onChange={setChecked}
/>`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Example 3: Switch Colors */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Switch Colors
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Different color variants for various use cases.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Switch
                                        label="Toggle option"
                                        color={
                                            selectedColor as
                                                | "primary"
                                                | "success"
                                                | "info"
                                                | "warning"
                                                | "error"
                                        }
                                        checked={colorChecked}
                                        onChange={setColorChecked}
                                    />
                                </div>
                                <RadioGroup
                                    label="Color"
                                    name="color"
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                    orientation="horizontal"
                                    options={[
                                        { value: "primary", label: "Primary" },
                                        { value: "success", label: "Success" },
                                        { value: "info", label: "Info" },
                                        { value: "warning", label: "Warning" },
                                        { value: "error", label: "Error" },
                                    ]}
                                />
                            </div>
                            <div className="flex-1">
                                <CodeSnippet
                                    language="tsx"
                                    code={`<Switch
  label="Toggle option"
  color="${selectedColor}"
  checked={checked}
  onChange={setChecked}
/>`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Example 4: Label Placement */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Label Placement
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Position the label relative to the switch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Switch
                                        label="Dark mode"
                                        labelPlacement={
                                            labelPlacement as
                                                | "start"
                                                | "end"
                                                | "top"
                                                | "bottom"
                                        }
                                        checked={labelChecked}
                                        onChange={setLabelChecked}
                                    />
                                </div>
                                <RadioGroup
                                    label="Label Placement"
                                    name="labelPlacement"
                                    value={labelPlacement}
                                    onChange={setLabelPlacement}
                                    orientation="horizontal"
                                    options={[
                                        { value: "start", label: "Start" },
                                        { value: "end", label: "End" },
                                        { value: "top", label: "Top" },
                                        { value: "bottom", label: "Bottom" },
                                    ]}
                                />
                            </div>
                            <div className="flex-1">
                                <CodeSnippet
                                    language="tsx"
                                    code={`<Switch
  label="Dark mode"
  labelPlacement="${labelPlacement}"
  checked={checked}
  onChange={setChecked}
/>`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Example 5: Switch States */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Switch States
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Normal and disabled states.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="space-y-4">
                                        <Switch
                                            label="Normal switch"
                                            checked={normalChecked}
                                            onChange={setNormalChecked}
                                        />
                                        {showDisabled && (
                                            <>
                                                <Switch
                                                    label="Disabled (checked)"
                                                    checked={disabledChecked}
                                                    onChange={
                                                        setDisabledChecked
                                                    }
                                                    disabled
                                                />
                                                <Switch
                                                    label="Disabled (unchecked)"
                                                    checked={false}
                                                    disabled
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Checkbox
                                    label="Show disabled states"
                                    checked={showDisabled}
                                    onChange={setShowDisabled}
                                />
                            </div>
                            <div className="flex-1">
                                <CodeSnippet
                                    language="tsx"
                                    code={`<Switch
  label="Normal switch"
  checked={checked}
  onChange={setChecked}
/>

<Switch
  label="Disabled (checked)"
  checked={true}
  disabled
/>

<Switch
  label="Disabled (unchecked)"
  checked={false}
  disabled
/>`}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <Divider className="my-12" />

                {/* API Reference */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        API Reference
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-200">
                                    <th className="text-left p-3 font-semibold text-gray-900">
                                        Prop
                                    </th>
                                    <th className="text-left p-3 font-semibold text-gray-900">
                                        Type
                                    </th>
                                    <th className="text-left p-3 font-semibold text-gray-900">
                                        Default
                                    </th>
                                    <th className="text-left p-3 font-semibold text-gray-900">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        checked
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        -
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Whether the switch is checked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        onChange
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        (checked: boolean) =&gt; void
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        -
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Callback when the switch state changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        disabled
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        false
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Whether the switch is disabled
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        label
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        -
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Label text for the switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        labelPlacement
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        &quot;start&quot; | &quot;end&quot; |
                                        &quot;top&quot; | &quot;bottom&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        &quot;end&quot;
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Position of the label relative to the
                                        switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        size
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        &quot;md&quot;
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Size of the switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        color
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        &quot;primary&quot; |
                                        &quot;success&quot; | &quot;info&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        &quot;primary&quot;
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Color variant when checked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        name
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        -
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Name attribute for the input
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        required
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        false
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Required field indicator
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-blue-600">
                                        className
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-700">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-600">
                                        -
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">
                                        Additional CSS classes
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
