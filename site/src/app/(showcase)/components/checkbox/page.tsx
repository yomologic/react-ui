"use client";

import {
    Card,
    CodeSnippet,
    SectionLayout,
    CheckboxGroup,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function CheckboxPage() {
    // State for Orientation example
    const [orientationValues, setOrientationValues] = useState<string[]>([
        "apple",
    ]);
    const [selectedOrientation, setSelectedOrientation] =
        useState<string>("vertical");

    // State for Sizes example
    const [sizeValues, setSizeValues] = useState<string[]>(["apple", "banana"]);
    const [selectedSize, setSelectedSize] = useState<string>("md");

    // State for Disabled example
    const [disabledValues, setDisabledValues] = useState<string[]>(["apple"]);
    const [hasDisabledOption, setHasDisabledOption] = useState(true);
    const [groupDisabled, setGroupDisabled] = useState(false);

    // State for Single Checkbox example
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Checkbox
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Orientation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Checkbox Orientation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Display checkboxes vertically (stacked) or
                                horizontally (in a row).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <CheckboxGroup
                                                label="Select Fruits"
                                                name="fruits"
                                                options={[
                                                    {
                                                        value: "apple",
                                                        label: "Apple",
                                                    },
                                                    {
                                                        value: "banana",
                                                        label: "Banana",
                                                    },
                                                    {
                                                        value: "orange",
                                                        label: "Orange",
                                                    },
                                                ]}
                                                value={orientationValues}
                                                onChange={setOrientationValues}
                                                orientation={
                                                    selectedOrientation as
                                                        | "vertical"
                                                        | "horizontal"
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Orientation"
                                            name="checkboxOrientation"
                                            value={selectedOrientation}
                                            onChange={setSelectedOrientation}
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

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<CheckboxGroup
  label="Select Fruits"
  name="fruits"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}${selectedOrientation !== "vertical" ? `\n  orientation="${selectedOrientation}"` : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Checkbox Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Choose from five size options: extra small,
                                small, medium, large, or extra large.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <CheckboxGroup
                                                label="Select Fruits"
                                                name="fruits-size"
                                                options={[
                                                    {
                                                        value: "apple",
                                                        label: "Apple",
                                                    },
                                                    {
                                                        value: "banana",
                                                        label: "Banana",
                                                    },
                                                    {
                                                        value: "orange",
                                                        label: "Orange",
                                                    },
                                                ]}
                                                value={sizeValues}
                                                onChange={setSizeValues}
                                                size={
                                                    selectedSize as
                                                        | "xs"
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                        | "xl"
                                                }
                                            />
                                        </div>

                                        <RadioGroup
                                            label="Select Size"
                                            name="checkboxSize"
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
                                        language="tsx"
                                        code={`<CheckboxGroup
  label="Select Fruits"
  name="fruits"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}${selectedSize !== "md" ? `\n  size="${selectedSize}"` : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Disabled Options */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Disabled Checkboxes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Disable individual options or the entire
                                checkbox group.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <CheckboxGroup
                                                label="Select Fruits"
                                                name="fruits-disabled"
                                                options={[
                                                    {
                                                        value: "apple",
                                                        label: "Apple",
                                                    },
                                                    {
                                                        value: "banana",
                                                        label: "Banana",
                                                    },
                                                    {
                                                        value: "orange",
                                                        label: "Orange (Disabled)",
                                                        disabled:
                                                            hasDisabledOption,
                                                    },
                                                ]}
                                                value={disabledValues}
                                                onChange={setDisabledValues}
                                                disabled={groupDisabled}
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            <Checkbox
                                                label="Disable third option"
                                                checked={hasDisabledOption}
                                                onChange={setHasDisabledOption}
                                            />
                                            <Checkbox
                                                label="Disable entire group"
                                                checked={groupDisabled}
                                                onChange={setGroupDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<CheckboxGroup
  label="Select Fruits"
  name="fruits"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    {
      value: "orange",
      label: "Orange",${hasDisabledOption ? "\n      disabled: true," : ""}
    },
  ]}
  value={selectedValues}
  onChange={setSelectedValues}${groupDisabled ? "\n  disabled" : ""}
/>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 4: Single Checkbox */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Single Checkbox
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use standalone checkboxes for simple boolean
                                choices.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                        <Checkbox
                                            label="I agree to the terms and conditions"
                                            checked={agreeToTerms}
                                            onChange={setAgreeToTerms}
                                        />
                                        <Checkbox
                                            label="Subscribe to newsletter"
                                            checked={subscribeNewsletter}
                                            onChange={setSubscribeNewsletter}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Checkbox
  label="I agree to the terms and conditions"
  checked={agreeToTerms}
  onChange={setAgreeToTerms}
/>

<Checkbox
  label="Subscribe to newsletter"
  checked={subscribeNewsletter}
  onChange={setSubscribeNewsletter}
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
                                        Group label displayed above the
                                        checkboxes
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
                                        Name attribute for the checkbox group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        CheckboxOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Array of checkbox options (value, label,
                                        disabled)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        string[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        []
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Array of selected checkbox values
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        (value: string[]) =&gt; void
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
                                        Layout direction of the checkbox group
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
                                        Shows asterisk (*) next to label if true
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
                                        Disables the entire checkbox group
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
