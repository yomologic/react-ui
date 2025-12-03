"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Divider,
    Button,
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

    // Validation example
    const [selectedPlan, setSelectedPlan] = useState("");
    const [planError, setPlanError] = useState("");

    const handleSubmit = () => {
        if (!selectedPlan) {
            setPlanError("Please select a plan to continue");
        } else {
            setPlanError("");
            alert(`Plan selected: ${selectedPlan}`);
        }
    };

    return (
        <SectionLayout>
            {/* ========================================
                RADIO COMPONENT SHOWCASE
            ======================================== */}
            <section>
                <h2 className="text-2xl font-bold theme-text mb-6">Radio</h2>

                <div className="space-y-6">
                    {/* ========================================
                        EXAMPLE 1: ORIENTATION
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-4">
                            Radio Group Orientation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Display radio buttons vertically (stacked) or
                                horizontally (in a row).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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

                                        <RadioGroup
                                            label="Select Orientation"
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

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
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
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 2: SIZES
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-4">
                            Radio Button Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Radio buttons come in five sizes: xs, sm, md,
                                lg, and xl.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <RadioGroup
                                                label="Select size"
                                                name="size-demo"
                                                value={sizeDemo}
                                                onChange={setSizeDemo}
                                                size={
                                                    sizeControl as
                                                        | "xs"
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                        | "xl"
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

                                        <RadioGroup
                                            label="Select Size"
                                            name="size-control"
                                            value={sizeControl}
                                            onChange={setSizeControl}
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
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 3: DISABLED OPTIONS
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-4">
                            Disabled Radio Options
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Individual radio options can be disabled to
                                prevent selection.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border">
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

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
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
                        </div>
                    </Card>

                    {/* ========================================
                        EXAMPLE 4: REQUIRED FIELD
                    ======================================== */}
                    <Card variant="elevated" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-4">
                            Required Radio Field
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Mark a radio group as required to indicate it
                                must be filled.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border">
                                        <RadioGroup
                                            label="Required field"
                                            name="required-demo"
                                            value={requiredDemo}
                                            onChange={setRequiredDemo}
                                            required
                                            options={[
                                                { value: "yes", label: "Yes" },
                                                { value: "no", label: "No" },
                                                {
                                                    value: "maybe",
                                                    label: "Maybe",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        language="tsx"
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
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                VALIDATION EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Validation
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Required RadioGroup */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Required RadioGroup
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                RadioGroup validation is triggered on form
                                submit. Click Continue without selecting to see
                                the error.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="p-6 theme-surface rounded-lg border theme-border space-y-4">
                                        <RadioGroup
                                            label="Select a plan"
                                            name="validation-plan"
                                            value={selectedPlan}
                                            onChange={setSelectedPlan}
                                            required
                                            options={[
                                                {
                                                    value: "free",
                                                    label: "Free Plan",
                                                },
                                                {
                                                    value: "pro",
                                                    label: "Pro Plan",
                                                },
                                                {
                                                    value: "enterprise",
                                                    label: "Enterprise Plan",
                                                },
                                            ]}
                                            error={planError}
                                            helperText={
                                                !planError
                                                    ? "Choose the plan that fits your needs"
                                                    : ""
                                            }
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CodeSnippet
                                        language="tsx"
                                        code={`const [selectedPlan, setSelectedPlan] = useState("");
const [planError, setPlanError] = useState("");

const handleSubmit = () => {
  if (!selectedPlan) {
    setPlanError("Please select a plan");
  } else {
    setPlanError("");
    // Process selection
  }
};

<RadioGroup
  label="Select a plan"
  name="plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  required
  options={[
    { value: "free", label: "Free Plan" },
    { value: "pro", label: "Pro Plan" },
    { value: "enterprise", label: "Enterprise" },
  ]}
  error={planError}
  helperText="Choose your plan"
/>
<Button onClick={handleSubmit}>
  Continue
</Button>`}
                                    />
                                </div>
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
                                        Label text displayed above the radio
                                        group
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
                                        Name attribute for the radio group
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        options
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        RadioOption[]
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Array of options with value, label, and
                                        optional disabled
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        value
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Currently selected value
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onChange
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        (value: string) =&gt; void
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
                                        Layout orientation of the radio buttons
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
                                        Marks the field as required (shows
                                        asterisk in label)
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
