"use client";

import {
    Card,
    RadioGroup,
    CodeSnippet,
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
    Button,
    SectionLayout,
    Divider,
} from "@yomologic/react-ui";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function DialogPage() {
    // Example 1: Dialog Sizes
    const [isOpen1, setIsOpen1] = useState(false);
    const [size1, setSize1] = useState<string>("md");

    // Example 2: Dialog Variants
    const [isOpen2, setIsOpen2] = useState(false);
    const [variant2, setVariant2] = useState<string>("default");

    // Example 3: Confirmation Dialog
    const [isOpen3, setIsOpen3] = useState(false);

    return (
        <SectionLayout>
            {/* ========================================
                SECTION 1: COMPONENT EXAMPLES
            ======================================== */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Dialog
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Dialog Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Dialog Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Dialogs come in five sizes to accommodate
                                different content lengths.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Button
                                                variant="primary"
                                                onClick={() => setIsOpen1(true)}
                                            >
                                                Open Dialog
                                            </Button>

                                            <Dialog
                                                open={isOpen1}
                                                onClose={() =>
                                                    setIsOpen1(false)
                                                }
                                                size={
                                                    size1 as
                                                        | "sm"
                                                        | "md"
                                                        | "lg"
                                                        | "xl"
                                                        | "full"
                                                }
                                            >
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Dialog Title
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This dialog demonstrates
                                                        different size options.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogContent>
                                                    <p className="text-sm text-gray-700">
                                                        Dialog content goes
                                                        here. The width adjusts
                                                        based on the selected
                                                        size.
                                                    </p>
                                                </DialogContent>
                                                <DialogFooter>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            setIsOpen1(false)
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() =>
                                                            setIsOpen1(false)
                                                        }
                                                    >
                                                        Confirm
                                                    </Button>
                                                </DialogFooter>
                                            </Dialog>
                                        </div>
                                        <RadioGroup
                                            label="Size"
                                            name="size-example1"
                                            value={size1}
                                            onChange={setSize1}
                                            orientation="horizontal"
                                            options={[
                                                { value: "sm", label: "Small" },
                                                {
                                                    value: "md",
                                                    label: "Medium",
                                                },
                                                { value: "lg", label: "Large" },
                                                { value: "xl", label: "XL" },
                                                {
                                                    value: "full",
                                                    label: "Full",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            size1 === "md"
                                                ? `<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>
      Description text
    </DialogDescription>
  </DialogHeader>
  <DialogContent>
    <p>Content...</p>
  </DialogContent>
  <DialogFooter>
    <Button onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
  </DialogFooter>
</Dialog>`
                                                : `<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  size="${size1}"
>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>
      Description text
    </DialogDescription>
  </DialogHeader>
  <DialogContent>
    <p>Content...</p>
  </DialogContent>
  <DialogFooter>
    <Button onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
  </DialogFooter>
</Dialog>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 2: Dialog Variants */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Dialog Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Use semantic variants to communicate the purpose
                                of the dialog.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                            <Button
                                                variant="primary"
                                                onClick={() => setIsOpen2(true)}
                                            >
                                                Open Dialog
                                            </Button>

                                            <Dialog
                                                open={isOpen2}
                                                onClose={() =>
                                                    setIsOpen2(false)
                                                }
                                                variant={
                                                    variant2 as
                                                        | "default"
                                                        | "info"
                                                        | "success"
                                                        | "warning"
                                                        | "error"
                                                }
                                            >
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {variant2 === "default"
                                                            ? "Dialog Title"
                                                            : variant2 ===
                                                                "info"
                                                              ? "Information"
                                                              : variant2 ===
                                                                  "success"
                                                                ? "Success"
                                                                : variant2 ===
                                                                    "warning"
                                                                  ? "Warning"
                                                                  : "Error"}
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This dialog uses the{" "}
                                                        {variant2} variant.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogContent>
                                                    <p className="text-sm text-gray-700">
                                                        Different variants apply
                                                        semantic colors to help
                                                        communicate the dialog's
                                                        purpose.
                                                    </p>
                                                </DialogContent>
                                                <DialogFooter>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            setIsOpen2(false)
                                                        }
                                                    >
                                                        Close
                                                    </Button>
                                                </DialogFooter>
                                            </Dialog>
                                        </div>
                                        <RadioGroup
                                            label="Variant"
                                            name="variant-example2"
                                            value={variant2}
                                            onChange={setVariant2}
                                            orientation="horizontal"
                                            options={[
                                                {
                                                    value: "default",
                                                    label: "Default",
                                                },
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
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={
                                            variant2 === "default"
                                                ? `<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <p>Content...</p>
  </DialogContent>
</Dialog>`
                                                : `<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  variant="${variant2}"
>
  <DialogHeader>
    <DialogTitle>${variant2 === "info" ? "Information" : variant2 === "success" ? "Success" : variant2 === "warning" ? "Warning" : "Error"}</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <p>Content...</p>
  </DialogContent>
</Dialog>`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Example 3: Confirmation Dialog */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Confirmation Dialog
                        </h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                A common pattern for confirming destructive or
                                important actions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                        <Button
                                            variant="error"
                                            onClick={() => setIsOpen3(true)}
                                        >
                                            Delete Item
                                        </Button>

                                        <Dialog
                                            open={isOpen3}
                                            onClose={() => setIsOpen3(false)}
                                            closeOnBackdropClick={false}
                                            closeOnEscape={false}
                                            showCloseButton={false}
                                        >
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Confirm Deletion
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone. Are you sure you
                                                    want to proceed?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogContent>
                                                <p className="text-sm text-gray-700">
                                                    The item will be permanently
                                                    deleted from the system.
                                                </p>
                                            </DialogContent>
                                            <DialogFooter>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setIsOpen3(false)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="error"
                                                    onClick={() =>
                                                        setIsOpen3(false)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </Dialog>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CodeSnippet
                                        code={`<Dialog 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  closeOnBackdropClick={false}
  closeOnEscape={false}
  showCloseButton={false}
>
  <DialogHeader>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogDescription>
      This action cannot be undone.
    </DialogDescription>
  </DialogHeader>
  <DialogContent>
    <p>The item will be permanently deleted.</p>
  </DialogContent>
  <DialogFooter>
    <Button onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="error">
      Delete
    </Button>
  </DialogFooter>
</Dialog>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Divider className="my-12" />

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
        </SectionLayout>
    );
}
