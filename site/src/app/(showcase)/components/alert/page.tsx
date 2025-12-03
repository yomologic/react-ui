"use client";

import {
    Card,
    CodeSnippet,
    Alert,
    SectionLayout,
    RadioGroup,
    Checkbox,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function AlertPage() {
    const [selectedVariant, setSelectedVariant] = useState<string>("info");
    const [showTitle, setShowTitle] = useState<boolean>(true);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: USAGE EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">Alert</h2>
                <div className="space-y-6">
                    {/* Example 1: Alert Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Alert Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Alerts support different semantic color variants
                                for various message types.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Alert
                                                variant={
                                                    selectedVariant as
                                                        | "info"
                                                        | "success"
                                                        | "warning"
                                                        | "error"
                                                }
                                                title={
                                                    selectedVariant === "info"
                                                        ? "Information"
                                                        : selectedVariant ===
                                                            "success"
                                                          ? "Success"
                                                          : selectedVariant ===
                                                              "warning"
                                                            ? "Warning"
                                                            : "Error"
                                                }
                                            >
                                                {selectedVariant === "info"
                                                    ? "This is an informational message for the user."
                                                    : selectedVariant ===
                                                        "success"
                                                      ? "Your changes have been saved successfully."
                                                      : selectedVariant ===
                                                          "warning"
                                                        ? "Please review your changes before proceeding."
                                                        : "An error occurred while processing your request."}
                                            </Alert>
                                        </div>
                                        <RadioGroup
                                            label="Select Variant"
                                            name="alertVariant"
                                            options={[
                                                {
                                                    value: "info",
                                                    label: "Info",
                                                },
                                                {
                                                    value: "success",
                                                    label: "Success",
                                                },
                                                {
                                                    value: "warning",
                                                    label: "Warning",
                                                },
                                                {
                                                    value: "error",
                                                    label: "Error",
                                                },
                                            ]}
                                            value={selectedVariant}
                                            onChange={setSelectedVariant}
                                            orientation="horizontal"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Alert\n  variant="${selectedVariant}"\n  title="${selectedVariant === "info" ? "Information" : selectedVariant === "success" ? "Success" : selectedVariant === "warning" ? "Warning" : "Error"}"\n>\n  ${selectedVariant === "info" ? "This is an informational message for the user." : selectedVariant === "success" ? "Your changes have been saved successfully." : selectedVariant === "warning" ? "Please review your changes before proceeding." : "An error occurred while processing your request."}\n</Alert>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Alert with Optional Title */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Alert with Optional Title
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Alerts can be displayed with or without a title.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
                                            <Alert
                                                variant="info"
                                                title={
                                                    showTitle
                                                        ? "Information"
                                                        : undefined
                                                }
                                            >
                                                This alert demonstrates optional
                                                title functionality.
                                            </Alert>
                                        </div>
                                        <Checkbox
                                            label="Show Title"
                                            checked={showTitle}
                                            onChange={setShowTitle}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Alert\n  variant="info"${showTitle ? '\n  title="Information"' : ""}\n>\n  This alert demonstrates optional title functionality.\n</Alert>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Dismissible Alert */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Dismissible Alert
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Alert with a close button that can be dismissed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border">
                                        <Alert
                                            variant="info"
                                            title="Dismissible Alert"
                                            dismissible
                                            onDismiss={() => {
                                                // Handle dismiss
                                            }}
                                        >
                                            This alert can be closed by clicking
                                            the X button.
                                        </Alert>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Alert\n  variant="info"\n  title="Dismissible Alert"\n  dismissible\n  onDismiss={() => console.log("Alert dismissed")}\n>\n  This alert can be closed by clicking the X button.\n</Alert>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

            {/* ========================================
                SECTION 2: API DOCUMENTATION
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
                                        &quot;info&quot; | &quot;success&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;info&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Color scheme and icon of the alert
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        title
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        string
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Title text of the alert
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
                                        Alert message content
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        dismissible
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        false
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Shows a close button to dismiss the
                                        alert
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onDismiss
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        () =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        undefined
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Callback when alert is dismissed
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
