"use client";

import {
    Card,
    Switch,
    RadioGroup,
    CodeSnippet,
    SectionLayout,
    Divider,
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
    const [_showDisabled, _setShowDisabled] = useState(true);

    return (
        <SectionLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold theme-text">Switch</h2>
                    <p className="mt-2 text-base theme-text-muted">
                        Toggle switches for binary options with support for
                        different sizes, colors, and label placements.
                    </p>
                </div>

                {/* Example 1: Basic Switch */}
                <Card variant="bordered" padding="lg">
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Basic Switch
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            A simple switch with a label.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
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
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Switch Sizes
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            Choose from small, medium, or large sizes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
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
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Switch Colors
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            Different color variants for various use cases.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
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
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Label Placement
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            Position the label relative to the switch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="p-6 theme-surface rounded-lg border theme-border flex items-center justify-center">
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
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Switch States
                    </h3>
                    <div className="space-y-4">
                        <p className="text-small theme-text-muted">
                            Normal and disabled states.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 theme-surface rounded-lg border theme-border">
                                <div className="flex flex-col space-y-6">
                                    <Switch
                                        label="Normal switch"
                                        checked={normalChecked}
                                        onChange={setNormalChecked}
                                    />
                                    <Switch
                                        label="Disabled (checked)"
                                        checked={disabledChecked}
                                        onChange={setDisabledChecked}
                                        disabled
                                    />
                                    <Switch
                                        label="Disabled (unchecked)"
                                        checked={false}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div>
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
                    <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        API Reference
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="theme-surface border-b-2 theme-border">
                                    <th className="text-left p-3 font-semibold theme-text">
                                        Prop
                                    </th>
                                    <th className="text-left p-3 font-semibold theme-text">
                                        Type
                                    </th>
                                    <th className="text-left p-3 font-semibold theme-text">
                                        Default
                                    </th>
                                    <th className="text-left p-3 font-semibold theme-text">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        checked
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Whether the switch is checked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        onChange
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        (checked: boolean) =&gt; void
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Callback when the switch state changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        disabled
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        false
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Whether the switch is disabled
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        label
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Label text for the switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        labelPlacement
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;start&quot; | &quot;end&quot; |
                                        &quot;top&quot; | &quot;bottom&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;end&quot;
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Position of the label relative to the
                                        switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        size
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;md&quot;
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Size of the switch
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        color
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;primary&quot; |
                                        &quot;success&quot; | &quot;info&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        &quot;primary&quot;
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Color variant when checked
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        name
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Name attribute for the input
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        required
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        boolean
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        false
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
                                        Required field indicator
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono text-sm text-[var(--color-primary)]">
                                        className
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        string
                                    </td>
                                    <td className="p-3 font-mono text-sm theme-text-muted">
                                        -
                                    </td>
                                    <td className="p-3 text-sm theme-text-muted">
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
