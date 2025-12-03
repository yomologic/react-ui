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

    // State for Validation example
    const [acceptTerms, setAcceptTerms] = useState(false);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Checkbox
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Orientation */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Checkbox Orientation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Display checkboxes vertically (stacked) or
                                horizontally (in a row).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Checkbox Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Choose from five size options: extra small,
                                small, medium, large, or extra large.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Disabled Checkboxes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Disable individual options or the entire
                                checkbox group.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Single Checkbox
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Use standalone checkboxes for simple boolean
                                choices.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-3">
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
                SECTION 2: VALIDATION EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Validation
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Required Checkbox */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Required Checkbox
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Use the required prop with custom error messages
                                for checkboxes that must be checked.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                        <Checkbox
                                            id="validation-terms-checkbox"
                                            label="I accept the terms and conditions"
                                            checked={acceptTerms}
                                            onChange={setAcceptTerms}
                                            required
                                            errorMessage="You must accept the terms to continue"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`<Checkbox
  label="I accept the terms and conditions"
  required
  errorMessage="You must accept the terms to continue"
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
                SECTION 3: API REFERENCE
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
                                        label
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Group label displayed above the
                                        checkboxes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        name
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Name attribute for the checkbox group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        CheckboxOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Array of checkbox options (value, label,
                                        disabled)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        []
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Array of selected checkbox values
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        (value: string[]) =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Callback fired when selection changes
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        orientation
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;vertical&quot; |
                                        &quot;horizontal&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;vertical&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Layout direction of the checkbox group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Shows asterisk (*) next to label if true
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        disabled
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
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
