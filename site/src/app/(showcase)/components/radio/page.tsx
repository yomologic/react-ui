"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Divider,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function RadioPage() {
    // Example 1: Orientation
    const [orientationDemo, setOrientationDemo] = useState("option1");
    const [orientationControl, setOrientationControl] =
        useState<string>("vertical");

    // Example 2: Sizes
    const [sizeDemo, setSizeDemo] = useState("option2");
    const [sizeControl, setSizeControl] = useState<string>("md");

    // Example 3: Disabled Options
    const [disabledDemo, setDisabledDemo] = useState("option1");

    // Example 4: Required Field
    const [requiredDemo, setRequiredDemo] = useState("");

    return (
        <SectionLayout>
            {/* ========================================
                RADIO COMPONENT SHOWCASE
            ======================================== */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Radio</h2>

                <div className="space-y-6">
                    {/* ========================================
                        EXAMPLE 1: ORIENTATION
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Radio Group Orientation
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Individual radio options can be disabled to prevent
                            selection.
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Display */}
                            <div className="lg:col-span-1">
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                    <RadioGroup
                                        label="Choose an option"
                                        name="orientation-demo"
                                        value={orientationDemo}
                                        onChange={setOrientationDemo}
                                        orientation={
                                            orientationControl as
                                                | "vertical"
                                                | "horizontal"
                                        }
                                        options={[
                                            {
                                                value: "option1",
                                                label: "Option 1",
                                            },
                                            {
                                                value: "option2",
                                                label: "Option 2",
                                            },
                                            {
                                                value: "option3",
                                                label: "Option 3",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Controls
                                </h3>
                                <div className="space-y-4">
                                    <RadioGroup
                                        label="Orientation"
                                        name="orientation-control"
                                        value={orientationControl}
                                        onChange={setOrientationControl}
                                        orientation="horizontal"
                                        options={[
                                            {
                                                value: "vertical",
                                                label: "Vertical",
                                            },
                                            {
                                                value: "horizontal",
                                                label: "Horizontal",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Code */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Code
                                </h3>
                                <CodeSnippet
                                    code={`<RadioGroup
  label="Choose an option"
  name="demo"
  value={selected}
  onChange={setSelected}${orientationControl === "horizontal" ? '\n  orientation="horizontal"' : ""}
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ]}
/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 2: SIZES
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Radio Button Sizes
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Radio buttons come in three sizes: small, medium,
                            and large.
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Display */}
                            <div className="lg:col-span-1">
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                    <RadioGroup
                                        label="Select size"
                                        name="size-demo"
                                        value={sizeDemo}
                                        onChange={setSizeDemo}
                                        size={sizeControl as "sm" | "md" | "lg"}
                                        options={[
                                            {
                                                value: "option1",
                                                label: "Option 1",
                                            },
                                            {
                                                value: "option2",
                                                label: "Option 2",
                                            },
                                            {
                                                value: "option3",
                                                label: "Option 3",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Controls
                                </h3>
                                <div className="space-y-4">
                                    <RadioGroup
                                        label="Size"
                                        name="size-control"
                                        value={sizeControl}
                                        onChange={setSizeControl}
                                        orientation="horizontal"
                                        options={[
                                            { value: "sm", label: "Small" },
                                            { value: "md", label: "Medium" },
                                            { value: "lg", label: "Large" },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Code */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Code
                                </h3>
                                <CodeSnippet
                                    code={`<RadioGroup
  label="Select size"
  name="demo"
  value={selected}
  onChange={setSelected}${sizeControl !== "md" ? `\n  size="${sizeControl}"` : ""}
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ]}
/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 3: DISABLED OPTIONS
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Disabled Radio Options
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Individual radio options can be disabled to prevent
                            selection.
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Display */}
                            <div className="lg:col-span-1">
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                    <RadioGroup
                                        label="Select option"
                                        name="disabled-demo"
                                        value={disabledDemo}
                                        onChange={setDisabledDemo}
                                        options={[
                                            {
                                                value: "option1",
                                                label: "Available Option 1",
                                            },
                                            {
                                                value: "option2",
                                                label: "Disabled Option",
                                                disabled: true,
                                            },
                                            {
                                                value: "option3",
                                                label: "Available Option 2",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Controls
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Individual options can be disabled by
                                    setting the disabled property in the options
                                    array.
                                </p>
                            </div>

                            {/* Code */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Code
                                </h3>
                                <CodeSnippet
                                    code={`<RadioGroup
  label="Select option"
  name="demo"
  value={selected}
  onChange={setSelected}
  options={[
    { value: "option1", label: "Available Option 1" },
    { value: "option2", label: "Disabled Option", disabled: true },
    { value: "option3", label: "Available Option 2" }
  ]}
/>`}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 4: REQUIRED FIELD
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Required Radio Field
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Mark a radio group as required to indicate it must
                            be filled.
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Display */}
                            <div className="lg:col-span-1">
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                    <RadioGroup
                                        label="Required field"
                                        name="required-demo"
                                        value={requiredDemo}
                                        onChange={setRequiredDemo}
                                        required
                                        options={[
                                            { value: "yes", label: "Yes" },
                                            { value: "no", label: "No" },
                                            { value: "maybe", label: "Maybe" },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Controls
                                </h3>
                                <p className="text-sm text-gray-600">
                                    The required prop adds an asterisk to the
                                    label, indicating that the field must be
                                    filled.
                                </p>
                            </div>

                            {/* Code */}
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Code
                                </h3>
                                <CodeSnippet
                                    code={`<RadioGroup
  label="Required field"
  name="demo"
  value={selected}
  onChange={setSelected}
  required
  options={[
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "maybe", label: "Maybe" }
  ]}
/>`}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

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
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Label text displayed above the radio
                                        group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        name
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Name attribute for the radio group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        RadioOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Array of options with value, label, and
                                        optional disabled
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Currently selected value
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (value: string) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback fired when selection changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        orientation
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;vertical&quot; |
                                        &quot;horizontal&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Layout orientation of the radio buttons
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Marks the field as required (shows
                                        asterisk in label)
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
                                        Disables the entire radio group
                                        (overrides individual option disabled
                                        states)
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
