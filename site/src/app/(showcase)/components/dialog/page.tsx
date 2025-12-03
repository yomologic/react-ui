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
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Dialog
                </h2>
                <div className="space-y-6">
                    {/* Example 1: Dialog Sizes */}
                    <Card variant="bordered" padding="lg">
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Dialog Sizes
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Dialogs come in five sizes to accommodate
                                different content lengths.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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
                                                    <p className="text-small theme-text-muted">
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
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Dialog Variants
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                Use semantic variants to communicate the purpose
                                of the dialog.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="space-y-4">
                                        <div className="p-6 theme-surface rounded-lg border theme-border">
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
                                                    <p className="text-small theme-text-muted">
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
                        <h3 className="text-h3 font-semibold theme-text mb-3">
                            Confirmation Dialog
                        </h3>
                        <div className="space-y-4">
                            <p className="text-small theme-text-muted">
                                A common pattern for confirming destructive or
                                important actions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="p-6 theme-surface rounded-lg border theme-border">
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
                                                <p className="text-small theme-text-muted">
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
                                        open
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Controls whether the dialog is visible
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        onClose
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        () =&gt; void
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Callback fired when the dialog should
                                        close
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        size
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;sm&quot; | &quot;md&quot; |
                                        &quot;lg&quot; | &quot;xl&quot; |
                                        &quot;full&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;md&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Maximum width of the dialog
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        variant
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        &quot;default&quot; | &quot;info&quot; |
                                        &quot;success&quot; |
                                        &quot;warning&quot; | &quot;error&quot;
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        &quot;default&quot;
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Visual style variant with semantic
                                        colors
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        showCloseButton
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Show the close (X) button in the
                                        top-right corner
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        closeOnBackdropClick
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Close the dialog when clicking outside
                                        of it
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                        closeOnEscape
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                        boolean
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm theme-text-muted font-mono">
                                        true
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Close the dialog when pressing the
                                        Escape key
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
                                        required
                                    </td>
                                    <td className="px-6 py-4 text-sm theme-text-muted">
                                        Dialog content (Header, Content, Footer
                                        components)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="mt-6">
                    <h3 className="text-h3 font-semibold theme-text mb-3">
                        Dialog Subcomponents
                    </h3>
                    <Card variant="elevated" padding="none">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="theme-surface border-b theme-border">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                            Component
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold theme-text-muted uppercase tracking-wider">
                                            Default Styles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="theme-bg divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                            DialogHeader
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted">
                                            Container for dialog title and
                                            description
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                            px-6 py-4 border-b
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                            DialogTitle
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted">
                                            Semantic h2 heading for the dialog
                                            title
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                            text-h2 font-semibold
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                            DialogDescription
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted">
                                            Muted text for dialog descriptions
                                            or subtitles
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                            text-sm theme-text-muted
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                            DialogContent
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted">
                                            Main content area of the dialog
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted font-mono">
                                            px-6 py-4
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[var(--color-primary)]">
                                            DialogFooter
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted">
                                            Footer area for action buttons
                                        </td>
                                        <td className="px-6 py-4 text-sm theme-text-muted font-mono">
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
