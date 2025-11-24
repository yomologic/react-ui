"use client";

import {
    Card,
    RadioGroup,
    Checkbox,
    CodeSnippet,
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
    Button,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Settings2, Code2, BookOpen } from "lucide-react";
import { useState } from "react";

export default function DialogPage() {
    const [size, setSize] = useState<string>("md");
    const [variant, setVariant] = useState<string>("default");
    const [showCloseButton, setShowCloseButton] = useState(true);
    const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(true);
    const [closeOnEscape, setCloseOnEscape] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showTitle, setShowTitle] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [showCodeOverlay, setShowCodeOverlay] = useState(false);

    // Demo dialogs
    const [isOpen, setIsOpen] = useState(false);

    // Generate code snippet
    const generateCode = () => {
        const props: string[] = [];

        props.push("open={isOpen}");
        props.push("onClose={() => setIsOpen(false)}");
        if (size !== "md") props.push(`size="${size}"`);
        if (variant !== "default") props.push(`variant="${variant}"`);
        if (!showCloseButton) props.push("showCloseButton={false}");
        if (!closeOnBackdropClick) props.push("closeOnBackdropClick={false}");
        if (!closeOnEscape) props.push("closeOnEscape={false}");

        const propsString = props.join("\n  ");
        const parts: string[] = [];

        if (showHeader) {
            const headerParts: string[] = [];
            if (showTitle)
                headerParts.push("    <DialogTitle>Dialog Title</DialogTitle>");
            if (showDescription)
                headerParts.push(
                    "    <DialogDescription>Dialog description</DialogDescription>"
                );
            if (headerParts.length > 0) {
                parts.push(
                    `  <DialogHeader>\n${headerParts.join("\n")}\n  </DialogHeader>`
                );
            }
        }

        parts.push(
            `  <DialogContent>\n    <p>Dialog content goes here</p>\n  </DialogContent>`
        );

        if (showFooter) {
            const cancelVariant =
                variant !== "default" ? ` variant="${variant}"` : "";
            parts.push(
                `  <DialogFooter>\n    <Button${cancelVariant} onClick={() => setIsOpen(false)}>\n      Cancel\n    </Button>\n    <Button variant="secondary">Confirm</Button>\n  </DialogFooter>`
            );
        }

        return `<Dialog\n  ${propsString}\n>\n${parts.join("\n")}\n</Dialog>`;
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
                                Dialog Live Preview
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
                            <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <div className="flex justify-center">
                                    <Button
                                        variant="primary"
                                        onClick={() => setIsOpen(true)}
                                    >
                                        Open Dialog
                                    </Button>
                                </div>

                                <Dialog
                                    open={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    size={
                                        size as
                                            | "sm"
                                            | "md"
                                            | "lg"
                                            | "xl"
                                            | "full"
                                    }
                                    variant={
                                        variant as
                                            | "default"
                                            | "info"
                                            | "success"
                                            | "warning"
                                            | "error"
                                    }
                                    showCloseButton={showCloseButton}
                                    closeOnBackdropClick={closeOnBackdropClick}
                                    closeOnEscape={closeOnEscape}
                                >
                                    {showHeader && (
                                        <DialogHeader>
                                            {showTitle && (
                                                <DialogTitle>
                                                    Dialog Title
                                                </DialogTitle>
                                            )}
                                            {showDescription && (
                                                <DialogDescription>
                                                    This is a description that
                                                    provides additional context
                                                    about the dialog.
                                                </DialogDescription>
                                            )}
                                        </DialogHeader>
                                    )}
                                    <DialogContent>
                                        <p className="text-sm text-gray-700">
                                            This is the main content area of the
                                            dialog. You can place any content
                                            here including forms, text, images,
                                            or other components.
                                        </p>
                                    </DialogContent>
                                    {showFooter && (
                                        <DialogFooter>
                                            <Button
                                                variant={
                                                    variant as
                                                        | "info"
                                                        | "success"
                                                        | "warning"
                                                        | "error"
                                                        | undefined
                                                }
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Confirm
                                            </Button>
                                        </DialogFooter>
                                    )}
                                </Dialog>
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
                                                    Component Code
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
                        {/* Size Selection */}
                        <RadioGroup
                            label="Size"
                            name="size"
                            value={size}
                            onChange={setSize}
                            orientation="horizontal"
                            options={[
                                { value: "sm", label: "Small" },
                                { value: "md", label: "Medium" },
                                { value: "lg", label: "Large" },
                                { value: "xl", label: "Extra Large" },
                                { value: "full", label: "Full Width" },
                            ]}
                        />

                        {/* Variant Selection */}
                        <RadioGroup
                            label="Variant"
                            name="variant"
                            value={variant}
                            onChange={setVariant}
                            orientation="horizontal"
                            options={[
                                { value: "default", label: "Default" },
                                { value: "info", label: "Info" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "error", label: "Error" },
                            ]}
                        />

                        {/* Behavior Options */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Behavior
                            </h3>
                            <Checkbox
                                label="Show close button"
                                checked={showCloseButton}
                                onChange={setShowCloseButton}
                            />
                            <Checkbox
                                label="Close on backdrop click"
                                checked={closeOnBackdropClick}
                                onChange={setCloseOnBackdropClick}
                            />
                            <Checkbox
                                label="Close on Escape key"
                                checked={closeOnEscape}
                                onChange={setCloseOnEscape}
                            />
                        </div>

                        {/* Dialog Sections */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Dialog Sections
                            </h3>
                            <div className="space-y-2">
                                <Checkbox
                                    label="Show Header"
                                    checked={showHeader}
                                    onChange={setShowHeader}
                                />
                                {showHeader && (
                                    <div className="ml-6 space-y-2">
                                        <Checkbox
                                            label="Show Title"
                                            checked={showTitle}
                                            onChange={setShowTitle}
                                        />
                                        <Checkbox
                                            label="Show Description"
                                            checked={showDescription}
                                            onChange={setShowDescription}
                                        />
                                    </div>
                                )}
                                <Checkbox
                                    label="Show Footer"
                                    checked={showFooter}
                                    onChange={setShowFooter}
                                />
                            </div>
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
                                        open
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Controls whether the dialog is visible
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        onClose
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        () =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Callback fired when the dialog should
                                        close
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot; | &quot;xl&quot; |
                                        &quot;full&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;md&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Maximum width of the dialog
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        variant
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        &quot;default&quot; | &quot;info&quot; |
                                        &quot;success&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        &quot;default&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Visual style variant with semantic
                                        colors
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        showCloseButton
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Show the close (X) button in the
                                        top-right corner
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        closeOnBackdropClick
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Close the dialog when clicking outside
                                        of it
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                        closeOnEscape
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Close the dialog when pressing the
                                        Escape key
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
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Dialog content (Header, Content, Footer
                                        components)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Dialog Subcomponents
                    </h3>
                    <Card variant="elevated" padding="none">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Component
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Default Styles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            DialogHeader
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Container for dialog title and
                                            description
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            px-6 py-4 border-b
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            DialogTitle
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Semantic h2 heading for the dialog
                                            title
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            text-xl font-semibold
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            DialogDescription
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Muted text for dialog descriptions
                                            or subtitles
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            text-sm text-gray-600
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            DialogContent
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Main content area of the dialog
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            px-6 py-4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                            DialogFooter
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            Footer area for action buttons
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                            flex justify-end gap-3 px-6 py-4
                                            border-t
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>

            {/* ========================================
          SECTION 4: USAGE EXAMPLES
      ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Basic Confirmation Dialog */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Basic Confirmation Dialog
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <CodeSnippet
                                code={`const [isOpen, setIsOpen] = useState(false);

<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  <DialogHeader>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogDescription>
      Are you sure you want to proceed? This action cannot be undone.
    </DialogDescription>
  </DialogHeader>
  <DialogContent>
    <p>Additional details about the action...</p>
  </DialogContent>
  <DialogFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="secondary" onClick={handleConfirm}>
      Confirm
    </Button>
  </DialogFooter>
</Dialog>`}
                            />
                        </div>
                    </div>

                    {/* Example 2: Form Dialog */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Form Dialog
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <CodeSnippet
                                code={`<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  size="lg"
>
  <DialogHeader>
    <DialogTitle>Create New Item</DialogTitle>
    <DialogDescription>
      Fill out the form below to create a new item.
    </DialogDescription>
  </DialogHeader>
  <DialogContent>
    <form className="space-y-4">
      <Input label="Name" placeholder="Enter name" />
      <Input label="Email" type="email" placeholder="Enter email" />
      <textarea 
        className="w-full p-2 border rounded" 
        placeholder="Description"
      />
    </form>
  </DialogContent>
  <DialogFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="secondary" onClick={handleSubmit}>
      Create
    </Button>
  </DialogFooter>
</Dialog>`}
                            />
                        </div>
                    </div>

                    {/* Example 3: Alert Dialog (No Dismiss) */}
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-3">
                            Alert Dialog (No Dismiss)
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <CodeSnippet
                                code={`<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  closeOnBackdropClick={false}
  closeOnEscape={false}
  showCloseButton={false}
>
  <DialogHeader>
    <DialogTitle>Important Notice</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <p>This is a critical action that requires acknowledgment.</p>
  </DialogContent>
  <DialogFooter>
    <Button 
      variant="secondary" 
      onClick={() => setIsOpen(false)}
    >
      I Understand
    </Button>
  </DialogFooter>
</Dialog>`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </SectionLayout>
    );
}
