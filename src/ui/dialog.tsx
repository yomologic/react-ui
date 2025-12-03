"use client";

import React, { useEffect } from "react";
import { cn } from "../lib/utils";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    variant?: "default" | "info" | "success" | "warning" | "error";
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    children: React.ReactNode;
}

const Dialog = ({
    open,
    onClose,
    size = "md",
    variant = "default",
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    children,
}: DialogProps) => {
    // Handle escape key
    useEffect(() => {
        if (!open || !closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    if (!open) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full mx-4",
    };

    const closeButtonStyles = {
        default: { color: "var(--color-muted-foreground)" },
        info: { color: "var(--color-info-border)" },
        success: { color: "var(--color-success-border)" },
        warning: { color: "var(--color-warning-border)" },
        error: { color: "var(--color-error-border)" },
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 [z-index:var(--z-index-modal)] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={cn(
                    "relative rounded-xl shadow-2xl w-full animate-in zoom-in-95 duration-200 bg-(--color-background) border border-(--color-border)",
                    sizes[size]
                )}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        style={{
                            color: closeButtonStyles[variant].color,
                            transition: "background-color 0.2s ease",
                            backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                            const root = document.documentElement;
                            if (variant === "default") {
                                e.currentTarget.style.backgroundColor =
                                    "rgba(0, 0, 0, 0.1)";
                            } else {
                                const color = getComputedStyle(root)
                                    .getPropertyValue(
                                        `--color-${variant}-border`
                                    )
                                    .trim();
                                // Convert hex to rgba with 15% opacity
                                const rgb = color.match(
                                    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
                                );
                                if (rgb) {
                                    const r = parseInt(rgb[1], 16);
                                    const g = parseInt(rgb[2], 16);
                                    const b = parseInt(rgb[3], 16);
                                    e.currentTarget.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.15)`;
                                }
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }}
                        onFocus={(e) => {
                            if (variant === "default") {
                                e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-border)`;
                            } else {
                                e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-${variant}-border)`;
                            }
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                        }}
                        className="absolute right-2 top-2 p-1.5 rounded-full [z-index:var(--z-index-base)] focus:outline-none"
                        aria-label="Close dialog"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                <DialogContext.Provider value={{ variant }}>
                    {children}
                </DialogContext.Provider>
            </div>
        </div>
    );
};

Dialog.displayName = "Dialog";

// Context to pass variant to subcomponents
const DialogContext = React.createContext<{
    variant: "default" | "info" | "success" | "warning" | "error";
}>({ variant: "default" });

const DialogHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { variant } = React.useContext(DialogContext);

    const variantStyles = {
        default: {
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
        },
        info: {
            backgroundColor: "var(--color-info-muted)",
            borderColor: "var(--color-info-border)",
        },
        success: {
            backgroundColor: "var(--color-success-muted)",
            borderColor: "var(--color-success-border)",
        },
        warning: {
            backgroundColor: "var(--color-warning-muted)",
            borderColor: "var(--color-warning-border)",
        },
        error: {
            backgroundColor: "var(--color-error-muted)",
            borderColor: "var(--color-error-border)",
        },
    };

    return (
        <div
            ref={ref}
            style={variantStyles[variant]}
            className={cn(
                "flex flex-col space-y-1.5 px-6 py-4 border-b rounded-t-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            "text-h3 font-semibold text-(--color-foreground) leading-none tracking-tight",
            className
        )}
        {...props}
    >
        {children}
    </h2>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-small text-(--color-muted-foreground)", className)}
        {...props}
    >
        {children}
    </p>
));
DialogDescription.displayName = "DialogDescription";

const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4", className)} {...props}>
        {children}
    </div>
));
DialogContent.displayName = "DialogContent";

const DialogFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex gap-2 justify-end bg-(--color-muted) px-6 py-4 border-t border-(--color-border) rounded-b-xl",
            className
        )}
        {...props}
    >
        {children}
    </div>
));
DialogFooter.displayName = "DialogFooter";

export {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogFooter,
};
